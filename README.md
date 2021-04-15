#Nozomu Investment

Rest API Documentation

Add User
      URL  /api/v1/user/add/
      Method: POST
      URL Params None
      Required: Name : String, UserName : String
      Optional: None
      Data Params (JSON) 
      {
	"name": <String>,
	"userName": <String>
	}	

	Success Response:
        ◦ Code: 200
Content: { userId : <String> }
      Error Response:
        ◦ Code: 409 CONFLICT
Content: { error : "user name already exist" }
      Sample Call:
      Header :
      Content-Type: application/json
      Body :
      {
	"name": "sibiru2",
	"userName": "sibiruka"
	}
      Notes: User name have to be unique 


Update Total Balance
      URL  /api/v1/ib/updateTotalBalance/
      Method: POST
      URL Params None
      Required: currentBalance : Float,
      Optional: None
      Data Params (JSON) 
      {
	"current_balance": <Float>,
	}	

	Success Response:
        ◦ Code: 200
Content: { NAB : <Float> }
      Error Response:
        ◦ Code: 400 Bad Request Error
Content: { error : "Error Cannot update Balance" }
      Sample Call:
      Header :
      Content-Type: application/json
      Body :
      {
	"current_balance": 13200
	}
      Notes: current_balance have to be number





LiSt NaB
      URL  /api/v1/ib/listNAB/
      Method: GET
      URL Params None
      Required: None
      Optional: None
      Data Params (JSON)  None

	Success Response:
        ◦ Code: 200
Content: { nab : <Float>, date : <Date> }
      Error Response:
        ◦ Code:500 Internal Server error
Content: { error : "Failed to get data NAB" }
      Sample Call : http://localhost:3000/api/v1/ib/listNAB/

      Notes: Response will be on JSON format







Top Up User
      URL  /api/v1/ib/topup/
      Method: POST
      URL Params None
      Required: userId : String, amount : Float
      Optional: None
      Data Params (JSON) 
      {
       "user_id" : <String>,
       "amount" : <Float>
      }

	Success Response:
        ◦ Code: 200
Content: { ‘Top Up Unit ‘: <Float> , ‘Total Unit’: <Float>, ‘AmountIdr’: <Float>}
      Error Response:
        ◦ Code:  400 Bad Request Error
Content: { error : "Error, cannot Top Up Now" }
      Sample Call:
      Header :
      Content-Type: application/json
      Body :
      {
	"user_id": "60770bd6f192c9ec0713b161",
	"amount": 300
	}
      Notes: Error because user id not found, and amount is not number



              
      Withdraw User
      URL  /api/v1/ib/withdraw/
      Method: POST
      URL Params None
      Required: userId : String, amount : Float
      Optional: None
      Data Params (JSON) 
      {
       "user_id" : <String>,
       "amount" : <Float>
      }
      
      Success Response:
        ◦ Code: 200
Content: { ‘Top Up Unit ‘: <Float> , ‘Total Unit’: <Float>, ‘AmountIdr’: <Float>}
      Error Response:
        ◦ Code:  400 Bad Request Error
Content: { error : "Error, cannot withdraw Now" }
      Sample Call:
      Header :
      Content-Type: application/json
      Body :
      {
    • 	"user_id": "60770bd6f192c9ec0713b161",
    • 	"amount": 300
    • 	}
      Notes: Error because user id not found, and amount is not number


      Get Member
      URL  /api/v1/ib/member/:userId?
      Method: GET
      URL Params ?page=<int>&limit=<int>
      Required: None
      Optional: userId : String ,page : int ,limit : int
      Data Params (JSON)  None
      
      	Success Response:
          Code: 200
Content: { ‘userId ‘: <String> , ‘Total Unit’: <Float>, ‘AmountIdr’: <Float>, current Nab : <Float>}
      Error Response:
        ◦ Code:  400 Bad Request Error
Content: { error : "Error cannot Get member data" }
      Sample Call: 
    •  http://localhost:3000/api/v1/ib/member?page=0&limit=5
    •  http://localhost:3000/api/v1/ib/member/64529239485849
      Notes: There is two optional either get member by id or all member with pagenation params






Feature
    • Logging every change of NAB, Total Unit, and Total Balance
    • Auto calculation  data of NAB when there is no user no balance, or no user with balance
    • page 404 for any get url not in specification 
    • All input with number already protected, so only can be input as number no other type
      

