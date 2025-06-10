// HTML elemanlarını seçme
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-container');
const scoreContainer = document.getElementById('score-container');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// Sorular dizisi
const questions = [
    {
        question: "Kapadokya hangi ilimizin sınırları içerisindedir?",
        options: ["Konya", "Kayseri", "Nevşehir", "Çorum"],
        correctAnswer: "Nevşehir"
    },
    {
        question: "Kapadokya ne anlama gelmektedir?",
        options: ["Perilerin yaşadığı yer", "Üzüm bağlarının çok olduğu yer", "Yeraltı şehirlerinin ortak adı ", "Güzel atlar diyarı"],
        correctAnswer: "Güzel atlar diyarı"
    },
    {
        question: "Hangi vadi kapadokya bölgesinde yer alan bir vadidir?",
        options: ["Gomeda Vadisi", "Kurtlar Vadisi", "Periler Vadisi", "Slikon Vadisi"],
        correctAnswer: "Gomeda Vadisi"
    },
    {
        question: "Hangisi bu bölgeye has değildir?",
        options: ["Vadi Mantarı", "Kabak Çekirdeği", "Üzüm Pekmezi", "Kıraç Patatesi"],
        correctAnswer: "Vadi Mantarı"
    },
    {
        question: "Kapadokya bölgesindeysen, burda araçların plakasının başında en çok hangi sayı olduğunu görürürsün?",
        options: ["51", "50", "49", "40"],
        correctAnswer: "50"
    },
    {
        question: "Kapadokya'da hangisi yoktur?",
        options: ["Kızıl çukur", "Paşa bağları", "Üç güzeller", "Aşçılar tepesi"],
        correctAnswer: "Aşçılar tepesi"
    },
    {
        question: "Hangi kale bu bölgede yer almaz",
        options: ["Uçhisar Kalesi", "Nevşehir Kalesi", "Karahisar kalesi", "Ortahisar kalesi"],
        correctAnswer: "Karahisar kalesi"
    },
    {
        question: "Aşağıdaki ünlü kişilerden hangisi bu bölgeden değildir?",
        options: ["Damat İbrahim Paşa", "Eyüp Sabri Tuncer", "Refik Başaran", "Hacı Bektaşi Veli"],
        correctAnswer: "Eyüp Sabri Tuncer"
    },
    {
        question: "Keşfinin daha yeni olduğu , Kaymaklı ve Derinkuyuile bağlantılı olduğu düşünülen Dünyanın en büyük yeraltı şehrinin adı ne?",
        options: ["Gülşehir", "Kayaşehir", "Bacaşehir", "Eskişehir"],
        correctAnswer: "Kayaşehir"
    },
    {
        question: "Kapadokya'da hangi festival yapılmaktadır?",
        options: ["Bağbozumu Festivali", "Periler Oyunu Festivali", "Kızılırmak Festivali", "Güvercin Festivali"],
        correctAnswer: "Bağbozumu Festivali"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null; // Seçilen şıkkı takip etmek için

// Yarışmayı başlatma fonksiyonu
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    questionContainer.classList.remove('hidden');
    scoreContainer.classList.add('hidden');
    nextButton.classList.add('hidden'); // Yeni oyunda next butonu gizli başlar
    loadQuestion();
}

// Soruyu yükleme fonksiyonu
function loadQuestion() {
    // Önceki soruya ait sınıfları ve geri bildirimleri temizle
    const previousButtons = optionsContainer.querySelectorAll('button');
    previousButtons.forEach(button => {
        button.classList.remove('correct', 'incorrect');
        button.disabled = false; // Şıkları tekrar etkinleştir
    });

    feedbackElement.textContent = ''; // Geri bildirimi temizle
    nextButton.classList.add('hidden'); // Sonraki soruyu gizle

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = ''; // Önceki şıkları temizle

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => selectOption(option, button));
            optionsContainer.appendChild(button);
        });
    } else {
        endQuiz();
    }
}

// Şık seçme fonksiyonu
function selectOption(selectedAnswer, button) {
    if (selectedOption !== null) {
        return; // Zaten bir şık seçildiyse tekrar işlem yapma
    }
    
    selectedOption = selectedAnswer; // Seçilen şıkkı kaydet

    const currentQuestion = questions[currentQuestionIndex];
    const allOptionButtons = optionsContainer.querySelectorAll('button');

    // Tüm şıkları devre dışı bırak
    allOptionButtons.forEach(btn => {
        btn.disabled = true;
    });

    if (selectedAnswer === currentQuestion.correctAnswer) {
        feedbackElement.textContent = 'Doğru cevap!';
        feedbackElement.style.color = 'green';
        button.classList.add('correct');
        score++;
    } else {
        feedbackElement.textContent = `Yanlış cevap. Doğru cevap: ${currentQuestion.correctAnswer}`;
        feedbackElement.style.color = 'red';
        button.classList.add('incorrect');
        // Doğru cevabı da işaretle
        allOptionButtons.forEach(btn => {
            if (btn.textContent === currentQuestion.correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }
    nextButton.classList.remove('hidden'); // Sonraki soru butonunu göster
}

// Sonraki soruya geçme fonksiyonu
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    selectedOption = null; // Yeni soruya geçerken seçilen şıkkı sıfırla
    loadQuestion();
});

// Yarışmayı bitirme fonksiyonu
function endQuiz() {
    questionContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    finalScoreElement.textContent = score;
}

// Yeniden başlatma butonu dinleyicisi
restartButton.addEventListener('click', startQuiz);

// Yarışmayı ilk kez başlatma
startQuiz();
