<style scoped>
.card {
    width: 340px;
    height: 200px;
    perspective: 1000px;
}

.card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.999s;
}

.card:hover .card-inner {
    transform: rotateY(180deg);
}

.card-front,
.card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
    overflow: hidden;
}

.card-front {
    background-color: #fff;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotateY(0deg);
}

.card-front img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-back {
    background-color: #47b1f3;
    color: #fff;
    transform: rotateY(180deg);
    padding: 15px;
    box-sizing: border-box;
}

.site-info {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.site-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.site-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.site-name {
    font-size: 18px;
    font-weight: bold;
}

.site-link {
    color: #fff;
    text-decoration: underline;
    margin-bottom: 10px;
    word-break: break-all;
    font-size: 14px;
}

.site-descr {
    font-size: 14px;
    line-height: 1.4;
    flex-grow: 1;
    overflow-y: auto;
}
</style>

<template>
    <div class="card">
        <div class="card-inner">
            <div class="card-front">
                <img v-if="siteshot" :src="siteshot" :alt="name + '截图'">
                <span v-else>无截图</span>
            </div>
            <div class="card-back">
                <div class="site-info">
                    <div class="site-header">
                        <img v-if="avatar" :src="avatar" :alt="name + '头像'" class="site-avatar">
                        <div class="site-name">{{ name }}</div>
                    </div>
                    <a :href="link" target="_blank" rel="noopener noreferrer" class="site-link">{{ link }}</a>
                    <div class="site-descr">{{ descr }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cards',
    props: {
        name: {
            type: String,
            default: '#站点名称'
        },
        link: {
            type: String,
            default: '#站点链接'
        },
        avatar: {
            type: String,
            default: '#站长头像'
        },
        descr: {
            type: String,
            default: '#站点描述'
        },
        siteshot: {
            type: String,
            default: '#站点截图'
        }
    }
}
</script>