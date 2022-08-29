document.addEventListener('alpine:init', () => {
  Alpine.data('sandwich', () => ({
    type: '',
  
    toggleType(type) {
      this.type = type
    }
  }))

  Alpine.data('custom', () => ({
    viandesLimit: 2,
    accompagnementsLimit: 2,
    saucesLimit: 3,
    viandes: [],
    accompagnements: [],
    sauces: [],
    size: 'S',
    name: '',
    precisions: '',

    toggleIngredient(type, ingredient) { 
      if (type === 'size') {
        this[type] = ingredient
      } else if (this[type].includes(ingredient)) {
        const index = this[type].findIndex((ing) => ing === ingredient)
        this[type].splice(index,1)
      } else {
        if (this[type+'Limit'] <= this[type].length) return
        this[type].push(ingredient)
      }
    },

    send() {
      axios.post('/sandwich/first-step', {
        viandes: this.viandes,
        accompagnements: this.accompagnements,
        sauces: this.sauces,
        size: this.size,
        name: this.name,
        precisions: this.precisions
      }).then(() => {
        window.location.href = '/dessert'
      })
    }
  }))
})