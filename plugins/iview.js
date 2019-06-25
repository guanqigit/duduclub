
// ssr install iview plugins
import Vue from "vue"

import 'iview/dist/styles/iview.css'
// import iView from "iview"
// Vue.use(iView)

import { 
    Button, 
    Table,
    Menu,
    MenuItem,
    Submenu,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon,
    Card,
    Form,
    Page,
    FormItem,
    Input,
    Poptip,
    Modal,
    Tabs,
    TabPane,
    Select,
    Option,
    Message,
    RadioGroup,
    Radio,
    InputNumber,
    Spin
} from 'iview'
Vue.component('Button', Button)
Vue.component('Table', Table)
Vue.component('Menu', Menu)
Vue.component('Submenu', Submenu)
Vue.component('MenuItem', MenuItem)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Icon', Icon)
Vue.component('Card', Card)
Vue.component('Form', Form)
Vue.component('Page', Page)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Poptip', Poptip)
Vue.component('Modal', Modal)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Message', Message) 
Vue.component('RadioGroup', RadioGroup) 
Vue.component('Radio', Radio) 
Vue.component('InputNumber', InputNumber) 
Vue.component('Spin', Spin)

Vue.prototype.$Message=Message
Vue.prototype.$Spin=Spin

