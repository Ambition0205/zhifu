<template>
    <view>
        <pick-regions :default-regions="defaultRegions" @getRegions="handleGetRegions">
            <h2>选择省市区</h2>
        </pick-regions>
        <h3>{{regionsName}}</h3>
    </view>
</template>

<script>
    import pickRegions from '@/components/pick-regions/pick-regions.vue'
    export default {
        components:{
            pickRegions
        },
        data(){
            return {
                regions:[],
                defaultRegions:['广东省','广州市','番禺区']
            }
        },
        computed:{
            regionsName(){
                // 转为字符串
                return this.regions.map(item=>item.name).join(' ')
            }
        },
        methods:{
            // 获取选择的地区
            handleGetRegions(regions){
                this.regions = regions
            }
        }
    }
</script>