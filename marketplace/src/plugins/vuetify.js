import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '00A1FE',
        warning: '00FFFC',
        orange: 'CC9E26',
        blue: '00A1FE'
      }
    }
  },
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  }
})
