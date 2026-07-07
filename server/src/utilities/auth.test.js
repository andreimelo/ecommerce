const test = require('node:test');
const assert = require('node:assert/strict');
const { getCookieValue, buildCookieOptions, createSessionPayload } = require('./auth');

test('getCookieValue reads a named cookie from the request header', () => {
	const req = {
		headers : {
			cookie : 'session=abc123; access_token=def456; csrf_token=ghi789',
		},
	};

	assert.equal(getCookieValue(req, 'access_token'), 'def456');
	assert.equal(getCookieValue(req, 'missing_cookie'), undefined);
});

test('buildCookieOptions enables secure flags for production cookies', () => {
	const options = buildCookieOptions({ secure: true, maxAge: 60000 });

	assert.equal(options.httpOnly, true);
	assert.equal(options.secure, true);
	assert.equal(options.sameSite, 'lax');
	assert.equal(options.maxAge, 60000);
});

test('createSessionPayload includes the expected claims for a session and refresh token', () => {
	const payload = createSessionPayload({
		email : 'user@example.com',
		uid   : 'uid-123',
		role  : 'user',
	});

	assert.equal(payload.email, 'user@example.com');
	assert.equal(payload.uid, 'uid-123');
	assert.equal(payload.role, 'user');
});
