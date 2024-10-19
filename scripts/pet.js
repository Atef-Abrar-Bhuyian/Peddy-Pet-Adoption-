// For scroll hero btn to adopt section
document.getElementById("scrollBtn").addEventListener("click", function () {
  document
    .getElementById("targetSection")
    .scrollIntoView({ behavior: "smooth" });
});

// sort by price
document.getElementById("sort-btn").addEventListener("click", () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      const sortedPets = data.pets.sort((a, b) => b.price - a.price);
      displayAllPets(sortedPets);
    })
    .catch((error) => console.error(error));
});


// create load categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.error(error));
};

// Load All Pets
const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((error) => console.error(error));
};

// Load Pet Details
const loadDetails = async (petId) => {
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.petData);
};

// Remove Active Class for Category Buttons
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// Adopt Modal
const adoptPet = (petId) => {
  const modal = document.getElementById("customModal2");
  modal.showModal();

  let countdown = 3;
  const countdownDisplay = document.createElement("div");

  countdownDisplay.innerHTML = `
    <div class="space-y-3">
    <img class="w-[100px] mx-auto" src="https://img.icons8.com/?size=100&id=121216&format=png&color=000000" />
    <h2 class="text-center font-extrabold capitalize text-4xl">congratulations! </h2>
    <p class="font-bold text-lg text-center">Adaption Process is Start For Your Pet</p>
    <p class="font-bold text-lg text-center">${countdown}</p>
    </div>
    `;
  modal.querySelector(".modal-box").appendChild(countdownDisplay);

  const intervalId = setInterval(() => {
    countdown--;
    countdownDisplay.innerHTML = `
          <div class="space-y-3">
    <img class="w-[100px] mx-auto" src="https://img.icons8.com/?size=100&id=121216&format=png&color=000000" />
    <h2 class="text-center font-extrabold capitalize text-4xl">congratulations! </h2>
    <p class="font-bold text-lg text-center">Adaption Process is Start For Your Pet</p>
    <p class="font-bold text-lg text-center">${countdown}</p>
    </div>
    `;
    if (countdown <= 0) {
      clearInterval(intervalId);
      modal.close();
      countdownDisplay.innerHTML = "";
    }
  }, 1000);

  const adoptBtn = document.getElementById(`adoptBtn-${petId}`);
  adoptBtn.disabled = true;
  adoptBtn.innerText = "Adopted";
  adoptBtn.classList.add("opacity-70", "cursor-not-allowed");
};



// Liked Images
const likedImages = (pet) => {
  const likedImageContainer = document.getElementById('liked-pets');
  const likedImageHeading = document.getElementById("liked-cats-heading");
  likedImageHeading.innerHTML = "";

  const div = document.createElement('div');
  div.innerHTML = `
    <img src="${pet}" alt="${pet.pet_name}" class="w-[100px] h-[100px] object-cover rounded-xl" />
  `;

  likedImageContainer.appendChild(div);
};


// Pet Btn active
const loadCategoriesPets = (id) => {
  document.getElementById("pet-container").innerHTML = "";
  document.getElementById('spinner').style.display = "block";

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      
      // Remove active class from all buttons
      removeActiveClass();

      // Activate the current button
      const activeBtn = document.getElementById(`btn-'${id}'`);
      activeBtn.classList.add("active");

      
      setTimeout(function(){
        displayAllPets(data.data);
        document.getElementById('spinner').style.display = "none";
      }, 2000)
      
      
    })
    .catch((error) => console.error(error));
};

// Display Details
const displayDetails = (pet) => {
  const detailContainer = document.getElementById("modal-content");
  document.getElementById("customModal").showModal();

  detailContainer.innerHTML = `
    <img class="w-full rounded-xl" src = "${pet.image}"/>
    <h3 class="font-bold text-2xl mt-4">${pet.pet_name}</h3>
        <div class="px-2 py-3 flex items-center gap-2">  

      
        <div class="grid grid-cols-2">
        <div class ="flex items-center gap-2 mb-2">
        <img class="w-[20px]" src="https://img.icons8.com/?size=100&id=46218&format=png&color=000000" />
        <p class = "text-gray-clr text-opacity-70 "> Breed: ${pet.breed ? pet.breed : "Not Available"} </p>
        </div>

        <div class ="flex items-center gap-2 mb-2">
        <img class="w-[20px]" src="https://img.icons8.com/?size=100&id=1665&format=png&color=000000" />
        <p class = "text-gray-clr text-opacity-70 "> Gender: ${pet.gender ? pet.gender : "Not Available"} </p>
        </div>
        
        <div class ="flex items-center gap-2 mb-2">
        <img class="w-[20px]" src="https://img.icons8.com/?size=100&id=60611&format=png&color=000000" />
        <p class = "text-gray-clr text-opacity-70 "> Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not Available"} </p>
        </div>

        <div class ="flex items-center gap-2 mb-2">
        <img class="w-[20px]" src="https://img.icons8.com/?size=100&id=7163&format=png&color=000000" />
        <p class = "text-gray-clr text-opacity-70 "> Price: ${pet.price ? pet.price : "Not Available"}$ </p>
        </div>

        <div class ="flex items-center gap-2 mb-2">
        <img class="w-[20px]" src="https://img.icons8.com/?size=100&id=XejBHdgLsoj4&format=png&color=000000" />
        <p class = "text-gray-clr text-opacity-70 "> Vaccinated status: ${pet.vaccinated_status} </p>
        </div>
        </div>
      </div>
      <hr class="w-full">

    <div class="mt-2">
    <h4 class="font-semibold"> Details Information
    </h4>
    <p class="mt-2 text-gray-600">${pet.pet_details}</p>
    </div>
    `;
};


// Display Pet Cards
const displayAllPets = (pets) => {
  const petContainer = document.getElementById("pet-container");
  petContainer.innerHTML = "";
  if (!pets || pets.length === 0) {
    // Check for undefined or empty array
    petContainer.classList.remove("grid");
    petContainer.innerHTML = `
        <div class= "flex min-h-[300px] w-full flex-col gap-5 justify-center items-center"> 
            <img src="https://img.icons8.com/?size=100&id=119094&format=png&color=000000" />
            <h2 class="text-center text-3xl font-bold">No Information Available </h2>
            <p class="text-center italic">No information is available at the moment. Please check back later.</p>

        </div> 
      `;
  } else {
    petContainer.classList.add("grid");
  }

  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList = "rounded-xl border border-gray-200 p-5";
    card.innerHTML = `
      <figure class = "h-[200px] ">
        <img
          src= ${pet.image}
          class = "h-full w-full object-cover rounded-xl"
          alt="" />
            
      </figure>
      <div class="px-2 py-3 flex gap-2">  
        <div>
        <h2 class="font-bold text-xl mb-2"> ${pet.pet_name} </h2>
        <div class ="flex items-center gap-2 mb-2">
        <img class="w-[20px]" src="https://img.icons8.com/?size=100&id=46218&format=png&color=000000" />
        <p class = "text-gray-clr text-opacity-70 "> Breed: ${pet.breed? pet.breed:"Not Available"} </p>
        </div>

        <div class ="flex items-center gap-2 mb-2">
        <img class="w-[20px]" src="https://img.icons8.com/?size=100&id=60611&format=png&color=000000" />
        <p class = "text-gray-clr text-opacity-70 "> Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not Available" } </p>
        </div>

        <div class ="flex items-center gap-2 mb-2">
        <img class="w-[20px]" src="https://img.icons8.com/?size=100&id=1665&format=png&color=000000" />
        <p class = "text-gray-clr text-opacity-70 "> Gender: ${pet.gender ? pet.gender : "Not Available"} </p>
        </div>

        <div class ="flex items-center gap-2 mb-2">
        <img class="w-[20px]" src="https://img.icons8.com/?size=100&id=7163&format=png&color=000000" />
        <p class = "text-gray-clr text-opacity-70 "> Price: ${pet.price ? pet.price : "Not Available"}$ </p>
        </div>
        
        </div>
      </div>
      <hr class="flex items-center">
      <div class="flex justify-between">
          <button id="like-btn" onclick="likedImages('${pet.image}')" class="btn btn-sm text-primary-color bg-transparent mt-2 hover:bg-transparent hover:border-teal-900"> <img class="w-[20px]" src="https://img.icons8.com/?size=100&id=24816&format=png&color=000000" />
        </button>
      <button id="adoptBtn-${pet.petId}" onclick="adoptPet('${pet.petId}')" class="btn btn-sm text-primary-color bg-transparent mt-2 hover:bg-transparent hover:border-teal-900 "> Adopt
        </button>
      <button onclick="loadDetails('${pet.petId}')" class="btn btn-sm text-primary-color bg-transparent mt-2 hover:bg-transparent hover:border-teal-900"> Details
        </button>
      </div>
            `;
    petContainer.append(card);
  });
};

// Display Categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    // Create a button for each category
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
      <button id="btn-'${item.category}'" onclick="loadCategoriesPets('${item.category}')" class="category-btn w-24 h-16 lg:w-40 btn bg-transparent mx-auto hover:border-teal-900 hover:bg-transparent hover:text-primary-color">
        <img class="w-[30px]" src="${item.category_icon}" />
        <p class="font-extrabold">${item.category}</p>
      </button>
    `;
    // Add button to the category container
    categoryContainer.append(buttonContainer);
  });
};

loadCategories();
loadAllPets();
