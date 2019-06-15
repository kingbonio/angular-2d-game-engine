import { Injectable, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Type } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { ModalModule } from '../modal.module';
import { ModalConfig } from '../modal-config';
import { ModalInjector } from '../modal-injector';

@Injectable()
export class ModalService {
  modalComponentRef: ComponentRef<ModalComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
  ) { }

  public open(componentType: Type<any>, config: ModalConfig) {
    this.appendDialogComponentToBody(config);

    this.modalComponentRef.instance.childComponentType = componentType;
  }

  public close() {
    this.removeDialogComponentFromBody();
  }

  private appendDialogComponentToBody(config: ModalConfig) {
    // Create a map with the config
    const map = new WeakMap();
    map.set(ModalConfig, config);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);

    const componentRef = componentFactory.create(new ModalInjector(this.injector, map));
    this.applicationRef.attachView(componentRef.hostView);

    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);

    this.modalComponentRef = componentRef;
  }

  private removeDialogComponentFromBody() {
    this.applicationRef.detachView(this.modalComponentRef.hostView);
    this.modalComponentRef.destroy();
  }

}
