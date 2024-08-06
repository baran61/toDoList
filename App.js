// Enter tuşuna basıldığında Ekle butonunu tetikler
document.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        document.querySelector("#liveToastBtn").click();
    }
});

// Verileri localStorage'dan al ve listeyi oluştur
function loadList() {
    const taskList = document.getElementById('list');
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(task => {
        const liElement = document.createElement('li');
        liElement.textContent = task.text;
        if (task.completed) {
            liElement.classList.add('completed');
        }

        const trashIcon = document.createElement("i");
        trashIcon.setAttribute("class", "bi bi-trash2-fill text-danger float-right mr-4");
        trashIcon.addEventListener('click', function() {
            removeTask(liElement);
        });
        liElement.appendChild(trashIcon);

        const checkIcon = document.createElement("i");
        checkIcon.setAttribute("class", "bi bi-check-square-fill text-success float-right mr-4");
        checkIcon.addEventListener('click', function() {
            toggleComplete(liElement);
        });
        liElement.appendChild(checkIcon);


        taskList.appendChild(liElement);
    });
}

// Listeye yeni bir görev ekle
function newElement() {

    //Inputun yazılacak yerin ID'si
    const texbox = document.querySelector("#task");
    const inputValue = texbox.value;

    if (inputValue === '') {
        alert('Lütfen bir görev girin.');
        return;
    } else {
        alert('Listeye eklendi');
    }

    //Input a girilen task !
    const liElement = document.createElement('li');
    liElement.innerHTML = inputValue;

    //Girilen taskın yanına çöp kutusu eklenmesi
    const trashIcon = document.createElement("i");
    trashIcon.setAttribute("class", "bi bi-trash2-fill text-danger float-right mr-4");
    trashIcon.addEventListener('click', function() {
        removeTask(liElement);
    });
    liElement.appendChild(trashIcon);

    //Girilen taskın yanına check box eklenmesi
    const checkIcon = document.createElement("i");
    checkIcon.setAttribute("class", "bi bi-check-square-fill text-success float-right mr-4");
    checkIcon.addEventListener('click', function() {
        toggleComplete(liElement);
    });
    liElement.appendChild(checkIcon);

    //Bütün verilerin Input'a aktarılması
    const taskList = document.getElementById('list');
    taskList.appendChild(liElement);

    // Save to localStorage
    saveTask(inputValue, false);

    texbox.value = '';
}

// Görev tamamlanma durumunu değiştirme
function toggleComplete(taskElement) {
    taskElement.classList.toggle('completed');
    updateLocalStorage();
}

// Görevi kaldırma
function removeTask(taskElement) {
    taskElement.remove();
    updateLocalStorage();
}

// Görevleri localStorage'a kaydetme
function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// localStorage'daki görevleri güncelleme
function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#list li').forEach(li => {
        tasks.push({
            text: li.textContent.replace('🗑️✔️', '').trim(),
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Sayfa yüklendiğinde listeyi geri yükle
document.addEventListener('DOMContentLoaded', loadList);
