<template>
  <div></div>
</template>

<script>
export default {
  name: 'authredirect',
  created() {
    window.close();
    const params = this.$route.query;
    const { state } = params;
    const { code } = params;
    window.opener.location.href = `${window.location.origin}/#/login?state=${state}&code=${code}`;
  },
};
</script>

<style></style>
