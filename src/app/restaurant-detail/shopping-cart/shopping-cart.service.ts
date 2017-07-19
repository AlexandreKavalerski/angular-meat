import { CartItem } from './cart-item.model'
import { MenuItem } from '../menu-item/menu-item.model'

export class ShoppingCartService{
  items: CartItem[] = []

  clear(): void{
    this.items = []
  }

  addItem(item: MenuItem): void{
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
    console.log(foundItem)

    if(foundItem){
      foundItem.quantity += 1
    }else{
      this.items.push(new CartItem(item))
    }
  }

  removeItem(item: any): void{
    this.items.splice(this.items.indexOf(item), 1)
  }

  total():number{
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0)
  }

}
