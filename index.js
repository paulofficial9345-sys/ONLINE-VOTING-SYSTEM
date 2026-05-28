// ==========================
// VALID USERS
// ==========================
const users = [

    {
        voterId : "12345",
        password : "54321"
    },

    {
        voterId : "11111",
        password : "22222"
    },

    {
        voterId : "55555",
        password : "11111"
    },

    {
        voterId : "33333",
        password : "44444"
    },

    {
        voterId : "01010",
        password : "01010"
    }

];

const admin = {

    adminId : "99999",

    adminPassword : "99999"

};

if(localStorage.getItem("Candidate A") == null){

    localStorage.setItem("Candidate A", 0);

    localStorage.setItem("Candidate B", 0);

    localStorage.setItem("Candidate C", 0);
}

// ==========================
// GO TO LOGIN PAGE
// ==========================
function goToVote(){

    window.location.href = "login.html";

}

// ==========================
// GO TO RESULT PAGE
// ==========================
function goToResult(){

    window.location.href = "result.html";

}

// ==========================
// LOGIN FUNCTION
// ==========================
function login(){

    let voterId =
    document.getElementById("voterId").value;

    let securityCode =
    document.getElementById("securityCode").value;

    // EMPTY CHECK
    if(voterId === "" || securityCode === ""){

        alert("Please Enter All Details");

        return;
    }

    // 5 DIGIT CHECK
    if(voterId.length < 5 ||
       securityCode.length < 5){

        alert("Minimum 5 Numbers Required");

        return;
    }

    // VALID USER CHECK
    let valid = false;

    for(let i = 0; i < users.length; i++){

        if(voterId === users[i].voterId &&
           securityCode === users[i].password){

            valid = true;

            break;
        }
    }

    // LOGIN SUCCESS
    if(valid){

        sessionStorage.setItem(
            "currentUser",
            voterId
        );

        window.location.href = "details.html";

    }
    else{

        alert("Invalid Voter ID or Password");

    }
}

// ==========================
// NEXT PAGE
// ==========================
function nextPage(){

    window.location.href = "vote.html";

}

// ==========================
// VOTE FUNCTION
// ==========================
function vote(candidate){

    let currentUser =
    sessionStorage.getItem("currentUser");

    // CHECK USER LOGIN
    if(currentUser == null){

        alert("Please Login First");

        window.location.href = "login.html";

        return;
    }

    // CHECK ALREADY VOTED
    let votedUser =
    localStorage.getItem(currentUser);

    if(votedUser === "yes"){

        alert("You Already Voted!");

        return;
    }

    // SAVE USER VOTED
    localStorage.setItem(
        currentUser,
        "yes"
    );

    // GET CURRENT COUNT
    let count =
    Number(localStorage.getItem(candidate));

    // INCREASE COUNT
    count++;

    // SAVE NEW COUNT
    localStorage.setItem(
        candidate,
        count
    );

    alert(
        "Vote Submitted For " + candidate
    );

    window.location.href = "result.html";
}

// ==========================
// SHOW RESULT
// ==========================
function showResult(){

    document.getElementById("countA").innerHTML =
    localStorage.getItem("Candidate A");

    document.getElementById("countB").innerHTML =
    localStorage.getItem("Candidate B");

    document.getElementById("countC").innerHTML =
    localStorage.getItem("Candidate C");
}

// ==========================
// ADMIN RESET FUNCTION
// ==========================
function adminReset(){

    let adminId =
    prompt("Enter Admin ID");

    let adminPassword =
    prompt("Enter Admin Password");

    // CHECK ADMIN LOGIN
    if(adminId === admin.adminId &&
       adminPassword === admin.adminPassword){

        // RESET COUNTS
        localStorage.setItem("Candidate A", 0);

        localStorage.setItem("Candidate B", 0);

        localStorage.setItem("Candidate C", 0);

        // REMOVE USER VOTE DATA
        for(let i = 0; i < users.length; i++){

            localStorage.removeItem(
                users[i].voterId
            );
        }

        alert(
            "Voting Count Reset Successfully"
        );

        // REFRESH RESULT
        showResult();

    }
    else{

        alert(
            "Wrong Admin ID or Password"
        );
    }
}