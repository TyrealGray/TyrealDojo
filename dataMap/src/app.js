import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Heatmap from 'ol/layer/Heatmap';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import Draw, {createBox} from 'ol/interaction/Draw';
import {fromLonLat, toLonLat} from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from "ol/source/Vector";
import Vector from 'ol/layer/Vector';
import Config from './config';

import DateMockResponse from './mock/date';
import PointMockResponse from './mock/point';
import AreaMockResponse from './mock/area';
import NearPointMockResponse from './mock/near';

const STATUS_POINT = 'STATUS_POINT';
const STATUS_NEAR = 'STATUS_NEAR';
const STATUS_AREA = 'STATUS_AREA';

export default class App {
	constructor(id) {
		this.divID = id;
		this.map = null;
		this.view = null;
		this.draw = null;
		this.heat = null;
		this.drawLayer = null;
		this.pointsDataSource = null;
		this.areaPoints = [];
		this.status = STATUS_POINT;

		this._init();

		this._onNearPointResponse(PointMockResponse.text);
	}

	_init() {
		this.view = new View({
			center: fromLonLat([0, 50]),
			zoom: 6,
		});
		this.map = new Map({
			target: this.divID,
			layers: [
				new TileLayer({
					source: new OSM()
				})
			],
			view: this.view,
		});

		this._initSelectInput();

		this._initMouseEvent();

		this._initHeat();

		this._initTodayStatus();
	}

	_initTodayStatus() {
		const date = new Date(Date.now());
		const todayStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		fetch(`${Config.url.base}${Config.url.date}${todayStr}`, {
			method: 'GET',
		}).then(response => response.text())
			.then(text => {
				const dateJson = JSON.parse(text);

				this._onDateQuery(dateJson);
			})
			.catch(e => {
				console.log(e);

				const dateJson = JSON.parse(DateMockResponse.text);
				this._onDateQuery(dateJson);
			});
	}

	_initSelectInput() {
		const input = document.getElementById('queryMode');

		input.addEventListener('change', (e) => {
			if (this.status === STATUS_AREA) {
				this._removeDraw();
			}

			this.status = e.target.value;

			if (e.target.value === STATUS_AREA) {
				this._initDraw();
			}
		});
	}

	_initMouseEvent() {
		this.map.on('singleclick', (evt) => {
			switch (this.status) {
				case STATUS_POINT:
					this._onPointQuery(evt.coordinate);
					break;
				case STATUS_NEAR:
					this._onNearQuery(evt.coordinate);
					break;
				case STATUS_AREA:
					this._onAreaQuery(evt.coordinate);
					break;
				default:
					break;
			}
		});
	}

	_onDateQuery(dateJson){
		let todayStatusStr = '';

		for(const dateInfo of dateJson){
			todayStatusStr += `publisher:${dateInfo.publisher}, count:${dateInfo.count}\n`
		}

		document.getElementById('todayStatus').innerText = todayStatusStr;
	}

	_onNearQuery(coordinate) {
		const lonlat = toLonLat(coordinate);

		this.pointsDataSource.clear();

		fetch(`${Config.url.base}${Config.url.nearGivenPoint}${lonlat[1]}/${lonlat[0]}`, {
			method: 'GET',
		}).then(response => response.text())
			.then(responseText => {
				const nearPointResponseJson = JSON.parse(responseText);
				this._createHeatPointByJson(nearPointResponseJson);
			})
			.catch(e => {
				console.log(e);

				const nearPointMockResponseJson = JSON.parse(NearPointMockResponse.text);

				for (const nearPointJson of nearPointMockResponseJson) {
					this._createHeatPointByJson(nearPointJson);
				}
			});
	}

	_onAreaQuery(coordinate) {
		this.areaPoints.push(toLonLat(coordinate));

		if (this.areaPoints.length === 2) {

			this.pointsDataSource.clear();

			const lotlatFirst = this.areaPoints[0],
				lotlatSecond = this.areaPoints[1];

			fetch(`${Config.url.base}${Config.url.area}${lotlatFirst[1]}/${lotlatFirst[0]}/${lotlatSecond[1]}/${lotlatSecond[0]}`, {
				method: 'GET',
			}).then(response => response.text())
				.then(responseText => {
					const areaResponseJson = JSON.parse(responseText);
					for (const areaInfoJson of areaResponseJson) {
						this._createHeatPointByJson(areaInfoJson);
					}
				})
				.catch(e => {
					console.log(e);

					const areaMockResponseJson = JSON.parse(AreaMockResponse.text);

					for (const areaInfoJson of areaMockResponseJson) {
						this._createHeatPointByJson(areaInfoJson);
					}
				});

			this.areaPoints = [];

			this._removeDraw();
			this._initDraw();
		}
	}

	_onPointQuery(coordinate) {
		this.pointsDataSource.clear();
		const lonlat = toLonLat(coordinate);

		fetch(`${Config.url.base}${Config.url.givenPoint}${lonlat[1]}/${lonlat[0]}`, {
			method: 'GET',
		}).then(response => response.text())
			.then(responseText => {
				this._onNearPointResponse(responseText);
			})
			.catch(e => {
				console.log(e);

				this._onNearPointResponse(PointMockResponse.text);
			});
	}

	_onNearPointResponse(responseText) {
		const responseJson = JSON.parse(responseText);
		this._createHeatPointByJson(responseJson);

		//fly to that point
		const {longitude, latitude} = responseJson;
		const position = fromLonLat([longitude, latitude]);
		this.view.animate({
			center: position,
			duration: 2000
		});

		this.view.animate({
			zoom: this.view.getZoom() - 1,
			duration: 1000
		}, {
			zoom: 10,
			duration: 1000
		});
	}

	_createHeatPointByJson(responseJson) {
		const {longitude, latitude} = responseJson;
		const position = fromLonLat([longitude, latitude]);

		const point = new Point(position);
		const pointFeature = new Feature({
			geometry: point,
			weight: 1
		});

		this.pointsDataSource.addFeature(pointFeature);
	}

	_initDraw() {
		const source = new VectorSource({wrapX: false});

		this.drawLayer = new Vector({
			source: source
		});
		this.draw = new Draw({
			source: source,
			type: 'Circle',
			geometryFunction: createBox()
		});

		this.map.addLayer(this.drawLayer);
		this.map.addInteraction(this.draw);
	}

	_removeDraw() {
		this.map.removeLayer(this.drawLayer);
		this.map.removeInteraction(this.draw);
	}

	_initHeat() {
		this.pointsDataSource = new VectorSource();

		this.heat = new Heatmap({
			source: this.pointsDataSource,
			blur: 8,
			radius: 4
		});
		this.map.addLayer(this.heat);
	}
}

