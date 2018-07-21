import Mountain from './core/mountain';
import Hill from './core/hill';

document.getElementById('mapInput').addEventListener('change', () => {
    const file = document.getElementById('mapInput').files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const rawData = reader.result;
        const mapInfo = rawData.split('\n');
        const mountain = new Mountain({size:{width: 1000, length: 1000 }});
        let longestTopHill = null,
            longestLength = 0,
            steepestDrop = 0;

        for(let index = 1; index < mapInfo.length - 1; ++index){
            let hills = mapInfo[index].split(' ');
            for(const hill of hills){
                mountain.addHillInfo(new Hill({height:parseInt(hill)}));
            }
            console.log(index);
        }

        for(let index = 0; index < 1000; ++index){
            let hills = mountain.getTerrain()[index];
            for(let hillIndex = 0; hillIndex < 1000; ++hillIndex){
                let hill = hills[hillIndex];
                let length = hill.getLength(),
                    drop = hill.getSteepestDrop();

                if(longestLength < length){
                    longestTopHill = hill;
                    longestLength = length;
                }else if(longestLength === length && longestTopHill.getDrop() < hill.getDrop()){
                    longestTopHill = hill;
                    longestLength = length;
                }

                if(steepestDrop < drop){
                    steepestDrop = drop;
                }
            }
        }

        alert(`longestLength:${longestLength} dropSize:${longestTopHill.getDrop()} steepestDrop:${steepestDrop}`);
    };

    reader.readAsText(file, 'UTF-8');
});