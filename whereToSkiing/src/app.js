import Mountain from './core/mountain';
import Hill from './core/hill';

document.getElementById('mapInput').addEventListener('change', () => {
    const file = document.getElementById('mapInput').files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const rawData = reader.result;
        const mapInfo = rawData.split('\n');
        const mountain = new Mountain({size:{width: 1000, length: 1000 }});

        for(let index = 1; index < mapInfo.length - 2; ++index){
            let hills = mapInfo[index].split(' ');
            for(const hill of hills){
                mountain.addHillInfo(new Hill({height:parseInt(hill)}));
            }
        }
    };

    reader.readAsText(file, 'UTF-8');
});