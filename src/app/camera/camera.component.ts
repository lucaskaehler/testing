import { Component, OnInit, ViewChild } from '@angular/core';
import { Result } from '@zxing/library';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [ZXingScannerModule],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss'
})
export class CameraComponent implements OnInit {
  @ViewChild('scanner')
  scanner = new ZXingScannerComponent();
  hasDevices: boolean | undefined;
  hasPermission: boolean | undefined;
  qrResultString: string | undefined;
  qrResult: Result | undefined;

  availableDevices: MediaDeviceInfo[] | undefined;
  currentDevice: MediaDeviceInfo = null;

  ngOnInit(): void {

    this.scanner!.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;

      // selects the devices's back camera by default
      for (const device of devices) {
          if (/back|rear|environment/gi.test(device.label)) {
              this.scanner.device;
              this.currentDevice = device;
              break;
          }
      }
    });

    this.scanner!.camerasNotFound.subscribe(() => this.hasDevices = false);
    this.scanner!.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner!.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  }

  displayCameras(cameras: MediaDeviceInfo[]) {
    console.debug('Devices: ', cameras);
    this.availableDevices = cameras;
  }

  handleQrCodeResult(resultString: string) {
    console.debug('Result: ', resultString);
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selectedValue: string) {
    console.debug('Selection changed: ', selectedValue);
    this.currentDevice = this.scanner.device;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  scanSuccessHandler(arg: any){
    console.log(arg)
  }

  scanCompleteHandler(arg: any){
    console.log(arg)
  }

}
