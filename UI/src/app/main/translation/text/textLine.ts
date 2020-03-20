export class TextLine {
	
	textLine: string;
	
	constructor(textLine: string) {
		this.textLine = textLine;
	}
	
	getText() {
		return this.textLine;
	}
	
	toString(): string {
		return this.textLine;
	}
}