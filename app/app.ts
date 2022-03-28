import { DealController } from "./controllers/Deal.controller.js"
import { DealService } from "./services/Deal.service.js"
import { DealView } from "./views/Deal.view.js"

// const dealController = new DealController(new DealService(), new DealView())

// const date = document.querySelector("#data") as HTMLInputElement
// const quantity = document.querySelector("#quantidade") as HTMLInputElement
// const value = document.querySelector("#valor") as HTMLInputElement

// const form = document.querySelector("[data-form='form']")

const app = new DealController(new DealService(), new DealView())

// form?.addEventListener('submit', (event) => {
//     event.preventDefault()
//     const newDeal = {
//         date: date.value,
//         quantity: Number(quantity.value),
//         value: Number(value.value)
//     }
//     dealController.handleAddDeal(newDeal);
// })

export default app