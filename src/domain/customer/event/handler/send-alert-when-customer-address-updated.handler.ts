import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressUpdatedEvent from "../customer-address-updated.event";

export default class SendAlertWhenCustomerAddressUpdatedHandler
  implements EventHandlerInterface<CustomerAddressUpdatedEvent>
{
  handle(event: CustomerAddressUpdatedEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.clientId}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`); 
  }
}
