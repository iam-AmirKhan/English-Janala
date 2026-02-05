const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"))
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  //   {
  //     "id": 90,
  //     "level": 1,
  //     "word": "Water",
  //     "meaning": "পানি",
  //     "pronunciation": "ওয়াটার"
  // }

  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white space-y-2 rounded-xl shadow-sm text-center py-10 px-5">
        <h2 class="font-bold text-4xl">${word.word}</h2>
        <p class="font-medium my-3">Meaning /Pronounciation</p>
        <p class="font-semibold text-2xl font-bangla">"${word.meaning} / ${word.pronunciation}"</p>
      <div class="flex justify-between items-center mt-5">
        <button class="btn bg-[#1A91FF10]"><i class=" fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF10]"><i class=" fa-solid fa-volume-high"></i></button>
      </div>
      </div>
  
  `;
    wordContainer.append(card);
  });
};

const displayLesson = (lessons) => {
  // 1.get the container and empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2.get into every lessons
  for (let lesson of lessons) {
    // console.log(lesson);
    // 3. create elements
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
             <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
             <i class="fa-brands fa-readme"></i>
             Lesson ${lesson.lessonName}
             
             </button>
`;

    // 4. append into container
    levelContainer.append(btnDiv);
  }
};

loadLessons();
