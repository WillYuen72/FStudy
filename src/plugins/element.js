import {
  Button,
  Select,
  Option,
  Card,
  Table,
  TableColumn,
  Pagination,
  Row,
  Container,
  Aside,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Header,
  Main,
  Footer,
  Form,
  FormItem,
  Input
} from 'element-ui'
import locale from 'element-ui/lib/locale'
import i18n from '../locales'

const INIT_ELEMENTS = [
  Button, Card,
  Select, Option,
  Table, TableColumn, Pagination,
  Row,
  Aside, Menu, MenuItem, Submenu, MenuItemGroup,
  Container, Header, Main, Footer, Form, FormItem, Input
]

function initElementUI (Vue) {
  const availableLocales = i18n.availableLocales
  Vue.prototype.$log.info('loading elementUI language', availableLocales)

  for (const lang of availableLocales) {
    try {
      const elementUILang = require(`element-ui/lib/locale/lang/${lang}`).default
      i18n.mergeLocaleMessage(lang, elementUILang)
    } catch (e) {
      Vue.prototype.$log.warn(e.message)
    }
  }
  locale.i18n((key, value) => i18n.t(key, value))
  AddElementUIComponents(Vue)
}

function AddElementUIComponents (Vue) {
  for (const el of INIT_ELEMENTS) {
    Vue.prototype.$log.info('add', el.name)
    Vue.use(el)
  }
}
export default initElementUI
