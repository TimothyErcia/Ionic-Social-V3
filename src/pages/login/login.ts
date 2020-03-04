import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { FireService } from '../../environment';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  todo: FormGroup;
  logginIn: boolean = false;
  showIcon = 'md-eye';
  showType = 'password';
  fireDB = new FireService;

  validation_messages = {
    'username' : [
      { type: 'required', message: 'Please enter your username.' },
    ],
    'password' : [
      { type: 'required', message: 'Please enter your password.' },
    ]
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController) {
      this.todo = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ionViewDidLoad() {

  }

  showPassword(){
    this.showIcon = this.showIcon == 'md-eye' ? 'md-eye-off' : 'md-eye';
    this.showType = this.showType == 'password' ? 'text' : 'password';
  }

  login(){
    this.logginIn = true;
    let key = Md5.hashStr(this.todo.value.username);
    this.fireDB.getAccount(key).then((snap) => {
      try {
        if(snap.data()._Username == this.todo.value.username && snap.data()._Password == this.todo.value.password){
          this.toastThis('Welcome ' + snap.data()._Name, 'toast-success');
          this.logginIn = false;
        }
        else{
          this.toastThis('Incorrect Username or Password. Try again', 'toast-warning');
          this.logginIn = false;
        }
      } catch { this.toastThis('Account does not exist', 'toast-danger'); this.logginIn = false; }
    });
  }

  toastThis(message, css){
    this.toastCtrl.create({
      cssClass: css,
      message: message,
      position: 'top',
      showCloseButton: true,
      duration: 6000
    }).present();
  }



}
