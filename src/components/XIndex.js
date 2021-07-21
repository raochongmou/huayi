import ThePage from './ThePage'
// import XDynamicForm from './XDynamicForm'
// import XScoped from './XScoped'
import TableCard from './TableCard'
// import XAutocomplete from './XAutocomplete'
import XFilterSelect from './XFilterSelect'
// import XDateRangePicker from './XDateRangePicker'
// import XIframe from './XIframe'
// import XSelect from './XSelect'
// import XEnterindexGroup from './XEnterindexGroup'
import XCollapseCard from './XCollapseCard'

const components = [
  ThePage,
  TableCard,
  // XDynamicForm,
  // XScoped,
  // XAutocomplete,
  XFilterSelect,
  // XDateRangePicker,
  // XIframe,
  // XSelect,
  // XEnterindexGroup,
  XCollapseCard,
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  ...components,
}
