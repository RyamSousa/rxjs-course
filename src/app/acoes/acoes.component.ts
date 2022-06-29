import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AcoesService } from "./acoes.service";
import { debounceTime, distinctUntilChanged, filter, switchMap } from "rxjs/operators";
import { merge } from "rxjs";

const ESPERA_GIGITACAO = 300;
@Component({
	selector: "app-acoes",
	templateUrl: "./acoes.component.html",
	styleUrls: ["./acoes.component.css"],
})
export class AcoesComponent {
	acoesInput = new FormControl();
	todasAcoes$ = this.acoesService.getAcoes();
	filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
		debounceTime(ESPERA_GIGITACAO),
		filter((valor) => valor.length >= 3 || !valor.length),
		distinctUntilChanged(),
		switchMap((valor) => this.acoesService.getAcoes(valor))
	);

	acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$);

	constructor(private acoesService: AcoesService) {}
}
