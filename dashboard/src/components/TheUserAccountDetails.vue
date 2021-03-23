<template>
  <div class="mb-4">
    <div class="row page-header py-4 no-gutters">
      <div class="text-center text-sm-left mb-4 mb-sm-0 col-sm-4 col">
        <h3 class="page-title">Общие сведения</h3>
      </div>
    </div>
    <!-- Card Header -->
    <d-row>
      <d-col>
        <d-form>
          <d-form-row>
            <!-- First Name -->
            <d-col lg="6" md="12" sm="12" class="form-group">
              <TheUserAccountDetailsEmaildReset />
              <TheUserAccountDetailsChangePassword />
              <TheUserAccountDetailsApiKeys />
            </d-col>
            <d-col lg="6" md="12" sm="12" class="form-group">
              <TheUserAccountDetailsTopUp />
              <TheUserAccountDetailsRates />
            </d-col>
          </d-form-row>
        </d-form>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import TheUserAccountDetailsChangePassword from './TheUserAccountDetailsChangePassword';
import TheUserAccountDetailsApiKeys from './TheUserAccountDetailsApiKeys';
import TheUserAccountDetailsTopUp from './TheUserAccountDetailsTopUp';
import TheUserAccountDetailsRates from './TheUserAccountDetailsRates';
import TheUserAccountDetailsEmaildReset from './TheUserAccountDetailsEmaildReset';

export default {
  name: 'TheUserAccountDetails',
  components: {
    TheUserAccountDetailsChangePassword,
    TheUserAccountDetailsApiKeys,
    TheUserAccountDetailsTopUp,
    TheUserAccountDetailsRates,
    TheUserAccountDetailsEmaildReset,
  },
};
</script>

<style lang="scss" scoped>
.fields {
  display: block;
}
</style>
