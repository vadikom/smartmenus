import { defineStore } from 'pinia'
import { useParams } from '@/useParams'

const { params } = useParams()

const getNavbarTemplate = () => ({
  id: 1,
  collapse: false,
  navbarClasses: [],
  navClasses: [],
  customProperties: [],
  features: [],
  scriptOptions: [],
  key: String(Date.now() + Math.random()).replace(/\D/g, '')
})

const getDefaultNavbars = () => ({
  navbars: [getNavbarTemplate()],
  nextId: 2
})

const getNavbars = () => {
  if (params['navbars']) {
    try {
      const navbarsPartial = JSON.parse(params['navbars'])
      const navbars = getDefaultNavbars()
      for (const [index, navbarPartial] of navbarsPartial.navbars.entries()) {
        if (!navbars.navbars[index]) {
          navbars.navbars.push({ ...getNavbarTemplate(), id: index + 1 })
          navbars.nextId = index + 2
        }
        navbars.navbars[index] = Object.assign(navbars.navbars[index], navbarPartial)
      }
      return navbars
    } catch (e) {
      console.log(e)
    }
  }
  const navbars = localStorage.getItem('navbars')
  return navbars ? JSON.parse(navbars) : getDefaultNavbars()
}

export const useNavbarsStore = defineStore('navbars', {
  state: () => getNavbars(),
  getters: {
    getNavbarById(state) {
      return (id) => state.navbars.find((navbar) => navbar.id === id)
    },
    navbarClassIsSelected() {
      return (navbar, classes) => {
        return navbar.navbarClasses.some((value) => classes.includes(value))
      }
    },
    navbarClassIsSelectedForAny(state) {
      return (classes) => {
        let value = false
        for (const navbar of state.navbars) {
          value = this.navbarClassIsSelected(navbar, classes)
          if (value) {
            break
          }
        }
        return value
      }
    },
    featureIsSelected() {
      return (navbar, feature) => {
        return navbar.features.includes(feature)
      }
    }
  },
  actions: {
    addNavbar() {
      if (this.navbars.length === 0) {
        this.nextId = 1
      }
      this.navbars.push({ ...getNavbarTemplate(), id: this.nextId++ })
    },
    removeNavbar(id) {
      const navbar = this.getNavbarById(id)
      const index = this.navbars.indexOf(navbar)
      this.navbars.splice(index, 1)
    },
    reset() {
      this.$patch(getDefaultNavbars())
    }
  }
})
