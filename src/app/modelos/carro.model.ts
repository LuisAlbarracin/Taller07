export class Carro {

  public codigo: number;
  public placa: string;
  public marca: string;
  public modelo: number;

  public nombreFoto: string;
  public fotoBase64: string;

  constructor(cod: number, pla: string, mar: string, mod: number, nom: string, fot: string) {
    this.codigo = cod;
    this.placa = pla;
    this.marca = mar;
    this.modelo = mod;
    this.nombreFoto = nom;
    this.fotoBase64 = fot;
  }

}
