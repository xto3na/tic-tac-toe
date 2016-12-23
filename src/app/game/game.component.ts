import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { Cell } from "../cell";
import { Line } from "../line";



@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {
	
	playerSymbol:string = 'CROSS';
	compSymbol:string = null;
	cells: Cell[][];
	rows: number[];
	choosenBtnsEnabled:boolean = true;
	inProcess:boolean = false;
	lines:Line[] = new Array<Line>();
	priorityLineIndex:number = 0;
	
	constructor(public toastr: ToastsManager, vRef: ViewContainerRef) {
		this.toastr.setRootViewContainerRef(vRef);
		
		this.initializeCells();
		this.initializeLines();
	}
	
	// Initialize array with cells
	initializeCells() {
		let index:number = 1;
		this.rows = new Array(1,2,3,4,5);
		this.cells = [];
		for(let i=0; i<5;i++) {
			this.cells[i] = [];
			for(let j=0;j<5;j++) {
				this.cells[i][j] = new Cell({
					id:index,
					xCoord:i,
					yCoord:j
				});
				index++;
			}
		}
	}
	
	initializeLines() {
		this.lines = new Array<Line>();
		var c = this.cells;
		
		// Line 1-5
		for(let i=0;i<5;i++) {
			let c1:Cell[] = new Array<Cell>();
			for(let j=0;j<5;j++) {
				c1.push(c[i][j]);
			}
			this.lines.push(new Line({
				id:i,
				lineCells: c1
			}));
		}
		
		// Line 6-10
		let lineIndex = 5;
		for(let i=0; i<5; i++) {
			let c1:Cell[] = new Array<Cell>();
			for(let j=0;j<5;j++) {
				c1.push(c[j][i]);
			}
			this.lines.push(new Line({
				id:lineIndex,
				lineCells: c1
			}));
			lineIndex++;
		}
		
		// Line 11
		let lc11 = new Array<Cell>();
		for(let i=0; i<5; i++) {
			for(let j=0;j<5;j++) {
				if(i == j) {
					lc11.push(c[i][j]);
				}
			}
		}
		this.lines.push(new Line({
			id:10,
			lineCells: lc11
		}));
		// Line 12
		
		let lc12 = new Array<Cell>();
		lc12.push(c[4][0]);
		lc12.push(c[3][1]);
		lc12.push(c[2][2]);
		lc12.push(c[1][3]);
		lc12.push(c[0][4]);
		this.lines.push(new Line({
			id:11,
			lineCells: lc12
		}));
	}
	
	getCompSymbol() {
		if(this.playerSymbol === 'CROSS') {
			this.compSymbol = 'NOUGHT';
		} else {
			this.compSymbol = 'CROSS';
		}
	}
	
	setSymbol(i:number, j:number, symbol:string) {
		this.cells[i][j].symbol = symbol;
		this.cells[i][j].enabled = false;
	}
	
	isWon(checkSymbol:string) {
		// Check rows
		for(let i=0; i<5; i++) {
			if(this.cells[i][0].symbol == this.cells[i][1].symbol &&
				this.cells[i][1].symbol == this.cells[i][2].symbol &&
				this.cells[i][2].symbol == this.cells[i][3].symbol &&
				this.cells[i][3].symbol == this.cells[i][4].symbol &&
				this.cells[i][0].symbol == checkSymbol) {
				return true;
			}
		}
		
		// Check cols
		for(let i=0; i<5; i++) {
			if(this.cells[0][i].symbol == this.cells[1][i].symbol &&
				this.cells[1][i].symbol == this.cells[2][i].symbol &&
				this.cells[2][i].symbol == this.cells[3][i].symbol &&
				this.cells[3][i].symbol == this.cells[4][i].symbol &&
				this.cells[0][i].symbol == checkSymbol) {
				return true;
			}
		}
		
		// Check diagonal
		if(this.cells[0][0].symbol == this.cells[1][1].symbol &&
			this.cells[1][1].symbol == this.cells[2][2].symbol &&
			this.cells[2][2].symbol == this.cells[3][3].symbol &&
			this.cells[3][3].symbol == this.cells[4][4].symbol) {
			return this.cells[0][0].symbol == checkSymbol;
		}
		if(this.cells[0][4].symbol == this.cells[1][3].symbol &&
			this.cells[1][3].symbol == this.cells[2][2].symbol &&
			this.cells[2][2].symbol == this.cells[3][1].symbol &&
			this.cells[3][1].symbol == this.cells[4][0].symbol) {
			return this.cells[0][4].symbol == checkSymbol;
		}
	}// End isWon
	
	isWonPlayer() {
		return this.isWon(this.playerSymbol);
	}
	
	isWonComputer () {
		let compSymbol:string;
		if(this.playerSymbol === 'CROSS') {
			compSymbol = 'NOUGHT';
		} else {
			compSymbol = 'CROSS';
		}
		return this.isWon(compSymbol);
	}
	
	isExistEnableCells() {
		for(let i=0; i<5;i++) {
			for(let j=0;j<5;j++) {
				if(this.cells[i][j].enabled) {
					return true;
				}
			}
		}
		return false;
	}
	
	// When player click on cell
	move(i:number, j:number) {
		if(this.compSymbol === null) {
			this.getCompSymbol();
		}
		this.setSymbol(i,j, this.playerSymbol);
		if(this.isWonPlayer()) {
			this.toastr.success('Поздравляю! Вы выиграли!');
			this.resetGame();
		} else if (this.isWonComputer()) {
			this.toastr.error('К сожалению Вы проиграли');
			this.resetGame();
		} else if (!this.isExistEnableCells() && !this.isWonPlayer() && !this.isWonComputer()) {
			this.toastr.warning('Ничья...');
			this.resetGame();
		} else {
			this.moveComputer();
		}
	}
	
	rand(max:number) {
		return Math.floor(Math.random() * max);
	}
	
	moveComputer() {
		if(this.cells[2][2].enabled) {
			this.setSymbol(2, 2, this.compSymbol);
		} else {
			let dangerTarget = this.getDangerLines();
			if(dangerTarget === null) {
				let targetPriority = this.getPriorityCell();
				if(targetPriority === null) {
					let enabledCells:Cell[] = new Array<Cell>();
					for(let i=0;i<5;i++) {
						for(let j=0; j<5; j++) {
							if(this.cells[i][j].enabled) {
								enabledCells.push(this.cells[i][j]);
							}
						}
					}
					let rand = enabledCells[this.rand(enabledCells.length)];
					this.setSymbol(rand.xCoord, rand.yCoord, this.compSymbol);
					if(this.isWonComputer()) {
						this.toastr.error('К сожалению Вы проиграли');
						this.resetGame();
					} else {
						return false;
					}
				}
				this.setSymbol(targetPriority.xCoord, targetPriority.yCoord, this.compSymbol);
				if(this.isWonComputer()) {
					this.toastr.error('К сожалению Вы проиграли');
					this.resetGame();
				} else {
					return false;
				}
			}else{
				let target = this.getDangerLines();
				this.setSymbol(target.xCoord, target.yCoord, this.compSymbol);
				if(this.isWonComputer()) {
					this.toastr.error('К сожалению Вы проиграли');
					this.resetGame();
				} else {
					return false;
				}
			}
		}
	}
	
	getDangerLines() {
		for(let i=0; i<12; i++) {
			let playerPoint:number = 0;
			for(let j=0; j<5; j++) {
				if(this.lines[i].lineCells[j].symbol === this.compSymbol) {
					playerPoint = 0;
					break;
				}else if(this.lines[i].lineCells[j].symbol === this.playerSymbol) {
					playerPoint++;
				}
			}
			if(playerPoint >= 3) {
				return this.getTargetCellInLine(this.lines[i]);
			}
		}
		return null;
	}
	
	getPriorityCell() {
		let target:Cell;
		let maxPoints = 0;
		for(let i=0;i<12;i++) {
			let points = 0;
			for(let j=0; j<5; j++) {
				if(this.lines[i].lineCells[j].symbol === this.playerSymbol) {
					points = 0;
					break;
				}else if(this.lines[i].lineCells[j].symbol === this.compSymbol) {
					points++;
				}
			}
			if(maxPoints < points) {
				maxPoints = points;
				this.priorityLineIndex = i;
			}
		}
		if(maxPoints === 0) {
			return null;
		} else {
			return this.getTargetCellInLine(this.lines[this.priorityLineIndex]);
		}
	}
	
	getTargetCellInLine(line:Line) {
		for(let i=0; i<5; i++) {
			if(line.lineCells[i].enabled) {
				return line.lineCells[i];
			}
		}
	}
	
	
	choosePlayerSymbol(symbol:string) {
		this.playerSymbol = symbol;
	}
	
	
	startGame() {
		// Disable choosen btns
		this.choosenBtnsEnabled = false;
		this.inProcess = true;
	}
	
	resetGame() {
		this.choosenBtnsEnabled = true;
		this.inProcess = false;
		this.playerSymbol = "CROSS";
		this.compSymbol = null;
		this.initializeCells();
		this.initializeLines();
	}
	
	ngOnInit() {
	}
	
}
