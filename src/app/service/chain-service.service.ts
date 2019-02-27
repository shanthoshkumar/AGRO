  import { Injectable } from '@angular/core';
  import {CookieService} from 'ngx-cookie-service'
  import Web3 from 'web3';
  import * as Tx from 'ethereumjs-tx';
  declare let require: any;
  let Buffer = require('buffer/').Buffer;
  // import * as Buffer from 'buffer';
  let contractAbi= require('./contract.json');
  
  
  @Injectable({
    providedIn: 'root'
  })
  export class  ChainServiceService {
    public account: string = null; 
    public balance:number;
    public  _web3: any;
    public acc:string =null;
    public supply_contract: any;
    public supply_contract_address: string = "0x02794DB941AcfEc54992a6C59f34c9f4Aa9d0b65";//0x99fb450cb43fdc7a5c97e11fbae23c3b03e77084
    
    constructor(private cook:CookieService) {

      this._web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/Vr1GWcLG0XzcdrZHWMPu'));  //window.web3.currentProvider
      this.supply_contract = new this._web3.eth.Contract(contractAbi,this.supply_contract_address,{gaslimit:3000000});
     
    } 

    
    public async set_cookie(private_key):Promise<boolean> {
      let instance = this;
      instance.cook.set('privateKey',private_key);
      return new Promise<boolean>((resolve,reject)=>{
        instance.check_cookie().then(is_cookie => {
          resolve(is_cookie);
        })
      }) as Promise<boolean>;
    }

    public async get_cookie(): Promise<string>{
      let instance = this;
      return new Promise<string>((resolve, reject) => {
        resolve(instance.cook.get('privateKey'));
      }) as Promise<string>;
    }

    public async check_cookie(): Promise<boolean>{
      let instance = this;
      return new Promise<boolean>((resolve,reject) => {
        resolve(instance.cook.check('privateKey'));
      }) as Promise<boolean>;
    }

    public async delete_cookie(): Promise<boolean>{
      let instance = this;
      this.cook.delete('privateKey');
      return new Promise<boolean>((resolve,reject)=>{
        instance.check_cookie().then(is_exist => {
          resolve(!is_exist);
        });
      }) as Promise<boolean>;
    }

    public async check_admin(): Promise<string> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.admin().call(function(error, result){  //{from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, 
          if(error != null) {
            reject(error);
          }
          else {
            resolve(result)
          }
        });
      }) as Promise<string>;
    }

    public async getUserBalance(account): Promise<number> {
      let instance = this;
      return new Promise((resolve, reject) => {
        instance._web3.eth.getBalance(account,function(err,result){
          if(err != null) {
            reject(err);
          }
          else{
            resolve(instance._web3.utils.fromWei(result,'ether'));
          }
        })
      }) as Promise<number>;
    }

    public async product_detail_map(id): Promise<object> {
      let instance = this;
      return new Promise((resolve,reject) => {
        instance.supply_contract.methods.product_detail_map(id).call(function(err,result) {
          if(err != null){
            reject(err);
          }
          else{
            resolve(result)
          }
        })
      }) as Promise<object>;
    } 

    public async produt_ids(): Promise<number[]> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.produt_ids().call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else{
            const arr:number[] = [];
            for(var i=1;i<=result;i++){
            arr.push(i);
          }
          resolve(arr)
        }
        
        });
      }) as Promise<number[]>;
    }

    public async farmer_id_by_address(farmer_address): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.farmer_id_by_address(farmer_address).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else 
          {
            resolve(result)
          }
        });
      }) as Promise<number>;
    }

    public async farmer_name(farmer_id): Promise<string> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.farmer_name(farmer_id).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else
          {
            resolve(result)
          }
        });
      }) as Promise<string>;
    }

    public async farmer_by_id(farmer_id): Promise<string> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.farmer_by_id(farmer_id).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else
          {
            resolve(result)
          }
        });
      }) as Promise<string>;
    }

    public async farmer_ids(): Promise<number[]> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.farmer_ids().call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else{
            const arr:number[] = [];
            for(var i=1;i<=result;i++){
              arr.push(i);
            }
            resolve(arr)
          }
        });
      }) as Promise<number[]>;   
    }
    
    public async farmer_balance(farmer_id): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.farmer_balance(farmer_id).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else
          {
            resolve(result)
          }
        });
      }) as Promise<number>;
    }

    public async product_detail_map_supplier(id1,id2): Promise<object> {
      let instance = this;
      return new Promise((resolve,reject) => {
        instance.supply_contract.methods.product_detail_map_supplier(id1,id2).call(function(err,result) {
          if(err != null){
            reject(err);
          }
          else{
            resolve(result)
          }
        })
      }) as Promise<object>;
    }

    public async supplier_ids(): Promise<number[]> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.supplier_ids().call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else{
            const arr:number[] = [];
            for(var i=1;i<=result;i++) {
              arr.push(i);
            }
            resolve(arr)
          }
        });
      }) as Promise<number[]>;
    }

    public async supplier_id_by_address(supplier_address): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.supplier_id_by_address(supplier_address).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else  
          {
            resolve(result)
          }
        });
      }) as Promise<number>;
    }

    public async supplier_by_id(supplier_id): Promise<string> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.supplier_by_id(supplier_id).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else {
            resolve(result)
          }
        });
      }) as Promise<string>;
    }

    public async supplier_name(supplier_id): Promise<string> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.supplier_name(supplier_id).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else
          {
            resolve(result)
          }
        });
      }) as Promise<string>;
    }

    public async supplier_balance(supplier_id): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.supplier_balance(supplier_id).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else
          {
            resolve(result)
          }
        });
      }) as Promise<number>;
    }

    public async product_detail_map_shop(id1,id2): Promise<object> {
      let instance = this;
      return new Promise((resolve,reject) => {
        instance.supply_contract.methods.product_detail_map_shop(id1,id2).call(function(err,result) {
          if(err != null){
            reject(err);
          }
          else{
            resolve(result) 
          }
        })
      }) as Promise<object>;
    }

    public async shop_ids(): Promise<number[]> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.shop_ids().call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else{
            const arr:number[] = [];
            for(var i=1;i<=result;i++){
              arr.push(i);
            }
            resolve(arr)
          }
        });
      }) as Promise<number[]>;   
    }   
    
    public async shop_balance(shop_id): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.shop_balance(shop_id).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else  
          {
            resolve(result)
          }
        });
      }) as Promise<number>;
    }

    public async product_ids(): Promise<number[]> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.produt_ids().call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else{
            const arr:number[] = [];
            for(var i=1;i<=result;i++){
              arr.push(i);
            }
            resolve(arr)
          }
        });
      }) as Promise<number[]>;   
    }

    public async shop_id_by_address(supplier_address): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.shop_id_by_address(supplier_address).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else  
          {
            resolve(result)
          }
        });
      }) as Promise<number>;
    }

    public async shop_by_id(supplier_id): Promise<string> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.shop_by_id(supplier_id).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else
          {
            resolve(result)
          }
        });
      }) as Promise<string>;
    }

    public async shop_name(shop_id): Promise<string> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.shop_name(shop_id).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else
          {
            resolve(result)
          }
        });
      }) as Promise<string>;
    }

    public async consumer_ids(): Promise<number[]> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.consumer_ids().call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else{
            const arr:number[] = [];
            for(var i=1;i<=result;i++){
              arr.push(i);
            }
            resolve(arr)
          }
        });
      }) as Promise<number[]>;   
    }  

    public async consumer_id_by_address(consumer_adderss): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.consumer_id_by_address(consumer_adderss).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else 
          {
            resolve(result)
          }
        });
      }) as Promise<number>;
    }  
   
    public async consumer_by_id(consumer_id): Promise<string> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.consumer_by_id(consumer_id).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else
          {
            resolve(result)
          }
        });
      }) as Promise<string>;
    }

    public async order_id(consumer_id): Promise<number[]> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.order_id(consumer_id).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else{
            const arr:number[] = [];
            for(var i=1;i<=result;i++){
              arr.push(i);
            }
            resolve(arr)
          }
        });
      }) as Promise<number[]>;
    }

    public async consumer_map(consumer_id,order_id): Promise<object> {
      let instance = this;
      return new Promise((resolve,reject) => {
        instance.supply_contract.methods.consumer_map(consumer_id,order_id).call(function(err,result) {
          if(err != null){
            reject(err);
          }
          else{
            resolve(result)
          }
        })
      }) as Promise<object>;
    } 

    public async consumer_name(consumer_id): Promise<string> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance.supply_contract.methods.consumer_name(consumer_id).call(function(err,result) {
          if(err != null) {
            reject(err);
          }
          else
          {
            resolve(result)
          }
        });
      }) as Promise<string>;
    }                              

    public async getAccount(): Promise<string> {                                       
      let instance = this;
      let account_adddress:string;
      return new Promise((resolve, reject) => {
        instance.get_cookie().then(private_key => {
          account_adddress = instance._web3.eth.accounts.privateKeyToAccount('0x'+private_key);
          resolve(account_adddress["address"]);
        })
      }) as Promise<string>;
    }
  
    public async check_farmer(): Promise<number> {                                       
      let instance = this;
      // let account_adddress:string;
      return new Promise((resolve, reject) => {
        instance.getAccount().then(account_adddress=>{
          instance.supply_contract.methods.farmer_id_by_address(account_adddress).call(function(err,result) {
            if(err != null) {
              reject(err);
            }
            else 
            {
              resolve(result)
            }
          });
        })
      }) as Promise<number>;
    }
    
    public async check_supplier(): Promise<number> {                                       
      let instance = this;
      // let account_adddress:string;
      return new Promise((resolve, reject) => {
        instance.getAccount().then(account_adddress=>{
          instance.supply_contract.methods.supplier_id_by_address(account_adddress).call(function(err,result) {
            if(err != null) {
              reject(err);
            }
            else 
            {
              resolve(result)
            }
          });
        })
      }) as Promise<number>;
    }
  
    public async check_shop(): Promise<number> {                                       
      let instance = this;
      // let account_adddress:string;
      return new Promise((resolve, reject) => {
        instance.getAccount().then(account_adddress=>{
          instance.supply_contract.methods.shop_id_by_address(account_adddress).call(function(err,result) {
            if(err != null) {
              reject(err);
            }
            else 
            {
              resolve(result)
            }
          });
        })
      }) as Promise<number>;
    }
  
    public async check_consumer(): Promise<number> {                                       
      let instance = this;
      // let account_adddress:string;
      return new Promise((resolve, reject) => {
        instance.getAccount().then(account_adddress=>{
          instance.supply_contract.methods.consumer_id_by_address(account_adddress).call(function(err,result) {
            if(err != null) {
              reject(err);
            }
            else 
            {
              resolve(result)
            }
          });
        })
      }) as Promise<number>;
    }
  
    public async farmer_registeration(farmer_name,address): Promise<number> {                                       
      let instance = this;
      console.log("in");
      
      return new Promise((resolve, reject) => {
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          instance.get_cookie().then(privatekey => {
            const private_key = Buffer.from(privatekey,'hex');
            var contract_function = instance.supply_contract.methods.farmer_registeration(farmer_name);
            console.log("argument passed");
            
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x' +nonce,
              gasPrice:  '0x4A817C800',
              gasLimit: 4000000,
              from :address,
              to:instance.supply_contract_address,
              value: '0x00',
              data: contract_function_abi
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize()  
            console.log("after serialize");
            instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
                resolve(0)
              }
              else{
                instance.hash(result).then(res =>{
                  if(res == 0){
                    resolve(0)
                  }
                  else if(res == 1) {
                    resolve(1)
                  }
                  else if(res == 2) {
                    resolve(2)
                  }
                })
              }
            })      
          });
        });
      }) as Promise<number>;
    }

    public async supplier_registeration(supplier_name,address): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          instance.get_cookie().then(privatekey => {
            const private_key = Buffer.from(privatekey,'hex');
            var contract_function = instance.supply_contract.methods.supplier_registeration(supplier_name);
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x' +nonce,
              gasPrice:  '0x4A817C800',
              gasLimit: 4000000,
              from :address,
              to:instance.supply_contract_address,
              value: '0x00',
              data: contract_function_abi
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize()
            
            instance._web3.eth.sendSignedTransaction('0x' + serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
                // console.log(err)
                resolve(0)
              }
              else{
                instance.hash(result).then(res =>{
                  if(res == 0){
                    resolve(0)
                  }
                  else if(res == 1) {
                    resolve(1)
                  }
                  else if(res == 2) {
                    resolve(2)
                  }
                })
              }
            })
          });
        });
      }) as Promise<number>;
    }   
     
    public async shop_registeration(shop_name,address): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          instance.get_cookie().then(privatekey => {
            const private_key = Buffer.from(privatekey,'hex');
            var contract_function = instance.supply_contract.methods.shop_registeration(shop_name);
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x' +nonce,
              gasPrice:  '0x4A817C800',
              gasLimit: 4000000,
              from :address,
              to:instance.supply_contract_address,
              value: '0x00',
              data: contract_function_abi
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize()   
            instance._web3.eth.sendSignedTransaction('0x' + serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
                resolve(0)
              }
              else{
                instance.hash(result).then(res =>{
                  if(res == 0){
                    resolve(0)
                  }
                  else if(res == 1) {
                    resolve(1)
                  }
                  else if(res == 2) {
                    resolve(2)
                  }
                })
              }
            })
          });
        });
      }) as Promise<number>;
    }   

    public async consumer_registeration(name,address): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          instance.get_cookie().then(privatekey => {
            const private_key = Buffer.from(privatekey,'hex');
            var contract_function = instance.supply_contract.methods.consumer_registeration(name);
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x' +nonce,
              gasPrice:  '0x4A817C800',
              gasLimit: 4000000,
              from :address,
              to:instance.supply_contract_address,
              value: '0x00',
              data: contract_function_abi
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize()   
            instance._web3.eth.sendSignedTransaction('0x' + serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
                resolve(0)
              }
              else{
                instance.hash(result).then(res =>{
                  if(res == 0){
                    resolve(0)
                  }
                  else if(res == 1) {
                    resolve(1)
                  }
                  else if(res == 2) {
                    resolve(2)
                  }
                })
              }
            })
          });
        });
      }) as Promise<number>;
    } 

    public async farmer_add_product(product_name,product_price,product_quantity,address): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          instance.get_cookie().then(privatekey => {
            const private_key = Buffer.from(privatekey,'hex');
            var contract_function = instance.supply_contract.methods.farmer_add_product(product_name,instance._web3.utils.toWei(product_price.toString(),'ether'),product_quantity);
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x' +nonce,
              gasPrice:  '0x4A817C800',
              gasLimit: 4000000,
              from :address,
              to:instance.supply_contract_address,
              value: '0x00',
              data: contract_function_abi
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize()   
            console.log("after serialize");
            instance._web3.eth.sendSignedTransaction('0x' + serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
                resolve(0)
              }
              else{
                instance.hash(result).then(res =>{
                  if(res == 0){
                    resolve(0)
                  }
                  else if(res == 1) {
                    resolve(1)
                  }
                  else if(res == 2) {
                    resolve(2)
                  }
                })
              }
            })
          });
        });
      }) as Promise<number>;
    } 
    
    public async supplier_buy_product(product_id,product_quantity,new_price,address,amount): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          instance.get_cookie().then(privatekey => {
            const private_key = Buffer.from(privatekey,'hex');
            var contract_function = instance.supply_contract.methods.supplier_buy_product(product_id,product_quantity,new_price);
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x' +nonce,
              gasPrice:  '0x4A817C800',
              gasLimit: 4000000,
              from :address,
              to:instance.supply_contract_address,
              value: amount,
              data: contract_function_abi
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize()   
            console.log("after serialize");
            instance._web3.eth.sendSignedTransaction('0x' + serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
                resolve(0)
              }
              else{
                instance.hash(result).then(res =>{
                  if(res == 0){
                    resolve(0)
                  }
                  else if(res == 1) {
                    resolve(1)
                  }
                  else if(res == 2) {
                    resolve(2)
                  }
                })
              }
            })
          });
        });
      }) as Promise<number>;
    }

    public async former_withdraw(ether,address): Promise<number> {
      let instance=this;
      return new Promise((resolve, reject) => {
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          instance.get_cookie().then(privateKey => {
            const private_key =Buffer.from(privateKey,'hex');
            var contract_function = instance.supply_contract.methods.farmer_widthdraw(ether);
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x'+nonce,
              gasPrice: '0x4A817C800',
              gasLimit: 4000000,
              from: address,
              to: instance.supply_contract_address,
              value: '0x00',
              data: contract_function_abi
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize();
            instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
                resolve(0)
              }
              else{
                instance.hash(result).then(res =>{
                  if(res == 0){
                    resolve(0)
                  }
                  else if(res == 1) {
                    resolve(1)
                  }
                  else if(res == 2) {
                    resolve(2)
                  }
                })
              }
            })
          });
        })
      }) as Promise<number>;
    }

    public async supplier_widthdraw(amount,address): Promise<number> {
      let instance=this;
      return new Promise((resolve, reject) => {
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          instance.get_cookie().then(privateKey => {
            const private_key =Buffer.from(privateKey,'hex');
            var contract_function = instance.supply_contract.methods.supplier_widthdraw(amount);
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x'+nonce,
              gasPrice: '0x4A817C800',
              gasLimit: 4000000,
              from: address,
              to: instance.supply_contract_address,
              value: '0x00',
              data: contract_function_abi
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize();
            instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
                resolve(0)
              }
              else{
                instance.hash(result).then(res =>{
                  if(res == 0){
                    resolve(0)
                  }
                  else if(res == 1) {
                    resolve(1)
                  }
                  else if(res == 2) {
                    resolve(2)
                  }
                })
              }
            })
          });
        })
      }) as Promise<number>;
    }    
    
    public async shop_buy_product(product_id,product_quantity,new_price,su_i,address,amount): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          instance.get_cookie().then(privatekey => {
            const private_key = Buffer.from(privatekey,'hex');
            var contract_function = instance.supply_contract.methods.shop_buy_product(product_id,product_quantity,instance._web3.utils.toWei(new_price.toString(),'ether'),su_i);
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x' +nonce,
              gasPrice:  '0x4A817C800',
              gasLimit: 4000000,
              from : address,
              to: instance.supply_contract_address,
              value: amount,
              data: contract_function_abi
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize()   
            console.log("after serialize");
            instance._web3.eth.sendSignedTransaction('0x' + serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
                resolve(0)
              }
              else{
                instance.hash(result).then(res =>{
                  if(res == 0){
                    resolve(0)
                  }
                  else if(res == 1) {
                    resolve(1)
                  }
                  else if(res == 2) {
                    resolve(2)
                  }
                })
              }
            })
          });
        });
      }) as Promise<number>;
    }

    public async consumer_buy_product(product_id,product_quantity,shop_id,address,amount): Promise<number> { 
      let instance = this;
      return new Promise((resolve, reject) => {
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          instance.get_cookie().then(privatekey => {
            const private_key = Buffer.from(privatekey,'hex');
            var contract_function = instance.supply_contract.methods.consumer_buy_product(product_id,product_quantity,shop_id);
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x' +nonce,
              gasPrice:  '0x4A817C800',
              gasLimit: 4000000,
              from : address,
              to: instance.supply_contract_address,
              value: instance._web3.utils.toHex(instance._web3.utils.toWei(amount.toString(),'ether')),
              data: contract_function_abi
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize()   
            console.log("after serialize");
            instance._web3.eth.sendSignedTransaction('0x' + serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
                resolve(0)
              }
              else{
                instance.hash(result).then(res =>{
                  if(res == 0){
                    resolve(0)
                  }
                  else if(res == 1) {
                    resolve(1)
                  }
                  else if(res == 2) {
                    resolve(2)
                  }
                })
              }
            })
          });
        });
      }) as Promise<number>;                                      
    }

    public async shop_widthdraw(amount,address): Promise<number> {                                       
      let instance = this;
      return new Promise((resolve, reject) => {
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          instance.get_cookie().then(privateKey => {
            const private_key =Buffer.from(privateKey,'hex');
            var contract_function = instance.supply_contract.methods.shop_widthdraw(amount);
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x'+nonce,
              gasPrice: '0x4A817C800',
              gasLimit: 4000000,
              from: address,
              to: instance.supply_contract_address,
              value: '0x00',
              data: contract_function_abi
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize();
            instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
                resolve(0)
              }
              else{
                instance.hash(result).then(res =>{
                  if(res == 0){
                    resolve(0)
                  }
                  else if(res == 1) {
                    resolve(1)
                  }
                  else if(res == 2) {
                    resolve(2)
                  }
                })
              }
            })
          });
        })
      }) as Promise<number>;
    }

    public async hash(a): Promise<number> {
      let meta = this;
      return new Promise((resolve, reject) => {
        var accountInterval = setInterval(function()
        {
          meta._web3.eth.getTransactionReceipt(a,function(err,result){
            if(err != null) {
              console.log("hash err");
              resolve(0);
            }
            if(result !== null)
            {
              clearInterval(accountInterval);
              if(result.status == 0x1)
              {
                console.log("hash result.status == 0x1");
                resolve(1);
              }
              else
              {           
                console.log("hash result.status == else");
                resolve(2);
              }
            }
          })
        },100)
      }) as Promise<number>;
    }
//  working progressing  
    //Event reading
    // public async add_product_event(): Promise<any> {
    //   let instance = this;
    //   return new Promise((resolve,reject) => {
    //   //   myContract.once(event[, options], callback)
    //   //   myContract.once('MyEvent', {
    //   //     filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    //   //     fromBlock: 0
    //   // }, 
    //     // instance._web3.eth.subscribe('logs',function(e,d){
    //       instance.supply_contract.events.add_product((error, eventResult)=> {//{ fromBlock: 0, toBlock: 'latest' },
    //         if(error != null){
    //           reject(error);
    //         }
    //         else{
    //           resolve(eventResult)
    //         }
    //       })
    //     // });
    //   }) as Promise<any>;
    // }
    // //supplier event
    // public async Supplier_event(): Promise<any> {
    //   let instance = this;
    //   return new Promise((resolve,reject) => {
    //     instance.supply_contract.farmer_to_supplier_transfer({}, { fromBlock: 0, toBlock: 'latest' }).get((error, Sipp_eventResult)=> {
    //       if(error != null){
    //         reject(error);
    //       }
    //       else{
    //         resolve(Sipp_eventResult)
    //       }
    //     })
    //   }) as Promise<any>;
    // }
    // //Distributor event
    // public async Distributor_event(): Promise<any> {
    //   let instance = this;
    //   return new Promise((resolve,reject) => {
    //     instance.supply_contract.supplier_to_distributor_transfer({}, { fromBlock: 0, toBlock: 'latest' }).get((error, Dis_eventResult)=> {
    //       if(error != null){
    //         reject(error);
    //       }
    //       else{
    //         resolve(Dis_eventResult)
    //       }
    //     })
    //   }) as Promise<any>;
    // }
    // //Retailer event
    // public async Retailer_event(): Promise<any> {
    //   let instance = this;
    //   return new Promise((resolve,reject) => {
    //     instance.supply_contract.distributor_to_retailer_transfer({}, { fromBlock: 0, toBlock: 'latest' }).get((error, Re_eventResult)=> {
    //       if(error != null){
    //         reject(error);
    //       }
    //       else{
    //         resolve(Re_eventResult)
    //       }
    //     })
    //   }) as Promise<any>;
    // }
           
}
    