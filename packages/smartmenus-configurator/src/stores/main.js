import { defineStore } from 'pinia'
import { useParams } from '@/useParams'

const { params } = useParams()

const getDefaultMain = () => ({
  features: []
})

const getMain = () => {
  if (params['main']) {
    try {
      const mainPartial = JSON.parse(params['main'])
      return Object.assign(getDefaultMain(), mainPartial)
    } catch (e) {
      console.log(e)
    }
  }
  const main = localStorage.getItem('main')
  return main ? JSON.parse(main) : getDefaultMain()
}

export const useMainStore = defineStore('main', {
  state: () => getMain(),
  getters: {
    featureIsSelected(state) {
      return (feature) => state.features.includes(feature)
    }
  },
  actions: {
    reset() {
      this.$patch(getDefaultMain())
    }
  }
})
