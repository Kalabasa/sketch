new Processing(document.getElementById("canvas"), function(P) {
	var particles = [];
	var cycles = 0;

	function explode(x, y, num, color) {
		var strength = P.random(10,20);
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
		explode(P.mouseX, P.mouseY, 100, P.color(0, 240, 255));
	}

	P.draw = function() {
		var totalBrightness = 0;
		for (var i = particles.length - 1; i >= 0; i--) {
			var particle = particles[i];
			totalBrightness += P.brightness(particle.color) * particle.radius;
		}

		P.background(Math.floor(Math.min(totalBrightness / 255 / 4 / 400, 1) * 32));

		for (var i = particles.length - 1; i >= 0; i--) {
			var particle = particles[i];
			var airResist = Math.min(0.1, 0.08 / particle.radius);
			particle.vx *= 1 - airResist;
			particle.vy *= 1 - airResist;
			particle.vy += 0.3;
			particle.x += particle.vx;
			particle.y += particle.vy;
			particle.radius *= 0.98;

			P.noFill();
			P.stroke(particle.color);
			P.strokeWeight(particle.radius * 2);
			P.line(particle.x - particle.vx, particle.y - particle.vy, particle.x, particle.y);

			if (particle.y > P.height || particle.radius <= 0.1) {
				particles.splice(i, 1);
			}
		}

		if (--cycles <= 0) {
			cycles = Math.floor(P.random(10,120));
			explode(
				P.random(P.width / 4, P.width * 3/4),
				P.random(P.height / 4, P.height / 2),
				Math.floor(P.random(200,400)),
				P.color(P.random(192,255), P.random(192,255), P.random(192,255))
			);
		}
	};
});