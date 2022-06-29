import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, pluck } from "rxjs/operators";
import { Acao } from "./models/acoes";

@Injectable({
	providedIn: "root",
})
export class AcoesService {
	constructor(private httpClient: HttpClient) {}

	getAcoes() {
		return this.httpClient.get<any>(`http://localhost:3000/acoes`).pipe(
			pluck("payload"),
			map((acoes) => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB)))
		);
	}

	private ordenaPorCodigo(acaoA: Acao, acaoB: Acao): number {
		if (acaoA.code > acaoB.code) {
			return 1;
		}

		if (acaoA.code < acaoB.code) {
			return -1;
		}

		return 0;
	}
}
