import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from './post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  SelectVendor = "0";
  RateValue: any;
  rate: any;
  RateCardValue = "";
  submitted = false;
  vendorform: any = FormGroup;
  UpdateVendorform: any = FormGroup;

  requestDate: any = Date;
  vendorName: any;
  rateCard: any;
  selectedRate: any;
  projectName: any;
  status: any;
  budgetHrs: any;
  remarks: any;
  attachment: any;
  filteredRateCards: any = [];
  rateDisabled: boolean = false;
  vendorsArray: any = [];


  constructor(private modalService: NgbModal, private router: Router, private formBuilder: FormBuilder, private serviceobj: PostService) { }

  ngOnInit(): void {
    this.vendorform = this.formBuilder.group({
      requestDate: ['', Validators.required],
      vendorName: ['', Validators.required],
      rateCard: [''],
      rate: [''],
      projectName: ['', Validators.required],
      budgetHrs: ['', Validators.required],
      remarks: ['', Validators.required],
      attachment: ['']
    });

    this.UpdateVendorform = this.formBuilder.group({
      requestDate: ['', Validators.required],
      vendorName: ['', Validators.required],
      rateCard: [''],
      rate: [''],
      projectName: ['', Validators.required],
      budgetHrs: ['', Validators.required],
      remarks: ['', Validators.required],
      attachment: ['']
    });

    this.serviceobj.GetVendorValues().subscribe(rrr => {
      this.vendorsArray = rrr;
      // alert(JSON.stringify(rrr));
    });

  }

  onSave() {
    let obj = this.vendorform.value;
    let body = new HttpParams;
      body = body.set('requestDate', obj.requestDate);
      body = body.set('vendorName', obj.vendorName);
      body = body.set('rateCard', obj.rateCard);
      body = body.set('rate', obj.rate);
      body = body.set('status', 'save');
      body = body.set('projectName', obj.projectName);
      body = body.set('budgetHrs', obj.budgetHrs);
      body = body.set('remarks', obj.budgetHrs);
      body = body.set('attachment', obj.budgetHrs);
    this.serviceobj.submitVendor(body).subscribe(rrr => {
      window.location.reload();
    });


  }

  get f() { return this.vendorform.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.vendorform.valid) {
      let obj = this.vendorform.value;
      let body = new HttpParams;
      body = body.set('requestDate', obj.requestDate);
      body = body.set('vendorName', obj.vendorName);
      body = body.set('rateCard', obj.rateCard);
      body = body.set('rate', obj.rate);
      body = body.set('status', 'submit');
      body = body.set('projectName', obj.projectName);
      body = body.set('budgetHrs', obj.budgetHrs);
      body = body.set('remarks', obj.budgetHrs);
      body = body.set('attachment', obj.budgetHrs);
      this.serviceobj.submitVendor(body).subscribe(rrr => {
        // alert(JSON.stringify(rrr));
        // if (rrr.affectedRows1 == 1) {
        //   alert("User Registration has been completed successfuly");
        // } 
        // else {
        //   alert('Contact No. is already registered Or Something Wrong Try Again');
        // }
        window.location.reload();
      });

    }
  }

  onChangeReference(val) {
    // alert("selected value " + val.target.value);
    this.SelectVendor = val.target.value;
  }

  patchRate() {
    this.vendorform.patchValue({
      rate: this.RateValue,
    });
  }

  onChangeRateCardValue(val) {
    this.RateCardValue = val.target.value;

    switch (this.RateCardValue) {
      case 'rate_card_1':
        this.RateValue = 'Rs.100';
        break;
      case 'rate_card_2':
        this.RateValue = '25$';
        break;
      case 'rate_card_3':
        this.RateValue = 'Rs.150';
        break;
      case 'rate_card_4':
        this.RateValue = 'Rs.200';
        break;
      default:
        this.RateValue = '';
    }

    this.patchRate();
  }

  onUpdate(id) {
    this.submitted = true;
    if (this.UpdateVendorform.valid) {
      let obj = this.UpdateVendorform.value;
      this.serviceobj.UpdateVendor(id, obj).subscribe(rrr => {
        alert(JSON.stringify(rrr));
        window.location.reload();
      });

    }
  }

  exportJson(): void {
    this.serviceobj.exportAsExcelFile(this.vendorsArray, 'Vender_List');
  }


  deleteRow(id: any) {
    this.serviceobj.deleteVendor(id).subscribe(rrr => {
      window.location.reload();
    });
  }
  id: any;
  patchAllValues(updateValuesModal, val: any) {
    this.modalService.open(updateValuesModal, { size: 'md', centered: true });
    this.id = val.id;
    setTimeout(() => {
      this.UpdateVendorform.patchValue({
        requestDate: val.requestDate,
        vendorName: val.vendorName,
        rateCard: val.rateCard,
        rate: val.rate,
        projectName: val.projectName,
        status: val.status,
        budgetHrs: val.budgetHrs,
        remarks: val.remarks,
        attachment: val.attachment
      });
    }, 10);

  }

  viewDetails(v) {
    this.id = v.id;
  }


  // ********************************************************************************************
  updateRateCardAndRate() {
    const selectedRateCard = this.vendorform.get('rateCard').value;
    this.selectedRate = selectedRateCard;
    if (selectedRateCard === 'card1') {
      this.vendorform.get('rate').setValue('100');
    } else if (selectedRateCard === 'card2') {
      this.vendorform.get('rate').setValue('25');
    } else {
      this.vendorform.get('rate').setValue('');
    }
    this.rateDisabled = selectedRateCard === 'card1' || selectedRateCard === 'card2';
  }
  // *********************************************************************************************
  onFileSelected(event: any): void {
    this.attachment = event.target.files[0];
  }



  updateRate(): void {
    switch (this.rateCard) {
      case 'rate-card-1':
        this.selectedRate = 'Rs.100';
        break;
      case 'rate-card-2':
        this.selectedRate = '25$';
        break;
      case 'rate-card-3':
        this.selectedRate = 'Rs.150';
        break;
      case 'rate-card-4':
        this.selectedRate = 'Rs.200';
        break;
      default:
        this.selectedRate = '';
    }
  }
}