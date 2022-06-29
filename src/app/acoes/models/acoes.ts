export interface Acao {
	id: number;
	code: string;
	description: string;
	price: number;
}

export interface Acoes extends Array<Acao> {}

export interface AcoesAPI {
	payload: Acoes;
}
