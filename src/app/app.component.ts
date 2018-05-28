import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Device} from "../model/device";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    devices: Device[];
    active: Device = {} as Device;
    visibleForm: string = 'edit';

    constructor(private http: HttpClient) {
        this.getAllDevices();
    }

    public setActive(device: Device) {
        this.active = device;
        console.log(this.active);
    }

    public swapForm(formName) {
        this.visibleForm = formName;
    }

    public removeItem(device: Device) {
        this.http.delete('http://localhost:3000/devices/' + device.id)
            .subscribe(() => {
                let index = this.devices.indexOf(device);
                this.devices.splice(index, 1);
                console.log('telefono eliminato');
            }, () => alert('Si è verificato un errore'));
    }

    public updateItem(form: NgForm) {
        const deviceUpdated = Object.assign({}, this.active, form.value);
        this.http.put('http://localhost:3000/devices/' + deviceUpdated.id, deviceUpdated)
            .subscribe(() => {
                let index = this.devices.findIndex((device) => device.id === deviceUpdated.id);
                this.devices[index] = deviceUpdated;
                console.log('telefono aggiornato');
            }, () => alert('Si è verificato un errore'));
    }

    public saveItem(form: NgForm) {
        const newDevice = form.value;
        this.http.post<Device>('http://localhost:3000/devices', newDevice)
            .subscribe((result) => {
                this.devices.push(result);
                console.log('telefono inserito');
            }, () => alert('Si è verificato un errore'));
    }

    private getAllDevices() {
        this.http.get<Device[]>('http://localhost:3000/devices')
            .subscribe(result => {
                this.devices = result;
                this.setActive(this.devices[0]);
            });
    }
}
