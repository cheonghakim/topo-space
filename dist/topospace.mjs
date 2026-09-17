import { Fragment as e, Teleport as t, Transition as n, TransitionGroup as r, computed as i, createApp as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createStaticVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as m, nextTick as h, normalizeClass as g, normalizeStyle as _, onBeforeUnmount as v, onMounted as y, openBlock as b, reactive as x, ref as S, renderList as C, resolveComponent as w, toDisplayString as T, unref as E, vModelCheckbox as D, vModelRadio as O, vModelSelect as k, vModelText as A, watch as j, withCtx as M, withDirectives as N, withKeys as P, withModifiers as F } from "vue";
import { createPinia as I, defineStore as L } from "pinia";
import * as R from "three";
import { AnimationClip as z, BackSide as B, BatchedMesh as V, Bone as H, Box3 as U, BoxGeometry as ee, BufferAttribute as te, BufferGeometry as ne, ClampToEdgeWrapping as re, Color as W, ColorManagement as ie, Controls as ae, DirectionalLight as oe, DoubleSide as se, FileLoader as ce, Float32BufferAttribute as le, FrontSide as ue, Group as de, ImageBitmapLoader as fe, InstancedBufferAttribute as pe, InstancedBufferGeometry as me, InstancedInterleavedBuffer as he, InstancedMesh as ge, InterleavedBuffer as _e, InterleavedBufferAttribute as ve, Interpolant as ye, InterpolateDiscrete as be, InterpolateLinear as xe, Line as Se, Line3 as Ce, LineBasicMaterial as we, LineLoop as Te, LineSegments as Ee, LinearFilter as De, LinearMipmapLinearFilter as Oe, LinearMipmapNearestFilter as ke, LinearSRGBColorSpace as Ae, Loader as je, LoaderUtils as Me, MOUSE as Ne, Material as Pe, MathUtils as Fe, Matrix4 as Ie, Mesh as Le, MeshBasicMaterial as Re, MeshPhysicalMaterial as ze, MeshStandardMaterial as Be, MirroredRepeatWrapping as Ve, NearestFilter as He, NearestMipmapLinearFilter as Ue, NearestMipmapNearestFilter as We, NumberKeyframeTrack as Ge, Object3D as Ke, OrthographicCamera as qe, PerspectiveCamera as Je, Plane as Ye, PointLight as Xe, Points as Ze, PointsMaterial as Qe, PropertyBinding as $e, Quaternion as et, QuaternionKeyframeTrack as tt, REVISION as nt, Ray as rt, RepeatWrapping as it, SRGBColorSpace as at, ShaderLib as ot, ShaderMaterial as st, Skeleton as ct, SkinnedMesh as lt, Sphere as ut, Spherical as dt, SpotLight as ft, TOUCH as pt, Texture as mt, TextureLoader as ht, Triangle as gt, TriangleFanDrawMode as _t, TriangleStripDrawMode as vt, TrianglesDrawMode as yt, UniformsLib as bt, UniformsUtils as xt, Vector2 as G, Vector3 as K, Vector4 as St, VectorKeyframeTrack as Ct, WireframeGeometry as wt } from "three";
//#region \0rolldown/runtime.js
var Tt = Object.create, Et = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, Ot = Object.getOwnPropertyNames, kt = Object.getPrototypeOf, At = Object.prototype.hasOwnProperty, jt = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), Mt = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = Ot(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !At.call(e, s) && s !== n && Et(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = Dt(t, s)) || r.enumerable
	});
	return e;
}, Nt = (e, t, n) => (n = e == null ? {} : Tt(kt(e)), Mt(t || !e || !e.__esModule ? Et(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), Pt = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), Ft = {
	view: !0,
	search: !0,
	filter: !0,
	deviceDetail: !0,
	topologyView: !0,
	topologyEdit: !1,
	realtimeUpdate: !0,
	savedView: !1,
	layoutEdit: !1,
	spaceEdit: !1,
	annotationEdit: !1,
	import: !1,
	tour: !0,
	backgroundEdit: !0,
	chaosSimulator: !1
}, It = {
	search: "",
	status: [],
	type: [],
	spaceId: null,
	tags: [],
	showUnmapped: !0
}, Lt = class {
	features;
	resolver;
	mode = "view";
	constructor(e = {}, t) {
		this.features = {
			...Ft,
			...e
		}, this.resolver = t ?? (() => !0);
	}
	setMode(e) {
		this.mode = e;
	}
	setFeatures(e) {
		this.features = {
			...Ft,
			...e
		};
	}
	setResolver(e) {
		this.resolver = e;
	}
	hasFeature(e) {
		return !!this.features[e];
	}
	can(e, t) {
		return e === "rawDevice:update" || e === "layout:update" && !this.features.layoutEdit || e.startsWith("space:") && !this.features.spaceEdit || e.startsWith("annotation:") && !this.features.annotationEdit || e.startsWith("topology:") && !this.features.topologyEdit || e.startsWith("background:") && !this.features.backgroundEdit || e === "device:map" && !this.features.layoutEdit || this.mode === "view" && [
			"layout:update",
			"space:create",
			"space:update",
			"space:delete",
			"device:map",
			"device:unmap",
			"annotation:create",
			"annotation:update",
			"annotation:delete",
			"topology:createLink",
			"topology:updateLink",
			"topology:deleteLink",
			"virtualNode:create",
			"virtualNode:update",
			"virtualNode:delete",
			"background:create",
			"background:update",
			"background:delete",
			"import"
		].includes(e) ? !1 : this.resolver({
			action: e,
			target: t,
			currentMode: this.mode
		});
	}
};
//#endregion
//#region src/utils/mockDataGenerator.ts
function Rt() {
	return Math.random().toString(36).slice(2, 10);
}
function zt(e, t) {
	return Math.random() * (t - e) + e;
}
function Bt(e, t) {
	return Math.floor(zt(e, t + 1));
}
function Vt(e) {
	return e[Math.floor(Math.random() * e.length)];
}
var Ht = [
	"normal",
	"normal",
	"normal",
	"normal",
	"normal",
	"warning",
	"warning",
	"critical",
	"offline",
	"unknown"
], Ut = {
	server: [
		"Dell",
		"HPE",
		"Lenovo",
		"Supermicro"
	],
	switch: [
		"Cisco",
		"Juniper",
		"Arista",
		"HPE"
	],
	router: [
		"Cisco",
		"Juniper",
		"MikroTik"
	],
	firewall: [
		"Palo Alto",
		"Fortinet",
		"Check Point",
		"Cisco"
	],
	database: [
		"Oracle",
		"MySQL",
		"PostgreSQL",
		"MongoDB"
	],
	storage: [
		"NetApp",
		"Pure Storage",
		"EMC",
		"IBM"
	],
	vm: [
		"VMware",
		"KVM",
		"Hyper-V"
	],
	container: [
		"Docker",
		"Kubernetes",
		"Podman"
	],
	load_balancer: [
		"F5",
		"HAProxy",
		"nginx",
		"Citrix"
	],
	access_point: [
		"Cisco",
		"Ubiquiti",
		"Ruckus"
	],
	cloud_service: [
		"AWS",
		"Azure",
		"GCP"
	],
	unknown: ["Unknown"]
};
function Wt(e, t, n) {
	return (t === "switch" || t === "router" ? [
		"GE0/0",
		"GE0/1",
		"GE0/2",
		"GE0/3",
		"GE0/4",
		"GE0/5",
		"GE0/6",
		"GE0/7"
	] : [
		"eth0",
		"eth1",
		"bond0"
	]).slice(0, n).map((t, n) => ({
		id: `${e}-if-${n}`,
		rawDeviceId: e,
		name: t,
		alias: n === 0 ? "uplink" : n === 1 ? "mgmt" : void 0,
		ip: n === 0 ? `10.${Bt(1, 254)}.${Bt(1, 254)}.${Bt(1, 254)}` : void 0,
		status: Vt([
			"up",
			"up",
			"up",
			"down",
			"unknown"
		]),
		speed: Vt([
			100,
			1e3,
			1e4,
			25e3
		]),
		trafficIn: zt(0, 900),
		trafficOut: zt(0, 500),
		errors: Math.random() > .85 ? Bt(1, 50) : 0,
		discards: Math.random() > .9 ? Bt(1, 20) : 0
	}));
}
function Gt(e, t, n, r) {
	let i = `dev-${Rt()}`, a = Vt(Ut[e]), o = Vt(Ht);
	return {
		device: {
			id: i,
			source: Vt([
				"zabbix",
				"prtg",
				"manual",
				"openNMS"
			]),
			externalId: `ext-${Rt()}`,
			hostname: `${e.slice(0, 3)}-${t.slice(-2)}-${String(r).padStart(2, "0")}`,
			ip: `10.${Bt(1, 4)}.${Bt(1, 254)}.${Bt(1, 254)}`,
			normalizedType: e,
			vendor: a,
			model: `${a}-Model-${Bt(100, 999)}`,
			status: o,
			metrics: {
				cpu: zt(5, 98),
				memory: zt(20, 95),
				disk: zt(10, 90),
				networkIn: zt(10, 950),
				networkOut: zt(5, 500),
				temperature: zt(35, 78)
			},
			siteId: n,
			firstSeenAt: (/* @__PURE__ */ new Date(Date.now() - zt(0, 365) * 864e5)).toISOString(),
			lastSeenAt: (/* @__PURE__ */ new Date()).toISOString(),
			syncState: "active"
		},
		interfaces: Wt(i, e, e === "switch" ? 8 : e === "router" ? 6 : e === "firewall" ? 4 : 2)
	};
}
function Kt() {
	let e = [], t = [], n = [], r = [], i = [];
	function a(a, o, s) {
		let c = [{
			suffix: "-zone-net",
			name: "Network Zone",
			dx: -12
		}, {
			suffix: "-zone-srv",
			name: "Server Zone",
			dx: 12
		}], l = [];
		if (c.forEach((c, u) => {
			let d = `${a}${c.suffix}`;
			e.push({
				id: d,
				name: c.name,
				kind: "physical",
				type: "zone",
				parentId: a,
				source: "manual",
				position: {
					x: c.dx,
					y: 0,
					z: 0
				},
				size: {
					width: 22,
					height: .1,
					depth: 38
				},
				color: u === 0 ? "#1e3a5f" : "#1a3a2a"
			});
			let f = 2.2;
			for (let a = 0; a < 3; a++) {
				let p = `${d}-rack-${a}`;
				a === 0 && (l[u] = p);
				let m = c.dx + (a - 1) * 8, h = u === 0 ? [
					"switch",
					"router",
					"firewall",
					"load_balancer",
					"switch"
				] : [
					"switch",
					"server",
					"server",
					"server",
					"database",
					"storage",
					"server"
				], g = [], _ = Math.ceil(h.length / 2);
				e.push({
					id: p,
					name: `Rack-${s}${u + 1}${a + 1}`,
					kind: "physical",
					type: "rack",
					parentId: d,
					source: "manual",
					position: {
						x: m,
						y: 0,
						z: 0
					},
					size: {
						width: 5.2,
						height: .3,
						depth: _ * f + .8
					}
				}), h.forEach((e, r) => {
					let { device: a, interfaces: s } = Gt(e, d, o, r);
					t.push(a), i.push(...s);
					let c = r % 2, l = Math.floor(r / 2), u = (c - .5) * 2, h = (l - (_ - 1) / 2) * f, v = m + u, y = 0 + h;
					g.push({
						device: a,
						pos: {
							x: v,
							z: y
						}
					}), n.push({
						id: `map-${a.id}`,
						rawDeviceId: a.id,
						primarySpaceId: p,
						slotIndex: r,
						mappingStatus: "mapped",
						position: {
							x: v,
							y: .4,
							z: y
						},
						tags: [e, o],
						importance: a.status === "critical" ? "critical" : "normal",
						updatedAt: (/* @__PURE__ */ new Date()).toISOString()
					});
				});
				let v = g.find((e) => e.device.normalizedType === "switch");
				v && g.forEach((e) => {
					e.device.id !== v.device.id && r.push({
						id: `link-${Rt()}`,
						sourceDeviceId: e.device.id,
						targetDeviceId: v.device.id,
						type: "physical",
						status: "up",
						source: "discovered",
						confidence: "high",
						bandwidth: 1e3
					});
				});
			}
		}), l[0] && l[1]) {
			let e = t.find((e) => e.normalizedType === "switch" && n.find((t) => t.rawDeviceId === e.id && t.primarySpaceId === l[0])), i = t.find((e) => e.normalizedType === "switch" && n.find((t) => t.rawDeviceId === e.id && t.primarySpaceId === l[1]));
			e && i && r.push({
				id: `link-${Rt()}`,
				sourceDeviceId: e.id,
				targetDeviceId: i.id,
				type: "logical",
				status: "up",
				source: "discovered",
				confidence: "medium",
				label: "Core Link"
			});
		}
	}
	[{
		id: "building-seoul",
		name: "Seoul HQ",
		floors: 2
	}, {
		id: "building-busan",
		name: "Busan DR",
		floors: 2
	}].forEach((t, n) => {
		e.push({
			id: t.id,
			name: t.name,
			kind: "physical",
			type: "building",
			source: "manual"
		});
		for (let r = 0; r < t.floors; r++) {
			let i = `${t.id}-floor-${r + 1}`;
			e.push({
				id: i,
				name: `${r + 1}F`,
				kind: "physical",
				type: "floor",
				parentId: t.id,
				source: "manual",
				position: {
					x: 0,
					y: 0,
					z: 0
				},
				size: {
					width: 50,
					height: .1,
					depth: 40
				}
			}), a(i, t.id, `${n + 1}${r + 1}`);
		}
	}), e.push({
		id: "site-cloud",
		name: "Cloud (Tokyo)",
		kind: "virtual",
		type: "site",
		source: "manual",
		position: {
			x: 0,
			y: 0,
			z: 0
		},
		size: {
			width: 50,
			height: .1,
			depth: 40
		}
	}), a("site-cloud", "site-cloud", "9");
	let o = t.find((e) => e.normalizedType === "router" && e.siteId === "building-seoul"), s = t.find((e) => e.normalizedType === "router" && e.siteId === "site-cloud");
	o && s && r.push({
		id: `link-${Rt()}`,
		sourceDeviceId: o.id,
		targetDeviceId: s.id,
		type: "service_dependency",
		status: "up",
		source: "manual",
		label: "WAN Link"
	});
	let c = [];
	return [
		"server",
		"switch",
		"firewall",
		"server",
		"database"
	].forEach((e, t) => {
		let { device: n } = Gt(e, "unmapped", "building-seoul", t);
		n.syncState = "active", c.push(n);
	}), {
		spaces: e,
		devices: t,
		deviceMappings: n,
		links: r,
		interfaces: i,
		unmappedDevices: c
	};
}
//#endregion
//#region src/layout/forceLayout.ts
var qt = {
	iterations: 200,
	idealDistance: 3,
	clusterStrength: 2.5,
	bounds: 60
};
function Jt(e, t, n, r) {
	let { idealDistance: i, clusterStrength: a, bounds: o } = r, s = e.length, c = i * i, l = Array(s).fill(0), u = Array(s).fill(0);
	for (let t = 0; t < s; t++) {
		let n = e[t];
		for (let r = t + 1; r < s; r++) {
			let o = e[r], s = n.x - o.x, d = n.z - o.z, f = s * s + d * d;
			f < 1e-4 && (s = (Math.random() - .5) * .1, d = (Math.random() - .5) * .1, f = s * s + d * d);
			let p = Math.sqrt(f), m = c / p, h = s / p * m, g = d / p * m;
			if (n.clusterId && n.clusterId === o.clusterId) {
				let e = p / i * a;
				h -= s / p * e, g -= d / p * e;
			}
			l[t] += h, u[t] += g, l[r] -= h, u[r] -= g;
		}
	}
	for (let t = 0; t < s; t++) {
		let n = e[t];
		n.pinned || (n.vx = (n.vx + l[t] - n.x / o) * .15, n.vz = (n.vz + u[t] - n.z / o) * .15);
	}
	for (let e of n) {
		let n = t.get(e.sourceId), r = t.get(e.targetId);
		if (!n || !r) continue;
		let a = r.x - n.x, o = r.z - n.z, s = Math.hypot(a, o);
		s < 1e-4 && (a = .1, o = 0, s = .1);
		let c = i / Math.max(e.weight, .1), l = (s - c) * .05, u = a / s * l, d = o / s * l;
		n.pinned || (n.vx += u, n.vz += d), r.pinned || (r.vx -= u, r.vz -= d);
	}
	for (let t of e) {
		if (t.pinned) continue;
		let e = Math.hypot(t.vx, t.vz), n = i * .5;
		e > n && (t.vx = t.vx / e * n, t.vz = t.vz / e * n), t.x += t.vx, t.z += t.vz, t.vx *= .9, t.vz *= .9;
	}
}
//#endregion
//#region src/layout/CpuForceLayout.ts
var Yt = 4;
function Xt(e) {
	typeof requestAnimationFrame == "function" ? requestAnimationFrame(e) : setTimeout(e, 0);
}
var Zt = class {
	run(e, t, n, r) {
		let i = {
			...qt,
			...n
		}, a = e.map((e) => ({
			id: e.id,
			x: e.x,
			z: e.z,
			vx: 0,
			vz: 0,
			pinned: e.pinned,
			clusterId: e.clusterId
		})), o = new Map(a.map((e) => [e.id, e])), s = !1, c = () => new Map(a.map((e) => [e.id, {
			x: e.x,
			z: e.z
		}]));
		return {
			promise: new Promise((e) => {
				if (!a.length || i.iterations <= 0) {
					e(c());
					return;
				}
				let n = 0, l = () => {
					if (s) {
						e(c());
						return;
					}
					let u = Math.min(n + Yt, i.iterations);
					for (; n < u; n++) Jt(a, o, t, i);
					if (r?.({
						iteration: n,
						iterations: i.iterations,
						positions: c()
					}), n >= i.iterations) {
						e(c());
						return;
					}
					Xt(l);
				};
				Xt(l);
			}),
			cancel: () => {
				s = !0;
			}
		};
	}
}, q = L("editor", () => {
	let e = new Lt({
		topologyEdit: !0,
		layoutEdit: !0,
		spaceEdit: !0,
		annotationEdit: !0,
		import: !0,
		backgroundEdit: !0,
		chaosSimulator: !0
	}), t, n, r = S(/* @__PURE__ */ new Map()), a = S(/* @__PURE__ */ new Map()), o = S(/* @__PURE__ */ new Map()), s = S(/* @__PURE__ */ new Map()), c = S(/* @__PURE__ */ new Map()), l = S(0);
	function u() {
		l.value++;
	}
	let d = S([]), f = S(/* @__PURE__ */ new Map()), p = S(/* @__PURE__ */ new Map()), m = S([]), h = S([]), g = S(null), _ = null, v = S([]);
	function y(r) {
		r.mode && e.setMode(r.mode), r.features && e.setFeatures(r.features), r.permissionResolver && e.setResolver(r.permissionResolver), t = r.onPermissionDenied, n = r.onChange;
	}
	function b(t) {
		e.setMode(t);
	}
	function x(t, n) {
		return e.can(t, n);
	}
	function C(t) {
		return e.hasFeature(t);
	}
	function w(e, n) {
		t?.({
			action: e,
			target: n
		});
	}
	function T(e, t) {
		let n = x(e, t);
		return n || w(e, t), n;
	}
	function E(e, t, r = "user") {
		n?.({
			type: e,
			target: t,
			source: r,
			timestamp: Date.now()
		});
	}
	let D = i(() => {
		let e = /* @__PURE__ */ new Set();
		return o.value.forEach((t) => {
			(t.mappingStatus === "mapped" || t.mappingStatus === "auto_mapped") && e.add(t.rawDeviceId);
		}), e;
	}), O = i(() => [...r.value.values()].filter((e) => e.status === "critical").length), k = i(() => [...r.value.values()].filter((e) => e.status === "warning").length), A = i(() => {
		let e = /* @__PURE__ */ new Map();
		return o.value.forEach((t) => {
			if (!t.primarySpaceId) return;
			let n = r.value.get(t.rawDeviceId);
			n && (e.has(t.primarySpaceId) || e.set(t.primarySpaceId, []), e.get(t.primarySpaceId).push(n));
		}), e;
	}), j = i(() => {
		let e = /* @__PURE__ */ new Map();
		return c.value.forEach((t) => {
			e.has(t.rawDeviceId) || e.set(t.rawDeviceId, []), e.get(t.rawDeviceId).push(t);
		}), e;
	}), M = i(() => [...a.value.values()].filter((e) => e.type === "rack")), N = i(() => [...a.value.values()]), P = i(() => [...a.value.values()].filter((e) => !e.parentId && !e.archived));
	function F(e) {
		return [...a.value.values()].filter((t) => t.parentId === e && !t.archived);
	}
	function I(e) {
		let t = new Set([e]), n = [e];
		for (; n.length;) F(n.shift()).forEach((e) => {
			t.has(e.id) || (t.add(e.id), n.push(e.id));
		});
		return t;
	}
	function L(e) {
		if (!e) return [...a.value.values()].filter((e) => !e.archived);
		let t = I(e);
		return [...a.value.values()].filter((e) => t.has(e.id) && !e.archived);
	}
	function R(e) {
		if (!e) return new Set(r.value.keys());
		let t = /* @__PURE__ */ new Set();
		return I(e).forEach((e) => {
			(A.value.get(e) ?? []).forEach((e) => t.add(e.id));
		}), t;
	}
	function z(e) {
		let t = R(e);
		return [...r.value.values()].filter((e) => t.has(e.id));
	}
	function B(e) {
		return z(e).filter((e) => e.status === "critical").length;
	}
	function V(e) {
		return z(e).filter((e) => e.status === "warning").length;
	}
	function H(e) {
		if (!e) return [...s.value.values()];
		let t = R(e);
		return [...s.value.values()].filter((e) => t.has(e.sourceDeviceId) && t.has(e.targetDeviceId));
	}
	function U(e) {
		if (!e) return [...p.value.values()];
		let t = I(e);
		return [...p.value.values()].filter((e) => t.has(e.spaceId));
	}
	let ee = new Set([
		"building",
		"floor",
		"site"
	]);
	function te(e) {
		let t = a.value.get(e);
		for (; t && !ee.has(t.type);) t = t.parentId ? a.value.get(t.parentId) : void 0;
		if (!t) return null;
		let n = t.id;
		for (;;) {
			let e = F(n).find((e) => ee.has(e.type));
			if (!e) return n;
			n = e.id;
		}
	}
	function ne(e) {
		let t = Infinity, n = -Infinity, r = Infinity, i = -Infinity;
		return L(e).forEach((e) => {
			if (!e.position) return;
			let a = e.size ?? {
				width: 10,
				depth: 10
			};
			t = Math.min(t, e.position.x - a.width / 2), n = Math.max(n, e.position.x + a.width / 2), r = Math.min(r, e.position.z - a.depth / 2), i = Math.max(i, e.position.z + a.depth / 2);
		}), t === Infinity ? null : {
			minX: t,
			maxX: n,
			minZ: r,
			maxZ: i
		};
	}
	function re() {
		let e = Kt(), t = [...e.devices, ...e.unmappedDevices];
		r.value = new Map(t.map((e) => [e.id, e])), a.value = new Map(e.spaces.map((e) => [e.id, e])), o.value = new Map(e.deviceMappings.map((e) => [e.id, e])), s.value = new Map(e.links.map((e) => [e.id, e])), c.value = new Map(e.interfaces.map((e) => [e.id, e])), d.value = e.unmappedDevices;
	}
	function W(e) {
		let t = [...e.devices ?? [], ...e.unmappedDevices ?? []];
		r.value = new Map(t.map((e) => [e.id, e])), a.value = new Map((e.spaces ?? []).map((e) => [e.id, e])), o.value = new Map((e.deviceMappings ?? []).map((e) => [e.id, e])), s.value = new Map((e.links ?? []).map((e) => [e.id, e])), c.value = new Map((e.interfaces ?? []).map((e) => [e.id, e])), d.value = [...e.unmappedDevices ?? []], f.value = new Map((e.virtualNodes ?? []).map((e) => [e.id, e])), p.value = new Map((e.backgroundObjects ?? []).map((e) => [e.id, e]));
	}
	function ie(e, t, n) {
		let i = r.value.get(e);
		i && (i.status = t, n && Object.assign(i.metrics ??= {}, n));
	}
	function ae(e, t) {
		let n = s.value.get(e);
		n && (n.status = t), u();
	}
	function oe(e) {
		e.forEach((e) => {
			r.value.has(e.id) || d.value.push(e), r.value.set(e.id, e);
		});
	}
	function se(e) {
		let t = new Set(e);
		e.forEach((e) => {
			r.value.delete(e), d.value = d.value.filter((t) => t.id !== e);
			let t = [...o.value.entries()].find(([, t]) => t.rawDeviceId === e);
			t && o.value.delete(t[0]);
		});
		let n = !1;
		[...s.value.entries()].forEach(([e, r]) => {
			(t.has(r.sourceDeviceId) || t.has(r.targetDeviceId)) && (s.value.delete(e), n = !0, E("topology:deleteLink", {
				id: e,
				type: "link"
			}, "api"));
		}), n && u(), e.forEach((e) => E("device:unmap", {
			id: e,
			type: "device"
		}, "api"));
	}
	function ce(e) {
		e.forEach((e) => {
			s.value.set(e.id, e), E("topology:updateLink", {
				id: e.id,
				type: "link"
			}, "api");
		}), e.length && u();
	}
	function le(e) {
		e.forEach((e) => {
			s.value.delete(e), E("topology:deleteLink", {
				id: e,
				type: "link"
			}, "api");
		}), e.length && u();
	}
	function ue(e) {
		e.forEach((e) => {
			a.value.set(e.id, e), E("space:update", {
				id: e.id,
				type: "space"
			}, "api");
		});
	}
	function de(e) {
		e.forEach((e) => {
			let t = a.value.get(e);
			t && (t.archived = !0), E("space:delete", {
				id: e,
				type: "space"
			}, "api");
		});
	}
	function fe(e) {
		e.forEach((e) => {
			c.value.set(e.id, e), E("interface:update", {
				id: e.id,
				type: "interface"
			}, "api");
		});
	}
	function pe(e) {
		e.forEach((e) => {
			f.value.set(e.id, e), E("virtualNode:update", {
				id: e.id,
				type: "virtualNode"
			}, "api");
		});
	}
	function me(e) {
		e.forEach((e) => {
			f.value.delete(e), E("virtualNode:delete", {
				id: e,
				type: "virtualNode"
			}, "api");
		});
	}
	function he(e, t) {
		let n = Ae(e);
		n && (n.operatorState = {
			...n.operatorState,
			...t
		}, E("annotation:update", {
			id: e,
			type: "device"
		}, "api"));
	}
	function ge(e) {
		let t = `manual-${Date.now()}`, n = {
			id: t,
			source: "manual",
			externalId: t,
			hostname: e.hostname,
			ip: e.ip,
			normalizedType: e.type,
			vendor: e.vendor,
			status: "unknown",
			syncState: "active",
			metrics: {
				cpu: 0,
				memory: 0,
				disk: 0,
				networkIn: 0,
				networkOut: 0
			},
			firstSeenAt: (/* @__PURE__ */ new Date()).toISOString(),
			lastSeenAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		return r.value.set(t, n), d.value.push(n), Be("device.add", `Device added (manual): ${e.hostname}`), n;
	}
	function _e(e) {
		T("space:create", {
			id: e.id,
			spaceId: e.id
		}) && (a.value.set(e.id, e), E("space:create", {
			id: e.id,
			type: "space"
		}));
	}
	function ve(e, t) {
		if (!T("space:update", {
			id: e,
			spaceId: e
		})) return;
		let n = a.value.get(e);
		n && Object.assign(n, t), E("space:update", {
			id: e,
			type: "space"
		});
	}
	function ye(e) {
		if (!T("space:delete", {
			id: e,
			spaceId: e
		})) return;
		let t = a.value.get(e);
		t && (t.archived = !0), E("space:delete", {
			id: e,
			type: "space"
		});
	}
	function be(e, t, n, r) {
		if (!T("device:map", {
			id: e,
			spaceId: t
		})) return;
		let i = [...o.value.values()].find((t) => t.rawDeviceId === e)?.id ?? `map-${e}`, a = {
			id: i,
			rawDeviceId: e,
			primarySpaceId: t,
			slotIndex: n,
			mappingStatus: "mapped",
			position: r,
			tags: [],
			importance: "normal",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		o.value.set(i, a), d.value = d.value.filter((t) => t.id !== e), E("device:map", {
			id: e,
			type: "device"
		});
	}
	function xe(e) {
		if (!T("device:unmap", { id: e })) return;
		let t = [...o.value.entries()].find(([, t]) => t.rawDeviceId === e);
		if (!t) return;
		let [n, i] = t;
		i.mappingStatus = "unmapped", i.primarySpaceId = void 0;
		let a = r.value.get(e);
		a && !d.value.find((t) => t.id === e) && d.value.push(a), o.value.delete(n), E("device:unmap", {
			id: e,
			type: "device"
		});
	}
	function Se(e, t) {
		if (!T("annotation:update", { id: e })) return;
		let n = [...o.value.values()].find((t) => t.rawDeviceId === e);
		n && Object.assign(n, t), E("annotation:update", {
			id: e,
			type: "device"
		});
	}
	function Ce(e, t) {
		if (!T("annotation:update", { id: e })) return;
		let n = Ae(e);
		n && (n.visualType = t), E("annotation:update", {
			id: e,
			type: "device"
		});
	}
	function we(e, t = "operator") {
		if (!T("annotation:update", { id: e })) return;
		let n = Ae(e);
		n && (n.operatorState = {
			...n.operatorState,
			acknowledged: !0,
			acknowledgedBy: t,
			acknowledgedAt: (/* @__PURE__ */ new Date()).toISOString()
		}), Be("device.ack", `Acknowledged: ${r.value.get(e)?.hostname ?? e}`), E("annotation:update", {
			id: e,
			type: "device"
		});
	}
	function Te(e) {
		if (!T("annotation:update", { id: e })) return;
		let t = Ae(e);
		t && t.operatorState && (t.operatorState = {
			...t.operatorState,
			acknowledged: !1,
			acknowledgedBy: void 0,
			acknowledgedAt: void 0
		}), E("annotation:update", {
			id: e,
			type: "device"
		});
	}
	function Ee(e, t) {
		if (!T("annotation:update", { id: e })) return;
		let n = Ae(e);
		n && (n.operatorState = {
			...n.operatorState,
			assignedTo: t || void 0,
			assignedAt: t ? (/* @__PURE__ */ new Date()).toISOString() : void 0
		}), Be("device.assign", t ? `Assigned ${r.value.get(e)?.hostname ?? e} to ${t}` : `Unassigned ${r.value.get(e)?.hostname ?? e}`), E("annotation:update", {
			id: e,
			type: "device"
		});
	}
	function De(e) {
		T("topology:createLink", { id: e.id }) && (s.value.set(e.id, e), u(), E("topology:createLink", {
			id: e.id,
			type: "link"
		}));
	}
	function Oe(e, t) {
		if (!T("topology:updateLink", { id: e })) return;
		let n = s.value.get(e);
		n && Object.assign(n, t), u(), E("topology:updateLink", {
			id: e,
			type: "link"
		});
	}
	function ke(e) {
		T("topology:deleteLink", { id: e }) && (s.value.delete(e), u(), E("topology:deleteLink", {
			id: e,
			type: "link"
		}));
	}
	function Ae(e) {
		return [...o.value.values()].find((t) => t.rawDeviceId === e);
	}
	function je(e) {
		let t = r.value.get(e);
		return t ? Qe(t) : void 0;
	}
	function Me(e) {
		T("virtualNode:create", { id: e.id }) && (f.value.set(e.id, e), E("virtualNode:create", {
			id: e.id,
			type: "virtualNode"
		}));
	}
	function Ne(e) {
		T("virtualNode:delete", { id: e }) && (f.value.delete(e), E("virtualNode:delete", {
			id: e,
			type: "virtualNode"
		}));
	}
	function Pe(e, t) {
		if (!T("virtualNode:update", { id: e })) return;
		let n = f.value.get(e);
		n && Object.assign(n, t), E("virtualNode:update", {
			id: e,
			type: "virtualNode"
		});
	}
	function Fe(e) {
		T("background:create", {
			id: e.id,
			spaceId: e.spaceId
		}) && (p.value.set(e.id, e), E("background:create", {
			id: e.id,
			type: "background"
		}));
	}
	function Ie(e) {
		T("background:delete", { id: e }) && (p.value.delete(e), E("background:delete", {
			id: e,
			type: "background"
		}));
	}
	function Le(e, t) {
		if (!T("background:update", { id: e })) return;
		let n = p.value.get(e);
		n && Object.assign(n, t), E("background:update", {
			id: e,
			type: "background"
		});
	}
	function Re(e) {
		m.value.unshift(e), m.value.length > 20 && m.value.pop();
	}
	function ze(e) {
		let t = m.value.findIndex((t) => t.id === e);
		t >= 0 && m.value.splice(t, 1);
	}
	function Be(e, t) {
		h.value.unshift({
			id: Math.random().toString(36).slice(2),
			type: e,
			msg: t,
			ts: (/* @__PURE__ */ new Date()).toLocaleTimeString()
		}), h.value.length > 100 && h.value.pop();
	}
	function Ve() {
		return JSON.stringify(h.value, null, 2);
	}
	function He(e) {
		if (!T("import")) return {
			devices: 0,
			spaces: 0,
			links: 0
		};
		let t = /* @__PURE__ */ new Map();
		e.forEach((e) => {
			let n = e.floor || e.site || "Floor", r = e.zone || "Default", i = e.rack || "Rack";
			t.has(n) || t.set(n, {
				building: e.building,
				zones: /* @__PURE__ */ new Map()
			});
			let a = t.get(n);
			!a.building && e.building && (a.building = e.building), a.zones.has(r) || a.zones.set(r, /* @__PURE__ */ new Map());
			let o = a.zones.get(r);
			o.has(i) || o.set(i, []), o.get(i).push(e);
		});
		let n = 2.2, i = [], c = [], l = [], u = [], d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
		function p(e) {
			let t = Ke(e), n = f.get(t);
			if (!n) {
				n = `building-${t}`;
				let r = {
					id: n,
					name: e,
					kind: "physical",
					type: "building",
					source: "import"
				};
				a.value.set(n, r), i.push(r), f.set(t, n);
			}
			return n;
		}
		return [...t.entries()].forEach(([e, { building: t, zones: s }], u) => {
			let f = `floor-${Ke(e)}-${u}`, m = [...s.entries()].map(([e, t]) => {
				let r = [...t.entries()].map(([e, t]) => {
					let r = t.length, i = Math.ceil(r / 2);
					return {
						rackName: e,
						devs: t,
						w: 5.2,
						d: i * n + 1.2,
						rows: i
					};
				});
				return {
					zoneName: e,
					racks: r,
					zoneW: r.reduce((e, t) => e + t.w, 0) + Math.max(0, r.length - 1) * 2 + 4,
					zoneD: Math.max(...r.map((e) => e.d), 1) + 4
				};
			}), h = m.reduce((e, t) => e + t.zoneW, 0) + Math.max(0, m.length - 1) * 6 + 8, g = Math.max(...m.map((e) => e.zoneD), 1) + 8, _ = {
				id: f,
				name: e,
				kind: "physical",
				type: "floor",
				parentId: t ? p(t) : void 0,
				source: "import",
				position: {
					x: 0,
					y: 0,
					z: 0
				},
				size: {
					width: h,
					height: .1,
					depth: g
				}
			};
			a.value.set(_.id, _), i.push(_);
			let v = 0 - h / 2 + 8 / 2;
			m.forEach(({ zoneName: t, racks: s, zoneW: u, zoneD: p }, m) => {
				let h = `${f}-zone-${Ke(t)}-${m}`, g = v + u / 2;
				v += u + 6;
				let _ = {
					id: h,
					name: t,
					kind: "physical",
					type: "zone",
					parentId: f,
					source: "import",
					position: {
						x: g,
						y: 0,
						z: 0
					},
					size: {
						width: u,
						height: .1,
						depth: p
					},
					color: qe(m)
				};
				a.value.set(_.id, _), i.push(_);
				let y = g - u / 2 + 4 / 2;
				s.forEach(({ rackName: t, devs: s, w: u, d: f, rows: p }, m) => {
					let g = `${h}-rack-${Ke(t)}-${m}`, _ = y + u / 2;
					y += u + 2;
					let v = {
						id: g,
						name: t,
						kind: "physical",
						type: "rack",
						parentId: h,
						source: "import",
						position: {
							x: _,
							y: 0,
							z: 0
						},
						size: {
							width: u,
							height: .3,
							depth: f
						}
					};
					a.value.set(v.id, v), i.push(v), s.forEach((t, i) => {
						let a = i % 2, s = Math.floor(i / 2), u = (a - .5) * 2, f = (s - (p - 1) / 2) * n, m = `imp-${Date.now()}-${c.length}-${i}`, h = {
							id: m,
							source: "import",
							externalId: m,
							hostname: t.hostname,
							ip: t.ip,
							normalizedType: t.type ?? "unknown",
							vendor: t.vendor,
							status: t.status ?? "unknown",
							syncState: "active",
							metrics: {
								cpu: 0,
								memory: 0,
								disk: 0,
								networkIn: 0,
								networkOut: 0
							},
							firstSeenAt: (/* @__PURE__ */ new Date()).toISOString(),
							lastSeenAt: (/* @__PURE__ */ new Date()).toISOString()
						};
						r.value.set(m, h), c.push(h), d.set(t.hostname, m);
						let v = {
							id: `map-${m}`,
							rawDeviceId: m,
							primarySpaceId: g,
							slotIndex: i,
							mappingStatus: "mapped",
							position: {
								x: _ + u,
								y: .4,
								z: 0 + f
							},
							tags: [t.type, e],
							importance: h.status === "critical" ? "critical" : "normal",
							updatedAt: (/* @__PURE__ */ new Date()).toISOString()
						};
						o.value.set(v.id, v), l.push(v);
					});
				});
			});
		}), e.forEach((e) => {
			if (!e.uplink) return;
			let t = d.get(e.hostname), n = d.get(e.uplink);
			if (!t || !n) return;
			let r = `lnk-${t}-${n}`, i = {
				id: r,
				sourceDeviceId: t,
				targetDeviceId: n,
				type: "physical",
				status: "up",
				source: "import",
				confidence: "high"
			};
			s.value.set(r, i), u.push(i);
		}), Be("import", `Imported ${c.length} devices, ${i.length} spaces, ${u.length} links`), {
			devices: c.length,
			spaces: i.length,
			links: u.length
		};
	}
	function Ue(e) {
		return typeof e.bandwidth == "number" && e.bandwidth > 0 ? Math.min(3, Math.max(.3, Math.log10(e.bandwidth + 10) / 2)) : e.confidence === "high" ? 1.5 : e.confidence === "low" ? .5 : 1;
	}
	function We(e = {}) {
		if (!T("layout:update")) return Promise.resolve({ cancelled: !0 });
		let t = /* @__PURE__ */ new Map();
		o.value.forEach((e) => t.set(e.rawDeviceId, e));
		let n = (e.deviceIds ?? [...t.keys()]).filter((e) => r.value.has(e)), i = new Set(n), a = n.map((n) => {
			let r = t.get(n), i = !!r?.position, a = i && !e.includeMapped, o = i ? {
				x: r.position.x,
				z: r.position.z
			} : {
				x: (Math.random() - .5) * 40,
				z: (Math.random() - .5) * 40
			};
			return {
				id: n,
				x: o.x,
				z: o.z,
				pinned: a,
				clusterId: r?.primarySpaceId
			};
		}), c = [];
		s.value.forEach((e) => {
			!i.has(e.sourceDeviceId) || !i.has(e.targetDeviceId) || c.push({
				sourceId: e.sourceDeviceId,
				targetId: e.targetDeviceId,
				weight: Ue(e)
			});
		}), _?.run.cancel();
		let l = e.iterations ?? 200;
		g.value = {
			iteration: 0,
			iterations: l
		};
		let u = new Zt().run(a, c, { iterations: l }, (t) => {
			g.value = {
				iteration: t.iteration,
				iterations: t.iterations
			}, e.onProgress?.(t.iterations ? t.iteration / t.iterations : 1);
		}), d = {
			run: u,
			cancelledByUser: !1
		};
		return _ = d, u.promise.then((e) => {
			if (_ !== d) return { cancelled: !0 };
			_ = null, g.value = null;
			let n = [];
			return a.forEach((r) => {
				if (r.pinned) return;
				let i = e.get(r.id);
				if (!i) return;
				let a = t.get(r.id), o = a?.primarySpaceId ?? "", s = x("device:map", {
					id: r.id,
					spaceId: o
				});
				be(r.id, o, a?.slotIndex ?? 0, {
					x: i.x,
					y: a?.position?.y ?? 0,
					z: i.z
				}), s && n.push(r.id);
			}), n.length && (Be("layout.update", `Auto layout placed ${n.length} device(s)`), v.value = n), { cancelled: d.cancelledByUser };
		});
	}
	function Ge() {
		_ && (_.cancelledByUser = !0), _?.run.cancel();
	}
	function Ke(e) {
		return e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "x";
	}
	function qe(e) {
		let t = [
			"#1e3a5f",
			"#1a3a2a",
			"#3a1a2a",
			"#2a2a1a",
			"#1a2a3a",
			"#3a2a1a"
		];
		return t[e % t.length];
	}
	function Je() {
		return {
			version: "2.0",
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			spaces: [...a.value.values()],
			deviceMappings: [...o.value.values()],
			manualLinks: [...s.value.values()].filter((e) => e.source === "manual"),
			backgroundObjects: [...p.value.values()]
		};
	}
	function Ye(e) {
		if (!T("import")) return;
		let t = Xe(e);
		t.spaces.forEach((e) => a.value.set(e.id, e)), t.deviceMappings.forEach((e) => o.value.set(e.id, e)), t.manualLinks.forEach((e) => s.value.set(e.id, e)), (t.backgroundObjects ?? []).forEach((e) => p.value.set(e.id, e)), d.value = d.value.filter((e) => !t.deviceMappings.find((t) => t.rawDeviceId === e.id && t.mappingStatus === "mapped"));
	}
	function Xe(e) {
		return Ze(e);
	}
	function Ze(e) {
		if (Array.isArray(e)) return e.map(Ze);
		if (!e || typeof e != "object") return e;
		let t = {};
		return Object.entries(e).forEach(([e, n]) => {
			e === "__proto__" || e === "constructor" || e === "prototype" || (t[e] = Ze(n));
		}), t;
	}
	function Qe(e) {
		return new Proxy(e, {
			set() {
				throw TypeError("RawDevice is read-only. Use explicit editor commands for changes.");
			},
			deleteProperty() {
				throw TypeError("RawDevice is read-only. Use explicit editor commands for changes.");
			}
		});
	}
	return {
		devices: r,
		spaces: a,
		mappings: o,
		links: s,
		interfaces: c,
		unmappedDevices: d,
		linksRevision: l,
		mappedDeviceIds: D,
		criticalCount: O,
		warningCount: k,
		devicesBySpace: A,
		interfacesByDevice: j,
		rackSpaces: M,
		allSpacesList: N,
		rootSpaces: P,
		childSpaces: F,
		descendantSpaceIds: I,
		scopedSpaces: L,
		scopedDeviceIds: R,
		scopedDevices: z,
		scopedLinks: H,
		scopedBounds: ne,
		scopedBackgroundObjects: U,
		scopedCriticalCount: B,
		scopedWarningCount: V,
		resolveLeafScope: te,
		configureSecurity: y,
		setEditorMode: b,
		can: x,
		hasFeature: C,
		loadMockData: re,
		replaceData: W,
		updateDeviceStatus: ie,
		updateLinkStatus: ae,
		upsertDevices: oe,
		addManualDevice: ge,
		removeDevices: se,
		importTopology: He,
		addSpace: _e,
		updateSpace: ve,
		archiveSpace: ye,
		upsertSpaces: ue,
		removeSpaces: de,
		mapDevice: be,
		unmapDevice: xe,
		updateAnnotation: Se,
		setVisualType: Ce,
		autoLayout: We,
		cancelAutoLayout: Ge,
		autoLayoutProgress: g,
		lastAutoLayoutDeviceIds: v,
		acknowledgeDevice: we,
		unacknowledgeDevice: Te,
		assignDevice: Ee,
		setOperatorState: he,
		addLink: De,
		updateLink: Oe,
		removeLink: ke,
		upsertLinks: ce,
		removeLinks: le,
		upsertInterfaces: fe,
		getMappingByDeviceId: Ae,
		getDevice: je,
		virtualNodes: f,
		savedViews: m,
		changeLog: h,
		addVirtualNode: Me,
		removeVirtualNode: Ne,
		updateVirtualNode: Pe,
		upsertVirtualNodes: pe,
		removeVirtualNodes: me,
		backgroundObjects: p,
		addBackgroundObject: Fe,
		removeBackgroundObject: Ie,
		updateBackgroundObject: Le,
		addSavedView: Re,
		removeSavedView: ze,
		logChange: Be,
		exportChangeLog: Ve,
		exportSnapshot: Je,
		importSnapshot: Ye
	};
}), J = L("ui", () => {
	let e = S("view"), t = S(null), n = S(null), r = S(/* @__PURE__ */ new Set()), a = S(!1), o = S(null), s = S(new Set([
		"physical",
		"logical",
		"service_dependency",
		"traffic_flow",
		"security_path",
		"manual",
		"inferred"
	])), c = S({ ...It }), l = S(!1), u = S({
		visible: !1,
		x: 0,
		y: 0,
		sourceDeviceId: "",
		targetDeviceId: ""
	}), d = S(!0), f = S(!1), p = S(null), m = S(!1), h = S(!1), g = S(!1), _ = S(!1), v = S(!1), y = S(!0), b = S(!0), x = S(!0), C = S(!0), w = S(!1), T = S(!1), E = S(!0), D = S(!1), O = S(!1), k = S(!1), A = S(null), j = S("3d"), M = S(N());
	function N() {
		let e = parseFloat(localStorage.getItem("topospace.fontScale") ?? "");
		return Number.isFinite(e) && e >= .8 && e <= 1.6 ? e : 1.1;
	}
	function P(e) {
		M.value = Math.max(.8, Math.min(1.6, Math.round(e * 100) / 100)), localStorage.setItem("topospace.fontScale", String(M.value));
	}
	let F = S(localStorage.getItem("topospace.colorblindMode") === "1");
	function I(e) {
		F.value = e, localStorage.setItem("topospace.colorblindMode", e ? "1" : "0");
	}
	let L = S(-1), R = S(!1), z = S("disconnected"), B = S(null), V = S([]), H = S([]);
	function U(e, t = "info") {
		let n = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
		H.value.push({
			id: n,
			message: e,
			type: t,
			timestamp: Date.now()
		}), H.value.length > 6 && H.value.shift(), setTimeout(() => ee(n), 5e3);
	}
	function ee(e) {
		let t = H.value.findIndex((t) => t.id === e);
		t >= 0 && H.value.splice(t, 1);
	}
	function te(e, t) {
		z.value = e, t?.message && U(t.message, e === "disconnected" ? "warning" : "info");
	}
	let ne = S({
		visible: !1,
		x: 0,
		y: 0,
		deviceId: ""
	}), re = i(() => t.value?.type === "device" ? t.value.id : null), W = i(() => t.value?.type === "space" ? t.value.id : null), ie = i(() => t.value?.type === "link" ? t.value.id : null), ae = i(() => t.value?.type === "background" ? t.value.id : null);
	function oe(t) {
		e.value = t, q().setEditorMode(t), t === "view" && (a.value = !1, o.value = null, k.value = !1);
	}
	function se() {
		if (e.value !== "edit") {
			k.value = !1;
			return;
		}
		k.value = !k.value;
	}
	function ce(e) {
		A.value = e, j.value = "3d";
	}
	function le() {
		j.value = "2d";
	}
	function ue(e) {
		t.value = e, h.value = e?.type === "link";
	}
	function de() {
		if (e.value !== "edit") {
			a.value = !1, o.value = null;
			return;
		}
		a.value = !a.value, a.value || (o.value = null);
	}
	function fe() {
		E.value = !1, D.value = !1, O.value = !1, f.value = !1, m.value = !1, d.value = !1, p.value = null;
	}
	function pe(e) {
		o.value = e;
	}
	function me() {
		o.value = null;
	}
	function he(e, t, n, r) {
		u.value = {
			visible: !0,
			x: e,
			y: t,
			sourceDeviceId: n,
			targetDeviceId: r
		};
	}
	function ge() {
		u.value.visible = !1, o.value = null;
	}
	function _e(e) {
		s.value.has(e) ? s.value.delete(e) : s.value.add(e);
	}
	function ve(e) {
		Object.assign(c.value, e);
	}
	function ye() {
		c.value = { ...It }, l.value = !1;
	}
	let be = S(null), xe = S(!0), Se = S(null);
	function Ce(e, t, n = "Delete") {
		Se.value = {
			message: e,
			confirmLabel: n,
			onConfirm: t
		};
	}
	function we(e) {
		let t = Se.value;
		Se.value = null, e && t?.onConfirm();
	}
	function Te(e, t, n) {
		ne.value = {
			visible: !0,
			x: e,
			y: t,
			deviceId: n
		};
	}
	function Ee() {
		ne.value.visible = !1;
	}
	return {
		mode: e,
		selection: t,
		hoveredId: n,
		multiSelectedDeviceIds: r,
		linkToolActive: a,
		linkSourceDeviceId: o,
		visibleLinkTypes: s,
		filter: c,
		alertsOnly: l,
		searchMatchCount: be,
		showModeHint: xe,
		confirmDialog: Se,
		requestConfirm: Ce,
		resolveConfirm: we,
		contextMenu: u,
		showUnmapped: d,
		showSpaceTree: m,
		showLinkProp: h,
		showRackServerList: f,
		selectedRackForList: p,
		showSavedViews: g,
		showChangeLog: _,
		showTimeline: v,
		showMinimap: y,
		showParticles: b,
		showBlastRadius: x,
		showVirtualNodes: C,
		showHelp: w,
		showImport: T,
		showAlertPanel: E,
		showCustomTypes: D,
		showBackgroundPanel: O,
		backgroundEditActive: k,
		toggleBackgroundEdit: se,
		fontScale: M,
		setFontScale: P,
		colorblindMode: F,
		setColorblindMode: I,
		timelineFrameIdx: L,
		timelineRecording: R,
		connectionStatus: z,
		setConnectionStatus: te,
		blastSourceId: B,
		offscreenAlerts: V,
		tooltip: ne,
		activeRootSpaceId: A,
		viewMode: j,
		enterScope: ce,
		showOverview: le,
		selectedDeviceId: re,
		selectedSpaceId: W,
		selectedLinkId: ie,
		selectedBackgroundId: ae,
		setMode: oe,
		select: ue,
		toggleLinkTool: de,
		closeLeftDock: fe,
		startLinkFrom: pe,
		cancelLinkDraft: me,
		showContextMenu: he,
		hideContextMenu: ge,
		toggleLinkType: _e,
		setFilter: ve,
		resetFilter: ye,
		showTooltipAt: Te,
		hideTooltip: Ee,
		toasts: H,
		addToast: U,
		removeToast: ee
	};
});
//#endregion
//#region src/composables/useWebSocketSim.ts
function Qt() {
	let e = q(), t = J(), n = S(!1), r = S([]), i = [];
	function a(e) {
		r.value.unshift({
			time: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
			msg: e
		}), r.value.length > 50 && r.value.pop();
	}
	function o() {
		if (n.value) return;
		n.value = !0, t.addToast("Live updates connected", "success"), a("WebSocket connected");
		let r = [
			"normal",
			"normal",
			"normal",
			"warning",
			"critical",
			"offline",
			"maintenance"
		];
		i.push(setInterval(() => {
			let n = [...e.devices.keys()];
			if (!n.length) return;
			let i = n[Math.floor(Math.random() * n.length)], o = e.devices.get(i);
			if (!o) return;
			let s = r[Math.floor(Math.random() * r.length)];
			if (s === o.status) return;
			let c = o.status;
			e.updateDeviceStatus(i, s), s === "critical" ? (t.addToast(`${o.hostname} is CRITICAL`, "critical"), a(`CRITICAL: ${o.hostname}`)) : s === "warning" && c !== "critical" ? t.addToast(`${o.hostname} is WARNING`, "warning") : s === "offline" ? t.addToast(`${o.hostname} is OFFLINE`, "warning") : s === "normal" && (c === "critical" || c === "warning") && t.addToast(`${o.hostname} recovered`, "success");
		}, 3e3)), i.push(setInterval(() => {
			let t = [...e.devices.keys()];
			t.slice(0, Math.min(5, t.length)).forEach((t) => {
				let n = e.devices.get(t);
				n?.metrics && e.updateDeviceStatus(t, n.status ?? "normal", {
					cpu: Math.min(100, Math.max(0, (n.metrics.cpu ?? 50) + (Math.random() - .5) * 15)),
					memory: Math.min(100, Math.max(0, (n.metrics.memory ?? 50) + (Math.random() - .5) * 8)),
					networkIn: Math.max(0, (n.metrics.networkIn ?? 100) + (Math.random() - .5) * 200),
					networkOut: Math.max(0, (n.metrics.networkOut ?? 50) + (Math.random() - .5) * 100)
				});
			});
		}, 1500)), i.push(setInterval(() => {
			let n = [...e.links.keys()];
			if (!n.length) return;
			let r = n[Math.floor(Math.random() * n.length)], i = e.links.get(r);
			if (!i) return;
			let o = Math.random() > .15 ? "up" : "down";
			o !== i.status && (e.updateLinkStatus(r, o), o === "down" ? (t.addToast(`Link DOWN (${i.type})`, "critical"), a(`Link DOWN: ${i.type}`)) : t.addToast(`Link UP (${i.type})`, "success"));
		}, 12e3)), i.push(setInterval(() => {
			if (e.unmappedDevices.length > 8) return;
			let n = [
				"server",
				"switch",
				"vm"
			], r = n[Math.floor(Math.random() * n.length)], i = `ws-dev-${Date.now()}`, o = `discovered-${r}-${i.slice(-4)}`;
			e.upsertDevices([{
				id: i,
				source: "zabbix",
				externalId: i,
				hostname: o,
				ip: `10.99.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`,
				normalizedType: r,
				status: "unknown",
				syncState: "active",
				lastSeenAt: (/* @__PURE__ */ new Date()).toISOString()
			}]), t.addToast(`New device discovered: ${o}`, "info"), a(`NEW: ${o}`);
		}, 25e3));
	}
	function s() {
		n.value && (n.value = !1, i.forEach((e) => clearInterval(e)), i = [], t.addToast("Live updates disconnected", "info"), a("WebSocket disconnected"));
	}
	return {
		connected: n,
		eventLog: r,
		connect: o,
		disconnect: s
	};
}
//#endregion
//#region node_modules/three/examples/jsm/controls/OrbitControls.js
var $t = { type: "change" }, en = { type: "start" }, tn = { type: "end" }, nn = new rt(), rn = new Ye(), an = Math.cos(70 * Fe.DEG2RAD), on = new K(), sn = 2 * Math.PI, Y = {
	NONE: -1,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2,
	TOUCH_ROTATE: 3,
	TOUCH_PAN: 4,
	TOUCH_DOLLY_PAN: 5,
	TOUCH_DOLLY_ROTATE: 6
}, cn = 1e-6, ln = class extends ae {
	constructor(e, t = null) {
		super(e, t), this.state = Y.NONE, this.target = new K(), this.cursor = new K(), this.minDistance = 0, this.maxDistance = Infinity, this.minZoom = 0, this.maxZoom = Infinity, this.minTargetRadius = 0, this.maxTargetRadius = Infinity, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -Infinity, this.maxAzimuthAngle = Infinity, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
			LEFT: "ArrowLeft",
			UP: "ArrowUp",
			RIGHT: "ArrowRight",
			BOTTOM: "ArrowDown"
		}, this.mouseButtons = {
			LEFT: Ne.ROTATE,
			MIDDLE: Ne.DOLLY,
			RIGHT: Ne.PAN
		}, this.touches = {
			ONE: pt.ROTATE,
			TWO: pt.DOLLY_PAN
		}, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._cursorStyle = "auto", this._domElementKeyEvents = null, this._lastPosition = new K(), this._lastQuaternion = new et(), this._lastTargetPosition = new K(), this._quat = new et().setFromUnitVectors(e.up, new K(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new dt(), this._sphericalDelta = new dt(), this._scale = 1, this._panOffset = new K(), this._rotateStart = new G(), this._rotateEnd = new G(), this._rotateDelta = new G(), this._panStart = new G(), this._panEnd = new G(), this._panDelta = new G(), this._dollyStart = new G(), this._dollyEnd = new G(), this._dollyDelta = new G(), this._dollyDirection = new K(), this._mouse = new G(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = dn.bind(this), this._onPointerDown = un.bind(this), this._onPointerUp = fn.bind(this), this._onContextMenu = yn.bind(this), this._onMouseWheel = hn.bind(this), this._onKeyDown = gn.bind(this), this._onTouchStart = _n.bind(this), this._onTouchMove = vn.bind(this), this._onMouseDown = pn.bind(this), this._onMouseMove = mn.bind(this), this._interceptControlDown = bn.bind(this), this._interceptControlUp = xn.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
	}
	set cursorStyle(e) {
		this._cursorStyle = e, e === "grab" ? this.domElement.style.cursor = "grab" : this.domElement.style.cursor = "auto";
	}
	get cursorStyle() {
		return this._cursorStyle;
	}
	connect(e) {
		super.connect(e), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, {
			passive: !0,
			capture: !0
		}), this.domElement.style.touchAction = "none";
	}
	disconnect() {
		this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "";
	}
	dispose() {
		this.disconnect();
	}
	getPolarAngle() {
		return this._spherical.phi;
	}
	getAzimuthalAngle() {
		return this._spherical.theta;
	}
	getDistance() {
		return this.object.position.distanceTo(this.target);
	}
	listenToKeyEvents(e) {
		e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
	}
	stopListenToKeyEvents() {
		this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
	}
	saveState() {
		this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
	}
	reset() {
		this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent($t), this.update(), this.state = Y.NONE;
	}
	pan(e, t) {
		this._pan(e, t), this.update();
	}
	dollyIn(e) {
		this._dollyIn(e), this.update();
	}
	dollyOut(e) {
		this._dollyOut(e), this.update();
	}
	rotateLeft(e) {
		this._rotateLeft(e), this.update();
	}
	rotateUp(e) {
		this._rotateUp(e), this.update();
	}
	update(e = null) {
		let t = this.object.position;
		on.copy(t).sub(this.target), on.applyQuaternion(this._quat), this._spherical.setFromVector3(on), this.autoRotate && this.state === Y.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
		let n = this.minAzimuthAngle, r = this.maxAzimuthAngle;
		isFinite(n) && isFinite(r) && (n < -Math.PI ? n += sn : n > Math.PI && (n -= sn), r < -Math.PI ? r += sn : r > Math.PI && (r -= sn), n <= r ? this._spherical.theta = Math.max(n, Math.min(r, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + r) / 2 ? Math.max(n, this._spherical.theta) : Math.min(r, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
		let i = !1;
		if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
		else {
			let e = this._spherical.radius;
			this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), i = e != this._spherical.radius;
		}
		if (on.setFromSpherical(this._spherical), on.applyQuaternion(this._quatInverse), t.copy(this.target).add(on), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
			let e = null;
			if (this.object.isPerspectiveCamera) {
				let t = on.length();
				e = this._clampDistance(t * this._scale);
				let n = t - e;
				this.object.position.addScaledVector(this._dollyDirection, n), this.object.updateMatrixWorld(), i = !!n;
			} else if (this.object.isOrthographicCamera) {
				let t = new K(this._mouse.x, this._mouse.y, 0);
				t.unproject(this.object);
				let n = this.object.zoom;
				this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), i = n !== this.object.zoom;
				let r = new K(this._mouse.x, this._mouse.y, 0);
				r.unproject(this.object), this.object.position.sub(r).add(t), this.object.updateMatrixWorld(), e = on.length();
			} else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
			e !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position) : (nn.origin.copy(this.object.position), nn.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(nn.direction)) < an ? this.object.lookAt(this.target) : (rn.setFromNormalAndCoplanarPoint(this.object.up, this.target), nn.intersectPlane(rn, this.target))));
		} else if (this.object.isOrthographicCamera) {
			let e = this.object.zoom;
			this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), e !== this.object.zoom && (this.object.updateProjectionMatrix(), i = !0);
		}
		return this._scale = 1, this._performCursorZoom = !1, i || this._lastPosition.distanceToSquared(this.object.position) > cn || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > cn || this._lastTargetPosition.distanceToSquared(this.target) > cn ? (this.dispatchEvent($t), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
	}
	_getAutoRotationAngle(e) {
		return e === null ? sn / 60 / 60 * this.autoRotateSpeed : sn / 60 * this.autoRotateSpeed * e;
	}
	_getZoomScale(e) {
		let t = Math.abs(e * .01);
		return .95 ** (this.zoomSpeed * t);
	}
	_rotateLeft(e) {
		this._sphericalDelta.theta -= e;
	}
	_rotateUp(e) {
		this._sphericalDelta.phi -= e;
	}
	_panLeft(e, t) {
		on.setFromMatrixColumn(t, 0), on.multiplyScalar(-e), this._panOffset.add(on);
	}
	_panUp(e, t) {
		this.screenSpacePanning === !0 ? on.setFromMatrixColumn(t, 1) : (on.setFromMatrixColumn(t, 0), on.crossVectors(this.object.up, on)), on.multiplyScalar(e), this._panOffset.add(on);
	}
	_pan(e, t) {
		let n = this.domElement;
		if (this.object.isPerspectiveCamera) {
			let r = this.object.position;
			on.copy(r).sub(this.target);
			let i = on.length();
			i *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * i / n.clientHeight, this.object.matrix), this._panUp(2 * t * i / n.clientHeight, this.object.matrix);
		} else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
	}
	_dollyOut(e) {
		this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
	}
	_dollyIn(e) {
		this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
	}
	_updateZoomParameters(e, t) {
		if (!this.zoomToCursor) return;
		this._performCursorZoom = !0;
		let n = this.domElement.getBoundingClientRect(), r = e - n.left, i = t - n.top, a = n.width, o = n.height;
		this._mouse.x = r / a * 2 - 1, this._mouse.y = -(i / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
	}
	_clampDistance(e) {
		return Math.max(this.minDistance, Math.min(this.maxDistance, e));
	}
	_handleMouseDownRotate(e) {
		this._rotateStart.set(e.clientX, e.clientY);
	}
	_handleMouseDownDolly(e) {
		this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
	}
	_handleMouseDownPan(e) {
		this._panStart.set(e.clientX, e.clientY);
	}
	_handleMouseMoveRotate(e) {
		this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
		let t = this.domElement;
		this._rotateLeft(sn * this._rotateDelta.x / t.clientHeight), this._rotateUp(sn * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
	}
	_handleMouseMoveDolly(e) {
		this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
	}
	_handleMouseMovePan(e) {
		this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
	}
	_handleMouseWheel(e) {
		this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
	}
	_handleKeyDown(e) {
		let t = !1;
		switch (e.code) {
			case this.keys.UP:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(sn * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
				break;
			case this.keys.BOTTOM:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-sn * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
				break;
			case this.keys.LEFT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(sn * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
				break;
			case this.keys.RIGHT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-sn * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
				break;
		}
		t && (e.preventDefault(), this.update());
	}
	_handleTouchStartRotate(e) {
		if (this._pointers.length === 1) this._rotateStart.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._rotateStart.set(n, r);
		}
	}
	_handleTouchStartPan(e) {
		if (this._pointers.length === 1) this._panStart.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._panStart.set(n, r);
		}
	}
	_handleTouchStartDolly(e) {
		let t = this._getSecondPointerPosition(e), n = e.pageX - t.x, r = e.pageY - t.y, i = Math.sqrt(n * n + r * r);
		this._dollyStart.set(0, i);
	}
	_handleTouchStartDollyPan(e) {
		this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
	}
	_handleTouchStartDollyRotate(e) {
		this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
	}
	_handleTouchMoveRotate(e) {
		if (this._pointers.length == 1) this._rotateEnd.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._rotateEnd.set(n, r);
		}
		this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
		let t = this.domElement;
		this._rotateLeft(sn * this._rotateDelta.x / t.clientHeight), this._rotateUp(sn * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
	}
	_handleTouchMovePan(e) {
		if (this._pointers.length === 1) this._panEnd.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._panEnd.set(n, r);
		}
		this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
	}
	_handleTouchMoveDolly(e) {
		let t = this._getSecondPointerPosition(e), n = e.pageX - t.x, r = e.pageY - t.y, i = Math.sqrt(n * n + r * r);
		this._dollyEnd.set(0, i), this._dollyDelta.set(0, (this._dollyEnd.y / this._dollyStart.y) ** +this.zoomSpeed), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
		let a = (e.pageX + t.x) * .5, o = (e.pageY + t.y) * .5;
		this._updateZoomParameters(a, o);
	}
	_handleTouchMoveDollyPan(e) {
		this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
	}
	_handleTouchMoveDollyRotate(e) {
		this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
	}
	_addPointer(e) {
		this._pointers.push(e.pointerId);
	}
	_removePointer(e) {
		delete this._pointerPositions[e.pointerId];
		for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) {
			this._pointers.splice(t, 1);
			return;
		}
	}
	_isTrackingPointer(e) {
		for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) return !0;
		return !1;
	}
	_trackPointer(e) {
		let t = this._pointerPositions[e.pointerId];
		t === void 0 && (t = new G(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
	}
	_getSecondPointerPosition(e) {
		let t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
		return this._pointerPositions[t];
	}
	_customWheelEvent(e) {
		let t = e.deltaMode, n = {
			clientX: e.clientX,
			clientY: e.clientY,
			deltaY: e.deltaY
		};
		switch (t) {
			case 1:
				n.deltaY *= 16;
				break;
			case 2:
				n.deltaY *= 100;
				break;
		}
		return e.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
	}
};
function un(e) {
	this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e), this._cursorStyle === "grab" && (this.domElement.style.cursor = "grabbing")));
}
function dn(e) {
	this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function fn(e) {
	switch (this._removePointer(e), this._pointers.length) {
		case 0:
			this.domElement.releasePointerCapture(e.pointerId), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(tn), this.state = Y.NONE, this._cursorStyle === "grab" && (this.domElement.style.cursor = "grab");
			break;
		case 1:
			let t = this._pointers[0], n = this._pointerPositions[t];
			this._onTouchStart({
				pointerId: t,
				pageX: n.x,
				pageY: n.y
			});
			break;
	}
}
function pn(e) {
	let t;
	switch (e.button) {
		case 0:
			t = this.mouseButtons.LEFT;
			break;
		case 1:
			t = this.mouseButtons.MIDDLE;
			break;
		case 2:
			t = this.mouseButtons.RIGHT;
			break;
		default: t = -1;
	}
	switch (t) {
		case Ne.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseDownDolly(e), this.state = Y.DOLLY;
			break;
		case Ne.ROTATE:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = Y.PAN;
			} else {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = Y.ROTATE;
			}
			break;
		case Ne.PAN:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = Y.ROTATE;
			} else {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = Y.PAN;
			}
			break;
		default: this.state = Y.NONE;
	}
	this.state !== Y.NONE && this.dispatchEvent(en);
}
function mn(e) {
	switch (this.state) {
		case Y.ROTATE:
			if (this.enableRotate === !1) return;
			this._handleMouseMoveRotate(e);
			break;
		case Y.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseMoveDolly(e);
			break;
		case Y.PAN:
			if (this.enablePan === !1) return;
			this._handleMouseMovePan(e);
			break;
	}
}
function hn(e) {
	this.enabled === !1 || this.enableZoom === !1 || this.state !== Y.NONE || (e.preventDefault(), this.dispatchEvent(en), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(tn));
}
function gn(e) {
	this.enabled !== !1 && this._handleKeyDown(e);
}
function _n(e) {
	switch (this._trackPointer(e), this._pointers.length) {
		case 1:
			switch (this.touches.ONE) {
				case pt.ROTATE:
					if (this.enableRotate === !1) return;
					this._handleTouchStartRotate(e), this.state = Y.TOUCH_ROTATE;
					break;
				case pt.PAN:
					if (this.enablePan === !1) return;
					this._handleTouchStartPan(e), this.state = Y.TOUCH_PAN;
					break;
				default: this.state = Y.NONE;
			}
			break;
		case 2:
			switch (this.touches.TWO) {
				case pt.DOLLY_PAN:
					if (this.enableZoom === !1 && this.enablePan === !1) return;
					this._handleTouchStartDollyPan(e), this.state = Y.TOUCH_DOLLY_PAN;
					break;
				case pt.DOLLY_ROTATE:
					if (this.enableZoom === !1 && this.enableRotate === !1) return;
					this._handleTouchStartDollyRotate(e), this.state = Y.TOUCH_DOLLY_ROTATE;
					break;
				default: this.state = Y.NONE;
			}
			break;
		default: this.state = Y.NONE;
	}
	this.state !== Y.NONE && this.dispatchEvent(en);
}
function vn(e) {
	switch (this._trackPointer(e), this.state) {
		case Y.TOUCH_ROTATE:
			if (this.enableRotate === !1) return;
			this._handleTouchMoveRotate(e), this.update();
			break;
		case Y.TOUCH_PAN:
			if (this.enablePan === !1) return;
			this._handleTouchMovePan(e), this.update();
			break;
		case Y.TOUCH_DOLLY_PAN:
			if (this.enableZoom === !1 && this.enablePan === !1) return;
			this._handleTouchMoveDollyPan(e), this.update();
			break;
		case Y.TOUCH_DOLLY_ROTATE:
			if (this.enableZoom === !1 && this.enableRotate === !1) return;
			this._handleTouchMoveDollyRotate(e), this.update();
			break;
		default: this.state = Y.NONE;
	}
}
function yn(e) {
	this.enabled !== !1 && e.preventDefault();
}
function bn(e) {
	e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
function xn(e) {
	e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
//#endregion
//#region node_modules/three/examples/jsm/renderers/CSS2DRenderer.js
var Sn = class extends Ke {
	constructor(e = document.createElement("div")) {
		super(), this.isCSS2DObject = !0, this.element = e, this.element.style.position = "absolute", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.center = new G(.5, .5), this.addEventListener("removed", function() {
			this.traverse(function(e) {
				e.element && e.element instanceof e.element.ownerDocument.defaultView.Element && e.element.parentNode !== null && e.element.remove();
			});
		});
	}
	copy(e, t) {
		return super.copy(e, t), this.element = e.element.cloneNode(!0), this.center = e.center, this;
	}
}, Cn = new K(), wn = new Ie(), Tn = new Ie(), En = new K(), Dn = new K(), On = class {
	constructor(e = {}) {
		let t = this, n, r, i, a, o = { objects: /* @__PURE__ */ new WeakMap() }, s = e.element === void 0 ? document.createElement("div") : e.element;
		s.style.overflow = "hidden", this.domElement = s, this.sortObjects = !0, this.getSize = function() {
			return {
				width: n,
				height: r
			};
		}, this.render = function(e, t) {
			e.matrixWorldAutoUpdate === !0 && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === !0 && t.updateMatrixWorld(), wn.copy(t.matrixWorldInverse), Tn.multiplyMatrices(t.projectionMatrix, wn), l(e, e, t), this.sortObjects && f(e);
		}, this.setSize = function(e, t) {
			n = e, r = t, i = n / 2, a = r / 2, s.style.width = e + "px", s.style.height = t + "px";
		};
		function c(e) {
			e.isCSS2DObject && (e.element.style.display = "none");
			for (let t = 0, n = e.children.length; t < n; t++) c(e.children[t]);
		}
		function l(e, n, r) {
			if (e.visible === !1) {
				c(e);
				return;
			}
			if (e.isCSS2DObject) {
				Cn.setFromMatrixPosition(e.matrixWorld), Cn.applyMatrix4(Tn);
				let c = Cn.z >= -1 && Cn.z <= 1 && e.layers.test(r.layers) === !0, l = e.element;
				l.style.display = c === !0 ? "" : "none", c === !0 && (e.onBeforeRender(t, n, r), l.style.transform = "translate(" + -100 * e.center.x + "%," + -100 * e.center.y + "%)translate(" + (Cn.x * i + i) + "px," + (-Cn.y * a + a) + "px)", l.parentNode !== s && s.appendChild(l), e.onAfterRender(t, n, r));
				let d = { distanceToCameraSquared: u(r, e) };
				o.objects.set(e, d);
			}
			for (let t = 0, i = e.children.length; t < i; t++) l(e.children[t], n, r);
		}
		function u(e, t) {
			return En.setFromMatrixPosition(e.matrixWorld), Dn.setFromMatrixPosition(t.matrixWorld), En.distanceToSquared(Dn);
		}
		function d(e) {
			let t = [];
			return e.traverseVisible(function(e) {
				e.isCSS2DObject && t.push(e);
			}), t;
		}
		function f(e) {
			let t = d(e).sort(function(e, t) {
				return e.renderOrder === t.renderOrder ? o.objects.get(e).distanceToCameraSquared - o.objects.get(t).distanceToCameraSquared : t.renderOrder - e.renderOrder;
			}), n = t.length;
			for (let e = 0, r = t.length; e < r; e++) t[e].element.style.zIndex = n - e;
		}
	}
}, kn = class {
	scene;
	camera;
	renderer;
	css2dRenderer;
	controls;
	_animId = 0;
	_wrapper;
	_canvas;
	_overlayEl;
	_onError;
	_resizeObserver;
	_resizeListeners = [];
	init(e, t, n, r = {}) {
		this._wrapper = n, this._canvas = e, this._overlayEl = t, this._onError = r.onError, this.renderer = new R.WebGLRenderer({
			canvas: e,
			antialias: !0,
			logarithmicDepthBuffer: !0
		}), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = R.PCFShadowMap, this.css2dRenderer = new On(), this.css2dRenderer.domElement.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;", t.appendChild(this.css2dRenderer.domElement), this.scene = new R.Scene(), this.scene.background = new R.Color(527384), this.scene.fog = new R.FogExp2(527384, .005), this.camera = new R.PerspectiveCamera(55, 1, .1, 1e3), this.camera.position.set(0, 60, 80), this.camera.lookAt(0, 0, 0), this.controls = new ln(this.camera, e), this.controls.enableDamping = !0, this.controls.dampingFactor = .06, this.controls.maxPolarAngle = Math.PI / 2.05, this.controls.minDistance = 3, this.controls.maxDistance = 220, this.controls.zoomToCursor = !0, this.controls.zoomSpeed = .8, this._setupLights(), this._setupGrid(), this.resize(), window.addEventListener("resize", this.resize), this._resizeObserver = new ResizeObserver(() => this.resize()), this._resizeObserver.observe(n), e.addEventListener("webglcontextlost", this.onWebglContextLost), e.addEventListener("webglcontextrestored", this.onWebglContextRestored);
	}
	_setupLights() {
		this.scene.add(new R.HemisphereLight(13230591, 2437449, 2));
		let e = new R.DirectionalLight(16777215, 2);
		e.position.set(20, 60, 30), e.castShadow = !0, e.shadow.mapSize.set(2048, 2048), e.shadow.normalBias = .025, e.shadow.camera.far = 250, e.shadow.camera.left = -120, e.shadow.camera.right = 120, e.shadow.camera.top = 120, e.shadow.camera.bottom = -120, this.scene.add(e);
		let t = new R.DirectionalLight(4482730, .7);
		t.position.set(-20, 20, -30), this.scene.add(t);
	}
	_setupGrid() {
		let e = new R.Mesh(new R.PlaneGeometry(300, 300), new R.MeshStandardMaterial({
			color: 725024,
			roughness: 1
		}));
		e.rotation.x = -Math.PI / 2, e.position.y = -.5, e.receiveShadow = !0, this.scene.add(e);
		let t = new R.GridHelper(300, 60, 1714762, 1714762);
		t.position.y = -.2, this.scene.add(t);
	}
	resize = () => {
		let e = this._wrapper?.clientWidth || window.innerWidth, t = this._wrapper?.clientHeight || window.innerHeight;
		this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t), this.css2dRenderer.setSize(e, t), this._resizeListeners.forEach((n) => n(e, t));
	};
	getSize() {
		return {
			width: this._wrapper?.clientWidth || window.innerWidth,
			height: this._wrapper?.clientHeight || window.innerHeight
		};
	}
	getLabelExclusions() {
		let e = this._wrapper.getBoundingClientRect(), t = this._wrapper.parentElement?.querySelectorAll(".camera-tools, .navigation-help, .status-legend, .mm-wrap, .vs-wrap, .hint") ?? [];
		return Array.from(t, (t) => {
			let n = t.getBoundingClientRect();
			return {
				x: n.left - e.left,
				y: n.top - e.top,
				width: n.width,
				height: n.height
			};
		});
	}
	onResize(e) {
		this._resizeListeners.push(e);
	}
	onWebglContextLost = (e) => {
		e.preventDefault(), cancelAnimationFrame(this._animId), this._onError?.(/* @__PURE__ */ Error("WebGL context lost"), { phase: "webglcontextlost" });
	};
	onWebglContextRestored = () => {
		this._onError?.(/* @__PURE__ */ Error("WebGL context restored; rebuild required"), { phase: "webglcontextrestored" });
	};
	startLoop(e) {
		let t = new R.Timer(), n = (r) => {
			this._animId = requestAnimationFrame(n), t.update(r);
			let i = t.getDelta(), a = t.getElapsed();
			this.controls.update(), e(i, a), this.renderer.render(this.scene, this.camera), this.css2dRenderer.render(this.scene, this.camera);
		};
		this._animId = requestAnimationFrame(n);
	}
	dispose() {
		cancelAnimationFrame(this._animId), window.removeEventListener("resize", this.resize), this._resizeObserver?.disconnect(), this._resizeObserver = void 0, this._canvas?.removeEventListener("webglcontextlost", this.onWebglContextLost), this._canvas?.removeEventListener("webglcontextrestored", this.onWebglContextRestored), this.controls?.dispose(), this.renderer?.dispose(), this.css2dRenderer?.domElement.remove();
	}
}, An = {
	normal: "#22c55e",
	warning: "#eab308",
	critical: "#ef4444",
	offline: "#94a3b8",
	unknown: "#a1a1aa",
	maintenance: "#3b82f6",
	acknowledged: "#f59e0b",
	stale: "#78716c"
}, jn = {
	normal: "#56b4e9",
	warning: "#f0e442",
	critical: "#e69f00",
	offline: "#94a3b8",
	unknown: "#8a8a8a",
	maintenance: "#cc79a7",
	acknowledged: "#009e73",
	stale: "#999999"
}, Mn = x({ ...An }), Nn = Object.fromEntries(Object.entries(Mn).map(([e, t]) => [e, new R.Color(t)]));
function Pn(e) {
	let t = e === "colorblind" ? jn : An;
	Object.keys(t).forEach((e) => {
		Mn[e] = t[e], Nn[e].set(t[e]);
	});
}
var Fn = {
	server: "#3b82f6",
	switch: "#10b981",
	router: "#f59e0b",
	firewall: "#ef4444",
	database: "#8b5cf6",
	storage: "#06b6d4",
	vm: "#64748b",
	container: "#475569",
	load_balancer: "#f97316",
	access_point: "#84cc16",
	cloud_service: "#a78bfa",
	unknown: "#6b7280"
}, In = {
	physical: {
		color: "#3b82f6",
		dashed: !1,
		opacity: .85
	},
	logical: {
		color: "#8b5cf6",
		dashed: !0,
		opacity: .65
	},
	service_dependency: {
		color: "#f59e0b",
		dashed: !0,
		opacity: .65
	},
	traffic_flow: {
		color: "#22c55e",
		dashed: !1,
		opacity: .75
	},
	security_path: {
		color: "#ef4444",
		dashed: !1,
		opacity: .85
	},
	manual: {
		color: "#94a3b8",
		dashed: !0,
		opacity: .55
	},
	inferred: {
		color: "#475569",
		dashed: !0,
		opacity: .4
	}
}, Ln = {
	server: "SRV",
	switch: "SW",
	router: "RTR",
	firewall: "FW",
	database: "DB",
	storage: "STG",
	vm: "VM",
	container: "CTR",
	load_balancer: "LB",
	access_point: "AP",
	cloud_service: "CLD",
	unknown: "UNK"
}, Rn = {
	server: "Server",
	switch: "Switch",
	router: "Router",
	firewall: "Firewall",
	database: "Database",
	storage: "Storage",
	vm: "VM",
	container: "Container",
	load_balancer: "Load Balancer",
	access_point: "Access Point",
	cloud_service: "Cloud",
	unknown: "Unknown"
}, zn = {
	normal: "Normal",
	warning: "Warning",
	critical: "Critical",
	offline: "Offline",
	unknown: "Unknown",
	maintenance: "Maintenance",
	acknowledged: "Acknowledged",
	stale: "Stale"
}, Bn = {
	normal: "",
	warning: "▲",
	critical: "✕",
	offline: "⏻",
	unknown: "?",
	maintenance: "↻",
	acknowledged: "✓",
	stale: "…"
}, Vn = /* @__PURE__ */ new Map(), Hn = /* @__PURE__ */ new Map(), Un = /* @__PURE__ */ new Map();
function Wn(e) {
	Vn.clear(), Hn.clear(), Un.clear(), e.forEach((e) => {
		Vn.set(e.id, e.color), Hn.set(e.id, e.abbr), Un.set(e.id, e.label);
	});
}
function Gn(e) {
	return Hn.get(e) ?? Ln[e] ?? e.slice(0, 4).toUpperCase();
}
function Kn(e) {
	return Un.get(e) ?? Rn[e] ?? e;
}
//#endregion
//#region node_modules/three/examples/jsm/geometries/RoundedBoxGeometry.js
var qn = new K();
function Jn(e, t, n, r, i, a) {
	let o = 2 * Math.PI * i / 4, s = Math.max(a - 2 * i, 0), c = Math.PI / 4;
	qn.copy(t), qn[r] = 0, qn.normalize();
	let l = .5 * o / (o + s), u = 1 - qn.angleTo(e) / c;
	return Math.sign(qn[n]) === 1 ? u * l : s / (o + s) + l + l * (1 - u);
}
var Yn = class e extends ee {
	constructor(e = 1, t = 1, n = 1, r = 2, i = .1) {
		let a = r * 2 + 1;
		if (i = Math.min(e / 2, t / 2, n / 2, i), super(1, 1, 1, a, a, a), this.type = "RoundedBoxGeometry", this.parameters = {
			width: e,
			height: t,
			depth: n,
			segments: r,
			radius: i
		}, a === 1) return;
		let o = this.toNonIndexed();
		this.index = null, this.attributes.position = o.attributes.position, this.attributes.normal = o.attributes.normal, this.attributes.uv = o.attributes.uv;
		let s = new K(), c = new K(), l = new K(e, t, n).divideScalar(2).subScalar(i), u = this.attributes.position.array, d = this.attributes.normal.array, f = this.attributes.uv.array, p = u.length / 6, m = new K(), h = .5 / a;
		for (let r = 0, a = 0; r < u.length; r += 3, a += 2) switch (s.fromArray(u, r), c.copy(s), c.x -= Math.sign(c.x) * h, c.y -= Math.sign(c.y) * h, c.z -= Math.sign(c.z) * h, c.normalize(), u[r + 0] = l.x * Math.sign(s.x) + c.x * i, u[r + 1] = l.y * Math.sign(s.y) + c.y * i, u[r + 2] = l.z * Math.sign(s.z) + c.z * i, d[r + 0] = c.x, d[r + 1] = c.y, d[r + 2] = c.z, Math.floor(r / p)) {
			case 0:
				m.set(1, 0, 0), f[a + 0] = Jn(m, c, "z", "y", i, n), f[a + 1] = 1 - Jn(m, c, "y", "z", i, t);
				break;
			case 1:
				m.set(-1, 0, 0), f[a + 0] = 1 - Jn(m, c, "z", "y", i, n), f[a + 1] = 1 - Jn(m, c, "y", "z", i, t);
				break;
			case 2:
				m.set(0, 1, 0), f[a + 0] = 1 - Jn(m, c, "x", "z", i, e), f[a + 1] = Jn(m, c, "z", "x", i, n);
				break;
			case 3:
				m.set(0, -1, 0), f[a + 0] = 1 - Jn(m, c, "x", "z", i, e), f[a + 1] = 1 - Jn(m, c, "z", "x", i, n);
				break;
			case 4:
				m.set(0, 0, 1), f[a + 0] = 1 - Jn(m, c, "x", "y", i, e), f[a + 1] = 1 - Jn(m, c, "y", "x", i, t);
				break;
			case 5:
				m.set(0, 0, -1), f[a + 0] = Jn(m, c, "x", "y", i, e), f[a + 1] = 1 - Jn(m, c, "y", "x", i, t);
				break;
		}
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.depth, t.segments, t.radius);
	}
};
//#endregion
//#region node_modules/three/examples/jsm/utils/BufferGeometryUtils.js
function Xn(e, t = !1) {
	let n = e[0].index !== null, r = new Set(Object.keys(e[0].attributes)), i = new Set(Object.keys(e[0].morphAttributes)), a = {}, o = {}, s = e[0].morphTargetsRelative, c = new ne(), l = 0;
	for (let u = 0; u < e.length; ++u) {
		let d = e[u], f = 0;
		if (n !== (d.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
		for (let e in d.attributes) {
			if (!r.has(e)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have compatible attributes; make sure \"" + e + "\" attribute exists among all geometries, or in none of them."), null;
			a[e] === void 0 && (a[e] = []), a[e].push(d.attributes[e]), f++;
		}
		if (f !== r.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". Make sure all geometries have the same number of attributes."), null;
		if (s !== d.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
		for (let e in d.morphAttributes) {
			if (!i.has(e)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ".  .morphAttributes must be consistent throughout all geometries."), null;
			o[e] === void 0 && (o[e] = []), o[e].push(d.morphAttributes[e]);
		}
		if (t) {
			let e;
			if (n) e = d.index.count;
			else if (d.attributes.position !== void 0) e = d.attributes.position.count;
			else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". The geometry must have either an index or a position attribute"), null;
			c.addGroup(l, e, u), l += e;
		}
	}
	if (n) {
		let t = 0, n = [];
		for (let r = 0; r < e.length; ++r) {
			let i = e[r].index;
			for (let e = 0; e < i.count; ++e) n.push(i.getX(e) + t);
			t += e[r].attributes.position.count;
		}
		c.setIndex(n);
	}
	for (let e in a) {
		let t = Zn(a[e]);
		if (!t) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
		c.setAttribute(e, t);
	}
	for (let e in o) {
		let t = o[e][0].length;
		if (t !== 0) {
			c.morphAttributes = c.morphAttributes || {}, c.morphAttributes[e] = [];
			for (let n = 0; n < t; ++n) {
				let t = [];
				for (let r = 0; r < o[e].length; ++r) t.push(o[e][r][n]);
				let r = Zn(t);
				if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
				c.morphAttributes[e].push(r);
			}
		}
	}
	return c;
}
function Zn(e) {
	let t, n, r, i = -1, a = 0;
	for (let o = 0; o < e.length; ++o) {
		let s = e[o];
		if (t === void 0 && (t = s.array.constructor), t !== s.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
		if (n === void 0 && (n = s.itemSize), n !== s.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
		if (r === void 0 && (r = s.normalized), r !== s.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
		if (i === -1 && (i = s.gpuType), i !== s.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
		a += s.count * n;
	}
	let o = new t(a), s = new te(o, n, r), c = 0;
	for (let t = 0; t < e.length; ++t) {
		let r = e[t];
		if (r.isInterleavedBufferAttribute) {
			let e = c / n;
			for (let t = 0, i = r.count; t < i; t++) for (let i = 0; i < n; i++) {
				let n = r.getComponent(t, i);
				s.setComponent(t + e, i, n);
			}
		} else o.set(r.array, c);
		c += r.count * n;
	}
	return i !== void 0 && (s.gpuType = i), s;
}
function Qn(e, t) {
	if (t === yt) return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), e;
	if (t === _t || t === vt) {
		let n = e.getIndex();
		if (n === null) {
			let t = [], r = e.getAttribute("position");
			if (r !== void 0) {
				for (let e = 0; e < r.count; e++) t.push(e);
				e.setIndex(t), n = e.getIndex();
			} else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), e;
		}
		let r = n.count - 2, i = [];
		if (t === _t) for (let e = 1; e <= r; e++) i.push(n.getX(0)), i.push(n.getX(e)), i.push(n.getX(e + 1));
		else for (let e = 0; e < r; e++) e % 2 == 0 ? (i.push(n.getX(e)), i.push(n.getX(e + 1)), i.push(n.getX(e + 2))) : (i.push(n.getX(e + 2)), i.push(n.getX(e + 1)), i.push(n.getX(e)));
		i.length / 3 !== r && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
		let a = e.clone();
		return a.setIndex(i), a.clearGroups(), a;
	} else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", t), e;
}
//#endregion
//#region src/utils/modelStorage.ts
var $n = "topospace-models", er = "models", tr = 1;
function nr() {
	return new Promise((e, t) => {
		let n = indexedDB.open($n, tr);
		n.onupgradeneeded = () => n.result.createObjectStore(er), n.onsuccess = () => e(n.result), n.onerror = () => t(n.error);
	});
}
async function rr(e, t) {
	let n = await nr();
	return new Promise((r, i) => {
		let a = n.transaction(er, "readwrite"), o = a.objectStore(er).put(t, e);
		o.onsuccess = () => r(), o.onerror = () => i(o.error), a.oncomplete = () => n.close();
	});
}
async function ir(e) {
	let t = await nr();
	return new Promise((n, r) => {
		let i = t.transaction(er, "readonly").objectStore(er).get(e);
		i.onsuccess = () => {
			n(i.result ?? null), t.close();
		}, i.onerror = () => r(i.error);
	});
}
async function ar(e) {
	let t = await nr();
	return new Promise((n, r) => {
		let i = t.transaction(er, "readwrite"), a = i.objectStore(er).delete(e);
		a.onsuccess = () => n(), a.onerror = () => r(a.error), i.oncomplete = () => t.close();
	});
}
//#endregion
//#region node_modules/three/examples/jsm/utils/SkeletonUtils.js
function or(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = e.clone();
	return sr(e, r, function(e, r) {
		t.set(r, e), n.set(e, r);
	}), r.traverse(function(e) {
		if (!e.isSkinnedMesh) return;
		let r = e, i = t.get(e), a = i.skeleton.bones;
		r.skeleton = i.skeleton.clone(), r.bindMatrix.copy(i.bindMatrix), r.skeleton.bones = a.map(function(e) {
			return n.get(e);
		}), r.bind(r.skeleton, r.bindMatrix);
	}), r;
}
function sr(e, t, n) {
	n(e, t);
	for (let r = 0; r < e.children.length; r++) sr(e.children[r], t.children[r], n);
}
//#endregion
//#region node_modules/three/examples/jsm/loaders/GLTFLoader.js
var cr = class extends je {
	constructor(e) {
		super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
			return new mr(e);
		}), this.register(function(e) {
			return new hr(e);
		}), this.register(function(e) {
			return new wr(e);
		}), this.register(function(e) {
			return new Tr(e);
		}), this.register(function(e) {
			return new Er(e);
		}), this.register(function(e) {
			return new _r(e);
		}), this.register(function(e) {
			return new vr(e);
		}), this.register(function(e) {
			return new yr(e);
		}), this.register(function(e) {
			return new br(e);
		}), this.register(function(e) {
			return new pr(e);
		}), this.register(function(e) {
			return new xr(e);
		}), this.register(function(e) {
			return new gr(e);
		}), this.register(function(e) {
			return new Cr(e);
		}), this.register(function(e) {
			return new Sr(e);
		}), this.register(function(e) {
			return new dr(e);
		}), this.register(function(e) {
			return new Dr(e, X.EXT_MESHOPT_COMPRESSION);
		}), this.register(function(e) {
			return new Dr(e, X.KHR_MESHOPT_COMPRESSION);
		}), this.register(function(e) {
			return new Or(e);
		});
	}
	load(e, t, n, r) {
		let i = this, a;
		if (this.resourcePath !== "") a = this.resourcePath;
		else if (this.path !== "") {
			let t = Me.extractUrlBase(e);
			a = Me.resolveURL(t, this.path);
		} else a = Me.extractUrlBase(e);
		this.manager.itemStart(e);
		let o = function(t) {
			r ? r(t) : console.error(t), i.manager.itemError(e), i.manager.itemEnd(e);
		}, s = new ce(this.manager);
		s.setPath(this.path), s.setResponseType("arraybuffer"), s.setRequestHeader(this.requestHeader), s.setWithCredentials(this.withCredentials), s.load(e, function(n) {
			try {
				i.parse(n, a, function(n) {
					t(n), i.manager.itemEnd(e);
				}, o);
			} catch (e) {
				o(e);
			}
		}, n, o);
	}
	setDRACOLoader(e) {
		return this.dracoLoader = e, this;
	}
	setKTX2Loader(e) {
		return this.ktx2Loader = e, this;
	}
	setMeshoptDecoder(e) {
		return this.meshoptDecoder = e, this;
	}
	register(e) {
		return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
	}
	unregister(e) {
		return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
	}
	parse(e, t, n, r) {
		let i, a = {}, o = {}, s = new TextDecoder();
		if (typeof e == "string") i = JSON.parse(e);
		else if (e instanceof ArrayBuffer) if (s.decode(new Uint8Array(e, 0, 4)) === kr) {
			try {
				a[X.KHR_BINARY_GLTF] = new Mr(e);
			} catch (e) {
				r && r(e);
				return;
			}
			i = JSON.parse(a[X.KHR_BINARY_GLTF].content);
		} else i = JSON.parse(s.decode(e));
		else i = e;
		if (i.asset === void 0 || i.asset.version[0] < 2) {
			r && r(/* @__PURE__ */ Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
			return;
		}
		let c = new ii(i, {
			path: t || this.resourcePath || "",
			crossOrigin: this.crossOrigin,
			requestHeader: this.requestHeader,
			manager: this.manager,
			ktx2Loader: this.ktx2Loader,
			meshoptDecoder: this.meshoptDecoder
		});
		c.fileLoader.setRequestHeader(this.requestHeader);
		for (let e = 0; e < this.pluginCallbacks.length; e++) {
			let t = this.pluginCallbacks[e](c);
			t.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), o[t.name] = t, a[t.name] = !0;
		}
		if (i.extensionsUsed) for (let e = 0; e < i.extensionsUsed.length; ++e) {
			let t = i.extensionsUsed[e], n = i.extensionsRequired || [];
			switch (t) {
				case X.KHR_MATERIALS_UNLIT:
					a[t] = new fr();
					break;
				case X.KHR_DRACO_MESH_COMPRESSION:
					a[t] = new Nr(i, this.dracoLoader);
					break;
				case X.KHR_TEXTURE_TRANSFORM:
					a[t] = new Pr();
					break;
				case X.KHR_MESH_QUANTIZATION:
					a[t] = new Fr();
					break;
				default: n.indexOf(t) >= 0 && o[t] === void 0 && console.warn("THREE.GLTFLoader: Unknown extension \"" + t + "\".");
			}
		}
		c.setExtensions(a), c.setPlugins(o), c.parse(n, r);
	}
	parseAsync(e, t) {
		let n = this;
		return new Promise(function(r, i) {
			n.parse(e, t, r, i);
		});
	}
};
function lr() {
	let e = {};
	return {
		get: function(t) {
			return e[t];
		},
		add: function(t, n) {
			e[t] = n;
		},
		remove: function(t) {
			delete e[t];
		},
		removeAll: function() {
			e = {};
		}
	};
}
function ur(e, t, n) {
	let r = e.json.materials[t];
	return r.extensions && r.extensions[n] ? r.extensions[n] : null;
}
var X = {
	KHR_BINARY_GLTF: "KHR_binary_glTF",
	KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
	KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
	KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
	KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
	KHR_MATERIALS_IOR: "KHR_materials_ior",
	KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
	KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
	KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
	KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
	KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
	KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
	KHR_MATERIALS_VOLUME: "KHR_materials_volume",
	KHR_TEXTURE_BASISU: "KHR_texture_basisu",
	KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
	KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
	KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
	EXT_MATERIALS_BUMP: "EXT_materials_bump",
	EXT_TEXTURE_WEBP: "EXT_texture_webp",
	EXT_TEXTURE_AVIF: "EXT_texture_avif",
	EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
	KHR_MESHOPT_COMPRESSION: "KHR_meshopt_compression",
	EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
}, dr = class {
	constructor(e) {
		this.parser = e, this.name = X.KHR_LIGHTS_PUNCTUAL, this.cache = {
			refs: {},
			uses: {}
		};
	}
	_markDefs() {
		let e = this.parser, t = this.parser.json.nodes || [];
		for (let n = 0, r = t.length; n < r; n++) {
			let r = t[n];
			r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, r.extensions[this.name].light);
		}
	}
	_loadLight(e) {
		let t = this.parser, n = "light:" + e, r = t.cache.get(n);
		if (r) return r;
		let i = t.json, a = ((i.extensions && i.extensions[this.name] || {}).lights || [])[e], o, s = new W(16777215);
		a.color !== void 0 && s.setRGB(a.color[0], a.color[1], a.color[2], Ae);
		let c = a.range === void 0 ? 0 : a.range;
		switch (a.type) {
			case "directional":
				o = new oe(s), o.target.position.set(0, 0, -1), o.add(o.target);
				break;
			case "point":
				o = new Xe(s), o.distance = c;
				break;
			case "spot":
				o = new ft(s), o.distance = c, a.spot = a.spot || {}, a.spot.innerConeAngle = a.spot.innerConeAngle === void 0 ? 0 : a.spot.innerConeAngle, a.spot.outerConeAngle = a.spot.outerConeAngle === void 0 ? Math.PI / 4 : a.spot.outerConeAngle, o.angle = a.spot.outerConeAngle, o.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle, o.target.position.set(0, 0, -1), o.add(o.target);
				break;
			default: throw Error("THREE.GLTFLoader: Unexpected light type: " + a.type);
		}
		return o.position.set(0, 0, 0), Xr(o, a), a.intensity !== void 0 && (o.intensity = a.intensity), o.name = t.createUniqueName(a.name || "light_" + e), r = Promise.resolve(o), t.cache.add(n, r), r;
	}
	getDependency(e, t) {
		if (e === "light") return this._loadLight(t);
	}
	createNodeAttachment(e) {
		let t = this, n = this.parser, r = n.json.nodes[e], i = (r.extensions && r.extensions[this.name] || {}).light;
		return i === void 0 ? null : this._loadLight(i).then(function(e) {
			return n._getNodeRef(t.cache, i, e);
		});
	}
}, fr = class {
	constructor() {
		this.name = X.KHR_MATERIALS_UNLIT;
	}
	getMaterialType() {
		return Re;
	}
	extendParams(e, t, n) {
		let r = [];
		e.color = new W(1, 1, 1), e.opacity = 1;
		let i = t.pbrMetallicRoughness;
		if (i) {
			if (Array.isArray(i.baseColorFactor)) {
				let t = i.baseColorFactor;
				e.color.setRGB(t[0], t[1], t[2], Ae), e.opacity = t[3];
			}
			i.baseColorTexture !== void 0 && r.push(n.assignTexture(e, "map", i.baseColorTexture, at));
		}
		return Promise.all(r);
	}
}, pr = class {
	constructor(e) {
		this.parser = e, this.name = X.KHR_MATERIALS_EMISSIVE_STRENGTH;
	}
	extendMaterialParams(e, t) {
		let n = ur(this.parser, e, this.name);
		return n === null || n.emissiveStrength !== void 0 && (t.emissiveIntensity = n.emissiveStrength), Promise.resolve();
	}
}, mr = class {
	constructor(e) {
		this.parser = e, this.name = X.KHR_MATERIALS_CLEARCOAT;
	}
	getMaterialType(e) {
		return ur(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = ur(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		if (n.clearcoatFactor !== void 0 && (t.clearcoat = n.clearcoatFactor), n.clearcoatTexture !== void 0 && r.push(this.parser.assignTexture(t, "clearcoatMap", n.clearcoatTexture)), n.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = n.clearcoatRoughnessFactor), n.clearcoatRoughnessTexture !== void 0 && r.push(this.parser.assignTexture(t, "clearcoatRoughnessMap", n.clearcoatRoughnessTexture)), n.clearcoatNormalTexture !== void 0 && (r.push(this.parser.assignTexture(t, "clearcoatNormalMap", n.clearcoatNormalTexture)), n.clearcoatNormalTexture.scale !== void 0)) {
			let e = n.clearcoatNormalTexture.scale;
			t.clearcoatNormalScale = new G(e, e);
		}
		return Promise.all(r);
	}
}, hr = class {
	constructor(e) {
		this.parser = e, this.name = X.KHR_MATERIALS_DISPERSION;
	}
	getMaterialType(e) {
		return ur(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = ur(this.parser, e, this.name);
		return n === null || (t.dispersion = n.dispersion === void 0 ? 0 : n.dispersion), Promise.resolve();
	}
}, gr = class {
	constructor(e) {
		this.parser = e, this.name = X.KHR_MATERIALS_IRIDESCENCE;
	}
	getMaterialType(e) {
		return ur(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = ur(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		return n.iridescenceFactor !== void 0 && (t.iridescence = n.iridescenceFactor), n.iridescenceTexture !== void 0 && r.push(this.parser.assignTexture(t, "iridescenceMap", n.iridescenceTexture)), n.iridescenceIor !== void 0 && (t.iridescenceIOR = n.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), n.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum), n.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum), n.iridescenceThicknessTexture !== void 0 && r.push(this.parser.assignTexture(t, "iridescenceThicknessMap", n.iridescenceThicknessTexture)), Promise.all(r);
	}
}, _r = class {
	constructor(e) {
		this.parser = e, this.name = X.KHR_MATERIALS_SHEEN;
	}
	getMaterialType(e) {
		return ur(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = ur(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		if (t.sheenColor = new W(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1, n.sheenColorFactor !== void 0) {
			let e = n.sheenColorFactor;
			t.sheenColor.setRGB(e[0], e[1], e[2], Ae);
		}
		return n.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = n.sheenRoughnessFactor), n.sheenColorTexture !== void 0 && r.push(this.parser.assignTexture(t, "sheenColorMap", n.sheenColorTexture, at)), n.sheenRoughnessTexture !== void 0 && r.push(this.parser.assignTexture(t, "sheenRoughnessMap", n.sheenRoughnessTexture)), Promise.all(r);
	}
}, vr = class {
	constructor(e) {
		this.parser = e, this.name = X.KHR_MATERIALS_TRANSMISSION;
	}
	getMaterialType(e) {
		return ur(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = ur(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		return n.transmissionFactor !== void 0 && (t.transmission = n.transmissionFactor), n.transmissionTexture !== void 0 && r.push(this.parser.assignTexture(t, "transmissionMap", n.transmissionTexture)), Promise.all(r);
	}
}, yr = class {
	constructor(e) {
		this.parser = e, this.name = X.KHR_MATERIALS_VOLUME;
	}
	getMaterialType(e) {
		return ur(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = ur(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		t.thickness = n.thicknessFactor === void 0 ? 0 : n.thicknessFactor, n.thicknessTexture !== void 0 && r.push(this.parser.assignTexture(t, "thicknessMap", n.thicknessTexture)), t.attenuationDistance = n.attenuationDistance || Infinity;
		let i = n.attenuationColor || [
			1,
			1,
			1
		];
		return t.attenuationColor = new W().setRGB(i[0], i[1], i[2], Ae), Promise.all(r);
	}
}, br = class {
	constructor(e) {
		this.parser = e, this.name = X.KHR_MATERIALS_IOR;
	}
	getMaterialType(e) {
		return ur(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = ur(this.parser, e, this.name);
		return n === null ? Promise.resolve() : (t.ior = n.ior === void 0 ? 1.5 : n.ior, t.ior === 0 && (t.ior = 1e3), Promise.resolve());
	}
}, xr = class {
	constructor(e) {
		this.parser = e, this.name = X.KHR_MATERIALS_SPECULAR;
	}
	getMaterialType(e) {
		return ur(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = ur(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		t.specularIntensity = n.specularFactor === void 0 ? 1 : n.specularFactor, n.specularTexture !== void 0 && r.push(this.parser.assignTexture(t, "specularIntensityMap", n.specularTexture));
		let i = n.specularColorFactor || [
			1,
			1,
			1
		];
		return t.specularColor = new W().setRGB(i[0], i[1], i[2], Ae), n.specularColorTexture !== void 0 && r.push(this.parser.assignTexture(t, "specularColorMap", n.specularColorTexture, at)), Promise.all(r);
	}
}, Sr = class {
	constructor(e) {
		this.parser = e, this.name = X.EXT_MATERIALS_BUMP;
	}
	getMaterialType(e) {
		return ur(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = ur(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		return t.bumpScale = n.bumpFactor === void 0 ? 1 : n.bumpFactor, n.bumpTexture !== void 0 && r.push(this.parser.assignTexture(t, "bumpMap", n.bumpTexture)), Promise.all(r);
	}
}, Cr = class {
	constructor(e) {
		this.parser = e, this.name = X.KHR_MATERIALS_ANISOTROPY;
	}
	getMaterialType(e) {
		return ur(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = ur(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		return n.anisotropyStrength !== void 0 && (t.anisotropy = n.anisotropyStrength), n.anisotropyRotation !== void 0 && (t.anisotropyRotation = n.anisotropyRotation), n.anisotropyTexture !== void 0 && r.push(this.parser.assignTexture(t, "anisotropyMap", n.anisotropyTexture)), Promise.all(r);
	}
}, wr = class {
	constructor(e) {
		this.parser = e, this.name = X.KHR_TEXTURE_BASISU;
	}
	loadTexture(e) {
		let t = this.parser, n = t.json, r = n.textures[e];
		if (!r.extensions || !r.extensions[this.name]) return null;
		let i = r.extensions[this.name], a = t.options.ktx2Loader;
		if (!a) {
			if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0) throw Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
			return null;
		}
		return t.loadTextureImage(e, i.source, a);
	}
}, Tr = class {
	constructor(e) {
		this.parser = e, this.name = X.EXT_TEXTURE_WEBP;
	}
	loadTexture(e) {
		let t = this.name, n = this.parser, r = n.json, i = r.textures[e];
		if (!i.extensions || !i.extensions[t]) return null;
		let a = i.extensions[t], o = r.images[a.source], s = n.textureLoader;
		if (o.uri) {
			let e = n.options.manager.getHandler(o.uri);
			e !== null && (s = e);
		}
		return n.loadTextureImage(e, a.source, s);
	}
}, Er = class {
	constructor(e) {
		this.parser = e, this.name = X.EXT_TEXTURE_AVIF;
	}
	loadTexture(e) {
		let t = this.name, n = this.parser, r = n.json, i = r.textures[e];
		if (!i.extensions || !i.extensions[t]) return null;
		let a = i.extensions[t], o = r.images[a.source], s = n.textureLoader;
		if (o.uri) {
			let e = n.options.manager.getHandler(o.uri);
			e !== null && (s = e);
		}
		return n.loadTextureImage(e, a.source, s);
	}
}, Dr = class {
	constructor(e, t) {
		this.name = t, this.parser = e;
	}
	loadBufferView(e) {
		let t = this.parser.json, n = t.bufferViews[e];
		if (n.extensions && n.extensions[this.name]) {
			let e = n.extensions[this.name], r = this.parser.getDependency("buffer", e.buffer), i = this.parser.options.meshoptDecoder;
			if (!i || !i.supported) {
				if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0) throw Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
				return null;
			}
			return r.then(function(t) {
				let n = e.byteOffset || 0, r = e.byteLength || 0, a = e.count, o = e.byteStride, s = new Uint8Array(t, n, r);
				return i.decodeGltfBufferAsync ? i.decodeGltfBufferAsync(a, o, s, e.mode, e.filter).then(function(e) {
					return e.buffer;
				}) : i.ready.then(function() {
					let t = new ArrayBuffer(a * o);
					return i.decodeGltfBuffer(new Uint8Array(t), a, o, s, e.mode, e.filter), t;
				});
			});
		} else return null;
	}
}, Or = class {
	constructor(e) {
		this.name = X.EXT_MESH_GPU_INSTANCING, this.parser = e;
	}
	createNodeMesh(e) {
		let t = this.parser.json, n = t.nodes[e];
		if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0) return null;
		let r = t.meshes[n.mesh];
		for (let e of r.primitives) if (e.mode !== zr.TRIANGLES && e.mode !== zr.TRIANGLE_STRIP && e.mode !== zr.TRIANGLE_FAN && e.mode !== void 0) return null;
		let i = n.extensions[this.name].attributes, a = [], o = {};
		for (let e in i) a.push(this.parser.getDependency("accessor", i[e]).then((t) => (o[e] = t, o[e])));
		return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((e) => {
			let t = e.pop(), n = t.isGroup ? t.children : [t], r = e[0].count, i = [];
			for (let e of n) {
				let t = new Ie(), n = new K(), a = new et(), s = new K(1, 1, 1), c = new ge(e.geometry, e.material, r);
				for (let e = 0; e < r; e++) o.TRANSLATION && n.fromBufferAttribute(o.TRANSLATION, e), o.ROTATION && a.fromBufferAttribute(o.ROTATION, e), o.SCALE && s.fromBufferAttribute(o.SCALE, e), c.setMatrixAt(e, t.compose(n, a, s));
				for (let t in o) if (t === "_COLOR_0") {
					let e = o[t];
					c.instanceColor = new pe(e.array, e.itemSize, e.normalized);
				} else t !== "TRANSLATION" && t !== "ROTATION" && t !== "SCALE" && e.geometry.setAttribute(t, o[t]);
				Ke.prototype.copy.call(c, e), this.parser.assignFinalMaterial(c), i.push(c);
			}
			return t.isGroup ? (t.clear(), t.add(...i), t) : i[0];
		}));
	}
}, kr = "glTF", Ar = 12, jr = {
	JSON: 1313821514,
	BIN: 5130562
}, Mr = class {
	constructor(e) {
		this.name = X.KHR_BINARY_GLTF, this.content = null, this.body = null;
		let t = new DataView(e, 0, Ar), n = new TextDecoder();
		if (this.header = {
			magic: n.decode(new Uint8Array(e.slice(0, 4))),
			version: t.getUint32(4, !0),
			length: t.getUint32(8, !0)
		}, this.header.magic !== kr) throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
		if (this.header.version < 2) throw Error("THREE.GLTFLoader: Legacy binary file detected.");
		let r = this.header.length - Ar, i = new DataView(e, Ar), a = 0;
		for (; a < r;) {
			let t = i.getUint32(a, !0);
			a += 4;
			let r = i.getUint32(a, !0);
			if (a += 4, r === jr.JSON) {
				let r = new Uint8Array(e, Ar + a, t);
				this.content = n.decode(r);
			} else if (r === jr.BIN) {
				let n = Ar + a;
				this.body = e.slice(n, n + t);
			}
			a += t;
		}
		if (this.content === null) throw Error("THREE.GLTFLoader: JSON content not found.");
	}
}, Nr = class {
	constructor(e, t) {
		if (!t) throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
		this.name = X.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
	}
	decodePrimitive(e, t) {
		let n = this.json, r = this.dracoLoader, i = e.extensions[this.name].bufferView, a = e.extensions[this.name].attributes, o = {}, s = {}, c = {};
		for (let e in a) {
			let t = Wr[e] || e.toLowerCase();
			o[t] = a[e];
		}
		for (let t in e.attributes) {
			let r = Wr[t] || t.toLowerCase();
			if (a[t] !== void 0) {
				let i = n.accessors[e.attributes[t]];
				c[r] = Br[i.componentType].name, s[r] = i.normalized === !0;
			}
		}
		return t.getDependency("bufferView", i).then(function(e) {
			return new Promise(function(t, n) {
				r.decodeDracoFile(e, function(e) {
					for (let t in e.attributes) {
						let n = e.attributes[t], r = s[t];
						r !== void 0 && (n.normalized = r);
					}
					t(e);
				}, o, c, Ae, n);
			});
		});
	}
}, Pr = class {
	constructor() {
		this.name = X.KHR_TEXTURE_TRANSFORM;
	}
	extendTexture(e, t) {
		return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 ? e : (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0, e);
	}
}, Fr = class {
	constructor() {
		this.name = X.KHR_MESH_QUANTIZATION;
	}
}, Ir = class extends ye {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	copySampleValue_(e) {
		let t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r * 3 + r;
		for (let e = 0; e !== r; e++) t[e] = n[i + e];
		return t;
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = o * 2, c = o * 3, l = r - t, u = (n - t) / l, d = u * u, f = d * u, p = e * c, m = p - c, h = -2 * f + 3 * d, g = f - d, _ = 1 - h, v = g - d + u;
		for (let e = 0; e !== o; e++) {
			let t = a[m + e + o], n = a[m + e + s] * l, r = a[p + e + o], c = a[p + e] * l;
			i[e] = _ * t + v * n + h * r + g * c;
		}
		return i;
	}
}, Lr = new et(), Rr = class extends Ir {
	interpolate_(e, t, n, r) {
		let i = super.interpolate_(e, t, n, r);
		return Lr.fromArray(i).normalize().toArray(i), i;
	}
}, zr = {
	FLOAT: 5126,
	FLOAT_MAT3: 35675,
	FLOAT_MAT4: 35676,
	FLOAT_VEC2: 35664,
	FLOAT_VEC3: 35665,
	FLOAT_VEC4: 35666,
	LINEAR: 9729,
	REPEAT: 10497,
	SAMPLER_2D: 35678,
	POINTS: 0,
	LINES: 1,
	LINE_LOOP: 2,
	LINE_STRIP: 3,
	TRIANGLES: 4,
	TRIANGLE_STRIP: 5,
	TRIANGLE_FAN: 6,
	UNSIGNED_BYTE: 5121,
	UNSIGNED_SHORT: 5123
}, Br = {
	5120: Int8Array,
	5121: Uint8Array,
	5122: Int16Array,
	5123: Uint16Array,
	5125: Uint32Array,
	5126: Float32Array
}, Vr = {
	9728: He,
	9729: De,
	9984: We,
	9985: ke,
	9986: Ue,
	9987: Oe
}, Hr = {
	33071: re,
	33648: Ve,
	10497: it
}, Ur = {
	SCALAR: 1,
	VEC2: 2,
	VEC3: 3,
	VEC4: 4,
	MAT2: 4,
	MAT3: 9,
	MAT4: 16
}, Wr = {
	POSITION: "position",
	NORMAL: "normal",
	TANGENT: "tangent",
	TEXCOORD_0: "uv",
	TEXCOORD_1: "uv1",
	TEXCOORD_2: "uv2",
	TEXCOORD_3: "uv3",
	COLOR_0: "color",
	WEIGHTS_0: "skinWeight",
	JOINTS_0: "skinIndex"
}, Gr = {
	scale: "scale",
	translation: "position",
	rotation: "quaternion",
	weights: "morphTargetInfluences"
}, Kr = {
	CUBICSPLINE: void 0,
	LINEAR: xe,
	STEP: be
}, qr = {
	OPAQUE: "OPAQUE",
	MASK: "MASK",
	BLEND: "BLEND"
};
function Jr(e) {
	return e.DefaultMaterial === void 0 && (e.DefaultMaterial = new Be({
		color: 16777215,
		emissive: 0,
		metalness: 1,
		roughness: 1,
		transparent: !1,
		depthTest: !0,
		side: ue
	})), e.DefaultMaterial;
}
function Yr(e, t, n) {
	for (let r in n.extensions) e[r] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[r] = n.extensions[r]);
}
function Xr(e, t) {
	t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function Zr(e, t, n) {
	let r = !1, i = !1, a = !1;
	for (let e = 0, n = t.length; e < n; e++) {
		let n = t[e];
		if (n.POSITION !== void 0 && (r = !0), n.NORMAL !== void 0 && (i = !0), n.COLOR_0 !== void 0 && (a = !0), r && i && a) break;
	}
	if (!r && !i && !a) return Promise.resolve(e);
	let o = [], s = [], c = [];
	for (let l = 0, u = t.length; l < u; l++) {
		let u = t[l];
		if (r) {
			let t = u.POSITION === void 0 ? e.attributes.position : n.getDependency("accessor", u.POSITION);
			o.push(t);
		}
		if (i) {
			let t = u.NORMAL === void 0 ? e.attributes.normal : n.getDependency("accessor", u.NORMAL);
			s.push(t);
		}
		if (a) {
			let t = u.COLOR_0 === void 0 ? e.attributes.color : n.getDependency("accessor", u.COLOR_0);
			c.push(t);
		}
	}
	return Promise.all([
		Promise.all(o),
		Promise.all(s),
		Promise.all(c)
	]).then(function(t) {
		let n = t[0], o = t[1], s = t[2];
		return r && (e.morphAttributes.position = n), i && (e.morphAttributes.normal = o), a && (e.morphAttributes.color = s), e.morphTargetsRelative = !0, e;
	});
}
function Qr(e, t) {
	if (e.updateMorphTargets(), t.weights !== void 0) for (let n = 0, r = t.weights.length; n < r; n++) e.morphTargetInfluences[n] = t.weights[n];
	if (t.extras && Array.isArray(t.extras.targetNames)) {
		let n = t.extras.targetNames;
		if (e.morphTargetInfluences.length === n.length) {
			e.morphTargetDictionary = {};
			for (let t = 0, r = n.length; t < r; t++) e.morphTargetDictionary[n[t]] = t;
		} else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
	}
}
function $r(e) {
	let t, n = e.extensions && e.extensions[X.KHR_DRACO_MESH_COMPRESSION];
	if (t = n ? "draco:" + n.bufferView + ":" + n.indices + ":" + ei(n.attributes) : e.indices + ":" + ei(e.attributes) + ":" + e.mode, e.targets !== void 0) for (let n = 0, r = e.targets.length; n < r; n++) t += ":" + ei(e.targets[n]);
	return t;
}
function ei(e) {
	let t = "", n = Object.keys(e).sort();
	for (let r = 0, i = n.length; r < i; r++) t += n[r] + ":" + e[n[r]] + ";";
	return t;
}
function ti(e) {
	switch (e) {
		case Int8Array: return 1 / 127;
		case Uint8Array: return 1 / 255;
		case Int16Array: return 1 / 32767;
		case Uint16Array: return 1 / 65535;
		default: throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
	}
}
function ni(e) {
	return e.search(/\.jpe?g($|\?)/i) > 0 || e.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : e.search(/\.webp($|\?)/i) > 0 || e.search(/^data\:image\/webp/) === 0 ? "image/webp" : e.search(/\.ktx2($|\?)/i) > 0 || e.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
var ri = new Ie(), ii = class {
	constructor(e = {}, t = {}) {
		this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new lr(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = {
			refs: {},
			uses: {}
		}, this.cameraCache = {
			refs: {},
			uses: {}
		}, this.lightCache = {
			refs: {},
			uses: {}
		}, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
		let n = !1, r = -1, i = !1, a = -1;
		if (typeof navigator < "u" && navigator.userAgent !== void 0) {
			let e = navigator.userAgent;
			n = /^((?!chrome|android).)*safari/i.test(e) === !0;
			let t = e.match(/Version\/(\d+)/);
			r = n && t ? parseInt(t[1], 10) : -1, i = e.indexOf("Firefox") > -1, a = i ? e.match(/Firefox\/([0-9]+)\./)[1] : -1;
		}
		typeof createImageBitmap > "u" || n && r < 17 || i && a < 98 ? this.textureLoader = new ht(this.options.manager) : this.textureLoader = new fe(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new ce(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
	}
	setExtensions(e) {
		this.extensions = e;
	}
	setPlugins(e) {
		this.plugins = e;
	}
	parse(e, t) {
		let n = this, r = this.json, i = this.extensions;
		this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(e) {
			return e._markDefs && e._markDefs();
		}), Promise.all(this._invokeAll(function(e) {
			return e.beforeRoot && e.beforeRoot();
		})).then(function() {
			return Promise.all([
				n.getDependencies("scene"),
				n.getDependencies("animation"),
				n.getDependencies("camera")
			]);
		}).then(function(t) {
			let a = {
				scene: t[0][r.scene || 0],
				scenes: t[0],
				animations: t[1],
				cameras: t[2],
				asset: r.asset,
				parser: n,
				userData: {}
			};
			return Yr(i, a, r), Xr(a, r), Promise.all(n._invokeAll(function(e) {
				return e.afterRoot && e.afterRoot(a);
			})).then(function() {
				for (let e of a.scenes) e.updateMatrixWorld();
				e(a);
			});
		}).catch(t);
	}
	_markDefs() {
		let e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || [];
		for (let n = 0, r = t.length; n < r; n++) {
			let r = t[n].joints;
			for (let t = 0, n = r.length; t < n; t++) e[r[t]].isBone = !0;
		}
		for (let t = 0, r = e.length; t < r; t++) {
			let r = e[t];
			r.mesh !== void 0 && (this._addNodeRef(this.meshCache, r.mesh), r.skin !== void 0 && (n[r.mesh].isSkinnedMesh = !0)), r.camera !== void 0 && this._addNodeRef(this.cameraCache, r.camera);
		}
	}
	_addNodeRef(e, t) {
		t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
	}
	_getNodeRef(e, t, n) {
		if (e.refs[t] <= 1) return n;
		let r = n.clone(), i = (e, t) => {
			let n = this.associations.get(e);
			n != null && this.associations.set(t, n);
			for (let [n, r] of e.children.entries()) i(r, t.children[n]);
		};
		return i(n, r), r.name += "_instance_" + e.uses[t]++, r;
	}
	_invokeOne(e) {
		let t = Object.values(this.plugins);
		t.push(this);
		for (let n = 0; n < t.length; n++) {
			let r = e(t[n]);
			if (r) return r;
		}
		return null;
	}
	_invokeAll(e) {
		let t = Object.values(this.plugins);
		t.unshift(this);
		let n = [];
		for (let r = 0; r < t.length; r++) {
			let i = e(t[r]);
			i && n.push(i);
		}
		return n;
	}
	getDependency(e, t) {
		let n = e + ":" + t, r = this.cache.get(n);
		if (!r) {
			switch (e) {
				case "scene":
					r = this.loadScene(t);
					break;
				case "node":
					r = this._invokeOne(function(e) {
						return e.loadNode && e.loadNode(t);
					});
					break;
				case "mesh":
					r = this._invokeOne(function(e) {
						return e.loadMesh && e.loadMesh(t);
					});
					break;
				case "accessor":
					r = this.loadAccessor(t);
					break;
				case "bufferView":
					r = this._invokeOne(function(e) {
						return e.loadBufferView && e.loadBufferView(t);
					});
					break;
				case "buffer":
					r = this.loadBuffer(t);
					break;
				case "material":
					r = this._invokeOne(function(e) {
						return e.loadMaterial && e.loadMaterial(t);
					});
					break;
				case "texture":
					r = this._invokeOne(function(e) {
						return e.loadTexture && e.loadTexture(t);
					});
					break;
				case "skin":
					r = this.loadSkin(t);
					break;
				case "animation":
					r = this._invokeOne(function(e) {
						return e.loadAnimation && e.loadAnimation(t);
					});
					break;
				case "camera":
					r = this.loadCamera(t);
					break;
				default:
					if (r = this._invokeOne(function(n) {
						return n != this && n.getDependency && n.getDependency(e, t);
					}), !r) throw Error("Unknown type: " + e);
					break;
			}
			this.cache.add(n, r);
		}
		return r;
	}
	getDependencies(e) {
		let t = this.cache.get(e);
		if (!t) {
			let n = this, r = this.json[e + (e === "mesh" ? "es" : "s")] || [];
			t = Promise.all(r.map(function(t, r) {
				return n.getDependency(e, r);
			})), this.cache.add(e, t);
		}
		return t;
	}
	loadBuffer(e) {
		let t = this.json.buffers[e], n = this.fileLoader;
		if (t.type && t.type !== "arraybuffer") throw Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
		if (t.uri === void 0 && e === 0) return Promise.resolve(this.extensions[X.KHR_BINARY_GLTF].body);
		let r = this.options;
		return new Promise(function(e, i) {
			n.load(Me.resolveURL(t.uri, r.path), e, void 0, function() {
				i(/* @__PURE__ */ Error("THREE.GLTFLoader: Failed to load buffer \"" + t.uri + "\"."));
			});
		});
	}
	loadBufferView(e) {
		let t = this.json.bufferViews[e];
		return this.getDependency("buffer", t.buffer).then(function(e) {
			let n = t.byteLength || 0, r = t.byteOffset || 0;
			return e.slice(r, r + n);
		});
	}
	loadAccessor(e) {
		let t = this, n = this.json, r = this.json.accessors[e];
		if (r.bufferView === void 0 && r.sparse === void 0) {
			let e = Ur[r.type], t = Br[r.componentType], n = r.normalized === !0, i = new t(r.count * e);
			return Promise.resolve(new te(i, e, n));
		}
		let i = [];
		return r.bufferView === void 0 ? i.push(null) : i.push(this.getDependency("bufferView", r.bufferView)), r.sparse !== void 0 && (i.push(this.getDependency("bufferView", r.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", r.sparse.values.bufferView))), Promise.all(i).then(function(e) {
			let i = e[0], a = Ur[r.type], o = Br[r.componentType], s = o.BYTES_PER_ELEMENT, c = s * a, l = r.byteOffset || 0, u = r.bufferView === void 0 ? void 0 : n.bufferViews[r.bufferView].byteStride, d = r.normalized === !0, f, p;
			if (u && u !== c) {
				let e = Math.floor(l / u), n = "InterleavedBuffer:" + r.bufferView + ":" + r.componentType + ":" + e + ":" + r.count, c = t.cache.get(n);
				c || (f = new o(i, e * u, r.count * u / s), c = new _e(f, u / s), t.cache.add(n, c)), p = new ve(c, a, l % u / s, d);
			} else f = i === null ? new o(r.count * a) : new o(i, l, r.count * a), p = new te(f, a, d);
			if (r.sparse !== void 0) {
				let t = Ur.SCALAR, n = Br[r.sparse.indices.componentType], s = r.sparse.indices.byteOffset || 0, c = r.sparse.values.byteOffset || 0, l = new n(e[1], s, r.sparse.count * t), u = new o(e[2], c, r.sparse.count * a);
				i !== null && (p = new te(p.array.slice(), p.itemSize, p.normalized)), p.normalized = !1;
				for (let e = 0, t = l.length; e < t; e++) {
					let t = l[e];
					if (p.setX(t, u[e * a]), a >= 2 && p.setY(t, u[e * a + 1]), a >= 3 && p.setZ(t, u[e * a + 2]), a >= 4 && p.setW(t, u[e * a + 3]), a >= 5) throw Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
				}
				p.normalized = d;
			}
			return p;
		});
	}
	loadTexture(e) {
		let t = this.json, n = this.options, r = t.textures[e].source, i = t.images[r], a = this.textureLoader;
		if (i.uri) {
			let e = n.manager.getHandler(i.uri);
			e !== null && (a = e);
		}
		return this.loadTextureImage(e, r, a);
	}
	loadTextureImage(e, t, n) {
		let r = this, i = this.json, a = i.textures[e], o = i.images[t], s = (o.uri || o.bufferView) + ":" + a.sampler;
		if (this.textureCache[s]) return this.textureCache[s];
		let c = this.loadImageSource(t, n).then(function(t) {
			t.flipY = !1, t.name = a.name || o.name || "", t.name === "" && typeof o.uri == "string" && o.uri.startsWith("data:image/") === !1 && (t.name = o.uri);
			let n = (i.samplers || {})[a.sampler] || {};
			return t.magFilter = Vr[n.magFilter] || De, t.minFilter = Vr[n.minFilter] || Oe, t.wrapS = Hr[n.wrapS] || it, t.wrapT = Hr[n.wrapT] || it, t.generateMipmaps = !t.isCompressedTexture && t.minFilter !== He && t.minFilter !== De, r.associations.set(t, { textures: e }), t;
		}).catch(function() {
			return null;
		});
		return this.textureCache[s] = c, c;
	}
	loadImageSource(e, t) {
		let n = this, r = this.json, i = this.options;
		if (this.sourceCache[e] !== void 0) return this.sourceCache[e].then((e) => e.clone());
		let a = r.images[e], o = self.URL || self.webkitURL, s = a.uri || "", c = !1;
		if (a.bufferView !== void 0) s = n.getDependency("bufferView", a.bufferView).then(function(e) {
			c = !0;
			let t = new Blob([e], { type: a.mimeType });
			return s = o.createObjectURL(t), s;
		});
		else if (a.uri === void 0) throw Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
		let l = Promise.resolve(s).then(function(e) {
			return new Promise(function(n, r) {
				let a = n;
				t.isImageBitmapLoader === !0 && (a = function(e) {
					let t = new mt(e);
					t.needsUpdate = !0, n(t);
				}), t.load(Me.resolveURL(e, i.path), a, void 0, r);
			});
		}).then(function(e) {
			return c === !0 && o.revokeObjectURL(s), Xr(e, a), e.userData.mimeType = a.mimeType || ni(a.uri), e;
		}).catch(function(e) {
			throw console.error("THREE.GLTFLoader: Couldn't load texture", s), e;
		});
		return this.sourceCache[e] = l, l;
	}
	assignTexture(e, t, n, r) {
		let i = this;
		return this.getDependency("texture", n.index).then(function(a) {
			if (!a) return null;
			if (n.texCoord !== void 0 && n.texCoord > 0 && (a = a.clone(), a.channel = n.texCoord), i.extensions[X.KHR_TEXTURE_TRANSFORM]) {
				let e = n.extensions === void 0 ? void 0 : n.extensions[X.KHR_TEXTURE_TRANSFORM];
				if (e) {
					let t = i.associations.get(a);
					a = i.extensions[X.KHR_TEXTURE_TRANSFORM].extendTexture(a, e), i.associations.set(a, t);
				}
			}
			return r !== void 0 && (a.colorSpace = r), e[t] = a, a;
		});
	}
	assignFinalMaterial(e) {
		let t = e.geometry, n = e.material, r = t.attributes.tangent === void 0, i = t.attributes.color !== void 0, a = t.attributes.normal === void 0;
		if (e.isPoints) {
			let e = "PointsMaterial:" + n.uuid, t = this.cache.get(e);
			t || (t = new Qe(), Pe.prototype.copy.call(t, n), t.color.copy(n.color), t.map = n.map, t.sizeAttenuation = !1, this.cache.add(e, t)), n = t;
		} else if (e.isLine) {
			let e = "LineBasicMaterial:" + n.uuid, t = this.cache.get(e);
			t || (t = new we(), Pe.prototype.copy.call(t, n), t.color.copy(n.color), t.map = n.map, this.cache.add(e, t)), n = t;
		}
		if (r || i || a) {
			let e = "ClonedMaterial:" + n.uuid + ":";
			r && (e += "derivative-tangents:"), i && (e += "vertex-colors:"), a && (e += "flat-shading:");
			let t = this.cache.get(e);
			t || (t = n.clone(), i && (t.vertexColors = !0), a && (t.flatShading = !0), r && (t.normalScale && (t.normalScale.y *= -1), t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)), this.cache.add(e, t), this.associations.set(t, this.associations.get(n))), n = t;
		}
		e.material = n;
	}
	getMaterialType() {
		return Be;
	}
	loadMaterial(e) {
		let t = this, n = this.json, r = this.extensions, i = n.materials[e], a, o = {}, s = i.extensions || {}, c = [];
		if (s[X.KHR_MATERIALS_UNLIT]) {
			let e = r[X.KHR_MATERIALS_UNLIT];
			a = e.getMaterialType(), c.push(e.extendParams(o, i, t));
		} else {
			let n = i.pbrMetallicRoughness || {};
			if (o.color = new W(1, 1, 1), o.opacity = 1, Array.isArray(n.baseColorFactor)) {
				let e = n.baseColorFactor;
				o.color.setRGB(e[0], e[1], e[2], Ae), o.opacity = e[3];
			}
			n.baseColorTexture !== void 0 && c.push(t.assignTexture(o, "map", n.baseColorTexture, at)), o.metalness = n.metallicFactor === void 0 ? 1 : n.metallicFactor, o.roughness = n.roughnessFactor === void 0 ? 1 : n.roughnessFactor, n.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(o, "metalnessMap", n.metallicRoughnessTexture)), c.push(t.assignTexture(o, "roughnessMap", n.metallicRoughnessTexture))), a = this._invokeOne(function(t) {
				return t.getMaterialType && t.getMaterialType(e);
			}), c.push(Promise.all(this._invokeAll(function(t) {
				return t.extendMaterialParams && t.extendMaterialParams(e, o);
			})));
		}
		i.doubleSided === !0 && (o.side = se);
		let l = i.alphaMode || qr.OPAQUE;
		if (l === qr.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, l === qr.MASK && (o.alphaTest = i.alphaCutoff === void 0 ? .5 : i.alphaCutoff)), i.normalTexture !== void 0 && a !== Re && (c.push(t.assignTexture(o, "normalMap", i.normalTexture)), o.normalScale = new G(1, 1), i.normalTexture.scale !== void 0)) {
			let e = i.normalTexture.scale;
			o.normalScale.set(e, e);
		}
		if (i.occlusionTexture !== void 0 && a !== Re && (c.push(t.assignTexture(o, "aoMap", i.occlusionTexture)), i.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = i.occlusionTexture.strength)), i.emissiveFactor !== void 0 && a !== Re) {
			let e = i.emissiveFactor;
			o.emissive = new W().setRGB(e[0], e[1], e[2], Ae);
		}
		return i.emissiveTexture !== void 0 && a !== Re && c.push(t.assignTexture(o, "emissiveMap", i.emissiveTexture, at)), Promise.all(c).then(function() {
			let n = new a(o);
			return i.name && (n.name = i.name), Xr(n, i), t.associations.set(n, { materials: e }), i.extensions && Yr(r, n, i), n;
		});
	}
	createUniqueName(e) {
		let t = $e.sanitizeNodeName(e || "");
		return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
	}
	loadGeometries(e) {
		let t = this, n = this.extensions, r = this.primitiveCache;
		function i(e) {
			return n[X.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then(function(n) {
				return oi(n, e, t);
			});
		}
		let a = [];
		for (let n = 0, o = e.length; n < o; n++) {
			let o = e[n], s = $r(o), c = r[s];
			if (c) a.push(c.promise);
			else {
				let e;
				e = o.extensions && o.extensions[X.KHR_DRACO_MESH_COMPRESSION] ? i(o) : oi(new ne(), o, t), r[s] = {
					primitive: o,
					promise: e
				}, a.push(e);
			}
		}
		return Promise.all(a);
	}
	loadMesh(e) {
		let t = this, n = this.json, r = this.extensions, i = n.meshes[e], a = i.primitives, o = [];
		for (let e = 0, t = a.length; e < t; e++) {
			let t = a[e].material === void 0 ? Jr(this.cache) : this.getDependency("material", a[e].material);
			o.push(t);
		}
		return o.push(t.loadGeometries(a)), Promise.all(o).then(function(n) {
			let o = n.slice(0, n.length - 1), s = n[n.length - 1], c = [];
			for (let n = 0, l = s.length; n < l; n++) {
				let l = s[n], u = a[n], d, f = o[n];
				if (u.mode === zr.TRIANGLES || u.mode === zr.TRIANGLE_STRIP || u.mode === zr.TRIANGLE_FAN || u.mode === void 0) d = i.isSkinnedMesh === !0 ? new lt(l, f) : new Le(l, f), d.isSkinnedMesh === !0 && d.normalizeSkinWeights(), u.mode === zr.TRIANGLE_STRIP ? d.geometry = Qn(d.geometry, vt) : u.mode === zr.TRIANGLE_FAN && (d.geometry = Qn(d.geometry, _t));
				else if (u.mode === zr.LINES) d = new Ee(l, f);
				else if (u.mode === zr.LINE_STRIP) d = new Se(l, f);
				else if (u.mode === zr.LINE_LOOP) d = new Te(l, f);
				else if (u.mode === zr.POINTS) d = new Ze(l, f);
				else throw Error("THREE.GLTFLoader: Primitive mode unsupported: " + u.mode);
				Object.keys(d.geometry.morphAttributes).length > 0 && Qr(d, i), d.name = t.createUniqueName(i.name || "mesh_" + e), Xr(d, i), u.extensions && Yr(r, d, u), t.assignFinalMaterial(d), c.push(d);
			}
			for (let n = 0, r = c.length; n < r; n++) t.associations.set(c[n], {
				meshes: e,
				primitives: n
			});
			if (c.length === 1) return i.extensions && Yr(r, c[0], i), c[0];
			let l = new de();
			i.extensions && Yr(r, l, i), t.associations.set(l, { meshes: e });
			for (let e = 0, t = c.length; e < t; e++) l.add(c[e]);
			return l;
		});
	}
	loadCamera(e) {
		let t, n = this.json.cameras[e], r = n[n.type];
		if (!r) {
			console.warn("THREE.GLTFLoader: Missing camera parameters.");
			return;
		}
		return n.type === "perspective" ? t = new Je(Fe.radToDeg(r.yfov), r.aspectRatio || 1, r.znear || 1, r.zfar || 2e6) : n.type === "orthographic" && (t = new qe(-r.xmag, r.xmag, r.ymag, -r.ymag, r.znear, r.zfar)), n.name && (t.name = this.createUniqueName(n.name)), Xr(t, n), Promise.resolve(t);
	}
	loadSkin(e) {
		let t = this.json.skins[e], n = [];
		for (let e = 0, r = t.joints.length; e < r; e++) n.push(this._loadNodeShallow(t.joints[e]));
		return t.inverseBindMatrices === void 0 ? n.push(null) : n.push(this.getDependency("accessor", t.inverseBindMatrices)), Promise.all(n).then(function(e) {
			let n = e.pop(), r = e, i = [], a = [];
			for (let e = 0, o = r.length; e < o; e++) {
				let o = r[e];
				if (o) {
					i.push(o);
					let t = new Ie();
					n !== null && t.fromArray(n.array, e * 16), a.push(t);
				} else console.warn("THREE.GLTFLoader: Joint \"%s\" could not be found.", t.joints[e]);
			}
			return new ct(i, a);
		});
	}
	loadAnimation(e) {
		let t = this.json, n = this, r = t.animations[e], i = r.name ? r.name : "animation_" + e, a = [], o = [], s = [], c = [], l = [];
		for (let e = 0, t = r.channels.length; e < t; e++) {
			let t = r.channels[e], n = r.samplers[t.sampler], i = t.target, u = i.node, d = r.parameters === void 0 ? n.input : r.parameters[n.input], f = r.parameters === void 0 ? n.output : r.parameters[n.output];
			i.node !== void 0 && (a.push(this.getDependency("node", u)), o.push(this.getDependency("accessor", d)), s.push(this.getDependency("accessor", f)), c.push(n), l.push(i));
		}
		return Promise.all([
			Promise.all(a),
			Promise.all(o),
			Promise.all(s),
			Promise.all(c),
			Promise.all(l)
		]).then(function(e) {
			let t = e[0], a = e[1], o = e[2], s = e[3], c = e[4], l = [];
			for (let e = 0, r = t.length; e < r; e++) {
				let r = t[e], i = a[e], u = o[e], d = s[e], f = c[e];
				if (r === void 0) continue;
				r.updateMatrix && r.updateMatrix();
				let p = n._createAnimationTracks(r, i, u, d, f);
				if (p) for (let e = 0; e < p.length; e++) l.push(p[e]);
			}
			let u = new z(i, void 0, l);
			return Xr(u, r), u;
		});
	}
	createNodeMesh(e) {
		let t = this.json, n = this, r = t.nodes[e];
		return r.mesh === void 0 ? null : n.getDependency("mesh", r.mesh).then(function(e) {
			let t = n._getNodeRef(n.meshCache, r.mesh, e);
			return r.weights !== void 0 && t.traverse(function(e) {
				if (e.isMesh) for (let t = 0, n = r.weights.length; t < n; t++) e.morphTargetInfluences[t] = r.weights[t];
			}), t;
		});
	}
	loadNode(e) {
		let t = this.json, n = this, r = t.nodes[e], i = n._loadNodeShallow(e), a = [], o = r.children || [];
		for (let e = 0, t = o.length; e < t; e++) a.push(n.getDependency("node", o[e]));
		let s = r.skin === void 0 ? Promise.resolve(null) : n.getDependency("skin", r.skin);
		return Promise.all([
			i,
			Promise.all(a),
			s
		]).then(function(e) {
			let t = e[0], n = e[1], r = e[2];
			r !== null && t.traverse(function(e) {
				e.isSkinnedMesh && e.bind(r, ri);
			});
			for (let e = 0, r = n.length; e < r; e++) t.add(n[e]);
			if (t.userData.pivot !== void 0 && n.length > 0) {
				let e = t.userData.pivot, r = n[0];
				t.pivot = new K().fromArray(e), t.position.x -= e[0], t.position.y -= e[1], t.position.z -= e[2], r.position.set(0, 0, 0), delete t.userData.pivot;
			}
			return t;
		});
	}
	_loadNodeShallow(e) {
		let t = this.json, n = this.extensions, r = this;
		if (this.nodeCache[e] !== void 0) return this.nodeCache[e];
		let i = t.nodes[e], a = i.name ? r.createUniqueName(i.name) : "", o = [], s = r._invokeOne(function(t) {
			return t.createNodeMesh && t.createNodeMesh(e);
		});
		return s && o.push(s), i.camera !== void 0 && o.push(r.getDependency("camera", i.camera).then(function(e) {
			return r._getNodeRef(r.cameraCache, i.camera, e);
		})), r._invokeAll(function(t) {
			return t.createNodeAttachment && t.createNodeAttachment(e);
		}).forEach(function(e) {
			o.push(e);
		}), this.nodeCache[e] = Promise.all(o).then(function(t) {
			let o;
			if (o = i.isBone === !0 ? new H() : t.length > 1 ? new de() : t.length === 1 ? t[0] : new Ke(), o !== t[0]) for (let e = 0, n = t.length; e < n; e++) o.add(t[e]);
			if (i.name && (o.userData.name = i.name, o.name = a), Xr(o, i), i.extensions && Yr(n, o, i), i.matrix !== void 0) {
				let e = new Ie();
				e.fromArray(i.matrix), o.applyMatrix4(e);
			} else i.translation !== void 0 && o.position.fromArray(i.translation), i.rotation !== void 0 && o.quaternion.fromArray(i.rotation), i.scale !== void 0 && o.scale.fromArray(i.scale);
			if (!r.associations.has(o)) r.associations.set(o, {});
			else if (i.mesh !== void 0 && r.meshCache.refs[i.mesh] > 1) {
				let e = r.associations.get(o);
				r.associations.set(o, { ...e });
			}
			return r.associations.get(o).nodes = e, o;
		}), this.nodeCache[e];
	}
	loadScene(e) {
		let t = this.extensions, n = this.json.scenes[e], r = this, i = new de();
		n.name && (i.name = r.createUniqueName(n.name)), Xr(i, n), n.extensions && Yr(t, i, n);
		let a = n.nodes || [], o = [];
		for (let e = 0, t = a.length; e < t; e++) o.push(r.getDependency("node", a[e]));
		return Promise.all(o).then(function(e) {
			for (let t = 0, n = e.length; t < n; t++) {
				let n = e[t];
				n.parent === null ? i.add(n) : i.add(or(n));
			}
			return r.associations = ((e) => {
				let t = /* @__PURE__ */ new Map();
				for (let [e, n] of r.associations) (e instanceof Pe || e instanceof mt) && t.set(e, n);
				return e.traverse((e) => {
					let n = r.associations.get(e);
					n != null && t.set(e, n);
				}), t;
			})(i), i;
		});
	}
	_createAnimationTracks(e, t, n, r, i) {
		let a = [], o = e.name ? e.name : e.uuid, s = [];
		function c(e) {
			e.morphTargetInfluences && s.push(e.name ? e.name : e.uuid);
		}
		Gr[i.path] === Gr.weights ? (c(e), e.isGroup && e.children.forEach(c)) : s.push(o);
		let l;
		switch (Gr[i.path]) {
			case Gr.weights:
				l = Ge;
				break;
			case Gr.rotation:
				l = tt;
				break;
			case Gr.translation:
			case Gr.scale:
				l = Ct;
				break;
			default:
				switch (n.itemSize) {
					case 1:
						l = Ge;
						break;
					default:
						l = Ct;
						break;
				}
				break;
		}
		let u = r.interpolation === void 0 ? xe : Kr[r.interpolation], d = this._getArrayFromAccessor(n);
		for (let e = 0, n = s.length; e < n; e++) {
			let n = new l(s[e] + "." + Gr[i.path], t.array, d, u);
			r.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(n), a.push(n);
		}
		return a;
	}
	_getArrayFromAccessor(e) {
		let t = e.array;
		if (e.normalized) {
			let e = ti(t.constructor), n = new Float32Array(t.length);
			for (let r = 0, i = t.length; r < i; r++) n[r] = t[r] * e;
			t = n;
		}
		return t;
	}
	_createCubicSplineTrackInterpolant(e) {
		e.createInterpolant = function(e) {
			return new (this instanceof tt ? Rr : Ir)(this.times, this.values, this.getValueSize() / 3, e);
		}, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
	}
};
function ai(e, t, n) {
	let r = t.attributes, i = new U();
	if (r.POSITION !== void 0) {
		let e = n.json.accessors[r.POSITION], t = e.min, a = e.max;
		if (t !== void 0 && a !== void 0) {
			if (i.set(new K(t[0], t[1], t[2]), new K(a[0], a[1], a[2])), e.normalized) {
				let t = ti(Br[e.componentType]);
				i.min.multiplyScalar(t), i.max.multiplyScalar(t);
			}
		} else {
			console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
			return;
		}
	} else return;
	let a = t.targets;
	if (a !== void 0) {
		let e = new K(), t = new K();
		for (let r = 0, i = a.length; r < i; r++) {
			let i = a[r];
			if (i.POSITION !== void 0) {
				let r = n.json.accessors[i.POSITION], a = r.min, o = r.max;
				if (a !== void 0 && o !== void 0) {
					if (t.setX(Math.max(Math.abs(a[0]), Math.abs(o[0]))), t.setY(Math.max(Math.abs(a[1]), Math.abs(o[1]))), t.setZ(Math.max(Math.abs(a[2]), Math.abs(o[2]))), r.normalized) {
						let e = ti(Br[r.componentType]);
						t.multiplyScalar(e);
					}
					e.max(t);
				} else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
			}
		}
		i.expandByVector(e);
	}
	e.boundingBox = i;
	let o = new ut();
	i.getCenter(o.center), o.radius = i.min.distanceTo(i.max) / 2, e.boundingSphere = o;
}
function oi(e, t, n) {
	let r = t.attributes, i = [];
	function a(t, r) {
		return n.getDependency("accessor", t).then(function(t) {
			e.setAttribute(r, t);
		});
	}
	for (let t in r) {
		let n = Wr[t] || t.toLowerCase();
		n in e.attributes || i.push(a(r[t], n));
	}
	if (t.indices !== void 0 && !e.index) {
		let r = n.getDependency("accessor", t.indices).then(function(t) {
			e.setIndex(t);
		});
		i.push(r);
	}
	return ie.workingColorSpace !== Ae && "COLOR_0" in r && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ie.workingColorSpace}" not supported.`), Xr(e, t), ai(e, t, n), Promise.all(i).then(function() {
		return t.targets === void 0 ? e : Zr(e, t.targets, n);
	});
}
//#endregion
//#region src/utils/modelLoader.ts
async function si(e) {
	let t = new cr();
	return new Promise((n) => {
		t.parse(e, "", (e) => {
			let t = [];
			if (e.scene.updateMatrixWorld(!0), e.scene.traverse((e) => {
				if (e instanceof R.Mesh && e.geometry) {
					let n = e.geometry.clone();
					n.applyMatrix4(e.matrixWorld), t.push(n);
				}
			}), !t.length) {
				n(null);
				return;
			}
			let r = t.length === 1 ? t[0] : Xn(t, !1) ?? t[0];
			t.length > 1 && t.forEach((e) => e.dispose()), r.computeBoundingBox();
			let i = r.boundingBox, a = new R.Vector3(), o = new R.Vector3();
			i.getCenter(a), i.getSize(o);
			let s = Math.max(o.x, o.y, o.z), c = s > 0 ? .8 / s : 1;
			r.translate(-a.x, -i.min.y, -a.z), r.scale(c, c, c), n(r);
		}, (e) => {
			console.warn("[modelLoader] GLTF parse error:", e), n(null);
		});
	});
}
async function ci(e) {
	let t = new cr();
	return new Promise((n) => {
		t.parse(e, "", (e) => {
			n(e.scene ?? null);
		}, (e) => {
			console.warn("[modelLoader] GLTF parse error:", e), n(null);
		});
	});
}
//#endregion
//#region src/utils/geometryFactory.ts
var li = {
	server: [
		.8,
		.22,
		.5
	],
	switch: [
		1,
		.18,
		.5
	],
	router: [
		.8,
		.22,
		.5
	],
	firewall: [
		.8,
		.24,
		.5
	],
	database: [
		.65,
		.3,
		.55
	],
	storage: [
		1.2,
		.3,
		.55
	],
	vm: [
		.6,
		.16,
		.38
	],
	container: [
		.5,
		.16,
		.35
	],
	load_balancer: [
		.8,
		.22,
		.5
	],
	access_point: [
		.55,
		.16,
		.5
	],
	cloud_service: [
		.7,
		.22,
		.5
	],
	unknown: [
		.6,
		.18,
		.4
	]
};
function ui(e, t = 1) {
	return e.setAttribute("color", new R.BufferAttribute(new Float32Array(e.getAttribute("position").count * 3).fill(t), 3)), e;
}
function di(e) {
	let t = e.map((e) => e.index ? e.toNonIndexed() : e), n = Xn(t);
	return t.forEach((t, n) => {
		t !== e[n] && t.dispose();
	}), e.forEach((e) => e.dispose()), n;
}
var fi = {
	server: [
		"11111",
		"10001",
		"11111",
		"10001",
		"11111"
	],
	switch: [
		"10101",
		"11111",
		"00100",
		"11111",
		"10101"
	],
	router: [
		"00100",
		"01110",
		"11111",
		"01110",
		"00100"
	],
	firewall: [
		"11111",
		"10101",
		"11111",
		"01110",
		"00100"
	],
	database: [
		"01110",
		"10001",
		"11111",
		"10001",
		"01110"
	],
	storage: [
		"11111",
		"10101",
		"10101",
		"10101",
		"11111"
	],
	vm: [
		"11110",
		"10010",
		"10111",
		"11101",
		"00111"
	],
	container: [
		"11111",
		"10101",
		"10101",
		"10101",
		"11111"
	],
	load_balancer: [
		"00100",
		"11111",
		"10101",
		"10101",
		"10101"
	],
	access_point: [
		"01110",
		"10001",
		"00100",
		"01010",
		"00100"
	],
	cloud_service: [
		"01100",
		"10010",
		"10001",
		"10001",
		"01110"
	],
	unknown: [
		"01110",
		"10001",
		"00110",
		"00000",
		"00100"
	]
};
function pi(e) {
	let [t, n, r] = li[e], i = [ui(new Yn(t, n, r, 2, .025), .9)], a = r / 2, o = e === "switch" ? 8 : e === "storage" ? 6 : e === "unknown" ? 1 : 4, s = t * .76 / o;
	i.push(ui(new R.BoxGeometry(t * .92, n * .72, .012).translate(0, 0, a), .22));
	for (let e = 0; e < o; e++) {
		let r = -t * .38 + s * (e + .5);
		i.push(ui(new R.BoxGeometry(s * .82, n * .52, .018).translate(r, 0, a + .013), .6)), i.push(ui(new R.BoxGeometry(s * .6, n * .2, .009).translate(r, 0, a + .026), .16)), i.push(ui(new R.BoxGeometry(.016, .012, .01).translate(r, n * .22, a + .03), 1.4));
	}
	let c = Math.min(t, r) * .095;
	i.push(ui(new Yn(c * 6.4, .008, c * 6.4, 1, .003).translate(-t * .12, n / 2, 0), .24)), fi[e].forEach((e, r) => {
		for (let a = 0; a < e.length; a++) e[a] === "1" && i.push(ui(new R.BoxGeometry(c * .85, .008, c * .85).translate((a - 2) * c - t * .12, n / 2 + .008, (r - 2) * c), 1.35));
	});
	for (let e = 0; e < 5; e++) i.push(ui(new R.BoxGeometry(t * .16, .003, .012).translate(t * .32, n / 2, -.07 + e * .035), .28));
	return di(i);
}
var mi = /* @__PURE__ */ new Map(), hi = /* @__PURE__ */ new Map();
function gi(e) {
	hi.forEach((e, t) => {
		let n = mi.get(t);
		n && (n.disposeBoundsTree?.(), n.dispose(), mi.delete(t));
	}), hi = new Map(e);
}
function _i(e) {
	if (mi.has(e)) return mi.get(e);
	let t = hi.get(e);
	if (t) {
		if (t.hasModel) {
			let n = new R.BoxGeometry(t.w, t.h, t.d);
			return n.computeBoundsTree(), mi.set(e, n), n;
		}
		let n;
		switch (t.shape) {
			case "cylinder":
				n = new R.CylinderGeometry(t.w / 2, t.w / 2, t.h, 10);
				break;
			case "sphere":
				n = new R.SphereGeometry(t.w / 2, 10, 8);
				break;
			case "octahedron":
				n = new R.OctahedronGeometry(t.w / 2);
				break;
			default: n = new R.BoxGeometry(t.w, t.h, t.d);
		}
		return n.computeBoundsTree(), mi.set(e, n), n;
	}
	let n = pi(Object.prototype.hasOwnProperty.call(li, e) ? e : "unknown");
	return n.computeBoundsTree(), mi.set(e, n), n;
}
async function vi(e) {
	let t = [];
	e.forEach((e) => {
		e.hasModel && (mi.has(e.id) || t.push((async () => {
			try {
				let t = await ir(e.id);
				if (!t) return;
				let n = await si(t);
				if (!n) return;
				n.computeBoundsTree(), mi.set(e.id, n);
			} catch (t) {
				console.warn(`[geometryFactory] Failed to preload model "${e.id}":`, t);
			}
		})()));
	}), t.length && await Promise.all(t);
}
function yi() {
	mi.forEach((e) => {
		e.disposeBoundsTree(), e.dispose();
	}), mi.clear();
}
//#endregion
//#region src/utils/labelLayout.ts
function bi(e, t) {
	let n = t.get(e);
	if (n && n.text === e.textContent) return n;
	let r = e.offsetWidth, i = e.offsetHeight, a = {
		text: e.textContent,
		width: r || (e.textContent?.length ?? 0) * 6.5 + 16,
		height: i || 20
	};
	return r && i && t.set(e, a), a;
}
function xi(e, t, n, r = []) {
	let i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map(), o = (e) => {
		let t = [];
		for (let n = Math.floor(e.x / 80); n <= Math.floor((e.x + e.width) / 80); n++) for (let r = Math.floor(e.y / 80); r <= Math.floor((e.y + e.height) / 80); r++) t.push(`${n}:${r}`);
		return t;
	}, s = (e) => {
		for (let t of o(e)) {
			let n = a.get(t) ?? [];
			n.push(e), a.set(t, n);
		}
	};
	for (let e of r) {
		let r = Math.max(0, e.x), i = Math.max(0, e.y), a = Math.min(t, e.x + e.width), o = Math.min(n, e.y + e.height);
		a > r && o > i && s({
			x: r,
			y: i,
			width: a - r,
			height: o - i
		});
	}
	let c = [...e].sort((e, t) => t.priority - e.priority || e.id.localeCompare(t.id));
	for (let e of c) {
		let r = {
			x: e.x - 4,
			y: e.y - 4,
			width: e.width + 8,
			height: e.height + 8
		};
		r.x < 0 || r.y < 0 || r.x + r.width > t || r.y + r.height > n || o(r).some((e) => (a.get(e) ?? []).some((e) => r.x < e.x + e.width && r.x + r.width > e.x && r.y < e.y + e.height && r.y + r.height > e.y)) || (i.add(e.id), s(r));
	}
	return i;
}
//#endregion
//#region src/renderers/DeviceRenderer.ts
var Si = /* @__PURE__ */ new Map(), Ci = 200, wi = {
	critical: 5,
	offline: 5,
	warning: 4,
	stale: 3,
	maintenance: 2,
	unknown: 1,
	acknowledged: 1,
	normal: 0
};
function Ti(e) {
	return Si.has(e) || Si.set(e, new R.MeshStandardMaterial({
		color: new R.Color(16777215),
		roughness: .48,
		metalness: .3,
		emissive: new R.Color(0),
		emissiveIntensity: 0
	})), Si.get(e);
}
var Ei = class {
	scene;
	objects = /* @__PURE__ */ new Map();
	dummy = new R.Object3D();
	instancedMeshes = /* @__PURE__ */ new Map();
	instanceIndex = /* @__PURE__ */ new Map();
	instanceColors = /* @__PURE__ */ new Map();
	statusMap = /* @__PURE__ */ new Map();
	dimmedIds = /* @__PURE__ */ new Set();
	hasFilter = !1;
	searchLabels = /* @__PURE__ */ new Map();
	typeLabels = /* @__PURE__ */ new Map();
	nextTypeLabelUpdate = 0;
	nextSearchLabelLayout = 0;
	labelSizes = /* @__PURE__ */ new WeakMap();
	statusBadges = /* @__PURE__ */ new Map();
	badgeSeverity = /* @__PURE__ */ new Map();
	ackedIds = /* @__PURE__ */ new Set();
	labelScale = 1;
	selectionRing = null;
	selectedDeviceId = null;
	hoverRing = null;
	highlightedId = null;
	multiRingGeo = null;
	multiRingMat = null;
	multiRings = /* @__PURE__ */ new Map();
	constructor(e) {
		this.scene = e;
	}
	_updateBadge(e, t) {
		let n = this.statusBadges.get(e);
		n && (this.scene.remove(n), n.element.remove(), this.statusBadges.delete(e), this.badgeSeverity.delete(e));
		let r = this.ackedIds.has(e), i = Bn[t];
		if (!i && !r) return;
		let a = this.getDeviceWorldPos(e);
		if (!a) return;
		let o = wi[t] ?? 0;
		if (this.statusBadges.size >= Ci) {
			let e = null, t = Infinity;
			if (this.badgeSeverity.forEach((n, r) => {
				n < t && (t = n, e = r);
			}), e === null || t > o) return;
			let n = this.statusBadges.get(e);
			this.scene.remove(n), n.element.remove(), this.statusBadges.delete(e), this.badgeSeverity.delete(e);
		}
		let s = document.createElement("div");
		if (s.className = "device-status-badge", s.title = zn[t], s.setAttribute("aria-label", zn[t]), s.style.cssText = `
      display:flex; align-items:center; gap:3px;
      background:rgba(15,23,42,.92); border:1px solid ${Mn[t]};
      border-radius:5px; padding:1px 5px; pointer-events:none; white-space:nowrap;
      font-family:monospace; font-size:${11 * this.labelScale}px; font-weight:700; color:${Mn[t]};`, s.textContent = i, r) {
			let e = document.createElement("span");
			e.textContent = Bn.acknowledged, e.style.cssText = "color:#4ade80;", s.appendChild(e);
		}
		let c = new Sn(s);
		c.position.copy(a).add(new R.Vector3(0, 1.3, 0)), this.scene.add(c), this.statusBadges.set(e, c), this.badgeSeverity.set(e, o);
	}
	setAcknowledged(e, t) {
		t ? this.ackedIds.add(e) : this.ackedIds.delete(e);
		let n = this.statusMap.get(e);
		n && this._updateBadge(e, n);
	}
	loadInstanced(e, t, n) {
		let r = /* @__PURE__ */ new Map();
		e.forEach((e) => {
			let t = n(e.id);
			if (!t || !t.position || t.mappingStatus === "unmapped") return;
			let i = t.visualType ?? e.normalizedType ?? "unknown";
			r.has(i) || r.set(i, []), r.get(i).push({
				device: e,
				mapping: t
			});
		}), r.forEach((e, t) => {
			let n = _i(t), r = Ti(t).clone();
			r.vertexColors = n.hasAttribute("color");
			let i = new R.InstancedMesh(n, r, e.length + 50);
			i.castShadow = !0, i.receiveShadow = !0, i.instanceMatrix.setUsage(R.DynamicDrawUsage), i.count = e.length, i.userData.deviceType = t, e.forEach((e, n) => {
				let r = e.mapping.position;
				this.dummy.position.set(r.x, r.y, r.z), this.dummy.rotation.set(0, 0, 0), this.dummy.scale.setScalar(1), this.dummy.updateMatrix(), i.setMatrixAt(n, this.dummy.matrix);
				let a = e.device.status ?? "unknown", o = Nn[a];
				i.setColorAt(n, o), this.instanceIndex.set(e.device.id, {
					type: t,
					idx: n
				}), this.instanceColors.set(e.device.id, o.clone()), this.statusMap.set(e.device.id, a), i.userData[`device_${n}`] = e.device.id, e.mapping.operatorState?.acknowledged && this.ackedIds.add(e.device.id);
			}), i.instanceMatrix.needsUpdate = !0, i.instanceColor && (i.instanceColor.needsUpdate = !0), this.instancedMeshes.set(t, i), this.scene.add(i);
		}), this.instanceIndex.forEach((e, t) => this._updateBadge(t, this.statusMap.get(t) ?? "unknown"));
	}
	addDevice(e, t) {
		if (!t.position || t.mappingStatus === "unmapped") return;
		if (this.instanceIndex.has(e.id)) {
			this.setPosition(e.id, new R.Vector3(t.position.x, t.position.y, t.position.z));
			return;
		}
		let n = t.visualType ?? e.normalizedType ?? "unknown", r = e.status ?? "unknown", i = Nn[r] ?? new R.Color(7041664), a = this.instancedMeshes.get(n);
		if (a && a.count < a.instanceMatrix.count) {
			let o = a.count;
			this.dummy.position.set(t.position.x, t.position.y, t.position.z), this.dummy.rotation.set(0, 0, 0), this.dummy.scale.setScalar(1), this.dummy.updateMatrix(), a.setMatrixAt(o, this.dummy.matrix), a.setColorAt(o, i), a.count = o + 1, a.instanceMatrix.needsUpdate = !0, a.instanceColor && (a.instanceColor.needsUpdate = !0), a.computeBoundingSphere(), a.userData[`device_${o}`] = e.id, this.instanceIndex.set(e.id, {
				type: n,
				idx: o
			}), this.instanceColors.set(e.id, i.clone()), this.statusMap.set(e.id, r), t.operatorState?.acknowledged && this.ackedIds.add(e.id), this._updateBadge(e.id, r);
		} else {
			let i = [];
			if (a) {
				for (let e = 0; e < a.count; e++) {
					let t = a.userData[`device_${e}`];
					if (!t) continue;
					let n = new R.Matrix4();
					a.getMatrixAt(e, n), i.push({
						id: t,
						pos: new R.Vector3().setFromMatrixPosition(n),
						status: this.statusMap.get(t) ?? "unknown"
					});
				}
				this.scene.remove(a), a.material.dispose(), this.instancedMeshes.delete(n);
			}
			i.push({
				id: e.id,
				pos: new R.Vector3(t.position.x, t.position.y, t.position.z),
				status: r
			});
			let o = _i(n), s = Ti(n).clone();
			s.vertexColors = o.hasAttribute("color");
			let c = new R.InstancedMesh(o, s, i.length + 50);
			c.castShadow = !0, c.receiveShadow = !0, c.instanceMatrix.setUsage(R.DynamicDrawUsage), c.count = i.length, c.userData.deviceType = n, i.forEach(({ id: e, pos: t, status: r }, i) => {
				this.dummy.position.copy(t), this.dummy.rotation.set(0, 0, 0), this.dummy.scale.setScalar(1), this.dummy.updateMatrix(), c.setMatrixAt(i, this.dummy.matrix);
				let a = Nn[r] ?? new R.Color(7041664);
				c.setColorAt(i, a), this.instanceIndex.set(e, {
					type: n,
					idx: i
				}), this.instanceColors.set(e, a.clone()), this.statusMap.set(e, r), c.userData[`device_${i}`] = e;
			}), c.instanceMatrix.needsUpdate = !0, c.instanceColor && (c.instanceColor.needsUpdate = !0), this.instancedMeshes.set(n, c), this.scene.add(c), t.operatorState?.acknowledged && this.ackedIds.add(e.id), this._updateBadge(e.id, r);
		}
	}
	updateStatus(e, t) {
		let n = this.instanceIndex.get(e);
		if (!n) return;
		let r = this.instancedMeshes.get(n.type);
		if (!r) return;
		this.statusMap.set(e, t);
		let i = Nn[t].clone();
		this.hasFilter && !this.dimmedIds.has(e) && i.multiplyScalar(.3), r.setColorAt(n.idx, i), r.instanceColor && (r.instanceColor.needsUpdate = !0), this.instanceColors.set(e, i), this._updateBadge(e, t);
	}
	pulseStatus(e, t, n) {
		let r = this.instanceIndex.get(e);
		if (!r) return;
		let i = this.instancedMeshes.get(r.type);
		if (!i) return;
		let a = Nn[t].clone().clone().multiplyScalar(1 + n * 1.5);
		i.setColorAt(r.idx, a), i.instanceColor && (i.instanceColor.needsUpdate = !0);
	}
	setHighlight(e, t) {
		if (this.highlightedId = t ? e : this.highlightedId === e ? null : this.highlightedId, !this.hoverRing) {
			let e = new R.RingGeometry(.74, .78, 48), t = new R.MeshBasicMaterial({
				color: 16317180,
				transparent: !0,
				opacity: .85,
				side: R.DoubleSide,
				depthTest: !1
			});
			this.hoverRing = new R.Mesh(e, t), this.hoverRing.rotation.x = -Math.PI / 2, this.hoverRing.renderOrder = 998, this.scene.add(this.hoverRing);
		}
		if (!this.highlightedId) {
			this.hoverRing.visible = !1;
			return;
		}
		let n = this.getDeviceWorldPos(this.highlightedId);
		n && this.hoverRing.position.set(n.x, .025, n.z), this.hoverRing.visible = !0;
	}
	setMultiHighlight(e) {
		let t = new Set(e);
		this.multiRingGeo || (this.multiRingGeo = new R.RingGeometry(.7, .74, 40), this.multiRingMat = new R.MeshBasicMaterial({
			color: 3718648,
			transparent: !0,
			opacity: .9,
			side: R.DoubleSide,
			depthTest: !1
		})), this.multiRings.forEach((e, n) => {
			t.has(n) || (this.scene.remove(e), this.multiRings.delete(n));
		}), t.forEach((e) => {
			let t = this.getDeviceWorldPos(e);
			if (!t) return;
			let n = this.multiRings.get(e);
			n || (n = new R.Mesh(this.multiRingGeo, this.multiRingMat), n.rotation.x = -Math.PI / 2, n.renderOrder = 997, this.multiRings.set(e, n), this.scene.add(n)), n.position.set(t.x, .02, t.z);
		});
	}
	setSearchFocus(e, t) {
		if (this.clearSearchLabels(), !e.size) return;
		let n = 0;
		e.forEach((e) => {
			if (n >= 80) return;
			let r = this.getDeviceWorldPos(e);
			if (!r) return;
			let i = document.createElement("div");
			i.className = "device-search-label", i.style.cssText = `
        background:rgba(250,204,21,.96);border:1px solid #fef08a;border-radius:6px;
        box-shadow:0 0 18px rgba(250,204,21,.8),0 0 2px #000;
        color:#111827;font-size:${11 * this.labelScale}px;font-weight:700;font-family:monospace;
        padding:3px 8px;white-space:nowrap;pointer-events:none;`, i.textContent = t(e) ?? e;
			let a = new Sn(i);
			a.position.copy(r).add(new R.Vector3(0, 1.7, 0)), this.scene.add(a), this.searchLabels.set(e, a), n += 1;
		});
	}
	getDeviceIdByInstance(e, t) {
		return this.instancedMeshes.get(e)?.userData[`device_${t}`];
	}
	getInstancedMeshes() {
		return [...this.instancedMeshes.values()];
	}
	setPosition(e, t) {
		let n = this.instanceIndex.get(e);
		if (!n) return;
		let r = this.instancedMeshes.get(n.type);
		if (!r) return;
		let i = new R.Matrix4();
		r.getMatrixAt(n.idx, i), i.setPosition(t), r.setMatrixAt(n.idx, i), r.instanceMatrix.needsUpdate = !0, r.computeBoundingSphere();
	}
	applySearchFilter(e, t) {
		if (this.hasFilter = t, !t) {
			this.dimmedIds.clear(), this.clearSearchLabels(), this.instancedMeshes.forEach((e) => {
				for (let t = 0; t < e.count; t++) {
					let n = e.userData[`device_${t}`];
					if (!n) continue;
					let r = this.statusMap.get(n);
					if (!r) continue;
					let i = Nn[r].clone();
					e.setColorAt(t, i), this.instanceColors.set(n, i);
				}
				e.instanceColor && (e.instanceColor.needsUpdate = !0);
			});
			return;
		}
		this.dimmedIds = e, this.instancedMeshes.forEach((t) => {
			for (let n = 0; n < t.count; n++) {
				let r = t.userData[`device_${n}`];
				if (!r) continue;
				let i = e.has(r), a = this.statusMap.get(r);
				if (!a) continue;
				let o = Nn[a].clone(), s = i ? o.clone() : o.clone().multiplyScalar(.3);
				t.setColorAt(n, s), this.instanceColors.set(r, s);
			}
			t.instanceColor && (t.instanceColor.needsUpdate = !0);
		});
	}
	setLabelScale(e) {
		if (e !== this.labelScale && (this.labelScale = e, [...this.statusBadges.keys()].forEach((e) => {
			let t = this.statusMap.get(e);
			t && this._updateBadge(e, t);
		}), this.searchLabels.size)) {
			let e = new Set(this.searchLabels.keys()), t = new Map([...this.searchLabels.entries()].map(([e, t]) => [e, t.element.textContent ?? e]));
			this.setSearchFocus(e, (e) => t.get(e));
		}
	}
	recolorAll() {
		this.instancedMeshes.forEach((e) => {
			for (let t = 0; t < e.count; t++) {
				let n = e.userData[`device_${t}`];
				if (!n) continue;
				let r = this.statusMap.get(n);
				if (!r) continue;
				let i = Nn[r].clone(), a = !this.hasFilter || this.dimmedIds.has(n) ? i.clone() : i.clone().multiplyScalar(.3);
				e.setColorAt(t, a), this.instanceColors.set(n, a);
			}
			e.instanceColor && (e.instanceColor.needsUpdate = !0);
		}), this.statusMap.forEach((e, t) => this._updateBadge(t, e));
	}
	setSelectedDevice(e) {
		if (this.selectedDeviceId = e, !e) {
			this.selectionRing && (this.selectionRing.visible = !1);
			return;
		}
		if (!this.selectionRing) {
			let e = new R.RingGeometry(.65, .69, 48), t = new R.MeshBasicMaterial({
				color: 6333946,
				transparent: !0,
				opacity: .95,
				side: R.DoubleSide,
				depthTest: !1
			});
			this.selectionRing = new R.Mesh(e, t), this.selectionRing.rotation.x = -Math.PI / 2, this.selectionRing.renderOrder = 999, this.scene.add(this.selectionRing);
		}
		this.selectionRing.visible = !0, this.tick();
	}
	tick(e, t) {
		if (this.selectedDeviceId && this.selectionRing?.visible) {
			let e = this.getDeviceWorldPos(this.selectedDeviceId);
			e && this.selectionRing.position.set(e.x, .03, e.z);
		}
		if (this.highlightedId && this.hoverRing?.visible) {
			let e = this.getDeviceWorldPos(this.highlightedId);
			e && this.hoverRing.position.set(e.x, .025, e.z);
		}
		if (this.multiRings.size && this.multiRings.forEach((e, t) => {
			let n = this.getDeviceWorldPos(t);
			n && e.position.set(n.x, .02, n.z);
		}), this.statusBadges.forEach((e, t) => {
			let n = this.getDeviceWorldPos(t);
			n && e.position.copy(n).add(new R.Vector3(0, 1.3, 0));
		}), this.searchLabels.forEach((e, t) => {
			let n = this.getDeviceWorldPos(t);
			n && e.position.copy(n).add(new R.Vector3(0, 1.7, 0));
		}), e && t && this.searchLabels.size && performance.now() >= this.nextSearchLabelLayout && (this.nextSearchLabelLayout = performance.now() + 150, this._layoutSearchLabels(e, t)), e && performance.now() >= this.nextTypeLabelUpdate) {
			this.nextTypeLabelUpdate = performance.now() + 150;
			let t = [];
			this.instanceIndex.forEach((n, r) => {
				if (this.hasFilter && !this.dimmedIds.has(r)) return;
				let i = this.getDeviceWorldPos(r), a = i.distanceTo(e.position), o = i.clone().project(e);
				a < 16 && Math.abs(o.x) < 1 && Math.abs(o.y) < 1 && Math.abs(o.z) < 1 && t.push({
					id: r,
					distance: a,
					pos: i
				});
			}), t.sort((e, t) => e.distance - t.distance || e.id.localeCompare(t.id));
			let n = /* @__PURE__ */ new Set();
			for (let { id: e, pos: r } of t.slice(0, 16)) {
				n.add(e);
				let t = this.typeLabels.get(e);
				if (!t) {
					let n = this.instanceIndex.get(e).type, r = document.createElement("div");
					r.className = "device-type-label", r.textContent = Gn(n), r.title = Kn(n), r.style.cssText = "padding:2px 5px;border-radius:4px;background:#0f172aee;border:1px solid #526780;color:#e2e8f0;font:600 10px monospace;pointer-events:none;white-space:nowrap;", t = new Sn(r), this.typeLabels.set(e, t), this.scene.add(t);
				}
				t.position.copy(r).add(new R.Vector3(0, .45, 0));
			}
			this.typeLabels.forEach((e, t) => {
				n.has(t) || (this.scene.remove(e), e.element.remove(), this.typeLabels.delete(t));
			});
		}
	}
	_layoutSearchLabels(e, t) {
		let n = [];
		this.searchLabels.forEach((r, i) => {
			let a = r.getWorldPosition(new R.Vector3()).project(e);
			if (a.z < -1 || a.z > 1 || !Number.isFinite(a.x + a.y)) {
				r.visible = !1, r.element.style.visibility = "hidden";
				return;
			}
			let o = bi(r.element, this.labelSizes), s = this.statusMap.get(i);
			n.push({
				id: i,
				x: (a.x + 1) * t.width / 2 - o.width / 2,
				y: (1 - a.y) * t.height / 2 - o.height / 2,
				width: o.width,
				height: o.height,
				priority: s ? wi[s] : 0
			});
		});
		let r = xi(n, t.width, t.height);
		this.searchLabels.forEach((e, t) => {
			let n = r.has(t);
			e.visible = n, e.element.style.visibility = n ? "visible" : "hidden";
		});
	}
	getLabelObstacles() {
		return [
			...this.statusBadges.values(),
			...this.searchLabels.values(),
			...this.typeLabels.values()
		];
	}
	getDeviceWorldPos(e) {
		let t = this.instanceIndex.get(e);
		if (!t) return null;
		let n = this.instancedMeshes.get(t.type);
		if (!n) return null;
		let r = new R.Matrix4();
		n.getMatrixAt(t.idx, r);
		let i = new R.Vector3();
		return i.setFromMatrixPosition(r), i;
	}
	dispose() {
		this.typeLabels.forEach((e) => {
			this.scene.remove(e), e.element.remove();
		}), this.typeLabels.clear(), this.clearSearchLabels(), this.statusBadges.forEach((e) => {
			this.scene.remove(e), e.element.remove();
		}), this.statusBadges.clear(), this.badgeSeverity.clear(), this.ackedIds.clear(), this.selectionRing &&= (this.scene.remove(this.selectionRing), this.selectionRing.geometry.dispose(), this.selectionRing.material.dispose(), null), this.hoverRing &&= (this.scene.remove(this.hoverRing), this.hoverRing.geometry.dispose(), this.hoverRing.material.dispose(), null), this.multiRings.forEach((e) => this.scene.remove(e)), this.multiRings.clear(), this.multiRingGeo?.dispose(), this.multiRingMat?.dispose(), this.multiRingGeo = null, this.multiRingMat = null, this.selectedDeviceId = null, this.highlightedId = null, this.instancedMeshes.forEach((e) => {
			e.material.dispose(), this.scene.remove(e);
		}), this.instancedMeshes.clear(), this.instanceIndex.clear(), Si.forEach((e) => e.dispose()), Si.clear(), yi();
	}
	clearSearchLabels() {
		this.searchLabels.forEach((e) => {
			this.scene.remove(e), e.element.remove();
		}), this.searchLabels.clear();
	}
}, Di = {
	building: {
		floor: 857382,
		edge: 1714762
	},
	floor: {
		floor: 857382,
		edge: 1714762
	},
	site: {
		floor: 857382,
		edge: 1714762
	},
	zone: {
		floor: 990773,
		edge: 1979744
	},
	security_zone: {
		floor: 2755082,
		edge: 5902352
	},
	service: {
		floor: 662058,
		edge: 1718874
	},
	custom_group: {
		floor: 1710602,
		edge: 3815962
	},
	external: {
		floor: 1706538,
		edge: 3807834
	},
	cloud: {
		floor: 662058,
		edge: 1718890
	},
	rack: {
		floor: 1713472,
		edge: 2771594
	}
}, Oi = class {
	scene;
	objects = /* @__PURE__ */ new Map();
	selectedIds = /* @__PURE__ */ new Set();
	labelSizes = /* @__PURE__ */ new WeakMap();
	constructor(e) {
		this.scene = e;
	}
	loadSpaces(e) {
		e.filter((e) => !e.archived).forEach((e) => this.addSpace(e));
	}
	addSpace(e) {
		if (this.objects.has(e.id)) return;
		let t = Di[e.type] ?? Di.zone, n = new R.Group(), r = e.position ?? {
			x: 0,
			y: 0,
			z: 0
		}, i = e.size ?? {
			width: 10,
			height: .1,
			depth: 10
		};
		n.position.set(r.x, r.y, r.z), n.userData.spaceId = e.id, e.type === "rack" ? this._buildRack(n, e, i, t) : e.type === "site" || e.type === "floor" || e.type === "building" ? this._buildSite(n, e, i, t) : this._buildZone(n, e, i, t);
		let a = document.createElement("div");
		a.className = "space-badge", a.style.cssText = "\n      background:rgba(9,13,24,.90);border:1px solid #2a4a8a;border-radius:5px;\n      padding:2px 7px;font-size:10px;font-family:monospace;color:#94a3b8;\n      white-space:nowrap;pointer-events:none;", a.textContent = e.name, a.title = e.name, a.dataset.spaceId = e.id;
		let o = new Sn(a);
		o.position.set(0, .3, i.depth / 2 + .35), o.visible = this.shouldShowBadge(e.type, e.source), n.add(o);
		let s = e.type === "rack" ? .25 : .4, c = new R.BoxGeometry(i.width, s, i.depth);
		c.computeBoundsTree();
		let l = new R.Mesh(c, new R.MeshBasicMaterial({ visible: !1 }));
		l.position.y = s / 2, l.userData.spaceId = e.id, l.userData.spaceType = e.type, l.userData.spaceSource = e.source, n.add(l), this.scene.add(n), this.objects.set(e.id, {
			group: n,
			hitMesh: l,
			badgeEl: a,
			badge: o
		}), this.applyBadgeLod();
	}
	_buildRack(e, t, n, r) {
		let i = n.width, a = n.depth, o = new R.Mesh(new R.BoxGeometry(i, .15, a), new R.MeshStandardMaterial({
			color: r.floor,
			roughness: .7,
			metalness: .3,
			transparent: !0,
			opacity: .55,
			polygonOffset: !0,
			polygonOffsetFactor: -6,
			polygonOffsetUnits: -6
		}));
		o.position.y = .075, o.receiveShadow = !0, e.add(o);
		let s = new R.EdgesGeometry(new R.BoxGeometry(i, .15, a)), c = new R.LineSegments(s, new R.LineBasicMaterial({
			color: r.edge,
			transparent: !0,
			opacity: .8
		}));
		c.position.y = .075, e.add(c);
	}
	_buildSite(e, t, n, r) {
		let i = new R.Mesh(new R.BoxGeometry(n.width, .28, n.depth), new R.MeshStandardMaterial({
			color: t.color ?? 1516859,
			roughness: .9,
			polygonOffset: !0,
			polygonOffsetFactor: -2,
			polygonOffsetUnits: -2
		}));
		i.position.y = -.09, i.receiveShadow = !0, i.castShadow = !0, e.add(i);
		let a = [], o = Math.max(2, Math.max(n.width, n.depth) / 40);
		for (let e = -n.width / 2 + o; e < n.width / 2; e += o) a.push(new R.Vector3(e, .055, -n.depth / 2), new R.Vector3(e, .055, n.depth / 2));
		for (let e = -n.depth / 2 + o; e < n.depth / 2; e += o) a.push(new R.Vector3(-n.width / 2, .055, e), new R.Vector3(n.width / 2, .055, e));
		e.add(new R.LineSegments(new R.BufferGeometry().setFromPoints(a), new R.LineBasicMaterial({
			color: 3426400,
			transparent: !0,
			opacity: .32
		})));
		let s = new R.LineLoop(new R.BufferGeometry().setFromPoints([
			new R.Vector3(-n.width / 2, .06, -n.depth / 2),
			new R.Vector3(n.width / 2, .06, -n.depth / 2),
			new R.Vector3(n.width / 2, .06, n.depth / 2),
			new R.Vector3(-n.width / 2, .06, n.depth / 2)
		]), new R.LineBasicMaterial({
			color: r.edge,
			transparent: !0,
			opacity: .5
		}));
		e.add(s);
	}
	_buildZone(e, t, n, r) {
		let i = t.color ? parseInt(t.color.slice(1), 16) : r.floor, a = new R.Mesh(new R.PlaneGeometry(n.width, n.depth), new R.MeshStandardMaterial({
			color: i,
			transparent: !0,
			opacity: .28,
			roughness: 1,
			polygonOffset: !0,
			polygonOffsetFactor: -4,
			polygonOffsetUnits: -4
		}));
		a.rotation.x = -Math.PI / 2, a.position.y = .12, e.add(a);
		let o = new R.EdgesGeometry(new R.BoxGeometry(n.width, .02, n.depth)), s = new R.LineSegments(o, new R.LineBasicMaterial({
			color: r.edge,
			transparent: !0,
			opacity: .5
		}));
		s.position.y = .13, e.add(s);
	}
	setSelected(e, t) {
		let n = this.objects.get(e);
		if (!n) return;
		t ? this.selectedIds.add(e) : this.selectedIds.delete(e), n.badgeEl.style.borderColor = t ? "#7dd3fc" : "#2a4a8a", n.badgeEl.style.color = t ? "#e0f2fe" : "#b4c5dc";
		let r = n.group.children.find((e) => e instanceof R.Mesh && e !== n.hitMesh);
		if (r) {
			let e = r.material;
			e.emissive = t ? new R.Color(22015) : new R.Color(0), e.emissiveIntensity = t ? .3 : 0;
		}
		let i = n.hitMesh.userData.spaceType, a = n.hitMesh.userData.spaceSource;
		n.badge.visible = t || this.shouldShowBadge(i, a);
	}
	updateBadge(e, t) {
		let n = this.objects.get(e);
		n && (n.badgeEl.textContent = t, n.badgeEl.title = t);
	}
	applyBadgeLod(e = 0) {
		this.objects.forEach((t) => {
			let n = t.hitMesh.userData.spaceType, r = t.hitMesh.userData.spaceSource;
			t.badge.visible = this.selectedIds.has(t.group.userData.spaceId) || this.shouldShowBadge(n, r, e);
		});
	}
	updateLod(e, t, n, r = [], i = []) {
		let a = e.position.distanceTo(t);
		if (this.applyBadgeLod(a), !n) return;
		e.updateMatrixWorld();
		let o = (t) => {
			let r = t.getWorldPosition(new R.Vector3()).project(e);
			if (r.z < -1 || r.z > 1 || !Number.isFinite(r.x + r.y)) return null;
			let { width: i, height: a } = bi(t.element, this.labelSizes);
			return {
				x: (r.x + 1) * n.width / 2 - i / 2,
				y: (1 - r.y) * n.height / 2 - a / 2,
				width: i,
				height: a
			};
		}, s = r.filter((e) => e.visible).map(o).filter((e) => e !== null), c = [];
		this.objects.forEach((e, t) => {
			if (!e.badge.visible) return;
			let n = o(e.badge);
			n && c.push({
				...n,
				id: t,
				priority: this.selectedIds.has(t) ? 100 : e.hitMesh.userData.spaceType === "rack" ? 40 : 20
			});
		});
		let l = xi(c, n.width, n.height, [...s, ...i]);
		this.objects.forEach((e, t) => {
			e.badgeEl.style.visibility = l.has(t) ? "visible" : "hidden";
		});
	}
	setPosition(e, t) {
		let n = this.objects.get(e);
		n && n.group.position.set(t.x, t.y, t.z);
	}
	removeSpace(e) {
		let t = this.objects.get(e);
		t && (this.disposeSpaceObject(t), this.objects.delete(e), this.selectedIds.delete(e), this.applyBadgeLod());
	}
	getHitMeshes() {
		return [...this.objects.values()].map((e) => e.hitMesh);
	}
	getSpaceWorldPos(e) {
		let t = this.objects.get(e);
		return t ? t.group.position.clone() : new R.Vector3();
	}
	shouldShowBadge(e, t, n = 0) {
		return e === "site" || e === "floor" || e === "building" ? !0 : e === "rack" && t === "import" || n > 120 ? !1 : e === "rack" || e === "zone" || e === "cloud";
	}
	dispose() {
		this.objects.forEach((e) => this.disposeSpaceObject(e)), this.objects.clear(), this.selectedIds.clear();
	}
	disposeSpaceObject(e) {
		this.scene.remove(e.group), e.badge.element.remove(), e.group.traverse((e) => {
			if (e instanceof R.Mesh || e instanceof R.LineSegments || e instanceof R.LineLoop) {
				e.geometry?.disposeBoundsTree?.(), e.geometry?.dispose();
				let t = e.material;
				Array.isArray(t) ? t.forEach((e) => e.dispose()) : t?.dispose();
			}
		});
	}
}, ki = new U(), Ai = new K(), ji = class extends me {
	constructor() {
		super(), this.isLineSegmentsGeometry = !0, this.type = "LineSegmentsGeometry", this.setIndex([
			0,
			2,
			1,
			2,
			3,
			1,
			2,
			4,
			3,
			4,
			5,
			3,
			4,
			6,
			5,
			6,
			7,
			5
		]), this.setAttribute("position", new le([
			-1,
			2,
			0,
			1,
			2,
			0,
			-1,
			1,
			0,
			1,
			1,
			0,
			-1,
			0,
			0,
			1,
			0,
			0,
			-1,
			-1,
			0,
			1,
			-1,
			0
		], 3)), this.setAttribute("uv", new le([
			-1,
			2,
			1,
			2,
			-1,
			1,
			1,
			1,
			-1,
			-1,
			1,
			-1,
			-1,
			-2,
			1,
			-2
		], 2));
	}
	applyMatrix4(e) {
		let t = this.attributes.instanceStart, n = this.attributes.instanceEnd;
		return t !== void 0 && (t.applyMatrix4(e), n.applyMatrix4(e), t.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
	}
	setPositions(e) {
		let t;
		e instanceof Float32Array ? t = e : Array.isArray(e) && (t = new Float32Array(e));
		let n = new he(t, 6, 1);
		return this.setAttribute("instanceStart", new ve(n, 3, 0)), this.setAttribute("instanceEnd", new ve(n, 3, 3)), this.instanceCount = this.attributes.instanceStart.count, this.computeBoundingBox(), this.computeBoundingSphere(), this;
	}
	setColors(e) {
		let t;
		e instanceof Float32Array ? t = e : Array.isArray(e) && (t = new Float32Array(e));
		let n = new he(t, 6, 1);
		return this.setAttribute("instanceColorStart", new ve(n, 3, 0)), this.setAttribute("instanceColorEnd", new ve(n, 3, 3)), this;
	}
	fromWireframeGeometry(e) {
		return this.setPositions(e.attributes.position.array), this;
	}
	fromEdgesGeometry(e) {
		return this.setPositions(e.attributes.position.array), this;
	}
	fromMesh(e) {
		return this.fromWireframeGeometry(new wt(e.geometry)), this;
	}
	fromLineSegments(e) {
		let t = e.geometry;
		return this.setPositions(t.attributes.position.array), this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new U());
		let e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
		e !== void 0 && t !== void 0 && (this.boundingBox.setFromBufferAttribute(e), ki.setFromBufferAttribute(t), this.boundingBox.union(ki));
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new ut()), this.boundingBox === null && this.computeBoundingBox();
		let e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
		if (e !== void 0 && t !== void 0) {
			let n = this.boundingSphere.center;
			this.boundingBox.getCenter(n);
			let r = 0;
			for (let i = 0, a = e.count; i < a; i++) Ai.fromBufferAttribute(e, i), r = Math.max(r, n.distanceToSquared(Ai)), Ai.fromBufferAttribute(t, i), r = Math.max(r, n.distanceToSquared(Ai));
			this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
		}
	}
	toJSON() {}
};
bt.line = {
	worldUnits: { value: 1 },
	linewidth: { value: 1 },
	resolution: { value: new G(1, 1) },
	dashOffset: { value: 0 },
	dashScale: { value: 1 },
	dashSize: { value: 1 },
	gapSize: { value: 1 }
}, ot.line = {
	uniforms: xt.merge([
		bt.common,
		bt.fog,
		bt.line
	]),
	vertexShader: "\n		#include <common>\n		#include <color_pars_vertex>\n		#include <fog_pars_vertex>\n		#include <logdepthbuf_pars_vertex>\n		#include <clipping_planes_pars_vertex>\n\n		uniform float linewidth;\n		uniform vec2 resolution;\n\n		attribute vec3 instanceStart;\n		attribute vec3 instanceEnd;\n\n		attribute vec3 instanceColorStart;\n		attribute vec3 instanceColorEnd;\n\n		#ifdef WORLD_UNITS\n\n			varying vec4 worldPos;\n			varying vec3 worldStart;\n			varying vec3 worldEnd;\n\n			#ifdef USE_DASH\n\n				varying vec2 vUv;\n\n			#endif\n\n		#else\n\n			varying vec2 vUv;\n\n		#endif\n\n		#ifdef USE_DASH\n\n			uniform float dashScale;\n			attribute float instanceDistanceStart;\n			attribute float instanceDistanceEnd;\n			varying float vLineDistance;\n\n		#endif\n\n		void trimSegment( const in vec4 start, inout vec4 end ) {\n\n			// trim end segment so it terminates between the camera plane and the near plane\n\n			// conservative estimate of the near plane\n			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column\n			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column\n			float nearEstimate = - 0.5 * b / a;\n\n			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );\n\n			end.xyz = mix( start.xyz, end.xyz, alpha );\n\n		}\n\n		void main() {\n\n			#ifdef USE_COLOR\n\n				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;\n\n			#endif\n\n			#ifdef USE_DASH\n\n				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;\n				vUv = uv;\n\n			#endif\n\n			float aspect = resolution.x / resolution.y;\n\n			// camera space\n			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );\n			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );\n\n			#ifdef WORLD_UNITS\n\n				worldStart = start.xyz;\n				worldEnd = end.xyz;\n\n			#else\n\n				vUv = uv;\n\n			#endif\n\n			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane\n			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space\n			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly\n			// perhaps there is a more elegant solution -- WestLangley\n\n			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column\n\n			if ( perspective ) {\n\n				if ( start.z < 0.0 && end.z >= 0.0 ) {\n\n					trimSegment( start, end );\n\n				} else if ( end.z < 0.0 && start.z >= 0.0 ) {\n\n					trimSegment( end, start );\n\n				}\n\n			}\n\n			// clip space\n			vec4 clipStart = projectionMatrix * start;\n			vec4 clipEnd = projectionMatrix * end;\n\n			// ndc space\n			vec3 ndcStart = clipStart.xyz / clipStart.w;\n			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;\n\n			// direction\n			vec2 dir = ndcEnd.xy - ndcStart.xy;\n\n			// account for clip-space aspect ratio\n			dir.x *= aspect;\n			dir = normalize( dir );\n\n			#ifdef WORLD_UNITS\n\n				vec3 worldDir = normalize( end.xyz - start.xyz );\n				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );\n				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );\n				vec3 worldFwd = cross( worldDir, worldUp );\n				worldPos = position.y < 0.5 ? start: end;\n\n				// height offset\n				float hw = linewidth * 0.5;\n				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;\n\n				// don't extend the line if we're rendering dashes because we\n				// won't be rendering the endcaps\n				#ifndef USE_DASH\n\n					// cap extension\n					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;\n\n					// add width to the box\n					worldPos.xyz += worldFwd * hw;\n\n					// endcaps\n					if ( position.y > 1.0 || position.y < 0.0 ) {\n\n						worldPos.xyz -= worldFwd * 2.0 * hw;\n\n					}\n\n				#endif\n\n				// project the worldpos\n				vec4 clip = projectionMatrix * worldPos;\n\n				// shift the depth of the projected points so the line\n				// segments overlap neatly\n				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;\n				clip.z = clipPose.z * clip.w;\n\n			#else\n\n				vec2 offset = vec2( dir.y, - dir.x );\n				// undo aspect ratio adjustment\n				dir.x /= aspect;\n				offset.x /= aspect;\n\n				// sign flip\n				if ( position.x < 0.0 ) offset *= - 1.0;\n\n				// endcaps\n				if ( position.y < 0.0 ) {\n\n					offset += - dir;\n\n				} else if ( position.y > 1.0 ) {\n\n					offset += dir;\n\n				}\n\n				// adjust for linewidth\n				offset *= linewidth;\n\n				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...\n				offset /= resolution.y;\n\n				// select end\n				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;\n\n				// back to clip space\n				offset *= clip.w;\n\n				clip.xy += offset;\n\n			#endif\n\n			gl_Position = clip;\n\n			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation\n\n			#include <logdepthbuf_vertex>\n			#include <clipping_planes_vertex>\n			#include <fog_vertex>\n\n		}\n		",
	fragmentShader: "\n		uniform vec3 diffuse;\n		uniform float opacity;\n		uniform float linewidth;\n\n		#ifdef USE_DASH\n\n			uniform float dashOffset;\n			uniform float dashSize;\n			uniform float gapSize;\n\n		#endif\n\n		varying float vLineDistance;\n\n		#ifdef WORLD_UNITS\n\n			varying vec4 worldPos;\n			varying vec3 worldStart;\n			varying vec3 worldEnd;\n\n			#ifdef USE_DASH\n\n				varying vec2 vUv;\n\n			#endif\n\n		#else\n\n			varying vec2 vUv;\n\n		#endif\n\n		#include <common>\n		#include <color_pars_fragment>\n		#include <fog_pars_fragment>\n		#include <logdepthbuf_pars_fragment>\n		#include <clipping_planes_pars_fragment>\n\n		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {\n\n			float mua;\n			float mub;\n\n			vec3 p13 = p1 - p3;\n			vec3 p43 = p4 - p3;\n\n			vec3 p21 = p2 - p1;\n\n			float d1343 = dot( p13, p43 );\n			float d4321 = dot( p43, p21 );\n			float d1321 = dot( p13, p21 );\n			float d4343 = dot( p43, p43 );\n			float d2121 = dot( p21, p21 );\n\n			float denom = d2121 * d4343 - d4321 * d4321;\n\n			float numer = d1343 * d4321 - d1321 * d4343;\n\n			mua = numer / denom;\n			mua = clamp( mua, 0.0, 1.0 );\n			mub = ( d1343 + d4321 * ( mua ) ) / d4343;\n			mub = clamp( mub, 0.0, 1.0 );\n\n			return vec2( mua, mub );\n\n		}\n\n		void main() {\n\n			float alpha = opacity;\n			vec4 diffuseColor = vec4( diffuse, alpha );\n\n			#include <clipping_planes_fragment>\n\n			#ifdef USE_DASH\n\n				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps\n\n				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX\n\n			#endif\n\n			#ifdef WORLD_UNITS\n\n				// Find the closest points on the view ray and the line segment\n				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;\n				vec3 lineDir = worldEnd - worldStart;\n				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );\n\n				vec3 p1 = worldStart + lineDir * params.x;\n				vec3 p2 = rayEnd * params.y;\n				vec3 delta = p1 - p2;\n				float len = length( delta );\n				float norm = len / linewidth;\n\n				#ifndef USE_DASH\n\n					#ifdef USE_ALPHA_TO_COVERAGE\n\n						float dnorm = fwidth( norm );\n						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );\n\n					#else\n\n						if ( norm > 0.5 ) {\n\n							discard;\n\n						}\n\n					#endif\n\n				#endif\n\n			#else\n\n				#ifdef USE_ALPHA_TO_COVERAGE\n\n					// artifacts appear on some hardware if a derivative is taken within a conditional\n					float a = vUv.x;\n					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n					float len2 = a * a + b * b;\n					float dlen = fwidth( len2 );\n\n					if ( abs( vUv.y ) > 1.0 ) {\n\n						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );\n\n					}\n\n				#else\n\n					if ( abs( vUv.y ) > 1.0 ) {\n\n						float a = vUv.x;\n						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n						float len2 = a * a + b * b;\n\n						if ( len2 > 1.0 ) discard;\n\n					}\n\n				#endif\n\n			#endif\n\n			#include <logdepthbuf_fragment>\n			#include <color_fragment>\n\n			gl_FragColor = vec4( diffuseColor.rgb, alpha );\n\n			#include <tonemapping_fragment>\n			#include <colorspace_fragment>\n			#include <fog_fragment>\n			#include <premultiplied_alpha_fragment>\n\n		}\n		"
};
var Mi = class extends st {
	constructor(e) {
		super({
			type: "LineMaterial",
			uniforms: xt.clone(ot.line.uniforms),
			vertexShader: ot.line.vertexShader,
			fragmentShader: ot.line.fragmentShader,
			clipping: !0
		}), this.isLineMaterial = !0, this.setValues(e);
	}
	get color() {
		return this.uniforms.diffuse.value;
	}
	set color(e) {
		this.uniforms.diffuse.value = e;
	}
	get worldUnits() {
		return "WORLD_UNITS" in this.defines;
	}
	set worldUnits(e) {
		e === !0 !== this.worldUnits && (this.needsUpdate = !0), e === !0 ? this.defines.WORLD_UNITS = "" : delete this.defines.WORLD_UNITS;
	}
	get linewidth() {
		return this.uniforms.linewidth.value;
	}
	set linewidth(e) {
		this.uniforms.linewidth && (this.uniforms.linewidth.value = e);
	}
	get dashed() {
		return "USE_DASH" in this.defines;
	}
	set dashed(e) {
		e === !0 !== this.dashed && (this.needsUpdate = !0), e === !0 ? this.defines.USE_DASH = "" : delete this.defines.USE_DASH;
	}
	get dashScale() {
		return this.uniforms.dashScale.value;
	}
	set dashScale(e) {
		this.uniforms.dashScale.value = e;
	}
	get dashSize() {
		return this.uniforms.dashSize.value;
	}
	set dashSize(e) {
		this.uniforms.dashSize.value = e;
	}
	get dashOffset() {
		return this.uniforms.dashOffset.value;
	}
	set dashOffset(e) {
		this.uniforms.dashOffset.value = e;
	}
	get gapSize() {
		return this.uniforms.gapSize.value;
	}
	set gapSize(e) {
		this.uniforms.gapSize.value = e;
	}
	get opacity() {
		return this.uniforms.opacity.value;
	}
	set opacity(e) {
		this.uniforms && (this.uniforms.opacity.value = e);
	}
	get resolution() {
		return this.uniforms.resolution.value;
	}
	set resolution(e) {
		this.uniforms.resolution.value.copy(e);
	}
	get alphaToCoverage() {
		return "USE_ALPHA_TO_COVERAGE" in this.defines;
	}
	set alphaToCoverage(e) {
		this.defines && (e === !0 !== this.alphaToCoverage && (this.needsUpdate = !0), e === !0 ? this.defines.USE_ALPHA_TO_COVERAGE = "" : delete this.defines.USE_ALPHA_TO_COVERAGE);
	}
}, Ni = new St(), Pi = new K(), Fi = new K(), Ii = new St(), Li = new St(), Ri = new St(), zi = new K(), Bi = new Ie(), Vi = new Ce(), Hi = new K(), Ui = new U(), Wi = new ut(), Gi = new St(), Ki, qi;
function Ji(e, t, n) {
	return Gi.set(0, 0, -t, 1).applyMatrix4(e.projectionMatrix), Gi.multiplyScalar(1 / Gi.w), Gi.x = qi / n.width, Gi.y = qi / n.height, Gi.applyMatrix4(e.projectionMatrixInverse), Gi.multiplyScalar(1 / Gi.w), Math.abs(Math.max(Gi.x, Gi.y));
}
function Yi(e, t) {
	let n = e.matrixWorld, r = e.geometry, i = r.attributes.instanceStart, a = r.attributes.instanceEnd, o = Math.min(r.instanceCount, i.count);
	for (let r = 0, s = o; r < s; r++) {
		Vi.start.fromBufferAttribute(i, r), Vi.end.fromBufferAttribute(a, r), Vi.applyMatrix4(n);
		let o = new K(), s = new K();
		Ki.distanceSqToSegment(Vi.start, Vi.end, s, o), s.distanceTo(o) < qi * .5 && t.push({
			point: s,
			pointOnLine: o,
			distance: Ki.origin.distanceTo(s),
			object: e,
			face: null,
			faceIndex: r,
			uv: null,
			uv1: null
		});
	}
}
function Xi(e, t, n) {
	let r = t.projectionMatrix, i = e.material.resolution, a = e.matrixWorld, o = e.geometry, s = o.attributes.instanceStart, c = o.attributes.instanceEnd, l = Math.min(o.instanceCount, s.count), u = -t.near;
	Ki.at(1, Ri), Ri.w = 1, Ri.applyMatrix4(t.matrixWorldInverse), Ri.applyMatrix4(r), Ri.multiplyScalar(1 / Ri.w), Ri.x *= i.x / 2, Ri.y *= i.y / 2, Ri.z = 0, zi.copy(Ri), Bi.multiplyMatrices(t.matrixWorldInverse, a);
	for (let t = 0, o = l; t < o; t++) {
		if (Ii.fromBufferAttribute(s, t), Li.fromBufferAttribute(c, t), Ii.w = 1, Li.w = 1, Ii.applyMatrix4(Bi), Li.applyMatrix4(Bi), Ii.z > u && Li.z > u) continue;
		if (Ii.z > u) {
			let e = Ii.z - Li.z, t = (Ii.z - u) / e;
			Ii.lerp(Li, t);
		} else if (Li.z > u) {
			let e = Li.z - Ii.z, t = (Li.z - u) / e;
			Li.lerp(Ii, t);
		}
		Ii.applyMatrix4(r), Li.applyMatrix4(r), Ii.multiplyScalar(1 / Ii.w), Li.multiplyScalar(1 / Li.w), Ii.x *= i.x / 2, Ii.y *= i.y / 2, Li.x *= i.x / 2, Li.y *= i.y / 2, Vi.start.copy(Ii), Vi.start.z = 0, Vi.end.copy(Li), Vi.end.z = 0;
		let o = Vi.closestPointToPointParameter(zi, !0);
		Vi.at(o, Hi);
		let l = Fe.lerp(Ii.z, Li.z, o), d = l >= -1 && l <= 1, f = zi.distanceTo(Hi) < qi * .5;
		if (d && f) {
			Vi.start.fromBufferAttribute(s, t), Vi.end.fromBufferAttribute(c, t), Vi.start.applyMatrix4(a), Vi.end.applyMatrix4(a);
			let r = new K(), i = new K();
			Ki.distanceSqToSegment(Vi.start, Vi.end, i, r), n.push({
				point: i,
				pointOnLine: r,
				distance: Ki.origin.distanceTo(i),
				object: e,
				face: null,
				faceIndex: t,
				uv: null,
				uv1: null
			});
		}
	}
}
var Zi = class extends Le {
	constructor(e = new ji(), t = new Mi({ color: Math.random() * 16777215 })) {
		super(e, t), this.isLineSegments2 = !0, this.type = "LineSegments2";
	}
	computeLineDistances() {
		let e = this.geometry, t = e.attributes.instanceStart, n = e.attributes.instanceEnd, r = new Float32Array(2 * t.count);
		for (let e = 0, i = 0, a = t.count; e < a; e++, i += 2) Pi.fromBufferAttribute(t, e), Fi.fromBufferAttribute(n, e), r[i] = i === 0 ? 0 : r[i - 1], r[i + 1] = r[i] + Pi.distanceTo(Fi);
		let i = new he(r, 2, 1);
		return e.setAttribute("instanceDistanceStart", new ve(i, 1, 0)), e.setAttribute("instanceDistanceEnd", new ve(i, 1, 1)), this;
	}
	raycast(e, t) {
		let n = this.material.worldUnits, r = e.camera;
		r === null && !n && console.error("LineSegments2: \"Raycaster.camera\" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.");
		let i = e.params.Line2 === void 0 ? 0 : e.params.Line2.threshold || 0;
		Ki = e.ray;
		let a = this.matrixWorld, o = this.geometry, s = this.material;
		qi = s.linewidth + i, o.boundingSphere === null && o.computeBoundingSphere(), Wi.copy(o.boundingSphere).applyMatrix4(a);
		let c;
		if (c = n ? qi * .5 : Ji(r, Math.max(r.near, Wi.distanceToPoint(Ki.origin)), s.resolution), Wi.radius += c, Ki.intersectsSphere(Wi) === !1) return;
		o.boundingBox === null && o.computeBoundingBox(), Ui.copy(o.boundingBox).applyMatrix4(a);
		let l;
		l = n ? qi * .5 : Ji(r, Math.max(r.near, Ui.distanceToPoint(Ki.origin)), s.resolution), Ui.expandByScalar(l), Ki.intersectsBox(Ui) !== !1 && (n ? Yi(this, t) : Xi(this, r, t));
	}
	onBeforeRender(e) {
		let t = this.material.uniforms;
		t && t.resolution && (e.getViewport(Ni), this.material.uniforms.resolution.value.set(Ni.z, Ni.w));
	}
}, Qi = class extends ji {
	constructor() {
		super(), this.isLineGeometry = !0, this.type = "LineGeometry";
	}
	setPositions(e) {
		let t = e.length - 3, n = new Float32Array(2 * t);
		for (let r = 0; r < t; r += 3) n[2 * r] = e[r], n[2 * r + 1] = e[r + 1], n[2 * r + 2] = e[r + 2], n[2 * r + 3] = e[r + 3], n[2 * r + 4] = e[r + 4], n[2 * r + 5] = e[r + 5];
		return super.setPositions(n), this;
	}
	setColors(e) {
		let t = e.length - 3, n = new Float32Array(2 * t);
		for (let r = 0; r < t; r += 3) n[2 * r] = e[r], n[2 * r + 1] = e[r + 1], n[2 * r + 2] = e[r + 2], n[2 * r + 3] = e[r + 3], n[2 * r + 4] = e[r + 4], n[2 * r + 5] = e[r + 5];
		return super.setColors(n), this;
	}
	setFromPoints(e) {
		let t = e.length - 1, n = new Float32Array(6 * t);
		for (let r = 0; r < t; r++) n[6 * r] = e[r].x, n[6 * r + 1] = e[r].y, n[6 * r + 2] = e[r].z || 0, n[6 * r + 3] = e[r + 1].x, n[6 * r + 4] = e[r + 1].y, n[6 * r + 5] = e[r + 1].z || 0;
		return super.setPositions(n), this;
	}
	fromLine(e) {
		let t = e.geometry;
		return this.setPositions(t.attributes.position.array), this;
	}
}, $i = class extends Zi {
	constructor(e = new Qi(), t = new Mi({ color: Math.random() * 16777215 })) {
		super(e, t), this.isLine2 = !0, this.type = "Line2";
	}
}, ea = .45, ta = .1, na = 1.4, ra = .5;
function ia(e) {
	let t = [];
	return e.forEach((e) => t.push(e.x, e.y, e.z)), t;
}
var aa = class {
	scene;
	objects = /* @__PURE__ */ new Map();
	byDevice = /* @__PURE__ */ new Map();
	byPair = /* @__PURE__ */ new Map();
	animated = /* @__PURE__ */ new Set();
	previewLine = null;
	_elapsed = 0;
	_resolution = new R.Vector2(1, 1);
	highlightedId = null;
	constructor(e) {
		this.scene = e;
	}
	loadLinks(e, t) {
		e.forEach((e) => this.addLink(e, t));
	}
	_pairKey(e) {
		return [e.sourceDeviceId, e.targetDeviceId].sort().join("|");
	}
	_index(e) {
		for (let t of [e.sourceDeviceId, e.targetDeviceId]) {
			let n = this.byDevice.get(t);
			n || (n = /* @__PURE__ */ new Set(), this.byDevice.set(t, n)), n.add(e.id);
		}
		if (e.midX === void 0 && e.midZ === void 0) {
			let t = this._pairKey(e), n = this.byPair.get(t);
			n || (n = /* @__PURE__ */ new Set(), this.byPair.set(t, n)), n.add(e.id);
		}
	}
	_unindex(e) {
		for (let t of [e.sourceDeviceId, e.targetDeviceId]) {
			let n = this.byDevice.get(t);
			n && (n.delete(e.id), n.size || this.byDevice.delete(t));
		}
		let t = this._pairKey(e), n = this.byPair.get(t);
		n && (n.delete(e.id), n.size || this.byPair.delete(t));
	}
	_parallelMidpoint(e, t, n) {
		let r = (t.x + n.x) / 2, i = (t.z + n.z) / 2;
		if (e.midX !== void 0 && e.midZ !== void 0) return {
			midX: e.midX,
			midZ: e.midZ
		};
		let a = [...this.byPair.get(this._pairKey(e)) ?? []];
		a.includes(e.id) || a.push(e.id), a.sort();
		let o = a.indexOf(e.id);
		if (o <= 0) return {
			midX: r,
			midZ: i
		};
		let s = Math.ceil(o / 2) * ra, c = o % 2 == 1 ? 1 : -1, l = n.x - t.x, u = n.z - t.z, d = Math.hypot(l, u) || 1, f = -u / d, p = l / d;
		return {
			midX: r + f * s * c,
			midZ: i + p * s * c
		};
	}
	buildPath(e, t, n, r) {
		let i = e.y + ta, a = t.y + ta, o = (i + a) / 2;
		return [
			new R.Vector3(e.x, i, e.z),
			new R.Vector3(e.x, o, r),
			new R.Vector3(n, o, r),
			new R.Vector3(n, o, t.z),
			new R.Vector3(t.x, a, t.z)
		];
	}
	midY(e, t) {
		return (e.y + t.y) / 2 + ta;
	}
	setResolution(e, t) {
		this._resolution.set(e, t), this.objects.forEach((n) => n.line.material.resolution.set(e, t)), this.previewLine && this.previewLine.material.resolution.set(e, t);
	}
	_syncAnimated(e) {
		e.link.status === "down" || e.line.material.dashed ? this.animated.add(e.link.id) : this.animated.delete(e.link.id);
	}
	_styleFor(e) {
		let t = In[e.type] ?? In.manual;
		return {
			style: t,
			color: e.status === "down" ? "#ef4444" : t.color,
			linewidth: e.type === "physical" || e.type === "security_path" ? 2.5 : 2
		};
	}
	addLink(e, t) {
		let n = t(e.sourceDeviceId), r = t(e.targetDeviceId);
		if (!n || !r) return;
		let { style: i, color: a, linewidth: o } = this._styleFor(e), { midX: s, midZ: c } = this._parallelMidpoint(e, n, r), l = this.buildPath(n, r, s, c), u = new Qi();
		u.setPositions(ia(l));
		let d = new $i(u, new Mi({
			color: new R.Color(a).getHex(),
			transparent: !0,
			opacity: i.opacity,
			linewidth: o,
			dashed: i.dashed,
			dashSize: .35,
			gapSize: .22,
			dashScale: 1,
			resolution: this._resolution,
			alphaToCoverage: !0
		}));
		d.computeLineDistances(), d.userData.linkId = e.id;
		let f = new R.BoxGeometry(.55, .3, .55), p = new R.MeshBasicMaterial({
			color: 6333946,
			transparent: !0,
			opacity: .6,
			depthTest: !1
		}), m = new R.Mesh(f, p);
		m.position.set(s, this.midY(n, r), c), m.renderOrder = 800, m.userData.linkHandleId = e.id, m.userData.linkId = e.id, m.visible = !1;
		let h = new R.Group();
		h.add(d, m), this.scene.add(h), this.objects.set(e.id, {
			group: h,
			line: d,
			handle: m,
			link: e,
			path: l,
			endpoints: {
				a: n.clone(),
				b: r.clone()
			}
		}), this._index(e), this._syncAnimated(this.objects.get(e.id));
	}
	removeLink(e) {
		let t = this.objects.get(e);
		t && (this.scene.remove(t.group), t.line.geometry.dispose(), t.handle.geometry.dispose(), t.line.material.dispose(), t.handle.material.dispose(), this._unindex(t.link), this.animated.delete(e), this.objects.delete(e));
	}
	getRenderedLinkIds() {
		return new Set(this.objects.keys());
	}
	updateLink(e, t) {
		let n = this.objects.get(e.id);
		if (!n) {
			this.addLink(e, t);
			return;
		}
		n.link !== e && (this._unindex(n.link), n.link = e, this._index(e));
		let { style: r, color: i, linewidth: a } = this._styleFor(e), o = n.line.material;
		o.color.set(i), o.opacity = e.id === this.highlightedId ? 1 : r.opacity, o.linewidth = a, o.dashed = r.dashed, this._syncAnimated(n), this._refreshOne(n, t);
	}
	updateMidpoint(e, t, n) {
		let r = this.objects.get(e);
		if (!r) return;
		if (r.link.midX === void 0 && r.link.midZ === void 0) {
			let t = this._pairKey(r.link), n = this.byPair.get(t);
			n && (n.delete(e), n.size || this.byPair.delete(t));
		}
		r.link.midX = t, r.link.midZ = n;
		let i = this.buildPath(r.endpoints.a, r.endpoints.b, t, n);
		r.path = i, r.line.geometry.setPositions(ia(i)), r.line.computeLineDistances(), r.handle.position.set(t, this.midY(r.endpoints.a, r.endpoints.b), n);
	}
	_refreshOne(e, t) {
		let n = t(e.link.sourceDeviceId), r = t(e.link.targetDeviceId);
		if (!n || !r) return;
		e.endpoints.a = n.clone(), e.endpoints.b = r.clone();
		let { midX: i, midZ: a } = this._parallelMidpoint(e.link, n, r), o = this.buildPath(n, r, i, a);
		e.path = o, e.line.geometry.setPositions(ia(o)), e.line.computeLineDistances(), e.handle.position.set(i, this.midY(n, r), a);
	}
	refreshPositions(e) {
		this.objects.forEach((t) => this._refreshOne(t, e));
	}
	refreshPositionsFor(e, t) {
		let n = /* @__PURE__ */ new Set();
		for (let t of e) this.byDevice.get(t)?.forEach((e) => n.add(e));
		n.forEach((e) => {
			let n = this.objects.get(e);
			n && this._refreshOne(n, t);
		});
	}
	updateLinkStatus(e, t) {
		let n = this.objects.get(e);
		if (!n) return;
		let r = In[n.link.type] ?? In.manual, i = t === "down" ? "#ef4444" : r.color;
		n.line.material.color.set(i);
	}
	setHighlight(e, t) {
		if (this.highlightedId = e, t) {
			let e = this.objects.get(t);
			e && (e.line.material.opacity = In[e.link.type]?.opacity ?? .6);
		}
		if (e) {
			let t = this.objects.get(e);
			t && (t.line.material.opacity = 1);
		}
	}
	setSelected(e) {
		this.objects.forEach((t, n) => {
			t.handle.visible = n === e;
		});
	}
	setVisible(e, t) {
		this.objects.forEach(({ group: n, link: r }) => {
			r.type === e && (n.visible = t);
		});
	}
	showPreview(e, t) {
		let n = (e.z + t.z) / 2, r = [
			new R.Vector3(e.x, ea, e.z),
			new R.Vector3(e.x, ea, n),
			new R.Vector3(t.x, ea, n),
			new R.Vector3(t.x, ea, t.z)
		];
		if (this.previewLine) this.previewLine.geometry.setPositions(ia(r)), this.previewLine.computeLineDistances();
		else {
			let e = new Qi();
			e.setPositions(ia(r));
			let t = new Mi({
				color: 6333946,
				dashed: !0,
				dashSize: .3,
				gapSize: .15,
				dashScale: 1,
				transparent: !0,
				opacity: .9,
				linewidth: 2.5,
				resolution: this._resolution
			});
			this.previewLine = new $i(e, t), this.scene.add(this.previewLine);
		}
		this.previewLine.visible = !0;
	}
	hidePreview() {
		this.previewLine && (this.previewLine.visible = !1);
	}
	update(e) {
		this._elapsed += e, this.animated.forEach((t) => {
			let n = this.objects.get(t);
			if (!n) {
				this.animated.delete(t);
				return;
			}
			let r = n.line.material;
			n.link.status === "down" ? r.opacity = n.link.id === this.highlightedId ? 1 : .25 + .35 * Math.abs(Math.sin(this._elapsed * 2.5)) : r.dashed && (r.dashOffset -= na * e);
		}), this.previewLine && (this.previewLine.material.dashOffset -= na * e);
	}
	pickHandle(e) {
		let t = [...this.objects.values()].map((e) => e.handle).filter((e) => e.visible);
		if (!t.length) return null;
		let n = e.intersectObjects(t, !1);
		return n.length ? n[0].object.userData.linkHandleId : null;
	}
	getAllHandles() {
		return [...this.objects.values()].map((e) => e.handle);
	}
	pickLink(e, t = .8) {
		let n = null, r = t * t;
		return this.objects.forEach(({ link: t, path: i, group: a }) => {
			if (a.visible) for (let a = 0; a < i.length - 1; a++) {
				let o = e.ray.distanceSqToSegment(i[a], i[a + 1]);
				o < r && (r = o, n = t.id);
			}
		}), n;
	}
	getLinkPath(e) {
		let t = this.objects.get(e);
		return t ? t.path.map((e) => e.clone()) : null;
	}
	getVisibleLinks() {
		return [...this.objects.values()].filter((e) => e.group.visible).map((e) => e.link);
	}
	dispose() {
		this.objects.forEach(({ group: e, line: t, handle: n }) => {
			this.scene.remove(e), t.geometry.dispose(), n.geometry.dispose(), t.material.dispose(), n.material.dispose();
		}), this.objects.clear(), this.byDevice.clear(), this.byPair.clear(), this.animated.clear(), this.highlightedId = null, this.previewLine &&= (this.scene.remove(this.previewLine), this.previewLine.geometry.dispose(), this.previewLine.material.dispose(), null);
	}
}, oa = 4e3, sa = 5, ca = 3.5;
function la() {
	let e = document.createElement("canvas");
	e.width = e.height = 32;
	let t = e.getContext("2d"), n = t.createRadialGradient(32 / 2, 32 / 2, 0, 32 / 2, 32 / 2, 32 / 2);
	n.addColorStop(0, "rgba(255,255,255,1)"), n.addColorStop(.35, "rgba(255,255,255,0.85)"), n.addColorStop(1, "rgba(255,255,255,0)"), t.fillStyle = n, t.fillRect(0, 0, 32, 32);
	let r = new R.CanvasTexture(e);
	return r.needsUpdate = !0, r;
}
function ua(e) {
	let t = [], n = 0;
	for (let r = 0; r < e.length - 1; r++) {
		let i = e[r].distanceTo(e[r + 1]);
		t.push(i), n += i;
	}
	return {
		lengths: t,
		total: n
	};
}
function da(e, t, n, r, i) {
	let a = r % 1 * n, o = 0;
	for (let n = 0; n < e.length - 1; n++) {
		if (o + t[n] >= a) {
			let r = t[n] > 0 ? (a - o) / t[n] : 0;
			i.lerpVectors(e[n], e[n + 1], r);
			return;
		}
		o += t[n];
	}
	i.copy(e[e.length - 1]);
}
var fa = class {
	scene;
	points;
	particles = [];
	posAttr;
	colAttr;
	constructor(e) {
		this.scene = e;
		let t = new R.BufferGeometry(), n = new Float32Array(oa * 3), r = new Float32Array(oa * 3);
		this.posAttr = new R.BufferAttribute(n, 3), this.colAttr = new R.BufferAttribute(r, 3), this.posAttr.setUsage(R.DynamicDrawUsage), t.setAttribute("position", this.posAttr), t.setAttribute("color", this.colAttr), t.setDrawRange(0, 0);
		let i = new R.PointsMaterial({
			size: .32,
			map: la(),
			vertexColors: !0,
			transparent: !0,
			opacity: .95,
			depthWrite: !1,
			blending: R.AdditiveBlending,
			sizeAttenuation: !0
		});
		this.points = new R.Points(t, i), this.points.frustumCulled = !1, e.add(this.points);
	}
	syncLinks(e, t) {
		this.particles = [], e.forEach((e) => {
			if (e.status === "down") return;
			let n = t(e.id);
			if (!n || n.length < 2) return;
			let { lengths: r, total: i } = ua(n);
			if (i === 0) return;
			let a = In[e.type] ?? In.manual, o = new R.Color(a.color), s = Math.min(Math.max(Math.round(i / ca), 2), 6);
			for (let t = 0; t < s; t++) this.particles.push({
				linkId: e.id,
				linkType: e.type,
				segments: n,
				segmentLengths: r,
				totalLength: i,
				t: t / s,
				speed: sa,
				color: o.clone()
			});
		});
	}
	update(e, t) {
		let n = 0, r = this.posAttr.array, i = this.colAttr.array, a = new R.Vector3();
		for (let o of this.particles) {
			if (n >= oa) break;
			t.has(o.linkType) && (o.t += o.speed * e / Math.max(o.totalLength, 1), o.t > 1 && --o.t, da(o.segments, o.segmentLengths, o.totalLength, o.t, a), r[n * 3] = a.x, r[n * 3 + 1] = a.y, r[n * 3 + 2] = a.z, i[n * 3] = o.color.r, i[n * 3 + 1] = o.color.g, i[n * 3 + 2] = o.color.b, n++);
		}
		this.points.geometry.setDrawRange(0, n), this.posAttr.needsUpdate = !0, this.colAttr.needsUpdate = !0;
	}
	setVisible(e) {
		this.points.visible = e, e || this.points.geometry.setDrawRange(0, 0);
	}
	dispose() {
		this.scene.remove(this.points), this.points.geometry.dispose();
		let e = this.points.material;
		e.map?.dispose(), e.dispose();
	}
}, pa = .03, ma = class {
	scene;
	rings = [];
	elapsed = 0;
	constructor(e) {
		this.scene = e;
	}
	show(e, t) {
		this.clear(), e.forEach(({ deviceId: e, hop: n }) => {
			let r = t(e);
			if (!r) return;
			let i = n === 1 ? 16739072 : 16768256, a = n === 1 ? .8 : 1.3, o = new R.RingGeometry(a, a + .12, 32), s = new R.MeshBasicMaterial({
				color: i,
				transparent: !0,
				opacity: n === 1 ? .7 : .4,
				side: R.DoubleSide,
				depthWrite: !1,
				depthTest: !1,
				blending: R.AdditiveBlending
			}), c = new R.Mesh(o, s);
			c.rotation.x = -Math.PI / 2, c.position.set(r.x, pa, r.z), c.renderOrder = 999, this.scene.add(c), this.rings.push({
				mesh: c,
				hop: n,
				deviceId: e
			});
			let l = new R.RingGeometry(a + .15, a + .25, 32), u = new R.MeshBasicMaterial({
				color: i,
				transparent: !0,
				opacity: .2,
				side: R.DoubleSide,
				depthWrite: !1,
				depthTest: !1,
				blending: R.AdditiveBlending
			}), d = new R.Mesh(l, u);
			d.rotation.x = -Math.PI / 2, d.position.set(r.x, pa, r.z), d.renderOrder = 999, this.scene.add(d), this.rings.push({
				mesh: d,
				hop: n,
				deviceId: e
			});
		});
	}
	clear() {
		this.rings.forEach((e) => {
			this.scene.remove(e.mesh), e.mesh.geometry.dispose(), e.mesh.material.dispose();
		}), this.rings = [];
	}
	update(e) {
		this.elapsed += e, this.rings.forEach((e) => {
			let t = e.mesh.material;
			t.opacity = (e.hop === 1 ? .7 : .4) * (.5 + .5 * Math.abs(Math.sin(this.elapsed * 2.5)));
			let n = 1 + .15 * Math.abs(Math.sin(this.elapsed * 1.8));
			e.mesh.scale.setScalar(n);
		});
	}
	dispose() {
		this.clear();
	}
}, ha = {
	internet: {
		color: 35071,
		emissive: 4403
	},
	cloud: {
		color: 8141549,
		emissive: 1703987
	},
	external: {
		color: 16096779,
		emissive: 1706496
	},
	custom: {
		color: 2278750,
		emissive: 6656
	}
}, ga = {
	internet: "INET",
	cloud: "CLOUD",
	external: "EXT",
	custom: "NODE"
}, _a = class {
	scene;
	objects = /* @__PURE__ */ new Map();
	constructor(e) {
		this.scene = e;
	}
	loadNodes(e) {
		e.forEach((e) => this.addNode(e));
	}
	addNode(e) {
		if (this.objects.has(e.id)) return;
		let t = ha[e.type] ?? ha.custom, n = new R.Group(), r = e.position ?? {
			x: 0,
			y: 0,
			z: 0
		};
		n.position.set(r.x, r.y, r.z), n.userData.virtualNodeId = e.id;
		let i = e.type === "cloud" ? new R.SphereGeometry(.85, 12, 10) : new R.IcosahedronGeometry(.7, 1), a = new R.MeshStandardMaterial({
			color: t.color,
			emissive: t.emissive,
			emissiveIntensity: .8,
			roughness: .3,
			metalness: .5,
			transparent: !0,
			opacity: .82,
			wireframe: e.type === "internet"
		}), o = new R.Mesh(i, a);
		o.position.y = 1.2, n.add(o);
		let s = new R.RingGeometry(.95, 1.1, 32), c = new R.MeshBasicMaterial({
			color: t.color,
			transparent: !0,
			opacity: .35,
			side: R.DoubleSide,
			depthWrite: !1,
			blending: R.AdditiveBlending
		}), l = new R.Mesh(s, c);
		l.rotation.x = -Math.PI / 2, l.position.y = .05, n.add(l);
		let u = document.createElement("div");
		u.style.cssText = "color:#cbd5e1;font-size:11px;font-family:monospace;\n      background:rgba(9,13,24,.85);border:1px solid #2a4a8a;border-radius:5px;\n      padding:2px 8px;pointer-events:none;white-space:nowrap;", u.textContent = `${ga[e.type] ?? "NODE"} · ${e.label}`;
		let d = new Sn(u);
		d.position.set(0, 2.5, 0), n.add(d);
		let f = new R.Mesh(new R.SphereGeometry(1.2, 8, 8), new R.MeshBasicMaterial({ visible: !1 }));
		f.position.y = 1.2, f.userData.virtualNodeId = e.id, n.add(f), this.scene.add(n), this.objects.set(e.id, {
			group: n,
			hitMesh: f,
			label: d
		});
	}
	removeNode(e) {
		let t = this.objects.get(e);
		t && (this.disposeNodeObject(t), this.objects.delete(e));
	}
	getHitMeshes() {
		return [...this.objects.values()].map((e) => e.hitMesh);
	}
	getNodeWorldPos(e) {
		let t = this.objects.get(e);
		return t ? t.group.position.clone().setY(1.2) : null;
	}
	update(e) {
		this.objects.forEach(({ group: t }) => {
			let n = t.children[0];
			n && (n.rotation.y = e * .4);
			let r = t.children[1];
			if (r) {
				let t = r.material;
				t.opacity = .25 + .15 * Math.abs(Math.sin(e * 1.5));
				let n = 1 + .08 * Math.sin(e * 2.2);
				r.scale.setScalar(n);
			}
		});
	}
	dispose() {
		this.objects.forEach((e) => this.disposeNodeObject(e)), this.objects.clear();
	}
	disposeNodeObject(e) {
		this.scene.remove(e.group), e.label.element.remove(), e.group.traverse((e) => {
			if (e instanceof R.Mesh) {
				e.geometry?.dispose();
				let t = e.material;
				Array.isArray(t) ? t.forEach((e) => e.dispose()) : t?.dispose();
			}
		});
	}
}, va = {
	critical: 16724804,
	recover: 2284902,
	warning: 16755200
}, ya = class {
	scene;
	flashes = [];
	constructor(e) {
		this.scene = e;
	}
	flash(e, t) {
		let n = va[t], r = [];
		for (let t = 0; t < 2; t++) {
			let i = new R.RingGeometry(.3, .45, 32), a = new R.MeshBasicMaterial({
				color: n,
				transparent: !0,
				opacity: .9,
				side: R.DoubleSide,
				depthWrite: !1,
				blending: R.AdditiveBlending
			}), o = new R.Mesh(i, a);
			o.rotation.x = -Math.PI / 2, o.position.copy(e).setY(e.y + .3 + t * .05), o.userData.delay = t * .15, o.renderOrder = 500, this.scene.add(o), r.push(o);
		}
		let i = new R.CylinderGeometry(.06, .06, 4, 6), a = new R.MeshBasicMaterial({
			color: n,
			transparent: !0,
			opacity: .6,
			depthWrite: !1,
			blending: R.AdditiveBlending
		}), o = new R.Mesh(i, a);
		o.position.copy(e).setY(e.y + 2), o.userData.isBeam = !0, o.renderOrder = 500, this.scene.add(o), r.push(o), this.flashes.push({
			rings: r,
			life: 1.2,
			maxLife: 1.2
		});
	}
	update(e) {
		for (let t = this.flashes.length - 1; t >= 0; t--) {
			let n = this.flashes[t];
			n.life -= e;
			let r = 1 - n.life / n.maxLife;
			n.rings.forEach((e) => {
				let t = e.material;
				if (e.userData.isBeam) t.opacity = Math.max(0, .6 * (1 - r)), e.scale.y = 1 + r * .5;
				else {
					let n = e.userData.delay, i = Math.max(0, Math.min(1, (r - n) / (1 - n))), a = 1 + i * 5;
					e.scale.setScalar(a), t.opacity = Math.max(0, .9 * (1 - i));
				}
			}), n.life <= 0 && (n.rings.forEach((e) => {
				this.scene.remove(e), e.geometry.dispose(), e.material.dispose();
			}), this.flashes.splice(t, 1));
		}
	}
	dispose() {
		this.flashes.forEach((e) => e.rings.forEach((e) => {
			this.scene.remove(e), e.geometry.dispose(), e.material.dispose();
		})), this.flashes = [];
	}
}, ba = "topospace-backgrounds", xa = "assets", Sa = 1;
function Ca() {
	return new Promise((e, t) => {
		let n = indexedDB.open(ba, Sa);
		n.onupgradeneeded = () => n.result.createObjectStore(xa), n.onsuccess = () => e(n.result), n.onerror = () => t(n.error);
	});
}
async function wa(e, t) {
	let n = await Ca();
	return new Promise((r, i) => {
		let a = n.transaction(xa, "readwrite"), o = a.objectStore(xa).put(t, e);
		o.onsuccess = () => r(), o.onerror = () => i(o.error), a.oncomplete = () => n.close();
	});
}
async function Ta(e) {
	let t = await Ca();
	return new Promise((n, r) => {
		let i = t.transaction(xa, "readonly").objectStore(xa).get(e);
		i.onsuccess = () => {
			n(i.result ?? null), t.close();
		}, i.onerror = () => r(i.error);
	});
}
async function Ea(e) {
	let t = await Ca();
	return new Promise((n, r) => {
		let i = t.transaction(xa, "readwrite"), a = i.objectStore(xa).delete(e);
		a.onsuccess = () => n(), a.onerror = () => r(a.error), i.oncomplete = () => t.close();
	});
}
//#endregion
//#region src/renderers/BackgroundRenderer.ts
var Da = .3, Oa = .85, ka = class {
	scene;
	objects = /* @__PURE__ */ new Map();
	editMode = !1;
	pending = /* @__PURE__ */ new Map();
	constructor(e) {
		this.scene = e;
	}
	async loadObjects(e) {
		await Promise.all(e.map((e) => this.addObject(e)));
	}
	async addObject(e) {
		if (this.objects.has(e.id)) return;
		let t = Symbol(e.id);
		this.pending.set(e.id, t);
		try {
			let n = await Ta(e.assetId);
			if (!n || this.pending.get(e.id) !== t) return;
			let r, i = [];
			if (e.kind === "image") {
				let t = URL.createObjectURL(new Blob([n])), a;
				try {
					a = await new R.TextureLoader().loadAsync(t);
				} finally {
					URL.revokeObjectURL(t);
				}
				let o = e.width ?? 10, s = e.depth ?? 10, c = new R.MeshBasicMaterial({
					map: a,
					transparent: !0,
					side: R.DoubleSide,
					depthWrite: !1
				}), l = new R.Mesh(new R.PlaneGeometry(o, s), c);
				l.rotation.x = -Math.PI / 2, i.push(c), r = l;
			} else {
				let t = await ci(n);
				if (!t) return;
				r = t, r.traverse((e) => {
					e instanceof R.Mesh && (Array.isArray(e.material) ? e.material : [e.material]).forEach((e) => {
						e.transparent = !0, i.push(e);
					});
				}), r.scale.setScalar(e.scale ?? 1);
			}
			r.position.set(e.position.x, e.position.y, e.position.z), r.rotation.y = R.MathUtils.degToRad(e.rotationY ?? 0), r.traverse((t) => {
				t.userData.backgroundId = e.id;
			});
			let a = this.editMode ? Oa : e.opacity ?? Da;
			if (i.forEach((e) => {
				e.opacity = a;
			}), this.pending.get(e.id) !== t) {
				this._dispose({
					root: r,
					materials: i,
					obj: e
				});
				return;
			}
			this.scene.add(r), this.objects.set(e.id, {
				root: r,
				materials: i,
				obj: e
			});
		} finally {
			this.pending.get(e.id) === t && this.pending.delete(e.id);
		}
	}
	removeObject(e) {
		this.pending.delete(e);
		let t = this.objects.get(e);
		t && (this._dispose(t), this.objects.delete(e));
	}
	setEditMode(e) {
		this.editMode = e, this.objects.forEach(({ materials: t, obj: n }) => {
			let r = e ? Oa : n.opacity ?? Da;
			t.forEach((e) => {
				e.opacity = r;
			});
		});
	}
	getPickMeshes() {
		return this.editMode ? [...this.objects.values()].map((e) => e.root) : [];
	}
	getBackgroundIdFromObject(e) {
		let t = e;
		for (; t;) {
			if (t.userData.backgroundId) return t.userData.backgroundId;
			t = t.parent;
		}
		return null;
	}
	getWorldPos(e) {
		let t = this.objects.get(e);
		return t ? t.root.position.clone() : null;
	}
	setPosition(e, t) {
		let n = this.objects.get(e);
		n && n.root.position.copy(t);
	}
	dispose() {
		this.pending.clear(), this.objects.forEach((e) => this._dispose(e)), this.objects.clear();
	}
	_dispose(e) {
		this.scene.remove(e.root), e.root.traverse((e) => {
			e instanceof R.Mesh && e.geometry?.dispose();
		}), e.materials.forEach((e) => {
			e.map?.dispose(), e.dispose();
		});
	}
}, Aa = 1.25, ja = 65535;
ja << 16;
var Ma = 2 ** -24, Na = Symbol("SKIP_GENERATION"), Pa = {
	strategy: 0,
	maxDepth: 40,
	maxLeafSize: 10,
	useSharedArrayBuffer: !1,
	setBoundingBox: !0,
	onProgress: null,
	indirect: !1,
	verbose: !0,
	range: null,
	[Na]: !1
};
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/ArrayBoxUtilities.js
function Z(e, t, n) {
	return n.min.x = t[e], n.min.y = t[e + 1], n.min.z = t[e + 2], n.max.x = t[e + 3], n.max.y = t[e + 4], n.max.z = t[e + 5], n;
}
function Fa(e) {
	let t = -1, n = -Infinity;
	for (let r = 0; r < 3; r++) {
		let i = e[r + 3] - e[r];
		i > n && (n = i, t = r);
	}
	return t;
}
function Ia(e, t) {
	t.set(e);
}
function La(e, t, n) {
	let r, i;
	for (let a = 0; a < 3; a++) {
		let o = a + 3;
		r = e[a], i = t[a], n[a] = r < i ? r : i, r = e[o], i = t[o], n[o] = r > i ? r : i;
	}
}
function Ra(e, t, n) {
	for (let r = 0; r < 3; r++) {
		let i = t[e + 2 * r], a = t[e + 2 * r + 1], o = i - a, s = i + a;
		o < n[r] && (n[r] = o), s > n[r + 3] && (n[r + 3] = s);
	}
}
function za(e) {
	let t = e[3] - e[0], n = e[4] - e[1], r = e[5] - e[2];
	return 2 * (t * n + n * r + r * t);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/nodeBufferUtils.js
function Ba(e, t) {
	return t[e + 15] === ja;
}
function Va(e, t) {
	return t[e + 6];
}
function Ha(e, t) {
	return t[e + 14];
}
function Ua(e) {
	return e + 8;
}
function Wa(e, t) {
	return e + t[e + 6] * 8;
}
function Ga(e, t) {
	return t[e + 7];
}
function Ka(e) {
	return e;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/computeBoundsUtils.js
function qa(e, t, n, r, i) {
	let a = Infinity, o = Infinity, s = Infinity, c = -Infinity, l = -Infinity, u = -Infinity, d = Infinity, f = Infinity, p = Infinity, m = -Infinity, h = -Infinity, g = -Infinity, _ = e.offset || 0;
	for (let r = (t - _) * 6, i = (t + n - _) * 6; r < i; r += 6) {
		let t = e[r + 0], n = e[r + 1], i = t - n, _ = t + n;
		i < a && (a = i), _ > c && (c = _), t < d && (d = t), t > m && (m = t);
		let v = e[r + 2], y = e[r + 3], b = v - y, x = v + y;
		b < o && (o = b), x > l && (l = x), v < f && (f = v), v > h && (h = v);
		let S = e[r + 4], C = e[r + 5], w = S - C, T = S + C;
		w < s && (s = w), T > u && (u = T), S < p && (p = S), S > g && (g = S);
	}
	r[0] = a, r[1] = o, r[2] = s, r[3] = c, r[4] = l, r[5] = u, i[0] = d, i[1] = f, i[2] = p, i[3] = m, i[4] = h, i[5] = g;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/splitUtils.js
var Ja = 32, Ya = (e, t) => e.candidate - t.candidate, Xa = /* @__PURE__ */ Array(Ja).fill().map(() => ({
	count: 0,
	bounds: new Float32Array(6),
	rightCacheBounds: new Float32Array(6),
	leftCacheBounds: new Float32Array(6),
	candidate: 0
})), Za = /* @__PURE__ */ new Float32Array(6);
function Qa(e, t, n, r, i, a) {
	let o = -1, s = 0;
	if (a === 0) o = Fa(t), o !== -1 && (s = (t[o] + t[o + 3]) / 2);
	else if (a === 1) o = Fa(e), o !== -1 && (s = $a(n, r, i, o));
	else if (a === 2) {
		let a = za(e), c = Aa * i, l = n.offset || 0, u = (r - l) * 6, d = (r + i - l) * 6;
		for (let e = 0; e < 3; e++) {
			let r = t[e], l = (t[e + 3] - r) / Ja;
			if (i < Ja / 4) {
				let t = [...Xa];
				t.length = i;
				let r = 0;
				for (let i = u; i < d; i += 6, r++) {
					let a = t[r];
					a.candidate = n[i + 2 * e], a.count = 0;
					let { bounds: o, leftCacheBounds: s, rightCacheBounds: c } = a;
					for (let e = 0; e < 3; e++) c[e] = Infinity, c[e + 3] = -Infinity, s[e] = Infinity, s[e + 3] = -Infinity, o[e] = Infinity, o[e + 3] = -Infinity;
					Ra(i, n, o);
				}
				t.sort(Ya);
				let l = i;
				for (let e = 0; e < l; e++) {
					let n = t[e];
					for (; e + 1 < l && t[e + 1].candidate === n.candidate;) t.splice(e + 1, 1), l--;
				}
				for (let r = u; r < d; r += 6) {
					let i = n[r + 2 * e];
					for (let e = 0; e < l; e++) {
						let a = t[e];
						i >= a.candidate ? Ra(r, n, a.rightCacheBounds) : (Ra(r, n, a.leftCacheBounds), a.count++);
					}
				}
				for (let n = 0; n < l; n++) {
					let r = t[n], l = r.count, u = i - r.count, d = r.leftCacheBounds, f = r.rightCacheBounds, p = 0;
					l !== 0 && (p = za(d) / a);
					let m = 0;
					u !== 0 && (m = za(f) / a);
					let h = 1 + Aa * (p * l + m * u);
					h < c && (o = e, c = h, s = r.candidate);
				}
			} else {
				for (let e = 0; e < Ja; e++) {
					let t = Xa[e];
					t.count = 0, t.candidate = r + l + e * l;
					let n = t.bounds;
					for (let e = 0; e < 3; e++) n[e] = Infinity, n[e + 3] = -Infinity;
				}
				for (let t = u; t < d; t += 6) {
					let i = ~~((n[t + 2 * e] - r) / l);
					i >= Ja && (i = Ja - 1);
					let a = Xa[i];
					a.count++, Ra(t, n, a.bounds);
				}
				let t = Xa[Ja - 1];
				Ia(t.bounds, t.rightCacheBounds);
				for (let e = Ja - 2; e >= 0; e--) {
					let t = Xa[e], n = Xa[e + 1];
					La(t.bounds, n.rightCacheBounds, t.rightCacheBounds);
				}
				let f = 0;
				for (let t = 0; t < Ja - 1; t++) {
					let n = Xa[t], r = n.count, l = n.bounds, u = Xa[t + 1].rightCacheBounds;
					r !== 0 && (f === 0 ? Ia(l, Za) : La(l, Za, Za)), f += r;
					let d = 0, p = 0;
					f !== 0 && (d = za(Za) / a);
					let m = i - f;
					m !== 0 && (p = za(u) / a);
					let h = 1 + Aa * (d * f + p * m);
					h < c && (o = e, c = h, s = n.candidate);
				}
			}
		}
	} else console.warn(`BVH: Invalid build strategy value ${a} used.`);
	return {
		axis: o,
		pos: s
	};
}
function $a(e, t, n, r) {
	let i = 0, a = e.offset;
	for (let o = t, s = t + n; o < s; o++) i += e[(o - a) * 6 + r * 2];
	return i / n;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/BVHNode.js
var eo = class {
	constructor() {
		this.boundingData = new Float32Array(6);
	}
};
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/sortUtils.js
function to(e, t, n, r, i, a) {
	let o = r, s = r + i - 1, c = a.pos, l = a.axis * 2, u = n.offset || 0;
	for (;;) {
		for (; o <= s && n[(o - u) * 6 + l] < c;) o++;
		for (; o <= s && n[(s - u) * 6 + l] >= c;) s--;
		if (o < s) {
			for (let n = 0; n < t; n++) {
				let r = e[o * t + n];
				e[o * t + n] = e[s * t + n], e[s * t + n] = r;
			}
			for (let e = 0; e < 6; e++) {
				let t = o - u, r = s - u, i = n[t * 6 + e];
				n[t * 6 + e] = n[r * 6 + e], n[r * 6 + e] = i;
			}
			o++, s--;
		} else return o;
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/buildUtils.js
var no, ro, io, ao, oo = 2 ** 32;
function so(e) {
	return "count" in e ? 1 : 1 + so(e.left) + so(e.right);
}
function co(e, t, n) {
	return no = new Float32Array(n), ro = new Uint32Array(n), io = new Uint16Array(n), ao = new Uint8Array(n), lo(e, t);
}
function lo(e, t) {
	let n = e / 4, r = e / 2, i = "count" in t, a = t.boundingData;
	for (let e = 0; e < 6; e++) no[n + e] = a[e];
	if (i) return t.buffer ? (ao.set(new Uint8Array(t.buffer), e), e + t.buffer.byteLength) : (ro[n + 6] = t.offset, io[r + 14] = t.count, io[r + 15] = ja, e + 32);
	{
		let { left: r, right: i, splitAxis: a } = t, o = lo(e + 32, r), s = e / 32, c = o / 32 - s;
		if (c > oo) throw Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");
		return ro[n + 6] = c, ro[n + 7] = a, lo(o, i);
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/buildTree.js
function uo(e, t, n, r, i, a) {
	let { maxDepth: o, verbose: s, maxLeafSize: c, strategy: l, onProgress: u } = i, d = e.primitiveBuffer, f = e.primitiveBufferStride, p = new Float32Array(6), m = !1, h = new eo();
	return qa(t, n, r, h.boundingData, p), _(h, n, r, p), h;
	function g(e) {
		u && u((e - a.offset) / a.count);
	}
	function _(e, n, r, i = null, a = 0) {
		if (!m && a >= o && (m = !0, s && console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`)), r <= c || a >= o) return g(n + r), e.offset = n, e.count = r, e;
		let u = Qa(e.boundingData, i, t, n, r, l);
		if (u.axis === -1) return g(n + r), e.offset = n, e.count = r, e;
		let h = to(d, f, t, n, r, u);
		if (h === n || h === n + r) g(n + r), e.offset = n, e.count = r;
		else {
			e.splitAxis = u.axis;
			let i = new eo(), o = n, s = h - n;
			e.left = i, qa(t, o, s, i.boundingData, p), _(i, o, s, p, a + 1);
			let c = new eo(), l = h, d = r - s;
			e.right = c, qa(t, l, d, c.boundingData, p), _(c, l, d, p, a + 1);
		}
		return e;
	}
}
function fo(e, t) {
	let n = t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer, r = e.getRootRanges(t.range), i = r[0], a = r[r.length - 1], o = {
		offset: i.offset,
		count: a.offset + a.count - i.offset
	}, s = new Float32Array(6 * o.count);
	s.offset = o.offset, e.computePrimitiveBounds(o.offset, o.count, s), e._roots = r.map((r) => {
		let i = uo(e, s, r.offset, r.count, t, o), a = new n(32 * so(i));
		return co(0, i, a), a;
	});
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/PrimitivePool.js
var po = class {
	constructor(e) {
		this._getNewPrimitive = e, this._primitives = [];
	}
	getPrimitive() {
		let e = this._primitives;
		return e.length === 0 ? this._getNewPrimitive() : e.pop();
	}
	releasePrimitive(e) {
		this._primitives.push(e);
	}
}, Q = /* @__PURE__ */ new class {
	constructor() {
		this.float32Array = null, this.uint16Array = null, this.uint32Array = null;
		let e = [], t = null;
		this.setBuffer = (n) => {
			t && e.push(t), t = n, this.float32Array = new Float32Array(n), this.uint16Array = new Uint16Array(n), this.uint32Array = new Uint32Array(n);
		}, this.clearBuffer = () => {
			t = null, this.float32Array = null, this.uint16Array = null, this.uint32Array = null, e.length !== 0 && this.setBuffer(e.pop());
		};
	}
}(), mo, ho, go = [], _o = /* @__PURE__ */ new po(() => new U());
function vo(e, t, n, r, i, a) {
	mo = _o.getPrimitive(), ho = _o.getPrimitive(), go.push(mo, ho), Q.setBuffer(e._roots[t]);
	let o = yo(0, e.geometry, n, r, i, a);
	Q.clearBuffer(), _o.releasePrimitive(mo), _o.releasePrimitive(ho), go.pop(), go.pop();
	let s = go.length;
	return s > 0 && (ho = go[s - 1], mo = go[s - 2]), o;
}
function yo(e, t, n, r, i = null, a = 0, o = 0) {
	let { float32Array: s, uint16Array: c, uint32Array: l } = Q, u = e * 2;
	if (Ba(u, c)) {
		let t = Va(e, l), n = Ha(u, c);
		return Z(Ka(e), s, mo), r(t, n, !1, o, a + e / 8, mo);
	} else {
		let u = Ua(e), d = Wa(e, l), f = u, p = d, m, h, g, _;
		if (i && (g = mo, _ = ho, Z(Ka(f), s, g), Z(Ka(p), s, _), m = i(g), h = i(_), h < m)) {
			f = d, p = u;
			let e = m;
			m = h, h = e, g = _;
		}
		g || (g = mo, Z(Ka(f), s, g));
		let v = Ba(f * 2, c), y = n(g, v, m, o + 1, a + f / 8), b;
		if (y === 2) {
			let e = w(f);
			b = r(e, T(f) - e, !0, o + 1, a + f / 8, g);
		} else b = y && yo(f, t, n, r, i, a, o + 1);
		if (b) return !0;
		_ = ho, Z(Ka(p), s, _);
		let x = Ba(p * 2, c), S = n(_, x, h, o + 1, a + p / 8), C;
		if (S === 2) {
			let e = w(p);
			C = r(e, T(p) - e, !0, o + 1, a + p / 8, _);
		} else C = S && yo(p, t, n, r, i, a, o + 1);
		if (C) return !0;
		return !1;
		function w(e) {
			let { uint16Array: t, uint32Array: n } = Q, r = e * 2;
			for (; !Ba(r, t);) e = Ua(e), r = e * 2;
			return Va(e, n);
		}
		function T(e) {
			let { uint16Array: t, uint32Array: n } = Q, r = e * 2;
			for (; !Ba(r, t);) e = Wa(e, n), r = e * 2;
			return Va(e, n) + Ha(r, t);
		}
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/bvhcast.js
var bo = /* @__PURE__ */ new Q.constructor(), xo = /* @__PURE__ */ new Q.constructor(), So = /* @__PURE__ */ new po(() => new U()), Co = /* @__PURE__ */ new U(), wo = /* @__PURE__ */ new U(), To = /* @__PURE__ */ new U(), Eo = /* @__PURE__ */ new U(), Do = !1;
function Oo(e, t, n, r) {
	if (Do) throw Error("MeshBVH: Recursive calls to bvhcast not supported.");
	Do = !0;
	let i = e._roots, a = t._roots, o, s = 0, c = 0, l = new Ie().copy(n).invert();
	for (let e = 0, t = i.length; e < t; e++) {
		bo.setBuffer(i[e]), c = 0;
		let t = So.getPrimitive();
		Z(Ka(0), bo.float32Array, t), t.applyMatrix4(l);
		for (let e = 0, i = a.length; e < i && (xo.setBuffer(a[e]), o = ko(0, 0, n, l, r, s, c, 0, 0, t), xo.clearBuffer(), c += a[e].byteLength / 32, !o); e++);
		if (So.releasePrimitive(t), bo.clearBuffer(), s += i[e].byteLength / 32, o) break;
	}
	return Do = !1, o;
}
function ko(e, t, n, r, i, a = 0, o = 0, s = 0, c = 0, l = null, u = !1) {
	let d, f;
	u ? (d = xo, f = bo) : (d = bo, f = xo);
	let p = d.float32Array, m = d.uint32Array, h = d.uint16Array, g = f.float32Array, _ = f.uint32Array, v = f.uint16Array, y = e * 2, b = t * 2, x = Ba(y, h), S = Ba(b, v), C = !1;
	if (S && x) C = u ? i(Va(t, _), Ha(t * 2, v), Va(e, m), Ha(e * 2, h), c, o + t / 8, s, a + e / 8) : i(Va(e, m), Ha(e * 2, h), Va(t, _), Ha(t * 2, v), s, a + e / 8, c, o + t / 8);
	else if (S) {
		let l = So.getPrimitive();
		Z(Ka(t), g, l), l.applyMatrix4(n);
		let d = Ua(e), f = Wa(e, m);
		Z(Ka(d), p, Co), Z(Ka(f), p, wo);
		let h = l.intersectsBox(Co), _ = l.intersectsBox(wo);
		C = h && ko(t, d, r, n, i, o, a, c, s + 1, l, !u) || _ && ko(t, f, r, n, i, o, a, c, s + 1, l, !u), So.releasePrimitive(l);
	} else {
		let d = Ua(t), f = Wa(t, _);
		Z(Ka(d), g, To), Z(Ka(f), g, Eo);
		let h = l.intersectsBox(To), v = l.intersectsBox(Eo);
		if (h && v) C = ko(e, d, n, r, i, a, o, s, c + 1, l, u) || ko(e, f, n, r, i, a, o, s, c + 1, l, u);
		else if (h) if (x) C = ko(e, d, n, r, i, a, o, s, c + 1, l, u);
		else {
			let t = So.getPrimitive();
			t.copy(To).applyMatrix4(n);
			let l = Ua(e), f = Wa(e, m);
			Z(Ka(l), p, Co), Z(Ka(f), p, wo);
			let h = t.intersectsBox(Co), g = t.intersectsBox(wo);
			C = h && ko(d, l, r, n, i, o, a, c, s + 1, t, !u) || g && ko(d, f, r, n, i, o, a, c, s + 1, t, !u), So.releasePrimitive(t);
		}
		else if (v) if (x) C = ko(e, f, n, r, i, a, o, s, c + 1, l, u);
		else {
			let t = So.getPrimitive();
			t.copy(Eo).applyMatrix4(n);
			let l = Ua(e), d = Wa(e, m);
			Z(Ka(l), p, Co), Z(Ka(d), p, wo);
			let h = t.intersectsBox(Co), g = t.intersectsBox(wo);
			C = h && ko(f, l, r, n, i, o, a, c, s + 1, t, !u) || g && ko(f, d, r, n, i, o, a, c, s + 1, t, !u), So.releasePrimitive(t);
		}
	}
	return C;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/BVH.js
var Ao = /* @__PURE__ */ new U(), jo = /* @__PURE__ */ new Float32Array(6), Mo = class {
	constructor() {
		this._roots = null, this.primitiveBuffer = null, this.primitiveBufferStride = null;
	}
	init(e) {
		e = {
			...Pa,
			...e
		}, fo(this, e);
	}
	getRootRanges() {
		throw Error("BVH: getRootRanges() not implemented");
	}
	writePrimitiveBounds() {
		throw Error("BVH: writePrimitiveBounds() not implemented");
	}
	writePrimitiveRangeBounds(e, t, n, r) {
		let i = Infinity, a = Infinity, o = Infinity, s = -Infinity, c = -Infinity, l = -Infinity;
		for (let n = e, r = e + t; n < r; n++) {
			this.writePrimitiveBounds(n, jo, 0);
			let [e, t, r, u, d, f] = jo;
			e < i && (i = e), u > s && (s = u), t < a && (a = t), d > c && (c = d), r < o && (o = r), f > l && (l = f);
		}
		return n[r + 0] = i, n[r + 1] = a, n[r + 2] = o, n[r + 3] = s, n[r + 4] = c, n[r + 5] = l, n;
	}
	computePrimitiveBounds(e, t, n) {
		let r = n.offset || 0;
		for (let i = e, a = e + t; i < a; i++) {
			this.writePrimitiveBounds(i, jo, 0);
			let [e, t, a, o, s, c] = jo, l = (e + o) / 2, u = (t + s) / 2, d = (a + c) / 2, f = (o - e) / 2, p = (s - t) / 2, m = (c - a) / 2, h = (i - r) * 6;
			n[h + 0] = l, n[h + 1] = f + (Math.abs(l) + f) * Ma, n[h + 2] = u, n[h + 3] = p + (Math.abs(u) + p) * Ma, n[h + 4] = d, n[h + 5] = m + (Math.abs(d) + m) * Ma;
		}
		return n;
	}
	shiftPrimitiveOffsets(e) {
		let t = this._indirectBuffer;
		if (t) for (let n = 0, r = t.length; n < r; n++) t[n] += e;
		else {
			let t = this._roots;
			for (let n = 0; n < t.length; n++) {
				let r = t[n], i = new Uint32Array(r), a = new Uint16Array(r), o = r.byteLength / 32;
				for (let t = 0; t < o; t++) {
					let n = 8 * t;
					Ba(2 * n, a) && (i[n + 6] += e);
				}
			}
		}
	}
	traverse(e, t = 0) {
		let n = this._roots[t], r = new Uint32Array(n), i = new Uint16Array(n);
		a(0);
		function a(t, o = 0) {
			let s = t * 2, c = Ba(s, i);
			if (c) {
				let a = r[t + 6], l = i[s + 14];
				e(o, c, new Float32Array(n, t * 4, 6), a, l);
			} else {
				let i = Ua(t), s = Wa(t, r), l = Ga(t, r);
				e(o, c, new Float32Array(n, t * 4, 6), l) || (a(i, o + 1), a(s, o + 1));
			}
		}
	}
	refit() {
		let e = this._roots;
		for (let t = 0, n = e.length; t < n; t++) {
			let n = e[t], r = new Uint32Array(n), i = new Uint16Array(n), a = new Float32Array(n), o = n.byteLength / 32;
			for (let e = o - 1; e >= 0; e--) {
				let t = e * 8, n = t * 2;
				if (Ba(n, i)) {
					let e = Va(t, r), o = Ha(n, i);
					this.writePrimitiveRangeBounds(e, o, jo, 0), a.set(jo, t);
				} else {
					let e = Ua(t), n = Wa(t, r);
					for (let r = 0; r < 3; r++) {
						let i = a[e + r], o = a[e + r + 3], s = a[n + r], c = a[n + r + 3];
						a[t + r] = i < s ? i : s, a[t + r + 3] = o > c ? o : c;
					}
				}
			}
		}
	}
	getBoundingBox(e) {
		return e.makeEmpty(), this._roots.forEach((t) => {
			Z(0, new Float32Array(t), Ao), e.union(Ao);
		}), e;
	}
	shapecast(e) {
		let { boundsTraverseOrder: t, intersectsBounds: n, intersectsRange: r, intersectsPrimitive: i, scratchPrimitive: a, iterate: o } = e;
		if (r && i) {
			let e = r;
			r = (t, n, r, s, c) => e(t, n, r, s, c) ? !0 : o(t, n, this, i, r, s, a);
		} else r ||= i ? (e, t, n, r) => o(e, t, this, i, n, r, a) : (e, t, n) => n;
		let s = !1, c = 0, l = this._roots;
		for (let e = 0, i = l.length; e < i; e++) {
			let i = l[e];
			if (s = vo(this, e, n, r, t, c), s) break;
			c += i.byteLength / 32;
		}
		return s;
	}
	bvhcast(e, t, n) {
		let { intersectsRanges: r } = n;
		return Oo(this, e, t, r);
	}
};
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/BufferUtils.js
function No() {
	return typeof SharedArrayBuffer < "u";
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/geometryUtils.js
function Po(e) {
	return e.index ? e.index.count : e.attributes.position.count;
}
function Fo(e) {
	return Po(e) / 3;
}
function Io(e, t = ArrayBuffer) {
	return e > 65535 ? new Uint32Array(new t(4 * e)) : new Uint16Array(new t(2 * e));
}
function Lo(e, t) {
	if (!e.index) {
		let n = e.attributes.position.count, r = Io(n, t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer);
		e.setIndex(new te(r, 1));
		for (let e = 0; e < n; e++) r[e] = e;
	}
}
function Ro(e, t, n) {
	let r = Po(e) / n, i = t || e.drawRange, a = i.start / n, o = (i.start + i.count) / n, s = Math.max(0, a), c = Math.min(r, o) - s;
	return {
		offset: Math.floor(s),
		count: Math.floor(c)
	};
}
function zo(e, t) {
	return e.groups.map((e) => ({
		offset: e.start / t,
		count: e.count / t
	}));
}
function Bo(e, t, n) {
	let r = Ro(e, t, n), i = zo(e, n);
	if (!i.length) return [r];
	let a = [], o = r.offset, s = r.offset + r.count, c = Po(e) / n, l = [];
	for (let e of i) {
		let { offset: t, count: n } = e, r = t, i = t + (isFinite(n) ? n : c - t);
		r < s && i > o && (l.push({
			pos: Math.max(o, r),
			isStart: !0
		}), l.push({
			pos: Math.min(s, i),
			isStart: !1
		}));
	}
	l.sort((e, t) => e.pos === t.pos ? e.type === "end" ? -1 : 1 : e.pos - t.pos);
	let u = 0, d = null;
	for (let e of l) {
		let t = e.pos;
		u !== 0 && t !== d && a.push({
			offset: d,
			count: t - d
		}), u += e.isStart ? 1 : -1, d = t;
	}
	return a;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/GeometryBVH.js
function Vo(e, t) {
	let n = e[e.length - 1], r = n.offset + n.count > 2 ** 16, i = e.reduce((e, t) => e + t.count, 0), a = r ? 4 : 2, o = t ? new SharedArrayBuffer(i * a) : new ArrayBuffer(i * a), s = r ? new Uint32Array(o) : new Uint16Array(o), c = 0;
	for (let t = 0; t < e.length; t++) {
		let { offset: n, count: r } = e[t];
		for (let e = 0; e < r; e++) s[c + e] = n + e;
		c += r;
	}
	return s;
}
var Ho = class extends Mo {
	get indirect() {
		return !!this._indirectBuffer;
	}
	get primitiveStride() {
		return null;
	}
	get primitiveBufferStride() {
		return this.indirect ? 1 : this.primitiveStride;
	}
	set primitiveBufferStride(e) {}
	get primitiveBuffer() {
		return this.indirect ? this._indirectBuffer : this.geometry.index.array;
	}
	set primitiveBuffer(e) {}
	constructor(e, t = {}) {
		if (!e.isBufferGeometry) throw Error("BVH: Only BufferGeometries are supported.");
		if (e.index && e.index.isInterleavedBufferAttribute) throw Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.");
		if (t.useSharedArrayBuffer && !No()) throw Error("BVH: SharedArrayBuffer is not available.");
		super(), this.geometry = e, this.resolvePrimitiveIndex = t.indirect ? (e) => this._indirectBuffer[e] : (e) => e, this.primitiveBuffer = null, this.primitiveBufferStride = null, this._indirectBuffer = null, t = {
			...Pa,
			...t
		}, t[Na] || this.init(t);
	}
	init(e) {
		let { geometry: t, primitiveStride: n } = this;
		if (e.indirect) {
			let r = Vo(Bo(t, e.range, n), e.useSharedArrayBuffer);
			this._indirectBuffer = r;
		} else Lo(t, e);
		super.init(e), !t.boundingBox && e.setBoundingBox && (t.boundingBox = this.getBoundingBox(new U()));
	}
	getRootRanges(e) {
		return this.indirect ? [{
			offset: 0,
			count: this._indirectBuffer.length
		}] : Bo(this.geometry, e, this.primitiveStride);
	}
	raycastObject3D() {
		throw Error("BVH: raycastObject3D() not implemented");
	}
}, Uo = class {
	constructor() {
		this.min = Infinity, this.max = -Infinity;
	}
	setFromPointsField(e, t) {
		let n = Infinity, r = -Infinity;
		for (let i = 0, a = e.length; i < a; i++) {
			let a = e[i][t];
			n = a < n ? a : n, r = a > r ? a : r;
		}
		this.min = n, this.max = r;
	}
	setFromPoints(e, t) {
		let n = Infinity, r = -Infinity;
		for (let i = 0, a = t.length; i < a; i++) {
			let a = t[i], o = e.dot(a);
			n = o < n ? o : n, r = o > r ? o : r;
		}
		this.min = n, this.max = r;
	}
	isSeparated(e) {
		return this.min > e.max || e.min > this.max;
	}
};
Uo.prototype.setFromBox = (function() {
	let e = /* @__PURE__ */ new K();
	return function(t, n) {
		let r = n.min, i = n.max, a = Infinity, o = -Infinity;
		for (let n = 0; n <= 1; n++) for (let s = 0; s <= 1; s++) for (let c = 0; c <= 1; c++) {
			e.x = r.x * n + i.x * (1 - n), e.y = r.y * s + i.y * (1 - s), e.z = r.z * c + i.z * (1 - c);
			let l = t.dot(e);
			a = Math.min(l, a), o = Math.max(l, o);
		}
		this.min = a, this.max = o;
	};
})(), (function() {
	let e = /* @__PURE__ */ new Uo();
	return function(t, n) {
		let r = t.points, i = t.satAxes, a = t.satBounds, o = n.points, s = n.satAxes, c = n.satBounds;
		for (let t = 0; t < 3; t++) {
			let n = a[t], r = i[t];
			if (e.setFromPoints(r, o), n.isSeparated(e)) return !1;
		}
		for (let t = 0; t < 3; t++) {
			let n = c[t], i = s[t];
			if (e.setFromPoints(i, r), n.isSeparated(e)) return !1;
		}
	};
})();
//#endregion
//#region node_modules/three-mesh-bvh/src/math/MathUtilities.js
var Wo = (function() {
	let e = /* @__PURE__ */ new K(), t = /* @__PURE__ */ new K(), n = /* @__PURE__ */ new K();
	return function(r, i, a) {
		let o = r.start, s = e, c = i.start, l = t;
		n.subVectors(o, c), e.subVectors(r.end, r.start), t.subVectors(i.end, i.start);
		let u = n.dot(l), d = l.dot(s), f = l.dot(l), p = n.dot(s), m = s.dot(s) * f - d * d, h, g;
		h = m === 0 ? 0 : (u * d - p * f) / m, g = (u + h * d) / f, a.x = h, a.y = g;
	};
})(), Go = (function() {
	let e = /* @__PURE__ */ new G(), t = /* @__PURE__ */ new K(), n = /* @__PURE__ */ new K();
	return function(r, i, a, o) {
		Wo(r, i, e);
		let s = e.x, c = e.y;
		if (s >= 0 && s <= 1 && c >= 0 && c <= 1) {
			r.at(s, a), i.at(c, o);
			return;
		} else if (s >= 0 && s <= 1) {
			c < 0 ? i.at(0, o) : i.at(1, o), r.closestPointToPoint(o, !0, a);
			return;
		} else if (c >= 0 && c <= 1) {
			s < 0 ? r.at(0, a) : r.at(1, a), i.closestPointToPoint(a, !0, o);
			return;
		} else {
			let e;
			e = s < 0 ? r.start : r.end;
			let l;
			l = c < 0 ? i.start : i.end;
			let u = t, d = n;
			if (r.closestPointToPoint(l, !0, t), i.closestPointToPoint(e, !0, n), u.distanceToSquared(l) <= d.distanceToSquared(e)) {
				a.copy(u), o.copy(l);
				return;
			} else {
				a.copy(e), o.copy(d);
				return;
			}
		}
	};
})(), Ko = (function() {
	let e = /* @__PURE__ */ new K(), t = /* @__PURE__ */ new K(), n = /* @__PURE__ */ new Ye(), r = /* @__PURE__ */ new Ce();
	return function(i, a) {
		let { radius: o, center: s } = i, { a: c, b: l, c: u } = a;
		if (r.start = c, r.end = l, r.closestPointToPoint(s, !0, e).distanceTo(s) <= o || (r.start = c, r.end = u, r.closestPointToPoint(s, !0, e).distanceTo(s) <= o) || (r.start = l, r.end = u, r.closestPointToPoint(s, !0, e).distanceTo(s) <= o)) return !0;
		let d = a.getPlane(n);
		if (Math.abs(d.distanceToPoint(s)) <= o) {
			let e = d.projectPoint(s, t);
			if (a.containsPoint(e)) return !0;
		}
		return !1;
	};
})(), qo = [
	"x",
	"y",
	"z"
], Jo = 1e-15, Yo = Jo * Jo;
function Xo(e) {
	return Math.abs(e) < Jo;
}
var Zo = class extends gt {
	constructor(...e) {
		super(...e), this.isExtendedTriangle = !0, this.satAxes = [
			,
			,
			,
			,
		].fill().map(() => new K()), this.satBounds = [
			,
			,
			,
			,
		].fill().map(() => new Uo()), this.points = [
			this.a,
			this.b,
			this.c
		], this.plane = new Ye(), this.isDegenerateIntoSegment = !1, this.isDegenerateIntoPoint = !1, this.degenerateSegment = new Ce(), this.needsUpdate = !0;
	}
	intersectsSphere(e) {
		return Ko(e, this);
	}
	update() {
		let e = this.a, t = this.b, n = this.c, r = this.points, i = this.satAxes, a = this.satBounds, o = i[0], s = a[0];
		this.getNormal(o), s.setFromPoints(o, r);
		let c = i[1], l = a[1];
		c.subVectors(e, t), l.setFromPoints(c, r);
		let u = i[2], d = a[2];
		u.subVectors(t, n), d.setFromPoints(u, r);
		let f = i[3], p = a[3];
		f.subVectors(n, e), p.setFromPoints(f, r);
		let m = c.length(), h = u.length(), g = f.length();
		this.isDegenerateIntoPoint = !1, this.isDegenerateIntoSegment = !1, m < Jo ? h < Jo || g < Jo ? this.isDegenerateIntoPoint = !0 : (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(e), this.degenerateSegment.end.copy(n)) : h < Jo ? g < Jo ? this.isDegenerateIntoPoint = !0 : (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(t), this.degenerateSegment.end.copy(e)) : g < Jo && (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(n), this.degenerateSegment.end.copy(t)), this.plane.setFromNormalAndCoplanarPoint(o, e), this.needsUpdate = !1;
	}
};
Zo.prototype.closestPointToSegment = (function() {
	let e = /* @__PURE__ */ new K(), t = /* @__PURE__ */ new K(), n = /* @__PURE__ */ new Ce();
	return function(r, i = null, a = null) {
		let { start: o, end: s } = r, c = this.points, l, u = Infinity;
		for (let o = 0; o < 3; o++) {
			let s = (o + 1) % 3;
			n.start.copy(c[o]), n.end.copy(c[s]), Go(n, r, e, t), l = e.distanceToSquared(t), l < u && (u = l, i && i.copy(e), a && a.copy(t));
		}
		return this.closestPointToPoint(o, e), l = o.distanceToSquared(e), l < u && (u = l, i && i.copy(e), a && a.copy(o)), this.closestPointToPoint(s, e), l = s.distanceToSquared(e), l < u && (u = l, i && i.copy(e), a && a.copy(s)), Math.sqrt(u);
	};
})(), Zo.prototype.intersectsTriangle = (function() {
	let e = /* @__PURE__ */ new Zo(), t = /* @__PURE__ */ new Uo(), n = /* @__PURE__ */ new Uo(), r = /* @__PURE__ */ new K(), i = /* @__PURE__ */ new K(), a = /* @__PURE__ */ new K(), o = /* @__PURE__ */ new K(), s = /* @__PURE__ */ new Ce(), c = /* @__PURE__ */ new Ce(), l = /* @__PURE__ */ new K(), u = /* @__PURE__ */ new G(), d = /* @__PURE__ */ new G();
	function f(e, i, a, s) {
		let c = r;
		!e.isDegenerateIntoPoint && !e.isDegenerateIntoSegment ? c.copy(e.plane.normal) : c.copy(i.plane.normal);
		let l = e.satBounds, u = e.satAxes;
		for (let r = 1; r < 4; r++) {
			let a = l[r], s = u[r];
			if (t.setFromPoints(s, i.points), a.isSeparated(t) || (o.copy(c).cross(s), t.setFromPoints(o, e.points), n.setFromPoints(o, i.points), t.isSeparated(n))) return !1;
		}
		let d = i.satBounds, f = i.satAxes;
		for (let r = 1; r < 4; r++) {
			let a = d[r], s = f[r];
			if (t.setFromPoints(s, e.points), a.isSeparated(t) || (o.crossVectors(c, s), t.setFromPoints(o, e.points), n.setFromPoints(o, i.points), t.isSeparated(n))) return !1;
		}
		return a && (s || console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."), a.start.set(0, 0, 0), a.end.set(0, 0, 0)), !0;
	}
	function p(e, t, n, r, i, a, o, s, c, l, u) {
		let d = o / (o - s);
		l.x = r + (i - r) * d, u.start.subVectors(t, e).multiplyScalar(d).add(e), d = o / (o - c), l.y = r + (a - r) * d, u.end.subVectors(n, e).multiplyScalar(d).add(e);
	}
	function m(e, t, n, r, i, a, o, s, c, l, u) {
		if (i > 0) p(e.c, e.a, e.b, r, t, n, c, o, s, l, u);
		else if (a > 0) p(e.b, e.a, e.c, n, t, r, s, o, c, l, u);
		else if (s * c > 0 || o != 0) p(e.a, e.b, e.c, t, n, r, o, s, c, l, u);
		else if (s != 0) p(e.b, e.a, e.c, n, t, r, s, o, c, l, u);
		else if (c != 0) p(e.c, e.a, e.b, r, t, n, c, o, s, l, u);
		else return !0;
		return !1;
	}
	function h(e, t, n, i) {
		let a = t.degenerateSegment, o = e.plane.distanceToPoint(a.start), s = e.plane.distanceToPoint(a.end);
		return Xo(o) ? Xo(s) ? f(e, t, n, i) : (n && (n.start.copy(a.start), n.end.copy(a.start)), e.containsPoint(a.start)) : Xo(s) ? (n && (n.start.copy(a.end), n.end.copy(a.end)), e.containsPoint(a.end)) : e.plane.intersectLine(a, r) == null ? !1 : (n && (n.start.copy(r), n.end.copy(r)), e.containsPoint(r));
	}
	function g(e, t, n) {
		let r = t.a;
		return Xo(e.plane.distanceToPoint(r)) && e.containsPoint(r) ? (n && (n.start.copy(r), n.end.copy(r)), !0) : !1;
	}
	function _(e, t, n) {
		let i = e.degenerateSegment, a = t.a;
		return i.closestPointToPoint(a, !0, r), a.distanceToSquared(r) < Yo ? (n && (n.start.copy(a), n.end.copy(a)), !0) : !1;
	}
	function v(e, t, n, o) {
		if (e.isDegenerateIntoSegment) if (t.isDegenerateIntoSegment) {
			let o = e.degenerateSegment, s = t.degenerateSegment, c = i, l = a;
			o.delta(c), s.delta(l);
			let u = r.subVectors(s.start, o.start), d = c.x * l.y - c.y * l.x;
			if (Xo(d)) return !1;
			let f = (u.x * l.y - u.y * l.x) / d, p = -(c.x * u.y - c.y * u.x) / d;
			return f < 0 || f > 1 || p < 0 || p > 1 ? !1 : Xo(o.start.z + c.z * f - (s.start.z + l.z * p)) ? (n && (n.start.copy(o.start).addScaledVector(c, f), n.end.copy(o.start).addScaledVector(c, f)), !0) : !1;
		} else if (t.isDegenerateIntoPoint) return _(e, t, n);
		else return h(t, e, n, o);
		else if (e.isDegenerateIntoPoint) return t.isDegenerateIntoPoint ? t.a.distanceToSquared(e.a) < Yo ? (n && (n.start.copy(e.a), n.end.copy(e.a)), !0) : !1 : t.isDegenerateIntoSegment ? _(t, e, n) : g(t, e, n);
		else if (t.isDegenerateIntoPoint) return g(e, t, n);
		else if (t.isDegenerateIntoSegment) return h(e, t, n, o);
	}
	return function(t, n = null, r = !1) {
		this.needsUpdate && this.update(), t.isExtendedTriangle ? t.needsUpdate && t.update() : (e.copy(t), e.update(), t = e);
		let o = v(this, t, n, r);
		if (o !== void 0) return o;
		let p = this.plane, h = t.plane, g = h.distanceToPoint(this.a), _ = h.distanceToPoint(this.b), y = h.distanceToPoint(this.c);
		Xo(g) && (g = 0), Xo(_) && (_ = 0), Xo(y) && (y = 0);
		let b = g * _, x = g * y;
		if (b > 0 && x > 0) return !1;
		let S = p.distanceToPoint(t.a), C = p.distanceToPoint(t.b), w = p.distanceToPoint(t.c);
		Xo(S) && (S = 0), Xo(C) && (C = 0), Xo(w) && (w = 0);
		let T = S * C, E = S * w;
		if (T > 0 && E > 0) return !1;
		i.copy(p.normal), a.copy(h.normal);
		let D = i.cross(a), O = 0, k = Math.abs(D.x), A = Math.abs(D.y);
		A > k && (k = A, O = 1), Math.abs(D.z) > k && (O = 2);
		let j = qo[O], M = this.a[j], N = this.b[j], P = this.c[j], F = t.a[j], I = t.b[j], L = t.c[j];
		if (m(this, M, N, P, b, x, g, _, y, u, s) || m(t, F, I, L, T, E, S, C, w, d, c)) return f(this, t, n, r);
		if (u.y < u.x) {
			let e = u.y;
			u.y = u.x, u.x = e, l.copy(s.start), s.start.copy(s.end), s.end.copy(l);
		}
		if (d.y < d.x) {
			let e = d.y;
			d.y = d.x, d.x = e, l.copy(c.start), c.start.copy(c.end), c.end.copy(l);
		}
		return u.y < d.x || d.y < u.x ? !1 : (n && (d.x > u.x ? n.start.copy(c.start) : n.start.copy(s.start), d.y < u.y ? n.end.copy(c.end) : n.end.copy(s.end)), !0);
	};
})(), Zo.prototype.distanceToPoint = (function() {
	let e = /* @__PURE__ */ new K();
	return function(t) {
		return this.closestPointToPoint(t, e), t.distanceTo(e);
	};
})(), Zo.prototype.distanceToTriangle = (function() {
	let e = /* @__PURE__ */ new K(), t = /* @__PURE__ */ new K(), n = [
		"a",
		"b",
		"c"
	], r = /* @__PURE__ */ new Ce(), i = /* @__PURE__ */ new Ce();
	return function(a, o = null, s = null) {
		let c = o || s ? r : null;
		if (this.intersectsTriangle(a, c, !0)) return (o || s) && (o && c.getCenter(o), s && c.getCenter(s)), 0;
		let l = Infinity;
		for (let t = 0; t < 3; t++) {
			let r, i = n[t], c = a[i];
			this.closestPointToPoint(c, e), r = c.distanceToSquared(e), r < l && (l = r, o && o.copy(e), s && s.copy(c));
			let u = this[i];
			a.closestPointToPoint(u, e), r = u.distanceToSquared(e), r < l && (l = r, o && o.copy(u), s && s.copy(e));
		}
		for (let c = 0; c < 3; c++) {
			let u = n[c], d = n[(c + 1) % 3];
			r.set(this[u], this[d]);
			for (let c = 0; c < 3; c++) {
				let u = n[c], d = n[(c + 1) % 3];
				i.set(a[u], a[d]), Go(r, i, e, t);
				let f = e.distanceToSquared(t);
				f < l && (l = f, o && o.copy(e), s && s.copy(t));
			}
		}
		return Math.sqrt(l);
	};
})();
//#endregion
//#region node_modules/three-mesh-bvh/src/math/OrientedBox.js
var Qo = class {
	constructor(e, t, n) {
		this.isOrientedBox = !0, this.min = new K(), this.max = new K(), this.matrix = new Ie(), this.invMatrix = new Ie(), this.points = Array(8).fill().map(() => new K()), this.satAxes = [
			,
			,
			,
		].fill().map(() => new K()), this.satBounds = [
			,
			,
			,
		].fill().map(() => new Uo()), this.alignedSatBounds = [
			,
			,
			,
		].fill().map(() => new Uo()), this.needsUpdate = !1, e && this.min.copy(e), t && this.max.copy(t), n && this.matrix.copy(n);
	}
	set(e, t, n) {
		this.min.copy(e), this.max.copy(t), this.matrix.copy(n), this.needsUpdate = !0;
	}
	copy(e) {
		this.min.copy(e.min), this.max.copy(e.max), this.matrix.copy(e.matrix), this.needsUpdate = !0;
	}
};
Qo.prototype.update = (function() {
	return function() {
		let e = this.matrix, t = this.min, n = this.max, r = this.points;
		for (let i = 0; i <= 1; i++) for (let a = 0; a <= 1; a++) for (let o = 0; o <= 1; o++) {
			let s = r[1 * i | 2 * a | 4 * o];
			s.x = i ? n.x : t.x, s.y = a ? n.y : t.y, s.z = o ? n.z : t.z, s.applyMatrix4(e);
		}
		let i = this.satBounds, a = this.satAxes, o = r[0];
		for (let e = 0; e < 3; e++) {
			let t = a[e], n = i[e], s = r[1 << e];
			t.subVectors(o, s), n.setFromPoints(t, r);
		}
		let s = this.alignedSatBounds;
		s[0].setFromPointsField(r, "x"), s[1].setFromPointsField(r, "y"), s[2].setFromPointsField(r, "z"), this.invMatrix.copy(this.matrix).invert(), this.needsUpdate = !1;
	};
})(), Qo.prototype.intersectsBox = (function() {
	let e = /* @__PURE__ */ new Uo();
	return function(t) {
		this.needsUpdate && this.update();
		let n = t.min, r = t.max, i = this.satBounds, a = this.satAxes, o = this.alignedSatBounds;
		if (e.min = n.x, e.max = r.x, o[0].isSeparated(e) || (e.min = n.y, e.max = r.y, o[1].isSeparated(e)) || (e.min = n.z, e.max = r.z, o[2].isSeparated(e))) return !1;
		for (let n = 0; n < 3; n++) {
			let r = a[n], o = i[n];
			if (e.setFromBox(r, t), o.isSeparated(e)) return !1;
		}
		return !0;
	};
})(), Qo.prototype.intersectsTriangle = (function() {
	let e = /* @__PURE__ */ new Zo(), t = [
		,
		,
		,
	], n = /* @__PURE__ */ new Uo(), r = /* @__PURE__ */ new Uo(), i = /* @__PURE__ */ new K();
	return function(a) {
		this.needsUpdate && this.update(), a.isExtendedTriangle ? a.needsUpdate && a.update() : (e.copy(a), e.update(), a = e);
		let o = this.satBounds, s = this.satAxes;
		t[0] = a.a, t[1] = a.b, t[2] = a.c;
		for (let e = 0; e < 3; e++) {
			let r = o[e], i = s[e];
			if (n.setFromPoints(i, t), r.isSeparated(n)) return !1;
		}
		let c = a.satBounds, l = a.satAxes, u = this.points;
		for (let e = 0; e < 3; e++) {
			let t = c[e], r = l[e];
			if (n.setFromPoints(r, u), t.isSeparated(n)) return !1;
		}
		for (let e = 0; e < 3; e++) {
			let a = s[e];
			for (let e = 0; e < 4; e++) {
				let o = l[e];
				if (i.crossVectors(a, o), n.setFromPoints(i, t), r.setFromPoints(i, u), n.isSeparated(r)) return !1;
			}
		}
		return !0;
	};
})(), Qo.prototype.closestPointToPoint = (function() {
	return function(e, t) {
		return this.needsUpdate && this.update(), t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix), t;
	};
})(), Qo.prototype.distanceToPoint = (function() {
	let e = new K();
	return function(t) {
		return this.closestPointToPoint(t, e), t.distanceTo(e);
	};
})(), Qo.prototype.distanceToBox = (function() {
	let e = [
		"x",
		"y",
		"z"
	], t = /* @__PURE__ */ Array(12).fill().map(() => new Ce()), n = /* @__PURE__ */ Array(12).fill().map(() => new Ce()), r = /* @__PURE__ */ new K(), i = /* @__PURE__ */ new K();
	return function(a, o = 0, s = null, c = null) {
		if (this.needsUpdate && this.update(), this.intersectsBox(a)) return (s || c) && (a.getCenter(i), this.closestPointToPoint(i, r), a.closestPointToPoint(r, i), s && s.copy(r), c && c.copy(i)), 0;
		let l = o * o, u = a.min, d = a.max, f = this.points, p = Infinity;
		for (let e = 0; e < 8; e++) {
			let t = f[e];
			i.copy(t).clamp(u, d);
			let n = t.distanceToSquared(i);
			if (n < p && (p = n, s && s.copy(t), c && c.copy(i), n < l)) return Math.sqrt(n);
		}
		let m = 0;
		for (let r = 0; r < 3; r++) for (let i = 0; i <= 1; i++) for (let a = 0; a <= 1; a++) {
			let o = (r + 1) % 3, s = (r + 2) % 3, c = i << o | a << s, l = 1 << r | i << o | a << s, p = f[c], h = f[l];
			t[m].set(p, h);
			let g = e[r], _ = e[o], v = e[s], y = n[m], b = y.start, x = y.end;
			b[g] = u[g], b[_] = i ? u[_] : d[_], b[v] = a ? u[v] : d[_], x[g] = d[g], x[_] = i ? u[_] : d[_], x[v] = a ? u[v] : d[_], m++;
		}
		for (let e = 0; e <= 1; e++) for (let t = 0; t <= 1; t++) for (let n = 0; n <= 1; n++) {
			i.x = e ? d.x : u.x, i.y = t ? d.y : u.y, i.z = n ? d.z : u.z, this.closestPointToPoint(i, r);
			let a = i.distanceToSquared(r);
			if (a < p && (p = a, s && s.copy(r), c && c.copy(i), a < l)) return Math.sqrt(a);
		}
		for (let e = 0; e < 12; e++) {
			let a = t[e];
			for (let e = 0; e < 12; e++) {
				let t = n[e];
				Go(a, t, r, i);
				let o = r.distanceToSquared(i);
				if (o < p && (p = o, s && s.copy(r), c && c.copy(i), o < l)) return Math.sqrt(o);
			}
		}
		return Math.sqrt(p);
	};
})();
var $o = /* @__PURE__ */ new class extends po {
	constructor() {
		super(() => new Zo());
	}
}(), es = /* @__PURE__ */ new K(), ts = /* @__PURE__ */ new K();
function ns(e, t, n = {}, r = 0, i = Infinity) {
	let a = r * r, o = i * i, s = Infinity, c = null;
	if (e.shapecast({
		boundsTraverseOrder: (e) => (es.copy(t).clamp(e.min, e.max), es.distanceToSquared(t)),
		intersectsBounds: (e, t, n) => n < s && n < o,
		intersectsTriangle: (e, n) => {
			e.closestPointToPoint(t, es);
			let r = t.distanceToSquared(es);
			return r < s && (ts.copy(es), s = r, c = n), r < a;
		}
	}), s === Infinity) return null;
	let l = Math.sqrt(s);
	return n.point ? n.point.copy(ts) : n.point = ts.clone(), n.distance = l, n.faceIndex = c, n;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/ThreeRayIntersectUtilities.js
var rs = parseInt(nt) >= 169, is = parseInt(nt) <= 161, as = /* @__PURE__ */ new K(), os = /* @__PURE__ */ new K(), ss = /* @__PURE__ */ new K(), cs = /* @__PURE__ */ new G(), ls = /* @__PURE__ */ new G(), us = /* @__PURE__ */ new G(), ds = /* @__PURE__ */ new K(), fs = /* @__PURE__ */ new K(), ps = /* @__PURE__ */ new K(), ms = /* @__PURE__ */ new K();
function hs(e, t, n, r, i, a, o, s) {
	let c;
	if (c = a === B ? e.intersectTriangle(r, n, t, !0, i) : e.intersectTriangle(t, n, r, a !== se, i), c === null) return null;
	let l = e.origin.distanceTo(i);
	return l < o || l > s ? null : {
		distance: l,
		point: i.clone()
	};
}
function gs(e, t, n, r, i, a, o, s, c, l, u) {
	as.fromBufferAttribute(t, a), os.fromBufferAttribute(t, o), ss.fromBufferAttribute(t, s);
	let d = hs(e, as, os, ss, ms, c, l, u);
	if (d) {
		if (r) {
			cs.fromBufferAttribute(r, a), ls.fromBufferAttribute(r, o), us.fromBufferAttribute(r, s), d.uv = new G();
			let e = gt.getInterpolation(ms, as, os, ss, cs, ls, us, d.uv);
			rs || (d.uv = e);
		}
		if (i) {
			cs.fromBufferAttribute(i, a), ls.fromBufferAttribute(i, o), us.fromBufferAttribute(i, s), d.uv1 = new G();
			let e = gt.getInterpolation(ms, as, os, ss, cs, ls, us, d.uv1);
			rs || (d.uv1 = e), is && (d.uv2 = d.uv1);
		}
		if (n) {
			ds.fromBufferAttribute(n, a), fs.fromBufferAttribute(n, o), ps.fromBufferAttribute(n, s), d.normal = new K();
			let t = gt.getInterpolation(ms, as, os, ss, ds, fs, ps, d.normal);
			d.normal.dot(e.direction) > 0 && d.normal.multiplyScalar(-1), rs || (d.normal = t);
		}
		let t = {
			a,
			b: o,
			c: s,
			normal: new K(),
			materialIndex: 0
		};
		if (gt.getNormal(as, os, ss, t.normal), d.face = t, d.faceIndex = a, rs) {
			let e = new K();
			gt.getBarycoord(ms, as, os, ss, e), d.barycoord = e;
		}
	}
	return d;
}
function _s(e) {
	return e && e.isMaterial ? e.side : e;
}
function vs(e, t, n, r, i, a, o) {
	let s = r * 3, c = s + 0, l = s + 1, u = s + 2, { index: d, groups: f } = e;
	e.index && (c = d.getX(c), l = d.getX(l), u = d.getX(u));
	let { position: p, normal: m, uv: h, uv1: g } = e.attributes;
	if (Array.isArray(t)) {
		let e = r * 3;
		for (let s = 0, d = f.length; s < d; s++) {
			let { start: d, count: _, materialIndex: v } = f[s];
			if (e >= d && e < d + _) {
				let e = _s(t[v]), s = gs(n, p, m, h, g, c, l, u, e, a, o);
				if (s) if (s.faceIndex = r, s.face.materialIndex = v, i) i.push(s);
				else return s;
			}
		}
	} else {
		let e = _s(t), s = gs(n, p, m, h, g, c, l, u, e, a, o);
		if (s) if (s.faceIndex = r, s.face.materialIndex = 0, i) i.push(s);
		else return s;
	}
	return null;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/TriangleUtilities.js
function ys(e, t, n, r) {
	let i = e.a, a = e.b, o = e.c, s = t, c = t + 1, l = t + 2;
	n && (s = n.getX(s), c = n.getX(c), l = n.getX(l)), i.x = r.getX(s), i.y = r.getY(s), i.z = r.getZ(s), a.x = r.getX(c), a.y = r.getY(c), a.z = r.getZ(c), o.x = r.getX(l), o.y = r.getY(l), o.z = r.getZ(l);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/iterationUtils.generated.js
function bs(e, t, n, r, i, a, o, s) {
	let { geometry: c, _indirectBuffer: l } = e;
	for (let e = r, l = r + i; e < l; e++) vs(c, t, n, e, a, o, s);
}
function xs(e, t, n, r, i, a, o) {
	let { geometry: s, _indirectBuffer: c } = e, l = Infinity, u = null;
	for (let e = r, c = r + i; e < c; e++) {
		let r;
		r = vs(s, t, n, e, null, a, o), r && r.distance < l && (u = r, l = r.distance);
	}
	return u;
}
function Ss(e, t, n, r, i, a, o) {
	let { geometry: s } = n, { index: c } = s, l = s.attributes.position;
	for (let n = e, s = t + e; n < s; n++) {
		let e;
		if (e = n, ys(o, e * 3, c, l), o.needsUpdate = !0, r(o, e, i, a)) return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/refit.generated.js
function Cs(e, t = null) {
	t && Array.isArray(t) && (t = new Set(t));
	let n = e.geometry, r = n.index ? n.index.array : null, i = n.attributes.position, a, o, s, c, l = 0, u = e._roots;
	for (let e = 0, t = u.length; e < t; e++) a = u[e], o = new Uint32Array(a), s = new Uint16Array(a), c = new Float32Array(a), d(0, l), l += a.byteLength;
	function d(e, n, a = !1) {
		let l = e * 2;
		if (Ba(l, s)) {
			let t = Va(e, o), n = Ha(l, s), a = Infinity, u = Infinity, d = Infinity, f = -Infinity, p = -Infinity, m = -Infinity;
			for (let e = 3 * t, o = 3 * (t + n); e < o; e++) {
				let t = r[e], n = i.getX(t), o = i.getY(t), s = i.getZ(t);
				n < a && (a = n), n > f && (f = n), o < u && (u = o), o > p && (p = o), s < d && (d = s), s > m && (m = s);
			}
			return c[e + 0] !== a || c[e + 1] !== u || c[e + 2] !== d || c[e + 3] !== f || c[e + 4] !== p || c[e + 5] !== m ? (c[e + 0] = a, c[e + 1] = u, c[e + 2] = d, c[e + 3] = f, c[e + 4] = p, c[e + 5] = m, !0) : !1;
		} else {
			let r = Ua(e), i = Wa(e, o), s = a, l = !1, u = !1;
			if (t) {
				if (!s) {
					let e = r / 8 + n / 32, a = i / 8 + n / 32;
					l = t.has(e), u = t.has(a), s = !l && !u;
				}
			} else l = !0, u = !0;
			let f = s || l, p = s || u, m = !1;
			f && (m = d(r, n, s));
			let h = !1;
			p && (h = d(i, n, s));
			let g = m || h;
			if (g) for (let t = 0; t < 3; t++) {
				let n = r + t, a = i + t, o = c[n], s = c[n + 3], l = c[a], u = c[a + 3];
				c[e + t] = o < l ? o : l, c[e + t + 3] = s > u ? s : u;
			}
			return g;
		}
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/intersectUtils.js
function ws(e, t, n, r, i) {
	let a, o, s, c, l, u, d = 1 / n.direction.x, f = 1 / n.direction.y, p = 1 / n.direction.z, m = n.origin.x, h = n.origin.y, g = n.origin.z, _ = t[e], v = t[e + 3], y = t[e + 1], b = t[e + 3 + 1], x = t[e + 2], S = t[e + 3 + 2];
	return d >= 0 ? (a = (_ - m) * d, o = (v - m) * d) : (a = (v - m) * d, o = (_ - m) * d), f >= 0 ? (s = (y - h) * f, c = (b - h) * f) : (s = (b - h) * f, c = (y - h) * f), a > c || s > o || ((s > a || isNaN(a)) && (a = s), (c < o || isNaN(o)) && (o = c), p >= 0 ? (l = (x - g) * p, u = (S - g) * p) : (l = (S - g) * p, u = (x - g) * p), a > u || l > o) ? !1 : ((l > a || a !== a) && (a = l), (u < o || o !== o) && (o = u), a <= i && o >= r);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/iterationUtils_indirect.generated.js
function Ts(e, t, n, r, i, a, o, s) {
	let { geometry: c, _indirectBuffer: l } = e;
	for (let e = r, u = r + i; e < u; e++) vs(c, t, n, l ? l[e] : e, a, o, s);
}
function Es(e, t, n, r, i, a, o) {
	let { geometry: s, _indirectBuffer: c } = e, l = Infinity, u = null;
	for (let e = r, d = r + i; e < d; e++) {
		let r;
		r = vs(s, t, n, c ? c[e] : e, null, a, o), r && r.distance < l && (u = r, l = r.distance);
	}
	return u;
}
function Ds(e, t, n, r, i, a, o) {
	let { geometry: s } = n, { index: c } = s, l = s.attributes.position;
	for (let s = e, u = t + e; s < u; s++) {
		let e;
		if (e = n.resolveTriangleIndex(s), ys(o, e * 3, c, l), o.needsUpdate = !0, r(o, e, i, a)) return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycast.generated.js
function Os(e, t, n, r, i, a, o) {
	Q.setBuffer(e._roots[t]), ks(0, e, n, r, i, a, o), Q.clearBuffer();
}
function ks(e, t, n, r, i, a, o) {
	let { float32Array: s, uint16Array: c, uint32Array: l } = Q, u = e * 2;
	if (Ba(u, c)) bs(t, n, r, Va(e, l), Ha(u, c), i, a, o);
	else {
		let c = Ua(e);
		ws(c, s, r, a, o) && ks(c, t, n, r, i, a, o);
		let u = Wa(e, l);
		ws(u, s, r, a, o) && ks(u, t, n, r, i, a, o);
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycastFirst.generated.js
var As = [
	"x",
	"y",
	"z"
];
function js(e, t, n, r, i, a) {
	Q.setBuffer(e._roots[t]);
	let o = Ms(0, e, n, r, i, a);
	return Q.clearBuffer(), o;
}
function Ms(e, t, n, r, i, a) {
	let { float32Array: o, uint16Array: s, uint32Array: c } = Q, l = e * 2;
	if (Ba(l, s)) return xs(t, n, r, Va(e, c), Ha(l, s), i, a);
	{
		let s = Ga(e, c), l = As[s], u = r.direction[l] >= 0, d, f;
		u ? (d = Ua(e), f = Wa(e, c)) : (d = Wa(e, c), f = Ua(e));
		let p = ws(d, o, r, i, a) ? Ms(d, t, n, r, i, a) : null;
		if (p) {
			let e = p.point[l];
			if (u ? e <= o[f + s] : e >= o[f + s + 3]) return p;
		}
		let m = ws(f, o, r, i, a) ? Ms(f, t, n, r, i, a) : null;
		return p && m ? p.distance <= m.distance ? p : m : p || m || null;
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/intersectsGeometry.generated.js
var Ns = /* @__PURE__ */ new U(), Ps = /* @__PURE__ */ new Zo(), Fs = /* @__PURE__ */ new Zo(), Is = /* @__PURE__ */ new Ie(), Ls = /* @__PURE__ */ new Qo(), Rs = /* @__PURE__ */ new Qo();
function zs(e, t, n, r) {
	Q.setBuffer(e._roots[t]);
	let i = Bs(0, e, n, r);
	return Q.clearBuffer(), i;
}
function Bs(e, t, n, r, i = null) {
	let { float32Array: a, uint16Array: o, uint32Array: s } = Q, c = e * 2;
	if (i === null && (n.boundingBox || n.computeBoundingBox(), Ls.set(n.boundingBox.min, n.boundingBox.max, r), i = Ls), Ba(c, o)) {
		let i = t.geometry, l = i.index, u = i.attributes.position, d = n.index, f = n.attributes.position, p = Va(e, s), m = Ha(c, o);
		if (Is.copy(r).invert(), n.boundsTree) return Z(Ka(e), a, Rs), Rs.matrix.copy(Is), Rs.needsUpdate = !0, n.boundsTree.shapecast({
			intersectsBounds: (e) => Rs.intersectsBox(e),
			intersectsTriangle: (e) => {
				e.a.applyMatrix4(r), e.b.applyMatrix4(r), e.c.applyMatrix4(r), e.needsUpdate = !0;
				for (let t = p * 3, n = (m + p) * 3; t < n; t += 3) if (ys(Fs, t, l, u), Fs.needsUpdate = !0, e.intersectsTriangle(Fs)) return !0;
				return !1;
			}
		});
		{
			let e = Fo(n);
			for (let t = p * 3, n = (m + p) * 3; t < n; t += 3) {
				ys(Ps, t, l, u), Ps.a.applyMatrix4(Is), Ps.b.applyMatrix4(Is), Ps.c.applyMatrix4(Is), Ps.needsUpdate = !0;
				for (let t = 0, n = e * 3; t < n; t += 3) if (ys(Fs, t, d, f), Fs.needsUpdate = !0, Ps.intersectsTriangle(Fs)) return !0;
			}
		}
	} else {
		let o = Ua(e), c = Wa(e, s);
		return Z(Ka(o), a, Ns), !!(i.intersectsBox(Ns) && Bs(o, t, n, r, i) || (Z(Ka(c), a, Ns), i.intersectsBox(Ns) && Bs(c, t, n, r, i)));
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/closestPointToGeometry.generated.js
var Vs = /* @__PURE__ */ new Ie(), Hs = /* @__PURE__ */ new Qo(), Us = /* @__PURE__ */ new Qo(), Ws = /* @__PURE__ */ new K(), Gs = /* @__PURE__ */ new K(), Ks = /* @__PURE__ */ new K(), qs = /* @__PURE__ */ new K();
function Js(e, t, n, r = {}, i = {}, a = 0, o = Infinity) {
	t.boundingBox || t.computeBoundingBox(), Hs.set(t.boundingBox.min, t.boundingBox.max, n), Hs.needsUpdate = !0;
	let s = e.geometry, c = s.attributes.position, l = s.index, u = t.attributes.position, d = t.index, f = $o.getPrimitive(), p = $o.getPrimitive(), m = Ws, h = Gs, g = null, _ = null;
	i && (g = Ks, _ = qs);
	let v = Infinity, y = null, b = null;
	return Vs.copy(n).invert(), Us.matrix.copy(Vs), e.shapecast({
		boundsTraverseOrder: (e) => Hs.distanceToBox(e),
		intersectsBounds: (e, t, n) => n < v && n < o ? (t && (Us.min.copy(e.min), Us.max.copy(e.max), Us.needsUpdate = !0), !0) : !1,
		intersectsRange: (e, r) => {
			if (t.boundsTree) return t.boundsTree.shapecast({
				boundsTraverseOrder: (e) => Us.distanceToBox(e),
				intersectsBounds: (e, t, n) => n < v && n < o,
				intersectsRange: (t, i) => {
					for (let o = t, s = t + i; o < s; o++) {
						ys(p, 3 * o, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
						for (let t = e, n = e + r; t < n; t++) {
							ys(f, 3 * t, l, c), f.needsUpdate = !0;
							let e = f.distanceToTriangle(p, m, g);
							if (e < v && (h.copy(m), _ && _.copy(g), v = e, y = t, b = o), e < a) return !0;
						}
					}
				}
			});
			{
				let i = Fo(t);
				for (let t = 0, o = i; t < o; t++) {
					ys(p, 3 * t, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
					for (let n = e, i = e + r; n < i; n++) {
						ys(f, 3 * n, l, c), f.needsUpdate = !0;
						let e = f.distanceToTriangle(p, m, g);
						if (e < v && (h.copy(m), _ && _.copy(g), v = e, y = n, b = t), e < a) return !0;
					}
				}
			}
		}
	}), $o.releasePrimitive(f), $o.releasePrimitive(p), v === Infinity ? null : (r.point ? r.point.copy(h) : r.point = h.clone(), r.distance = v, r.faceIndex = y, i && (i.point ? i.point.copy(_) : i.point = _.clone(), i.point.applyMatrix4(Vs), h.applyMatrix4(Vs), i.distance = h.sub(i.point).length(), i.faceIndex = b), r);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/refit_indirect.generated.js
function Ys(e, t = null) {
	t && Array.isArray(t) && (t = new Set(t));
	let n = e.geometry, r = n.index ? n.index.array : null, i = n.attributes.position, a, o, s, c, l = 0, u = e._roots;
	for (let e = 0, t = u.length; e < t; e++) a = u[e], o = new Uint32Array(a), s = new Uint16Array(a), c = new Float32Array(a), d(0, l), l += a.byteLength;
	function d(n, a, l = !1) {
		let u = n * 2;
		if (Ba(u, s)) {
			let t = Va(n, o), a = Ha(u, s), l = Infinity, d = Infinity, f = Infinity, p = -Infinity, m = -Infinity, h = -Infinity;
			for (let n = t, o = t + a; n < o; n++) {
				let t = 3 * e.resolveTriangleIndex(n);
				for (let e = 0; e < 3; e++) {
					let n = t + e;
					n = r ? r[n] : n;
					let a = i.getX(n), o = i.getY(n), s = i.getZ(n);
					a < l && (l = a), a > p && (p = a), o < d && (d = o), o > m && (m = o), s < f && (f = s), s > h && (h = s);
				}
			}
			return c[n + 0] !== l || c[n + 1] !== d || c[n + 2] !== f || c[n + 3] !== p || c[n + 4] !== m || c[n + 5] !== h ? (c[n + 0] = l, c[n + 1] = d, c[n + 2] = f, c[n + 3] = p, c[n + 4] = m, c[n + 5] = h, !0) : !1;
		} else {
			let e = Ua(n), r = Wa(n, o), i = l, s = !1, u = !1;
			if (t) {
				if (!i) {
					let n = e / 8 + a / 32, o = r / 8 + a / 32;
					s = t.has(n), u = t.has(o), i = !s && !u;
				}
			} else s = !0, u = !0;
			let f = i || s, p = i || u, m = !1;
			f && (m = d(e, a, i));
			let h = !1;
			p && (h = d(r, a, i));
			let g = m || h;
			if (g) for (let t = 0; t < 3; t++) {
				let i = e + t, a = r + t, o = c[i], s = c[i + 3], l = c[a], u = c[a + 3];
				c[n + t] = o < l ? o : l, c[n + t + 3] = s > u ? s : u;
			}
			return g;
		}
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycast_indirect.generated.js
function Xs(e, t, n, r, i, a, o) {
	Q.setBuffer(e._roots[t]), Zs(0, e, n, r, i, a, o), Q.clearBuffer();
}
function Zs(e, t, n, r, i, a, o) {
	let { float32Array: s, uint16Array: c, uint32Array: l } = Q, u = e * 2;
	if (Ba(u, c)) Ts(t, n, r, Va(e, l), Ha(u, c), i, a, o);
	else {
		let c = Ua(e);
		ws(c, s, r, a, o) && Zs(c, t, n, r, i, a, o);
		let u = Wa(e, l);
		ws(u, s, r, a, o) && Zs(u, t, n, r, i, a, o);
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycastFirst_indirect.generated.js
var Qs = [
	"x",
	"y",
	"z"
];
function $s(e, t, n, r, i, a) {
	Q.setBuffer(e._roots[t]);
	let o = ec(0, e, n, r, i, a);
	return Q.clearBuffer(), o;
}
function ec(e, t, n, r, i, a) {
	let { float32Array: o, uint16Array: s, uint32Array: c } = Q, l = e * 2;
	if (Ba(l, s)) return Es(t, n, r, Va(e, c), Ha(l, s), i, a);
	{
		let s = Ga(e, c), l = Qs[s], u = r.direction[l] >= 0, d, f;
		u ? (d = Ua(e), f = Wa(e, c)) : (d = Wa(e, c), f = Ua(e));
		let p = ws(d, o, r, i, a) ? ec(d, t, n, r, i, a) : null;
		if (p) {
			let e = p.point[l];
			if (u ? e <= o[f + s] : e >= o[f + s + 3]) return p;
		}
		let m = ws(f, o, r, i, a) ? ec(f, t, n, r, i, a) : null;
		return p && m ? p.distance <= m.distance ? p : m : p || m || null;
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/intersectsGeometry_indirect.generated.js
var tc = /* @__PURE__ */ new U(), nc = /* @__PURE__ */ new Zo(), rc = /* @__PURE__ */ new Zo(), ic = /* @__PURE__ */ new Ie(), ac = /* @__PURE__ */ new Qo(), oc = /* @__PURE__ */ new Qo();
function sc(e, t, n, r) {
	Q.setBuffer(e._roots[t]);
	let i = cc(0, e, n, r);
	return Q.clearBuffer(), i;
}
function cc(e, t, n, r, i = null) {
	let { float32Array: a, uint16Array: o, uint32Array: s } = Q, c = e * 2;
	if (i === null && (n.boundingBox || n.computeBoundingBox(), ac.set(n.boundingBox.min, n.boundingBox.max, r), i = ac), Ba(c, o)) {
		let i = t.geometry, l = i.index, u = i.attributes.position, d = n.index, f = n.attributes.position, p = Va(e, s), m = Ha(c, o);
		if (ic.copy(r).invert(), n.boundsTree) return Z(Ka(e), a, oc), oc.matrix.copy(ic), oc.needsUpdate = !0, n.boundsTree.shapecast({
			intersectsBounds: (e) => oc.intersectsBox(e),
			intersectsTriangle: (e) => {
				e.a.applyMatrix4(r), e.b.applyMatrix4(r), e.c.applyMatrix4(r), e.needsUpdate = !0;
				for (let n = p, r = m + p; n < r; n++) if (ys(rc, 3 * t.resolveTriangleIndex(n), l, u), rc.needsUpdate = !0, e.intersectsTriangle(rc)) return !0;
				return !1;
			}
		});
		{
			let e = Fo(n);
			for (let n = p, r = m + p; n < r; n++) {
				ys(nc, 3 * t.resolveTriangleIndex(n), l, u), nc.a.applyMatrix4(ic), nc.b.applyMatrix4(ic), nc.c.applyMatrix4(ic), nc.needsUpdate = !0;
				for (let t = 0, n = e * 3; t < n; t += 3) if (ys(rc, t, d, f), rc.needsUpdate = !0, nc.intersectsTriangle(rc)) return !0;
			}
		}
	} else {
		let o = Ua(e), c = Wa(e, s);
		return Z(Ka(o), a, tc), !!(i.intersectsBox(tc) && cc(o, t, n, r, i) || (Z(Ka(c), a, tc), i.intersectsBox(tc) && cc(c, t, n, r, i)));
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/closestPointToGeometry_indirect.generated.js
var lc = /* @__PURE__ */ new Ie(), uc = /* @__PURE__ */ new Qo(), dc = /* @__PURE__ */ new Qo(), fc = /* @__PURE__ */ new K(), pc = /* @__PURE__ */ new K(), mc = /* @__PURE__ */ new K(), hc = /* @__PURE__ */ new K();
function gc(e, t, n, r = {}, i = {}, a = 0, o = Infinity) {
	t.boundingBox || t.computeBoundingBox(), uc.set(t.boundingBox.min, t.boundingBox.max, n), uc.needsUpdate = !0;
	let s = e.geometry, c = s.attributes.position, l = s.index, u = t.attributes.position, d = t.index, f = $o.getPrimitive(), p = $o.getPrimitive(), m = fc, h = pc, g = null, _ = null;
	i && (g = mc, _ = hc);
	let v = Infinity, y = null, b = null;
	return lc.copy(n).invert(), dc.matrix.copy(lc), e.shapecast({
		boundsTraverseOrder: (e) => uc.distanceToBox(e),
		intersectsBounds: (e, t, n) => n < v && n < o ? (t && (dc.min.copy(e.min), dc.max.copy(e.max), dc.needsUpdate = !0), !0) : !1,
		intersectsRange: (r, i) => {
			if (t.boundsTree) {
				let s = t.boundsTree;
				return s.shapecast({
					boundsTraverseOrder: (e) => dc.distanceToBox(e),
					intersectsBounds: (e, t, n) => n < v && n < o,
					intersectsRange: (t, o) => {
						for (let x = t, S = t + o; x < S; x++) {
							ys(p, 3 * s.resolveTriangleIndex(x), d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
							for (let t = r, n = r + i; t < n; t++) {
								ys(f, 3 * e.resolveTriangleIndex(t), l, c), f.needsUpdate = !0;
								let n = f.distanceToTriangle(p, m, g);
								if (n < v && (h.copy(m), _ && _.copy(g), v = n, y = t, b = x), n < a) return !0;
							}
						}
					}
				});
			} else {
				let o = Fo(t);
				for (let t = 0, s = o; t < s; t++) {
					ys(p, 3 * t, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
					for (let n = r, o = r + i; n < o; n++) {
						ys(f, 3 * e.resolveTriangleIndex(n), l, c), f.needsUpdate = !0;
						let r = f.distanceToTriangle(p, m, g);
						if (r < v && (h.copy(m), _ && _.copy(g), v = r, y = n, b = t), r < a) return !0;
					}
				}
			}
		}
	}), $o.releasePrimitive(f), $o.releasePrimitive(p), v === Infinity ? null : (r.point ? r.point.copy(h) : r.point = h.clone(), r.distance = v, r.faceIndex = y, i && (i.point ? i.point.copy(_) : i.point = _.clone(), i.point.applyMatrix4(lc), h.applyMatrix4(lc), i.distance = h.sub(i.point).length(), i.faceIndex = b), r);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/GeometryRayIntersectUtilities.js
function _c(e, t, n) {
	return e === null ? null : (e.point.applyMatrix4(t.matrixWorld), e.distance = e.point.distanceTo(n.ray.origin), e.object = t, e);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/MeshBVH.js
var vc = /* @__PURE__ */ new Qo(), yc = /* @__PURE__ */ new rt(), bc = /* @__PURE__ */ new K(), xc = /* @__PURE__ */ new Ie(), Sc = /* @__PURE__ */ new K(), Cc = [
	"getX",
	"getY",
	"getZ"
], wc = class e extends Ho {
	static serialize(e, t = {}) {
		t = {
			cloneBuffers: !0,
			...t
		};
		let n = e.geometry, r = e._roots, i = e._indirectBuffer, a = n.getIndex(), o = {
			version: 1,
			roots: null,
			index: null,
			indirectBuffer: null
		};
		return t.cloneBuffers ? (o.roots = r.map((e) => e.slice()), o.index = a ? a.array.slice() : null, o.indirectBuffer = i ? i.slice() : null) : (o.roots = r, o.index = a ? a.array : null, o.indirectBuffer = i), o;
	}
	static deserialize(t, n, r = {}) {
		r = {
			setIndex: !0,
			indirect: !!t.indirectBuffer,
			...r
		};
		let { index: i, roots: a, indirectBuffer: o } = t;
		t.version || (console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."), c(a));
		let s = new e(n, {
			...r,
			[Na]: !0
		});
		if (s._roots = a, s._indirectBuffer = o || null, r.setIndex) {
			let e = n.getIndex();
			if (e === null) {
				let e = new te(t.index, 1, !1);
				n.setIndex(e);
			} else e.array !== i && (e.array.set(i), e.needsUpdate = !0);
		}
		return s;
		function c(e) {
			for (let t = 0; t < e.length; t++) {
				let n = e[t], r = new Uint32Array(n), i = new Uint16Array(n);
				for (let e = 0, t = n.byteLength / 32; e < t; e++) {
					let t = 8 * e;
					Ba(2 * t, i) || (r[t + 6] = r[t + 6] / 8 - e);
				}
			}
		}
	}
	get primitiveStride() {
		return 3;
	}
	get resolveTriangleIndex() {
		return this.resolvePrimitiveIndex;
	}
	constructor(e, t = {}) {
		t.maxLeafTris && (console.warn("MeshBVH: \"maxLeafTris\" option has been deprecated. Use maxLeafSize, instead."), t = {
			...t,
			maxLeafSize: t.maxLeafTris
		}), super(e, t);
	}
	shiftTriangleOffsets(e) {
		return super.shiftPrimitiveOffsets(e);
	}
	writePrimitiveBounds(e, t, n) {
		let r = this.geometry, i = this._indirectBuffer, a = r.attributes.position, o = r.index ? r.index.array : null, s = (i ? i[e] : e) * 3, c = s + 0, l = s + 1, u = s + 2;
		o && (c = o[c], l = o[l], u = o[u]);
		for (let e = 0; e < 3; e++) {
			let r = a[Cc[e]](c), i = a[Cc[e]](l), o = a[Cc[e]](u), s = r;
			i < s && (s = i), o < s && (s = o);
			let d = r;
			i > d && (d = i), o > d && (d = o), t[n + e] = s, t[n + e + 3] = d;
		}
		return t;
	}
	computePrimitiveBounds(e, t, n) {
		let r = this.geometry, i = this._indirectBuffer, a = r.attributes.position, o = r.index ? r.index.array : null, s = a.normalized;
		if (e < 0 || t + e - n.offset > n.length / 6) throw Error("MeshBVH: compute triangle bounds range is invalid.");
		let c = a.array, l = a.offset || 0, u = 3;
		a.isInterleavedBufferAttribute && (u = a.data.stride);
		let d = [
			"getX",
			"getY",
			"getZ"
		], f = n.offset;
		for (let r = e, p = e + t; r < p; r++) {
			let e = (i ? i[r] : r) * 3, t = (r - f) * 6, p = e + 0, m = e + 1, h = e + 2;
			o && (p = o[p], m = o[m], h = o[h]), s || (p = p * u + l, m = m * u + l, h = h * u + l);
			for (let e = 0; e < 3; e++) {
				let r, i, o;
				s ? (r = a[d[e]](p), i = a[d[e]](m), o = a[d[e]](h)) : (r = c[p + e], i = c[m + e], o = c[h + e]);
				let l = r;
				i < l && (l = i), o < l && (l = o);
				let u = r;
				i > u && (u = i), o > u && (u = o);
				let f = (u - l) / 2, g = e * 2;
				n[t + g + 0] = l + f, n[t + g + 1] = f + (Math.abs(l) + f) * Ma;
			}
		}
		return n;
	}
	raycastObject3D(e, t, n = []) {
		let { material: r } = e;
		if (r === void 0) return;
		xc.copy(e.matrixWorld).invert(), yc.copy(t.ray).applyMatrix4(xc), Sc.setFromMatrixScale(e.matrixWorld), bc.copy(yc.direction).multiply(Sc);
		let i = bc.length(), a = t.near / i, o = t.far / i;
		if (t.firstHitOnly === !0) {
			let i = this.raycastFirst(yc, r, a, o);
			i = _c(i, e, t), i && n.push(i);
		} else {
			let i = this.raycast(yc, r, a, o);
			for (let r = 0, a = i.length; r < a; r++) {
				let a = _c(i[r], e, t);
				a && n.push(a);
			}
		}
		return n;
	}
	refit(e = null) {
		return (this.indirect ? Ys : Cs)(this, e);
	}
	raycast(e, t = ue, n = 0, r = Infinity) {
		let i = this._roots, a = [], o = this.indirect ? Xs : Os;
		for (let s = 0, c = i.length; s < c; s++) o(this, s, t, e, a, n, r);
		return a;
	}
	raycastFirst(e, t = ue, n = 0, r = Infinity) {
		let i = this._roots, a = null, o = this.indirect ? $s : js;
		for (let s = 0, c = i.length; s < c; s++) {
			let i = o(this, s, t, e, n, r);
			i != null && (a == null || i.distance < a.distance) && (a = i);
		}
		return a;
	}
	intersectsGeometry(e, t) {
		let n = !1, r = this._roots, i = this.indirect ? sc : zs;
		for (let a = 0, o = r.length; a < o && (n = i(this, a, e, t), !n); a++);
		return n;
	}
	shapecast(e) {
		let t = $o.getPrimitive(), n = super.shapecast({
			...e,
			intersectsPrimitive: e.intersectsTriangle,
			scratchPrimitive: t,
			iterate: this.indirect ? Ds : Ss
		});
		return $o.releasePrimitive(t), n;
	}
	bvhcast(t, n, r) {
		let { intersectsRanges: i, intersectsTriangles: a } = r, o = $o.getPrimitive(), s = this.geometry.index, c = this.geometry.attributes.position, l = this.indirect ? (e) => {
			ys(o, this.resolveTriangleIndex(e) * 3, s, c);
		} : (e) => {
			ys(o, e * 3, s, c);
		}, u = $o.getPrimitive(), d = t.geometry.index, f = t.geometry.attributes.position, p = t.indirect ? (e) => {
			ys(u, t.resolveTriangleIndex(e) * 3, d, f);
		} : (e) => {
			ys(u, e * 3, d, f);
		};
		if (a) {
			if (!(t instanceof e)) throw Error("MeshBVH: \"intersectsTriangles\" callback can only be used with another MeshBVH.");
			let r = (e, t, r, i, s, c, d, f) => {
				for (let m = r, h = r + i; m < h; m++) {
					p(m), u.a.applyMatrix4(n), u.b.applyMatrix4(n), u.c.applyMatrix4(n), u.needsUpdate = !0;
					for (let n = e, r = e + t; n < r; n++) if (l(n), o.needsUpdate = !0, a(o, u, n, m, s, c, d, f)) return !0;
				}
				return !1;
			};
			if (i) {
				let e = i;
				i = function(t, n, i, a, o, s, c, l) {
					return e(t, n, i, a, o, s, c, l) ? !0 : r(t, n, i, a, o, s, c, l);
				};
			} else i = r;
		}
		return super.bvhcast(t, n, { intersectsRanges: i });
	}
	intersectsBox(e, t) {
		return vc.set(e.min, e.max, t), vc.needsUpdate = !0, this.shapecast({
			intersectsBounds: (e) => vc.intersectsBox(e),
			intersectsTriangle: (e) => vc.intersectsTriangle(e)
		});
	}
	intersectsSphere(e) {
		return this.shapecast({
			intersectsBounds: (t) => e.intersectsBox(t),
			intersectsTriangle: (t) => t.intersectsSphere(e)
		});
	}
	closestPointToGeometry(e, t, n = {}, r = {}, i = 0, a = Infinity) {
		return (this.indirect ? gc : Js)(this, e, t, n, r, i, a);
	}
	closestPointToPoint(e, t = {}, n = 0, r = Infinity) {
		return ns(this, e, t, n, r);
	}
}, Tc = {
	Mesh: Le.prototype.raycast,
	Line: Se.prototype.raycast,
	LineSegments: Ee.prototype.raycast,
	LineLoop: Te.prototype.raycast,
	Points: Ze.prototype.raycast,
	BatchedMesh: V.prototype.raycast
}, Ec = /* @__PURE__ */ new Le(), Dc = [];
function Oc(e, t) {
	if (this.isBatchedMesh) kc.call(this, e, t);
	else {
		let { geometry: n } = this;
		if (n.boundsTree) n.boundsTree.raycastObject3D(this, e, t);
		else {
			let n;
			if (this instanceof Le) n = Tc.Mesh;
			else if (this instanceof Ee) n = Tc.LineSegments;
			else if (this instanceof Te) n = Tc.LineLoop;
			else if (this instanceof Se) n = Tc.Line;
			else if (this instanceof Ze) n = Tc.Points;
			else throw Error("BVH: Fallback raycast function not found.");
			n.call(this, e, t);
		}
	}
}
function kc(e, t) {
	if (this.boundsTrees) {
		let n = this.boundsTrees, r = this._drawInfo || this._instanceInfo, i = this._drawRanges || this._geometryInfo, a = this.matrixWorld;
		Ec.material = this.material, Ec.geometry = this.geometry;
		let o = Ec.geometry.boundsTree, s = Ec.geometry.drawRange;
		Ec.geometry.boundingSphere === null && (Ec.geometry.boundingSphere = new ut());
		for (let o = 0, s = r.length; o < s; o++) {
			if (!this.getVisibleAt(o)) continue;
			let s = r[o].geometryIndex;
			if (Ec.geometry.boundsTree = n[s], this.getMatrixAt(o, Ec.matrixWorld).premultiply(a), !Ec.geometry.boundsTree) {
				this.getBoundingBoxAt(s, Ec.geometry.boundingBox), this.getBoundingSphereAt(s, Ec.geometry.boundingSphere);
				let e = i[s];
				Ec.geometry.setDrawRange(e.start, e.count);
			}
			Ec.raycast(e, Dc);
			for (let e = 0, n = Dc.length; e < n; e++) {
				let n = Dc[e];
				n.object = this, n.batchId = o, t.push(n);
			}
			Dc.length = 0;
		}
		Ec.geometry.boundsTree = o, Ec.geometry.drawRange = s, Ec.material = null, Ec.geometry = null;
	} else Tc.BatchedMesh.call(this, e, t);
}
function Ac(e = {}) {
	let { type: t = wc } = e;
	return this.boundsTree = new t(this, e), this.boundsTree;
}
function jc() {
	this.boundsTree = null;
}
R.BufferGeometry.prototype.computeBoundsTree = Ac, R.BufferGeometry.prototype.disposeBoundsTree = jc, R.Mesh.prototype.raycast = Oc;
var Mc = class {
	camera;
	deviceRenderer;
	spaceRenderer;
	linkRenderer;
	raycaster = new R.Raycaster();
	pointer = new R.Vector2(-9999, -9999);
	groundPlane = new R.Plane(new R.Vector3(0, 1, 0), 0);
	lastTime = 0;
	constructor(e, t, n, r) {
		this.camera = e, this.deviceRenderer = t, this.spaceRenderer = n, this.linkRenderer = r;
	}
	updatePointer(e, t) {
		let n = t.getBoundingClientRect();
		this.pointer.x = (e.clientX - n.left) / n.width * 2 - 1, this.pointer.y = -((e.clientY - n.top) / n.height) * 2 + 1;
	}
	get currentPointer() {
		return this.pointer.clone();
	}
	clearPointer() {
		this.pointer.set(-9999, -9999);
	}
	castHover(e = 30) {
		let t = performance.now();
		return t - this.lastTime < e ? {} : (this.lastTime = t, this._cast());
	}
	castClick(e = !1) {
		return this._cast(e);
	}
	getGroundPoint(e, t) {
		this.updatePointer(e, t), this.raycaster.setFromCamera(this.pointer, this.camera);
		let n = new R.Vector3();
		return this.raycaster.ray.intersectPlane(this.groundPlane, n) ? n : null;
	}
	_cast(e = !1) {
		this.raycaster.setFromCamera(this.pointer, this.camera);
		let t = this.linkRenderer.getAllHandles().filter((e) => e.visible);
		if (t.length > 0) {
			let e = this.raycaster.intersectObjects(t, !1);
			if (e.length > 0) return {
				linkHandleId: e[0].object.userData.linkHandleId,
				worldPos: e[0].point,
				hitDistance: e[0].distance
			};
		}
		let n = this.deviceRenderer.getInstancedMeshes(), r = this.raycaster.intersectObjects(n, !1), i = this.raycaster.intersectObjects(this.spaceRenderer.getHitMeshes(), !1);
		if (r.length > 0) {
			let t = r[0].distance, n = r[0], a = n.object.userData.deviceType, o = this.deviceRenderer.getDeviceIdByInstance(a, n.instanceId);
			if (!e && t > 35 && i.length > 0) return {
				spaceId: i[0].object.userData.spaceId,
				worldPos: i[0].point,
				hitDistance: i[0].distance
			};
			if (o) return {
				deviceId: o,
				worldPos: n.point,
				hitDistance: t
			};
		}
		let a = this.linkRenderer.pickLink(this.raycaster);
		return a ? { linkId: a } : i.length > 0 ? {
			spaceId: i[0].object.userData.spaceId,
			worldPos: i[0].point,
			hitDistance: i[0].distance
		} : {};
	}
}, Nc = class {
	camera;
	linkRenderer;
	deviceRenderer;
	onCreate;
	state = "idle";
	sourceId = null;
	groundPlane = new R.Plane(new R.Vector3(0, 1, 0), 0);
	raycaster = new R.Raycaster();
	mouseWorld = new R.Vector3();
	dragThreshold = 6;
	_startX = 0;
	_startY = 0;
	_hasMoved = !1;
	constructor(e, t, n, r) {
		this.camera = e, this.linkRenderer = t, this.deviceRenderer = n, this.onCreate = r;
	}
	get isDrawing() {
		return this.state === "dragging";
	}
	get isDragging() {
		return this._hasMoved && this.state === "dragging";
	}
	get source() {
		return this.sourceId;
	}
	onMouseDown(e, t) {
		this.state = "dragging", this.sourceId = e, this._startX = t.clientX, this._startY = t.clientY, this._hasMoved = !1;
	}
	onMouseMove(e, t) {
		if (this.state !== "dragging" || !this.sourceId) return !1;
		let n = e.clientX - this._startX, r = e.clientY - this._startY;
		if (Math.sqrt(n * n + r * r) > this.dragThreshold && (this._hasMoved = !0), !this._hasMoved) return !1;
		let i = this.deviceRenderer.getDeviceWorldPos(this.sourceId);
		if (!i) return !1;
		let a = t.getBoundingClientRect(), o = new R.Vector2((e.clientX - a.left) / a.width * 2 - 1, -((e.clientY - a.top) / a.height) * 2 + 1);
		return this.raycaster.setFromCamera(o, this.camera), this.raycaster.ray.intersectPlane(this.groundPlane, this.mouseWorld), this.linkRenderer.showPreview(i, this.mouseWorld), !0;
	}
	onMouseUp(e, t) {
		return this.state === "dragging" ? this._hasMoved ? !e || !this.sourceId || e === this.sourceId ? (this.cancel(), "cancelled") : (this.onCreate(this.sourceId, e, t.clientX, t.clientY), this.cancel(), "created") : (this.cancel(), "click") : "cancelled";
	}
	cancel() {
		this.state = "idle", this.sourceId = null, this._hasMoved = !1, this.linkRenderer.hidePreview();
	}
}, Pc = class {
	state = "idle";
	targetId = null;
	targetType = null;
	startX = 0;
	startY = 0;
	groundPlane = new R.Plane(new R.Vector3(0, 1, 0), 0);
	raycaster = new R.Raycaster();
	worldPos = new R.Vector3();
	dragThreshold = 8;
	get isDragging() {
		return this.state === "dragging";
	}
	get hasPending() {
		return this.state !== "idle";
	}
	get currentTarget() {
		return {
			id: this.targetId,
			type: this.targetType
		};
	}
	onMouseDown(e, t, n) {
		this.state = "pending", this.targetId = e, this.targetType = t, this.startX = n.clientX, this.startY = n.clientY;
	}
	onMouseMove(e, t, n) {
		if (this.state === "idle") return null;
		let r = e.clientX - this.startX, i = e.clientY - this.startY;
		if (Math.sqrt(r * r + i * i) > this.dragThreshold && (this.state = "dragging"), this.state !== "dragging") return null;
		let a = t.getBoundingClientRect(), o = new R.Vector2((e.clientX - a.left) / a.width * 2 - 1, -((e.clientY - a.top) / a.height) * 2 + 1);
		return this.raycaster.setFromCamera(o, n), this.raycaster.ray.intersectPlane(this.groundPlane, this.worldPos) ? this.worldPos.clone() : null;
	}
	onMouseUp(e, t, n) {
		if (this.state !== "dragging") return this.cancel(), null;
		let r = t.getBoundingClientRect(), i = new R.Vector2((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
		this.raycaster.setFromCamera(i, n);
		let a = new R.Vector3();
		if (!this.raycaster.ray.intersectPlane(this.groundPlane, a)) return this.cancel(), null;
		let o = {
			targetId: this.targetId,
			targetType: this.targetType,
			newPos: a.clone()
		};
		return this.cancel(), o;
	}
	cancel() {
		this.state = "idle", this.targetId = null, this.targetType = null;
	}
};
//#endregion
//#region src/interaction/CameraController.ts
function Fc(e) {
	return e < .5 ? 4 * e ** 3 : 1 - (-2 * e + 2) ** 3 / 2;
}
var Ic = /* @__PURE__ */ new WeakMap();
function Lc(e, t, n, r, i) {
	Ic.get(t)?.();
	let a = performance.now(), o = e.position.clone(), s = t.target.clone(), c = 0, l = () => {
		cancelAnimationFrame(c), t.removeEventListener("start", l), Ic.delete(t);
	};
	Ic.set(t, l), t.addEventListener("start", l), window.matchMedia("(prefers-reduced-motion: reduce)").matches && (i = 0);
	let u = t.enableDamping;
	t.enableDamping = !1, t.update(), t.enableDamping = u;
	function d(u) {
		let f = i === 0 ? 1 : Math.min((u - a) / i, 1), p = Fc(f);
		e.position.lerpVectors(o, n, p), t.target.lerpVectors(s, r, p), f < 1 ? c = requestAnimationFrame(d) : l();
	}
	c = requestAnimationFrame(d);
}
var Rc = class {
	camera;
	controls;
	constructor(e, t) {
		this.camera = e, this.controls = t;
	}
	dispose() {
		Ic.get(this.controls)?.();
	}
	zoom(e) {
		let t = this.controls.target.clone(), n = this.camera.position.clone().sub(t), r = R.MathUtils.clamp(n.length() * e, this.controls.minDistance, this.controls.maxDistance);
		Lc(this.camera, this.controls, t.clone().add(n.setLength(r)), t, 180);
	}
	setView(e) {
		let t = this.controls.target.clone(), n = this.camera.position.distanceTo(t), r = e === "top" ? new R.Vector3(0, 1, .001) : new R.Vector3(.95, .55, 1), i = t.clone().add(r.normalize().multiplyScalar(n));
		Lc(this.camera, this.controls, i, t, 450);
	}
	flyTo(e, t, n = 750) {
		let r = t ?? e.clone().setY(0), i = e.clone();
		Lc(this.camera, this.controls, i, r, n);
	}
	flyToDevice(e) {
		let t = e.clone().add(new R.Vector3(2, 2.5, 3.5)), n = e.clone();
		Lc(this.camera, this.controls, t, n, 700);
	}
	flyToSpace(e, t) {
		let n = Math.max(t.width, t.depth) * .9, r = e.clone().add(new R.Vector3(0, n * .7, n * .8)), i = e.clone();
		Lc(this.camera, this.controls, r, i, 700);
	}
	flyToOverview() {
		Lc(this.camera, this.controls, new R.Vector3(0, 60, 80), new R.Vector3(0, 0, 0), 700);
	}
	panToXZ(e, t) {
		let n = new R.Vector3(e, this.controls.target.y, t), r = n.clone().sub(this.controls.target), i = this.camera.position.clone().add(r);
		Lc(this.camera, this.controls, i, n, 500);
	}
}, zc = class {
	group = new R.Group();
	scene;
	pickMeshes = [];
	target = null;
	ray = new R.Raycaster();
	constructor(e) {
		this.scene = e, this.group.visible = !1, this._build(), e.add(this.group);
	}
	_build() {
		let e = new R.Mesh(new R.BoxGeometry(.2, .2, .2), new R.MeshBasicMaterial({
			color: 16777062,
			depthTest: !1,
			transparent: !0,
			opacity: .9
		}));
		e.renderOrder = 1001, e.userData.axis = "xz", this.group.add(e), this.pickMeshes.push(e), this._buildAxis("x", 16724821, new R.Vector3(1, 0, 0)), this._buildAxis("y", 4513109, new R.Vector3(0, 1, 0)), this._buildAxis("z", 3381759, new R.Vector3(0, 0, 1));
		let t = new R.Mesh(new R.PlaneGeometry(.55, .55), new R.MeshBasicMaterial({
			color: 16777062,
			depthTest: !1,
			transparent: !0,
			opacity: .22,
			side: R.DoubleSide
		}));
		t.rotation.x = -Math.PI / 2, t.position.set(.5, 0, .5), t.renderOrder = 1e3, t.userData.axis = "xz", this.group.add(t), this.pickMeshes.push(t);
	}
	_buildAxis(e, t, n) {
		let r = new R.MeshBasicMaterial({
			color: t,
			depthTest: !1,
			transparent: !0
		}), i = 1.6, a = new R.Mesh(new R.CylinderGeometry(.04, .04, i, 8), r), o = new R.Mesh(new R.ConeGeometry(.13, .4, 12), r), s = new R.Quaternion().setFromUnitVectors(new R.Vector3(0, 1, 0), n);
		a.quaternion.copy(s), o.quaternion.copy(s), a.position.copy(n.clone().multiplyScalar(i / 2)), o.position.copy(n.clone().multiplyScalar(1.8)), a.userData.axis = e, o.userData.axis = e, a.renderOrder = 1001, o.renderOrder = 1001, this.group.add(a, o), this.pickMeshes.push(a, o);
	}
	attach(e, t) {
		this.target = e, this.group.position.copy(t), this.group.visible = !0;
	}
	detach() {
		this.target = null, this.group.visible = !1;
	}
	setPosition(e) {
		this.group.position.copy(e);
	}
	get isVisible() {
		return this.group.visible;
	}
	get currentTarget() {
		return this.target;
	}
	get position() {
		return this.group.position.clone();
	}
	update(e) {
		if (!this.group.visible) return;
		let t = e.position.distanceTo(this.group.position);
		this.group.scale.setScalar(Math.max(t * .045, .4));
	}
	pickAxis(e, t) {
		if (!this.group.visible) return null;
		this.ray.setFromCamera(e, t);
		let n = this.ray.intersectObjects(this.pickMeshes, !1);
		return n.length ? n[0].object.userData.axis ?? null : null;
	}
	isHovering(e, t) {
		return this.pickAxis(e, t) !== null;
	}
	dispose() {
		this.scene.remove(this.group), this.group.traverse((e) => {
			e instanceof R.Mesh && (e.geometry.dispose(), e.material.dispose());
		});
	}
}, Bc = class {
	frames = [];
	maxFrames = 120;
	recording = !1;
	_interval = null;
	get isRecording() {
		return this.recording;
	}
	get frameCount() {
		return this.frames.length;
	}
	get allFrames() {
		return this.frames;
	}
	startRecording(e) {
		if (this.recording) return;
		this.recording = !0, this.frames = [];
		let t = 0;
		this._interval = setInterval(() => {
			t++, this.frames.push({
				timestamp: Date.now(),
				label: `T+${t}s`,
				states: e()
			}), this.frames.length > this.maxFrames && this.frames.shift();
		}, 1e3);
	}
	stopRecording() {
		this.recording = !1, this._interval &&= (clearInterval(this._interval), null);
	}
	getFrame(e) {
		return this.frames[Math.max(0, Math.min(e, this.frames.length - 1))] ?? null;
	}
	addManualSnapshot(e, t) {
		this.frames.push({
			timestamp: Date.now(),
			label: e,
			states: t
		});
	}
	export() {
		return JSON.stringify(this.frames);
	}
	import(e) {
		try {
			this.frames = JSON.parse(e);
		} catch {}
	}
	dispose() {
		this.stopRecording(), this.frames = [];
	}
}, Vc = "topospace.customTypes", Hc = L("deviceTypes", () => {
	let e = S(t());
	function t() {
		try {
			let e = localStorage.getItem(Vc);
			return e ? new Map(JSON.parse(e).map((e) => [e.id, e])) : /* @__PURE__ */ new Map();
		} catch {
			return /* @__PURE__ */ new Map();
		}
	}
	function n() {
		localStorage.setItem(Vc, JSON.stringify([...e.value.values()]));
	}
	function r(t) {
		e.value.set(t.id, { ...t }), n();
	}
	function i(t) {
		e.value.delete(t), n();
	}
	return {
		customTypes: e,
		upsert: r,
		remove: i
	};
}), Uc = [
	"pointerdown",
	"mousedown",
	"pointerup",
	"mouseup",
	"click"
], Wc = /* @__PURE__ */ new WeakMap();
function Gc(e, t, n) {
	Kc(e);
	let r = (r) => {
		let i = r.target;
		e.contains(i) && ((!n || n(i)) && (r.preventDefault(), r.stopPropagation(), r.stopImmediatePropagation()), r.type === "click" && t?.(r));
	};
	for (let e of Uc) document.addEventListener(e, r, !0);
	Wc.set(e, r);
}
function Kc(e) {
	let t = Wc.get(e);
	if (t) {
		for (let e of Uc) document.removeEventListener(e, t, !0);
		Wc.delete(e);
	}
}
function qc(e, t) {
	let n = e.wrapper.getBoundingClientRect();
	return {
		width: n.width + t,
		height: n.height + t,
		realWidth: n.width,
		realHeight: n.height
	};
}
function Jc(e, t) {
	let { elementDimensions: n, popoverDimensions: r, popoverPadding: i, popoverArrowDimensions: a } = t;
	return e === "start" ? Math.max(Math.min(n.top - i, window.innerHeight - r.realHeight - a.width), a.width) : e === "end" ? Math.max(Math.min(n.top - r?.realHeight + n.height + i, window.innerHeight - r?.realHeight - a.width), a.width) : e === "center" ? Math.max(Math.min(n.top + n.height / 2 - r?.realHeight / 2, window.innerHeight - r?.realHeight - a.width), a.width) : 0;
}
function Yc(e, t) {
	let { elementDimensions: n, popoverDimensions: r, popoverPadding: i, popoverArrowDimensions: a } = t;
	return e === "start" ? Math.max(Math.min(n.left - i, window.innerWidth - r.realWidth - a.width), a.width) : e === "end" ? Math.max(Math.min(n.left - r?.realWidth + n.width + i, window.innerWidth - r?.realWidth - a.width), a.width) : e === "center" ? Math.max(Math.min(n.left + n.width / 2 - r?.realWidth / 2, window.innerWidth - r?.realWidth - a.width), a.width) : 0;
}
function Xc(e, t, n) {
	let { align: r, side: i } = n, a = n.centered ? "over" : i, o = n.padding, s = qc(e, n.offset), c = e.arrow.getBoundingClientRect(), l = t.getBoundingClientRect(), u = l.top - s.height, d = u >= 0, f = window.innerHeight - (l.bottom + s.height), p = f >= 0, m = l.left - s.width, h = m >= 0, g = window.innerWidth - (l.right + s.width), _ = g >= 0, v = !d && !p && !h && !_, y = a;
	if (a === "top" && d ? _ = h = p = !1 : a === "bottom" && p ? _ = h = d = !1 : a === "left" && h ? _ = d = p = !1 : a === "right" && _ && (h = d = p = !1), a === "over") {
		let t = window.innerWidth / 2 - s.realWidth / 2, n = window.innerHeight / 2 - s.realHeight / 2;
		e.wrapper.style.left = `${t}px`, e.wrapper.style.right = "auto", e.wrapper.style.top = `${n}px`, e.wrapper.style.bottom = "auto";
	} else if (v) {
		let t = window.innerWidth / 2 - s?.realWidth / 2;
		e.wrapper.style.left = `${t}px`, e.wrapper.style.right = "auto", e.wrapper.style.bottom = "10px", e.wrapper.style.top = "auto";
	} else if (h) {
		let t = Math.min(m, window.innerWidth - s?.realWidth - c.width), n = Jc(r, {
			elementDimensions: l,
			popoverDimensions: s,
			popoverPadding: o,
			popoverArrowDimensions: c
		});
		e.wrapper.style.left = `${t}px`, e.wrapper.style.top = `${n}px`, e.wrapper.style.bottom = "auto", e.wrapper.style.right = "auto", y = "left";
	} else if (_) {
		let t = Math.min(g, window.innerWidth - s?.realWidth - c.width), n = Jc(r, {
			elementDimensions: l,
			popoverDimensions: s,
			popoverPadding: o,
			popoverArrowDimensions: c
		});
		e.wrapper.style.right = `${t}px`, e.wrapper.style.top = `${n}px`, e.wrapper.style.bottom = "auto", e.wrapper.style.left = "auto", y = "right";
	} else if (d) {
		let t = Math.min(u, window.innerHeight - s.realHeight - c.width), n = Yc(r, {
			elementDimensions: l,
			popoverDimensions: s,
			popoverPadding: o,
			popoverArrowDimensions: c
		});
		e.wrapper.style.top = `${t}px`, e.wrapper.style.left = `${n}px`, e.wrapper.style.bottom = "auto", e.wrapper.style.right = "auto", y = "top";
	} else if (p) {
		let t = Math.min(f, window.innerHeight - s?.realHeight - c.width), n = Yc(r, {
			elementDimensions: l,
			popoverDimensions: s,
			popoverPadding: o,
			popoverArrowDimensions: c
		});
		e.wrapper.style.left = `${n}px`, e.wrapper.style.bottom = `${t}px`, e.wrapper.style.top = "auto", e.wrapper.style.right = "auto", y = "bottom";
	}
	el(e, v ? "over" : y, r, t), [...e.wrapper.classList].filter((e) => e.startsWith("driver-popover-side-") || e.startsWith("driver-popover-align-")).forEach((t) => e.wrapper.classList.remove(t)), e.wrapper.classList.add(`driver-popover-side-${y}`), e.wrapper.classList.add(`driver-popover-align-${r}`);
}
function Zc(e, t, n, r, i, a = 10) {
	let o = r - n;
	return e <= n && t >= r ? i === "start" ? 15 + a / 2 : i === "end" ? o - 15 - a / 2 : o / 2 : (Math.min(Math.max(e, n), r) + Math.min(Math.max(t, n), r)) / 2 - n;
}
function Qc(e, t, n = 10) {
	let r = t - 15 - n;
	if (r < 15) return Math.max(0, (t - n) / 2);
	let i = e - n / 2;
	return Math.min(Math.max(i, 15), r);
}
function $c(e, t, n) {
	return e === "left" || e === "right" ? t.bottom > n.top && t.top < n.bottom ? e : t.bottom <= n.top ? "bottom" : "top" : t.right > n.left && t.left < n.right ? e : t.right <= n.left ? "right" : "left";
}
function el(e, t, n, r) {
	let i = e.arrow;
	if (i.className = "driver-popover-arrow", i.style.top = "", i.style.right = "", i.style.bottom = "", i.style.left = "", t === "over") {
		i.classList.add("driver-popover-arrow-none");
		return;
	}
	let a = r.getBoundingClientRect(), o = e.wrapper.getBoundingClientRect(), s = $c(t, a, o);
	i.classList.add(`driver-popover-arrow-side-${s}`);
	let c = i.getBoundingClientRect().width || 10;
	if (s === "left" || s === "right") {
		let e = Zc(a.top, a.bottom, o.top, o.bottom, n, c);
		i.style.top = `${Qc(e, o.height, c)}px`;
	} else {
		let e = Zc(a.left, a.right, o.left, o.right, n, c);
		i.style.left = `${Qc(e, o.width, c)}px`;
	}
}
function tl(e) {
	return typeof e == "function" ? e() : typeof e == "string" ? document.querySelector(e) : e;
}
function nl(e) {
	let t = window.getComputedStyle(e);
	return [
		t.overflow,
		t.overflowX,
		t.overflowY
	].some((e) => e === "auto" || e === "scroll");
}
function rl(e, t, n, r) {
	return (e /= r / 2) < 1 ? n / 2 * e * e + t : -n / 2 * (--e * (e - 2) - 1) + t;
}
function il(e) {
	let t = "a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type=\"text\"]:not([disabled]), input[type=\"radio\"]:not([disabled]), input[type=\"checkbox\"]:not([disabled]), select:not([disabled])";
	return e.flatMap((e) => {
		let n = e.matches(t), r = Array.from(e.querySelectorAll(t));
		return [...n ? [e] : [], ...r];
	}).filter((e) => getComputedStyle(e).pointerEvents !== "none" && cl(e));
}
function al(e, t) {
	if (!e || sl(e)) return;
	let n = e.offsetHeight > window.innerHeight;
	e.scrollIntoView({
		behavior: !t || ol(e) ? "auto" : "smooth",
		inline: "center",
		block: n ? "start" : "center"
	});
}
function ol(e) {
	if (!e || !e.parentElement) return;
	let t = e.parentElement;
	return t.scrollHeight > t.clientHeight;
}
function sl(e) {
	let t = e.getBoundingClientRect();
	return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function cl(e) {
	return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
function ll(e) {
	e && (e.wrapper.style.display = "none");
}
function ul(e, t) {
	let n = fl();
	document.body.appendChild(n.wrapper);
	let { title: r, description: i, showButtons: a, disableButtons: o, showProgress: s, nextBtnText: c, prevBtnText: l, progressText: u } = t;
	n.nextButton.innerHTML = c, n.previousButton.innerHTML = l, n.progress.innerHTML = u, t.doneButton && n.nextButton.classList.add("driver-popover-done-btn"), r ? (n.title.innerHTML = r, n.title.style.display = "block") : n.title.style.display = "none", i ? (n.description.innerHTML = i, n.description.style.display = "block") : n.description.style.display = "none";
	let d = a.includes("next") || a.includes("previous") || s;
	n.closeButton.style.display = a.includes("close") ? "block" : "none", d ? (n.footer.style.display = "flex", n.progress.style.display = s ? "block" : "none", n.nextButton.style.display = a.includes("next") ? "block" : "none", n.previousButton.style.display = a.includes("previous") ? "block" : "none") : n.footer.style.display = "none", o.includes("next") && (n.nextButton.disabled = !0, n.nextButton.classList.add("driver-popover-btn-disabled")), o.includes("previous") && (n.previousButton.disabled = !0, n.previousButton.classList.add("driver-popover-btn-disabled")), o.includes("close") && (n.closeButton.disabled = !0, n.closeButton.classList.add("driver-popover-btn-disabled"));
	let f = n.wrapper;
	f.style.display = "block", f.style.left = "", f.style.top = "", f.style.bottom = "", f.style.right = "", f.id = "driver-popover-content", f.setAttribute("role", "dialog"), f.setAttribute("aria-labelledby", "driver-popover-title"), f.setAttribute("aria-describedby", "driver-popover-description");
	let p = n.arrow;
	p.className = "driver-popover-arrow", f.className = `driver-popover ${t.popoverClass || ""}`.trim(), Gc(n.wrapper, (e) => {
		let n = e.target;
		if (n.closest(".driver-popover-next-btn")) return t.onNextClick?.();
		if (n.closest(".driver-popover-prev-btn")) return t.onPrevClick?.();
		if (n.closest(".driver-popover-close-btn")) return t.onCloseClick?.();
	}, (e) => n.description.contains(e) || n.title.contains(e) ? !1 : !!e.closest(".driver-popover-prev-btn, .driver-popover-next-btn, .driver-popover-close-btn")), t.onRender?.(n), Xc(n, e, t.position), dl(n, e, t.position), al(f, t.smoothScroll);
	let m = il([f, e]);
	return m.length > 0 && m[0].focus(), n;
}
function dl(e, t, n) {
	e.wrapper.querySelectorAll("img").forEach((r) => {
		if (r.complete) return;
		let i = () => Xc(e, t, n);
		r.addEventListener("load", i, { once: !0 }), r.addEventListener("error", i, { once: !0 });
	});
}
function fl() {
	let e = document.createElement("div");
	e.classList.add("driver-popover");
	let t = document.createElement("div");
	t.classList.add("driver-popover-arrow");
	let n = document.createElement("header");
	n.id = "driver-popover-title", n.classList.add("driver-popover-title"), n.style.display = "none", n.innerText = "Popover Title";
	let r = document.createElement("div");
	r.id = "driver-popover-description", r.classList.add("driver-popover-description"), r.style.display = "none", r.innerText = "Popover description is here";
	let i = document.createElement("button");
	i.type = "button", i.classList.add("driver-popover-close-btn"), i.setAttribute("aria-label", "Close"), i.innerHTML = "&times;";
	let a = document.createElement("footer");
	a.classList.add("driver-popover-footer");
	let o = document.createElement("span");
	o.classList.add("driver-popover-progress-text"), o.innerText = "";
	let s = document.createElement("span");
	s.classList.add("driver-popover-navigation-btns");
	let c = document.createElement("button");
	c.type = "button", c.classList.add("driver-popover-prev-btn", "driver-popover-footer-btn"), c.innerHTML = "Previous";
	let l = document.createElement("button");
	return l.type = "button", l.classList.add("driver-popover-next-btn", "driver-popover-footer-btn"), l.innerHTML = "Next", s.appendChild(c), s.appendChild(l), a.appendChild(o), a.appendChild(s), e.appendChild(i), e.appendChild(t), e.appendChild(n), e.appendChild(r), e.appendChild(a), {
		wrapper: e,
		arrow: t,
		title: n,
		description: r,
		footer: a,
		previousButton: c,
		nextButton: l,
		closeButton: i,
		footerButtons: s,
		progress: o
	};
}
function pl(e) {
	e && (Kc(e.wrapper), e.wrapper.parentElement?.removeChild(e.wrapper));
}
function ml(e, t) {
	let n = window.innerWidth, r = window.innerHeight, i = t.padding, a = t.radius, o = e.width + i * 2, s = e.height + i * 2, c = Math.min(a, o / 2, s / 2), l = Math.floor(Math.max(c, 0)), u = e.x - i + l, d = e.y - i, f = o - l * 2, p = s - l * 2;
	return `M${n},0L0,0L0,${r}L${n},${r}L${n},0Z
    M${u},${d} h${f} a${l},${l} 0 0 1 ${l},${l} v${p} a${l},${l} 0 0 1 -${l},${l} h-${f} a${l},${l} 0 0 1 -${l},-${l} v-${p} a${l},${l} 0 0 1 ${l},-${l} z`;
}
function hl(e, t, n, r, i) {
	let a = e.getState("__activeStagePosition"), o = a || r.getBoundingClientRect(), s = i.getBoundingClientRect();
	a = {
		x: rl(t, o.x, s.x - o.x, n),
		y: rl(t, o.y, s.y - o.y, n),
		width: rl(t, o.width, s.width - o.width, n),
		height: rl(t, o.height, s.height - o.height, n)
	}, yl(e, a), e.setState("__activeStagePosition", a);
}
function gl(e, t) {
	if (!t) return;
	let n = t.getBoundingClientRect(), r = {
		x: n.x,
		y: n.y,
		width: n.width,
		height: n.height
	};
	e.setState("__activeStagePosition", r), yl(e, r);
}
function _l(e) {
	let t = e.getState("__activeStagePosition"), n = e.getState("__overlaySvg");
	if (!t) return;
	if (!n) {
		console.warn("No stage svg found.");
		return;
	}
	let r = window.innerWidth, i = window.innerHeight;
	n.setAttribute("viewBox", `0 0 ${r} ${i}`);
}
function vl(e, t) {
	let n = xl(e, t);
	document.body.appendChild(n), Gc(n, (t) => {
		t.target.tagName === "path" && e.emit("overlayClick");
	}), e.setState("__overlaySvg", n);
}
function yl(e, t) {
	let n = e.getState("__overlaySvg");
	if (!n) {
		vl(e, t);
		return;
	}
	let r = n.firstElementChild;
	if (r?.tagName !== "path") throw Error("no path element found in stage svg");
	r.setAttribute("d", ml(t, bl(e)));
}
function bl(e) {
	return {
		padding: e.getConfig("stagePadding") || 0,
		radius: e.getConfig("stageRadius") || 0
	};
}
function xl(e, t) {
	let n = window.innerWidth, r = window.innerHeight, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	i.classList.add("driver-overlay", "driver-overlay-animated"), i.setAttribute("viewBox", `0 0 ${n} ${r}`), i.setAttribute("xmlSpace", "preserve"), i.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), i.setAttribute("version", "1.1"), i.setAttribute("preserveAspectRatio", "xMinYMin slice"), i.style.fillRule = "evenodd", i.style.clipRule = "evenodd", i.style.strokeLinejoin = "round", i.style.strokeMiterlimit = "2", i.style.zIndex = "10000", i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%";
	let a = document.createElementNS("http://www.w3.org/2000/svg", "path");
	return a.setAttribute("d", ml(t, bl(e))), a.style.fill = e.getConfig("overlayColor") || "rgb(0,0,0)", a.style.opacity = `${e.getConfig("overlayOpacity")}`, a.style.pointerEvents = "auto", a.style.cursor = "auto", i.appendChild(a), i;
}
function Sl(e) {
	let t = e.getState("__overlaySvg");
	t && (Kc(t), t.remove());
}
var Cl = "{{current}} of {{total}}";
function wl(e, t) {
	return !(t.skipMissingElement ?? e.getConfig("skipMissingElement")) || !t.element ? !1 : !tl(t.element);
}
function Tl(e, t, n) {
	let r = e.getConfig("steps") || [];
	for (let i = t; i >= 0 && i < r.length; i += n) if (!wl(e, r[i])) return i;
}
function El(e, t) {
	let n = e.getState("activeIndex"), r = n !== void 0 && Tl(e, n + 1, 1) === void 0, i = t?.popover?.onDoneClick || e.getConfig("onDoneClick");
	return r && i ? i : t?.popover?.onNextClick || e.getConfig("onNextClick");
}
function Dl(e, t) {
	return t?.popover?.onPrevClick || e.getConfig("onPrevClick");
}
function Ol(e, t) {
	return t?.popover?.onCloseClick || e.getConfig("onCloseClick");
}
function kl(e, t, n) {
	let r = e.getConfig("steps") || [], i = r[t], a = i.popover || {}, o = Tl(e, t + 1, 1) !== void 0, s = Tl(e, t - 1, -1) !== void 0, c = a.doneBtnText || e.getConfig("doneBtnText") || "Done", l = e.getConfig("allowClose"), u = a.showProgress === void 0 ? e.getConfig("showProgress") : a.showProgress, d = (a.progressText || e.getConfig("progressText") || Cl).replace("{{current}}", `${t + 1}`).replace("{{total}}", `${r.length}`), f = a.showButtons || e.getConfig("showButtons"), p = [
		"next",
		"previous",
		...l ? ["close"] : []
	].filter((e) => !f?.length || f.includes(e)), m = a.onNextClick || e.getConfig("onNextClick"), h = a.onPrevClick || e.getConfig("onPrevClick"), g = a.onCloseClick || e.getConfig("onCloseClick");
	return {
		...i,
		popover: {
			showButtons: p,
			nextBtnText: o ? void 0 : c,
			disableButtons: [...s ? [] : ["previous"]],
			showProgress: u,
			onNextClick: m || n.onNextClick,
			onPrevClick: h || n.onPrevClick,
			onCloseClick: g || n.onCloseClick,
			...a,
			progressText: d
		}
	};
}
function Al(e, t, n) {
	let r = e.getConfig("stagePadding") || 0;
	return {
		side: n.popover?.side || "bottom",
		align: n.popover?.align || "start",
		offset: r + (e.getConfig("popoverOffset") || 0),
		padding: r,
		centered: t.id === "driver-dummy-element"
	};
}
function jl(e, t, n) {
	let r = n.popover || {}, i = e.getState("activeIndex"), a = i !== void 0 && Tl(e, i + 1, 1) === void 0;
	return {
		title: r.title,
		description: r.description,
		showButtons: r.showButtons || e.getConfig("showButtons"),
		disableButtons: r.disableButtons || e.getConfig("disableButtons") || [],
		showProgress: r.showProgress || e.getConfig("showProgress") || !1,
		progressText: r.progressText ?? (e.getConfig("progressText") || Cl),
		nextBtnText: r.nextBtnText ?? (e.getConfig("nextBtnText") || "Next"),
		prevBtnText: r.prevBtnText ?? (e.getConfig("prevBtnText") || "Previous"),
		doneButton: a,
		popoverClass: r.popoverClass || e.getConfig("popoverClass") || "",
		smoothScroll: e.getConfig("smoothScroll"),
		onNextClick: () => {
			let r = El(e, n);
			return r ? r(t, n, e.getHookOpts()) : e.emit("nextClick");
		},
		onPrevClick: () => {
			let r = Dl(e, n);
			return r ? r(t, n, e.getHookOpts()) : e.emit("prevClick");
		},
		onCloseClick: () => {
			let r = Ol(e, n);
			return r ? r(t, n, e.getHookOpts()) : e.emit("closeClick");
		},
		onRender: (t) => {
			e.setState("popover", t), (r.onPopoverRender || e.getConfig("onPopoverRender"))?.(t, e.getHookOpts());
		},
		position: Al(e, t, n)
	};
}
function Ml(e, t, n) {
	pl(e.getState("popover")), ul(t, jl(e, t, n));
}
function Nl(e, t, n) {
	let r = e.getState("popover");
	r && Xc(r, t, Al(e, t, n));
}
function Pl() {
	let e = document.getElementById("driver-dummy-element");
	if (e) return e;
	let t = document.createElement("div");
	return t.id = "driver-dummy-element", t.style.width = "0", t.style.height = "0", t.style.pointerEvents = "none", t.style.opacity = "0", t.style.position = "fixed", t.style.top = "50%", t.style.left = "50%", document.body.appendChild(t), t;
}
function Fl(e, t) {
	let n = tl(t.element);
	n ||= Pl(), Ll(e, n, t);
}
function Il(e) {
	let t = e.getState("__activeElement"), n = e.getState("__activeStep");
	t && (gl(e, t), _l(e), Nl(e, t, n));
}
function Ll(e, t, n) {
	let r = e.getConfig("duration") || 400, i = Date.now(), a = e.getState("__activeStep"), o = e.getState("__activeElement") || t, s = !o || o === t, c = t.id === "driver-dummy-element", l = o.id === "driver-dummy-element", u = e.getConfig("animate"), d = n.onHighlightStarted || e.getConfig("onHighlightStarted"), f = n?.onHighlighted || e.getConfig("onHighlighted"), p = a?.onDeselected || e.getConfig("onDeselected"), m = e.getHookOpts();
	!s && p && p(l ? void 0 : o, a, m), d && d(c ? void 0 : t, n, m);
	let h = !s && u, g = !1;
	ll(e.getState("popover")), e.setState("previousStep", a), e.setState("previousElement", o), e.setState("activeStep", n), e.setState("activeElement", t);
	let _ = () => {
		if (e.getState("__transitionCallback") !== _) return;
		let s = Date.now() - i, l = r - s <= r / 2;
		n.popover && l && !g && h && (Ml(e, t, n), g = !0), e.getConfig("animate") && s < r ? hl(e, s, r, o, t) : (gl(e, t), f && f(c ? void 0 : t, n, e.getHookOpts()), e.setState("__transitionCallback", void 0), e.setState("__previousStep", a), e.setState("__previousElement", o), e.setState("__activeStep", n), e.setState("__activeElement", t)), window.requestAnimationFrame(_);
	};
	e.setState("__transitionCallback", _), window.requestAnimationFrame(_), al(t, e.getConfig("smoothScroll")), !h && n.popover && Ml(e, t, n), document.querySelectorAll(".driver-active-element-parent").forEach((e) => {
		e.classList.remove("driver-active-element-parent", "driver-active-element-parent-no-scroll");
	}), o.classList.remove("driver-active-element", "driver-no-interaction"), o.removeAttribute("aria-haspopup"), o.removeAttribute("aria-expanded"), o.removeAttribute("aria-controls"), (n.disableActiveInteraction ?? e.getConfig("disableActiveInteraction")) && t.classList.add("driver-no-interaction");
	let v = t.parentElement;
	v && v !== document.body && (v.classList.add("driver-active-element-parent"), nl(v) && v.classList.add("driver-active-element-parent-no-scroll")), t.classList.add("driver-active-element"), t.setAttribute("aria-haspopup", "dialog"), t.setAttribute("aria-expanded", "true"), t.setAttribute("aria-controls", "driver-popover-content");
}
function Rl() {
	document.getElementById("driver-dummy-element")?.remove(), document.querySelectorAll(".driver-active-element").forEach((e) => {
		let t = e.parentElement;
		t && t !== document.body && t.classList.remove("driver-active-element-parent", "driver-active-element-parent-no-scroll"), e.classList.remove("driver-active-element", "driver-no-interaction"), e.removeAttribute("aria-haspopup"), e.removeAttribute("aria-expanded"), e.removeAttribute("aria-controls");
	});
}
function zl(e) {
	let t = e.getState("__resizeTimeout");
	t && window.cancelAnimationFrame(t), e.setState("__resizeTimeout", window.requestAnimationFrame(() => Il(e)));
}
function Bl(e, t) {
	if (!e.getState("isInitialized") || !(t.key === "Tab" || t.keyCode === 9)) return;
	let n = e.getState("__activeElement"), r = e.getState("popover")?.wrapper, i = il([...r ? [r] : [], ...n ? [n] : []]), a = i[0], o = i[i.length - 1];
	t.preventDefault(), t.shiftKey ? (i[i.indexOf(document.activeElement) - 1] || o)?.focus() : (i[i.indexOf(document.activeElement) + 1] || a)?.focus();
}
function Vl(e, t) {
	(e.getConfig("allowKeyboardControl") ?? !0) && (t.key === "Escape" ? e.emit("escapePress") : t.key === "ArrowRight" ? e.emit("arrowRightPress") : t.key === "ArrowLeft" && e.emit("arrowLeftPress"));
}
function Hl(e, t) {
	let n = e.getState("__activeElement"), r = t.target;
	!n || !r || !n.contains(r) || e.emit("activeElementClick");
}
function Ul(e) {
	let t = (t) => Vl(e, t), n = (t) => Bl(e, t), r = () => zl(e), i = () => zl(e), a = (t) => Hl(e, t);
	e.setState("__events", {
		onKeyup: t,
		onKeydown: n,
		onResize: r,
		onScroll: i,
		onClick: a
	}), window.addEventListener("keyup", t, !1), window.addEventListener("keydown", n, !1), window.addEventListener("resize", r), window.addEventListener("scroll", i), document.addEventListener("click", a, !1);
}
function Wl(e) {
	let t = e.getState("__events");
	t && (window.removeEventListener("keyup", t.onKeyup), window.removeEventListener("keydown", t.onKeydown), window.removeEventListener("resize", t.onResize), window.removeEventListener("scroll", t.onScroll), document.removeEventListener("click", t.onClick, !1));
}
function Gl() {
	let e = {};
	function t(t = {}) {
		e = {
			animate: !0,
			duration: 400,
			allowClose: !0,
			allowScroll: !0,
			overlayClickBehavior: "close",
			overlayOpacity: .7,
			smoothScroll: !1,
			disableActiveInteraction: !1,
			advanceOnClick: !1,
			skipMissingElement: !1,
			waitForElement: 0,
			showProgress: !1,
			stagePadding: 10,
			stageRadius: 5,
			popoverOffset: 10,
			showButtons: [
				"next",
				"previous",
				"close"
			],
			disableButtons: [],
			overlayColor: "#000",
			...t
		};
	}
	return t(), {
		getConfig: ((t) => t ? e[t] : e),
		configure: t
	};
}
function Kl() {
	let e = {}, t = ((t) => t ? e[t] : e), n = (t, n) => {
		e[t] = n;
	};
	function r() {
		e = {};
	}
	return {
		getState: t,
		setState: n,
		resetState: r
	};
}
function ql() {
	let e = {};
	function t(t, n) {
		e[t] = n;
	}
	function n(t) {
		e[t]?.();
	}
	function r() {
		e = {};
	}
	return {
		listen: t,
		emit: n,
		reset: r
	};
}
function Jl(e = {}) {
	let t = Gl();
	t.configure(e);
	let n = Kl(), r = ql(), i;
	return {
		getConfig: t.getConfig,
		setConfig: t.configure,
		getState: n.getState,
		setState: n.setState,
		resetState: n.resetState,
		listen: r.listen,
		emit: r.emit,
		resetEmitter: r.reset,
		getDriver: () => i,
		setDriver: (e) => {
			i = e;
		},
		getHookOpts: (e) => {
			let r = e || n.getState();
			return {
				config: t.getConfig(),
				state: r,
				driver: i,
				index: r.activeIndex
			};
		}
	};
}
function Yl(e = {}) {
	let t = Jl(e);
	function n() {
		t.getConfig("allowClose") && m();
	}
	function r() {
		let e = t.getConfig("overlayClickBehavior");
		if (t.getConfig("allowClose") && e === "close") {
			m();
			return;
		}
		if (typeof e == "function") {
			let n = t.getState("__activeStep");
			e(t.getState("__activeElement"), n, t.getHookOpts());
			return;
		}
		if (e === "nextStep") {
			let e = t.getState("activeStep"), n = t.getState("activeElement"), r = El(t, e);
			if (r) {
				r(n, e, t.getHookOpts());
				return;
			}
			i();
		}
	}
	function i() {
		let e = t.getState("activeIndex"), n = t.getConfig("steps") || [];
		if (e === void 0) return;
		let r = e + 1;
		n[r] ? p(r) : m();
	}
	function a() {
		let e = t.getState("activeIndex"), n = t.getConfig("steps") || [];
		if (e === void 0) return;
		let r = e - 1;
		n[r] ? p(r) : m();
	}
	function o(e) {
		(t.getConfig("steps") || [])[e] ? p(e) : m();
	}
	function s() {
		if (t.getState("__transitionCallback")) return;
		let e = t.getState("__activeStep");
		if (!e || !(e.advanceOnClick ?? t.getConfig("advanceOnClick"))) return;
		let n = t.getState("__activeElement"), r = El(t, e);
		if (r) {
			r(n, e, t.getHookOpts());
			return;
		}
		i();
	}
	function c() {
		if (t.getState("__transitionCallback")) return;
		let e = t.getState("activeIndex"), n = t.getState("__activeStep"), r = t.getState("__activeElement");
		if (e === void 0 || n === void 0 || !(t.getConfig("steps") || [])[e - 1]) return;
		let i = Dl(t, n);
		if (i) return i(r, n, t.getHookOpts());
		a();
	}
	function l() {
		if (t.getState("__transitionCallback")) return;
		let e = t.getState("activeIndex"), n = t.getState("__activeStep"), r = t.getState("__activeElement");
		if (e === void 0 || n === void 0) return;
		let a = El(t, n);
		if (a) return a(r, n, t.getHookOpts());
		i();
	}
	function u() {
		t.getState("isInitialized") || (t.setState("isInitialized", !0), document.body.classList.add("driver-active", t.getConfig("animate") ? "driver-fade" : "driver-simple"), t.getConfig("allowScroll") || document.body.classList.add("driver-no-scroll"), document.body.style.setProperty("--driver-animation-duration", `${t.getConfig("duration") || 400}ms`), Ul(t), t.listen("overlayClick", r), t.listen("activeElementClick", s), t.listen("escapePress", n), t.listen("closeClick", n), t.listen("arrowLeftPress", c), t.listen("arrowRightPress", l));
	}
	function d() {
		let e = t.getState("__pendingWaitCancel");
		e && (t.setState("__pendingWaitCancel", void 0), e());
	}
	function f(e, n, r) {
		let i = () => {
			a.disconnect(), window.clearTimeout(o), t.setState("__pendingWaitCancel", void 0), r();
		}, a = new MutationObserver(() => {
			tl(e.element) && i();
		}), o = window.setTimeout(i, n);
		t.setState("__pendingWaitCancel", () => {
			a.disconnect(), window.clearTimeout(o);
		}), a.observe(document.documentElement, {
			childList: !0,
			subtree: !0,
			attributes: !0
		});
	}
	function p(e = 0, n = !1) {
		d();
		let r = t.getConfig("steps");
		if (!r) {
			console.error("No steps to drive through"), m();
			return;
		}
		if (!r[e]) {
			m();
			return;
		}
		let i = r[e], a = i.waitForElement ?? t.getConfig("waitForElement") ?? 0;
		if (!n && a > 0 && i.element && !tl(i.element)) {
			f(i, a, () => p(e, !0));
			return;
		}
		if (wl(t, i)) {
			let n = t.getState("activeIndex"), i = typeof n == "number" && e < n ? -1 : 1;
			r[e + i] ? p(e + i) : i === 1 && m();
			return;
		}
		t.setState("__activeOnDestroyed", document.activeElement), t.setState("activeIndex", e);
		let o = r[e + 1];
		Fl(t, kl(t, e, {
			onNextClick: () => {
				o ? p(e + 1) : m();
			},
			onPrevClick: () => {
				p(e - 1);
			},
			onCloseClick: () => {
				m();
			}
		}));
	}
	function m(e = !0) {
		let n = t.getState("__activeElement"), r = t.getState("__activeStep"), i = t.getState("__activeOnDestroyed"), a = t.getConfig("onDestroyStarted");
		if (e && a) {
			a(!n || n?.id === "driver-dummy-element" ? void 0 : n, r, t.getHookOpts());
			return;
		}
		let o = r?.onDeselected || t.getConfig("onDeselected"), s = t.getConfig("onDestroyed");
		document.body.classList.remove("driver-active", "driver-fade", "driver-simple", "driver-no-scroll"), document.body.style.removeProperty("--driver-animation-duration"), d(), Wl(t), pl(t.getState("popover")), Rl(), Sl(t), t.resetEmitter();
		let c = t.getState();
		if (t.resetState(), n && r) {
			let e = n.id === "driver-dummy-element";
			o && o(e ? void 0 : n, r, t.getHookOpts(c)), s && s(e ? void 0 : n, r, t.getHookOpts(c));
		}
		i && i.focus();
	}
	let h = {
		isActive: () => t.getState("isInitialized") || !1,
		refresh: () => zl(t),
		drive: (e = 0) => {
			u(), p(e);
		},
		setConfig: t.setConfig,
		setSteps: (e) => {
			d(), t.resetState(), t.setConfig({
				...t.getConfig(),
				steps: e
			});
		},
		getConfig: t.getConfig,
		getState: t.getState,
		getActiveIndex: () => t.getState("activeIndex"),
		isFirstStep: () => {
			let e = t.getState("activeIndex");
			return e !== void 0 && Tl(t, e - 1, -1) === void 0;
		},
		isLastStep: () => {
			let e = t.getState("activeIndex");
			return e !== void 0 && Tl(t, e + 1, 1) === void 0;
		},
		getActiveStep: () => t.getState("activeStep"),
		getActiveElement: () => t.getState("activeElement"),
		getPreviousElement: () => t.getState("previousElement"),
		getPreviousStep: () => t.getState("previousStep"),
		getNextStep: () => {
			let e = t.getConfig("steps") || [], n = t.getState("activeIndex");
			if (n === void 0) return;
			let r = Tl(t, n + 1, 1);
			return r === void 0 ? void 0 : e[r];
		},
		moveNext: i,
		movePrevious: a,
		moveTo: o,
		hasNextStep: () => {
			let e = t.getState("activeIndex");
			return e !== void 0 && Tl(t, e + 1, 1) !== void 0;
		},
		hasPreviousStep: () => {
			let e = t.getState("activeIndex");
			return e !== void 0 && Tl(t, e - 1, -1) !== void 0;
		},
		highlight: (e) => {
			u(), Fl(t, {
				...e,
				popover: e.popover ? {
					showButtons: [],
					showProgress: !1,
					progressText: "",
					...e.popover
				} : void 0
			});
		},
		destroy: () => {
			m(!1);
		}
	};
	return t.setDriver(h), h;
}
//#endregion
//#region src/composables/useProductTour.ts
var Xl = new Set([
	"building",
	"floor",
	"site"
]), Zl = {
	en: {
		welcome: {
			title: "Welcome to Topospace",
			description: "A quick look at how to get around. Close anytime — replay this from Help &rarr; Take a tour."
		},
		campus: {
			title: "Campus overview",
			description: "Click here to see every building and floor at a glance, with live critical/warning counts. Click a floor card to jump into it."
		},
		canvas: {
			title: "3D scene",
			description: "Drag to orbit, scroll to zoom. Click a device to select it — a blue ring marks the selection — and see its details on the right."
		},
		mode: {
			title: "View / Edit",
			description: "Switch to Edit to drag devices and spaces around. Undo with Ctrl+Z."
		},
		connect: {
			title: "Connect",
			description: "In Edit mode, drag from one device to another to create a link."
		}
	},
	ko: {
		welcome: {
			title: "Topospace에 오신 것을 환영합니다",
			description: "둘러보는 방법을 간단히 안내합니다. 언제든 닫을 수 있고, Help &rarr; Take a tour에서 다시 볼 수 있습니다."
		},
		campus: {
			title: "캠퍼스 개요",
			description: "클릭하면 모든 건물과 층을 한눈에 보여주고 실시간 critical/warning 개수를 표시합니다. 층 카드를 클릭하면 바로 진입합니다."
		},
		canvas: {
			title: "3D 씬",
			description: "드래그로 화면을 회전하고 스크롤로 확대·축소합니다. 장비를 클릭하면 선택되고(파란 링 표시) 오른쪽에 상세 정보가 뜹니다."
		},
		mode: {
			title: "보기 / 편집",
			description: "Edit로 전환하면 장비·공간을 드래그로 옮길 수 있습니다. Ctrl+Z로 실행취소합니다."
		},
		connect: {
			title: "연결",
			description: "Edit 모드에서 장비를 다른 장비로 드래그하면 링크가 생성됩니다."
		}
	}
};
function Ql() {
	return typeof navigator < "u" && navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
}
function $l(e = Ql()) {
	let t = q(), n = Zl[e], r = t.rootSpaces.length > 1 || t.rootSpaces.some((e) => t.childSpaces(e.id).some((e) => Xl.has(e.type))), i = [{ popover: n.welcome }];
	r && document.querySelector(".vs-btn") && i.push({
		element: ".vs-btn",
		popover: {
			...n.campus,
			side: "bottom",
			align: "start"
		}
	}), document.querySelector(".canvas-wrap") && i.push({
		element: ".canvas-wrap",
		popover: {
			...n.canvas,
			side: "bottom",
			align: "center"
		}
	}), document.querySelector(".mode-switch") && i.push({
		element: ".mode-switch",
		popover: {
			...n.mode,
			side: "bottom",
			align: "end"
		}
	}), document.querySelector("[title=\"Connect devices (L)\"]") && i.push({
		element: "[title=\"Connect devices (L)\"]",
		popover: {
			...n.connect,
			side: "bottom",
			align: "end"
		}
	}), Yl({
		showProgress: !0,
		allowClose: !0,
		steps: i,
		onDestroyed: () => localStorage.setItem("topospace.tourSeen", "1")
	}).drive();
}
//#endregion
//#region src/composables/useNmsEditor.ts
var eu = Symbol("topospace-editor-options"), tu = /* @__PURE__ */ new WeakMap(), nu = {};
function ru(e = {}) {
	nu = e;
}
function iu() {
	let e = q(), t = J(), n = m(eu, nu), r = tu.get(e);
	return r ? r.configure(n) : (r = au(e, t, n), tu.set(e, r)), r;
}
function au(e, t, n = {}) {
	let r = new kn(), i = new Bc(), a = Hc(), o, s, c, l, u, d, f, p, m, g, _, v, y, b = null, x = !1, S = !1, C = 0, w = {
		x: 0,
		y: 0
	}, T = null, E = null, D = null, O = [], k = 0, A = !1, M = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Set(), P = [], F = n, I = 0, L = 0, z = 0, B = !1, V = null, H = 0, U = [], ee = [];
	function te() {
		return {
			mappings: [...e.mappings.entries()].map(([e, t]) => [e, { ...t }]),
			links: [...e.links.entries()].map(([e, t]) => [e, { ...t }]),
			spaces: [...e.spaces.entries()].map(([e, t]) => [e, { ...t }]),
			unmappedIds: e.unmappedDevices.map((e) => e.id)
		};
	}
	function ne() {
		U.push(te()), U.length > 30 && U.shift(), ee.length = 0;
	}
	async function re(n) {
		e.mappings.clear(), n.mappings.forEach(([t, n]) => e.mappings.set(t, n)), e.links.clear(), n.links.forEach(([t, n]) => e.links.set(t, n)), e.spaces.clear(), n.spaces.forEach(([t, n]) => e.spaces.set(t, n));
		let r = new Set(n.unmappedIds), i = n.unmappedIds.map((t) => e.devices.get(t)).filter((e) => e != null);
		e.unmappedDevices.splice(0, e.unmappedDevices.length, ...i), e.devices.forEach((t) => {
			r.has(t.id) && !i.find((e) => e.id === t.id) && e.unmappedDevices.push(t);
		}), await et(), t.select(null);
	}
	function W(e = {}) {
		F = e;
	}
	function ie() {
		let { width: e, height: t } = r.getSize();
		c?.setResolution(e, t);
	}
	function ae(n, i, a) {
		if (x) return;
		b = n, x = !0;
		let w = ++C, T = S ? t.mode : F.mode ?? t.mode;
		e.configureSecurity({
			mode: T,
			features: F.features,
			permissionResolver: F.permissionResolver,
			onPermissionDenied: (e) => {
				t.addToast("Permission denied", "warning"), F.onPermissionDenied?.(e);
			},
			onChange: F.onChange
		}), t.setMode(T), Pn(t.colorblindMode ? "colorblind" : "default"), r.init(n, i, a, { onError: (e, t) => F.onError?.(e, t) }), o = new Ei(r.scene), s = new Oi(r.scene), c = new aa(r.scene), ie(), r.onResize(ie), l = new fa(r.scene), u = new ma(r.scene), d = new _a(r.scene), f = new ya(r.scene), p = new ka(r.scene), y = new Rc(r.camera, r.controls), _ = new Pc(), m = new Mc(r.camera, o, s, c), g = new Nc(r.camera, c, o, (e, n, r, i) => t.showContextMenu(r, i, e, n)), v = new zc(r.scene), S ||= (F.data ? e.replaceData(F.data) : F.mockData !== !1 && e.loadMockData(), !0), se(), h(async () => {
			!x || w !== C || (await le(w), !(!x || w !== C) && (tt(), oe()));
		}), fe(n), me(), xe(), F.onReady?.();
	}
	function oe() {
		F.features?.tour !== !1 && (localStorage.getItem("topospace.tourSeen") || $l());
	}
	function se() {
		let n = t.activeRootSpaceId;
		if (n) {
			let t = e.spaces.get(n);
			(!t || t.archived) && (n = null);
		}
		n ||= F.initialFloorId && e.spaces.has(F.initialFloorId) ? F.initialFloorId : e.rootSpaces[0]?.id ?? null;
		let r = n ? e.resolveLeafScope(n) : null;
		r !== t.activeRootSpaceId && (t.activeRootSpaceId = r);
	}
	let ce = null;
	async function le(n) {
		if (await vi(a.customTypes), !x || n !== C) return;
		let r = t.activeRootSpaceId;
		s.loadSpaces(e.scopedSpaces(r)), o.loadInstanced(e.scopedDevices(r), e.mappings, (t) => e.getMappingByDeviceId(t)), c.loadLinks(e.scopedLinks(r), (e) => o.getDeviceWorldPos(e)), de(), d.loadNodes([...e.virtualNodes.values()]), await p.loadObjects(e.scopedBackgroundObjects(r)), !(!x || n !== C) && (p.setEditMode(t.backgroundEditActive), ue());
	}
	function ue() {
		o.setLabelScale(t.fontScale), be(), l.setVisible(t.showParticles), [
			"physical",
			"logical",
			"service_dependency",
			"traffic_flow",
			"security_path",
			"manual",
			"inferred"
		].forEach((e) => c.setVisible(e, t.visibleLinkTypes.has(e)));
	}
	function de() {
		let n = e.scopedLinks(t.activeRootSpaceId).filter((t) => {
			let n = e.devices.get(t.sourceDeviceId), r = e.devices.get(t.targetDeviceId);
			return n?.status !== "offline" && r?.status !== "offline";
		});
		l.syncLinks(n, (e) => c.getLinkPath(e));
	}
	function fe(e) {
		e.addEventListener("pointerdown", De), e.addEventListener("pointermove", Oe), e.addEventListener("pointerup", ke), e.addEventListener("pointerleave", pe), e.addEventListener("contextmenu", it), window.addEventListener("keydown", Ae);
	}
	function pe() {
		m.clearPointer(), A = !1;
	}
	function me() {
		P.push(j(() => t.fontScale, (e) => o.setLabelScale(e), { immediate: !0 })), e.devices.forEach((e) => {
			let t = e.status ?? "unknown";
			M.set(e.id, t), (t === "warning" || t === "critical") && N.add(e.id);
		}), P.push(j(() => {
			let t = "";
			return e.devices.forEach((e) => {
				t += `${e.id}:${e.status};`;
			}), t;
		}, () => {
			let t = !1;
			if (e.devices.forEach((e) => {
				let n = e.status ?? "unknown", r = M.get(e.id);
				if (o.updateStatus(e.id, n), n === "warning" || n === "critical" ? N.add(e.id) : N.delete(e.id), r !== void 0 && r !== n) {
					let i = o.getDeviceWorldPos(e.id);
					i && (n === "critical" || n === "offline" ? f.flash(i, "critical") : n === "warning" ? f.flash(i, "warning") : n === "normal" && (r === "critical" || r === "warning" || r === "offline") && f.flash(i, "recover")), (n === "offline" || r === "offline") && (t = !0);
				}
				M.set(e.id, n);
			}), N.size) for (let t of [...N]) e.devices.has(t) || N.delete(t);
			t && de();
		})), P.push(j(() => e.linksRevision, () => Pe())), P.push(j(() => e.lastAutoLayoutDeviceIds, (t) => {
			t.length && (t.forEach((t) => {
				let n = e.getMappingByDeviceId(t);
				if (!n?.position) return;
				let r = new R.Vector3(n.position.x, n.position.y, n.position.z);
				if (o.getDeviceWorldPos(t)) o.setPosition(t, r);
				else {
					let r = e.getDevice(t);
					r && o.addDevice(r, n);
				}
			}), c.refreshPositionsFor(t, (e) => o.getDeviceWorldPos(e)), de());
		})), P.push(j(() => t.activeRootSpaceId, async () => {
			if (t.select(null), await et() && ce) {
				let { type: e, id: n } = ce;
				ce = null, t.select({
					type: e,
					id: n
				}), e === "device" ? Be(n) : Xe(n);
			}
		})), P.push(j(() => [...t.visibleLinkTypes], (e) => {
			[
				"physical",
				"logical",
				"service_dependency",
				"traffic_flow",
				"security_path",
				"manual",
				"inferred"
			].forEach((t) => c.setVisible(t, e.includes(t)));
		})), P.push(j(() => t.hoveredId, (e, n) => {
			n && (o.setHighlight(n, !1), c.setHighlight(null, n)), e && (t.selection?.type === "link" ? c.setHighlight(e, null) : o.setHighlight(e, !0));
		})), P.push(j(() => t.selection, (n, r) => {
			if (r?.type === "space" && s.setSelected(r.id, !1), r?.type === "link" && c.setSelected(null), o.setSelectedDevice(n?.type === "device" ? n.id : null), t.mode === "edit" && n && (n.type === "device" || n.type === "space" || n.type === "background") ? ye(n) : v?.detach(), !n) {
				u.clear(), t.blastSourceId = null, t.showRackServerList = !1;
				return;
			}
			if (n.type === "device") {
				let r = e.devices.get(n.id);
				r && (r.status === "critical" || r.status === "warning") && t.showBlastRadius ? Ne(n.id) : u.clear();
				let i = e.getMappingByDeviceId(n.id);
				i?.primarySpaceId && (t.selectedRackForList = i.primarySpaceId, t.showRackServerList = !0);
			} else n.type === "space" ? (s.setSelected(n.id, !0), e.spaces.get(n.id)?.type === "rack" ? (t.selectedRackForList = n.id, t.showRackServerList = !0) : t.showRackServerList = !1) : n.type === "link" && c.setSelected(t.mode === "edit" ? n.id : null);
		})), P.push(j(() => t.mode, (n) => {
			e.setEditorMode(n), n === "view" ? (v?.detach(), c?.setSelected(null), g?.cancel(), _?.cancel(), T = null, E = null, D = null, O = []) : t.selection && (t.selection.type === "device" || t.selection.type === "space") && ye(t.selection);
		}, { immediate: !0 })), P.push(j(() => t.linkToolActive, (e) => {
			e || g.cancel(), b && (b.style.cursor = e ? "crosshair" : ""), e && t.addToast("Connect mode on — drag from one device to another", "info");
		})), P.push(j(() => t.backgroundEditActive, (e) => {
			p?.setEditMode(e), !e && t.selection?.type === "background" && t.select(null), e && t.addToast("Background edit on — click a background object to move it", "info");
		})), P.push(j(() => t.showParticles, (e) => l.setVisible(e))), P.push(j(() => t.showBlastRadius, (e) => {
			e || u.clear();
		})), P.push(j(() => e.virtualNodes.size, () => {
			d.dispose(), d = new _a(r.scene), d.loadNodes([...e.virtualNodes.values()]);
		})), P.push(j(() => t.timelineFrameIdx, (t) => {
			if (t < 0) return;
			let n = i.getFrame(t);
			n && Object.entries(n.states).forEach(([t, n]) => e.updateDeviceStatus(t, n.status, n.metrics));
		})), P.push(j(() => e.spaces.size, () => e.spaces.forEach((e) => s.addSpace(e)))), P.push(j(() => `${t.filter.search}|${t.filter.status.join(",")}|${t.filter.type.join(",")}|${t.alertsOnly}`, () => be())), P.push(j(() => e.mappings.size, () => be())), P.push(j(() => a.customTypes.size, () => {
			Wn(a.customTypes), gi(a.customTypes);
		}, { immediate: !0 }));
	}
	function he(e) {
		if (!b) return null;
		let t = b.getBoundingClientRect(), n = new R.Vector2((e.clientX - t.left) / t.width * 2 - 1, -((e.clientY - t.top) / t.height) * 2 + 1), i = new R.Raycaster();
		i.setFromCamera(n, r.camera);
		let a = i.intersectObjects(p.getPickMeshes(), !0);
		return a.length ? p.getBackgroundIdFromObject(a[0].object) : null;
	}
	function ge(e, t) {
		if (!b) return null;
		let n = b.getBoundingClientRect(), i = new R.Vector2((e.clientX - n.left) / n.width * 2 - 1, -((e.clientY - n.top) / n.height) * 2 + 1), a = new R.Raycaster();
		a.setFromCamera(i, r.camera);
		let o = new R.Vector3();
		r.camera.getWorldDirection(o), o.y = 0, o.lengthSq() < 1e-6 && o.set(0, 0, 1), o.normalize();
		let s = new R.Plane().setFromNormalAndCoplanarPoint(o, t), c = new R.Vector3();
		return a.ray.intersectPlane(s, c) ? c : null;
	}
	let _e = .5;
	function ve(e) {
		return e.x = Math.round(e.x / _e) * _e, e.z = Math.round(e.z / _e) * _e, e;
	}
	function ye(n) {
		if (v) {
			if (t.mode !== "edit") {
				v.detach();
				return;
			}
			if (n.type === "device") {
				let e = o.getDeviceWorldPos(n.id);
				e && v.attach({
					type: "device",
					id: n.id
				}, e);
			} else if (n.type === "space") {
				let t = e.spaces.get(n.id);
				t?.position ? v.attach({
					type: "space",
					id: n.id
				}, new R.Vector3(t.position.x, 0, t.position.z)) : v.detach();
			} else if (n.type === "background") {
				let e = p.getWorldPos(n.id);
				e ? v.attach({
					type: "background",
					id: n.id
				}, e) : v.detach();
			} else v.detach();
		}
	}
	function be() {
		let n = t.filter, r = n.search.toLowerCase().trim();
		if (!(r || n.status.length > 0 || n.type.length > 0 || t.alertsOnly)) {
			o.applySearchFilter(/* @__PURE__ */ new Set(), !1), t.searchMatchCount = null;
			return;
		}
		let i = /* @__PURE__ */ new Set();
		e.devices.forEach((e) => {
			let a = !r || (e.hostname ?? "").toLowerCase().includes(r) || (e.ip ?? "").includes(r), o = !n.status.length || n.status.includes(e.status ?? "unknown"), s = e.normalizedType ?? "unknown", c = !n.type.length || n.type.includes(s), l = !t.alertsOnly || e.status !== "normal";
			a && o && c && l && i.add(e.id);
		}), o.applySearchFilter(i, !0), o.setSearchFocus(i, (t) => {
			let n = e.devices.get(t);
			return n?.hostname ?? n?.ip ?? t;
		}), t.searchMatchCount = i.size;
	}
	function xe() {
		r.startLoop((n, i) => {
			if (Ee(n, i), c.update(n), u.update(n), d.update(i), f.update(n), v.update(r.camera), o.tick(r.camera, r.getSize()), s.updateLod(r.camera, r.controls.target, r.getSize(), o.getLabelObstacles(), r.getLabelExclusions()), t.showParticles && l.update(n, t.visibleLinkTypes), Te(i), Se() || N.forEach((t) => {
				let n = e.devices.get(t)?.status;
				n === "warning" ? o.pulseStatus(t, "warning", .4 * Math.abs(Math.sin(i * 1.6))) : n === "critical" && o.pulseStatus(t, "critical", .7 * Math.abs(Math.sin(i * 4)));
			}), A && !T && !g.isDrawing && !_.hasPending) {
				let e = m.castHover(32), n = e.deviceId ?? e.linkId ?? e.linkHandleId ?? null;
				n ? (k = 0, n !== t.hoveredId && (t.hoveredId = n)) : t.hoveredId && (k += 1, k >= 3 && (t.hoveredId = null));
			}
		});
	}
	function Se() {
		return !!t.filter.search.trim() || t.filter.status.length > 0 || t.filter.type.length > 0 || t.alertsOnly;
	}
	let Ce = [];
	function we() {
		let n = e.scopedDevices(t.activeRootSpaceId).filter((e) => e.status === "critical" || e.status === "warning").sort((e) => e.status === "critical" ? -1 : 1);
		if (!n.length) {
			Ce = [];
			return;
		}
		V ??= new R.Raycaster();
		let i = r.camera, a = i.position, c = [...o.getInstancedMeshes(), ...s.getHitMeshes()], l = [];
		for (let e of n) {
			if (l.length >= 12) break;
			let t = o.getDeviceWorldPos(e.id);
			if (!t) continue;
			let n = t.clone().project(i), r = Math.abs(n.x) > 1 || Math.abs(n.y) > 1 || n.z > 1 || n.z < -1, s = !1;
			if (!r) {
				let e = t.distanceTo(a), n = t.clone().sub(a).normalize();
				V.set(a, n), V.far = Math.max(e - .15, 0), s = V.intersectObjects(c, !1).length > 0;
			}
			!r && !s || l.push({
				id: e.id,
				status: e.status
			});
		}
		Ce = l;
	}
	function Te(e) {
		if (!b || !o) {
			t.offscreenAlerts.length && (t.offscreenAlerts = []);
			return;
		}
		if (e - H >= .25 && (H = e, we()), !Ce.length) {
			t.offscreenAlerts.length && (t.offscreenAlerts = []);
			return;
		}
		let n = r.camera, i = b.clientWidth || 1, a = b.clientHeight || 1, s = [];
		for (let e of Ce) {
			let t = o.getDeviceWorldPos(e.id);
			if (!t) continue;
			let r = t.clone().project(n), c = r.x, l = -r.y;
			(r.z > 1 || r.z < -1) && (c = -c, l = -l);
			let u = Math.atan2(l, c), d = .92, f = Math.min(d / Math.max(Math.abs(c), 1e-6), d / Math.max(Math.abs(l), 1e-6), 1), p = c * f, m = l * f;
			s.push({
				id: e.id,
				status: e.status,
				edgeX: (p * .5 + .5) * i,
				edgeY: (m * .5 + .5) * a,
				angle: u * 180 / Math.PI + 90
			});
		}
		t.offscreenAlerts = s;
	}
	function Ee(n, r) {
		L += 1, I ||= r;
		let i = r - I;
		if (i < 5) return;
		let a = L / i, o = performance.now();
		a < 30 && o - z > 15e3 && (z = o, F.onPerformanceWarning?.({
			type: "low-fps",
			fps: Math.round(a * 10) / 10,
			frameMs: Math.round(n * 1e4) / 10,
			devices: e.devices.size,
			links: e.links.size
		}), t.showParticles && !B && (B = !0, t.showParticles = !1, t.addToast("Performance mode: link-traffic particles disabled (low frame rate detected)", "warning"))), I = r, L = 0;
	}
	function De(n) {
		if (!b) return;
		if (w = {
			x: n.clientX,
			y: n.clientY
		}, m.updatePointer(n, b), A = !0, t.mode === "edit" && v.isVisible) {
			let t = v.pickAxis(m.currentPointer, r.camera);
			if (t) {
				T = t, D = v.position, E = t === "y" ? ge(n, D) : m.getGroundPoint(n, b);
				let i = v.currentTarget;
				if (O = [], i?.type === "space") {
					let t = D.clone();
					(e.devicesBySpace.get(i.id) ?? []).forEach((e) => {
						let n = o.getDeviceWorldPos(e.id);
						n && O.push({
							id: e.id,
							offset: n.clone().sub(t)
						});
					});
				}
				r.controls.enabled = !1;
				return;
			}
		}
		if (t.mode === "edit" && t.backgroundEditActive) {
			let e = he(n);
			if (e) {
				t.select({
					type: "background",
					id: e
				}), r.controls.enabled = !0;
				return;
			}
		}
		let i = m.castClick(t.linkToolActive);
		if (t.mode === "edit" && t.linkToolActive) {
			let e = i.deviceId ?? je(n, b, 28);
			if (e) {
				g.onMouseDown(e, n), r.controls.enabled = !1;
				return;
			}
		}
		if (t.mode === "edit" && i.linkHandleId) {
			ne(), _.onMouseDown(i.linkHandleId, "linkHandle", n), r.controls.enabled = !1;
			return;
		}
		r.controls.enabled = !0;
	}
	function Oe(n) {
		if (!b) return;
		if (m.updatePointer(n, b), A = !0, t.mode === "edit" && T && E && D) {
			let e = T === "y" ? ge(n, D) : m.getGroundPoint(n, b);
			if (e) {
				let t = e.clone().sub(E), n = D.clone();
				(T === "x" || T === "xz") && (n.x += t.x), (T === "z" || T === "xz") && (n.z += t.z), T === "y" && (n.y = Math.max(0, D.y + t.y));
				let r = v.currentTarget;
				T !== "y" && r?.type !== "background" && ve(n), v.setPosition(n), r?.type === "device" ? (o.setPosition(r.id, n), c.refreshPositionsFor([r.id], (e) => o.getDeviceWorldPos(e)), de()) : r?.type === "space" ? (s.setPosition(r.id, n), O.forEach((e) => o.setPosition(e.id, n.clone().add(e.offset))), c.refreshPositionsFor(O.map((e) => e.id), (e) => o.getDeviceWorldPos(e)), de()) : r?.type === "background" && p.setPosition(r.id, n);
			}
			return;
		}
		if (t.mode === "edit" && t.linkToolActive && g.isDrawing) {
			g.onMouseMove(n, b);
			return;
		}
		if (t.mode === "edit" && _.hasPending) {
			let e = _.onMouseMove(n, b, r.camera);
			if (e && _.isDragging) {
				let t = _.currentTarget;
				t.type === "device" ? o.setPosition(t.id, ve(e)) : t.type === "space" ? s.setPosition(t.id, ve(e)) : t.type === "linkHandle" && (c.updateMidpoint(t.id, e.x, e.z), de());
				return;
			}
		}
		if (t.mode === "edit" && v.isVisible && v.isHovering(m.currentPointer, r.camera)) {
			t.hideTooltip(), b.style.cursor = "move";
			return;
		}
		let i = t.hoveredId;
		i && e.devices.has(i) ? (t.showTooltipAt(n.clientX, n.clientY, i), b.style.cursor = t.linkToolActive ? "crosshair" : "pointer") : i ? (t.hideTooltip(), b.style.cursor = t.mode === "edit" ? "move" : "pointer") : (t.hideTooltip(), b.style.cursor = t.linkToolActive ? "crosshair" : "");
	}
	function ke(n) {
		if (!b) return;
		if (r.controls.enabled = !0, t.mode === "edit" && T) {
			let n = v.currentTarget, r = v.position;
			ne();
			let i = [];
			n?.type === "device" ? (e.mapDevice(n.id, e.getMappingByDeviceId(n.id)?.primarySpaceId ?? "", 0, {
				x: r.x,
				y: r.y,
				z: r.z
			}), e.logChange("layout.update", `Device moved: ${n.id}`), t.addToast("Device moved", "success"), i = [n.id]) : n?.type === "space" ? (e.updateSpace(n.id, { position: {
				x: r.x,
				y: r.y,
				z: r.z
			} }), O.forEach((t) => {
				let i = r.clone().add(t.offset);
				e.mapDevice(t.id, e.getMappingByDeviceId(t.id)?.primarySpaceId ?? n.id, 0, {
					x: i.x,
					y: i.y,
					z: i.z
				});
			}), e.logChange("space.update", `Space moved: ${n.id} (+${O.length} devices)`), t.addToast("Space moved", "success"), i = O.map((e) => e.id)) : n?.type === "background" && (e.updateBackgroundObject(n.id, { position: {
				x: r.x,
				y: r.y,
				z: r.z
			} }), e.logChange("background.update", `Background moved: ${n.id}`), t.addToast("Background moved", "success")), i.length && (c.refreshPositionsFor(i, (e) => o.getDeviceWorldPos(e)), de()), T = null, E = null, D = null, O = [];
			return;
		}
		if (t.mode === "edit" && t.backgroundEditActive && t.selection?.type === "background" && he(n)) return;
		m.updatePointer(n, b);
		let i = m.castClick(t.linkToolActive);
		if (t.mode === "edit" && t.linkToolActive && g.isDrawing) {
			let e = i.deviceId ?? je(n, b, 28), r = g.isDragging;
			g.onMouseUp(e ?? null, n) === "cancelled" && r && t.addToast("Release on a device to create a link", "info");
			return;
		}
		if (t.mode === "edit" && _.hasPending) {
			let i = _.onMouseUp(n, b, r.camera);
			if (i) {
				let { targetId: n, targetType: r, newPos: a } = i;
				r !== "linkHandle" && ve(a), r !== "linkHandle" && ne(), r === "device" ? (e.mapDevice(n, e.getMappingByDeviceId(n)?.primarySpaceId ?? "", 0, {
					x: a.x,
					y: 0,
					z: a.z
				}), e.logChange("layout.update", `Device moved: ${n}`), t.addToast("Device moved", "success"), c.refreshPositionsFor([n], (e) => o.getDeviceWorldPos(e)), de()) : r === "space" ? (e.updateSpace(n, { position: {
					x: a.x,
					y: 0,
					z: a.z
				} }), e.logChange("space.update", `Space moved: ${n}`), t.addToast("Space moved", "success")) : r === "linkHandle" && (e.updateLink(n, {
					midX: a.x,
					midZ: a.z
				}), e.logChange("topology.link.update", "Link routing changed"));
				return;
			}
		}
		let a = n.clientX - w.x, s = n.clientY - w.y;
		Math.sqrt(a * a + s * s) > 8 || (i.deviceId ? n.ctrlKey || n.metaKey ? (t.multiSelectedDeviceIds.has(i.deviceId) ? t.multiSelectedDeviceIds.delete(i.deviceId) : (t.multiSelectedDeviceIds.add(i.deviceId), t.multiSelectedDeviceIds.size === 1 && t.select({
			type: "device",
			id: i.deviceId
		})), o.setMultiHighlight([...t.multiSelectedDeviceIds])) : (t.multiSelectedDeviceIds.clear(), o.setMultiHighlight([]), t.select({
			type: "device",
			id: i.deviceId
		})) : i.spaceId ? (t.multiSelectedDeviceIds.clear(), o.setMultiHighlight([]), t.select({
			type: "space",
			id: i.spaceId
		}), t.mode === "view" && e.spaces.get(i.spaceId)?.type === "rack" && Xe(i.spaceId)) : i.linkId ? (t.multiSelectedDeviceIds.clear(), o.setMultiHighlight([]), t.select({
			type: "link",
			id: i.linkId
		})) : i.linkHandleId || (t.multiSelectedDeviceIds.clear(), o.setMultiHighlight([]), t.select(null)));
	}
	function Ae(n) {
		if (n.key === "Escape") {
			t.select(null), t.hideContextMenu(), t.multiSelectedDeviceIds.clear(), o?.setMultiHighlight([]), g.cancel(), _.cancel(), r.controls.enabled = !0, u.clear(), t.blastSourceId = null;
			return;
		}
		if (n.key === "f" || n.key === "F") {
			y.flyToOverview();
			return;
		}
		if ((n.key === "l" || n.key === "L") && !Me()) {
			t.mode === "edit" && t.toggleLinkTool();
			return;
		}
		if ((n.key === "]" || n.key === "[") && !Me()) {
			Ye(n.key === "]" ? 1 : -1);
			return;
		}
		if (t.mode === "edit" && (n.key === "Delete" || n.key === "Backspace") && !Me()) {
			if (n.preventDefault(), t.multiSelectedDeviceIds.size > 1) {
				let n = [...t.multiSelectedDeviceIds];
				t.requestConfirm(`Delete ${n.length} selected devices? This also removes their links.`, () => {
					ne(), n.forEach((t) => {
						e.unmapDevice(t);
					}), e.logChange("device.unmap", `${n.length} devices removed`), t.addToast(`${n.length} devices removed`, "info"), t.multiSelectedDeviceIds.clear(), o.setMultiHighlight([]), t.select(null);
				});
				return;
			}
			let r = t.selection;
			if (!r) return;
			ne(), r.type === "device" ? (e.unmapDevice(r.id), e.logChange("device.unmap", `Device removed: ${r.id}`), t.addToast("Device removed", "info"), t.select(null)) : r.type === "link" ? (e.removeLink(r.id), e.logChange("topology.link.delete", `Link deleted: ${r.id}`), t.addToast("Link deleted", "info"), t.select(null)) : r.type === "space" && (e.archiveSpace(r.id), nt(r.id), e.logChange("space.archive", `Space archived: ${r.id}`), t.addToast("Space archived", "info"), t.select(null));
			return;
		}
		if (n.ctrlKey && n.key === "z" && !Me()) {
			n.preventDefault();
			let e = U.pop();
			e ? (ee.push(te()), re(e), t.addToast("Undone", "info")) : t.addToast("Nothing to undo", "info");
			return;
		}
		if (n.ctrlKey && n.key === "y" && !Me()) {
			n.preventDefault();
			let e = ee.pop();
			e ? (U.push(te()), re(e), t.addToast("Redone", "info")) : t.addToast("Nothing to redo", "info");
			return;
		}
	}
	function je(t, n, i) {
		let a = n.getBoundingClientRect(), o = t.clientX - a.left, s = t.clientY - a.top, c = null, l = i * i;
		return e.mappings.forEach((e) => {
			if (!e.position || e.mappingStatus === "unmapped") return;
			let t = new R.Vector3(e.position.x, e.position.y, e.position.z);
			t.project(r.camera);
			let n = (t.x * .5 + .5) * a.width, i = (-t.y * .5 + .5) * a.height, u = n - o, d = i - s, f = u * u + d * d;
			f < l && (l = f, c = e.rawDeviceId);
		}), c;
	}
	function Me() {
		let e = document.activeElement;
		return e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement;
	}
	function Ne(n) {
		let r = [...e.links.values()], i = /* @__PURE__ */ new Map();
		r.forEach((e) => {
			e.sourceDeviceId === n && i.set(e.targetDeviceId, n), e.targetDeviceId === n && i.set(e.sourceDeviceId, n);
		}), i.delete(n);
		let a = /* @__PURE__ */ new Map();
		r.forEach((e) => {
			let t = i.has(e.sourceDeviceId) ? e.sourceDeviceId : i.has(e.targetDeviceId) ? e.targetDeviceId : null;
			if (!t) return;
			let r = t === e.sourceDeviceId ? e.targetDeviceId : e.sourceDeviceId;
			r !== n && !i.has(r) && a.set(r, t);
		});
		let s = [];
		i.forEach((e, t) => s.push({
			deviceId: t,
			hop: 1,
			linkedDeviceId: e
		})), a.forEach((e, t) => s.push({
			deviceId: t,
			hop: 2,
			linkedDeviceId: e
		})), u.show(s, (e) => o.getDeviceWorldPos(e)), t.blastSourceId = n;
	}
	function Pe() {
		let n = c.getRenderedLinkIds(), r = (e) => o.getDeviceWorldPos(e);
		n.forEach((t) => {
			e.links.has(t) || c.removeLink(t);
		}), e.links.forEach((e) => {
			n.has(e.id) ? c.updateLink(e, r) : c.addLink(e, r);
		}), [
			"physical",
			"logical",
			"service_dependency",
			"traffic_flow",
			"security_path",
			"manual",
			"inferred"
		].forEach((e) => c.setVisible(e, t.visibleLinkTypes.has(e))), de();
	}
	function Fe(n, i) {
		if (!b) return;
		if (t.mode !== "edit") {
			t.addToast("Switch to Edit mode to place devices", "warning");
			return;
		}
		let a = b.getBoundingClientRect(), s = new R.Vector2((i.clientX - a.left) / a.width * 2 - 1, -((i.clientY - a.top) / a.height) * 2 + 1), c = new R.Raycaster();
		c.setFromCamera(s, r.camera);
		let l = new R.Plane(new R.Vector3(0, 1, 0), 0), u = new R.Vector3(), d = r.controls.target, f = u;
		(!c.ray.intersectPlane(l, u) || u.distanceTo(d) > 60) && (f = d.clone().setY(0)), ne(), e.mapDevice(n, "", 0, {
			x: f.x,
			y: .4,
			z: f.z
		}), e.logChange("device.map", `Device placed: ${n}`), t.addToast("Device placed", "success"), h(() => {
			let r = e.devices.get(n), i = e.getMappingByDeviceId(n);
			if (r && i?.position) {
				o.addDevice(r, i), t.select({
					type: "device",
					id: n
				}), be();
				let e = o.getDeviceWorldPos(n);
				e && y.flyToDevice(e);
			} else t.addToast("Failed to place device — check Edit mode", "warning");
		});
	}
	function Ie(n, r, i) {
		if (t.mode !== "edit") {
			t.addToast("Switch to Edit mode to create links", "warning"), J().hideContextMenu();
			return;
		}
		ne();
		let a = `link-${Date.now()}`;
		e.addLink({
			id: a,
			sourceDeviceId: n,
			targetDeviceId: r,
			type: i,
			source: "manual",
			status: "up"
		}), e.logChange("topology.link.create", `Link created: ${i}`), t.addToast(`${i} link created`, "success"), J().hideContextMenu();
	}
	function Le() {
		try {
			return r.renderer.render(r.scene, r.camera), r.renderer.domElement.toDataURL("image/jpeg", .5);
		} catch {
			return;
		}
	}
	function Re(n) {
		let i = {
			id: `view-${Date.now()}`,
			name: n,
			cameraPos: {
				x: r.camera.position.x,
				y: r.camera.position.y,
				z: r.camera.position.z
			},
			cameraTarget: {
				x: r.controls.target.x,
				y: r.controls.target.y,
				z: r.controls.target.z
			},
			createdAt: (/* @__PURE__ */ new Date()).toLocaleString(),
			thumbnail: Le()
		};
		e.addSavedView(i), t.addToast(`View saved: ${n}`, "success");
	}
	function ze(e) {
		y.flyTo(new R.Vector3(e.cameraPos.x, e.cameraPos.y, e.cameraPos.z), new R.Vector3(e.cameraTarget.x, e.cameraTarget.y, e.cameraTarget.z));
	}
	function Be(t) {
		let n = e.getMappingByDeviceId(t)?.primarySpaceId;
		if (n && Ze(n, {
			type: "device",
			id: t
		})) return;
		let r = o.getDeviceWorldPos(t);
		r && y.flyToDevice(r);
	}
	function Ve() {
		y.flyToOverview();
	}
	function He() {
		let e = r.controls, t = r.camera.position.clone().sub(e.target), n = new R.Spherical().setFromVector3(t);
		n.theta = 0;
		let i = e.target.clone().add(new R.Vector3().setFromSpherical(n));
		y.flyTo(i, e.target.clone());
	}
	function Ue(e) {
		y.zoom(e);
	}
	function We(e) {
		y.setView(e);
	}
	function Ge(e, t) {
		y.panToXZ(e, t);
	}
	function Ke(e, t) {
		o.setAcknowledged(e, t);
	}
	function qe() {
		t.setColorblindMode(!t.colorblindMode), Pn(t.colorblindMode ? "colorblind" : "default"), o?.recolorAll();
	}
	function Je() {
		let n = {
			critical: 0,
			warning: 1
		};
		return e.scopedDevices(t.activeRootSpaceId).filter((e) => e.status === "critical" || e.status === "warning").sort((e, t) => (n[e.status ?? ""] ?? 9) - (n[t.status ?? ""] ?? 9));
	}
	function Ye(e) {
		let n = Je();
		if (!n.length) return;
		let r = n.findIndex((e) => e.id === t.selectedDeviceId), i = n[r === -1 ? e === 1 ? 0 : n.length - 1 : (r + e + n.length) % n.length];
		t.select({
			type: "device",
			id: i.id
		}), Be(i.id);
	}
	function Xe(t) {
		if (Ze(t, {
			type: "space",
			id: t
		})) return;
		let n = e.spaces.get(t);
		if (!n?.position) return;
		let r = new R.Vector3(n.position.x, n.position.y, n.position.z), i = n.size ?? {
			width: 8,
			height: 4,
			depth: 8
		};
		y.flyToSpace(r, i);
	}
	function Ze(n, r) {
		let i = e.resolveLeafScope(n);
		return !i || i === t.activeRootSpaceId ? !1 : (ce = r, t.activeRootSpaceId = i, !0);
	}
	function Qe(e) {
		let t = d.getNodeWorldPos(e);
		t && y.flyToDevice(t);
	}
	function $e(t) {
		if (t < 0) return;
		let n = i.getFrame(t);
		n && Object.entries(n.states).forEach(([t, n]) => e.updateDeviceStatus(t, n.status, n.metrics));
	}
	async function et() {
		if (!x) return;
		let n = ++C;
		se();
		let i = t.activeRootSpaceId;
		if (s.dispose(), s = new Oi(r.scene), s.loadSpaces(e.scopedSpaces(i)), o.dispose(), o = new Ei(r.scene), await vi(a.customTypes), !(!x || n !== C) && (o.loadInstanced(e.scopedDevices(i), e.mappings, (t) => e.getMappingByDeviceId(t)), c.dispose(), c = new aa(r.scene), ie(), c.loadLinks(e.scopedLinks(i), (e) => o.getDeviceWorldPos(e)), [
			"physical",
			"logical",
			"service_dependency",
			"traffic_flow",
			"security_path",
			"manual",
			"inferred"
		].forEach((e) => c.setVisible(e, t.visibleLinkTypes.has(e))), de(), p.dispose(), p = new ka(r.scene), await p.loadObjects(e.scopedBackgroundObjects(i)), !(!x || n !== C))) return p.setEditMode(t.backgroundEditActive), m = new Mc(r.camera, o, s, c), g = new Nc(r.camera, c, o, (e, t, n, r) => J().showContextMenu(n, r, e, t)), ue(), tt(), !0;
	}
	function tt() {
		let n = e.scopedBounds(t.activeRootSpaceId);
		if (!n) {
			y.flyToOverview();
			return;
		}
		let r = new R.Vector3((n.minX + n.maxX) / 2, 0, (n.minZ + n.maxZ) / 2);
		y.flyToSpace(r, {
			width: n.maxX - n.minX,
			depth: n.maxZ - n.minZ
		});
	}
	function nt(n) {
		let r = t.activeRootSpaceId;
		if (r && !e.descendantSpaceIds(r).has(n)) return;
		let i = e.spaces.get(n);
		s.removeSpace(n), i && !i.archived && (s.addSpace(i), t.selection?.type === "space" && t.selection.id === n && s.setSelected(n, !0));
	}
	function rt() {
		x = !1, ++C, t.offscreenAlerts = [], P.splice(0).forEach((e) => e()), b?.removeEventListener("pointerdown", De), b?.removeEventListener("pointermove", Oe), b?.removeEventListener("pointerup", ke), b?.removeEventListener("pointerleave", pe), b?.removeEventListener("contextmenu", it), window.removeEventListener("keydown", Ae), v?.dispose(), o?.dispose(), s?.dispose(), c?.dispose(), l?.dispose(), u?.dispose(), d?.dispose(), f?.dispose(), p?.dispose(), y.dispose(), r.dispose(), b = null, M.clear(), N.clear();
	}
	function it(e) {
		e.preventDefault();
	}
	return {
		configure: W,
		init: ae,
		dispose: rt,
		dropDeviceAt: Fe,
		confirmCreateLink: Ie,
		saveCurrentView: Re,
		loadSavedView: ze,
		focusDevice: Be,
		focusSpace: Xe,
		focusVirtualNode: Qe,
		resetCamera: Ve,
		faceNorth: He,
		zoomCamera: Ue,
		setCameraView: We,
		flyToWorldPoint: Ge,
		setDeviceAcknowledged: Ke,
		toggleColorblindMode: qe,
		cycleAlarms: Ye,
		onTimelineScrub: $e,
		refreshSpace: nt,
		rebuildAll: et,
		timeline: i,
		getScene: () => r
	};
}
//#endregion
//#region src/components/layout/AppMenuBar.vue?vue&type=script&setup=true&lang.ts
var ou = ["onMouseenter", "onClick"], su = { class: "menu-label" }, cu = {
	key: 0,
	class: "menu-sep"
}, lu = {
	key: 1,
	class: "menu-header"
}, uu = ["disabled", "onClick"], du = { class: "check-cell" }, fu = { class: "item-label" }, pu = { class: "shortcut" }, mu = /* @__PURE__ */ p({
	__name: "AppMenuBar",
	setup(t) {
		let r = J(), a = q(), o = Qt(), u = iu(), d = S(null), p = i(() => ({
			on: r.connectionStatus === "connected",
			reconnecting: r.connectionStatus === "reconnecting",
			off: r.connectionStatus === "disconnected"
		})), m = i(() => {
			switch (r.connectionStatus) {
				case "connected": return "Live";
				case "reconnecting": return "Reconnecting…";
				default: return "Offline";
			}
		}), h = [
			{
				label: "Alerts",
				key: "showAlertPanel"
			},
			{
				label: "Custom Types",
				key: "showCustomTypes"
			},
			{
				label: "Background",
				key: "showBackgroundPanel"
			},
			{
				label: "Devices",
				key: "showUnmapped"
			},
			{
				label: "Spaces",
				key: "showSpaceTree"
			},
			{
				label: "Saved Views",
				key: "showSavedViews"
			},
			{
				label: "Change Log",
				key: "showChangeLog"
			},
			{
				label: "Virtual Nodes",
				key: "showVirtualNodes"
			},
			{
				label: "Minimap",
				key: "showMinimap"
			},
			{
				label: "Timeline",
				key: "showTimeline"
			}
		], _ = [
			{
				type: "physical",
				label: "Physical"
			},
			{
				type: "logical",
				label: "Logical"
			},
			{
				type: "service_dependency",
				label: "Service Dependency"
			},
			{
				type: "traffic_flow",
				label: "Traffic Flow"
			},
			{
				type: "security_path",
				label: "Security Path"
			},
			{
				type: "manual",
				label: "Manual"
			}
		];
		function x(e) {
			r.toggleLinkType(e);
		}
		function w() {
			o.connected.value ? (o.disconnect(), r.setConnectionStatus("disconnected")) : (o.connect(), r.setConnectionStatus("connected"));
		}
		let E = null, D = S(!1);
		function O() {
			if (D.value) {
				E && clearInterval(E), E = null, D.value = !1;
				return;
			}
			D.value = !0;
			let e = [
				"normal",
				"normal",
				"normal",
				"warning",
				"critical",
				"offline",
				"maintenance"
			];
			E = setInterval(() => {
				let t = [...a.devices.keys()];
				for (let n = 0; n < 3; n++) {
					let n = t[Math.floor(Math.random() * t.length)];
					a.updateDeviceStatus(n, e[Math.floor(Math.random() * e.length)]);
				}
			}, 1400);
		}
		let k = i(() => [
			{
				label: "File",
				items: [
					{
						label: "Import devices…",
						action: () => {
							r.showImport = !0;
						}
					},
					{ separator: !0 },
					{
						label: "Live updates",
						checked: () => r.connectionStatus === "connected",
						action: w
					},
					...a.hasFeature("chaosSimulator") ? [{
						label: "Random simulator",
						checked: () => D.value,
						action: O
					}] : []
				]
			},
			{
				label: "View",
				items: [
					{
						header: !0,
						label: "Navigation"
					},
					{
						label: "Campus overview (2D)",
						checked: () => r.viewMode === "2d",
						action: () => {
							r.viewMode === "2d" ? r.enterScope(r.activeRootSpaceId) : r.showOverview();
						}
					},
					{ separator: !0 },
					{
						header: !0,
						label: "Panels"
					},
					...h.map((e) => ({
						label: e.label,
						checked: () => !!r[e.key],
						action: () => {
							r[e.key] = !r[e.key];
						}
					})),
					{ separator: !0 },
					{
						header: !0,
						label: "Link layers"
					},
					..._.map((e) => ({
						label: e.label,
						checked: () => r.visibleLinkTypes.has(e.type),
						action: () => x(e.type)
					})),
					{ separator: !0 },
					{
						label: "Particles",
						checked: () => r.showParticles,
						action: () => {
							r.showParticles = !r.showParticles;
						}
					},
					{
						label: "Impact radius",
						checked: () => r.showBlastRadius,
						action: () => {
							r.showBlastRadius = !r.showBlastRadius;
						}
					}
				]
			},
			{
				label: "Tools",
				items: [
					{
						label: "Connect (link tool)",
						shortcut: "L",
						checked: () => r.linkToolActive,
						action: () => r.toggleLinkTool()
					},
					{
						label: "Next alert",
						shortcut: "]",
						action: () => u.cycleAlarms(1)
					},
					{
						label: "Previous alert",
						shortcut: "[",
						action: () => u.cycleAlarms(-1)
					},
					{ separator: !0 },
					{
						label: "Mode: View",
						checked: () => r.mode === "view",
						action: () => r.setMode("view")
					},
					{
						label: "Mode: Edit",
						checked: () => r.mode === "edit",
						action: () => r.setMode("edit")
					}
				]
			},
			{
				label: "Preferences",
				items: [
					{
						label: "Text size −",
						action: () => r.setFontScale(r.fontScale - .05)
					},
					{
						label: "Text size +",
						action: () => r.setFontScale(r.fontScale + .05)
					},
					{
						label: "Reset text size",
						action: () => r.setFontScale(1.1)
					},
					{ separator: !0 },
					{
						label: "Colorblind-safe palette",
						checked: () => r.colorblindMode,
						action: () => u.toggleColorblindMode()
					}
				]
			},
			{
				label: "Help",
				items: [{
					label: "Show help",
					shortcut: "?",
					action: () => {
						r.showHelp = !0;
					}
				}, {
					label: "Take a tour",
					action: () => $l()
				}]
			}
		]);
		function A(e) {
			d.value = d.value === e ? null : e;
		}
		function j(e) {
			d.value !== null && (d.value = e);
		}
		function N(e) {
			e.disabled?.() || (e.action?.(), I());
		}
		function I() {
			d.value = null;
		}
		function L(e) {
			e.target.closest(".menu-root") || I();
		}
		return y(() => document.addEventListener("mousedown", L)), v(() => document.removeEventListener("mousedown", L)), (t, r) => (b(), c("div", {
			class: "menubar",
			onKeydown: P(I, ["escape"])
		}, [
			r[1] ||= l("span", { class: "brand" }, "Topospace", -1),
			(b(!0), c(e, null, C(k.value, (t) => (b(), c("div", {
				key: t.label,
				class: g(["menu-root", { open: d.value === t.label }]),
				onMouseenter: (e) => j(t.label),
				onClick: (e) => A(t.label)
			}, [l("span", su, T(t.label), 1), f(n, { name: "menu-fade" }, {
				default: M(() => [d.value === t.label ? (b(), c("div", {
					key: 0,
					class: "menu-dropdown",
					onClick: r[0] ||= F(() => {}, ["stop"])
				}, [(b(!0), c(e, null, C(t.items, (t, n) => (b(), c(e, { key: n }, [t.separator ? (b(), c("div", cu)) : t.header ? (b(), c("div", lu, T(t.label), 1)) : (b(), c("button", {
					key: 2,
					class: g(["menu-item", {
						checked: t.checked?.(),
						disabled: t.disabled?.()
					}]),
					disabled: t.disabled?.(),
					onClick: F((e) => N(t), ["stop"])
				}, [
					l("span", du, T(t.checked?.() ? "✓" : ""), 1),
					l("span", fu, T(t.label), 1),
					l("span", pu, T(t.shortcut ?? ""), 1)
				], 10, uu))], 64))), 128))])) : s("", !0)]),
				_: 2
			}, 1024)], 42, ou))), 128)),
			r[2] ||= l("div", { class: "spacer" }, null, -1),
			l("span", { class: g(["status-pill", p.value]) }, T(m.value), 3)
		], 32));
	}
}), $ = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, hu = /* @__PURE__ */ $(mu, [["__scopeId", "data-v-3ea938b8"]]), gu = { class: "toolbar" }, _u = { class: "search-wrap" }, vu = {
	key: 0,
	class: "type-dropdown"
}, yu = ["checked", "onChange"], bu = {
	class: "alerts-only",
	title: "Show only devices that aren't normal — everything else dims"
}, xu = ["title"], Su = {
	key: 0,
	class: "chip-total"
}, Cu = ["title"], wu = {
	key: 0,
	class: "chip-total"
}, Tu = { class: "chip total" }, Eu = { class: "mode-switch" }, Du = ["disabled"], Ou = ["disabled"], ku = ["disabled", "title"], Au = {
	key: 0,
	class: "active-filters"
}, ju = ["aria-label", "onClick"], Mu = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "TopToolbar",
	setup(t) {
		let n = q(), r = J(), { resetCamera: a } = iu(), o = i({
			get: () => r.filter.status[0] ?? "",
			set: (e) => r.setFilter({ status: e ? [e] : [] })
		}), f = Object.keys(Rn), p = S(!1), m = S(null);
		function h(e) {
			let t = r.filter.type.includes(e) ? r.filter.type.filter((t) => t !== e) : [...r.filter.type, e];
			r.setFilter({ type: t });
		}
		let x = i(() => {
			let e = [];
			r.filter.search && e.push({
				key: "search",
				label: `Search: "${r.filter.search}"`,
				onRemove: () => r.setFilter({ search: "" })
			});
			for (let t of r.filter.status) e.push({
				key: `status-${t}`,
				label: zn[t] ?? t,
				onRemove: () => r.setFilter({ status: r.filter.status.filter((e) => e !== t) })
			});
			for (let t of r.filter.type) e.push({
				key: `type-${t}`,
				label: Rn[t],
				onRemove: () => h(t)
			});
			return r.alertsOnly && e.push({
				key: "alertsOnly",
				label: "Alerts only",
				onRemove: () => {
					r.alertsOnly = !1;
				}
			}), e;
		});
		function w() {
			r.resetFilter();
		}
		function O(e) {
			p.value && !m.value?.contains(e.target) && (p.value = !1);
		}
		y(() => document.addEventListener("mousedown", O)), v(() => document.removeEventListener("mousedown", O));
		let j = i(() => n.scopedCriticalCount(r.activeRootSpaceId)), M = i(() => n.scopedWarningCount(r.activeRootSpaceId)), F = i(() => r.activeRootSpaceId !== null && (j.value !== n.criticalCount || M.value !== n.warningCount)), I = i(() => r.activeRootSpaceId ? "Count for the current floor/site" : "Count across all devices");
		function L() {
			if (r.showBackgroundPanel) {
				r.showBackgroundPanel = !1;
				return;
			}
			r.closeLeftDock(), r.showBackgroundPanel = !0;
		}
		let R = i(() => n.autoLayoutProgress !== null), z = i(() => {
			let e = n.autoLayoutProgress;
			return !e || !e.iterations ? 0 : Math.round(e.iteration / e.iterations * 100);
		});
		async function B() {
			if (R.value) {
				n.cancelAutoLayout();
				return;
			}
			let e = [...n.scopedDeviceIds(r.activeRootSpaceId)], { cancelled: t } = await n.autoLayout({ deviceIds: e });
			r.addToast(t ? "Auto layout cancelled" : "Auto layout complete", t ? "info" : "success");
		}
		return (t, i) => (b(), c(e, null, [l("header", gu, [
			l("div", _u, [N(l("input", {
				"onUpdate:modelValue": i[0] ||= (e) => E(r).filter.search = e,
				placeholder: "Search name / IP",
				class: "search",
				onKeydown: i[1] ||= P((e) => E(r).resetFilter(), ["escape"])
			}, null, 544), [[A, E(r).filter.search]]), E(r).filter.search ? (b(), c("span", {
				key: 0,
				class: "clr",
				onClick: i[2] ||= (e) => E(r).filter.search = ""
			}, "Clear")) : s("", !0)]),
			E(r).searchMatchCount === null ? s("", !0) : (b(), c("span", {
				key: 0,
				class: g(["match-count", { "match-count--zero": E(r).searchMatchCount === 0 }])
			}, T(E(r).searchMatchCount) + " matched ", 3)),
			N(l("select", {
				"onUpdate:modelValue": i[3] ||= (e) => o.value = e,
				class: "sel"
			}, [...i[12] ||= [u("<option value=\"\" data-v-80e53bf5>All status</option><option value=\"critical\" data-v-80e53bf5>Critical</option><option value=\"warning\" data-v-80e53bf5>Warning</option><option value=\"normal\" data-v-80e53bf5>Normal</option><option value=\"offline\" data-v-80e53bf5>Offline</option><option value=\"maintenance\" data-v-80e53bf5>Maintenance</option>", 6)]], 512), [[k, o.value]]),
			l("div", {
				ref_key: "typeFilterEl",
				ref: m,
				class: "type-filter"
			}, [l("button", {
				class: g(["btn", { "btn-on": E(r).filter.type.length > 0 }]),
				onClick: i[4] ||= (e) => p.value = !p.value
			}, " Type" + T(E(r).filter.type.length ? ` (${E(r).filter.type.length})` : ""), 3), p.value ? (b(), c("div", vu, [(b(!0), c(e, null, C(E(f), (e) => (b(), c("label", {
				key: e,
				class: "type-opt"
			}, [l("input", {
				type: "checkbox",
				checked: E(r).filter.type.includes(e),
				onChange: (t) => h(e)
			}, null, 40, yu), d(" " + T(E(Rn)[e]), 1)]))), 128)), E(r).filter.type.length ? (b(), c("button", {
				key: 0,
				class: "type-clear",
				onClick: i[5] ||= (e) => E(r).setFilter({ type: [] })
			}, " Clear ")) : s("", !0)])) : s("", !0)], 512),
			l("label", bu, [N(l("input", {
				"onUpdate:modelValue": i[6] ||= (e) => E(r).alertsOnly = e,
				type: "checkbox"
			}, null, 512), [[D, E(r).alertsOnly]]), i[13] ||= d(" 🔔 Alerts only ", -1)]),
			l("div", {
				class: "chip critical",
				title: I.value,
				style: _({
					color: E(Mn).critical,
					borderColor: E(Mn).critical
				})
			}, [
				i[14] ||= d(" Critical ", -1),
				l("b", null, T(j.value), 1),
				F.value ? (b(), c("span", Su, " (" + T(E(n).criticalCount) + " total)", 1)) : s("", !0)
			], 12, xu),
			l("div", {
				class: "chip warning",
				title: I.value,
				style: _({
					color: E(Mn).warning,
					borderColor: E(Mn).warning
				})
			}, [
				i[15] ||= d(" Warning ", -1),
				l("b", null, T(M.value), 1),
				F.value ? (b(), c("span", wu, " (" + T(E(n).warningCount) + " total)", 1)) : s("", !0)
			], 12, Cu),
			l("div", Tu, [i[16] ||= d(" Total ", -1), l("b", null, T(E(n).devices.size), 1)]),
			i[17] ||= l("div", { class: "spacer" }, null, -1),
			l("div", Eu, [l("button", {
				class: g(["mode-btn", E(r).mode === "view" ? "active" : ""]),
				onClick: i[7] ||= (e) => E(r).setMode("view")
			}, " View ", 2), l("button", {
				class: g(["mode-btn", E(r).mode === "edit" ? "active" : ""]),
				onClick: i[8] ||= (e) => E(r).setMode("edit")
			}, " Edit ", 2)]),
			l("button", {
				class: g(["btn", E(r).linkToolActive ? "btn-accent-on" : "btn-accent"]),
				disabled: E(r).mode !== "edit",
				title: "Connect devices (L)",
				onClick: i[9] ||= (e) => E(r).toggleLinkTool()
			}, " Connect ", 10, Du),
			l("button", {
				class: g(["btn", E(r).showBackgroundPanel ? "btn-on" : ""]),
				disabled: E(r).mode !== "edit",
				title: "Place a floor-plan image or building model",
				onClick: L
			}, " Background ", 10, Ou),
			l("button", {
				class: g(["btn", R.value ? "btn-accent-on" : ""]),
				disabled: E(r).mode !== "edit",
				title: R.value ? "Cancel auto layout" : "Force-directed placement for devices without a manual position",
				onClick: B
			}, T(R.value ? `Layout… ${z.value}% (cancel)` : "Auto Layout"), 11, ku),
			l("button", {
				class: "btn",
				title: "Reset view (F)",
				onClick: i[10] ||= (...e) => E(a) && E(a)(...e)
			}, " ⌂ Home "),
			l("button", {
				class: g(["btn", E(r).showHelp ? "btn-on" : ""]),
				onClick: i[11] ||= (e) => E(r).showHelp = !E(r).showHelp
			}, " Help ", 2)
		]), x.value.length ? (b(), c("div", Au, [(b(!0), c(e, null, C(x.value, (e) => (b(), c("span", {
			key: e.key,
			class: "filter-chip"
		}, [d(T(e.label) + " ", 1), l("button", {
			class: "filter-chip-x",
			"aria-label": `Remove filter: ${e.label}`,
			onClick: e.onRemove
		}, " × ", 8, ju)]))), 128)), l("button", {
			class: "filter-chip-clear",
			onClick: w
		}, " Clear all ")])) : s("", !0)], 64));
	}
}), [["__scopeId", "data-v-80e53bf5"]]), Nu = { class: "ap-sticky" }, Pu = { class: "ap-head" }, Fu = {
	class: "ap-filters",
	role: "group",
	"aria-label": "Alert severity"
}, Iu = ["aria-pressed"], Lu = ["aria-pressed", "onClick"], Ru = { "aria-hidden": "true" }, zu = { class: "ap-scope" }, Bu = {
	key: 0,
	class: "ap-empty"
}, Vu = ["title", "onClick"], Hu = { class: "ap-group-name" }, Uu = { class: "ap-group-count" }, Wu = { class: "ap-device-list" }, Gu = [
	"aria-pressed",
	"title",
	"onClick"
], Ku = {
	class: "ap-severity-icon",
	"aria-hidden": "true"
}, qu = { class: "ap-device-info" }, Ju = { class: "ap-dev-name" }, Yu = { class: "ap-device-meta" }, Xu = { key: 0 }, Zu = { class: "ap-status-label" }, Qu = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "AlertPanel",
	setup(t) {
		let n = new Set([
			"critical",
			"warning",
			"offline"
		]), r = {
			critical: 0,
			warning: 1,
			offline: 2
		}, a = J(), o = q(), { focusDevice: u, focusSpace: f } = iu(), p = i(() => {
			let e = [];
			o.spaces.forEach((t, i) => {
				if (t.archived) return;
				let a = (o.devicesBySpace.get(i) ?? []).filter((e) => n.has(e.status));
				a.length && (a.sort((e, t) => (r[e.status ?? ""] ?? 9) - (r[t.status ?? ""] ?? 9)), e.push({
					spaceId: i,
					spaceName: t.name,
					criticalCount: a.filter((e) => e.status === "critical").length,
					warningCount: a.filter((e) => e.status === "warning").length,
					offlineCount: a.filter((e) => e.status === "offline").length,
					devices: a
				}));
			});
			let t = new Set(e.flatMap((e) => e.devices.map((e) => e.id))), i = [...o.devices.values()].filter((e) => n.has(e.status) && !t.has(e.id));
			return i.length && (i.sort((e, t) => (r[e.status ?? ""] ?? 9) - (r[t.status ?? ""] ?? 9)), e.push({
				spaceId: "__ungrouped__",
				spaceName: "Ungrouped",
				criticalCount: i.filter((e) => e.status === "critical").length,
				warningCount: i.filter((e) => e.status === "warning").length,
				offlineCount: i.filter((e) => e.status === "offline").length,
				devices: i
			})), e.sort((e, t) => t.criticalCount - e.criticalCount || t.warningCount - e.warningCount), e;
		}), m = S(null), h = [
			"critical",
			"warning",
			"offline"
		], v = i(() => Object.fromEntries(h.map((e) => ["--" + e, Mn[e]]))), y = i(() => {
			let e = {
				critical: 0,
				warning: 0,
				offline: 0
			};
			for (let t of p.value) for (let n of t.devices) e[n.status ?? "offline"]++;
			return e;
		}), x = i(() => a.filter.search.toLowerCase().trim()), w = i(() => p.value.map((e) => ({
			...e,
			devices: e.devices.filter((e) => m.value && e.status !== m.value ? !1 : x.value ? (e.hostname ?? "").toLowerCase().includes(x.value) || (e.ip ?? "").includes(x.value) : !0)
		})).filter((e) => e.devices.length)), D = i(() => w.value.reduce((e, t) => e + t.devices.length, 0)), O = i(() => p.value.reduce((e, t) => e + t.devices.length, 0)), k = i(() => p.value.some((e) => e.criticalCount) ? "critical" : p.value.some((e) => e.warningCount) ? "warning" : p.value.some((e) => e.offlineCount) ? "offline" : "");
		function A(e) {
			return o.getMappingByDeviceId(e)?.operatorState?.assignedTo;
		}
		function j(e) {
			a.select({
				type: "device",
				id: e
			}), u(e);
		}
		function M(e) {
			e.spaceId !== "__ungrouped__" && (a.select({
				type: "space",
				id: e.spaceId
			}), f(e.spaceId));
		}
		return (t, n) => (b(), c("aside", {
			class: "alert-panel",
			style: _(v.value),
			"aria-label": "Alerts"
		}, [
			l("div", Nu, [
				l("div", Pu, [
					n[2] ||= l("span", { class: "ap-title" }, "Alerts", -1),
					l("span", { class: g(["ap-count", k.value]) }, T(O.value), 3),
					l("button", {
						class: "ap-close",
						title: "Close",
						"aria-label": "Close alerts",
						onClick: n[0] ||= (e) => E(a).closeLeftDock()
					}, " × ")
				]),
				l("div", Fu, [l("button", {
					"aria-pressed": m.value === null,
					onClick: n[1] ||= (e) => m.value = null
				}, " All ", 8, Iu), (b(), c(e, null, C(h, (e) => l("button", {
					key: e,
					class: g(e),
					"aria-pressed": m.value === e,
					onClick: (t) => m.value = e
				}, [
					l("span", Ru, T(E(Bn)[e]), 1),
					d(" " + T(E(zn)[e]) + " ", 1),
					l("b", null, T(y.value[e]), 1)
				], 10, Lu)), 64))]),
				l("p", zu, " All sites · " + T(D.value) + " devices · highest severity first ", 1)
			]),
			w.value.length ? s("", !0) : (b(), c("div", Bu, T(x.value ? `No alerts match "${E(a).filter.search}"` : m.value ? "No " + E(zn)[m.value].toLowerCase() + " alerts" : "No active alerts"), 1)),
			(b(!0), c(e, null, C(w.value, (t) => (b(), c("div", {
				key: t.spaceId,
				class: "ap-group"
			}, [l("button", {
				class: "ap-group-header",
				title: t.spaceName,
				onClick: (e) => M(t)
			}, [l("span", Hu, T(t.spaceName), 1), l("span", Uu, [d(T(t.devices.length) + " devices ", 1), n[3] ||= l("span", { "aria-hidden": "true" }, "↗", -1)])], 8, Vu), l("div", Wu, [(b(!0), c(e, null, C(t.devices, (e) => (b(), c("button", {
				key: e.id,
				class: g(["ap-device", [e.status, { selected: E(a).selectedDeviceId === e.id }]]),
				"aria-pressed": E(a).selectedDeviceId === e.id,
				title: [
					e.hostname,
					e.ip,
					E(zn)[e.status ?? "unknown"]
				].filter(Boolean).join(" · "),
				onClick: (t) => j(e.id)
			}, [
				l("span", Ku, T(E(Bn)[e.status ?? "unknown"]), 1),
				l("span", qu, [l("span", Ju, T(e.hostname ?? e.ip ?? e.id), 1), l("span", Yu, [d(T(e.ip || "No IP address"), 1), A(e.id) ? (b(), c("span", Xu, " · " + T(A(e.id)), 1)) : s("", !0)])]),
				l("span", Zu, T(E(zn)[e.status ?? "unknown"]), 1)
			], 10, Gu))), 128))])]))), 128))
		], 4));
	}
}), [["__scopeId", "data-v-d77113eb"]]), $u = { class: "ct-panel" }, ed = { class: "ct-head" }, td = {
	key: 0,
	class: "ct-mode-notice"
}, nd = { class: "ct-list" }, rd = { class: "ct-name" }, id = {
	key: 0,
	class: "ct-override-tag"
}, ad = ["onClick"], od = ["onClick"], sd = { class: "ct-section-label ct-section-label--new" }, cd = {
	key: 1,
	class: "ct-empty-sm"
}, ld = { class: "ct-list" }, ud = { class: "ct-name" }, dd = { class: "ct-shape-tag" }, fd = ["onClick"], pd = ["onClick"], md = {
	key: 0,
	class: "ct-form"
}, hd = { class: "ct-form-title" }, gd = { class: "ct-label" }, _d = { class: "ct-label" }, vd = { class: "ct-label" }, yd = { class: "ct-swatches" }, bd = ["onClick"], xd = { class: "ct-label" }, Sd = { class: "ct-radios" }, Cd = ["value"], wd = { class: "ct-label" }, Td = { class: "ct-val" }, Ed = { class: "ct-label" }, Dd = { class: "ct-val" }, Od = {
	key: 1,
	class: "ct-label"
}, kd = { class: "ct-val" }, Ad = { class: "ct-label" }, jd = { class: "ct-model-row" }, Md = {
	key: 0,
	class: "ct-model-name pending"
}, Nd = {
	key: 1,
	class: "ct-model-name stored"
}, Pd = {
	key: 2,
	class: "ct-model-hint"
}, Fd = {
	key: 0,
	class: "ct-model-error"
}, Id = {
	key: 1,
	class: "ct-model-hint"
}, Ld = { class: "ct-form-btns" }, Rd = ["disabled"], zd = ["disabled"], Bd = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "CustomTypePanel",
	emits: ["types-changed"],
	setup(t, { emit: r }) {
		let a = J(), o = Hc(), { rebuildAll: u } = iu(), p = r, m = [
			"#3b82f6",
			"#10b981",
			"#f59e0b",
			"#ef4444",
			"#8b5cf6",
			"#06b6d4",
			"#f97316",
			"#84cc16"
		], h = [
			"box",
			"cylinder",
			"sphere",
			"octahedron"
		], v = [
			{
				id: "server",
				label: "Server",
				abbr: "SRV",
				color: "#3b82f6",
				shape: "box",
				w: .8,
				h: .12,
				d: .5
			},
			{
				id: "switch",
				label: "Switch",
				abbr: "SW",
				color: "#10b981",
				shape: "box",
				w: 1,
				h: .06,
				d: .5
			},
			{
				id: "router",
				label: "Router",
				abbr: "RTR",
				color: "#f59e0b",
				shape: "cylinder",
				w: .56,
				h: .12,
				d: .56
			},
			{
				id: "firewall",
				label: "Firewall",
				abbr: "FW",
				color: "#ef4444",
				shape: "box",
				w: .8,
				h: .2,
				d: .5
			},
			{
				id: "database",
				label: "Database",
				abbr: "DB",
				color: "#8b5cf6",
				shape: "cylinder",
				w: .56,
				h: .5,
				d: .56
			},
			{
				id: "storage",
				label: "Storage",
				abbr: "STG",
				color: "#06b6d4",
				shape: "box",
				w: 1.2,
				h: .3,
				d: .55
			},
			{
				id: "vm",
				label: "VM",
				abbr: "VM",
				color: "#64748b",
				shape: "box",
				w: .6,
				h: .07,
				d: .38
			},
			{
				id: "container",
				label: "Container",
				abbr: "CTR",
				color: "#475569",
				shape: "box",
				w: .45,
				h: .06,
				d: .3
			},
			{
				id: "load_balancer",
				label: "Load Balancer",
				abbr: "LB",
				color: "#f97316",
				shape: "octahedron",
				w: .48,
				h: .48,
				d: .48
			},
			{
				id: "access_point",
				label: "Access Point",
				abbr: "AP",
				color: "#84cc16",
				shape: "sphere",
				w: .4,
				h: .4,
				d: .4
			},
			{
				id: "cloud_service",
				label: "Cloud",
				abbr: "CLD",
				color: "#a78bfa",
				shape: "sphere",
				w: .6,
				h: .6,
				d: .6
			},
			{
				id: "unknown",
				label: "Unknown",
				abbr: "UNK",
				color: "#6b7280",
				shape: "box",
				w: .6,
				h: .1,
				d: .4
			}
		], y = new Set(v.map((e) => e.id)), x = i(() => [...o.customTypes.values()].filter((e) => !y.has(e.id)));
		function w(e) {
			return o.customTypes.has(e);
		}
		function D(e) {
			return o.customTypes.get(e)?.color ?? Fn[e] ?? "#6b7280";
		}
		function k(e) {
			return o.customTypes.get(e)?.abbr ?? Ln[e] ?? e.slice(0, 4).toUpperCase();
		}
		let j = S(!1), P = S(!0), F = S("custom"), I = S(!1), L = S({
			id: "",
			label: "",
			abbr: "",
			color: m[0],
			shape: "box",
			w: .6,
			h: .1,
			d: .4
		}), R = S(null), z = S(null), B = S(""), V = S(""), H = S(!1);
		function U() {
			z.value = null, B.value = "", V.value = "", H.value = !1, R.value && (R.value.value = "");
		}
		function ee() {
			a.mode === "edit" && (F.value = "custom", P.value = !0, L.value = {
				id: `ct-${Date.now()}`,
				label: "",
				abbr: "",
				color: m[0],
				shape: "box",
				w: .6,
				h: .1,
				d: .4
			}, U(), j.value = !0);
		}
		function te(e) {
			a.mode === "edit" && (F.value = "custom", P.value = !1, L.value = { ...e }, U(), j.value = !0);
		}
		function ne(e) {
			if (a.mode !== "edit") return;
			F.value = "override", P.value = !1;
			let t = o.customTypes.get(e.id);
			L.value = t ? { ...t } : { ...e }, U(), j.value = !0;
		}
		function re() {
			U(), j.value = !1;
		}
		function W() {
			P.value && (L.value.abbr = L.value.label.slice(0, 4).toUpperCase().replace(/\s+/g, ""));
		}
		function ie(e) {
			let t = e.target.files?.[0];
			if (!t) return;
			if (t.size > 10 * 1024 * 1024) {
				V.value = `File too large (${(t.size / 1024 / 1024).toFixed(1)} MB — max 10 MB)`;
				return;
			}
			V.value = "", H.value = !0;
			let n = new FileReader();
			n.onload = (e) => {
				z.value = e.target?.result, B.value = t.name, H.value = !1;
			}, n.onerror = () => {
				V.value = "Failed to read file", H.value = !1;
			}, n.readAsArrayBuffer(t);
		}
		function ae() {
			L.value.hasModel = !1, U();
		}
		async function oe() {
			if (!(F.value === "custom" && (!L.value.label.trim() || !L.value.abbr.trim()))) {
				I.value = !0;
				try {
					z.value ? (await rr(L.value.id, z.value), L.value.hasModel = !0) : L.value.hasModel || await ar(L.value.id).catch(() => {}), o.upsert({ ...L.value }), Wn(o.customTypes), gi(o.customTypes), L.value.hasModel && await vi(o.customTypes), j.value = !1, U(), await u(), p("types-changed");
				} finally {
					I.value = !1;
				}
			}
		}
		async function se(e) {
			confirm("Remove this custom type?") && (o.remove(e), await ar(e).catch(() => {}), Wn(o.customTypes), gi(o.customTypes), await u(), p("types-changed"));
		}
		async function ce(e) {
			confirm("Reset to default shape?") && (o.remove(e), await ar(e).catch(() => {}), Wn(o.customTypes), gi(o.customTypes), await u(), p("types-changed"));
		}
		return (t, r) => (b(), c("aside", $u, [
			l("div", ed, [r[8] ||= l("span", { class: "ct-title" }, "Device Types", -1), l("button", {
				class: "ct-close",
				title: "Close",
				onClick: r[0] ||= (e) => E(a).closeLeftDock()
			}, " ✕ ")]),
			E(a).mode === "edit" ? s("", !0) : (b(), c("div", td, " Switch to Edit mode to customize types. ")),
			r[18] ||= l("div", { class: "ct-section-label" }, "Built-in Types", -1),
			r[19] ||= l("div", { class: "ct-section-hint" }, " Override the shape or model for all devices of a type. ", -1),
			l("div", nd, [(b(), c(e, null, C(v, (t) => l("div", {
				key: t.id,
				class: "ct-row"
			}, [
				l("span", {
					class: "ct-dot",
					style: _({ background: D(t.id) })
				}, null, 4),
				l("span", {
					class: "ct-abbr-badge",
					style: _({
						borderColor: D(t.id),
						color: D(t.id)
					})
				}, T(k(t.id)), 5),
				l("span", rd, T(t.label), 1),
				w(t.id) ? (b(), c("span", id, "custom")) : s("", !0),
				E(a).mode === "edit" ? (b(), c(e, { key: 1 }, [l("button", {
					class: "ct-btn",
					onClick: (e) => ne(t)
				}, T(w(t.id) ? "Edit" : "Override"), 9, ad), w(t.id) ? (b(), c("button", {
					key: 0,
					class: "ct-btn del",
					onClick: (e) => ce(t.id)
				}, " Reset ", 8, od)) : s("", !0)], 64)) : s("", !0)
			])), 64))]),
			l("div", sd, [r[9] ||= d(" New Types ", -1), E(a).mode === "edit" ? (b(), c("button", {
				key: 0,
				class: "ct-add-inline",
				onClick: ee
			}, " + Add ")) : s("", !0)]),
			r[20] ||= l("div", { class: "ct-section-hint" }, " New types appear in the device's \"Visual Shape\" selector. ", -1),
			x.value.length ? s("", !0) : (b(), c("div", cd, "No custom types yet")),
			l("div", ld, [(b(!0), c(e, null, C(x.value, (t) => (b(), c("div", {
				key: t.id,
				class: "ct-row"
			}, [
				l("span", {
					class: "ct-dot",
					style: _({ background: t.color })
				}, null, 4),
				l("span", {
					class: "ct-abbr-badge",
					style: _({
						borderColor: t.color,
						color: t.color
					})
				}, T(t.abbr), 5),
				l("span", ud, T(t.label), 1),
				l("span", dd, T(t.hasModel ? "3D" : t.shape), 1),
				E(a).mode === "edit" ? (b(), c(e, { key: 0 }, [l("button", {
					class: "ct-btn",
					onClick: (e) => te(t)
				}, "Edit", 8, fd), l("button", {
					class: "ct-btn del",
					onClick: (e) => se(t.id)
				}, "Del", 8, pd)], 64)) : s("", !0)
			]))), 128))]),
			f(n, { name: "ct-slide" }, {
				default: M(() => [j.value ? (b(), c("div", md, [
					l("div", hd, T(F.value === "override" ? `Override: ${L.value.label}` : P.value ? "New Type" : "Edit Type"), 1),
					F.value === "override" ? s("", !0) : (b(), c(e, { key: 0 }, [l("label", gd, [r[10] ||= d("Name ", -1), N(l("input", {
						"onUpdate:modelValue": r[1] ||= (e) => L.value.label = e,
						class: "ct-input",
						placeholder: "Core Router",
						onInput: W
					}, null, 544), [[A, L.value.label]])]), l("label", _d, [r[11] ||= d("Abbr (≤4) ", -1), N(l("input", {
						"onUpdate:modelValue": r[2] ||= (e) => L.value.abbr = e,
						class: "ct-input ct-input-sm",
						maxlength: "4",
						placeholder: "CR"
					}, null, 512), [[A, L.value.abbr]])])], 64)),
					l("div", vd, [r[12] ||= d(" Color ", -1), l("div", yd, [(b(), c(e, null, C(m, (e) => l("button", {
						key: e,
						class: g(["ct-swatch", { active: L.value.color === e }]),
						style: _({ background: e }),
						onClick: (t) => L.value.color = e
					}, null, 14, bd)), 64))])]),
					l("div", xd, [r[13] ||= d(" Shape ", -1), l("div", Sd, [(b(), c(e, null, C(h, (e) => l("label", {
						key: e,
						class: "ct-radio"
					}, [N(l("input", {
						"onUpdate:modelValue": r[3] ||= (e) => L.value.shape = e,
						type: "radio",
						value: e
					}, null, 8, Cd), [[O, L.value.shape]]), d(" " + T(e), 1)])), 64))])]),
					l("label", wd, [
						r[14] ||= d("Width ", -1),
						l("span", Td, T(L.value.w.toFixed(1)), 1),
						N(l("input", {
							"onUpdate:modelValue": r[4] ||= (e) => L.value.w = e,
							type: "range",
							min: "0.3",
							max: "2.0",
							step: "0.1",
							class: "ct-slider"
						}, null, 512), [[
							A,
							L.value.w,
							void 0,
							{ number: !0 }
						]])
					]),
					l("label", Ed, [
						r[15] ||= d("Height ", -1),
						l("span", Dd, T(L.value.h.toFixed(2)), 1),
						N(l("input", {
							"onUpdate:modelValue": r[5] ||= (e) => L.value.h = e,
							type: "range",
							min: "0.05",
							max: "2.0",
							step: "0.05",
							class: "ct-slider"
						}, null, 512), [[
							A,
							L.value.h,
							void 0,
							{ number: !0 }
						]])
					]),
					L.value.shape === "box" ? (b(), c("label", Od, [
						r[16] ||= d("Depth ", -1),
						l("span", kd, T(L.value.d.toFixed(1)), 1),
						N(l("input", {
							"onUpdate:modelValue": r[6] ||= (e) => L.value.d = e,
							type: "range",
							min: "0.3",
							max: "2.0",
							step: "0.1",
							class: "ct-slider"
						}, null, 512), [[
							A,
							L.value.d,
							void 0,
							{ number: !0 }
						]])
					])) : s("", !0),
					l("div", Ad, [
						r[17] ||= d(" 3D Model (.glb / .gltf) ", -1),
						l("div", jd, [
							B.value ? (b(), c("span", Md, T(B.value), 1)) : L.value.hasModel ? (b(), c("span", Nd, "Model stored")) : (b(), c("span", Pd, "Using geometric shape above")),
							l("input", {
								ref_key: "fileInputEl",
								ref: R,
								type: "file",
								accept: ".glb,.gltf",
								style: { display: "none" },
								onChange: ie
							}, null, 544),
							l("button", {
								class: "ct-model-btn",
								onClick: r[7] ||= (e) => R.value?.click()
							}, T(L.value.hasModel || B.value ? "Replace" : "Import"), 1),
							L.value.hasModel || B.value ? (b(), c("button", {
								key: 3,
								class: "ct-model-btn ct-model-rm",
								onClick: ae
							}, " Remove ")) : s("", !0)
						]),
						V.value ? (b(), c("div", Fd, T(V.value), 1)) : s("", !0),
						H.value ? (b(), c("div", Id, "Loading model…")) : s("", !0)
					]),
					l("div", Ld, [l("button", {
						class: "ct-save",
						disabled: I.value,
						onClick: oe
					}, T(I.value ? "Saving…" : "Save"), 9, Rd), l("button", {
						class: "ct-cancel",
						disabled: I.value,
						onClick: re
					}, " Cancel ", 8, zd)])
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-50eb05a6"]]), Vd = { class: "bg-panel" }, Hd = { class: "bg-head" }, Ud = {
	key: 0,
	class: "bg-mode-notice"
}, Wd = { class: "bg-toggle-row" }, Gd = ["checked"], Kd = { class: "bg-toggle-hint" }, qd = {
	key: 0,
	class: "bg-empty-sm"
}, Jd = { class: "bg-list" }, Yd = { class: "bg-kind-tag" }, Xd = ["onClick"], Zd = ["onClick"], Qd = ["onClick"], $d = {
	key: 1,
	class: "bg-form"
}, ef = { class: "bg-form-title" }, tf = { class: "bg-grid3" }, nf = { class: "bg-label" }, rf = { class: "bg-label" }, af = { class: "bg-label" }, of = { class: "bg-label" }, sf = {
	key: 0,
	class: "bg-label"
}, cf = {
	key: 1,
	class: "bg-grid2"
}, lf = { class: "bg-label" }, uf = { class: "bg-label" }, df = { class: "bg-label" }, ff = { class: "bg-val" }, pf = {
	key: 0,
	class: "bg-form"
}, mf = { class: "bg-label" }, hf = { class: "bg-label" }, gf = { class: "bg-file-row" }, _f = {
	key: 0,
	class: "bg-file-name"
}, vf = {
	key: 1,
	class: "bg-file-hint"
}, yf = {
	key: 0,
	class: "bg-file-error"
}, bf = { class: "bg-form-btns" }, xf = ["disabled"], Sf = ["disabled"], Cf = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "BackgroundPanel",
	setup(t) {
		let r = J(), a = q(), { rebuildAll: o } = iu(), u = i(() => a.scopedBackgroundObjects(r.activeRootSpaceId)), p = S(!1), m = S(""), h = S(null), _ = S(null), v = S(""), y = S("image"), x = S(""), w = S(!1), D = i(() => m.value.trim() && _.value);
		function O() {
			p.value = !0, m.value = "", _.value = null, v.value = "", x.value = "", L.value = null;
		}
		function k() {
			p.value = !1, h.value && (h.value.value = "");
		}
		function P(e) {
			let t = e.target.files?.[0];
			if (!t) return;
			if (t.size > 10 * 1024 * 1024) {
				x.value = `File too large (${(t.size / 1024 / 1024).toFixed(1)} MB — max 10 MB)`;
				return;
			}
			y.value = /\.(glb|gltf)$/i.test(t.name) ? "model" : "image", x.value = "";
			let n = new FileReader();
			n.onload = (e) => {
				_.value = e.target?.result, v.value = t.name;
			}, n.onerror = () => {
				x.value = "Failed to read file";
			}, n.readAsArrayBuffer(t);
		}
		async function F() {
			if (!D.value || !_.value) return;
			let e = r.activeRootSpaceId;
			if (e) {
				w.value = !0;
				try {
					let t = `bg-${Date.now()}`;
					await wa(t, _.value);
					let n = a.spaces.get(e), r = {
						id: t,
						name: m.value.trim(),
						kind: y.value,
						spaceId: e,
						assetId: t,
						position: {
							x: 0,
							y: y.value === "image" ? -.18 : 0,
							z: 0
						},
						rotationY: 0,
						scale: 1,
						width: n?.size?.width ?? 10,
						depth: n?.size?.depth ?? 10,
						opacity: .3
					};
					a.addBackgroundObject(r), a.logChange("background.create", `Background added: ${r.name}`), p.value = !1, await o();
				} finally {
					w.value = !1;
				}
			}
		}
		async function I(e) {
			confirm("Remove this background object?") && (a.removeBackgroundObject(e), await Ea(e).catch(() => {}), L.value === e && (L.value = null), a.logChange("background.delete", `Background removed: ${e}`), await o());
		}
		let L = S(null), R = i(() => L.value ? a.backgroundObjects.get(L.value) ?? null : null), z = S(0), B = S(0), V = S(0), H = S(0), U = S(1), ee = S(10), te = S(10), ne = S(.3);
		j(R, (e) => {
			e && (z.value = e.position.x, B.value = e.position.y, V.value = e.position.z, H.value = e.rotationY ?? 0, U.value = e.scale ?? 1, ee.value = e.width ?? 10, te.value = e.depth ?? 10, ne.value = e.opacity ?? .3);
		}, { immediate: !0 });
		function re(e) {
			L.value = L.value === e.id ? null : e.id, p.value = !1, L.value && r.backgroundEditActive && r.select({
				type: "background",
				id: e.id
			});
		}
		async function W(e, t) {
			L.value && (a.updateBackgroundObject(L.value, { [e]: t }), await o());
		}
		async function ie() {
			L.value && (a.updateBackgroundObject(L.value, { position: {
				x: z.value,
				y: B.value,
				z: V.value
			} }), await o());
		}
		return (t, i) => (b(), c("aside", Vd, [l("div", Hd, [i[17] ||= l("span", { class: "bg-title" }, "Background", -1), l("button", {
			class: "bg-close",
			title: "Close",
			onClick: i[0] ||= (e) => E(r).closeLeftDock()
		}, " ✕ ")]), E(r).mode === "edit" ? (b(), c(e, { key: 1 }, [
			l("label", Wd, [
				l("input", {
					type: "checkbox",
					checked: E(r).backgroundEditActive,
					onChange: i[1] ||= (e) => E(r).toggleBackgroundEdit()
				}, null, 40, Gd),
				i[18] ||= l("span", null, "Edit positions", -1),
				l("span", Kd, T(E(r).backgroundEditActive ? "Click a background object in the scene to move it" : "Backgrounds are dimmed and click-through"), 1)
			]),
			l("div", { class: "bg-section-label" }, [i[19] ||= d(" This floor ", -1), l("button", {
				class: "bg-add-inline",
				onClick: O
			}, "+ Add")]),
			u.value.length ? s("", !0) : (b(), c("div", qd, " No background objects yet ")),
			l("div", Jd, [(b(!0), c(e, null, C(u.value, (e) => (b(), c("div", {
				key: e.id,
				class: g(["bg-row", { active: L.value === e.id }])
			}, [
				l("span", Yd, T(e.kind === "image" ? "IMG" : "3D"), 1),
				l("span", {
					class: "bg-name",
					onClick: (t) => re(e)
				}, T(e.name), 9, Xd),
				l("button", {
					class: "bg-btn",
					onClick: (t) => re(e)
				}, T(L.value === e.id ? "Close" : "Edit"), 9, Zd),
				l("button", {
					class: "bg-btn del",
					onClick: (t) => I(e.id)
				}, "Del", 8, Qd)
			], 2))), 128))]),
			R.value ? (b(), c("div", $d, [
				l("div", ef, T(R.value.name), 1),
				l("div", tf, [
					l("label", nf, [i[20] ||= d("X ", -1), N(l("input", {
						"onUpdate:modelValue": i[2] ||= (e) => z.value = e,
						type: "number",
						step: "0.5",
						class: "bg-input",
						onChange: ie
					}, null, 544), [[
						A,
						z.value,
						void 0,
						{ number: !0 }
					]])]),
					l("label", rf, [i[21] ||= d("Y ", -1), N(l("input", {
						"onUpdate:modelValue": i[3] ||= (e) => B.value = e,
						type: "number",
						step: "0.1",
						class: "bg-input",
						onChange: ie
					}, null, 544), [[
						A,
						B.value,
						void 0,
						{ number: !0 }
					]])]),
					l("label", af, [i[22] ||= d("Z ", -1), N(l("input", {
						"onUpdate:modelValue": i[4] ||= (e) => V.value = e,
						type: "number",
						step: "0.5",
						class: "bg-input",
						onChange: ie
					}, null, 544), [[
						A,
						V.value,
						void 0,
						{ number: !0 }
					]])])
				]),
				l("label", of, [i[23] ||= d("Rotation Y (°) ", -1), N(l("input", {
					"onUpdate:modelValue": i[5] ||= (e) => H.value = e,
					type: "number",
					step: "5",
					class: "bg-input",
					onChange: i[6] ||= (e) => W("rotationY", H.value)
				}, null, 544), [[
					A,
					H.value,
					void 0,
					{ number: !0 }
				]])]),
				R.value.kind === "model" ? (b(), c("label", sf, [i[24] ||= d("Scale ", -1), N(l("input", {
					"onUpdate:modelValue": i[7] ||= (e) => U.value = e,
					type: "number",
					step: "0.1",
					min: "0.01",
					class: "bg-input",
					onChange: i[8] ||= (e) => W("scale", U.value)
				}, null, 544), [[
					A,
					U.value,
					void 0,
					{ number: !0 }
				]])])) : (b(), c("div", cf, [l("label", lf, [i[25] ||= d("Width ", -1), N(l("input", {
					"onUpdate:modelValue": i[9] ||= (e) => ee.value = e,
					type: "number",
					step: "0.5",
					min: "0.1",
					class: "bg-input",
					onChange: i[10] ||= (e) => W("width", ee.value)
				}, null, 544), [[
					A,
					ee.value,
					void 0,
					{ number: !0 }
				]])]), l("label", uf, [i[26] ||= d("Depth ", -1), N(l("input", {
					"onUpdate:modelValue": i[11] ||= (e) => te.value = e,
					type: "number",
					step: "0.5",
					min: "0.1",
					class: "bg-input",
					onChange: i[12] ||= (e) => W("depth", te.value)
				}, null, 544), [[
					A,
					te.value,
					void 0,
					{ number: !0 }
				]])])])),
				l("label", df, [
					i[27] ||= d("Opacity (dashboard view) ", -1),
					l("span", ff, T(ne.value.toFixed(2)), 1),
					N(l("input", {
						"onUpdate:modelValue": i[13] ||= (e) => ne.value = e,
						type: "range",
						min: "0.05",
						max: "0.9",
						step: "0.05",
						class: "bg-slider",
						onChange: i[14] ||= (e) => W("opacity", ne.value)
					}, null, 544), [[
						A,
						ne.value,
						void 0,
						{ number: !0 }
					]])
				])
			])) : s("", !0),
			f(n, { name: "bg-slide" }, {
				default: M(() => [p.value ? (b(), c("div", pf, [
					i[30] ||= l("div", { class: "bg-form-title" }, "New Background", -1),
					l("label", mf, [i[28] ||= d("Name ", -1), N(l("input", {
						"onUpdate:modelValue": i[15] ||= (e) => m.value = e,
						class: "bg-input",
						placeholder: "1F floor plan"
					}, null, 512), [[A, m.value]])]),
					l("label", hf, [
						i[29] ||= d("File (image or .glb/.gltf) ", -1),
						l("input", {
							ref_key: "fileInputEl",
							ref: h,
							type: "file",
							accept: "image/*,.glb,.gltf",
							style: { display: "none" },
							onChange: P
						}, null, 544),
						l("div", gf, [v.value ? (b(), c("span", _f, T(v.value), 1)) : (b(), c("span", vf, "No file chosen")), l("button", {
							class: "bg-model-btn",
							onClick: i[16] ||= (e) => h.value?.click()
						}, " Choose ")]),
						x.value ? (b(), c("div", yf, T(x.value), 1)) : s("", !0)
					]),
					l("div", bf, [l("button", {
						class: "bg-save",
						disabled: !D.value || w.value,
						onClick: F
					}, T(w.value ? "Adding…" : "Add"), 9, xf), l("button", {
						class: "bg-cancel",
						disabled: w.value,
						onClick: k
					}, " Cancel ", 8, Sf)])
				])) : s("", !0)]),
				_: 1
			})
		], 64)) : (b(), c("div", Ud, " Switch to Edit mode to manage backgrounds. "))]));
	}
}), [["__scopeId", "data-v-bb9ede0e"]]);
//#endregion
//#region src/composables/useDeviceTypeHelpers.ts
function wf() {
	let e = Hc();
	function t(t) {
		let n = t ?? "unknown";
		return e.customTypes.get(n)?.color ?? Fn[n] ?? "#6b7280";
	}
	function n(t) {
		let n = t ?? "unknown";
		return e.customTypes.get(n)?.abbr ?? Ln[n] ?? n.slice(0, 4).toUpperCase();
	}
	function r(t) {
		let n = t ?? "unknown";
		return e.customTypes.get(n)?.label ?? Rn[n] ?? n;
	}
	return {
		typeColor: t,
		typeAbbr: n,
		typeLabel: r,
		allTypes: i(() => {
			let t = Object.keys(Rn).map((e) => ({
				id: e,
				label: Rn[e],
				color: Fn[e],
				custom: !1
			})), n = [...e.customTypes.values()].map((e) => ({
				id: e.id,
				label: e.label,
				color: e.color,
				custom: !0
			}));
			return [...t, ...n];
		})
	};
}
//#endregion
//#region src/components/layout/RackServerListPanel.vue?vue&type=script&setup=true&lang.ts
var Tf = {
	key: 0,
	class: "panel"
}, Ef = { class: "panel-head" }, Df = { class: "rack-name" }, Of = { class: "summary" }, kf = { class: "chip c" }, Af = { class: "chip w" }, jf = { class: "chip n" }, Mf = { class: "server-list" }, Nf = ["onClick", "onMouseenter"], Pf = { class: "srv-info" }, Ff = { class: "srv-name" }, If = { class: "srv-ip" }, Lf = {
	key: 0,
	class: "srv-metrics"
}, Rf = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "RackServerListPanel",
	setup(t) {
		let n = q(), r = J(), { typeColor: a, typeAbbr: o } = wf(), u = i(() => r.selectedRackForList ? n.spaces.get(r.selectedRackForList) ?? null : null), d = i(() => r.selectedRackForList ? n.devicesBySpace.get(r.selectedRackForList) ?? [] : []), f = i(() => [...d.value].sort((e, t) => {
			let n = {
				critical: 0,
				warning: 1,
				offline: 2,
				normal: 3,
				unknown: 4,
				maintenance: 5
			};
			return (n[e.status ?? "unknown"] ?? 9) - (n[t.status ?? "unknown"] ?? 9);
		})), p = i(() => d.value.filter((e) => e.status === "critical").length), m = i(() => d.value.filter((e) => e.status === "warning").length), h = i(() => d.value.filter((e) => e.status === "normal").length);
		function v(e) {
			r.select({
				type: "device",
				id: e
			});
		}
		function y() {
			r.closeLeftDock(), r.select(null);
		}
		return (t, n) => u.value ? (b(), c("aside", Tf, [
			l("div", Ef, [
				l("span", Df, T(u.value.name), 1),
				l("div", Of, [
					l("span", kf, "C " + T(p.value), 1),
					l("span", Af, "W " + T(m.value), 1),
					l("span", jf, "N " + T(h.value), 1)
				]),
				l("button", {
					class: "close-btn",
					title: "Close",
					onClick: y
				}, "✕")
			]),
			n[1] ||= l("div", { class: "hint" }, " Click a device to open details · hover to highlight in 3D. ", -1),
			l("div", Mf, [(b(!0), c(e, null, C(f.value, (e) => (b(), c("div", {
				key: e.id,
				class: g(["srv-row", [e.status, { active: E(r).selectedDeviceId === e.id }]]),
				onClick: (t) => v(e.id),
				onMouseenter: (t) => E(r).hoveredId = e.id,
				onMouseleave: n[0] ||= (e) => E(r).hoveredId = null
			}, [
				l("span", {
					class: "dot",
					style: _({ background: E(Mn)[e.status ?? "unknown"] })
				}, null, 4),
				l("span", {
					class: "type-tag",
					style: _({
						color: E(a)(e.normalizedType),
						borderColor: E(a)(e.normalizedType)
					})
				}, T(E(o)(e.normalizedType)), 5),
				l("div", Pf, [l("div", Ff, T(e.hostname ?? e.id), 1), l("div", If, T(e.ip ?? "—"), 1)]),
				e.metrics ? (b(), c("div", Lf, [l("span", { class: g({ hot: (e.metrics.cpu ?? 0) > 85 }) }, "C" + T((e.metrics.cpu ?? 0).toFixed(0)) + "%", 3), l("span", { class: g({ hot: (e.metrics.memory ?? 0) > 85 }) }, "M" + T((e.metrics.memory ?? 0).toFixed(0)) + "%", 3)])) : s("", !0)
			], 42, Nf))), 128))])
		])) : s("", !0);
	}
}), [["__scopeId", "data-v-87a67249"]]), zf = {
	key: 1,
	class: "arrow-spacer"
}, Bf = { class: "kind-tag" }, Vf = { class: "node-name" }, Hf = {
	key: 3,
	class: "dev-count"
}, Uf = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "SpaceTreeNode",
	props: {
		space: {},
		depth: {},
		openNodes: {}
	},
	emits: [
		"toggle",
		"focus",
		"edit",
		"archive",
		"add-child"
	],
	setup(t) {
		let n = t, r = q(), a = J(), u = {
			building: "BLDG",
			floor: "FLR",
			site: "SITE",
			zone: "ZONE",
			rack: "RACK",
			custom_group: "GRP",
			security_zone: "SEC",
			service: "SVC",
			external: "EXT",
			cloud: "CLD"
		}, d = {
			building: "floor",
			floor: "zone",
			site: "zone",
			zone: "rack"
		}, f = i(() => r.childSpaces(n.space.id)), p = i(() => n.openNodes.has(n.space.id)), m = i(() => u[n.space.type] ?? n.space.type.slice(0, 4).toUpperCase()), h = i(() => d[n.space.type] ?? "zone"), v = i(() => r.scopedDevices(n.space.id).length), y = i(() => r.scopedDevices(n.space.id).some((e) => e.status === "critical" || e.status === "warning")), x = i(() => {
			let e = r.scopedDevices(n.space.id);
			return e.some((e) => e.status === "critical") ? "critical" : e.some((e) => e.status === "warning") ? "warning" : "normal";
		}), S = i(() => x.value === "critical" ? "CRIT" : x.value === "warning" ? "WARN" : "OK");
		return (n, r) => {
			let i = w("SpaceTreeNode", !0);
			return b(), c("div", null, [l("div", {
				class: g(["tree-row", { "has-issue": t.depth > 0 && y.value }]),
				style: _({ paddingLeft: `${6 + t.depth * 12}px` }),
				onClick: r[3] ||= (e) => n.$emit("focus", t.space)
			}, [
				f.value.length ? (b(), c("span", {
					key: 0,
					class: "arrow",
					onClick: r[0] ||= F((e) => n.$emit("toggle", t.space.id), ["stop"])
				}, T(p.value ? "▾" : "▸"), 1)) : (b(), c("span", zf)),
				l("span", Bf, T(m.value), 1),
				l("span", Vf, T(t.space.name), 1),
				t.depth === 0 ? (b(), c("span", {
					key: 2,
					class: g(["node-badge", x.value])
				}, T(S.value), 3)) : (b(), c("span", Hf, T(v.value), 1)),
				E(a).mode === "edit" ? (b(), c("button", {
					key: 4,
					class: "row-btn",
					title: "Rename",
					onClick: r[1] ||= F((e) => n.$emit("edit", t.space), ["stop"])
				}, " Edit ")) : s("", !0),
				E(a).mode === "edit" ? (b(), c("button", {
					key: 5,
					class: "row-btn del",
					title: "Archive",
					onClick: r[2] ||= F((e) => n.$emit("archive", t.space.id), ["stop"])
				}, " Del ")) : s("", !0)
			], 6), p.value ? (b(), c(e, { key: 0 }, [(b(!0), c(e, null, C(f.value, (e) => (b(), o(i, {
				key: e.id,
				space: e,
				depth: t.depth + 1,
				"open-nodes": t.openNodes,
				onToggle: r[4] ||= (e) => n.$emit("toggle", e),
				onFocus: r[5] ||= (e) => n.$emit("focus", e),
				onEdit: r[6] ||= (e) => n.$emit("edit", e),
				onArchive: r[7] ||= (e) => n.$emit("archive", e),
				onAddChild: r[8] ||= (e, t) => n.$emit("add-child", e, t)
			}, null, 8, [
				"space",
				"depth",
				"open-nodes"
			]))), 128)), E(a).mode === "edit" && t.space.type !== "rack" ? (b(), c("div", {
				key: 0,
				class: "add-child-btn",
				style: _({ paddingLeft: `${32 + t.depth * 12}px` }),
				onClick: r[9] ||= (e) => n.$emit("add-child", t.space.id, h.value)
			}, " + Add " + T(h.value), 5)) : s("", !0)], 64)) : s("", !0)]);
		};
	}
}), [["__scopeId", "data-v-41fb5253"]]), Wf = { class: "panel" }, Gf = { class: "panel-head" }, Kf = { class: "head-actions" }, qf = { class: "tree-body" }, Jf = {
	key: 0,
	class: "site-node"
}, Yf = ["onClick"], Xf = { class: "node-name" }, Zf = ["onClick"], Qf = {
	key: 0,
	class: "add-modal"
}, $f = {
	key: 0,
	class: "add-modal"
}, ep = { class: "add-btns" }, tp = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "SpaceTreePanel",
	setup(t) {
		let r = q(), a = J(), { refreshSpace: u, focusSpace: d } = iu(), p = S(/* @__PURE__ */ new Set()), m = S(!1), h = S(null), g = S("zone"), _ = S("site"), v = S(""), y = S(null), x = S(""), w = i(() => [...r.spaces.values()].filter((e) => [
			"custom_group",
			"security_zone",
			"service",
			"external",
			"cloud"
		].includes(e.type) && !e.archived));
		function D(e) {
			p.value.has(e) ? p.value.delete(e) : p.value.add(e);
		}
		function O(e) {
			a.select({
				type: "space",
				id: e.id
			}), d(e.id);
		}
		function j(e, t) {
			a.mode === "edit" && (h.value = e, g.value = t, _.value = t, v.value = "", m.value = !0);
		}
		function I() {
			if (a.mode !== "edit" || !v.value.trim()) return;
			let e = `space-${Date.now()}`, t = (h.value ? r.spaces.get(h.value) : null)?.position ?? {
				x: 0,
				y: 0,
				z: 0
			};
			r.addSpace({
				id: e,
				name: v.value.trim(),
				kind: [
					"building",
					"floor",
					"site",
					"zone",
					"rack"
				].includes(_.value) ? "physical" : "logical",
				type: _.value,
				parentId: h.value ?? void 0,
				source: "manual",
				position: {
					x: t.x + Math.random() * 10 - 5,
					y: 0,
					z: t.z + Math.random() * 10 - 5
				},
				size: _.value === "rack" ? {
					width: 1,
					height: 3,
					depth: .6
				} : _.value === "zone" ? {
					width: 20,
					height: .1,
					depth: 18
				} : {
					width: 50,
					height: .1,
					depth: 40
				},
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}), r.logChange("space.create", `Space added: ${v.value} (${_.value})`), L();
		}
		function L() {
			m.value = !1, h.value = null, v.value = "";
		}
		function R(e) {
			a.mode === "edit" && (y.value = e, x.value = e.name);
		}
		function z() {
			if (a.mode !== "edit" || !y.value) return;
			let e = y.value.id;
			r.updateSpace(e, { name: x.value }), r.logChange("space.update", `Space renamed: ${x.value}`), u(e), y.value = null;
		}
		function B(e) {
			a.mode === "edit" && confirm("Archive this space?") && (r.archiveSpace(e), u(e), r.logChange("space.archive", `Space archived: ${e}`));
		}
		return (t, i) => (b(), c("aside", Wf, [
			l("div", Gf, [i[7] ||= l("span", null, "Spaces", -1), l("div", Kf, [E(a).mode === "edit" ? (b(), c("button", {
				key: 0,
				class: "text-btn",
				title: "Add space",
				onClick: i[0] ||= (e) => m.value = !0
			}, " Add ")) : s("", !0), l("button", {
				class: "text-btn",
				title: "Close",
				onClick: i[1] ||= (e) => E(a).closeLeftDock()
			}, " Close ")])]),
			l("div", qf, [
				(b(!0), c(e, null, C(E(r).rootSpaces, (e) => (b(), o(Uf, {
					key: e.id,
					space: e,
					depth: 0,
					"open-nodes": p.value,
					onToggle: D,
					onFocus: O,
					onEdit: R,
					onArchive: B,
					onAddChild: j
				}, null, 8, ["space", "open-nodes"]))), 128)),
				w.value.length ? (b(), c("div", Jf, [i[10] ||= l("div", { class: "tree-row site" }, [l("span", { class: "kind-tag" }, "GRP"), l("span", {
					class: "node-name",
					style: { color: "#94a3b8" }
				}, "Logical Groups")], -1), (b(!0), c(e, null, C(w.value, (e) => (b(), c("div", {
					key: e.id,
					class: "tree-row zone",
					onClick: (t) => O(e)
				}, [
					i[8] ||= l("span", { class: "arrow-spacer" }, null, -1),
					i[9] ||= l("span", { class: "kind-tag" }, "GRP", -1),
					l("span", Xf, T(e.name), 1),
					E(a).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "row-btn del",
						onClick: F((t) => B(e.id), ["stop"])
					}, " Del ", 8, Zf)) : s("", !0)
				], 8, Yf))), 128))])) : s("", !0),
				E(a).mode === "edit" ? (b(), c("div", {
					key: 1,
					class: "add-child-btn root",
					onClick: i[2] ||= (e) => m.value = !0
				}, " + Add building / site / group ")) : s("", !0)
			]),
			f(n, { name: "fade" }, {
				default: M(() => [E(a).mode === "edit" && (m.value || h.value) ? (b(), c("div", Qf, [
					i[12] ||= l("div", { class: "add-title" }, "Add Space", -1),
					N(l("select", {
						"onUpdate:modelValue": i[3] ||= (e) => _.value = e,
						class: "add-sel"
					}, [...i[11] ||= [
						l("option", { value: "building" }, "Building", -1),
						l("option", { value: "floor" }, "Floor", -1),
						l("option", { value: "site" }, "Site", -1),
						l("option", { value: "zone" }, "Zone", -1),
						l("option", { value: "rack" }, "Rack", -1),
						l("option", { value: "custom_group" }, "Custom Group", -1),
						l("option", { value: "security_zone" }, "Security Zone", -1),
						l("option", { value: "service" }, "Service Group", -1),
						l("option", { value: "external" }, "External", -1),
						l("option", { value: "cloud" }, "Cloud", -1)
					]], 512), [[k, _.value]]),
					N(l("input", {
						"onUpdate:modelValue": i[4] ||= (e) => v.value = e,
						class: "add-input",
						placeholder: "Name",
						onKeydown: P(I, ["enter"])
					}, null, 544), [[A, v.value]]),
					l("div", { class: "add-btns" }, [l("button", {
						class: "add-ok",
						onClick: I
					}, "Add"), l("button", {
						class: "add-cancel",
						onClick: L
					}, "Cancel")])
				])) : s("", !0)]),
				_: 1
			}),
			f(n, { name: "fade" }, {
				default: M(() => [E(a).mode === "edit" && y.value ? (b(), c("div", $f, [
					i[13] ||= l("div", { class: "add-title" }, "Rename", -1),
					N(l("input", {
						"onUpdate:modelValue": i[5] ||= (e) => x.value = e,
						class: "add-input",
						onKeydown: P(z, ["enter"])
					}, null, 544), [[A, x.value]]),
					l("div", ep, [l("button", {
						class: "add-ok",
						onClick: z
					}, "Save"), l("button", {
						class: "add-cancel",
						onClick: i[6] ||= (e) => y.value = null
					}, " Cancel ")])
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-350014e0"]]), np = { class: "panel" }, rp = { class: "panel-head" }, ip = {
	key: 0,
	class: "add-form"
}, ap = { class: "add-row" }, op = { label: "Built-in" }, sp = ["value"], cp = {
	key: 0,
	label: "Custom"
}, lp = ["value"], up = {
	key: 0,
	class: "empty"
}, dp = { class: "device-list" }, fp = ["draggable", "onDragstart"], pp = { class: "dev-info" }, mp = { class: "dev-name" }, hp = { class: "dev-ip" }, gp = { class: "dev-source" }, _p = ["onClick"], vp = { class: "panel-footer" }, yp = { class: "hint" }, bp = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "UnmappedPanel",
	setup(t) {
		let r = q(), i = J(), { allTypes: a, typeColor: o, typeAbbr: u } = wf(), p = S(null), m = S(!1), h = x({
			hostname: "",
			ip: "",
			type: "server",
			vendor: ""
		});
		function v() {
			i.mode === "edit" && h.hostname.trim() && (r.addManualDevice({
				hostname: h.hostname.trim(),
				ip: h.ip.trim() || void 0,
				type: h.type,
				vendor: h.vendor.trim() || void 0
			}), i.addToast(`Device added: ${h.hostname.trim()}`, "success"), h.hostname = "", h.ip = "", h.vendor = "", m.value = !1);
		}
		function y(e, t) {
			if (i.mode !== "edit") {
				e.preventDefault();
				return;
			}
			p.value = t, e.dataTransfer?.setData("deviceId", t), e.dataTransfer.effectAllowed = "move";
		}
		function w() {
			p.value = null;
		}
		function D(e) {
			if (i.mode !== "edit") return;
			let t = r.unmappedDevices.findIndex((t) => t.id === e);
			t >= 0 && r.unmappedDevices.splice(t, 1);
		}
		return (t, x) => (b(), c("aside", np, [
			l("div", rp, [
				l("span", null, [x[6] ||= d("Unmapped Devices ", -1), l("b", null, T(E(r).unmappedDevices.length), 1)]),
				E(i).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "text-btn",
					title: "Add device manually",
					onClick: x[0] ||= (e) => m.value = !m.value
				}, " Add ")) : s("", !0),
				l("button", {
					class: "close-btn",
					title: "Close",
					onClick: x[1] ||= (e) => E(i).closeLeftDock()
				}, " ✕ ")
			]),
			f(n, { name: "fade" }, {
				default: M(() => [E(i).mode === "edit" && m.value ? (b(), c("div", ip, [
					N(l("input", {
						"onUpdate:modelValue": x[2] ||= (e) => h.hostname = e,
						class: "add-input",
						placeholder: "Hostname *",
						onKeydown: P(v, ["enter"])
					}, null, 544), [[A, h.hostname]]),
					N(l("input", {
						"onUpdate:modelValue": x[3] ||= (e) => h.ip = e,
						class: "add-input",
						placeholder: "IP address",
						onKeydown: P(v, ["enter"])
					}, null, 544), [[A, h.ip]]),
					l("div", ap, [N(l("select", {
						"onUpdate:modelValue": x[4] ||= (e) => h.type = e,
						class: "add-sel"
					}, [l("optgroup", op, [(b(!0), c(e, null, C(E(a).filter((e) => !e.custom), (e) => (b(), c("option", {
						key: e.id,
						value: e.id
					}, T(e.label), 9, sp))), 128))]), E(a).some((e) => e.custom) ? (b(), c("optgroup", cp, [(b(!0), c(e, null, C(E(a).filter((e) => e.custom), (e) => (b(), c("option", {
						key: e.id,
						value: e.id
					}, " ★ " + T(e.label), 9, lp))), 128))])) : s("", !0)], 512), [[k, h.type]]), N(l("input", {
						"onUpdate:modelValue": x[5] ||= (e) => h.vendor = e,
						class: "add-input",
						placeholder: "Vendor"
					}, null, 512), [[A, h.vendor]])]),
					l("button", {
						class: "add-ok",
						onClick: v
					}, "Add device")
				])) : s("", !0)]),
				_: 1
			}),
			E(r).unmappedDevices.length === 0 && !m.value ? (b(), c("div", up, " All devices are placed. ")) : s("", !0),
			l("div", dp, [(b(!0), c(e, null, C(E(r).unmappedDevices, (e) => (b(), c("div", {
				key: e.id,
				class: g(["dev-row", {
					dragging: p.value === e.id,
					readonly: E(i).mode !== "edit"
				}]),
				draggable: E(i).mode === "edit",
				onDragstart: (t) => y(t, e.id),
				onDragend: w
			}, [
				l("span", {
					class: "type-tag",
					style: _({
						color: E(o)(e.normalizedType),
						borderColor: E(o)(e.normalizedType)
					})
				}, T(E(u)(e.normalizedType)), 5),
				l("div", pp, [l("div", mp, T(e.hostname ?? e.id), 1), l("div", hp, T(e.ip ?? "—"), 1)]),
				l("span", gp, T(e.source), 1),
				E(i).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "ignore-btn",
					title: "Ignore",
					onClick: F((t) => D(e.id), ["stop"])
				}, " ✕ ", 8, _p)) : s("", !0)
			], 42, fp))), 128))]),
			l("div", vp, [l("span", yp, T(E(i).mode === "edit" ? "Drag a device onto the 3D scene to place it." : "Switch to Edit mode to place devices."), 1)])
		]));
	}
}), [["__scopeId", "data-v-8f912bca"]]), xp = {
	key: 0,
	class: "panel"
}, Sp = { class: "panel-head" }, Cp = { class: "dev-title" }, wp = { class: "dev-name" }, Tp = { class: "dev-ip" }, Ep = {
	key: 0,
	class: "ack-badge",
	title: "Acknowledged — original status is preserved above"
}, Dp = { class: "panel-body" }, Op = { class: "section" }, kp = { class: "info-grid" }, Ap = { class: "info-v" }, jp = { class: "info-v" }, Mp = { class: "info-v" }, Np = { class: "info-v" }, Pp = { class: "info-v" }, Fp = {
	key: 0,
	class: "section"
}, Ip = { class: "m-label" }, Lp = { class: "m-bar-wrap" }, Rp = { class: "section" }, zp = { class: "if-summary" }, Bp = { class: "if-up" }, Vp = { class: "if-dn" }, Hp = { class: "chevron" }, Up = {
	key: 0,
	class: "iface-list"
}, Wp = { class: "if-name" }, Gp = { class: "if-alias" }, Kp = { class: "if-ip" }, qp = { class: "if-speed" }, Jp = { class: "if-traffic" }, Yp = {
	key: 0,
	class: "if-err"
}, Xp = {
	key: 1,
	class: "section"
}, Zp = { class: "vt-row" }, Qp = { value: "" }, $p = { label: "Built-in" }, em = ["value"], tm = {
	key: 0,
	label: "Custom"
}, nm = ["value"], rm = {
	key: 2,
	class: "section"
}, im = { class: "anno-form" }, am = {
	key: 3,
	class: "section actions"
}, om = { class: "action-btns" }, sm = { class: "assign-row" }, cm = {
	key: 0,
	class: "action-log"
}, lm = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "DeviceDetailPanel",
	setup(t) {
		let n = q(), r = J(), { allTypes: a, typeColor: o, typeAbbr: u } = wf(), { rebuildAll: f, setDeviceAcknowledged: p } = iu(), m = S(!1), h = S(""), v = S(""), y = S(""), x = S(""), w = S(""), D = S(""), O = i(() => r.selectedDeviceId ? n.devices.get(r.selectedDeviceId) ?? null : null), M = i(() => O.value ? n.getMappingByDeviceId(O.value.id) ?? null : null), P = i(() => O.value ? n.interfacesByDevice.get(O.value.id) ?? [] : []), F = i(() => P.value.filter((e) => e.status === "up").length), I = i(() => P.value.filter((e) => e.status === "down").length);
		j(M, (e) => {
			v.value = e?.displayName ?? "", y.value = e?.memo ?? "", x.value = e?.tags?.join(", ") ?? "", w.value = e?.visualType ?? "", D.value = e?.operatorState?.assignedTo ?? "";
		}, { immediate: !0 });
		function L() {
			O.value && (n.setVisualType(O.value.id, w.value || void 0), f());
		}
		let R = i(() => {
			let e = O.value?.metrics;
			return e ? [
				{
					key: "cpu",
					label: "CPU",
					pct: e.cpu ?? 0,
					display: `${(e.cpu ?? 0).toFixed(1)}%`,
					color: z(e.cpu ?? 0)
				},
				{
					key: "mem",
					label: "Memory",
					pct: e.memory ?? 0,
					display: `${(e.memory ?? 0).toFixed(1)}%`,
					color: z(e.memory ?? 0)
				},
				{
					key: "disk",
					label: "Disk",
					pct: e.disk ?? 0,
					display: `${(e.disk ?? 0).toFixed(1)}%`,
					color: z(e.disk ?? 0)
				},
				{
					key: "netin",
					label: "Net In",
					pct: Math.min((e.networkIn ?? 0) / 10, 100),
					display: `${(e.networkIn ?? 0).toFixed(0)} M`,
					color: "#3b82f6"
				},
				{
					key: "temp",
					label: "Temp",
					pct: Math.min(((e.temperature ?? 40) - 20) / 60 * 100, 100),
					display: `${(e.temperature ?? 0).toFixed(0)}°C`,
					color: z(((e.temperature ?? 40) - 20) / 60 * 100)
				}
			] : [];
		});
		function z(e) {
			return e >= 90 ? "#ef4444" : e >= 70 ? "#eab308" : "#22c55e";
		}
		function B(e) {
			return e ? e >= 1e3 ? `${(e / 1e3).toFixed(1)}G` : `${e.toFixed(0)}M` : "0";
		}
		function V() {
			O.value && n.updateDeviceStatus(O.value.id, "offline"), h.value = `[${W()}] Isolated (simulated)`;
		}
		function H() {
			O.value && n.updateDeviceStatus(O.value.id, "normal"), h.value = `[${W()}] Recovered (simulated)`;
		}
		function U() {
			O.value && (n.acknowledgeDevice(O.value.id), p(O.value.id, !0), h.value = `[${W()}] Acknowledged (original status preserved)`);
		}
		function ee() {
			O.value && (n.unacknowledgeDevice(O.value.id), p(O.value.id, !1), h.value = `[${W()}] Acknowledgment cleared`);
		}
		function te() {
			O.value && (n.assignDevice(O.value.id, D.value.trim()), h.value = D.value.trim() ? `[${W()}] Assigned to ${D.value.trim()}` : `[${W()}] Unassigned`);
		}
		function ne() {
			O.value && (n.updateAnnotation(O.value.id, {
				displayName: v.value || void 0,
				memo: y.value || void 0,
				tags: x.value ? x.value.split(",").map((e) => e.trim()).filter(Boolean) : []
			}), h.value = `[${W()}] Annotation saved`);
		}
		function re() {
			O.value && (n.unmapDevice(O.value.id), r.select(null));
		}
		function W() {
			return (/* @__PURE__ */ new Date()).toLocaleTimeString();
		}
		return (t, n) => O.value ? (b(), c("aside", xp, [l("div", Sp, [l("div", Cp, [
			l("span", {
				class: "type-tag",
				style: _({
					color: E(o)(O.value.normalizedType),
					borderColor: E(o)(O.value.normalizedType)
				})
			}, T(E(u)(O.value.normalizedType)), 5),
			l("div", null, [l("div", wp, T(M.value?.displayName ?? O.value.hostname), 1), l("div", Tp, T(O.value.ip), 1)]),
			l("span", {
				class: "status-badge",
				style: _({
					color: E(Mn)[O.value.status ?? "unknown"],
					background: "#17263b"
				})
			}, T(E(Bn)[O.value.status ?? "unknown"]) + " " + T(E(zn)[O.value.status ?? "unknown"]), 5),
			M.value?.operatorState?.acknowledged ? (b(), c("span", Ep, "✓ Ack")) : s("", !0),
			l("button", {
				class: "close-btn",
				title: "Close",
				onClick: n[0] ||= (e) => E(r).select(null)
			}, " ✕ ")
		])]), l("div", Dp, [
			l("section", Op, [n[13] ||= l("div", { class: "sec-title" }, "Info", -1), l("div", kp, [
				n[8] ||= l("span", { class: "info-k" }, "Vendor", -1),
				l("span", Ap, T(O.value.vendor ?? "—"), 1),
				n[9] ||= l("span", { class: "info-k" }, "Model", -1),
				l("span", jp, T(O.value.model ?? "—"), 1),
				n[10] ||= l("span", { class: "info-k" }, "OS", -1),
				l("span", Mp, T(O.value.os ?? "—"), 1),
				n[11] ||= l("span", { class: "info-k" }, "Source", -1),
				l("span", Np, T(O.value.source), 1),
				n[12] ||= l("span", { class: "info-k" }, "Sync", -1),
				l("span", Pp, T(O.value.syncState), 1)
			])]),
			O.value.metrics ? (b(), c("section", Fp, [n[14] ||= l("div", { class: "sec-title" }, "Metrics", -1), (b(!0), c(e, null, C(R.value, (e) => (b(), c("div", {
				key: e.key,
				class: "metric-row"
			}, [
				l("span", Ip, T(e.label), 1),
				l("div", Lp, [l("div", {
					class: "m-bar",
					style: _({
						width: e.pct + "%",
						background: e.color
					})
				}, null, 4)]),
				l("span", { class: g(["m-val", { hot: e.pct > 85 }]) }, T(e.display), 3)
			]))), 128))])) : s("", !0),
			l("section", Rp, [l("div", {
				class: "sec-title clickable",
				onClick: n[1] ||= (e) => m.value = !m.value
			}, [
				l("span", null, "Interfaces (" + T(P.value.length) + ")", 1),
				l("span", zp, [l("span", Bp, "Up " + T(F.value), 1), l("span", Vp, "Down " + T(I.value), 1)]),
				l("span", Hp, T(m.value ? "−" : "+"), 1)
			]), m.value ? (b(), c("div", Up, [(b(!0), c(e, null, C(P.value, (e) => (b(), c("div", {
				key: e.id,
				class: g(["iface-row", e.status])
			}, [
				l("span", { class: g(["if-dot", e.status]) }, null, 2),
				l("span", Wp, T(e.name), 1),
				l("span", Gp, T(e.alias ?? ""), 1),
				l("span", Kp, T(e.ip ?? ""), 1),
				l("span", qp, T(e.speed ? e.speed + "M" : ""), 1),
				l("div", Jp, [l("span", null, "In " + T(B(e.trafficIn)), 1), l("span", null, "Out " + T(B(e.trafficOut)), 1)]),
				e.errors ? (b(), c("span", Yp, "err:" + T(e.errors), 1)) : s("", !0)
			], 2))), 128))])) : s("", !0)]),
			E(r).mode === "edit" ? (b(), c("section", Xp, [n[15] ||= l("div", { class: "sec-title" }, "Visual Shape", -1), l("div", Zp, [N(l("select", {
				"onUpdate:modelValue": n[2] ||= (e) => w.value = e,
				class: "vt-sel"
			}, [
				l("option", Qp, " Default (" + T(O.value?.normalizedType ?? "unknown") + ") ", 1),
				l("optgroup", $p, [(b(!0), c(e, null, C(E(a).filter((e) => !e.custom), (e) => (b(), c("option", {
					key: e.id,
					value: e.id
				}, T(e.label), 9, em))), 128))]),
				E(a).some((e) => e.custom) ? (b(), c("optgroup", tm, [(b(!0), c(e, null, C(E(a).filter((e) => e.custom), (e) => (b(), c("option", {
					key: e.id,
					value: e.id
				}, " ★ " + T(e.label), 9, nm))), 128))])) : s("", !0)
			], 512), [[k, w.value]]), l("button", {
				class: "vt-apply",
				onClick: L
			}, "Apply")])])) : s("", !0),
			E(r).mode === "edit" ? (b(), c("section", rm, [n[19] ||= l("div", { class: "sec-title" }, "Annotation", -1), l("div", im, [
				l("label", null, [n[16] ||= d("Display name ", -1), N(l("input", {
					"onUpdate:modelValue": n[3] ||= (e) => v.value = e,
					class: "anno-input",
					placeholder: "Device alias"
				}, null, 512), [[A, v.value]])]),
				l("label", null, [n[17] ||= d("Memo ", -1), N(l("textarea", {
					"onUpdate:modelValue": n[4] ||= (e) => y.value = e,
					class: "anno-input anno-textarea",
					rows: "2"
				}, null, 512), [[A, y.value]])]),
				l("label", null, [n[18] ||= d("Tags (comma separated) ", -1), N(l("input", {
					"onUpdate:modelValue": n[5] ||= (e) => x.value = e,
					class: "anno-input",
					placeholder: "web, db, prod"
				}, null, 512), [[A, x.value]])]),
				l("button", {
					class: "save-btn",
					onClick: ne
				}, "Save")
			])])) : s("", !0),
			E(r).mode === "edit" ? (b(), c("section", am, [
				n[20] ||= l("div", { class: "sec-title" }, "Actions", -1),
				l("div", om, [
					l("button", {
						class: "act-btn isolate",
						title: "Simulated — updates this visualization only, does not control the real device",
						onClick: V
					}, " Isolate "),
					l("button", {
						class: "act-btn recover",
						title: "Simulated — updates this visualization only, does not control the real device",
						onClick: H
					}, " Recover "),
					l("button", {
						class: "act-btn ack",
						onClick: n[6] ||= (e) => M.value?.operatorState?.acknowledged ? ee() : U()
					}, T(M.value?.operatorState?.acknowledged ? "Unacknowledge" : "Acknowledge"), 1),
					E(r).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "act-btn unmap",
						onClick: re
					}, " Remove from map ")) : s("", !0)
				]),
				l("div", sm, [N(l("input", {
					"onUpdate:modelValue": n[7] ||= (e) => D.value = e,
					class: "anno-input",
					placeholder: "Assign to…"
				}, null, 512), [[A, D.value]]), l("button", {
					class: "save-btn",
					onClick: te
				}, "Save")]),
				h.value ? (b(), c("div", cm, T(h.value), 1)) : s("", !0)
			])) : s("", !0)
		])])) : s("", !0);
	}
}), [["__scopeId", "data-v-37024d5c"]]), um = {
	key: 0,
	class: "panel"
}, dm = { class: "panel-head" }, fm = { class: "link-title" }, pm = { class: "link-type" }, mm = { class: "link-src" }, hm = { class: "panel-body" }, gm = { class: "section" }, _m = { class: "info-grid" }, vm = { class: "v" }, ym = { class: "v" }, bm = { class: "v" }, xm = { class: "v" }, Sm = { class: "v" }, Cm = {
	key: 0,
	class: "section"
}, wm = { class: "edit-form" }, Tm = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "LinkPropertyPanel",
	setup(e) {
		let t = q(), n = J(), r = {
			physical: "Physical",
			logical: "Logical",
			service_dependency: "Service Dependency",
			traffic_flow: "Traffic Flow",
			security_path: "Security Path",
			manual: "Manual",
			inferred: "Inferred"
		}, a = i(() => n.selectedLinkId ? t.links.get(n.selectedLinkId) ?? null : null), o = i(() => a.value ? t.devices.get(a.value.sourceDeviceId) : null), u = i(() => a.value ? t.devices.get(a.value.targetDeviceId) : null), f = i(() => o.value?.hostname ?? "?"), p = i(() => u.value?.hostname ?? "?"), m = S("up"), h = S("");
		j(a, (e) => {
			m.value = e?.status ?? "up", h.value = e?.label ?? "";
		}, { immediate: !0 });
		function v() {
			n.mode === "edit" && a.value && t.updateLink(a.value.id, {
				status: m.value,
				label: h.value || void 0
			});
		}
		function y() {
			n.mode === "edit" && a.value && (t.removeLink(a.value.id), n.select(null));
		}
		return (e, t) => a.value ? (b(), c("aside", um, [l("div", dm, [l("div", fm, [
			l("span", {
				class: "link-icon",
				style: _({ color: E(In)[a.value.type]?.color })
			}, "╌", 4),
			l("div", null, [l("div", pm, T(r[a.value.type]), 1), l("div", mm, T(f.value) + " → " + T(p.value), 1)]),
			l("span", { class: g(["status-dot", a.value.status]) }, null, 2),
			l("button", {
				class: "close-btn",
				title: "Close",
				onClick: t[0] ||= (e) => E(n).select(null)
			}, " ✕ ")
		])]), l("div", hm, [l("section", gm, [t[10] ||= l("div", { class: "sec-title" }, "Link Info", -1), l("div", _m, [
			t[3] ||= l("span", { class: "k" }, "Type", -1),
			l("span", vm, T(r[a.value.type]), 1),
			t[4] ||= l("span", { class: "k" }, "Status", -1),
			l("span", { class: g(["v", `s-${a.value.status}`]) }, T(a.value.status ?? "unknown"), 3),
			t[5] ||= l("span", { class: "k" }, "Source", -1),
			t[6] ||= d(),
			l("span", ym, T(a.value.source), 1),
			t[7] ||= l("span", { class: "k" }, "Confidence", -1),
			l("span", bm, T(a.value.confidence ?? "—"), 1),
			t[8] ||= l("span", { class: "k" }, "Bandwidth", -1),
			l("span", xm, T(a.value.bandwidth ? a.value.bandwidth + " Mbps" : "—"), 1),
			t[9] ||= l("span", { class: "k" }, "Label", -1),
			l("span", Sm, T(a.value.label ?? "—"), 1)
		])]), E(n).mode === "edit" && a.value.source === "manual" ? (b(), c("section", Cm, [t[14] ||= l("div", { class: "sec-title" }, "Edit", -1), l("div", wm, [
			l("label", null, [t[12] ||= d("Status ", -1), N(l("select", {
				"onUpdate:modelValue": t[1] ||= (e) => m.value = e,
				class: "sel"
			}, [...t[11] ||= [
				l("option", { value: "up" }, "Up", -1),
				l("option", { value: "down" }, "Down", -1),
				l("option", { value: "unknown" }, "Unknown", -1)
			]], 512), [[k, m.value]])]),
			l("label", null, [t[13] ||= d("Label ", -1), N(l("input", {
				"onUpdate:modelValue": t[2] ||= (e) => h.value = e,
				class: "inp"
			}, null, 512), [[A, h.value]])]),
			l("button", {
				class: "save-btn",
				onClick: v
			}, "Apply"),
			l("button", {
				class: "del-btn",
				onClick: y
			}, "Delete")
		])])) : s("", !0)])])) : s("", !0);
	}
}), [["__scopeId", "data-v-6e80502d"]]), Em = {
	key: 0,
	class: "panel"
}, Dm = { class: "panel-head" }, Om = { class: "kind-tag" }, km = { class: "sp-name" }, Am = { class: "panel-body" }, jm = {
	key: 0,
	class: "section"
}, Mm = { class: "info-grid" }, Nm = { class: "v" }, Pm = { class: "v" }, Fm = { class: "v" }, Im = { class: "section" }, Lm = {
	key: 1,
	class: "section"
}, Rm = { class: "slider-row" }, zm = ["min", "max"], Bm = { class: "s-val" }, Vm = { class: "slider-row" }, Hm = ["min", "max"], Um = { class: "s-val" }, Wm = {
	key: 2,
	class: "section actions"
}, Gm = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "SpacePropertyPanel",
	setup(e) {
		let t = q(), n = J(), { refreshSpace: r } = iu(), a = i(() => n.selectedSpaceId ? t.spaces.get(n.selectedSpaceId) ?? null : null), o = i(() => n.selectedSpaceId ? t.devicesBySpace.get(n.selectedSpaceId)?.length ?? 0 : 0), u = S(""), f = S(10), p = S(10), m = i(() => {
			let e = a.value?.type;
			return e === "rack" ? {
				min: 2,
				max: 16
			} : e === "site" ? {
				min: 20,
				max: 120
			} : {
				min: 6,
				max: 60
			};
		});
		j(a, (e) => {
			u.value = e?.name ?? "", f.value = e?.size?.width ?? 10, p.value = e?.size?.depth ?? 10;
		}, { immediate: !0 });
		function h() {
			n.mode === "edit" && a.value && (t.updateSpace(a.value.id, { name: u.value }), r(a.value.id));
		}
		function g() {
			n.mode === "edit" && (!a.value || !a.value.size || (t.updateSpace(a.value.id, { size: {
				...a.value.size,
				width: f.value,
				depth: p.value
			} }), r(a.value.id)));
		}
		function _() {
			n.mode === "edit" && a.value && confirm("Archive this space?") && (t.archiveSpace(a.value.id), t.logChange("space.archive", `Space archived: ${a.value.id}`), r(a.value.id), n.select(null));
		}
		return (e, t) => a.value ? (b(), c("aside", Em, [l("div", Dm, [
			l("span", Om, T(a.value.type.toUpperCase()), 1),
			l("span", km, T(a.value.name), 1),
			l("button", {
				class: "close-btn",
				title: "Close",
				onClick: t[0] ||= (e) => E(n).select(null)
			}, " ✕ ")
		]), l("div", Am, [
			E(n).mode === "edit" ? (b(), c("section", jm, [t[9] ||= l("div", { class: "sec-title" }, "Info", -1), l("div", Mm, [
				t[4] ||= l("span", { class: "k" }, "Kind", -1),
				t[5] ||= d(),
				l("span", Nm, T(a.value.kind), 1),
				t[6] ||= l("span", { class: "k" }, "Type", -1),
				t[7] ||= d(),
				l("span", Pm, T(a.value.type), 1),
				t[8] ||= l("span", { class: "k" }, "Devices", -1),
				l("span", Fm, T(o.value), 1)
			])])) : s("", !0),
			l("section", Im, [t[10] ||= l("div", { class: "sec-title" }, "Name", -1), N(l("input", {
				"onUpdate:modelValue": t[1] ||= (e) => u.value = e,
				class: "inp",
				onChange: h
			}, null, 544), [[A, u.value]])]),
			E(n).mode === "edit" && a.value.size ? (b(), c("section", Lm, [
				t[13] ||= l("div", { class: "sec-title" }, "Size", -1),
				l("div", Rm, [
					t[11] ||= l("span", { class: "s-label" }, "Width", -1),
					N(l("input", {
						"onUpdate:modelValue": t[2] ||= (e) => f.value = e,
						type: "range",
						min: m.value.min,
						max: m.value.max,
						step: "0.5",
						class: "slider",
						onInput: g
					}, null, 40, zm), [[
						A,
						f.value,
						void 0,
						{ number: !0 }
					]]),
					l("span", Bm, T(f.value.toFixed(1)), 1)
				]),
				l("div", Vm, [
					t[12] ||= l("span", { class: "s-label" }, "Depth", -1),
					N(l("input", {
						"onUpdate:modelValue": t[3] ||= (e) => p.value = e,
						type: "range",
						min: m.value.min,
						max: m.value.max,
						step: "0.5",
						class: "slider",
						onInput: g
					}, null, 40, Hm), [[
						A,
						p.value,
						void 0,
						{ number: !0 }
					]]),
					l("span", Um, T(p.value.toFixed(1)), 1)
				])
			])) : s("", !0),
			E(n).mode === "edit" ? (b(), c("section", Wm, [l("button", {
				class: "act-btn archive",
				onClick: _
			}, "Archive space")])) : s("", !0)
		])])) : s("", !0);
	}
}), [["__scopeId", "data-v-eab16356"]]), Km = { class: "sv-panel" }, qm = { class: "sv-head" }, Jm = {
	key: 0,
	class: "sv-empty"
}, Ym = { class: "sv-list" }, Xm = ["onClick"], Zm = ["src"], Qm = {
	key: 1,
	class: "sv-thumb sv-thumb--empty",
	"aria-hidden": "true"
}, $m = { class: "sv-text" }, eh = { class: "sv-name" }, th = { class: "sv-time" }, nh = ["onClick"], rh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "SavedViewPanel",
	emits: ["load-view", "save-view"],
	setup(t, { emit: n }) {
		let r = q(), i = J(), a = n;
		function o() {
			let e = prompt("Enter a view name:", `View-${r.savedViews.length + 1}`) ?? "";
			e && a("save-view", e);
		}
		function u(e) {
			a("load-view", e);
		}
		return (t, n) => (b(), c("div", Km, [
			l("div", qm, [
				n[1] ||= l("span", null, "Saved Views", -1),
				l("button", {
					class: "sv-save",
					title: "Save current view",
					onClick: o
				}, " Save Current "),
				l("button", {
					class: "icon-btn",
					onClick: n[0] ||= (e) => E(i).showSavedViews = !1
				}, "Close")
			]),
			E(r).savedViews.length ? s("", !0) : (b(), c("div", Jm, "No saved views")),
			l("div", Ym, [(b(!0), c(e, null, C(E(r).savedViews, (e) => (b(), c("div", {
				key: e.id,
				class: "sv-row"
			}, [l("div", {
				class: "sv-info",
				onClick: (t) => u(e)
			}, [e.thumbnail ? (b(), c("img", {
				key: 0,
				src: e.thumbnail,
				class: "sv-thumb",
				alt: ""
			}, null, 8, Zm)) : (b(), c("div", Qm)), l("div", $m, [l("div", eh, T(e.name), 1), l("div", th, T(e.createdAt), 1)])], 8, Xm), l("button", {
				class: "del-btn",
				onClick: (t) => E(r).removeSavedView(e.id)
			}, " ✕ ", 8, nh)]))), 128))])
		]));
	}
}), [["__scopeId", "data-v-880df611"]]), ih = { class: "cl-panel" }, ah = { class: "cl-head" }, oh = {
	key: 0,
	class: "cl-empty"
}, sh = { class: "cl-list" }, ch = { class: "cl-msg" }, lh = { class: "cl-ts" }, uh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "ChangeLogPanel",
	setup(t) {
		let n = q(), r = J(), a = S("");
		function o(e) {
			return e.includes("link") ? "link" : e.includes("space") ? "space" : e.includes("device") ? "device" : "other";
		}
		let d = i(() => a.value ? n.changeLog.filter((e) => o(e.type) === a.value) : n.changeLog);
		function f() {
			p(n.exportChangeLog(), `change-log-${Date.now()}.json`);
		}
		function p(e, t) {
			let n = new Blob([e], { type: "application/json" }), r = URL.createObjectURL(n), i = document.createElement("a");
			i.href = r, i.download = t, i.click(), URL.revokeObjectURL(r);
		}
		return (t, i) => (b(), c("div", ih, [
			l("div", ah, [
				i[4] ||= l("span", null, "Change Log", -1),
				N(l("select", {
					"onUpdate:modelValue": i[0] ||= (e) => a.value = e,
					class: "cl-filter"
				}, [...i[3] ||= [u("<option value=\"\" data-v-5d4f107f>All types</option><option value=\"device\" data-v-5d4f107f>Device</option><option value=\"space\" data-v-5d4f107f>Space</option><option value=\"link\" data-v-5d4f107f>Link</option><option value=\"other\" data-v-5d4f107f>Other</option>", 5)]], 512), [[k, a.value]]),
				l("button", {
					class: "cl-clear",
					onClick: f
				}, "Export"),
				l("button", {
					class: "cl-clear",
					onClick: i[1] ||= (e) => E(n).changeLog.splice(0)
				}, " Clear "),
				l("button", {
					class: "icon-btn",
					onClick: i[2] ||= (e) => E(r).showChangeLog = !1
				}, "Close")
			]),
			d.value.length ? s("", !0) : (b(), c("div", oh, "No changes yet")),
			l("div", sh, [(b(!0), c(e, null, C(d.value, (e) => (b(), c("div", {
				key: e.id,
				class: "cl-row"
			}, [
				l("span", { class: g(["cl-type", o(e.type)]) }, T(e.type), 3),
				l("span", ch, T(e.msg), 1),
				l("span", lh, T(e.ts), 1)
			]))), 128))])
		]));
	}
}), [["__scopeId", "data-v-5d4f107f"]]), dh = { class: "vn-panel" }, fh = { class: "vn-head" }, ph = { class: "vn-list" }, mh = ["onClick"], hh = { class: "vn-tag" }, gh = { class: "vn-label" }, _h = ["onClick"], vh = {
	key: 0,
	class: "vn-empty"
}, yh = {
	key: 0,
	class: "add-form"
}, bh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "VirtualNodePanel",
	emits: ["select-node"],
	setup(t, { emit: r }) {
		let a = q(), o = J(), u = r, d = S(!1), p = S("internet"), m = S(""), h = i(() => [...a.virtualNodes.values()]);
		function g() {
			if (o.mode !== "edit" || !m.value.trim()) return;
			let e = `vn-${Date.now()}`;
			a.addVirtualNode({
				id: e,
				label: m.value.trim(),
				type: p.value,
				position: {
					x: Math.random() * 40 - 20,
					y: 0,
					z: Math.random() * 40 - 20
				},
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}), a.logChange("virtualNode.create", `Virtual node added: ${m.value}`), m.value = "", d.value = !1;
		}
		function _(e) {
			o.mode === "edit" && a.removeVirtualNode(e);
		}
		function v(e) {
			u("select-node", e);
		}
		return (t, r) => (b(), c("div", dh, [
			l("div", fh, [
				r[4] ||= l("span", null, "Virtual Nodes", -1),
				E(o).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "text-btn",
					onClick: r[0] ||= (e) => d.value = !d.value
				}, " Add ")) : s("", !0),
				l("button", {
					class: "text-btn",
					onClick: r[1] ||= (e) => E(o).showVirtualNodes = !1
				}, " Close ")
			]),
			l("div", ph, [(b(!0), c(e, null, C(h.value, (e) => (b(), c("div", {
				key: e.id,
				class: "vn-row",
				onClick: (t) => v(e.id)
			}, [
				l("span", hh, T(e.type.slice(0, 3).toUpperCase()), 1),
				l("span", gh, T(e.label), 1),
				E(o).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "del-btn",
					onClick: F((t) => _(e.id), ["stop"])
				}, " x ", 8, _h)) : s("", !0)
			], 8, mh))), 128)), h.value.length ? s("", !0) : (b(), c("div", vh, "No virtual nodes"))]),
			f(n, { name: "fade" }, {
				default: M(() => [E(o).mode === "edit" && d.value ? (b(), c("div", yh, [
					N(l("select", {
						"onUpdate:modelValue": r[2] ||= (e) => p.value = e,
						class: "add-sel"
					}, [...r[5] ||= [
						l("option", { value: "internet" }, "Internet", -1),
						l("option", { value: "cloud" }, "Cloud", -1),
						l("option", { value: "external" }, "External", -1),
						l("option", { value: "custom" }, "Custom", -1)
					]], 512), [[k, p.value]]),
					N(l("input", {
						"onUpdate:modelValue": r[3] ||= (e) => m.value = e,
						class: "add-input",
						placeholder: "Name",
						onKeydown: P(g, ["enter"])
					}, null, 544), [[A, m.value]]),
					l("button", {
						class: "add-btn",
						onClick: g
					}, "Add")
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-55d9d90c"]]), xh = {
	key: 0,
	class: "tl-panel"
}, Sh = { class: "tl-head" }, Ch = {
	key: 0,
	class: "tl-info"
}, wh = {
	key: 0,
	class: "tl-slider-wrap"
}, Th = ["max"], Eh = { class: "tl-label" }, Dh = {
	key: 1,
	class: "tl-replay-banner"
}, Oh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "TimelinePanel",
	props: { timeline: {} },
	emits: ["scrub", "live"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = J(), o = q(), u = S(null), f = S(!1), p = i(() => n.timeline.frameCount), m = i(() => a.timelineFrameIdx < 0 ? null : n.timeline.getFrame(a.timelineFrameIdx));
		function h() {
			f.value ? (n.timeline.stopRecording(), f.value = !1, o.logChange("timeline", "Timeline recording stopped")) : (n.timeline.startRecording(() => {
				let e = {};
				return o.devices.forEach((t) => {
					e[t.id] = {
						status: t.status,
						metrics: { ...t.metrics }
					};
				}), e;
			}), f.value = !0, o.logChange("timeline", "Timeline recording started"));
		}
		function _() {
			r("scrub", a.timelineFrameIdx);
		}
		function v() {
			w(n.timeline.export(), `timeline-${Date.now()}.json`);
		}
		function y() {
			let e = o.exportSnapshot();
			w(JSON.stringify(e, null, 2), `layout-${Date.now()}.json`), o.logChange("export", "Layout exported");
		}
		function x() {
			u.value?.click();
		}
		function C(e) {
			let t = e.target, n = t.files?.[0];
			if (!n) return;
			let r = new FileReader();
			r.onload = (e) => {
				try {
					let t = JSON.parse(e.target?.result);
					o.importSnapshot(t), o.logChange("import", `Layout imported: ${n.name}`);
				} catch {
					alert("Invalid file format");
				} finally {
					t.value = "";
				}
			}, r.readAsText(n);
		}
		function w(e, t) {
			let n = document.createElement("a");
			n.href = URL.createObjectURL(new Blob([e], { type: "application/json" })), n.download = t, n.click(), URL.revokeObjectURL(n.href);
		}
		return (e, t) => E(a).showTimeline ? (b(), c("div", xh, [
			l("div", Sh, [
				l("button", {
					class: g(["tl-btn", f.value ? "rec" : ""]),
					onClick: h
				}, T(f.value ? "Stop Recording" : "Record"), 3),
				p.value > 0 ? (b(), c("span", Ch, T(p.value) + " frames", 1)) : s("", !0),
				t[3] ||= l("div", { class: "tl-spacer" }, null, -1),
				l("button", {
					class: "tl-btn",
					title: "Export timeline",
					onClick: v
				}, " Export Timeline "),
				l("button", {
					class: "tl-btn",
					title: "Export layout",
					onClick: y
				}, " Export Layout "),
				l("button", {
					class: "tl-btn",
					title: "Import layout",
					onClick: x
				}, " Import Layout "),
				l("input", {
					ref_key: "fileInput",
					ref: u,
					type: "file",
					accept: ".json",
					style: { display: "none" },
					onChange: C
				}, null, 544),
				l("button", {
					class: "text-btn",
					onClick: t[0] ||= (e) => E(a).showTimeline = !1
				}, "Close")
			]),
			p.value > 0 ? (b(), c("div", wh, [
				t[4] ||= l("span", { class: "tl-label" }, "LIVE", -1),
				N(l("input", {
					"onUpdate:modelValue": t[1] ||= (e) => E(a).timelineFrameIdx = e,
					type: "range",
					min: "-1",
					max: p.value - 1,
					step: "1",
					class: "tl-slider",
					onInput: _
				}, null, 40, Th), [[
					A,
					E(a).timelineFrameIdx,
					void 0,
					{ number: !0 }
				]]),
				l("span", Eh, T(m.value?.label ?? "LIVE"), 1)
			])) : s("", !0),
			E(a).timelineFrameIdx >= 0 ? (b(), c("div", Dh, [t[5] ||= d(" Replay mode — real-time updates paused ", -1), l("button", {
				class: "tl-btn",
				onClick: t[2] ||= (e) => {
					E(a).timelineFrameIdx = -1, r("live");
				}
			}, " Back to LIVE ")])) : s("", !0)
		])) : s("", !0);
	}
}), [["__scopeId", "data-v-5f858352"]]), kh = class {
	canvas;
	ctx;
	bounds = {
		minX: -100,
		maxX: 100,
		minZ: -60,
		maxZ: 60
	};
	constructor(e) {
		this.canvas = e, this.ctx = e.getContext("2d");
	}
	toMM(e, t) {
		let { minX: n, maxX: r, minZ: i, maxZ: a } = this.bounds, o = this.canvas.width - 16, s = this.canvas.height - 16;
		return {
			x: 8 + (e - n) / (r - n) * o,
			y: 8 + (t - i) / (a - i) * s
		};
	}
	toWorld(e, t) {
		let { minX: n, maxX: r, minZ: i, maxZ: a } = this.bounds, o = this.canvas.width - 16, s = this.canvas.height - 16;
		return {
			x: n + (e - 8) / o * (r - n),
			z: i + (t - 8) / s * (a - i)
		};
	}
	render(e, t, n, r, i, a) {
		let o = this.ctx, s = this.canvas.width, c = this.canvas.height;
		o.clearRect(0, 0, s, c), o.fillStyle = "rgba(8,12,24,0.92)", o.fillRect(0, 0, s, c), o.strokeStyle = "#1a2a4a", o.lineWidth = 1, o.strokeRect(.5, .5, s - 1, c - 1), e.filter((e) => e.position && !e.archived).forEach((e) => {
			let t = this.toMM(e.position.x, e.position.z);
			if (e.type === "rack") o.fillStyle = "#1e3a5f", o.fillRect(t.x - 3, t.y - 2, 6, 4);
			else if (e.type === "zone" || e.type === "site" || e.type === "floor" || e.type === "building") {
				let n = e.type === "site" || e.type === "floor" || e.type === "building", r = e.size ?? {
					width: 20,
					depth: 20
				}, i = r.width / (this.bounds.maxX - this.bounds.minX) * (s - 16), a = r.depth / (this.bounds.maxZ - this.bounds.minZ) * (c - 16);
				o.strokeStyle = n ? "#2a4a8a" : "#1e3a5f", o.lineWidth = n ? 1.5 : 1, o.setLineDash(e.type === "zone" ? [2, 2] : []), o.strokeRect(t.x - i / 2, t.y - a / 2, i, a), o.setLineDash([]);
			}
		}), t.forEach((e) => {
			let t = a(e.id);
			if (!t?.position) return;
			let n = this.toMM(t.position.x, t.position.z), r = Mn[e.status ?? "unknown"];
			o.fillStyle = r, e.status === "critical" && (o.shadowColor = r, o.shadowBlur = 4), o.beginPath(), o.arc(n.x, n.y, e.status === "critical" ? 3 : 2, 0, Math.PI * 2), o.fill(), o.shadowBlur = 0;
		});
		let l = this.toMM(i.x, i.z);
		o.strokeStyle = "#60a5fa", o.lineWidth = 1.5, o.beginPath(), o.arc(l.x, l.y, 5, 0, Math.PI * 2), o.stroke(), o.fillStyle = "rgba(96,165,250,0.3)", o.fill(), o.fillStyle = "#475569", o.font = "9px monospace", o.fillText("Minimap", 5, 11);
	}
	updateBounds(e) {
		let t = Infinity, n = -Infinity, r = Infinity, i = -Infinity;
		e.forEach((e) => {
			if (!e.position) return;
			let a = e.size ?? {
				width: 20,
				depth: 20
			};
			t = Math.min(t, e.position.x - a.width / 2), n = Math.max(n, e.position.x + a.width / 2), r = Math.min(r, e.position.z - a.depth / 2), i = Math.max(i, e.position.z + a.depth / 2);
		}), this.bounds = {
			minX: t === Infinity ? -100 : t - 15,
			maxX: n === -Infinity ? 100 : n + 15,
			minZ: r === Infinity ? -60 : r - 15,
			maxZ: i === -Infinity ? 60 : i + 15
		};
	}
}, Ah = {
	key: 0,
	class: "mm-wrap"
}, jh = 180, Mh = 130, Nh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "MinimapPanel",
	props: {
		camera: {},
		controls: {}
	},
	setup(e) {
		let t = e, n = S(null), r = q(), i = J(), { flyToWorldPoint: a } = iu(), o = null, u = null;
		function d(e) {
			if (!o || !n.value) return;
			let t = n.value.getBoundingClientRect(), { x: r, z: i } = o.toWorld(e.clientX - t.left, e.clientY - t.top);
			a(r, i);
		}
		y(() => {
			n.value && (o = new kh(n.value), o.updateBounds(r.scopedSpaces(i.activeRootSpaceId)), f());
		});
		function f() {
			let e = () => {
				if (u = requestAnimationFrame(e), !o || !i.showMinimap) return;
				let n = t.camera.position, a = t.controls.target;
				o.render(r.scopedSpaces(i.activeRootSpaceId), r.scopedDevices(i.activeRootSpaceId), r.mappings, {
					x: n.x,
					z: n.z
				}, {
					x: a.x,
					z: a.z
				}, (e) => r.getMappingByDeviceId(e));
			};
			e();
		}
		return j(() => [r.spaces.size, i.activeRootSpaceId], () => {
			o?.updateBounds(r.scopedSpaces(i.activeRootSpaceId));
		}), v(() => {
			u && cancelAnimationFrame(u);
		}), (e, t) => E(i).showMinimap ? (b(), c("div", Ah, [l("canvas", {
			ref_key: "canvas",
			ref: n,
			width: jh,
			height: Mh,
			class: "mm-canvas",
			title: "Click to navigate",
			onClick: d
		}, null, 512), l("button", {
			class: "mm-close",
			title: "Close minimap",
			onClick: t[0] ||= (e) => E(i).showMinimap = !1
		}, " ✕ ")])) : s("", !0);
	}
}), [["__scopeId", "data-v-63bba14a"]]), Ph = {
	viewBox: "0 0 40 40",
	width: "36",
	height: "36",
	"aria-hidden": "true"
}, Fh = {
	class: "camera-tools",
	"aria-label": "Camera controls"
}, Ih = ["aria-pressed"], Lh = ["aria-pressed"], Rh = { class: "zoom-controls" }, zh = ["disabled"], Bh = ["aria-expanded"], Vh = {
	key: 0,
	id: "navigation-help",
	class: "navigation-help"
}, Hh = { class: "tt-name" }, Uh = { class: "tt-ip" }, Wh = {
	key: 0,
	class: "tt-metrics"
}, Gh = {
	key: 1,
	class: "hint-wrap"
}, Kh = {
	key: 0,
	class: "hint edit-hint"
}, qh = {
	key: 1,
	class: "hint"
}, Jh = {
	key: 2,
	class: "hint"
}, Yh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "SceneCanvas",
	emits: ["scene-ready"],
	setup(e, { emit: t }) {
		let r = S(null), a = S(null), o = S(null), p = q(), m = J(), g = t, { init: x, dispose: C, dropDeviceAt: w, resetCamera: D, faceNorth: O, focusDevice: k, zoomCamera: A, setCameraView: j, getScene: N } = iu(), P = S("perspective"), I = S(0);
		function L() {
			let e = N().controls;
			P.value = e.getPolarAngle() < .1 ? "top" : "perspective", I.value = -(e.getAzimuthalAngle() * 180) / Math.PI;
		}
		let R = S(!1);
		function z() {
			m.selectedDeviceId && k(m.selectedDeviceId);
		}
		let { typeColor: B, typeLabel: V } = wf(), H = i(() => m.tooltip), U = i(() => m.tooltip.deviceId ? p.devices.get(m.tooltip.deviceId) : null);
		function ee(e) {
			let t = e.dataTransfer?.getData("deviceId");
			t && w(t, e);
		}
		return y(() => {
			x(a.value, o.value, r.value), N().controls.addEventListener("change", L), h(() => g("scene-ready"));
		}), v(() => {
			N().controls.removeEventListener("change", L), C();
		}), (e, t) => (b(), c("div", {
			ref_key: "wrapper",
			ref: r,
			class: "scene-wrap",
			onDragover: t[9] ||= F(() => {}, ["prevent"]),
			onDrop: ee
		}, [
			l("canvas", {
				ref_key: "canvas",
				ref: a
			}, null, 512),
			l("div", {
				ref_key: "overlay",
				ref: o,
				class: "html-overlay"
			}, null, 512),
			l("button", {
				class: "compass",
				title: "Scene orientation — click to face north",
				onClick: t[0] ||= (...e) => E(O) && E(O)(...e)
			}, [(b(), c("svg", Ph, [t[12] ||= l("circle", {
				cx: "20",
				cy: "20",
				r: "18",
				fill: "rgba(12,22,39,0.85)",
				stroke: "#30445f"
			}, null, -1), l("g", {
				style: _({ transform: `rotate(${I.value}deg)` }),
				class: "needle"
			}, [
				t[10] ||= l("path", {
					d: "M20 6 L24.5 21 L20 18 L15.5 21 Z",
					fill: "#ef4444"
				}, null, -1),
				t[11] ||= l("path", {
					d: "M20 34 L24.5 19 L20 22 L15.5 19 Z",
					fill: "#475569"
				}, null, -1),
				l("text", {
					x: "20",
					y: "12.5",
					"text-anchor": "middle",
					class: "compass-n",
					style: _({ transform: `rotate(${-I.value}deg)` })
				}, " N ", 4)
			], 4)]))]),
			l("nav", Fh, [
				t[13] ||= l("span", { class: "camera-caption" }, "NAVIGATE", -1),
				l("button", {
					title: "Reset camera (F)",
					onClick: t[1] ||= (...e) => E(D) && E(D)(...e)
				}, "Reset view"),
				l("button", {
					"aria-pressed": P.value === "top",
					title: "Look down at the current area",
					onClick: t[2] ||= (e) => E(j)("top")
				}, " Top view ", 8, Ih),
				l("button", {
					"aria-pressed": P.value === "perspective",
					title: "View the current area in 3D",
					onClick: t[3] ||= (e) => E(j)("perspective")
				}, " 3D view ", 8, Lh),
				l("div", Rh, [l("button", {
					"aria-label": "Zoom in",
					title: "Zoom in",
					onClick: t[4] ||= (e) => E(A)(.8)
				}, " + "), l("button", {
					"aria-label": "Zoom out",
					title: "Zoom out",
					onClick: t[5] ||= (e) => E(A)(1.25)
				}, " − ")]),
				l("button", {
					disabled: !E(m).selectedDeviceId,
					title: "Move closer to the selected device",
					onClick: z
				}, " Focus selected ", 8, zh),
				l("button", {
					"aria-expanded": R.value,
					"aria-controls": "navigation-help",
					onClick: t[6] ||= (e) => R.value = !R.value
				}, " Controls guide ", 8, Bh)
			]),
			R.value ? (b(), c("div", Vh, [t[14] ||= u("<strong data-v-d41711e8>Explore your topology</strong><dl data-v-d41711e8><dt data-v-d41711e8>Rotate</dt><dd data-v-d41711e8>Left-drag empty space</dd><dt data-v-d41711e8>Pan</dt><dd data-v-d41711e8>Right-drag / Ctrl + drag</dd><dt data-v-d41711e8>Zoom</dt><dd data-v-d41711e8>Scroll / pinch</dd><dt data-v-d41711e8>Inspect</dt><dd data-v-d41711e8>Click a device</dd><dt data-v-d41711e8>Touch</dt><dd data-v-d41711e8>One finger rotates; two fingers pan</dd></dl>", 2), l("p", null, T(E(m).mode === "edit" ? "Move selected devices with the colored arrows. Esc cancels a connection." : "Switch to Edit to move devices or create connections."), 1)])) : s("", !0),
			f(n, { name: "fade" }, {
				default: M(() => [H.value.visible && U.value ? (b(), c("div", {
					key: 0,
					class: "tooltip",
					style: _({
						left: H.value.x + 14 + "px",
						top: H.value.y - 10 + "px"
					})
				}, [
					l("div", Hh, T(U.value.hostname), 1),
					l("div", Uh, T(U.value.ip), 1),
					l("div", {
						class: "tt-status",
						style: _({ color: E(Mn)[U.value.status ?? "unknown"] })
					}, T(E(zn)[U.value.status ?? "unknown"]), 5),
					U.value.metrics ? (b(), c("div", Wh, " C" + T((U.value.metrics.cpu ?? 0).toFixed(0)) + "% M" + T((U.value.metrics.memory ?? 0).toFixed(0)) + "% ", 1)) : s("", !0),
					l("div", {
						class: "tt-type",
						style: _({ color: E(B)(U.value.normalizedType) })
					}, T(E(V)(U.value.normalizedType)), 5)
				], 4)) : s("", !0)]),
				_: 1
			}),
			E(m).showModeHint ? (b(), c("div", Gh, [E(m).linkToolActive ? (b(), c("div", Kh, [...t[15] ||= [
				d(" Connect mode — ", -1),
				l("b", null, "drag", -1),
				d(" from one device to another, then pick a link type · ", -1),
				l("kbd", null, "ESC", -1),
				d(" to cancel ", -1)
			]])) : E(m).mode === "edit" ? (b(), c("div", qh, [...t[16] ||= [u(" Click to select · <kbd data-v-d41711e8>Ctrl</kbd>+Click multi-select · drag <span style=\"color:#ff6b7a;\" data-v-d41711e8>X</span>/<span style=\"color:#5fd968;\" data-v-d41711e8>Y</span>/<span style=\"color:#5fb0ff;\" data-v-d41711e8>Z</span> arrows to move · <kbd data-v-d41711e8>L</kbd> Connect · <kbd data-v-d41711e8>Del</kbd> Delete · <kbd data-v-d41711e8>Ctrl+Z</kbd> Undo · <kbd data-v-d41711e8>F</kbd> Fit ", 17)]])) : (b(), c("div", Jh, [...t[17] ||= [
				d(" View mode - click to inspect - ", -1),
				l("kbd", null, "F", -1),
				d(" Fit ", -1)
			]])), l("button", {
				class: "hint-toggle hint-toggle--close",
				title: "Hide controls hint",
				"aria-label": "Hide controls hint",
				onClick: t[7] ||= (e) => E(m).showModeHint = !1
			}, " × ")])) : (b(), c("button", {
				key: 2,
				class: "hint-toggle hint-toggle--reopen",
				title: "Show controls hint",
				"aria-label": "Show controls hint",
				onClick: t[8] ||= (e) => E(m).showModeHint = !0
			}, " ? "))
		], 544));
	}
}), [["__scopeId", "data-v-d41711e8"]]), Xh = 220, Zh = 16, Qh = 22, $h = 56;
function eg(e, t) {
	return e > 0 ? Mn.critical : t > 0 ? Mn.warning : Mn.normal;
}
var tg = class {
	canvas;
	ctx;
	cardRects = [];
	pillRects = [];
	hoverId = null;
	constructor(e) {
		this.canvas = e, this.ctx = e.getContext("2d");
	}
	setHover(e) {
		this.hoverId = e;
	}
	hitTest(e, t) {
		for (let n of this.pillRects) if (e >= n.x && e <= n.x + n.w && t >= n.y && t <= n.y + n.h) return {
			id: n.id,
			drillable: !1
		};
		for (let n of this.cardRects) if (e >= n.x && e <= n.x + n.w && t >= n.y && t <= n.y + n.h) return {
			id: n.id,
			drillable: this._isDrillable(n.id)
		};
		return null;
	}
	_drillableIds = /* @__PURE__ */ new Set();
	_isDrillable(e) {
		return this._drillableIds.has(e);
	}
	render(e) {
		let t = this.ctx, n = window.devicePixelRatio || 1, r = this.canvas.width / n, i = this.canvas.height / n;
		t.setTransform(n, 0, 0, n, 0, 0), t.clearRect(0, 0, r, i), t.fillStyle = "#080c18", t.fillRect(0, 0, r, i), this.cardRects = [], this.pillRects = [], this._drillableIds = new Set(e.filter((e) => e.drillable).map((e) => e.id));
		let a = Math.max(1, Math.floor((r - Zh) / 236)), o = (r - a * Xh - (a - 1) * Zh) / 2, s = o, c = 32, l = 0;
		e.forEach((e, t) => {
			t % a === 0 && t !== 0 ? (s = o, c += l + Zh, l = 0) : t !== 0 && (s += 236);
			let n = $h + (e.drillable ? e.children.length * 28 + 12 : 12);
			this._drawCard(e, s, c, Xh, n), l = Math.max(l, n);
		});
	}
	_drawCard(e, t, n, r, i) {
		let a = this.ctx, o = eg(e.critical, e.warning);
		a.fillStyle = this.hoverId === e.id && !e.drillable ? "rgba(30,58,95,0.9)" : "rgba(9,13,24,0.92)", a.strokeStyle = o, a.lineWidth = e.critical > 0 || e.warning > 0 ? 1.5 : 1, this._roundRect(t, n, r, i, 8), a.fill(), a.stroke(), e.drillable || this.cardRects.push({
			x: t,
			y: n,
			w: r,
			h: i,
			id: e.id
		}), a.fillStyle = "#e2e8f0", a.font = "600 13px -apple-system, \"Segoe UI\", sans-serif", a.fillText(e.name, t + 12, n + 22), a.fillStyle = "#64748b", a.font = "10px monospace", a.fillText(e.type.toUpperCase(), t + 12, n + 38), a.textAlign = "right", a.fillStyle = o, a.font = "600 11px monospace";
		let s = e.critical > 0 ? `${e.critical} CRIT` : e.warning > 0 ? `${e.warning} WARN` : "OK";
		if (a.fillText(s, t + r - 12, n + 22), a.fillStyle = "#475569", a.font = "10px monospace", a.fillText(`${e.total} dev`, t + r - 12, n + 38), a.textAlign = "left", e.drillable) {
			let i = n + $h;
			e.children.forEach((e) => {
				let n = eg(e.critical, e.warning);
				a.fillStyle = this.hoverId === e.id ? "rgba(30,58,95,0.9)" : "rgba(255,255,255,0.04)", a.strokeStyle = n, a.lineWidth = 1, this._roundRect(t + 12, i, r - 24, Qh, 5), a.fill(), a.stroke(), a.fillStyle = "#cbd5e1", a.font = "11px -apple-system, \"Segoe UI\", sans-serif", a.fillText(e.name, t + 20, i + 15), a.beginPath(), a.arc(t + r - 22, i + Qh / 2, 3, 0, Math.PI * 2), a.fillStyle = n, a.fill(), this.pillRects.push({
					x: t + 12,
					y: i,
					w: r - 24,
					h: Qh,
					id: e.id
				}), i += 28;
			});
		}
	}
	_roundRect(e, t, n, r, i) {
		let a = this.ctx;
		a.beginPath(), a.moveTo(e + i, t), a.arcTo(e + n, t, e + n, t + r, i), a.arcTo(e + n, t + r, e, t + r, i), a.arcTo(e, t + r, e, t, i), a.arcTo(e, t, e + n, t, i), a.closePath();
	}
}, ng = {
	key: 0,
	class: "ov-empty"
}, rg = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "OverviewCanvas",
	emits: ["enter-floor"],
	setup(e, { emit: t }) {
		let n = t, r = q(), a = S(null), o = S(null), u = null, d = null, f = new Set([
			"building",
			"floor",
			"site"
		]);
		function p(e) {
			let t = r.scopedDevices(e), n = 0, i = 0;
			return t.forEach((e) => {
				e.status === "critical" ? n++ : e.status === "warning" && i++;
			}), {
				critical: n,
				warning: i,
				total: t.length
			};
		}
		let m = i(() => r.rootSpaces.map((e) => {
			let t = r.childSpaces(e.id).filter((e) => f.has(e.type)), n = p(e.id);
			return {
				id: e.id,
				name: e.name,
				type: e.type,
				critical: n.critical,
				warning: n.warning,
				total: n.total,
				drillable: t.length > 0,
				children: t.map((e) => {
					let t = p(e.id);
					return {
						id: e.id,
						name: e.name,
						critical: t.critical,
						warning: t.warning
					};
				})
			};
		}));
		function h() {
			if (!o.value || !a.value) return;
			let e = window.devicePixelRatio || 1, t = a.value.getBoundingClientRect();
			o.value.width = Math.max(1, Math.round(t.width * e)), o.value.height = Math.max(1, Math.round(t.height * e)), o.value.style.width = `${t.width}px`, o.value.style.height = `${t.height}px`, g();
		}
		function g() {
			u?.render(m.value);
		}
		function _(e) {
			if (!o.value || !u) return;
			let t = o.value.getBoundingClientRect(), r = u.hitTest(e.clientX - t.left, e.clientY - t.top);
			r && !r.drillable && n("enter-floor", r.id);
		}
		function x(e) {
			if (!o.value || !u) return;
			let t = o.value.getBoundingClientRect(), n = u.hitTest(e.clientX - t.left, e.clientY - t.top);
			u.setHover(n ? n.id : null), o.value.style.cursor = n && !n.drillable ? "pointer" : "default", g();
		}
		function C() {
			u?.setHover(null), g();
		}
		return y(() => {
			o.value && (u = new tg(o.value), d = new ResizeObserver(() => h()), a.value && d.observe(a.value), h());
		}), j(m, () => g(), { deep: !0 }), j(Mn, () => g()), v(() => {
			d?.disconnect();
		}), (e, t) => (b(), c("div", {
			ref_key: "wrapper",
			ref: a,
			class: "ov-wrap"
		}, [l("canvas", {
			ref_key: "canvas",
			ref: o,
			class: "ov-canvas",
			onClick: _,
			onMousemove: x,
			onMouseleave: C
		}, null, 544), m.value.length ? s("", !0) : (b(), c("div", ng, "No spaces yet"))], 512));
	}
}), [["__scopeId", "data-v-15d5686d"]]), ig = { class: "offscreen-alerts" }, ag = ["title", "onClick"], og = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "OffscreenAlertOverlay",
	setup(t) {
		let n = J(), r = q(), { focusDevice: i } = iu();
		function a(e) {
			let t = r.devices.get(e);
			return `${t?.hostname ?? t?.ip ?? e} — off-screen or hidden, click to jump to it`;
		}
		function o(e) {
			n.select({
				type: "device",
				id: e
			}), i(e);
		}
		return (t, r) => (b(), c("div", ig, [(b(!0), c(e, null, C(E(n).offscreenAlerts, (e) => (b(), c("button", {
			key: e.id,
			class: g(["oa-arrow", e.status]),
			style: _({
				left: e.edgeX + "px",
				top: e.edgeY + "px",
				transform: `translate(-50%, -50%) rotate(${e.angle}deg)`,
				background: E(Mn)[e.status],
				boxShadow: `0 0 10px ${E(Mn)[e.status]}99`
			}),
			title: a(e.id),
			onClick: (t) => o(e.id)
		}, " ▲ ", 14, ag))), 128))]));
	}
}), [["__scopeId", "data-v-e173f801"]]), sg = ["onClick"], cg = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "ContextMenu",
	setup(r) {
		let i = J(), { confirmCreateLink: a } = iu(), u = [
			{
				type: "physical",
				label: "Physical",
				color: "#3b82f6"
			},
			{
				type: "logical",
				label: "Logical",
				color: "#8b5cf6"
			},
			{
				type: "service_dependency",
				label: "Service Dependency",
				color: "#f59e0b"
			},
			{
				type: "traffic_flow",
				label: "Traffic Flow",
				color: "#22c55e"
			},
			{
				type: "security_path",
				label: "Security Path",
				color: "#ef4444"
			}
		];
		function d(e) {
			a(i.contextMenu.sourceDeviceId, i.contextMenu.targetDeviceId, e);
		}
		function p(e) {
			e.key === "Escape" && i.hideContextMenu();
		}
		function m(e) {
			e.target.closest(".ctx-menu") || i.hideContextMenu();
		}
		return y(() => {
			document.addEventListener("keydown", p), document.addEventListener("mousedown", m);
		}), v(() => {
			document.removeEventListener("keydown", p), document.removeEventListener("mousedown", m);
		}), (r, a) => (b(), o(t, { to: "body" }, [f(n, { name: "ctx-fade" }, {
			default: M(() => [E(i).contextMenu.visible ? (b(), c("div", {
				key: 0,
				class: "ctx-menu",
				style: _({
					left: E(i).contextMenu.x + "px",
					top: E(i).contextMenu.y + "px"
				}),
				onClick: a[1] ||= F(() => {}, ["stop"])
			}, [
				a[2] ||= l("div", { class: "ctx-title" }, "Select link type", -1),
				(b(), c(e, null, C(u, (e) => l("button", {
					key: e.type,
					class: "ctx-item",
					style: _({ borderLeftColor: e.color }),
					onClick: (t) => d(e.type)
				}, [l("span", {
					class: "ctx-dot",
					style: _({ background: e.color })
				}, null, 4), l("span", null, T(e.label), 1)], 12, sg)), 64)),
				a[3] ||= l("div", { class: "ctx-sep" }, null, -1),
				l("button", {
					class: "ctx-item cancel",
					onClick: a[0] ||= (e) => E(i).hideContextMenu()
				}, " Cancel ")
			], 4)) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-65f97b96"]]), lg = { class: "toast-stack" }, ug = ["onClick"], dg = { class: "msg" }, fg = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "ToastPanel",
	setup(n) {
		let i = J();
		return (n, a) => (b(), o(t, { to: "body" }, [l("div", lg, [f(r, { name: "toast" }, {
			default: M(() => [(b(!0), c(e, null, C(E(i).toasts, (e) => (b(), c("div", {
				key: e.id,
				class: g(["toast", e.type]),
				onClick: (t) => E(i).removeToast(e.id)
			}, [l("span", dg, T(e.message), 1), a[0] ||= l("span", { class: "close" }, "✕", -1)], 10, ug))), 128))]),
			_: 1
		})])]));
	}
}), [["__scopeId", "data-v-754a9a76"]]), pg = { class: "help-modal" }, mg = { class: "help-head" }, hg = { class: "lang-switch" }, gg = { class: "help-body" }, _g = { class: "help-key" }, vg = { class: "help-desc" }, yg = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "HelpPanel",
	setup(r) {
		let i = J(), a = S("en"), u = {
			en: [
				{
					title: "Navigation",
					rows: [
						{
							k: "Drag",
							v: "Rotate the camera on empty space"
						},
						{
							k: "Wheel",
							v: "Zoom in / out"
						},
						{
							k: "F",
							v: "Fit view (reset camera)"
						},
						{
							k: "ESC",
							v: "Clear selection / cancel tool"
						}
					]
				},
				{
					title: "Selection & Inspection",
					rows: [
						{
							k: "Click device",
							v: "Select a device and open its detail panel"
						},
						{
							k: "Click rack",
							v: "Open the rack device list on the left"
						},
						{
							k: "Hover",
							v: "Show tooltip / highlight in 3D"
						},
						{
							k: "Search",
							v: "Filter by name or IP; matches stay bright, others dim"
						}
					]
				},
				{
					title: "Editing",
					rows: [
						{
							k: "Select+Drag arrows",
							v: "Move device/space along X (red) / Y (green) / Z (blue)"
						},
						{
							k: "Drag a space",
							v: "Moving a space carries its devices and links"
						},
						{
							k: "Ctrl+Click",
							v: "Multi-select devices; Del to bulk-delete"
						},
						{
							k: "Del",
							v: "Delete selected device / link / space"
						},
						{
							k: "Ctrl+Z",
							v: "Undo last edit"
						},
						{
							k: "Ctrl+Y",
							v: "Redo"
						}
					]
				},
				{
					title: "Links",
					rows: [
						{
							k: "L",
							v: "Toggle Connect mode"
						},
						{
							k: "Drag device→device",
							v: "Create a link, then pick its type"
						},
						{
							k: "Click link+Drag handle",
							v: "Reroute the link (orthogonal path)"
						}
					]
				},
				{
					title: "Panels",
					rows: [
						{
							k: "Devices",
							v: "Unmapped device queue — drag onto the scene to place"
						},
						{
							k: "Spaces",
							v: "Site / Zone / Rack tree — add, rename, archive"
						},
						{
							k: "Views",
							v: "Save and recall camera viewpoints"
						},
						{
							k: "Log",
							v: "Change history"
						},
						{
							k: "Timeline",
							v: "Record status over time and replay; import/export layout"
						},
						{
							k: "Live",
							v: "Toggle the real-time update simulator"
						}
					]
				}
			],
			ko: [
				{
					title: "화면 이동",
					rows: [
						{
							k: "Drag",
							v: "빈 공간 드래그로 카메라 회전"
						},
						{
							k: "Wheel",
							v: "확대 / 축소"
						},
						{
							k: "F",
							v: "전체 보기 (카메라 리셋)"
						},
						{
							k: "ESC",
							v: "선택 해제 / 도구 취소"
						}
					]
				},
				{
					title: "선택과 조회",
					rows: [
						{
							k: "Click device",
							v: "장비 선택 후 우측 상세 패널 표시"
						},
						{
							k: "Click rack",
							v: "좌측에 랙 내 장비 목록 표시"
						},
						{
							k: "Hover",
							v: "툴팁 표시 / 3D 강조"
						},
						{
							k: "Search",
							v: "이름·IP로 필터, 일치 장비는 밝게 나머지는 흐리게"
						}
					]
				},
				{
					title: "편집",
					rows: [
						{
							k: "Select+Drag arrows",
							v: "화살표로 장비/공간 이동 X(빨강)/Y(초록)/Z(파랑)"
						},
						{
							k: "Drag a space",
							v: "공간 이동 시 하위 장비와 링크가 함께 이동"
						},
						{
							k: "Ctrl+Click",
							v: "장비 다중 선택 · Del로 일괄 삭제"
						},
						{
							k: "Del",
							v: "선택한 장비 / 링크 / 공간 삭제"
						},
						{
							k: "Ctrl+Z",
							v: "마지막 편집 실행 취소"
						},
						{
							k: "Ctrl+Y",
							v: "다시 실행"
						}
					]
				},
				{
					title: "링크",
					rows: [
						{
							k: "L",
							v: "연결(Connect) 모드 토글"
						},
						{
							k: "Drag device→device",
							v: "링크 생성 후 타입 선택"
						},
						{
							k: "Click link+Drag handle",
							v: "링크 경로 변경 (직각 라우팅)"
						}
					]
				},
				{
					title: "패널",
					rows: [
						{
							k: "Devices",
							v: "미배치 장비 큐 — 3D로 드래그하여 배치"
						},
						{
							k: "Spaces",
							v: "사이트 / 존 / 랙 트리 — 추가, 이름변경, 아카이브"
						},
						{
							k: "Views",
							v: "카메라 시점 저장 / 불러오기"
						},
						{
							k: "Log",
							v: "변경 이력"
						},
						{
							k: "Timeline",
							v: "상태 녹화 후 재생, 레이아웃 가져오기/내보내기"
						},
						{
							k: "Live",
							v: "실시간 업데이트 시뮬레이터 토글"
						}
					]
				}
			]
		};
		return (r, d) => (b(), o(t, { to: "body" }, [f(n, { name: "help-fade" }, {
			default: M(() => [E(i).showHelp ? (b(), c("div", {
				key: 0,
				class: "help-overlay",
				onClick: d[3] ||= F((e) => E(i).showHelp = !1, ["self"])
			}, [l("div", pg, [l("div", mg, [
				d[4] ||= l("span", { class: "help-title" }, "Topospace — Help", -1),
				l("div", hg, [l("button", {
					class: g(["lang-btn", a.value === "en" ? "on" : ""]),
					onClick: d[0] ||= (e) => a.value = "en"
				}, " EN ", 2), l("button", {
					class: g(["lang-btn", a.value === "ko" ? "on" : ""]),
					onClick: d[1] ||= (e) => a.value = "ko"
				}, " KO ", 2)]),
				l("button", {
					class: "close-btn",
					onClick: d[2] ||= (e) => E(i).showHelp = !1
				}, " Close ")
			]), l("div", gg, [(b(!0), c(e, null, C(u[a.value], (t) => (b(), c("section", {
				key: t.title,
				class: "help-section"
			}, [l("h3", null, T(t.title), 1), (b(!0), c(e, null, C(t.rows, (t) => (b(), c("div", {
				key: t.k,
				class: "help-row"
			}, [l("span", _g, [(b(!0), c(e, null, C(t.k.split("+"), (e) => (b(), c("kbd", { key: e }, T(e), 1))), 128))]), l("span", vg, T(t.v), 1)]))), 128))]))), 128))])])])) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-ca702e8b"]]), bg = {
	server: "server",
	srv: "server",
	host: "server",
	switch: "switch",
	sw: "switch",
	router: "router",
	rtr: "router",
	firewall: "firewall",
	fw: "firewall",
	database: "database",
	db: "database",
	storage: "storage",
	stg: "storage",
	nas: "storage",
	san: "storage",
	vm: "vm",
	container: "container",
	ctr: "container",
	lb: "load_balancer",
	load_balancer: "load_balancer",
	loadbalancer: "load_balancer",
	ap: "access_point",
	access_point: "access_point",
	accesspoint: "access_point",
	cloud: "cloud_service",
	cloud_service: "cloud_service"
}, xg = {
	normal: "normal",
	ok: "normal",
	up: "normal",
	warning: "warning",
	warn: "warning",
	critical: "critical",
	crit: "critical",
	error: "critical",
	down: "offline",
	offline: "offline",
	off: "offline",
	unknown: "unknown",
	maintenance: "maintenance",
	maint: "maintenance"
}, Sg = ["hostname", "type"];
function Cg(e) {
	return e.trim().toLowerCase().replace(/[\s_-]+/g, "");
}
var wg = {
	hostname: "hostname",
	host: "hostname",
	name: "hostname",
	ip: "ip",
	ipaddress: "ip",
	ipaddr: "ip",
	type: "type",
	devicetype: "type",
	kind: "type",
	vendor: "vendor",
	manufacturer: "vendor",
	building: "building",
	floor: "floor",
	site: "site",
	location: "site",
	datacenter: "site",
	dc: "site",
	zone: "zone",
	rack: "rack",
	status: "status",
	uplink: "uplink",
	parent: "uplink",
	connectsto: "uplink",
	connectedto: "uplink"
};
function Tg(e) {
	let t = [];
	return {
		mapped: e.map((e) => wg[Cg(e)] || (t.push(e), null)),
		unknownCols: t
	};
}
function Eg(e, t) {
	let n = {};
	t.forEach((t, r) => {
		if (!t) return;
		let i = (e[r] ?? "").trim();
		i && (t === "type" ? n.type = bg[i.toLowerCase()] ?? "unknown" : t === "status" ? n.status = xg[i.toLowerCase()] ?? "unknown" : n[t] = i);
	});
	for (let e of Sg) if (!n[e]) return { error: `missing required column: ${e}` };
	return { row: n };
}
function Dg(e) {
	let t = [], n = "", r = !1;
	for (let i = 0; i < e.length; i++) {
		let a = e[i];
		r ? a === "\"" && e[i + 1] === "\"" ? (n += "\"", i++) : a === "\"" ? r = !1 : n += a : a === "," ? (t.push(n), n = "") : a === "\"" ? r = !0 : n += a;
	}
	return t.push(n), t;
}
function Og(e) {
	let t = {
		rows: [],
		errors: [],
		warnings: []
	}, n = e.split(/\r?\n/).filter((e) => e.trim().length > 0);
	if (n.length < 2) return t.errors.push("CSV must contain a header row and at least one data row."), t;
	let { mapped: r, unknownCols: i } = Tg(Dg(n[0]));
	i.length && t.warnings.push(`Unknown columns ignored: ${i.join(", ")}`);
	for (let e = 1; e < n.length; e++) {
		let { row: i, error: a } = Eg(Dg(n[e]), r);
		if (a) {
			t.errors.push(`Row ${e + 1}: ${a}`);
			continue;
		}
		i && t.rows.push(i);
	}
	return t;
}
async function kg(e) {
	let t = {
		rows: [],
		errors: [],
		warnings: []
	}, n = new (await (import("./exceljs.min-DI2t47S_.js").then((e) => /* @__PURE__ */ Nt(e.default, 1)))).Workbook();
	await n.xlsx.load(e);
	let r = n.worksheets[0];
	if (!r) return t.errors.push("No worksheet found in the file."), t;
	let i = 1;
	for (; i <= r.rowCount && r.getRow(i).actualCellCount === 0;) i++;
	if (i > r.rowCount) return t.errors.push("Sheet is empty."), t;
	let a = r.getRow(i), o = [];
	a.eachCell({ includeEmpty: !0 }, (e, t) => {
		o[t - 1] = String(e.value ?? "");
	});
	let { mapped: s, unknownCols: c } = Tg(o);
	c.length && t.warnings.push(`Unknown columns ignored: ${c.join(", ")}`);
	for (let e = i + 1; e <= r.rowCount; e++) {
		let n = r.getRow(e);
		if (n.actualCellCount === 0) continue;
		let i = [];
		o.forEach((e, t) => {
			let r = n.getCell(t + 1).value;
			i[t] = r == null ? "" : typeof r == "object" && "text" in r ? String(r.text) : String(r);
		});
		let { row: a, error: c } = Eg(i, s);
		if (c) {
			t.errors.push(`Row ${e}: ${c}`);
			continue;
		}
		a && t.rows.push(a);
	}
	return t;
}
function Ag() {
	return [
		"hostname,ip,type,vendor,site,zone,rack,status,uplink",
		"fw-01,10.1.1.1,firewall,Palo Alto,Seoul,Edge,Rack-1,normal,",
		"sw-01,10.1.1.2,switch,Cisco,Seoul,Edge,Rack-1,normal,fw-01",
		"rt-01,10.1.1.3,router,Cisco,Seoul,Edge,Rack-1,normal,fw-01",
		"srv-01,10.1.1.10,server,Dell,Seoul,Compute,Rack-2,normal,sw-02",
		"srv-02,10.1.1.11,server,Dell,Seoul,Compute,Rack-2,warning,sw-02",
		"srv-03,10.1.1.12,server,HPE,Seoul,Compute,Rack-2,normal,sw-02",
		"sw-02,10.1.1.4,switch,Arista,Seoul,Compute,Rack-2,normal,sw-01",
		"db-01,10.1.2.10,database,Oracle,Seoul,Compute,Rack-3,normal,sw-03",
		"stg-01,10.1.2.20,storage,NetApp,Seoul,Compute,Rack-3,normal,sw-03",
		"sw-03,10.1.1.5,switch,Cisco,Seoul,Compute,Rack-3,normal,sw-01"
	].join("\n");
}
//#endregion
//#region src/components/ui/ImportPanel.vue?vue&type=script&setup=true&lang.ts
var jg = { class: "imp-modal" }, Mg = { class: "imp-body" }, Ng = { class: "imp-section" }, Pg = {
	key: 0,
	class: "file-name"
}, Fg = {
	key: 0,
	class: "imp-section"
}, Ig = {
	key: 0,
	class: "err-block"
}, Lg = {
	key: 0,
	class: "err-more"
}, Rg = {
	key: 1,
	class: "warn-block"
}, zg = {
	key: 2,
	class: "tbl-wrap"
}, Bg = { class: "tbl" }, Vg = {
	key: 0,
	class: "tbl-more"
}, Hg = {
	key: 1,
	class: "imp-section"
}, Ug = { class: "opt" }, Wg = {
	key: 0,
	class: "mode-warning"
}, Gg = ["disabled"], Kg = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "ImportPanel",
	setup(n) {
		let r = J(), i = q(), { rebuildAll: a } = iu(), u = S(null), f = S(""), p = S(!1), m = S(null), _ = S(!1), v = S(!1);
		function y() {
			r.showImport = !1;
		}
		async function x(e) {
			f.value = e.name;
			try {
				/\.xlsx$/i.test(e.name) ? m.value = await kg(await e.arrayBuffer()) : m.value = Og(await e.text());
			} catch (e) {
				m.value = {
					rows: [],
					errors: [`Failed to parse: ${e.message}`],
					warnings: []
				};
			}
		}
		function w(e) {
			let t = e.target.files?.[0];
			t && x(t);
		}
		function O(e) {
			p.value = !1;
			let t = e.dataTransfer?.files?.[0];
			t && x(t);
		}
		function k() {
			let e = new Blob([Ag()], { type: "text/csv" }), t = document.createElement("a");
			t.href = URL.createObjectURL(e), t.download = "topospace-template.csv", t.click(), URL.revokeObjectURL(t.href);
		}
		async function A() {
			let e = m.value;
			if (!(!e || !e.rows.length)) {
				if (r.mode !== "edit") {
					r.addToast("Switch to Edit mode before importing", "warning");
					return;
				}
				if (v.value = !0, _.value) {
					if (!confirm("Replace the current scene? This will remove existing devices, spaces, and links.")) {
						v.value = !1;
						return;
					}
					j();
				}
				try {
					let t = i.importTopology(e.rows);
					await h(), a(), r.addToast(`Imported ${t.devices} devices, ${t.spaces} spaces, ${t.links} links`, "success"), m.value = null, f.value = "", _.value = !1, r.showImport = !1;
				} catch (t) {
					let n = t instanceof Error ? t.message : String(t);
					m.value = {
						rows: e.rows,
						errors: [`Failed to import: ${n}`],
						warnings: e.warnings
					}, r.addToast("Import failed", "critical");
				} finally {
					v.value = !1;
				}
			}
		}
		function j() {
			i.replaceData({});
		}
		return (n, i) => (b(), o(t, { to: "body" }, [E(r).showImport ? (b(), c("div", {
			key: 0,
			class: "imp-overlay",
			onClick: F(y, ["self"])
		}, [l("div", jg, [l("div", { class: "imp-head" }, [
			i[4] ||= l("span", { class: "imp-title" }, "Import Devices & Topology", -1),
			l("button", {
				class: "text-btn",
				onClick: k
			}, " Download CSV template "),
			l("button", {
				class: "text-btn",
				onClick: y
			}, "Close")
		]), l("div", Mg, [
			l("section", Ng, [
				i[6] ||= l("div", { class: "step-title" }, "1. Select file", -1),
				l("div", {
					class: g(["drop-zone", { hover: p.value }]),
					onDragover: i[1] ||= F((e) => p.value = !0, ["prevent"]),
					onDragleave: i[2] ||= (e) => p.value = !1,
					onDrop: F(O, ["prevent"])
				}, [
					l("input", {
						ref_key: "fileInput",
						ref: u,
						type: "file",
						accept: ".csv,.xlsx",
						hidden: "",
						onChange: w
					}, null, 544),
					l("button", {
						class: "pick-btn",
						onClick: i[0] ||= (e) => u.value?.click()
					}, " Choose CSV / XLSX "),
					i[5] ||= l("span", { class: "drop-hint" }, "or drop a file here", -1),
					f.value ? (b(), c("span", Pg, T(f.value) + " · " + T(m.value?.rows.length ?? 0) + " rows", 1)) : s("", !0)
				], 34),
				i[7] ||= l("div", { class: "schema" }, [
					d(" Expected columns: "),
					l("code", null, "hostname"),
					d(", "),
					l("code", null, "ip"),
					d(", "),
					l("code", null, "type"),
					d(", "),
					l("code", null, "vendor"),
					d(", "),
					l("code", null, "building"),
					d(", "),
					l("code", null, "floor"),
					d(" (or legacy "),
					l("code", null, "site"),
					d("), "),
					l("code", null, "zone"),
					d(", "),
					l("code", null, "rack"),
					d(", "),
					l("code", null, "status"),
					d(", "),
					l("code", null, "uplink"),
					d(". "),
					l("span", { class: "req" }, "hostname"),
					d(" and "),
					l("span", { class: "req" }, "type"),
					d(" are required; "),
					l("code", null, "building"),
					d(" is optional and only wraps floors when supplied. ")
				], -1)
			]),
			m.value ? (b(), c("section", Fg, [
				i[9] ||= l("div", { class: "step-title" }, "2. Preview", -1),
				m.value.errors.length ? (b(), c("div", Ig, [(b(!0), c(e, null, C(m.value.errors.slice(0, 5), (e, t) => (b(), c("div", {
					key: t,
					class: "err-line"
				}, T(e), 1))), 128)), m.value.errors.length > 5 ? (b(), c("div", Lg, " … and " + T(m.value.errors.length - 5) + " more ", 1)) : s("", !0)])) : s("", !0),
				m.value.warnings.length ? (b(), c("div", Rg, [(b(!0), c(e, null, C(m.value.warnings, (e, t) => (b(), c("div", {
					key: t,
					class: "warn-line"
				}, T(e), 1))), 128))])) : s("", !0),
				m.value.rows.length ? (b(), c("div", zg, [l("table", Bg, [i[8] ||= l("thead", null, [l("tr", null, [
					l("th", null, "hostname"),
					l("th", null, "type"),
					l("th", null, "ip"),
					l("th", null, "building"),
					l("th", null, "floor"),
					l("th", null, "zone"),
					l("th", null, "rack"),
					l("th", null, "status"),
					l("th", null, "uplink")
				])], -1), l("tbody", null, [(b(!0), c(e, null, C(m.value.rows.slice(0, 12), (e, t) => (b(), c("tr", { key: t }, [
					l("td", null, T(e.hostname), 1),
					l("td", null, T(e.type), 1),
					l("td", null, T(e.ip ?? ""), 1),
					l("td", null, T(e.building ?? ""), 1),
					l("td", null, T(e.floor ?? e.site ?? ""), 1),
					l("td", null, T(e.zone ?? ""), 1),
					l("td", null, T(e.rack ?? ""), 1),
					l("td", null, T(e.status ?? ""), 1),
					l("td", null, T(e.uplink ?? ""), 1)
				]))), 128))])]), m.value.rows.length > 12 ? (b(), c("div", Vg, " … " + T(m.value.rows.length - 12) + " more rows ", 1)) : s("", !0)])) : s("", !0)
			])) : s("", !0),
			m.value && m.value.rows.length ? (b(), c("section", Hg, [
				i[11] ||= l("div", { class: "step-title" }, "3. Import options", -1),
				l("label", Ug, [N(l("input", {
					"onUpdate:modelValue": i[3] ||= (e) => _.value = e,
					type: "checkbox"
				}, null, 512), [[D, _.value]]), i[10] ||= l("span", null, "Replace current scene (clear existing devices, spaces, links)", -1)]),
				E(r).mode === "edit" ? s("", !0) : (b(), c("div", Wg, " Switch to Edit mode before importing topology data. ")),
				l("button", {
					class: "run-btn",
					disabled: E(r).mode !== "edit" || v.value,
					onClick: A
				}, " Import " + T(m.value.rows.length) + " devices ", 9, Gg)
			])) : s("", !0)
		])])])) : s("", !0)]));
	}
}), [["__scopeId", "data-v-3ad773c9"]]), qg = {
	class: "confirm-modal",
	role: "alertdialog",
	"aria-modal": "true"
}, Jg = { class: "confirm-message" }, Yg = { class: "confirm-actions" }, Xg = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "ConfirmDialog",
	setup(e) {
		let r = J(), i = S(null);
		return j(() => r.confirmDialog, (e) => {
			e && h(() => i.value?.focus());
		}), (e, a) => (b(), o(t, { to: "body" }, [f(n, { name: "confirm-fade" }, {
			default: M(() => [E(r).confirmDialog ? (b(), c("div", {
				key: 0,
				class: "confirm-overlay",
				onClick: a[2] ||= F((e) => E(r).resolveConfirm(!1), ["self"]),
				onKeydown: a[3] ||= P((e) => E(r).resolveConfirm(!1), ["escape"])
			}, [l("div", qg, [l("p", Jg, T(E(r).confirmDialog.message), 1), l("div", Yg, [l("button", {
				class: "confirm-btn cancel",
				onClick: a[0] ||= (e) => E(r).resolveConfirm(!1)
			}, " Cancel "), l("button", {
				ref_key: "confirmBtn",
				ref: i,
				class: "confirm-btn danger",
				onClick: a[1] ||= (e) => E(r).resolveConfirm(!0)
			}, T(E(r).confirmDialog.confirmLabel), 513)])])], 32)) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-38868ced"]]), Zg = {
	key: 0,
	class: "vs-wrap"
}, Qg = { class: "vs-crumb" }, $g = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "ViewSwitcher",
	setup(e) {
		let t = J(), n = q(), r = new Set([
			"building",
			"floor",
			"site"
		]), a = i(() => n.rootSpaces.length > 1 ? !0 : n.rootSpaces.some((e) => n.childSpaces(e.id).some((e) => r.has(e.type)))), o = i(() => t.viewMode === "3d" && a.value), u = i(() => {
			let e = t.activeRootSpaceId;
			if (!e) return "";
			let r = n.spaces.get(e);
			if (!r) return "";
			let i = r.parentId ? n.spaces.get(r.parentId) : null;
			return i ? `${i.name} › ${r.name}` : r.name;
		});
		return (e, n) => o.value ? (b(), c("div", Zg, [l("span", Qg, T(u.value), 1), l("button", {
			class: "vs-btn",
			title: "Back to campus overview",
			onClick: n[0] ||= (e) => E(t).showOverview()
		}, " 🗺 Campus ")])) : s("", !0);
	}
}), [["__scopeId", "data-v-c1dcb0ba"]]), e_ = ["aria-expanded"], t_ = { "aria-hidden": "true" }, n_ = {
	key: 0,
	class: "legend-body"
}, r_ = ["data-status"], i_ = ["aria-pressed"], a_ = {
	class: "palette-swatches",
	"aria-hidden": "true"
}, o_ = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "StatusLegend",
	setup(t) {
		let n = J(), r = q(), { toggleColorblindMode: a } = iu(), o = S(null), u = S(null), f = S(!1), p = i(() => u.value ?? !f.value), m;
		y(() => {
			let e = o.value?.parentElement;
			e && (f.value = e.clientHeight < 560, m = new ResizeObserver(() => {
				f.value = e.clientHeight < 560;
			}), m.observe(e));
		}), v(() => m?.disconnect());
		let h = [
			"critical",
			"warning",
			"normal",
			"offline",
			"unknown",
			"maintenance",
			"acknowledged",
			"stale"
		], g = i(() => {
			let e = Object.fromEntries(h.map((e) => [e, 0]));
			for (let t of r.scopedDevices(n.viewMode === "3d" ? n.activeRootSpaceId : null)) e[t.status ?? "unknown"]++;
			return e;
		});
		return (t, r) => (b(), c("section", {
			ref_key: "root",
			ref: o,
			class: "status-legend",
			"aria-label": "Status legend"
		}, [
			l("button", {
				class: "legend-heading",
				"aria-expanded": p.value,
				onClick: r[0] ||= (e) => u.value = !p.value
			}, [l("span", null, [r[2] ||= d("Status legend ", -1), l("small", null, T(E(n).viewMode === "3d" ? "Current floor" : "All sites"), 1)]), l("span", t_, T(p.value ? "−" : "+"), 1)], 8, e_),
			p.value ? (b(), c("div", n_, [l("ul", null, [(b(), c(e, null, C(h, (e) => l("li", {
				key: e,
				"data-status": e
			}, [
				l("span", {
					class: "legend-icon",
					style: _({ color: E(Mn)[e] }),
					"aria-hidden": "true"
				}, T(E(Bn)[e] || "●"), 5),
				l("span", null, T(E(zn)[e]), 1),
				l("b", null, T(g.value[e]), 1)
			], 8, r_)), 64))]), r[3] ||= l("p", { class: "legend-note" }, "Names adapt to zoom. Select a rack to inspect.", -1)])) : s("", !0),
			l("button", {
				class: "palette-toggle",
				"aria-pressed": E(n).colorblindMode,
				onClick: r[1] ||= (...e) => E(a) && E(a)(...e)
			}, [l("span", a_, [(b(), c(e, null, C([
				"normal",
				"warning",
				"critical"
			], (e) => l("i", {
				key: e,
				style: _({ background: E(Mn)[e] })
			}, null, 4)), 64))]), d(" " + T(E(n).colorblindMode ? "Colorblind palette on" : "Standard palette"), 1)], 8, i_)
		], 512));
	}
}), [["__scopeId", "data-v-b61e96b3"]]), s_ = { class: "app" }, c_ = { class: "workspace" }, l_ = {
	ref: "canvasWrap",
	class: "canvas-wrap"
}, u_ = {
	key: 0,
	class: "blast-banner"
}, d_ = { class: "blast-id" }, f_ = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "App",
	setup(e) {
		let t = J(), r = q(), { saveCurrentView: a, loadSavedView: u, focusVirtualNode: p, onTimelineScrub: m, getScene: h, timeline: v } = iu(), y = S(null), x = S(!1), C = S(null), w = S(null);
		function D() {
			let e = h();
			C.value = e.camera, w.value = e.controls, x.value = !0;
		}
		function O(e) {
			t.enterScope(e);
		}
		function k(e) {
			a(e);
		}
		function A(e) {
			u(e);
		}
		function N(e) {
			p(e);
		}
		let P = i(() => r.devices.get(t.blastSourceId ?? "")?.hostname ?? t.blastSourceId), F = i(() => t.showAlertPanel || t.showCustomTypes || t.showBackgroundPanel || t.showRackServerList || t.showSpaceTree || t.showUnmapped), I = i(() => !!t.selectedDeviceId || !!t.selectedLinkId || !!t.selectedSpaceId || t.showSavedViews || t.showChangeLog || t.showVirtualNodes), L = {
			left: {
				min: 220,
				max: 560,
				default: 280
			},
			right: {
				min: 260,
				max: 560,
				default: 290
			}
		};
		function R(e) {
			let { min: t, max: n, default: r } = L[e], i = parseFloat(localStorage.getItem(`topospace.dockWidth.${e}`) ?? "");
			return Number.isFinite(i) && i >= t && i <= n ? i : r;
		}
		let z = S(R("left")), B = S(R("right")), V = S(null);
		function H(e, t) {
			t.preventDefault(), V.value = e;
			let n = t.clientX, r = e === "left" ? z.value : B.value, { min: i, max: a } = L[e];
			function o(t) {
				let o = e === "left" ? t.clientX - n : n - t.clientX, s = Math.min(a, Math.max(i, Math.round(r + o)));
				e === "left" ? z.value = s : B.value = s;
			}
			function s() {
				window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s), V.value = null, localStorage.setItem(`topospace.dockWidth.${e}`, String(e === "left" ? z.value : B.value));
			}
			window.addEventListener("pointermove", o), window.addEventListener("pointerup", s, { once: !0 });
		}
		return j(() => t.fontScale, (e) => {
			document.documentElement.style.setProperty("--ui-fs", String(e));
		}, { immediate: !0 }), (e, r) => (b(), c("div", s_, [
			f(hu),
			f(Mu),
			l("div", c_, [
				F.value ? (b(), c("aside", {
					key: 0,
					class: "left-dock",
					style: _({ width: z.value + "px" })
				}, [E(t).showAlertPanel ? (b(), o(Qu, { key: 0 })) : E(t).showCustomTypes ? (b(), o(Bd, { key: 1 })) : E(t).showBackgroundPanel ? (b(), o(Cf, { key: 2 })) : E(t).showRackServerList ? (b(), o(Rf, { key: 3 })) : E(t).showSpaceTree ? (b(), o(tp, { key: 4 })) : E(t).showUnmapped ? (b(), o(bp, { key: 5 })) : s("", !0), l("div", {
					class: g(["dock-resizer dock-resizer--left", { "dock-resizer--active": V.value === "left" }]),
					onPointerdown: r[0] ||= (e) => H("left", e)
				}, null, 34)], 4)) : s("", !0),
				l("div", l_, [
					E(t).viewMode === "2d" ? (b(), o(rg, {
						key: 0,
						onEnterFloor: O
					})) : (b(), o(Yh, {
						key: 1,
						ref_key: "sceneRef",
						ref: y,
						onSceneReady: D
					}, null, 512)),
					E(t).viewMode === "3d" ? (b(), o($g, { key: 2 })) : s("", !0),
					f(o_),
					E(t).viewMode === "3d" && x.value && E(t).showMinimap ? (b(), o(Nh, {
						key: 3,
						camera: C.value,
						controls: w.value
					}, null, 8, ["camera", "controls"])) : s("", !0),
					E(t).viewMode === "3d" && x.value ? (b(), o(og, { key: 4 })) : s("", !0)
				], 512),
				I.value ? (b(), c("aside", {
					key: 1,
					class: "right-dock",
					style: _({ width: B.value + "px" })
				}, [
					l("div", {
						class: g(["dock-resizer dock-resizer--right", { "dock-resizer--active": V.value === "right" }]),
						onPointerdown: r[1] ||= (e) => H("right", e)
					}, null, 34),
					E(t).selectedDeviceId ? (b(), o(lm, { key: 0 })) : E(t).selectedLinkId ? (b(), o(Tm, { key: 1 })) : E(t).selectedSpaceId ? (b(), o(Gm, { key: 2 })) : s("", !0),
					E(t).showSavedViews ? (b(), o(rh, {
						key: 3,
						onSaveView: k,
						onLoadView: A
					})) : s("", !0),
					E(t).showChangeLog ? (b(), o(uh, { key: 4 })) : s("", !0),
					E(t).showVirtualNodes ? (b(), o(bh, {
						key: 5,
						onSelectNode: N
					})) : s("", !0)
				], 4)) : s("", !0)
			]),
			E(t).showTimeline ? (b(), o(Oh, {
				key: 0,
				timeline: E(v),
				onScrub: E(m),
				onLive: r[2] ||= (e) => E(t).timelineFrameIdx = -1
			}, null, 8, ["timeline", "onScrub"])) : s("", !0),
			f(cg),
			f(fg),
			f(yg),
			f(Kg),
			f(Xg),
			f(n, { name: "fade" }, {
				default: M(() => [E(t).blastSourceId ? (b(), c("div", u_, [
					r[4] ||= d(" Impact radius ", -1),
					l("span", d_, T(P.value), 1),
					r[5] ||= l("span", { class: "blast-legend" }, [l("span", { class: "blast-legend-item" }, [l("span", { class: "blast-dot blast-dot--hop1" }), d("1 hop")]), l("span", { class: "blast-legend-item" }, [l("span", { class: "blast-dot blast-dot--hop2" }), d("2 hop")])], -1),
					l("button", {
						class: "blast-close",
						onClick: r[3] ||= (e) => {
							E(t).blastSourceId = null, E(t).select(null);
						}
					}, " Close ")
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-748de05f"]]);
//#endregion
//#region src/index.ts
function p_(e) {
	if (!e.container) throw Error("createNmsEditor requires a container HTMLElement.");
	let t = e.container;
	ru(e);
	let n = m_(e), r = a(f_), i = I();
	r.provide(eu, e), r.use(i), r.config.errorHandler = (t) => {
		let n = t instanceof Error ? t : Error(String(t));
		e.onError?.(n, { phase: "vue" });
	}, r.mount(n);
	let o = q(i), s = J(i);
	return {
		destroy() {
			r.unmount(), e.shadowDom && t.shadowRoot?.replaceChildren(), ru({});
		},
		upsertDevices(e) {
			o.upsertDevices(e);
		},
		removeDevices(e) {
			o.removeDevices(e);
		},
		upsertLinks(e) {
			o.upsertLinks(e);
		},
		removeLinks(e) {
			o.removeLinks(e);
		},
		upsertSpaces(e) {
			o.upsertSpaces(e);
		},
		removeSpaces(e) {
			o.removeSpaces(e);
		},
		upsertInterfaces(e) {
			o.upsertInterfaces(e);
		},
		upsertVirtualNodes(e) {
			o.upsertVirtualNodes(e);
		},
		removeVirtualNodes(e) {
			o.removeVirtualNodes(e);
		},
		setOperatorState(e, t) {
			o.setOperatorState(e, t);
		},
		setConnectionStatus(e, t) {
			s.setConnectionStatus(e, t);
		},
		notify(e, t) {
			s.addToast(e, t);
		},
		selectDevice(e) {
			s.select(e ? {
				type: "device",
				id: e
			} : null);
		},
		applyFilter(e) {
			s.setFilter(e);
		},
		setMode(e) {
			s.setMode(e);
		},
		async save() {
			await e.onSave?.(o.exportSnapshot());
		},
		exportSnapshot: o.exportSnapshot,
		importSnapshot: o.importSnapshot,
		getDevice: o.getDevice,
		autoLayout: o.autoLayout,
		cancelAutoLayout: o.cancelAutoLayout
	};
}
function m_(e) {
	let t = e.container;
	if (!e.shadowDom) return t;
	let n = t.shadowRoot ?? t.attachShadow({ mode: "open" });
	if (n.replaceChildren(), e.stylesheetUrl) {
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e.stylesheetUrl, e.styleNonce && (t.nonce = e.styleNonce), n.appendChild(t);
	}
	let r = document.createElement("div");
	return r.id = "topospace-shadow-root", r.style.width = "100%", r.style.height = "100%", n.appendChild(r), r;
}
//#endregion
export { p_ as createNmsEditor, Pt as n, jt as t };
