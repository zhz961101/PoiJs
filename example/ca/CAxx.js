'use strict';

const maxX = 20;
const maxY = 20;

let poiApp = Poi({
    el: "#app",
    tpl: "#app-template",
    data: {
        stepCount: 0,
        states: [],
        isPlaying: false,
        play: function(msg){
            console.log(msg)
            this.isPlaying = true;
            this.next();
            // console.log(this.timer)
        },
        stop: function(){
            this.isPlaying = false;
        },
        next: function(){
            if (this.states.length == 0) {
                this.random(false)
                return
            }
            this.stepCount += 1
            let isSurvival = (state, Neighbours) => {
                let saveCount = 0;
                for (let cell_state of Neighbours) {
                    saveCount += cell_state?1:0;
                }
                if (state == 1) {
                    if (saveCount < 2) {
                        return false
                    }
                    if (saveCount > 3) {
                        return false
                    }
                    return true
                } else {
                    if (saveCount == 3) {
                        return true
                    } else {
                        return false
                    }
                }
            }
            let getNearArr = (rows, celli) => {
                let temp = []
                let getStates = (i,j)=>{
                    if(i<0||i>=maxX||j<0||j>=maxY){
                        return 0
                    }
                    return this.states[i][j]
                }
                temp.push(getStates(rows - 1,celli - 1))
                temp.push(getStates(rows - 1,celli))
                temp.push(getStates(rows - 1,celli + 1))
                temp.push(getStates(rows + 1,celli - 1))
                temp.push(getStates(rows + 1,celli))
                temp.push(getStates(rows + 1,celli + 1))
                temp.push(getStates(rows,celli - 1))
                temp.push(getStates(rows,celli + 1))
                for (let _t of temp) {
                    if (_t == undefined) _t = 0
                }
                return temp
            }
            let tempStates = []
            for (let rowi in this.states) {
                let row = this.states[rowi]
                let t_rows = []
                for (let celli in row) {
                    let cell = row[celli]
                    t_rows.push(isSurvival(cell, getNearArr(parseInt(rowi), parseInt(celli)))?true:false)
                }
                tempStates.push(t_rows)
            }
            this.states = tempStates
        },
        random: function(clear){
            this.stepCount = 0
            // if(this.states.length!=0)return
            if(clear)this.stop(this)
            let tempStates = []
            for (let i = 0; i < maxX; i++) {
                let row = []
                for (let j = 0; j < maxY; j++) {
                    row.push(Math.random()>0.5?true:false)
                }
                tempStates.push(row)
            }
            this.states = tempStates
        }
    },
    watch: {
        // msg:(self)=>{
        //     console.log(self);
        // }
    },
    mounted: {
        init() {
            this.random();
        },
        renderBefore(){
            console.log("**render before**")
        },
        renderAfter(){
            console.log("**render after**")
            if(this.isPlaying)setTimeout(()=>this.next(),500)
        }
    }
})