new Processing(document.getElementById("canvas"), function(P) {
	var particles = [];
	var cycles = 0;

	function explode(x, y, num, color) {
		var strength = P.random(20,30);
		for (var i=0; i<num; i++) {
			var angle = P.random(-Math.PI, Math.PI);
			var speed = P.random(0, strength);
			particles.push({
				x: x,
				y: y,
				radius: P.random(1,4),
				color: color,
				vx: speed * Math.cos(angle),
				vy: speed * Math.sin(angle),
			});
		}
	}

	P.setup = function() {
		P.size(600, 600);
		P.cursor(P.HAND);
	};

	P.mouseClicked = function() {
		explode(P.mouseX, P.mouseY, 100, 255);
	}

	P.draw = function() {
		P.background(Math.floor(Math.min(particles.length / 400, 1) * 16));

		for (var i = particles.length - 1; i >= 0; i--) {
			var particle = particles[i];
			particle.vy += 1;
			particle.x += particle.vx;
			particle.y += particle.vy;
			particle.vx *= 0.94;
			particle.vy *= 0.94;
			if (particle.y > P.height) {
				particles.splice(i, 1);
			}
			P.noFill();
			P.stroke(particle.color);
			P.strokeWeight(particle.radius * 2);
			P.line(particle.x - particle.vx, particle.y - particle.vy, particle.x, particle.y);
		}

		if (--cycles <= 0) {
			cycles = Math.floor(P.random(10,80));
			explode(
				P.random(P.width / 4, P.width * 3/4),
				P.random(P.height / 4, P.height * 3/4),
				Math.floor(P.random(200,400)),
				P.color(P.random(128,255), P.random(128,255), P.random(128,255))
			);
		}
	};
});