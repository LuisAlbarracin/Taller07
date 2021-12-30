import { ARREGLO_CARROS } from './../../mocks/carro.mock';
import { Carro } from './../../modelos/carro.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent implements OnInit {

  public titulo: string;
  public arregloCarros: Carro[];
  public carroSeleccionado: Carro;

  // ***** Propiedades Modal y Mensajes *****
  public modalRef: BsModalRef;
  public modalTitulo: string;
  public modalCuerpo: string;
  public modalContenido: string;

  public paramentrosMensajes: any;

  constructor(public miModal: BsModalService, public miMensaje: ToastrService) {
    this.titulo = 'listado de carros';
    this.arregloCarros = ARREGLO_CARROS;
    this.carroSeleccionado = this.inicializarCarro();

    let temporal: any;
    this.modalRef = temporal;
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalCuerpo = '';

    this.paramentrosMensajes = {
      closeButton: true,
      enableHtml: true,
      progressBar: true,
      timeOut: 5000,
      positionClass: 'toast-top-center'
    };
  }

  ngOnInit(): void {
  }

  // ******* Métodos Obligatorios

  public inicializarCarro(): Carro {
    this.carroSeleccionado = new Carro(0, '', '', 0, '', '');
    return this.carroSeleccionado;
  }

  public seleccionarCarro(objCarro: Carro): void {
    this.carroSeleccionado = objCarro;
  }

  // ******** Logica del Negocio

  public crearCarro(): void {
    if (this.datosValidos()) {
      this.carroSeleccionado.codigo = this.arregloCarros.length + 1;
      this.arregloCarros.push(this.carroSeleccionado);
      this.inicializarCarro();
    }

  }


  public actualizarCarro(): void {
    if (this.datosValidos()) {
      this.inicializarCarro();
    }
  }

  public borrarCarro(miCarro: Carro): void {
    this.arregloCarros = this.arregloCarros.filter(
      (objetoCarro) => objetoCarro != miCarro
    );
    this.inicializarCarro();

  }

  public seleccionarFoto(caja: any): any {

    if (!caja.target.files[0] || caja.target.files[0].length == 0) {
      return;
    }

    const tipo = caja.target.files[0].type;

    if (tipo.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(caja.target.files[0]);
    reader.onload = () => {
      let temporal: any;
      temporal = reader.result;
      this.carroSeleccionado.fotoBase64 = temporal;
      this.carroSeleccionado.nombreFoto = caja.target.files[0].name;
    }

  }

  public datosValidos(): boolean {
    if (this.carroSeleccionado.placa == '' ||
      this.carroSeleccionado.marca == '' ||
      this.carroSeleccionado.modelo == 0) {
      this.miMensaje.error('No se puede crear el registro del carro', 'Advertencia', this.paramentrosMensajes);
      return false;
    }
    return true;
  }

  // ****** Métodos para ventanas Modales ******
  public abrirModal(plantilla: TemplateRef<any>, objCarro: Carro): void{
    this.carroSeleccionado = objCarro;
    this.modalRef = this.miModal.show(plantilla,{
      class: 'modal-md'
    });
    this.modalTitulo = 'Advertencia';
    this.modalCuerpo = '¿Realmente quieres eliminar el carro?';
    this.modalContenido = objCarro.placa + ' ' + objCarro.marca + ' ' + objCarro.modelo;
  }

  public btnCancelar(): void{
    this.modalRef.hide();
  }

  public btnEliminar(): void{
    this.borrarCarro(this.carroSeleccionado);
    this.btnCancelar();
  }

}
