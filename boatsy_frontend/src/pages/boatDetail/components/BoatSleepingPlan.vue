<template>
    <div class="sleeping-plan-container">
        <div class="sleeping-plan-header">
            <h4 style="padding-top:16px">{{$t('boat_sleeping_plan-header')}}</h4>
        </div>
        <div class="sleeping-plan-body">
            <div class="sleeping-plan-content">
                <div class="sleeping-plan-icon">
                    <img src="/img/icons/master-bed.png"/>
                </div>
                <div class="sleeping-plan-name" style="font-size:18px;">
                    <span>{{$t('boat_sleeping_masterroom')}}</span>  x {{ room = (boatDetail.masterroom == null) ? "0" : boatDetail.masterroom }} 
                </div>
            </div>
            <div class="sleeping-plan-content">
                <div class="sleeping-plan-icon">
                    <img src="/img/icons/double-bed.png"/>
                </div>
                <div class="sleeping-plan-name"  style="font-size:18px;">
                    <span>Twin Kabin</span> x {{ room = (boatDetail.twinroom == null) ? "0" : boatDetail.twinroom }} 
                </div>
            </div>  
            <div class="sleeping-plan-content">
                <div class="sleeping-plan-icon">
                    <img src="/img/icons/double-bed.png"/>
                </div>
                <div class="sleeping-plan-name"  style="font-size:18px;">
                    <span>{{$t('boat_sleeping_doubleroom')}}</span> x {{ room = (boatDetail.doubleroom == null) ? "0" : boatDetail.doubleroom }} 
                </div>
            </div>
            <div class="sleeping-plan-content">
                <div class="sleeping-plan-icon">
                    <img src="/img/icons/single-bed.png"/>
                </div>
                <div class="sleeping-plan-name"  style="font-size:18px;">
                    <span>{{$t('boat_sleeping_singleroom')}}</span>  x {{ room = (boatDetail.singleroom == null) ? "0" : boatDetail.singleroom }} 
                </div>
            </div>
            <div class="sleeping-plan-content">
                <div class="sleeping-plan-icon">
                    <img src="/img/icons/salon.png"/>
                </div>
                <div class="sleeping-plan-name"  style="font-size:18px;">
                    <span>{{$t('boat_sleeping_room')}}</span> x {{ room = (boatDetail.salonroom == null) ? "0" : boatDetail.salonroom }} 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['boatDetail'],
    data() {
        return {
            room: ''
        }
    }
}
</script>
<style>
.sleeping-plan-body{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    text-align: start;
    gap: 2em;
}
.sleeping-plan-icon{
    width: 55px;
}
.sleeping-plan-icon img{
    width: 100%;
}
.sleeping-plan-content{
    padding: 15px;
    border-radius: 8px;
    width: 80%;
    display: flex;
    border: 1px solid #ddd;
    align-items: center;
    align-content: center;
}
.sleeping-plan-name{
    padding-left: 15px;
    font-weight:900;
}
.sleeping-plan-name span{
    font-size:16px;
    font-weight: 400;
}
.sleeping-plan-header h4{
    text-align: start;
}
@media (max-width:500px){
    .sleeping-plan-content{
        width:100%
    }
}
</style>
