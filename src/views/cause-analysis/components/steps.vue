<template>
  <div style="display: flex; justify-content: center; align-items: center">
    <div class="circle_out">
      <div class="circle_in">开始</div>
    </div>
    <div class="ellipsis">....................</div>
    <div :class="[props.steps > 1 ? 'circle_out' : 'circle_out_noActive']">
      <div :class="[props.steps > 1 ? 'circle_in' : 'circle_in_noActive']">分析</div>
    </div>
    <div class="ellipsis">....................</div>
    <div :class="[props.steps > 2 ? 'circle_out' : 'circle_out_noActive']">
      <div :class="[props.steps > 2 ? 'circle_in' : 'circle_in_noActive']">完毕</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['steps']);
</script>
<style lang="scss" scoped>
.circle_out {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(222, 240, 255, 1);
}
.circle_out_noActive {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid rgba(175, 195, 246, 1);
}
.circle_in {
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 60px;
  font-size: 16px;
  background-color: rgba(0, 120, 255, 1);
}
.circle_in_noActive {
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 60px;
  font-size: 16px;
  background-color: rgba(175, 195, 246, 1);
}
.ellipsis {
  color: rgba(175, 195, 246, 1);
  font-size: 50px;
  letter-spacing: 5px;
  padding-bottom: 35px;
  margin: 0 30px;
}
</style>