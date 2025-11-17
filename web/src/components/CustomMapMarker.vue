<template>
  <div id="amap-container"></div>
</template>

<script>
export default {
  name: 'AmapClusterTargets',

  props: {
    // 高德地图 Key（必填）
    apiKey: {
      type: String,
      required: true
    },

    // 初始中心点 [lng, lat]
    center: {
      type: Array,
      default: () => [113.2644, 23.1291] // 默认广州
    },

    // 初始缩放级别
    zoom: {
      type: Number,
      default: 10
    },

    // 是否启用访客追踪（可选）
    enableVisitorTracking: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      map: null,
      targetMarkers: [],   // 所有目标点聚合标记（非访客）
      visitorMarkers: [],  // 访客聚合标记
      labelsLayer: null,   // 标注图层
    };
  },

  mounted() {
    this.loadAMapScript().then(() => {
      this.initMap();
      if (this.enableVisitorTracking) {
        this.trackVisitor();
        this.startVisitorPolling();
      }
    });
  },

  methods: {
    // 动态加载高德地图（推荐方式）
    loadAMapScript() {
      return new Promise((resolve, reject) => {
        if (window.AMap) return resolve();

        window.initAMap = resolve;
        const script = document.createElement('script');
        script.src = `https://webapi.amap.com/maps?v=2.0&key=${this.apiKey}&callback=initAMap`;
        script.onerror = () => reject(new Error('高德地图加载失败'));
        document.head.appendChild(script);
      });
    },

    // 初始化地图
    initMap() {
      this.map = new AMap.Map('amap-container', {
        zoom: this.zoom,
        center: this.center,
        resizeEnable: true,
        viewMode: '2D',
      });

      // 创建标注图层
      this.labelsLayer = new AMap.LabelsLayer({
        zooms: [2, 20],
        zIndex: 1000,
        collision: false,
        allowCollision: false,
      });
      this.map.add(this.labelsLayer);

      this.map.on('complete', () => {
        this.$emit('map-ready', this.map);
      });
    },

    // ==================== 目标点操作（对外暴露） ====================

    /** 添加多个目标点
     *  items: [{ lng, lat, name?, count:1 }]
     */
    addTargets(items = []) {
      console.log('[CustomMapMarker] 接收到目标点数据:', items);

      if (!this.map) return;

      // 先清除旧的目标点标记
      this.clearTargets();

      const coordMap = {};

      items.forEach(item => {
        const lng = Number(item.lng).toFixed(6);
        const lat = Number(item.lat).toFixed(6);
        const key = `${lng},${lat}`;

        if (!coordMap[key]) {
          coordMap[key] = {
            lng: Number(lng),
            lat: Number(lat),
            count: 0,
            name: item.name || '未命名地点',
          };
        }
        coordMap[key].count += item.count || 1;
      });

      console.log('[CustomMapMarker] 处理后的目标点坐标:', coordMap);

      Object.values(coordMap).forEach(point => {
        const marker = this.createCircleMarker(point, 'target');
        this.labelsLayer.add(marker);
        this.targetMarkers.push(marker);
      });

      // 自动缩放到最佳视野
      if (this.targetMarkers.length > 0) {
        // 使用所有标记的位置创建边界对象
        const lngLats = this.targetMarkers.map(marker => marker.getPosition());
        const bounds = new AMap.Bounds(lngLats);
        this.map.setBounds(bounds);
      }

      console.log('[CustomMapMarker] 已添加目标点标记数量:', this.targetMarkers.length);
    },

    // 清除所有目标点标记
    clearTargets() {
      this.targetMarkers.forEach(m => this.labelsLayer.remove(m));
      this.targetMarkers = [];
    },

    // ==================== 访客聚合（可选） ====================

    async trackVisitor() {
      console.log('[CustomMapMarker] 正在上传访客信息到 /api/visitors');
      try {
        const response = await fetch('/api/visitors', { method: 'POST' });
        console.log('[CustomMapMarker] 上传访客信息完成，状态:', response.status);
      } catch (e) {
        console.error('[CustomMapMarker] trackVisitor error:', e);
      }
    },

    startVisitorPolling() {
      console.log('[CustomMapMarker] 开始轮询访客数据，每60秒一次');
      this.loadVisitorMarkers();
      setInterval(() => this.loadVisitorMarkers(), 60000);
    },

    async loadVisitorMarkers() {
      console.log('[CustomMapMarker] 正在获取访客数据 from /api/visitors');
      try {
        const res = await fetch('/api/visitors');
        const visitors = await res.json();
        console.log('[CustomMapMarker] 获取到访客数据:', visitors);

        this.visitorMarkers.forEach(m => this.labelsLayer.remove(m));
        this.visitorMarkers = [];

        const coordMap = {};
        visitors.forEach(v => {
          const lng = parseFloat(v.location.longitude).toFixed(5);
          const lat = parseFloat(v.location.latitude).toFixed(5);
          const key = `${lng},${lat}`;

          if (!coordMap[key]) {
            coordMap[key] = {
              lng: Number(lng),
              lat: Number(lat),
              count: 0,
              city: v.location.city || '未知城市',
            };
          }
          coordMap[key].count++;
        });

        console.log('[CustomMapMarker] 处理后的访客坐标:', coordMap);

        Object.values(coordMap).forEach(point => {
          const marker = this.createCircleMarker(point, 'visitor');
          this.labelsLayer.add(marker);
          this.visitorMarkers.push(marker);
        });

        console.log('[CustomMapMarker] 已添加访客标记数量:', this.visitorMarkers.length);

      } catch (e) {
        console.error('[CustomMapMarker] loadVisitorMarkers error:', e);
      }
    },

    // 创建圆形标记
    createCircleMarker(point, type) {
      // 根据类型设置不同颜色
      const colors = {
        target: '#84b3ff',
        visitor: '#84b3ff'
      };

      // 根据数量调整大小
      const radius = Math.min(20, 5 + Math.log(point.count || 1));

      const circleIcon = {
        type: 'circle',
        radius: radius,
        fillColor: colors[type],
        fillOpacity: 0.8,
        strokeColor: '#ffffff',
        strokeWidth: 1,
      };

      // 根据数量设置不同字体大小和背景色
      const textSize = Math.min(22, 12 + Math.log(point.count || 1));
      const backgroundColor = this.getBackgroundColor(point.count, type);

      const textStyle = {
        fontSize: textSize,
        fontWeight: 'bold',
        fillColor: '#fff',
        padding: '4, 8',
        backgroundColor: backgroundColor,
        borderColor: '#fff',
        borderWidth: 1,
      };

      const labelMarker = new AMap.LabelMarker({
        name: point.name || point.city,
        position: [point.lng, point.lat],
        zooms: [2, 20],
        opacity: 1,
        zIndex: point.count || 1,
        icon: circleIcon,
        text: {
          content: `${point.name || point.city} (${point.count || 1})`,
          direction: 'top',
          offset: [0, -radius - 10],
          style: textStyle
        }
      });

      return labelMarker;
    },

    // 根据数量和类型获取背景颜色
    getBackgroundColor(count, type) {
      // 所有标记统一使用蓝色调
      if (count <= 1) return 'rgba(0, 102, 255, 0.7)';       // 浅蓝
      if (count <= 5) return 'rgba(0, 80, 220, 0.7)';        // 中蓝
      if (count <= 10) return 'rgba(0, 60, 180, 0.7)';       // 深蓝
      return 'rgba(0, 40, 140, 0.7)';                        // 暗蓝
    },

    beforeUnmount() {
      if (this.map) {
        this.map.destroy();
        this.map = null;
      }
    }
  }
}
</script>

<style scoped>
#amap-container {
  width: 100%;
  height: 600px;
  /* 根据实际需求调整 */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>