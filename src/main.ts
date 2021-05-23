import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt';
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Avatar from 'primevue/avatar';
import BlockUI from 'primevue/blockui';
import Button from 'primevue/button';
import firebase from 'firebase/app';

import Card from 'primevue/card';

import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import Chips from 'primevue/chips';

import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import ContextMenu from 'primevue/contextmenu';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import DeferredContent from 'primevue/deferredcontent';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import Editor from 'primevue/editor';
import Fieldset from 'primevue/fieldset';
import FileUpload from 'primevue/fileupload';
// import FullCalendar from 'primevue/fullcalendar';
import InlineMessage from 'primevue/inlinemessage';
import Inplace from 'primevue/inplace';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import LButton from '@/components/elements/LButton.vue';

import ProgressSpinner from 'primevue/progressspinner';
import Password from 'primevue/password';

import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';

import Rating from 'primevue/rating';
import Sidebar from 'primevue/sidebar';

import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Timeline from 'primevue/timeline';
import Tree from 'primevue/tree';
import TreeTable from 'primevue/treetable';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';
import 'primevue/resources/themes/saga-green/theme.css' // theme
import 'primevue/resources/primevue.min.css' // core css
import 'primeicons/primeicons.css' // icons
import 'primeflex/primeflex.css';

// import 'bulma/css/bulma.css';
//import 'vee-validate';

const firebaseConfig = {
    apiKey: "AIzaSyCXEGbACkyMBqTS-pTsfbbW-g1Uskyigng",
    authDomain: "foxygreen-auth.firebaseapp.com",
    projectId: "foxygreen-auth",
    storageBucket: "foxygreen-auth.appspot.com",
    messagingSenderId: "1027386971129",
    appId: "1:1027386971129:web:656035f8cc9cc2171be328"
};

firebase.initializeApp(firebaseConfig);



import PageHeading from '@/components/elements/PageHeading.vue';

router.beforeEach(function (to, from, next) {
    window.scrollTo(0, 0);
    next();
});

const app = createApp(App)
const emitter = mitt();
app.config.globalProperties.emitter = emitter
app.component('PageHeading', PageHeading);
app.component('LButton', LButton);

//app.use(VeeValidate);

app.use(PrimeVue);
app.use(ToastService);
// app.use(ConfirmationService);
app.use(store)
app.use(router)


app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('Avatar', Avatar);
app.component('Button', Button);
app.component('Password', Password);

app.component('Card', Card);

app.component('Checkbox', Checkbox);
app.component('Chip', Chip);
app.component('Chips', Chips);

app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('ConfirmDialog', ConfirmDialog);
app.component('ConfirmPopup', ConfirmPopup);
app.component('ContextMenu', ContextMenu);
app.component('DataTable', DataTable);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('DeferredContent', DeferredContent);
app.component('Dialog', Dialog);
app.component('Divider', Divider);
app.component('Dropdown', Dropdown);
app.component('Editor', Editor);
app.component('Fieldset', Fieldset);
app.component('FileUpload', FileUpload);
// app.component('FullCalendar', FullCalendar);
app.component('InlineMessage', InlineMessage);
app.component('Inplace', Inplace);
app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);

app.component('LButton', LButton);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Password', Password);

app.component('Message', Message);
app.component('MultiSelect', MultiSelect);

app.component('Rating', Rating);
app.component('Sidebar', Sidebar);

app.component('TabPanel', TabPanel);
app.component('TabView', TabView);
app.component('Tag', Tag);
app.component('Textarea', Textarea);
app.component('Timeline', Timeline);
app.component('Tree', Tree);
app.component('TreeTable', TreeTable)
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);

const vm = app.mount('#app')

export default vm;