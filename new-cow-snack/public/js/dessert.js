document.addEventListener('alpine:init', () => {
  Alpine.data('dessert', () => ({
    showBoisson: false,
    showDessert: false,
    boisson: '',
    newBoisson: '',
    dessert: '',

    toggleShowBoisson() { this.showBoisson = !this.showBoisson },
    toggleShowDessert() { this.showDessert = !this.showDessert },
    toggleBoisson(drink) { this.boisson = drink },
    toggleDessert(dessert) { this.dessert = dessert },
    
    finishOrder() {
      axios.post('/sandwich/second-step', {
        boisson: this.showBoisson ? this.newBoisson || this.boisson : undefined,
        dessert: this.showDessert ? this.dessert : undefined
      }).then(() => {
        window.location.href = '/delivery'
      })
      console.log(this.newBoisson ? this.newBoisson : this.boisson)
    }
  }))
})