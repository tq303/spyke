# class specification

## world
A way of manipulating the worlds rotation, mainly so the projection can be translated.

@class world
	# The global world control. Graphically mimic the position of the projector
	@var rotation x,y,z
	@var position x,y,z
	@func setRotation
	@func setPosition
	@calibration
		# future addition for calculating position to the real world

@class triangle
	# fixed, relative virtual representation of spike.
	@var width
	@var height
	@var angle, this will also translate height to @world.y
	@func update, retranslate angle and height to @world.y

## Idea
Draw the triangle in a virtual world scenario and fix it to the ground of the @world.y. The calibration comes from drawing a gird/plane on the @world.y and trying to relate to a real world grid (cardoard cut out).