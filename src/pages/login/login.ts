import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { FireService } from '../../environment';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  todo: FormGroup;
  showIcon = 'md-eye';
  showType = 'password';
  fireDB = new FireService;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
      this.todo = this.formBuilder.group({
        username: [''],
        password: ['']
      });
  }

  ionViewDidLoad() {

  }

  showPassword(){
    this.showIcon = this.showIcon == 'md-eye' ? 'md-eye-off' : 'md-eye';
    this.showType = this.showType == 'password' ? 'text' : 'password';
  }

  login(){
    let key = Md5.hashStr(this.todo.value.username);
    this.fireDB.getAccount(key).once('value').then((snap) => {
      if(snap != undefined || snap != null){
        if(snap.val()._Username == this.todo.value.username && snap.val()._Password == this.todo.value.password){
          console.log('WELCOME');
        }
        else{
          //Incorrect
        }
      }
      else {
        // Account does not exist
      }
    });
  }



}
