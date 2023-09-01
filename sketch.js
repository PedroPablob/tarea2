let elements = [];
let circles = [];
let triangles = [];
let displayText = false;
let textTimer = 0;

function setup() {
  createCanvas(1324, 868); // Tamaño del lienzo más grande
  rectMode(CENTER);
  
  // Crear instancias de Element 2 (cuadrados) con diferentes tamaños, velocidades y direcciones
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(40, 100); // Figuras más grandes
    let speedX = random(1, 3) * (random() > 0.5 ? 1 : -1);
    let speedY = random(1, 3) * (random() > 0.5 ? 1 : -1);
    elements.push(new Element2(x, y, size, speedX, speedY));
  }
  
  // Crear instancias de Element 3 (círculos) con el mismo movimiento
  for (let i = 0; i < 8; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(40, 100); // Figuras más grandes
    let speedX = random(1, 3) * (random() > 0.5 ? 1 : -1);
    let speedY = random(1, 3) * (random() > 0.5 ? 1 : -1);
    circles.push(new Element3(x, y, size, speedX, speedY));
  }

  // Crear instancias de Element 4 (triángulos) con mayor velocidad
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(40, 100); // Figuras más grandes
    let speedX = random(2, 4) * (random() > 0.5 ? 1 : -1); // Mayor velocidad
    let speedY = random(2, 4) * (random() > 0.5 ? 1 : -1); // Mayor velocidad
    triangles.push(new Element4(x, y, size, speedX, speedY));
  }
}

function draw() {
  background(220);
  
  // Actualizar y mostrar las instancias de Element 2 (cuadrados)
  for (let element of elements) {
    element.update();
    element.display();
  }
  
  // Actualizar y mostrar las instancias de Element 3 (círculos)
  for (let circle of circles) {
    circle.update();
    circle.display();
  }
  
  // Actualizar y mostrar las instancias de Element 4 (triángulos)
  for (let triangle of triangles) {
    triangle.update();
    triangle.display();
  }
  
  // Comprobar las intersecciones entre las instancias de Element 2 (cuadrados)
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      let intersection = elements[i].checkIntersection(elements[j]);
      if (intersection) {
        // Calcular el tamaño de los círculos
        let distance = dist(elements[i].x, elements[i].y, elements[j].x, elements[j].y);
        let radius1 = map(distance, 0, 200, 20, 0); // Ajustar valores
        let radius2 = map(distance, 0, 200, 4, 0); // Ajustar valores
        
        // Calcular el color de los círculos como una variación de grises
        let gray = map(distance, 0, 200, 0, 255); // Ajustar valores
        fill(gray);
        
        // Dibujar los círculos de intersección
        ellipse(intersection.x, intersection.y, radius1, radius1);
        fill(255 - gray);
        ellipse(intersection.x, intersection.y, radius2, radius2);
      }
    }
  }
  
  // Controlar la aparición y desaparición del texto
  if (millis() - textTimer > 8000) {
    displayText = !displayText;
    textTimer = millis();
  }
  
  if (displayText) {
    fill(0);
    textSize(40); // Texto más grande
    textAlign(CENTER, CENTER);
    text("supercalifragilisticoespialidoso", width / 2, height / 2);
  }
}

class Element2 {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }
  
  display() {
    rect(this.x, this.y, this.size, this.size);
  }
  
  checkIntersection(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (d < (this.size + other.size) / 2) {
      // Calcular el punto de intersección
      let x = (this.x + other.x) / 2;
      let y = (this.y + other.y) / 2;
      return createVector(x, y);
    }
    return null;
  }
}

class Element3 {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }
  
  display() {
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Element4 {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }
  
  display() {
    triangle(
      this.x, this.y - this.size / 2,
      this.x - this.size / 2, this.y + this.size / 2,
      this.x + this.size / 2, this.y + this.size / 2
    );
  }
}
