import { Fragment as e, Teleport as t, Transition as n, TransitionGroup as r, computed as i, createApp as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createStaticVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as m, nextTick as h, normalizeClass as g, normalizeStyle as _, onBeforeUnmount as v, onMounted as y, openBlock as b, reactive as x, ref as S, renderList as C, resolveComponent as w, toDisplayString as T, unref as E, vModelCheckbox as D, vModelRadio as O, vModelSelect as k, vModelText as A, watch as j, withCtx as M, withDirectives as N, withKeys as P, withModifiers as F } from "vue";
import { createPinia as ee, defineStore as I } from "pinia";
import * as L from "three";
import { AnimationClip as R, BackSide as z, BatchedMesh as B, Bone as te, Box3 as V, BufferAttribute as ne, BufferGeometry as re, ClampToEdgeWrapping as ie, Color as ae, ColorManagement as H, Controls as oe, DirectionalLight as se, DoubleSide as ce, FileLoader as le, Float32BufferAttribute as ue, FrontSide as de, Group as fe, ImageBitmapLoader as pe, InstancedBufferAttribute as me, InstancedBufferGeometry as he, InstancedInterleavedBuffer as ge, InstancedMesh as _e, InterleavedBuffer as ve, InterleavedBufferAttribute as ye, Interpolant as be, InterpolateDiscrete as xe, InterpolateLinear as Se, Line as Ce, Line3 as we, LineBasicMaterial as Te, LineLoop as Ee, LineSegments as De, LinearFilter as Oe, LinearMipmapLinearFilter as ke, LinearMipmapNearestFilter as Ae, LinearSRGBColorSpace as je, Loader as Me, LoaderUtils as Ne, MOUSE as Pe, Material as Fe, MathUtils as Ie, Matrix4 as Le, Mesh as Re, MeshBasicMaterial as ze, MeshPhysicalMaterial as Be, MeshStandardMaterial as Ve, MirroredRepeatWrapping as He, NearestFilter as Ue, NearestMipmapLinearFilter as We, NearestMipmapNearestFilter as Ge, NumberKeyframeTrack as Ke, Object3D as qe, OrthographicCamera as Je, PerspectiveCamera as Ye, Plane as Xe, PointLight as Ze, Points as Qe, PointsMaterial as $e, PropertyBinding as et, Quaternion as tt, QuaternionKeyframeTrack as nt, REVISION as rt, Ray as it, RepeatWrapping as at, SRGBColorSpace as ot, ShaderLib as st, ShaderMaterial as ct, Skeleton as lt, SkinnedMesh as ut, Sphere as dt, Spherical as ft, SpotLight as pt, TOUCH as mt, Texture as ht, TextureLoader as gt, Triangle as _t, TriangleFanDrawMode as vt, TriangleStripDrawMode as yt, TrianglesDrawMode as bt, UniformsLib as xt, UniformsUtils as St, Vector2 as U, Vector3 as W, Vector4 as Ct, VectorKeyframeTrack as wt, WireframeGeometry as Tt } from "three";
//#region \0rolldown/runtime.js
var Et = Object.create, Dt = Object.defineProperty, Ot = Object.getOwnPropertyDescriptor, kt = Object.getOwnPropertyNames, At = Object.getPrototypeOf, jt = Object.prototype.hasOwnProperty, Mt = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), Nt = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = kt(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !jt.call(e, s) && s !== n && Dt(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = Ot(t, s)) || r.enumerable
	});
	return e;
}, Pt = (e, t, n) => (n = e == null ? {} : Et(At(e)), Nt(t || !e || !e.__esModule ? Dt(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), Ft = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), It = {
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
}, Lt = {
	search: "",
	status: [],
	type: [],
	spaceId: null,
	tags: [],
	showUnmapped: !0
}, Rt = class {
	features;
	resolver;
	mode = "view";
	constructor(e = {}, t) {
		this.features = {
			...It,
			...e
		}, this.resolver = t ?? (() => !0);
	}
	setMode(e) {
		this.mode = e;
	}
	setFeatures(e) {
		this.features = {
			...It,
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
function zt() {
	return Math.random().toString(36).slice(2, 10);
}
function Bt(e, t) {
	return Math.random() * (t - e) + e;
}
function Vt(e, t) {
	return Math.floor(Bt(e, t + 1));
}
function Ht(e) {
	return e[Math.floor(Math.random() * e.length)];
}
var Ut = [
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
], Wt = {
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
function Gt(e, t, n) {
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
		ip: n === 0 ? `10.${Vt(1, 254)}.${Vt(1, 254)}.${Vt(1, 254)}` : void 0,
		status: Ht([
			"up",
			"up",
			"up",
			"down",
			"unknown"
		]),
		speed: Ht([
			100,
			1e3,
			1e4,
			25e3
		]),
		trafficIn: Bt(0, 900),
		trafficOut: Bt(0, 500),
		errors: Math.random() > .85 ? Vt(1, 50) : 0,
		discards: Math.random() > .9 ? Vt(1, 20) : 0
	}));
}
function Kt(e, t, n, r) {
	let i = `dev-${zt()}`, a = Ht(Wt[e]), o = Ht(Ut);
	return {
		device: {
			id: i,
			source: Ht([
				"zabbix",
				"prtg",
				"manual",
				"openNMS"
			]),
			externalId: `ext-${zt()}`,
			hostname: `${e.slice(0, 3)}-${t.slice(-2)}-${String(r).padStart(2, "0")}`,
			ip: `10.${Vt(1, 4)}.${Vt(1, 254)}.${Vt(1, 254)}`,
			normalizedType: e,
			vendor: a,
			model: `${a}-Model-${Vt(100, 999)}`,
			status: o,
			metrics: {
				cpu: Bt(5, 98),
				memory: Bt(20, 95),
				disk: Bt(10, 90),
				networkIn: Bt(10, 950),
				networkOut: Bt(5, 500),
				temperature: Bt(35, 78)
			},
			siteId: n,
			firstSeenAt: (/* @__PURE__ */ new Date(Date.now() - Bt(0, 365) * 864e5)).toISOString(),
			lastSeenAt: (/* @__PURE__ */ new Date()).toISOString(),
			syncState: "active"
		},
		interfaces: Gt(i, e, e === "switch" ? 8 : e === "router" ? 6 : e === "firewall" ? 4 : 2)
	};
}
function qt() {
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
					let { device: a, interfaces: s } = Kt(e, d, o, r);
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
						id: `link-${zt()}`,
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
				id: `link-${zt()}`,
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
		id: `link-${zt()}`,
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
		let { device: n } = Kt(e, "unmapped", "building-seoul", t);
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
//#region src/stores/editor.ts
var G = I("editor", () => {
	let e = new Rt({
		topologyEdit: !0,
		layoutEdit: !0,
		spaceEdit: !0,
		annotationEdit: !0,
		import: !0,
		backgroundEdit: !0,
		chaosSimulator: !0
	}), t, n, r = S(/* @__PURE__ */ new Map()), a = S(/* @__PURE__ */ new Map()), o = S(/* @__PURE__ */ new Map()), s = S(/* @__PURE__ */ new Map()), c = S(/* @__PURE__ */ new Map()), l = S([]), u = S(/* @__PURE__ */ new Map()), d = S(/* @__PURE__ */ new Map()), f = S([]), p = S([]);
	function m(r) {
		r.mode && e.setMode(r.mode), r.features && e.setFeatures(r.features), r.permissionResolver && e.setResolver(r.permissionResolver), t = r.onPermissionDenied, n = r.onChange;
	}
	function h(t) {
		e.setMode(t);
	}
	function g(t, n) {
		return e.can(t, n);
	}
	function _(t) {
		return e.hasFeature(t);
	}
	function v(e, n) {
		t?.({
			action: e,
			target: n
		});
	}
	function y(e, t) {
		let n = g(e, t);
		return n || v(e, t), n;
	}
	function b(e, t) {
		n?.({
			type: e,
			target: t,
			source: "user",
			timestamp: Date.now()
		});
	}
	let x = i(() => {
		let e = /* @__PURE__ */ new Set();
		return o.value.forEach((t) => {
			(t.mappingStatus === "mapped" || t.mappingStatus === "auto_mapped") && e.add(t.rawDeviceId);
		}), e;
	}), C = i(() => [...r.value.values()].filter((e) => e.status === "critical").length), w = i(() => [...r.value.values()].filter((e) => e.status === "warning").length), T = i(() => {
		let e = /* @__PURE__ */ new Map();
		return o.value.forEach((t) => {
			if (!t.primarySpaceId) return;
			let n = r.value.get(t.rawDeviceId);
			n && (e.has(t.primarySpaceId) || e.set(t.primarySpaceId, []), e.get(t.primarySpaceId).push(n));
		}), e;
	}), E = i(() => {
		let e = /* @__PURE__ */ new Map();
		return c.value.forEach((t) => {
			e.has(t.rawDeviceId) || e.set(t.rawDeviceId, []), e.get(t.rawDeviceId).push(t);
		}), e;
	}), D = i(() => [...a.value.values()].filter((e) => e.type === "rack")), O = i(() => [...a.value.values()]), k = i(() => [...a.value.values()].filter((e) => !e.parentId && !e.archived));
	function A(e) {
		return [...a.value.values()].filter((t) => t.parentId === e && !t.archived);
	}
	function j(e) {
		let t = new Set([e]), n = [e];
		for (; n.length;) A(n.shift()).forEach((e) => {
			t.has(e.id) || (t.add(e.id), n.push(e.id));
		});
		return t;
	}
	function M(e) {
		if (!e) return [...a.value.values()].filter((e) => !e.archived);
		let t = j(e);
		return [...a.value.values()].filter((e) => t.has(e.id) && !e.archived);
	}
	function N(e) {
		if (!e) return new Set(r.value.keys());
		let t = /* @__PURE__ */ new Set();
		return j(e).forEach((e) => {
			(T.value.get(e) ?? []).forEach((e) => t.add(e.id));
		}), t;
	}
	function P(e) {
		let t = N(e);
		return [...r.value.values()].filter((e) => t.has(e.id));
	}
	function F(e) {
		return P(e).filter((e) => e.status === "critical").length;
	}
	function ee(e) {
		return P(e).filter((e) => e.status === "warning").length;
	}
	function I(e) {
		if (!e) return [...s.value.values()];
		let t = N(e);
		return [...s.value.values()].filter((e) => t.has(e.sourceDeviceId) && t.has(e.targetDeviceId));
	}
	function L(e) {
		if (!e) return [...d.value.values()];
		let t = j(e);
		return [...d.value.values()].filter((e) => t.has(e.spaceId));
	}
	let R = new Set([
		"building",
		"floor",
		"site"
	]);
	function z(e) {
		let t = a.value.get(e);
		for (; t && !R.has(t.type);) t = t.parentId ? a.value.get(t.parentId) : void 0;
		if (!t) return null;
		let n = t.id;
		for (;;) {
			let e = A(n).find((e) => R.has(e.type));
			if (!e) return n;
			n = e.id;
		}
	}
	function B(e) {
		let t = Infinity, n = -Infinity, r = Infinity, i = -Infinity;
		return M(e).forEach((e) => {
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
	function te() {
		let e = qt(), t = [...e.devices, ...e.unmappedDevices];
		r.value = new Map(t.map((e) => [e.id, e])), a.value = new Map(e.spaces.map((e) => [e.id, e])), o.value = new Map(e.deviceMappings.map((e) => [e.id, e])), s.value = new Map(e.links.map((e) => [e.id, e])), c.value = new Map(e.interfaces.map((e) => [e.id, e])), l.value = e.unmappedDevices;
	}
	function V(e) {
		let t = [...e.devices ?? [], ...e.unmappedDevices ?? []];
		r.value = new Map(t.map((e) => [e.id, e])), a.value = new Map((e.spaces ?? []).map((e) => [e.id, e])), o.value = new Map((e.deviceMappings ?? []).map((e) => [e.id, e])), s.value = new Map((e.links ?? []).map((e) => [e.id, e])), c.value = new Map((e.interfaces ?? []).map((e) => [e.id, e])), l.value = [...e.unmappedDevices ?? []], u.value = new Map((e.virtualNodes ?? []).map((e) => [e.id, e])), d.value = new Map((e.backgroundObjects ?? []).map((e) => [e.id, e]));
	}
	function ne(e, t, n) {
		let i = r.value.get(e);
		i && (i.status = t, n && Object.assign(i.metrics ??= {}, n));
	}
	function re(e, t) {
		let n = s.value.get(e);
		n && (n.status = t);
	}
	function ie(e) {
		e.forEach((e) => {
			r.value.has(e.id) || l.value.push(e), r.value.set(e.id, e);
		});
	}
	function ae(e) {
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
		return r.value.set(t, n), l.value.push(n), Oe("device.add", `Device added (manual): ${e.hostname}`), n;
	}
	function H(e) {
		y("space:create", {
			id: e.id,
			spaceId: e.id
		}) && (a.value.set(e.id, e), b("space:create", {
			id: e.id,
			type: "space"
		}));
	}
	function oe(e, t) {
		if (!y("space:update", {
			id: e,
			spaceId: e
		})) return;
		let n = a.value.get(e);
		n && Object.assign(n, t), b("space:update", {
			id: e,
			type: "space"
		});
	}
	function se(e) {
		if (!y("space:delete", {
			id: e,
			spaceId: e
		})) return;
		let t = a.value.get(e);
		t && (t.archived = !0), b("space:delete", {
			id: e,
			type: "space"
		});
	}
	function ce(e, t, n, r) {
		if (!y("device:map", {
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
		o.value.set(i, a), l.value = l.value.filter((t) => t.id !== e), b("device:map", {
			id: e,
			type: "device"
		});
	}
	function le(e) {
		if (!y("device:unmap", { id: e })) return;
		let t = [...o.value.entries()].find(([, t]) => t.rawDeviceId === e);
		if (!t) return;
		let [n, i] = t;
		i.mappingStatus = "unmapped", i.primarySpaceId = void 0;
		let a = r.value.get(e);
		a && !l.value.find((t) => t.id === e) && l.value.push(a), o.value.delete(n), b("device:unmap", {
			id: e,
			type: "device"
		});
	}
	function ue(e, t) {
		if (!y("annotation:update", { id: e })) return;
		let n = [...o.value.values()].find((t) => t.rawDeviceId === e);
		n && Object.assign(n, t), b("annotation:update", {
			id: e,
			type: "device"
		});
	}
	function de(e, t) {
		if (!y("annotation:update", { id: e })) return;
		let n = ve(e);
		n && (n.visualType = t), b("annotation:update", {
			id: e,
			type: "device"
		});
	}
	function fe(e, t = "operator") {
		if (!y("annotation:update", { id: e })) return;
		let n = ve(e);
		n && (n.operatorState = {
			...n.operatorState,
			acknowledged: !0,
			acknowledgedBy: t,
			acknowledgedAt: (/* @__PURE__ */ new Date()).toISOString()
		}), Oe("device.ack", `Acknowledged: ${r.value.get(e)?.hostname ?? e}`), b("annotation:update", {
			id: e,
			type: "device"
		});
	}
	function pe(e) {
		if (!y("annotation:update", { id: e })) return;
		let t = ve(e);
		t && t.operatorState && (t.operatorState = {
			...t.operatorState,
			acknowledged: !1,
			acknowledgedBy: void 0,
			acknowledgedAt: void 0
		}), b("annotation:update", {
			id: e,
			type: "device"
		});
	}
	function me(e, t) {
		if (!y("annotation:update", { id: e })) return;
		let n = ve(e);
		n && (n.operatorState = {
			...n.operatorState,
			assignedTo: t || void 0,
			assignedAt: t ? (/* @__PURE__ */ new Date()).toISOString() : void 0
		}), Oe("device.assign", t ? `Assigned ${r.value.get(e)?.hostname ?? e} to ${t}` : `Unassigned ${r.value.get(e)?.hostname ?? e}`), b("annotation:update", {
			id: e,
			type: "device"
		});
	}
	function he(e) {
		y("topology:createLink", { id: e.id }) && (s.value.set(e.id, e), b("topology:createLink", {
			id: e.id,
			type: "link"
		}));
	}
	function ge(e, t) {
		if (!y("topology:updateLink", { id: e })) return;
		let n = s.value.get(e);
		n && Object.assign(n, t), b("topology:updateLink", {
			id: e,
			type: "link"
		});
	}
	function _e(e) {
		y("topology:deleteLink", { id: e }) && (s.value.delete(e), b("topology:deleteLink", {
			id: e,
			type: "link"
		}));
	}
	function ve(e) {
		return [...o.value.values()].find((t) => t.rawDeviceId === e);
	}
	function ye(e) {
		let t = r.value.get(e);
		return t ? Le(t) : void 0;
	}
	function be(e) {
		y("virtualNode:create", { id: e.id }) && (u.value.set(e.id, e), b("virtualNode:create", {
			id: e.id,
			type: "virtualNode"
		}));
	}
	function xe(e) {
		y("virtualNode:delete", { id: e }) && (u.value.delete(e), b("virtualNode:delete", {
			id: e,
			type: "virtualNode"
		}));
	}
	function Se(e, t) {
		if (!y("virtualNode:update", { id: e })) return;
		let n = u.value.get(e);
		n && Object.assign(n, t), b("virtualNode:update", {
			id: e,
			type: "virtualNode"
		});
	}
	function Ce(e) {
		y("background:create", {
			id: e.id,
			spaceId: e.spaceId
		}) && (d.value.set(e.id, e), b("background:create", {
			id: e.id,
			type: "background"
		}));
	}
	function we(e) {
		y("background:delete", { id: e }) && (d.value.delete(e), b("background:delete", {
			id: e,
			type: "background"
		}));
	}
	function Te(e, t) {
		if (!y("background:update", { id: e })) return;
		let n = d.value.get(e);
		n && Object.assign(n, t), b("background:update", {
			id: e,
			type: "background"
		});
	}
	function Ee(e) {
		f.value.unshift(e), f.value.length > 20 && f.value.pop();
	}
	function De(e) {
		let t = f.value.findIndex((t) => t.id === e);
		t >= 0 && f.value.splice(t, 1);
	}
	function Oe(e, t) {
		p.value.unshift({
			id: Math.random().toString(36).slice(2),
			type: e,
			msg: t,
			ts: (/* @__PURE__ */ new Date()).toLocaleTimeString()
		}), p.value.length > 100 && p.value.pop();
	}
	function ke() {
		return JSON.stringify(p.value, null, 2);
	}
	function Ae(e) {
		if (!y("import")) return {
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
			let t = je(e), n = f.get(t);
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
			let f = `floor-${je(e)}-${u}`, m = [...s.entries()].map(([e, t]) => {
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
				let h = `${f}-zone-${je(t)}-${m}`, g = v + u / 2;
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
					color: Me(m)
				};
				a.value.set(_.id, _), i.push(_);
				let y = g - u / 2 + 4 / 2;
				s.forEach(({ rackName: t, devs: s, w: u, d: f, rows: p }, m) => {
					let g = `${h}-rack-${je(t)}-${m}`, _ = y + u / 2;
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
		}), Oe("import", `Imported ${c.length} devices, ${i.length} spaces, ${u.length} links`), {
			devices: c.length,
			spaces: i.length,
			links: u.length
		};
	}
	function je(e) {
		return e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "x";
	}
	function Me(e) {
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
	function Ne() {
		return {
			version: "2.0",
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			spaces: [...a.value.values()],
			deviceMappings: [...o.value.values()],
			manualLinks: [...s.value.values()].filter((e) => e.source === "manual"),
			backgroundObjects: [...d.value.values()]
		};
	}
	function Pe(e) {
		if (!y("import")) return;
		let t = Fe(e);
		t.spaces.forEach((e) => a.value.set(e.id, e)), t.deviceMappings.forEach((e) => o.value.set(e.id, e)), t.manualLinks.forEach((e) => s.value.set(e.id, e)), (t.backgroundObjects ?? []).forEach((e) => d.value.set(e.id, e)), l.value = l.value.filter((e) => !t.deviceMappings.find((t) => t.rawDeviceId === e.id && t.mappingStatus === "mapped"));
	}
	function Fe(e) {
		return Ie(e);
	}
	function Ie(e) {
		if (Array.isArray(e)) return e.map(Ie);
		if (!e || typeof e != "object") return e;
		let t = {};
		return Object.entries(e).forEach(([e, n]) => {
			e === "__proto__" || e === "constructor" || e === "prototype" || (t[e] = Ie(n));
		}), t;
	}
	function Le(e) {
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
		unmappedDevices: l,
		mappedDeviceIds: x,
		criticalCount: C,
		warningCount: w,
		devicesBySpace: T,
		interfacesByDevice: E,
		rackSpaces: D,
		allSpacesList: O,
		rootSpaces: k,
		childSpaces: A,
		descendantSpaceIds: j,
		scopedSpaces: M,
		scopedDeviceIds: N,
		scopedDevices: P,
		scopedLinks: I,
		scopedBounds: B,
		scopedBackgroundObjects: L,
		scopedCriticalCount: F,
		scopedWarningCount: ee,
		resolveLeafScope: z,
		configureSecurity: m,
		setEditorMode: h,
		can: g,
		hasFeature: _,
		loadMockData: te,
		replaceData: V,
		updateDeviceStatus: ne,
		updateLinkStatus: re,
		upsertDevices: ie,
		addManualDevice: ae,
		importTopology: Ae,
		addSpace: H,
		updateSpace: oe,
		archiveSpace: se,
		mapDevice: ce,
		unmapDevice: le,
		updateAnnotation: ue,
		setVisualType: de,
		acknowledgeDevice: fe,
		unacknowledgeDevice: pe,
		assignDevice: me,
		addLink: he,
		updateLink: ge,
		removeLink: _e,
		getMappingByDeviceId: ve,
		getDevice: ye,
		virtualNodes: u,
		savedViews: f,
		changeLog: p,
		addVirtualNode: be,
		removeVirtualNode: xe,
		updateVirtualNode: Se,
		backgroundObjects: d,
		addBackgroundObject: Ce,
		removeBackgroundObject: we,
		updateBackgroundObject: Te,
		addSavedView: Ee,
		removeSavedView: De,
		logChange: Oe,
		exportChangeLog: ke,
		exportSnapshot: Ne,
		importSnapshot: Pe
	};
}), K = I("ui", () => {
	let e = S("view"), t = S(null), n = S(null), r = S(/* @__PURE__ */ new Set()), a = S(!1), o = S(null), s = S(new Set([
		"physical",
		"logical",
		"service_dependency",
		"traffic_flow",
		"security_path",
		"manual",
		"inferred"
	])), c = S({ ...Lt }), l = S(!1), u = S({
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
	function ee(e) {
		F.value = e, localStorage.setItem("topospace.colorblindMode", e ? "1" : "0");
	}
	let I = S(-1), L = S(!1), R = S(!1), z = S(null), B = S([]), te = S([]);
	function V(e, t = "info") {
		let n = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
		te.value.push({
			id: n,
			message: e,
			type: t,
			timestamp: Date.now()
		}), te.value.length > 6 && te.value.shift(), setTimeout(() => ne(n), 5e3);
	}
	function ne(e) {
		let t = te.value.findIndex((t) => t.id === e);
		t >= 0 && te.value.splice(t, 1);
	}
	let re = S({
		visible: !1,
		x: 0,
		y: 0,
		deviceId: ""
	}), ie = i(() => t.value?.type === "device" ? t.value.id : null), ae = i(() => t.value?.type === "space" ? t.value.id : null), H = i(() => t.value?.type === "link" ? t.value.id : null), oe = i(() => t.value?.type === "background" ? t.value.id : null);
	function se(t) {
		e.value = t, G().setEditorMode(t), t === "view" && (a.value = !1, o.value = null, k.value = !1);
	}
	function ce() {
		if (e.value !== "edit") {
			k.value = !1;
			return;
		}
		k.value = !k.value;
	}
	function le(e) {
		A.value = e, j.value = "3d";
	}
	function ue() {
		j.value = "2d";
	}
	function de(e) {
		t.value = e, h.value = e?.type === "link";
	}
	function fe() {
		if (e.value !== "edit") {
			a.value = !1, o.value = null;
			return;
		}
		a.value = !a.value, a.value || (o.value = null);
	}
	function pe() {
		E.value = !1, D.value = !1, O.value = !1, f.value = !1, m.value = !1, d.value = !1, p.value = null;
	}
	function me(e) {
		o.value = e;
	}
	function he() {
		o.value = null;
	}
	function ge(e, t, n, r) {
		u.value = {
			visible: !0,
			x: e,
			y: t,
			sourceDeviceId: n,
			targetDeviceId: r
		};
	}
	function _e() {
		u.value.visible = !1, o.value = null;
	}
	function ve(e) {
		s.value.has(e) ? s.value.delete(e) : s.value.add(e);
	}
	function ye(e) {
		Object.assign(c.value, e);
	}
	function be() {
		c.value = { ...Lt };
	}
	function xe(e, t, n) {
		re.value = {
			visible: !0,
			x: e,
			y: t,
			deviceId: n
		};
	}
	function Se() {
		re.value.visible = !1;
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
		toggleBackgroundEdit: ce,
		fontScale: M,
		setFontScale: P,
		colorblindMode: F,
		setColorblindMode: ee,
		timelineFrameIdx: I,
		timelineRecording: L,
		wsConnected: R,
		blastSourceId: z,
		offscreenAlerts: B,
		tooltip: re,
		activeRootSpaceId: A,
		viewMode: j,
		enterScope: le,
		showOverview: ue,
		selectedDeviceId: ie,
		selectedSpaceId: ae,
		selectedLinkId: H,
		selectedBackgroundId: oe,
		setMode: se,
		select: de,
		toggleLinkTool: fe,
		closeLeftDock: pe,
		startLinkFrom: me,
		cancelLinkDraft: he,
		showContextMenu: ge,
		hideContextMenu: _e,
		toggleLinkType: ve,
		setFilter: ye,
		resetFilter: be,
		showTooltipAt: xe,
		hideTooltip: Se,
		toasts: te,
		addToast: V,
		removeToast: ne
	};
});
//#endregion
//#region src/composables/useWebSocketSim.ts
function Jt() {
	let e = G(), t = K(), n = S(!1), r = S([]), i = [];
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
var Yt = { type: "change" }, Xt = { type: "start" }, Zt = { type: "end" }, Qt = new it(), $t = new Xe(), en = Math.cos(70 * Ie.DEG2RAD), tn = new W(), nn = 2 * Math.PI, q = {
	NONE: -1,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2,
	TOUCH_ROTATE: 3,
	TOUCH_PAN: 4,
	TOUCH_DOLLY_PAN: 5,
	TOUCH_DOLLY_ROTATE: 6
}, rn = 1e-6, an = class extends oe {
	constructor(e, t = null) {
		super(e, t), this.state = q.NONE, this.target = new W(), this.cursor = new W(), this.minDistance = 0, this.maxDistance = Infinity, this.minZoom = 0, this.maxZoom = Infinity, this.minTargetRadius = 0, this.maxTargetRadius = Infinity, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -Infinity, this.maxAzimuthAngle = Infinity, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
			LEFT: "ArrowLeft",
			UP: "ArrowUp",
			RIGHT: "ArrowRight",
			BOTTOM: "ArrowDown"
		}, this.mouseButtons = {
			LEFT: Pe.ROTATE,
			MIDDLE: Pe.DOLLY,
			RIGHT: Pe.PAN
		}, this.touches = {
			ONE: mt.ROTATE,
			TWO: mt.DOLLY_PAN
		}, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._cursorStyle = "auto", this._domElementKeyEvents = null, this._lastPosition = new W(), this._lastQuaternion = new tt(), this._lastTargetPosition = new W(), this._quat = new tt().setFromUnitVectors(e.up, new W(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new ft(), this._sphericalDelta = new ft(), this._scale = 1, this._panOffset = new W(), this._rotateStart = new U(), this._rotateEnd = new U(), this._rotateDelta = new U(), this._panStart = new U(), this._panEnd = new U(), this._panDelta = new U(), this._dollyStart = new U(), this._dollyEnd = new U(), this._dollyDelta = new U(), this._dollyDirection = new W(), this._mouse = new U(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = sn.bind(this), this._onPointerDown = on.bind(this), this._onPointerUp = cn.bind(this), this._onContextMenu = hn.bind(this), this._onMouseWheel = dn.bind(this), this._onKeyDown = fn.bind(this), this._onTouchStart = pn.bind(this), this._onTouchMove = mn.bind(this), this._onMouseDown = ln.bind(this), this._onMouseMove = un.bind(this), this._interceptControlDown = gn.bind(this), this._interceptControlUp = _n.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
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
		this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Yt), this.update(), this.state = q.NONE;
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
		tn.copy(t).sub(this.target), tn.applyQuaternion(this._quat), this._spherical.setFromVector3(tn), this.autoRotate && this.state === q.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
		let n = this.minAzimuthAngle, r = this.maxAzimuthAngle;
		isFinite(n) && isFinite(r) && (n < -Math.PI ? n += nn : n > Math.PI && (n -= nn), r < -Math.PI ? r += nn : r > Math.PI && (r -= nn), n <= r ? this._spherical.theta = Math.max(n, Math.min(r, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + r) / 2 ? Math.max(n, this._spherical.theta) : Math.min(r, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
		let i = !1;
		if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
		else {
			let e = this._spherical.radius;
			this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), i = e != this._spherical.radius;
		}
		if (tn.setFromSpherical(this._spherical), tn.applyQuaternion(this._quatInverse), t.copy(this.target).add(tn), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
			let e = null;
			if (this.object.isPerspectiveCamera) {
				let t = tn.length();
				e = this._clampDistance(t * this._scale);
				let n = t - e;
				this.object.position.addScaledVector(this._dollyDirection, n), this.object.updateMatrixWorld(), i = !!n;
			} else if (this.object.isOrthographicCamera) {
				let t = new W(this._mouse.x, this._mouse.y, 0);
				t.unproject(this.object);
				let n = this.object.zoom;
				this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), i = n !== this.object.zoom;
				let r = new W(this._mouse.x, this._mouse.y, 0);
				r.unproject(this.object), this.object.position.sub(r).add(t), this.object.updateMatrixWorld(), e = tn.length();
			} else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
			e !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position) : (Qt.origin.copy(this.object.position), Qt.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Qt.direction)) < en ? this.object.lookAt(this.target) : ($t.setFromNormalAndCoplanarPoint(this.object.up, this.target), Qt.intersectPlane($t, this.target))));
		} else if (this.object.isOrthographicCamera) {
			let e = this.object.zoom;
			this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), e !== this.object.zoom && (this.object.updateProjectionMatrix(), i = !0);
		}
		return this._scale = 1, this._performCursorZoom = !1, i || this._lastPosition.distanceToSquared(this.object.position) > rn || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > rn || this._lastTargetPosition.distanceToSquared(this.target) > rn ? (this.dispatchEvent(Yt), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
	}
	_getAutoRotationAngle(e) {
		return e === null ? nn / 60 / 60 * this.autoRotateSpeed : nn / 60 * this.autoRotateSpeed * e;
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
		tn.setFromMatrixColumn(t, 0), tn.multiplyScalar(-e), this._panOffset.add(tn);
	}
	_panUp(e, t) {
		this.screenSpacePanning === !0 ? tn.setFromMatrixColumn(t, 1) : (tn.setFromMatrixColumn(t, 0), tn.crossVectors(this.object.up, tn)), tn.multiplyScalar(e), this._panOffset.add(tn);
	}
	_pan(e, t) {
		let n = this.domElement;
		if (this.object.isPerspectiveCamera) {
			let r = this.object.position;
			tn.copy(r).sub(this.target);
			let i = tn.length();
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
		this._rotateLeft(nn * this._rotateDelta.x / t.clientHeight), this._rotateUp(nn * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(nn * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
				break;
			case this.keys.BOTTOM:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-nn * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
				break;
			case this.keys.LEFT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(nn * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
				break;
			case this.keys.RIGHT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-nn * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
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
		this._rotateLeft(nn * this._rotateDelta.x / t.clientHeight), this._rotateUp(nn * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
		t === void 0 && (t = new U(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function on(e) {
	this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e), this._cursorStyle === "grab" && (this.domElement.style.cursor = "grabbing")));
}
function sn(e) {
	this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function cn(e) {
	switch (this._removePointer(e), this._pointers.length) {
		case 0:
			this.domElement.releasePointerCapture(e.pointerId), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Zt), this.state = q.NONE, this._cursorStyle === "grab" && (this.domElement.style.cursor = "grab");
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
function ln(e) {
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
		case Pe.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseDownDolly(e), this.state = q.DOLLY;
			break;
		case Pe.ROTATE:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = q.PAN;
			} else {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = q.ROTATE;
			}
			break;
		case Pe.PAN:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = q.ROTATE;
			} else {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = q.PAN;
			}
			break;
		default: this.state = q.NONE;
	}
	this.state !== q.NONE && this.dispatchEvent(Xt);
}
function un(e) {
	switch (this.state) {
		case q.ROTATE:
			if (this.enableRotate === !1) return;
			this._handleMouseMoveRotate(e);
			break;
		case q.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseMoveDolly(e);
			break;
		case q.PAN:
			if (this.enablePan === !1) return;
			this._handleMouseMovePan(e);
			break;
	}
}
function dn(e) {
	this.enabled === !1 || this.enableZoom === !1 || this.state !== q.NONE || (e.preventDefault(), this.dispatchEvent(Xt), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(Zt));
}
function fn(e) {
	this.enabled !== !1 && this._handleKeyDown(e);
}
function pn(e) {
	switch (this._trackPointer(e), this._pointers.length) {
		case 1:
			switch (this.touches.ONE) {
				case mt.ROTATE:
					if (this.enableRotate === !1) return;
					this._handleTouchStartRotate(e), this.state = q.TOUCH_ROTATE;
					break;
				case mt.PAN:
					if (this.enablePan === !1) return;
					this._handleTouchStartPan(e), this.state = q.TOUCH_PAN;
					break;
				default: this.state = q.NONE;
			}
			break;
		case 2:
			switch (this.touches.TWO) {
				case mt.DOLLY_PAN:
					if (this.enableZoom === !1 && this.enablePan === !1) return;
					this._handleTouchStartDollyPan(e), this.state = q.TOUCH_DOLLY_PAN;
					break;
				case mt.DOLLY_ROTATE:
					if (this.enableZoom === !1 && this.enableRotate === !1) return;
					this._handleTouchStartDollyRotate(e), this.state = q.TOUCH_DOLLY_ROTATE;
					break;
				default: this.state = q.NONE;
			}
			break;
		default: this.state = q.NONE;
	}
	this.state !== q.NONE && this.dispatchEvent(Xt);
}
function mn(e) {
	switch (this._trackPointer(e), this.state) {
		case q.TOUCH_ROTATE:
			if (this.enableRotate === !1) return;
			this._handleTouchMoveRotate(e), this.update();
			break;
		case q.TOUCH_PAN:
			if (this.enablePan === !1) return;
			this._handleTouchMovePan(e), this.update();
			break;
		case q.TOUCH_DOLLY_PAN:
			if (this.enableZoom === !1 && this.enablePan === !1) return;
			this._handleTouchMoveDollyPan(e), this.update();
			break;
		case q.TOUCH_DOLLY_ROTATE:
			if (this.enableZoom === !1 && this.enableRotate === !1) return;
			this._handleTouchMoveDollyRotate(e), this.update();
			break;
		default: this.state = q.NONE;
	}
}
function hn(e) {
	this.enabled !== !1 && e.preventDefault();
}
function gn(e) {
	e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
function _n(e) {
	e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
//#endregion
//#region node_modules/three/examples/jsm/renderers/CSS2DRenderer.js
var vn = class extends qe {
	constructor(e = document.createElement("div")) {
		super(), this.isCSS2DObject = !0, this.element = e, this.element.style.position = "absolute", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.center = new U(.5, .5), this.addEventListener("removed", function() {
			this.traverse(function(e) {
				e.element && e.element instanceof e.element.ownerDocument.defaultView.Element && e.element.parentNode !== null && e.element.remove();
			});
		});
	}
	copy(e, t) {
		return super.copy(e, t), this.element = e.element.cloneNode(!0), this.center = e.center, this;
	}
}, yn = new W(), bn = new Le(), xn = new Le(), Sn = new W(), Cn = new W(), wn = class {
	constructor(e = {}) {
		let t = this, n, r, i, a, o = { objects: /* @__PURE__ */ new WeakMap() }, s = e.element === void 0 ? document.createElement("div") : e.element;
		s.style.overflow = "hidden", this.domElement = s, this.sortObjects = !0, this.getSize = function() {
			return {
				width: n,
				height: r
			};
		}, this.render = function(e, t) {
			e.matrixWorldAutoUpdate === !0 && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === !0 && t.updateMatrixWorld(), bn.copy(t.matrixWorldInverse), xn.multiplyMatrices(t.projectionMatrix, bn), l(e, e, t), this.sortObjects && f(e);
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
				yn.setFromMatrixPosition(e.matrixWorld), yn.applyMatrix4(xn);
				let c = yn.z >= -1 && yn.z <= 1 && e.layers.test(r.layers) === !0, l = e.element;
				l.style.display = c === !0 ? "" : "none", c === !0 && (e.onBeforeRender(t, n, r), l.style.transform = "translate(" + -100 * e.center.x + "%," + -100 * e.center.y + "%)translate(" + (yn.x * i + i) + "px," + (-yn.y * a + a) + "px)", l.parentNode !== s && s.appendChild(l), e.onAfterRender(t, n, r));
				let d = { distanceToCameraSquared: u(r, e) };
				o.objects.set(e, d);
			}
			for (let t = 0, i = e.children.length; t < i; t++) l(e.children[t], n, r);
		}
		function u(e, t) {
			return Sn.setFromMatrixPosition(e.matrixWorld), Cn.setFromMatrixPosition(t.matrixWorld), Sn.distanceToSquared(Cn);
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
}, Tn = class {
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
		this._wrapper = n, this._canvas = e, this._overlayEl = t, this._onError = r.onError, this.renderer = new L.WebGLRenderer({
			canvas: e,
			antialias: !0,
			logarithmicDepthBuffer: !0
		}), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.shadowMap.enabled = !0, this.css2dRenderer = new wn(), this.css2dRenderer.domElement.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;", t.appendChild(this.css2dRenderer.domElement), this.scene = new L.Scene(), this.scene.background = new L.Color(527384), this.scene.fog = new L.FogExp2(527384, .005), this.camera = new L.PerspectiveCamera(55, 1, .1, 1e3), this.camera.position.set(0, 60, 80), this.camera.lookAt(0, 0, 0), this.controls = new an(this.camera, e), this.controls.enableDamping = !0, this.controls.dampingFactor = .06, this.controls.maxPolarAngle = Math.PI / 2.05, this.controls.minDistance = 3, this.controls.maxDistance = 220, this._setupLights(), this._setupGrid(), this.resize(), window.addEventListener("resize", this.resize), this._resizeObserver = new ResizeObserver(() => this.resize()), this._resizeObserver.observe(n), e.addEventListener("webglcontextlost", this.onWebglContextLost), e.addEventListener("webglcontextrestored", this.onWebglContextRestored);
	}
	_setupLights() {
		this.scene.add(new L.AmbientLight(2767452, 3));
		let e = new L.DirectionalLight(16777215, 2);
		e.position.set(20, 60, 30), e.castShadow = !0, e.shadow.mapSize.set(2048, 2048), e.shadow.camera.left = -120, e.shadow.camera.right = 120, e.shadow.camera.top = 120, e.shadow.camera.bottom = -120, this.scene.add(e);
		let t = new L.DirectionalLight(4482730, .7);
		t.position.set(-20, 20, -30), this.scene.add(t);
	}
	_setupGrid() {
		let e = new L.Mesh(new L.PlaneGeometry(300, 300), new L.MeshStandardMaterial({
			color: 725024,
			roughness: 1
		}));
		e.rotation.x = -Math.PI / 2, e.position.y = -.5, e.receiveShadow = !0, this.scene.add(e);
		let t = new L.GridHelper(300, 60, 1714762, 1714762);
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
		let t = new L.Timer(), n = (r) => {
			this._animId = requestAnimationFrame(n), t.update(r);
			let i = t.getDelta(), a = t.getElapsed();
			this.controls.update(), e(i, a), this.renderer.render(this.scene, this.camera), this.css2dRenderer.render(this.scene, this.camera);
		};
		requestAnimationFrame(n);
	}
	dispose() {
		cancelAnimationFrame(this._animId), window.removeEventListener("resize", this.resize), this._resizeObserver?.disconnect(), this._resizeObserver = void 0, this._canvas?.removeEventListener("webglcontextlost", this.onWebglContextLost), this._canvas?.removeEventListener("webglcontextrestored", this.onWebglContextRestored), this.controls?.dispose(), this.renderer?.dispose(), this.css2dRenderer?.domElement.remove();
	}
}, En = {
	normal: "#22c55e",
	warning: "#eab308",
	critical: "#ef4444",
	offline: "#374151",
	unknown: "#6b7280",
	maintenance: "#3b82f6",
	acknowledged: "#f59e0b",
	stale: "#78716c"
}, Dn = {
	normal: "#0072b2",
	warning: "#f0e442",
	critical: "#d55e00",
	offline: "#374151",
	unknown: "#8a8a8a",
	maintenance: "#56b4e9",
	acknowledged: "#009e73",
	stale: "#999999"
}, On = { ...En }, kn = Object.fromEntries(Object.entries(On).map(([e, t]) => [e, new L.Color(t)]));
function An(e) {
	let t = e === "colorblind" ? Dn : En;
	Object.keys(t).forEach((e) => {
		On[e] = t[e], kn[e].set(t[e]);
	});
}
var jn = {
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
}, Mn = {
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
}, Nn = {
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
}, Pn = {
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
}, Fn = {
	normal: "Normal",
	warning: "Warning",
	critical: "Critical",
	offline: "Offline",
	unknown: "Unknown",
	maintenance: "Maintenance",
	acknowledged: "Acknowledged",
	stale: "Stale"
}, In = {
	normal: "",
	warning: "▲",
	critical: "✕",
	offline: "⏻",
	unknown: "?",
	maintenance: "↻",
	acknowledged: "✓",
	stale: "…"
}, Ln = /* @__PURE__ */ new Map(), Rn = /* @__PURE__ */ new Map(), zn = /* @__PURE__ */ new Map();
function Bn(e) {
	Ln.clear(), Rn.clear(), zn.clear(), e.forEach((e) => {
		Ln.set(e.id, e.color), Rn.set(e.id, e.abbr), zn.set(e.id, e.label);
	});
}
function Vn(e) {
	return Ln.get(e) ?? jn[e] ?? "#6b7280";
}
//#endregion
//#region node_modules/three/examples/jsm/utils/BufferGeometryUtils.js
function Hn(e, t = !1) {
	let n = e[0].index !== null, r = new Set(Object.keys(e[0].attributes)), i = new Set(Object.keys(e[0].morphAttributes)), a = {}, o = {}, s = e[0].morphTargetsRelative, c = new re(), l = 0;
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
		let t = Un(a[e]);
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
				let r = Un(t);
				if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
				c.morphAttributes[e].push(r);
			}
		}
	}
	return c;
}
function Un(e) {
	let t, n, r, i = -1, a = 0;
	for (let o = 0; o < e.length; ++o) {
		let s = e[o];
		if (t === void 0 && (t = s.array.constructor), t !== s.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
		if (n === void 0 && (n = s.itemSize), n !== s.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
		if (r === void 0 && (r = s.normalized), r !== s.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
		if (i === -1 && (i = s.gpuType), i !== s.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
		a += s.count * n;
	}
	let o = new t(a), s = new ne(o, n, r), c = 0;
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
function Wn(e, t) {
	if (t === bt) return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), e;
	if (t === vt || t === yt) {
		let n = e.getIndex();
		if (n === null) {
			let t = [], r = e.getAttribute("position");
			if (r !== void 0) {
				for (let e = 0; e < r.count; e++) t.push(e);
				e.setIndex(t), n = e.getIndex();
			} else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), e;
		}
		let r = n.count - 2, i = [];
		if (t === vt) for (let e = 1; e <= r; e++) i.push(n.getX(0)), i.push(n.getX(e)), i.push(n.getX(e + 1));
		else for (let e = 0; e < r; e++) e % 2 == 0 ? (i.push(n.getX(e)), i.push(n.getX(e + 1)), i.push(n.getX(e + 2))) : (i.push(n.getX(e + 2)), i.push(n.getX(e + 1)), i.push(n.getX(e)));
		i.length / 3 !== r && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
		let a = e.clone();
		return a.setIndex(i), a.clearGroups(), a;
	} else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", t), e;
}
//#endregion
//#region src/utils/modelStorage.ts
var Gn = "topospace-models", Kn = "models", qn = 1;
function Jn() {
	return new Promise((e, t) => {
		let n = indexedDB.open(Gn, qn);
		n.onupgradeneeded = () => n.result.createObjectStore(Kn), n.onsuccess = () => e(n.result), n.onerror = () => t(n.error);
	});
}
async function Yn(e, t) {
	let n = await Jn();
	return new Promise((r, i) => {
		let a = n.transaction(Kn, "readwrite"), o = a.objectStore(Kn).put(t, e);
		o.onsuccess = () => r(), o.onerror = () => i(o.error), a.oncomplete = () => n.close();
	});
}
async function Xn(e) {
	let t = await Jn();
	return new Promise((n, r) => {
		let i = t.transaction(Kn, "readonly").objectStore(Kn).get(e);
		i.onsuccess = () => {
			n(i.result ?? null), t.close();
		}, i.onerror = () => r(i.error);
	});
}
async function Zn(e) {
	let t = await Jn();
	return new Promise((n, r) => {
		let i = t.transaction(Kn, "readwrite"), a = i.objectStore(Kn).delete(e);
		a.onsuccess = () => n(), a.onerror = () => r(a.error), i.oncomplete = () => t.close();
	});
}
//#endregion
//#region node_modules/three/examples/jsm/utils/SkeletonUtils.js
function Qn(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = e.clone();
	return $n(e, r, function(e, r) {
		t.set(r, e), n.set(e, r);
	}), r.traverse(function(e) {
		if (!e.isSkinnedMesh) return;
		let r = e, i = t.get(e), a = i.skeleton.bones;
		r.skeleton = i.skeleton.clone(), r.bindMatrix.copy(i.bindMatrix), r.skeleton.bones = a.map(function(e) {
			return n.get(e);
		}), r.bind(r.skeleton, r.bindMatrix);
	}), r;
}
function $n(e, t, n) {
	n(e, t);
	for (let r = 0; r < e.children.length; r++) $n(e.children[r], t.children[r], n);
}
//#endregion
//#region node_modules/three/examples/jsm/loaders/GLTFLoader.js
var er = class extends Me {
	constructor(e) {
		super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
			return new ar(e);
		}), this.register(function(e) {
			return new or(e);
		}), this.register(function(e) {
			return new hr(e);
		}), this.register(function(e) {
			return new gr(e);
		}), this.register(function(e) {
			return new _r(e);
		}), this.register(function(e) {
			return new cr(e);
		}), this.register(function(e) {
			return new lr(e);
		}), this.register(function(e) {
			return new ur(e);
		}), this.register(function(e) {
			return new dr(e);
		}), this.register(function(e) {
			return new ir(e);
		}), this.register(function(e) {
			return new fr(e);
		}), this.register(function(e) {
			return new sr(e);
		}), this.register(function(e) {
			return new mr(e);
		}), this.register(function(e) {
			return new pr(e);
		}), this.register(function(e) {
			return new nr(e);
		}), this.register(function(e) {
			return new vr(e, Y.EXT_MESHOPT_COMPRESSION);
		}), this.register(function(e) {
			return new vr(e, Y.KHR_MESHOPT_COMPRESSION);
		}), this.register(function(e) {
			return new yr(e);
		});
	}
	load(e, t, n, r) {
		let i = this, a;
		if (this.resourcePath !== "") a = this.resourcePath;
		else if (this.path !== "") {
			let t = Ne.extractUrlBase(e);
			a = Ne.resolveURL(t, this.path);
		} else a = Ne.extractUrlBase(e);
		this.manager.itemStart(e);
		let o = function(t) {
			r ? r(t) : console.error(t), i.manager.itemError(e), i.manager.itemEnd(e);
		}, s = new le(this.manager);
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
		else if (e instanceof ArrayBuffer) if (s.decode(new Uint8Array(e, 0, 4)) === br) {
			try {
				a[Y.KHR_BINARY_GLTF] = new Cr(e);
			} catch (e) {
				r && r(e);
				return;
			}
			i = JSON.parse(a[Y.KHR_BINARY_GLTF].content);
		} else i = JSON.parse(s.decode(e));
		else i = e;
		if (i.asset === void 0 || i.asset.version[0] < 2) {
			r && r(/* @__PURE__ */ Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
			return;
		}
		let c = new Yr(i, {
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
				case Y.KHR_MATERIALS_UNLIT:
					a[t] = new rr();
					break;
				case Y.KHR_DRACO_MESH_COMPRESSION:
					a[t] = new wr(i, this.dracoLoader);
					break;
				case Y.KHR_TEXTURE_TRANSFORM:
					a[t] = new Tr();
					break;
				case Y.KHR_MESH_QUANTIZATION:
					a[t] = new Er();
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
function tr() {
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
function J(e, t, n) {
	let r = e.json.materials[t];
	return r.extensions && r.extensions[n] ? r.extensions[n] : null;
}
var Y = {
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
}, nr = class {
	constructor(e) {
		this.parser = e, this.name = Y.KHR_LIGHTS_PUNCTUAL, this.cache = {
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
		let i = t.json, a = ((i.extensions && i.extensions[this.name] || {}).lights || [])[e], o, s = new ae(16777215);
		a.color !== void 0 && s.setRGB(a.color[0], a.color[1], a.color[2], je);
		let c = a.range === void 0 ? 0 : a.range;
		switch (a.type) {
			case "directional":
				o = new se(s), o.target.position.set(0, 0, -1), o.add(o.target);
				break;
			case "point":
				o = new Ze(s), o.distance = c;
				break;
			case "spot":
				o = new pt(s), o.distance = c, a.spot = a.spot || {}, a.spot.innerConeAngle = a.spot.innerConeAngle === void 0 ? 0 : a.spot.innerConeAngle, a.spot.outerConeAngle = a.spot.outerConeAngle === void 0 ? Math.PI / 4 : a.spot.outerConeAngle, o.angle = a.spot.outerConeAngle, o.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle, o.target.position.set(0, 0, -1), o.add(o.target);
				break;
			default: throw Error("THREE.GLTFLoader: Unexpected light type: " + a.type);
		}
		return o.position.set(0, 0, 0), Vr(o, a), a.intensity !== void 0 && (o.intensity = a.intensity), o.name = t.createUniqueName(a.name || "light_" + e), r = Promise.resolve(o), t.cache.add(n, r), r;
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
}, rr = class {
	constructor() {
		this.name = Y.KHR_MATERIALS_UNLIT;
	}
	getMaterialType() {
		return ze;
	}
	extendParams(e, t, n) {
		let r = [];
		e.color = new ae(1, 1, 1), e.opacity = 1;
		let i = t.pbrMetallicRoughness;
		if (i) {
			if (Array.isArray(i.baseColorFactor)) {
				let t = i.baseColorFactor;
				e.color.setRGB(t[0], t[1], t[2], je), e.opacity = t[3];
			}
			i.baseColorTexture !== void 0 && r.push(n.assignTexture(e, "map", i.baseColorTexture, ot));
		}
		return Promise.all(r);
	}
}, ir = class {
	constructor(e) {
		this.parser = e, this.name = Y.KHR_MATERIALS_EMISSIVE_STRENGTH;
	}
	extendMaterialParams(e, t) {
		let n = J(this.parser, e, this.name);
		return n === null || n.emissiveStrength !== void 0 && (t.emissiveIntensity = n.emissiveStrength), Promise.resolve();
	}
}, ar = class {
	constructor(e) {
		this.parser = e, this.name = Y.KHR_MATERIALS_CLEARCOAT;
	}
	getMaterialType(e) {
		return J(this.parser, e, this.name) === null ? null : Be;
	}
	extendMaterialParams(e, t) {
		let n = J(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		if (n.clearcoatFactor !== void 0 && (t.clearcoat = n.clearcoatFactor), n.clearcoatTexture !== void 0 && r.push(this.parser.assignTexture(t, "clearcoatMap", n.clearcoatTexture)), n.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = n.clearcoatRoughnessFactor), n.clearcoatRoughnessTexture !== void 0 && r.push(this.parser.assignTexture(t, "clearcoatRoughnessMap", n.clearcoatRoughnessTexture)), n.clearcoatNormalTexture !== void 0 && (r.push(this.parser.assignTexture(t, "clearcoatNormalMap", n.clearcoatNormalTexture)), n.clearcoatNormalTexture.scale !== void 0)) {
			let e = n.clearcoatNormalTexture.scale;
			t.clearcoatNormalScale = new U(e, e);
		}
		return Promise.all(r);
	}
}, or = class {
	constructor(e) {
		this.parser = e, this.name = Y.KHR_MATERIALS_DISPERSION;
	}
	getMaterialType(e) {
		return J(this.parser, e, this.name) === null ? null : Be;
	}
	extendMaterialParams(e, t) {
		let n = J(this.parser, e, this.name);
		return n === null || (t.dispersion = n.dispersion === void 0 ? 0 : n.dispersion), Promise.resolve();
	}
}, sr = class {
	constructor(e) {
		this.parser = e, this.name = Y.KHR_MATERIALS_IRIDESCENCE;
	}
	getMaterialType(e) {
		return J(this.parser, e, this.name) === null ? null : Be;
	}
	extendMaterialParams(e, t) {
		let n = J(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		return n.iridescenceFactor !== void 0 && (t.iridescence = n.iridescenceFactor), n.iridescenceTexture !== void 0 && r.push(this.parser.assignTexture(t, "iridescenceMap", n.iridescenceTexture)), n.iridescenceIor !== void 0 && (t.iridescenceIOR = n.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), n.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum), n.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum), n.iridescenceThicknessTexture !== void 0 && r.push(this.parser.assignTexture(t, "iridescenceThicknessMap", n.iridescenceThicknessTexture)), Promise.all(r);
	}
}, cr = class {
	constructor(e) {
		this.parser = e, this.name = Y.KHR_MATERIALS_SHEEN;
	}
	getMaterialType(e) {
		return J(this.parser, e, this.name) === null ? null : Be;
	}
	extendMaterialParams(e, t) {
		let n = J(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		if (t.sheenColor = new ae(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1, n.sheenColorFactor !== void 0) {
			let e = n.sheenColorFactor;
			t.sheenColor.setRGB(e[0], e[1], e[2], je);
		}
		return n.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = n.sheenRoughnessFactor), n.sheenColorTexture !== void 0 && r.push(this.parser.assignTexture(t, "sheenColorMap", n.sheenColorTexture, ot)), n.sheenRoughnessTexture !== void 0 && r.push(this.parser.assignTexture(t, "sheenRoughnessMap", n.sheenRoughnessTexture)), Promise.all(r);
	}
}, lr = class {
	constructor(e) {
		this.parser = e, this.name = Y.KHR_MATERIALS_TRANSMISSION;
	}
	getMaterialType(e) {
		return J(this.parser, e, this.name) === null ? null : Be;
	}
	extendMaterialParams(e, t) {
		let n = J(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		return n.transmissionFactor !== void 0 && (t.transmission = n.transmissionFactor), n.transmissionTexture !== void 0 && r.push(this.parser.assignTexture(t, "transmissionMap", n.transmissionTexture)), Promise.all(r);
	}
}, ur = class {
	constructor(e) {
		this.parser = e, this.name = Y.KHR_MATERIALS_VOLUME;
	}
	getMaterialType(e) {
		return J(this.parser, e, this.name) === null ? null : Be;
	}
	extendMaterialParams(e, t) {
		let n = J(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		t.thickness = n.thicknessFactor === void 0 ? 0 : n.thicknessFactor, n.thicknessTexture !== void 0 && r.push(this.parser.assignTexture(t, "thicknessMap", n.thicknessTexture)), t.attenuationDistance = n.attenuationDistance || Infinity;
		let i = n.attenuationColor || [
			1,
			1,
			1
		];
		return t.attenuationColor = new ae().setRGB(i[0], i[1], i[2], je), Promise.all(r);
	}
}, dr = class {
	constructor(e) {
		this.parser = e, this.name = Y.KHR_MATERIALS_IOR;
	}
	getMaterialType(e) {
		return J(this.parser, e, this.name) === null ? null : Be;
	}
	extendMaterialParams(e, t) {
		let n = J(this.parser, e, this.name);
		return n === null ? Promise.resolve() : (t.ior = n.ior === void 0 ? 1.5 : n.ior, t.ior === 0 && (t.ior = 1e3), Promise.resolve());
	}
}, fr = class {
	constructor(e) {
		this.parser = e, this.name = Y.KHR_MATERIALS_SPECULAR;
	}
	getMaterialType(e) {
		return J(this.parser, e, this.name) === null ? null : Be;
	}
	extendMaterialParams(e, t) {
		let n = J(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		t.specularIntensity = n.specularFactor === void 0 ? 1 : n.specularFactor, n.specularTexture !== void 0 && r.push(this.parser.assignTexture(t, "specularIntensityMap", n.specularTexture));
		let i = n.specularColorFactor || [
			1,
			1,
			1
		];
		return t.specularColor = new ae().setRGB(i[0], i[1], i[2], je), n.specularColorTexture !== void 0 && r.push(this.parser.assignTexture(t, "specularColorMap", n.specularColorTexture, ot)), Promise.all(r);
	}
}, pr = class {
	constructor(e) {
		this.parser = e, this.name = Y.EXT_MATERIALS_BUMP;
	}
	getMaterialType(e) {
		return J(this.parser, e, this.name) === null ? null : Be;
	}
	extendMaterialParams(e, t) {
		let n = J(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		return t.bumpScale = n.bumpFactor === void 0 ? 1 : n.bumpFactor, n.bumpTexture !== void 0 && r.push(this.parser.assignTexture(t, "bumpMap", n.bumpTexture)), Promise.all(r);
	}
}, mr = class {
	constructor(e) {
		this.parser = e, this.name = Y.KHR_MATERIALS_ANISOTROPY;
	}
	getMaterialType(e) {
		return J(this.parser, e, this.name) === null ? null : Be;
	}
	extendMaterialParams(e, t) {
		let n = J(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		return n.anisotropyStrength !== void 0 && (t.anisotropy = n.anisotropyStrength), n.anisotropyRotation !== void 0 && (t.anisotropyRotation = n.anisotropyRotation), n.anisotropyTexture !== void 0 && r.push(this.parser.assignTexture(t, "anisotropyMap", n.anisotropyTexture)), Promise.all(r);
	}
}, hr = class {
	constructor(e) {
		this.parser = e, this.name = Y.KHR_TEXTURE_BASISU;
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
}, gr = class {
	constructor(e) {
		this.parser = e, this.name = Y.EXT_TEXTURE_WEBP;
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
}, _r = class {
	constructor(e) {
		this.parser = e, this.name = Y.EXT_TEXTURE_AVIF;
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
}, vr = class {
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
}, yr = class {
	constructor(e) {
		this.name = Y.EXT_MESH_GPU_INSTANCING, this.parser = e;
	}
	createNodeMesh(e) {
		let t = this.parser.json, n = t.nodes[e];
		if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0) return null;
		let r = t.meshes[n.mesh];
		for (let e of r.primitives) if (e.mode !== Ar.TRIANGLES && e.mode !== Ar.TRIANGLE_STRIP && e.mode !== Ar.TRIANGLE_FAN && e.mode !== void 0) return null;
		let i = n.extensions[this.name].attributes, a = [], o = {};
		for (let e in i) a.push(this.parser.getDependency("accessor", i[e]).then((t) => (o[e] = t, o[e])));
		return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((e) => {
			let t = e.pop(), n = t.isGroup ? t.children : [t], r = e[0].count, i = [];
			for (let e of n) {
				let t = new Le(), n = new W(), a = new tt(), s = new W(1, 1, 1), c = new _e(e.geometry, e.material, r);
				for (let e = 0; e < r; e++) o.TRANSLATION && n.fromBufferAttribute(o.TRANSLATION, e), o.ROTATION && a.fromBufferAttribute(o.ROTATION, e), o.SCALE && s.fromBufferAttribute(o.SCALE, e), c.setMatrixAt(e, t.compose(n, a, s));
				for (let t in o) if (t === "_COLOR_0") {
					let e = o[t];
					c.instanceColor = new me(e.array, e.itemSize, e.normalized);
				} else t !== "TRANSLATION" && t !== "ROTATION" && t !== "SCALE" && e.geometry.setAttribute(t, o[t]);
				qe.prototype.copy.call(c, e), this.parser.assignFinalMaterial(c), i.push(c);
			}
			return t.isGroup ? (t.clear(), t.add(...i), t) : i[0];
		}));
	}
}, br = "glTF", xr = 12, Sr = {
	JSON: 1313821514,
	BIN: 5130562
}, Cr = class {
	constructor(e) {
		this.name = Y.KHR_BINARY_GLTF, this.content = null, this.body = null;
		let t = new DataView(e, 0, xr), n = new TextDecoder();
		if (this.header = {
			magic: n.decode(new Uint8Array(e.slice(0, 4))),
			version: t.getUint32(4, !0),
			length: t.getUint32(8, !0)
		}, this.header.magic !== br) throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
		if (this.header.version < 2) throw Error("THREE.GLTFLoader: Legacy binary file detected.");
		let r = this.header.length - xr, i = new DataView(e, xr), a = 0;
		for (; a < r;) {
			let t = i.getUint32(a, !0);
			a += 4;
			let r = i.getUint32(a, !0);
			if (a += 4, r === Sr.JSON) {
				let r = new Uint8Array(e, xr + a, t);
				this.content = n.decode(r);
			} else if (r === Sr.BIN) {
				let n = xr + a;
				this.body = e.slice(n, n + t);
			}
			a += t;
		}
		if (this.content === null) throw Error("THREE.GLTFLoader: JSON content not found.");
	}
}, wr = class {
	constructor(e, t) {
		if (!t) throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
		this.name = Y.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
	}
	decodePrimitive(e, t) {
		let n = this.json, r = this.dracoLoader, i = e.extensions[this.name].bufferView, a = e.extensions[this.name].attributes, o = {}, s = {}, c = {};
		for (let e in a) {
			let t = Fr[e] || e.toLowerCase();
			o[t] = a[e];
		}
		for (let t in e.attributes) {
			let r = Fr[t] || t.toLowerCase();
			if (a[t] !== void 0) {
				let i = n.accessors[e.attributes[t]];
				c[r] = jr[i.componentType].name, s[r] = i.normalized === !0;
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
				}, o, c, je, n);
			});
		});
	}
}, Tr = class {
	constructor() {
		this.name = Y.KHR_TEXTURE_TRANSFORM;
	}
	extendTexture(e, t) {
		return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 ? e : (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0, e);
	}
}, Er = class {
	constructor() {
		this.name = Y.KHR_MESH_QUANTIZATION;
	}
}, Dr = class extends be {
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
}, Or = new tt(), kr = class extends Dr {
	interpolate_(e, t, n, r) {
		let i = super.interpolate_(e, t, n, r);
		return Or.fromArray(i).normalize().toArray(i), i;
	}
}, Ar = {
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
}, jr = {
	5120: Int8Array,
	5121: Uint8Array,
	5122: Int16Array,
	5123: Uint16Array,
	5125: Uint32Array,
	5126: Float32Array
}, Mr = {
	9728: Ue,
	9729: Oe,
	9984: Ge,
	9985: Ae,
	9986: We,
	9987: ke
}, Nr = {
	33071: ie,
	33648: He,
	10497: at
}, Pr = {
	SCALAR: 1,
	VEC2: 2,
	VEC3: 3,
	VEC4: 4,
	MAT2: 4,
	MAT3: 9,
	MAT4: 16
}, Fr = {
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
}, Ir = {
	scale: "scale",
	translation: "position",
	rotation: "quaternion",
	weights: "morphTargetInfluences"
}, Lr = {
	CUBICSPLINE: void 0,
	LINEAR: Se,
	STEP: xe
}, Rr = {
	OPAQUE: "OPAQUE",
	MASK: "MASK",
	BLEND: "BLEND"
};
function zr(e) {
	return e.DefaultMaterial === void 0 && (e.DefaultMaterial = new Ve({
		color: 16777215,
		emissive: 0,
		metalness: 1,
		roughness: 1,
		transparent: !1,
		depthTest: !0,
		side: de
	})), e.DefaultMaterial;
}
function Br(e, t, n) {
	for (let r in n.extensions) e[r] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[r] = n.extensions[r]);
}
function Vr(e, t) {
	t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function Hr(e, t, n) {
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
function Ur(e, t) {
	if (e.updateMorphTargets(), t.weights !== void 0) for (let n = 0, r = t.weights.length; n < r; n++) e.morphTargetInfluences[n] = t.weights[n];
	if (t.extras && Array.isArray(t.extras.targetNames)) {
		let n = t.extras.targetNames;
		if (e.morphTargetInfluences.length === n.length) {
			e.morphTargetDictionary = {};
			for (let t = 0, r = n.length; t < r; t++) e.morphTargetDictionary[n[t]] = t;
		} else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
	}
}
function Wr(e) {
	let t, n = e.extensions && e.extensions[Y.KHR_DRACO_MESH_COMPRESSION];
	if (t = n ? "draco:" + n.bufferView + ":" + n.indices + ":" + Gr(n.attributes) : e.indices + ":" + Gr(e.attributes) + ":" + e.mode, e.targets !== void 0) for (let n = 0, r = e.targets.length; n < r; n++) t += ":" + Gr(e.targets[n]);
	return t;
}
function Gr(e) {
	let t = "", n = Object.keys(e).sort();
	for (let r = 0, i = n.length; r < i; r++) t += n[r] + ":" + e[n[r]] + ";";
	return t;
}
function Kr(e) {
	switch (e) {
		case Int8Array: return 1 / 127;
		case Uint8Array: return 1 / 255;
		case Int16Array: return 1 / 32767;
		case Uint16Array: return 1 / 65535;
		default: throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
	}
}
function qr(e) {
	return e.search(/\.jpe?g($|\?)/i) > 0 || e.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : e.search(/\.webp($|\?)/i) > 0 || e.search(/^data\:image\/webp/) === 0 ? "image/webp" : e.search(/\.ktx2($|\?)/i) > 0 || e.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
var Jr = new Le(), Yr = class {
	constructor(e = {}, t = {}) {
		this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new tr(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = {
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
		typeof createImageBitmap > "u" || n && r < 17 || i && a < 98 ? this.textureLoader = new gt(this.options.manager) : this.textureLoader = new pe(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new le(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
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
			return Br(i, a, r), Vr(a, r), Promise.all(n._invokeAll(function(e) {
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
		if (t.uri === void 0 && e === 0) return Promise.resolve(this.extensions[Y.KHR_BINARY_GLTF].body);
		let r = this.options;
		return new Promise(function(e, i) {
			n.load(Ne.resolveURL(t.uri, r.path), e, void 0, function() {
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
			let e = Pr[r.type], t = jr[r.componentType], n = r.normalized === !0, i = new t(r.count * e);
			return Promise.resolve(new ne(i, e, n));
		}
		let i = [];
		return r.bufferView === void 0 ? i.push(null) : i.push(this.getDependency("bufferView", r.bufferView)), r.sparse !== void 0 && (i.push(this.getDependency("bufferView", r.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", r.sparse.values.bufferView))), Promise.all(i).then(function(e) {
			let i = e[0], a = Pr[r.type], o = jr[r.componentType], s = o.BYTES_PER_ELEMENT, c = s * a, l = r.byteOffset || 0, u = r.bufferView === void 0 ? void 0 : n.bufferViews[r.bufferView].byteStride, d = r.normalized === !0, f, p;
			if (u && u !== c) {
				let e = Math.floor(l / u), n = "InterleavedBuffer:" + r.bufferView + ":" + r.componentType + ":" + e + ":" + r.count, c = t.cache.get(n);
				c || (f = new o(i, e * u, r.count * u / s), c = new ve(f, u / s), t.cache.add(n, c)), p = new ye(c, a, l % u / s, d);
			} else f = i === null ? new o(r.count * a) : new o(i, l, r.count * a), p = new ne(f, a, d);
			if (r.sparse !== void 0) {
				let t = Pr.SCALAR, n = jr[r.sparse.indices.componentType], s = r.sparse.indices.byteOffset || 0, c = r.sparse.values.byteOffset || 0, l = new n(e[1], s, r.sparse.count * t), u = new o(e[2], c, r.sparse.count * a);
				i !== null && (p = new ne(p.array.slice(), p.itemSize, p.normalized)), p.normalized = !1;
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
			return t.magFilter = Mr[n.magFilter] || Oe, t.minFilter = Mr[n.minFilter] || ke, t.wrapS = Nr[n.wrapS] || at, t.wrapT = Nr[n.wrapT] || at, t.generateMipmaps = !t.isCompressedTexture && t.minFilter !== Ue && t.minFilter !== Oe, r.associations.set(t, { textures: e }), t;
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
					let t = new ht(e);
					t.needsUpdate = !0, n(t);
				}), t.load(Ne.resolveURL(e, i.path), a, void 0, r);
			});
		}).then(function(e) {
			return c === !0 && o.revokeObjectURL(s), Vr(e, a), e.userData.mimeType = a.mimeType || qr(a.uri), e;
		}).catch(function(e) {
			throw console.error("THREE.GLTFLoader: Couldn't load texture", s), e;
		});
		return this.sourceCache[e] = l, l;
	}
	assignTexture(e, t, n, r) {
		let i = this;
		return this.getDependency("texture", n.index).then(function(a) {
			if (!a) return null;
			if (n.texCoord !== void 0 && n.texCoord > 0 && (a = a.clone(), a.channel = n.texCoord), i.extensions[Y.KHR_TEXTURE_TRANSFORM]) {
				let e = n.extensions === void 0 ? void 0 : n.extensions[Y.KHR_TEXTURE_TRANSFORM];
				if (e) {
					let t = i.associations.get(a);
					a = i.extensions[Y.KHR_TEXTURE_TRANSFORM].extendTexture(a, e), i.associations.set(a, t);
				}
			}
			return r !== void 0 && (a.colorSpace = r), e[t] = a, a;
		});
	}
	assignFinalMaterial(e) {
		let t = e.geometry, n = e.material, r = t.attributes.tangent === void 0, i = t.attributes.color !== void 0, a = t.attributes.normal === void 0;
		if (e.isPoints) {
			let e = "PointsMaterial:" + n.uuid, t = this.cache.get(e);
			t || (t = new $e(), Fe.prototype.copy.call(t, n), t.color.copy(n.color), t.map = n.map, t.sizeAttenuation = !1, this.cache.add(e, t)), n = t;
		} else if (e.isLine) {
			let e = "LineBasicMaterial:" + n.uuid, t = this.cache.get(e);
			t || (t = new Te(), Fe.prototype.copy.call(t, n), t.color.copy(n.color), t.map = n.map, this.cache.add(e, t)), n = t;
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
		return Ve;
	}
	loadMaterial(e) {
		let t = this, n = this.json, r = this.extensions, i = n.materials[e], a, o = {}, s = i.extensions || {}, c = [];
		if (s[Y.KHR_MATERIALS_UNLIT]) {
			let e = r[Y.KHR_MATERIALS_UNLIT];
			a = e.getMaterialType(), c.push(e.extendParams(o, i, t));
		} else {
			let n = i.pbrMetallicRoughness || {};
			if (o.color = new ae(1, 1, 1), o.opacity = 1, Array.isArray(n.baseColorFactor)) {
				let e = n.baseColorFactor;
				o.color.setRGB(e[0], e[1], e[2], je), o.opacity = e[3];
			}
			n.baseColorTexture !== void 0 && c.push(t.assignTexture(o, "map", n.baseColorTexture, ot)), o.metalness = n.metallicFactor === void 0 ? 1 : n.metallicFactor, o.roughness = n.roughnessFactor === void 0 ? 1 : n.roughnessFactor, n.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(o, "metalnessMap", n.metallicRoughnessTexture)), c.push(t.assignTexture(o, "roughnessMap", n.metallicRoughnessTexture))), a = this._invokeOne(function(t) {
				return t.getMaterialType && t.getMaterialType(e);
			}), c.push(Promise.all(this._invokeAll(function(t) {
				return t.extendMaterialParams && t.extendMaterialParams(e, o);
			})));
		}
		i.doubleSided === !0 && (o.side = ce);
		let l = i.alphaMode || Rr.OPAQUE;
		if (l === Rr.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, l === Rr.MASK && (o.alphaTest = i.alphaCutoff === void 0 ? .5 : i.alphaCutoff)), i.normalTexture !== void 0 && a !== ze && (c.push(t.assignTexture(o, "normalMap", i.normalTexture)), o.normalScale = new U(1, 1), i.normalTexture.scale !== void 0)) {
			let e = i.normalTexture.scale;
			o.normalScale.set(e, e);
		}
		if (i.occlusionTexture !== void 0 && a !== ze && (c.push(t.assignTexture(o, "aoMap", i.occlusionTexture)), i.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = i.occlusionTexture.strength)), i.emissiveFactor !== void 0 && a !== ze) {
			let e = i.emissiveFactor;
			o.emissive = new ae().setRGB(e[0], e[1], e[2], je);
		}
		return i.emissiveTexture !== void 0 && a !== ze && c.push(t.assignTexture(o, "emissiveMap", i.emissiveTexture, ot)), Promise.all(c).then(function() {
			let n = new a(o);
			return i.name && (n.name = i.name), Vr(n, i), t.associations.set(n, { materials: e }), i.extensions && Br(r, n, i), n;
		});
	}
	createUniqueName(e) {
		let t = et.sanitizeNodeName(e || "");
		return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
	}
	loadGeometries(e) {
		let t = this, n = this.extensions, r = this.primitiveCache;
		function i(e) {
			return n[Y.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then(function(n) {
				return Zr(n, e, t);
			});
		}
		let a = [];
		for (let n = 0, o = e.length; n < o; n++) {
			let o = e[n], s = Wr(o), c = r[s];
			if (c) a.push(c.promise);
			else {
				let e;
				e = o.extensions && o.extensions[Y.KHR_DRACO_MESH_COMPRESSION] ? i(o) : Zr(new re(), o, t), r[s] = {
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
			let t = a[e].material === void 0 ? zr(this.cache) : this.getDependency("material", a[e].material);
			o.push(t);
		}
		return o.push(t.loadGeometries(a)), Promise.all(o).then(function(n) {
			let o = n.slice(0, n.length - 1), s = n[n.length - 1], c = [];
			for (let n = 0, l = s.length; n < l; n++) {
				let l = s[n], u = a[n], d, f = o[n];
				if (u.mode === Ar.TRIANGLES || u.mode === Ar.TRIANGLE_STRIP || u.mode === Ar.TRIANGLE_FAN || u.mode === void 0) d = i.isSkinnedMesh === !0 ? new ut(l, f) : new Re(l, f), d.isSkinnedMesh === !0 && d.normalizeSkinWeights(), u.mode === Ar.TRIANGLE_STRIP ? d.geometry = Wn(d.geometry, yt) : u.mode === Ar.TRIANGLE_FAN && (d.geometry = Wn(d.geometry, vt));
				else if (u.mode === Ar.LINES) d = new De(l, f);
				else if (u.mode === Ar.LINE_STRIP) d = new Ce(l, f);
				else if (u.mode === Ar.LINE_LOOP) d = new Ee(l, f);
				else if (u.mode === Ar.POINTS) d = new Qe(l, f);
				else throw Error("THREE.GLTFLoader: Primitive mode unsupported: " + u.mode);
				Object.keys(d.geometry.morphAttributes).length > 0 && Ur(d, i), d.name = t.createUniqueName(i.name || "mesh_" + e), Vr(d, i), u.extensions && Br(r, d, u), t.assignFinalMaterial(d), c.push(d);
			}
			for (let n = 0, r = c.length; n < r; n++) t.associations.set(c[n], {
				meshes: e,
				primitives: n
			});
			if (c.length === 1) return i.extensions && Br(r, c[0], i), c[0];
			let l = new fe();
			i.extensions && Br(r, l, i), t.associations.set(l, { meshes: e });
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
		return n.type === "perspective" ? t = new Ye(Ie.radToDeg(r.yfov), r.aspectRatio || 1, r.znear || 1, r.zfar || 2e6) : n.type === "orthographic" && (t = new Je(-r.xmag, r.xmag, r.ymag, -r.ymag, r.znear, r.zfar)), n.name && (t.name = this.createUniqueName(n.name)), Vr(t, n), Promise.resolve(t);
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
					let t = new Le();
					n !== null && t.fromArray(n.array, e * 16), a.push(t);
				} else console.warn("THREE.GLTFLoader: Joint \"%s\" could not be found.", t.joints[e]);
			}
			return new lt(i, a);
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
			let u = new R(i, void 0, l);
			return Vr(u, r), u;
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
				e.isSkinnedMesh && e.bind(r, Jr);
			});
			for (let e = 0, r = n.length; e < r; e++) t.add(n[e]);
			if (t.userData.pivot !== void 0 && n.length > 0) {
				let e = t.userData.pivot, r = n[0];
				t.pivot = new W().fromArray(e), t.position.x -= e[0], t.position.y -= e[1], t.position.z -= e[2], r.position.set(0, 0, 0), delete t.userData.pivot;
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
			if (o = i.isBone === !0 ? new te() : t.length > 1 ? new fe() : t.length === 1 ? t[0] : new qe(), o !== t[0]) for (let e = 0, n = t.length; e < n; e++) o.add(t[e]);
			if (i.name && (o.userData.name = i.name, o.name = a), Vr(o, i), i.extensions && Br(n, o, i), i.matrix !== void 0) {
				let e = new Le();
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
		let t = this.extensions, n = this.json.scenes[e], r = this, i = new fe();
		n.name && (i.name = r.createUniqueName(n.name)), Vr(i, n), n.extensions && Br(t, i, n);
		let a = n.nodes || [], o = [];
		for (let e = 0, t = a.length; e < t; e++) o.push(r.getDependency("node", a[e]));
		return Promise.all(o).then(function(e) {
			for (let t = 0, n = e.length; t < n; t++) {
				let n = e[t];
				n.parent === null ? i.add(n) : i.add(Qn(n));
			}
			return r.associations = ((e) => {
				let t = /* @__PURE__ */ new Map();
				for (let [e, n] of r.associations) (e instanceof Fe || e instanceof ht) && t.set(e, n);
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
		Ir[i.path] === Ir.weights ? (c(e), e.isGroup && e.children.forEach(c)) : s.push(o);
		let l;
		switch (Ir[i.path]) {
			case Ir.weights:
				l = Ke;
				break;
			case Ir.rotation:
				l = nt;
				break;
			case Ir.translation:
			case Ir.scale:
				l = wt;
				break;
			default:
				switch (n.itemSize) {
					case 1:
						l = Ke;
						break;
					default:
						l = wt;
						break;
				}
				break;
		}
		let u = r.interpolation === void 0 ? Se : Lr[r.interpolation], d = this._getArrayFromAccessor(n);
		for (let e = 0, n = s.length; e < n; e++) {
			let n = new l(s[e] + "." + Ir[i.path], t.array, d, u);
			r.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(n), a.push(n);
		}
		return a;
	}
	_getArrayFromAccessor(e) {
		let t = e.array;
		if (e.normalized) {
			let e = Kr(t.constructor), n = new Float32Array(t.length);
			for (let r = 0, i = t.length; r < i; r++) n[r] = t[r] * e;
			t = n;
		}
		return t;
	}
	_createCubicSplineTrackInterpolant(e) {
		e.createInterpolant = function(e) {
			return new (this instanceof nt ? kr : Dr)(this.times, this.values, this.getValueSize() / 3, e);
		}, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
	}
};
function Xr(e, t, n) {
	let r = t.attributes, i = new V();
	if (r.POSITION !== void 0) {
		let e = n.json.accessors[r.POSITION], t = e.min, a = e.max;
		if (t !== void 0 && a !== void 0) {
			if (i.set(new W(t[0], t[1], t[2]), new W(a[0], a[1], a[2])), e.normalized) {
				let t = Kr(jr[e.componentType]);
				i.min.multiplyScalar(t), i.max.multiplyScalar(t);
			}
		} else {
			console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
			return;
		}
	} else return;
	let a = t.targets;
	if (a !== void 0) {
		let e = new W(), t = new W();
		for (let r = 0, i = a.length; r < i; r++) {
			let i = a[r];
			if (i.POSITION !== void 0) {
				let r = n.json.accessors[i.POSITION], a = r.min, o = r.max;
				if (a !== void 0 && o !== void 0) {
					if (t.setX(Math.max(Math.abs(a[0]), Math.abs(o[0]))), t.setY(Math.max(Math.abs(a[1]), Math.abs(o[1]))), t.setZ(Math.max(Math.abs(a[2]), Math.abs(o[2]))), r.normalized) {
						let e = Kr(jr[r.componentType]);
						t.multiplyScalar(e);
					}
					e.max(t);
				} else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
			}
		}
		i.expandByVector(e);
	}
	e.boundingBox = i;
	let o = new dt();
	i.getCenter(o.center), o.radius = i.min.distanceTo(i.max) / 2, e.boundingSphere = o;
}
function Zr(e, t, n) {
	let r = t.attributes, i = [];
	function a(t, r) {
		return n.getDependency("accessor", t).then(function(t) {
			e.setAttribute(r, t);
		});
	}
	for (let t in r) {
		let n = Fr[t] || t.toLowerCase();
		n in e.attributes || i.push(a(r[t], n));
	}
	if (t.indices !== void 0 && !e.index) {
		let r = n.getDependency("accessor", t.indices).then(function(t) {
			e.setIndex(t);
		});
		i.push(r);
	}
	return H.workingColorSpace !== je && "COLOR_0" in r && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${H.workingColorSpace}" not supported.`), Vr(e, t), Xr(e, t, n), Promise.all(i).then(function() {
		return t.targets === void 0 ? e : Hr(e, t.targets, n);
	});
}
//#endregion
//#region src/utils/modelLoader.ts
async function Qr(e) {
	let t = new er();
	return new Promise((n) => {
		t.parse(e, "", (e) => {
			let t = [];
			if (e.scene.updateMatrixWorld(!0), e.scene.traverse((e) => {
				if (e instanceof L.Mesh && e.geometry) {
					let n = e.geometry.clone();
					n.applyMatrix4(e.matrixWorld), t.push(n);
				}
			}), !t.length) {
				n(null);
				return;
			}
			let r = t.length === 1 ? t[0] : Hn(t, !1) ?? t[0];
			t.length > 1 && t.forEach((e) => e.dispose()), r.computeBoundingBox();
			let i = r.boundingBox, a = new L.Vector3(), o = new L.Vector3();
			i.getCenter(a), i.getSize(o);
			let s = Math.max(o.x, o.y, o.z), c = s > 0 ? .8 / s : 1;
			r.translate(-a.x, -i.min.y, -a.z), r.scale(c, c, c), n(r);
		}, (e) => {
			console.warn("[modelLoader] GLTF parse error:", e), n(null);
		});
	});
}
async function $r(e) {
	let t = new er();
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
var ei = {
	server: [
		.8,
		.12,
		.5
	],
	switch: [
		1,
		.06,
		.5
	],
	router: [
		.6,
		.6,
		.6
	],
	firewall: [
		.8,
		.2,
		.5
	],
	database: [
		.6,
		.6,
		.6
	],
	storage: [
		1.2,
		.3,
		.55
	],
	vm: [
		.6,
		.07,
		.38
	],
	container: [
		.45,
		.06,
		.3
	],
	load_balancer: [
		.5,
		.5,
		.5
	],
	access_point: [
		.4,
		.4,
		.4
	],
	cloud_service: [
		.7,
		.7,
		.7
	],
	unknown: [
		.6,
		.1,
		.4
	]
};
function ti() {
	let [e, t, n] = ei.server, r = new L.BoxGeometry(e, t, n), i = .06, a = t * 1.8, o = .1, s = n / 2 - o / 2, c = new L.BoxGeometry(i, a, o).translate(-(e / 2 + i / 2 - .01), 0, s), l = new L.BoxGeometry(i, a, o).translate(e / 2 + i / 2 - .01, 0, s), u = () => new L.BoxGeometry(.03, .03, .02);
	return Hn([
		r,
		c,
		l,
		...[
			0,
			1,
			2
		].map((r) => u().translate(-e / 2 + .12 + r * .06, t / 2 + .015, n / 2 - .02))
	]);
}
function ni() {
	let [e, t, n] = ei.switch, r = [new L.BoxGeometry(e, t, n)], i = t * .9, a = .05, o = e / 9;
	for (let s = 0; s < 8; s++) {
		let c = -e / 2 + o * (s + 1);
		r.push(new L.BoxGeometry(.06, i, a).translate(c, t / 2 + i * .3, n / 2 - a / 2));
	}
	return Hn(r);
}
function ri() {
	let e = .28, t = new L.CylinderGeometry(e, e * 1.05, .12, 10), n = .3, r = .018;
	return Hn([
		t,
		new L.CylinderGeometry(r, r, n, 6).rotateZ(L.MathUtils.degToRad(18)).translate(-.28 * .5, .186, 0),
		new L.CylinderGeometry(r, r, n, 6).rotateZ(L.MathUtils.degToRad(-18)).translate(e * .5, .186, 0)
	]);
}
function ii() {
	let [e, t, n] = ei.firewall, r = new L.BoxGeometry(e, t, n), i = e * .85;
	return Hn([r, new L.BoxGeometry(i, .03, .14).rotateX(L.MathUtils.degToRad(-25)).translate(0, t / 2 + .03, n / 2 - .1)]);
}
function ai() {
	let e = .3, t = [], n = -.16999999999999998;
	for (let r = 0; r < 3; r++) t.push(new L.CylinderGeometry(e, e, .12, 12).translate(0, n, 0)), n += .16999999999999998;
	return Hn(t);
}
function oi() {
	let [e, t, n] = ei.storage, r = [new L.BoxGeometry(e, t, n)], i = t * .75, a = .03, o = e / 7;
	for (let t = 0; t < 6; t++) {
		let s = -e / 2 + o * (t + 1);
		r.push(new L.BoxGeometry(.05, i, a).translate(s, 0, n / 2 - a / 2));
	}
	return Hn(r);
}
function si() {
	let [e, t, n] = ei.vm, r = t * .7, i = .03;
	return Hn([new L.BoxGeometry(e, r, n).translate(0, -r / 2 - i / 2, 0), new L.BoxGeometry(e * .85, r, n * .85).translate(.02, r / 2 + i / 2, 0)]);
}
function ci() {
	let [e, t, n] = ei.container, r = t * .8, i = .02;
	return Hn([new L.BoxGeometry(e, r, n).translate(0, -r / 2 - i / 2, 0), new L.BoxGeometry(e, r, n).translate(0, r / 2 + i / 2, 0)]);
}
function li() {
	let e = .22;
	return Hn([new L.SphereGeometry(e, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2).translate(0, -.02, 0), new L.CylinderGeometry(e * .9, e * .9, .02, 12).translate(0, -.03, 0)]);
}
function ui() {
	return Hn([
		new L.SphereGeometry(.2, 10, 8),
		new L.SphereGeometry(.15, 8, 6).translate(-.18, -.03, 0),
		new L.SphereGeometry(.15, 8, 6).translate(.18, -.03, 0),
		new L.SphereGeometry(.13, 8, 6).translate(0, .1, .08),
		new L.SphereGeometry(.12, 8, 6).translate(0, -.08, -.1)
	]);
}
var di = /* @__PURE__ */ new Map(), fi = /* @__PURE__ */ new Map();
function pi(e) {
	fi.forEach((e, t) => {
		let n = di.get(t);
		n && (n.disposeBoundsTree?.(), n.dispose(), di.delete(t));
	}), fi = new Map(e);
}
function mi(e) {
	if (di.has(e)) return di.get(e);
	let t = fi.get(e);
	if (t) {
		if (t.hasModel) {
			let n = new L.BoxGeometry(t.w, t.h, t.d);
			return n.computeBoundsTree(), di.set(e, n), n;
		}
		let n;
		switch (t.shape) {
			case "cylinder":
				n = new L.CylinderGeometry(t.w / 2, t.w / 2, t.h, 10);
				break;
			case "sphere":
				n = new L.SphereGeometry(t.w / 2, 10, 8);
				break;
			case "octahedron":
				n = new L.OctahedronGeometry(t.w / 2);
				break;
			default: n = new L.BoxGeometry(t.w, t.h, t.d);
		}
		return n.computeBoundsTree(), di.set(e, n), n;
	}
	let n;
	switch (e) {
		case "server":
			n = ti();
			break;
		case "switch":
			n = ni();
			break;
		case "router":
			n = ri();
			break;
		case "firewall":
			n = ii();
			break;
		case "database":
			n = ai();
			break;
		case "storage":
			n = oi();
			break;
		case "vm":
			n = si();
			break;
		case "container":
			n = ci();
			break;
		case "load_balancer":
			n = new L.OctahedronGeometry(.24);
			break;
		case "access_point":
			n = li();
			break;
		case "cloud_service":
			n = ui();
			break;
		default: {
			let t = ei[e] ?? [
				.6,
				.1,
				.4
			];
			n = new L.BoxGeometry(t[0], t[1], t[2]);
		}
	}
	return n.computeBoundsTree(), di.set(e, n), n;
}
async function hi(e) {
	let t = [];
	e.forEach((e) => {
		e.hasModel && (di.has(e.id) || t.push((async () => {
			try {
				let t = await Xn(e.id);
				if (!t) return;
				let n = await Qr(t);
				if (!n) return;
				n.computeBoundsTree(), di.set(e.id, n);
			} catch (t) {
				console.warn(`[geometryFactory] Failed to preload model "${e.id}":`, t);
			}
		})()));
	}), t.length && await Promise.all(t);
}
function gi() {
	di.forEach((e) => {
		e.disposeBoundsTree(), e.dispose();
	}), di.clear();
}
//#endregion
//#region src/renderers/DeviceRenderer.ts
var _i = /* @__PURE__ */ new Map();
function vi(e) {
	return _i.has(e) || _i.set(e, new L.MeshStandardMaterial({
		color: new L.Color(Vn(e)),
		roughness: .35,
		metalness: .65,
		emissive: new L.Color(0),
		emissiveIntensity: 0
	})), _i.get(e);
}
var yi = class {
	scene;
	objects = /* @__PURE__ */ new Map();
	dummy = new L.Object3D();
	instancedMeshes = /* @__PURE__ */ new Map();
	instanceIndex = /* @__PURE__ */ new Map();
	instanceColors = /* @__PURE__ */ new Map();
	statusMap = /* @__PURE__ */ new Map();
	dimmedIds = /* @__PURE__ */ new Set();
	searchLabels = /* @__PURE__ */ new Map();
	statusBadges = /* @__PURE__ */ new Map();
	ackedIds = /* @__PURE__ */ new Set();
	labelScale = 1;
	selectionRing = null;
	selectedDeviceId = null;
	constructor(e) {
		this.scene = e;
	}
	_updateBadge(e, t) {
		let n = this.statusBadges.get(e);
		n && (this.scene.remove(n), n.element.remove(), this.statusBadges.delete(e));
		let r = this.ackedIds.has(e), i = In[t];
		if (!i && !r) return;
		let a = this.getDeviceWorldPos(e);
		if (!a) return;
		let o = document.createElement("div");
		if (o.className = "device-status-badge", o.style.cssText = `
      display:flex; align-items:center; gap:3px;
      background:rgba(15,23,42,.92); border:1px solid ${On[t]};
      border-radius:5px; padding:1px 5px; pointer-events:none; white-space:nowrap;
      font-family:monospace; font-size:${11 * this.labelScale}px; font-weight:700; color:${On[t]};`, o.textContent = i, r) {
			let e = document.createElement("span");
			e.textContent = In.acknowledged, e.style.cssText = "color:#4ade80;", o.appendChild(e);
		}
		let s = new vn(o);
		s.position.copy(a).add(new L.Vector3(0, 1.3, 0)), this.scene.add(s), this.statusBadges.set(e, s);
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
			let n = mi(t), r = vi(t).clone();
			r.vertexColors = !1;
			let i = new L.InstancedMesh(n, r, e.length + 50);
			i.instanceMatrix.setUsage(L.DynamicDrawUsage), i.count = e.length, i.userData.deviceType = t, e.forEach((e, n) => {
				let r = e.mapping.position;
				this.dummy.position.set(r.x, r.y, r.z), this.dummy.rotation.set(0, 0, 0), this.dummy.scale.setScalar(1), this.dummy.updateMatrix(), i.setMatrixAt(n, this.dummy.matrix);
				let a = e.device.status ?? "unknown", o = kn[a];
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
			this.setPosition(e.id, new L.Vector3(t.position.x, t.position.y, t.position.z));
			return;
		}
		let n = t.visualType ?? e.normalizedType ?? "unknown", r = e.status ?? "unknown", i = kn[r] ?? new L.Color(7041664), a = this.instancedMeshes.get(n);
		if (a && a.count < a.instanceMatrix.count) {
			let o = a.count;
			this.dummy.position.set(t.position.x, t.position.y, t.position.z), this.dummy.rotation.set(0, 0, 0), this.dummy.scale.setScalar(1), this.dummy.updateMatrix(), a.setMatrixAt(o, this.dummy.matrix), a.setColorAt(o, i), a.count = o + 1, a.instanceMatrix.needsUpdate = !0, a.instanceColor && (a.instanceColor.needsUpdate = !0), a.userData[`device_${o}`] = e.id, this.instanceIndex.set(e.id, {
				type: n,
				idx: o
			}), this.instanceColors.set(e.id, i.clone()), this.statusMap.set(e.id, r), t.operatorState?.acknowledged && this.ackedIds.add(e.id), this._updateBadge(e.id, r);
		} else {
			let i = [];
			if (a) {
				for (let e = 0; e < a.count; e++) {
					let t = a.userData[`device_${e}`];
					if (!t) continue;
					let n = new L.Matrix4();
					a.getMatrixAt(e, n), i.push({
						id: t,
						pos: new L.Vector3().setFromMatrixPosition(n),
						status: this.statusMap.get(t) ?? "unknown"
					});
				}
				this.scene.remove(a), a.material.dispose(), this.instancedMeshes.delete(n);
			}
			i.push({
				id: e.id,
				pos: new L.Vector3(t.position.x, t.position.y, t.position.z),
				status: r
			});
			let o = mi(n), s = vi(n).clone();
			s.vertexColors = !1;
			let c = new L.InstancedMesh(o, s, i.length + 50);
			c.instanceMatrix.setUsage(L.DynamicDrawUsage), c.count = i.length, c.userData.deviceType = n, i.forEach(({ id: e, pos: t, status: r }, i) => {
				this.dummy.position.copy(t), this.dummy.rotation.set(0, 0, 0), this.dummy.scale.setScalar(1), this.dummy.updateMatrix(), c.setMatrixAt(i, this.dummy.matrix);
				let a = kn[r] ?? new L.Color(7041664);
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
		let i = kn[t].clone();
		this.dimmedIds.size > 0 && !this.dimmedIds.has(e) ? i = i.clone().multiplyScalar(.18) : this.dimmedIds.size > 0 && this.dimmedIds.has(e) && (i = i.clone().multiplyScalar(2)), r.setColorAt(n.idx, i), r.instanceColor && (r.instanceColor.needsUpdate = !0), this.instanceColors.set(e, i), this._updateBadge(e, t);
	}
	pulseStatus(e, t, n) {
		let r = this.instanceIndex.get(e);
		if (!r) return;
		let i = this.instancedMeshes.get(r.type);
		if (!i) return;
		let a = kn[t].clone().clone().multiplyScalar(1 + n * 1.5);
		i.setColorAt(r.idx, a), i.instanceColor && (i.instanceColor.needsUpdate = !0);
	}
	setHighlight(e, t) {
		let n = this.instanceIndex.get(e);
		if (!n) return;
		let r = this.instancedMeshes.get(n.type);
		if (!r) return;
		let i = this.instanceColors.get(e) ?? new L.Color(16777215), a = t ? i.clone().multiplyScalar(2.4) : i.clone();
		r.setColorAt(n.idx, a), r.instanceColor && (r.instanceColor.needsUpdate = !0);
	}
	setMultiHighlight(e) {
		let t = new Set(e);
		this.instancedMeshes.forEach((e) => {
			for (let n = 0; n < e.count; n++) {
				let r = e.userData[`device_${n}`];
				if (!r) continue;
				let i = this.instanceColors.get(r) ?? new L.Color(16777215);
				e.setColorAt(n, t.has(r) ? i.clone().multiplyScalar(3) : i.clone());
			}
			e.instanceColor && (e.instanceColor.needsUpdate = !0);
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
			let a = new vn(i);
			a.position.copy(r).add(new L.Vector3(0, 1.7, 0)), this.scene.add(a), this.searchLabels.set(e, a), n += 1;
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
		let i = new L.Matrix4();
		r.getMatrixAt(n.idx, i), i.setPosition(t), r.setMatrixAt(n.idx, i), r.instanceMatrix.needsUpdate = !0;
	}
	applySearchFilter(e, t) {
		if (!t) {
			this.dimmedIds.clear(), this.clearSearchLabels(), this.instancedMeshes.forEach((e) => {
				for (let t = 0; t < e.count; t++) {
					let n = e.userData[`device_${t}`];
					if (!n) continue;
					let r = this.statusMap.get(n);
					if (!r) continue;
					let i = kn[r].clone();
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
				let o = kn[a].clone(), s = i ? o.clone() : o.clone().multiplyScalar(.3);
				t.setColorAt(n, s), this.instanceColors.set(r, s);
			}
			t.instanceColor && (t.instanceColor.needsUpdate = !0);
		});
	}
	setLabelScale(e) {
		if (e !== this.labelScale && (this.labelScale = e, this.statusBadges.forEach((e, t) => {
			let n = this.statusMap.get(t);
			n && this._updateBadge(t, n);
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
				let i = kn[r].clone(), a = this.dimmedIds.size === 0 || this.dimmedIds.has(n) ? i.clone() : i.clone().multiplyScalar(.3);
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
			let e = new L.RingGeometry(.85, 1.05, 32), t = new L.MeshBasicMaterial({
				color: 6333946,
				transparent: !0,
				opacity: .95,
				side: L.DoubleSide,
				depthTest: !1
			});
			this.selectionRing = new L.Mesh(e, t), this.selectionRing.rotation.x = -Math.PI / 2, this.selectionRing.renderOrder = 999, this.scene.add(this.selectionRing);
		}
		this.selectionRing.visible = !0, this.tick();
	}
	tick() {
		if (this.selectedDeviceId && this.selectionRing?.visible) {
			let e = this.getDeviceWorldPos(this.selectedDeviceId);
			e && this.selectionRing.position.set(e.x, .03, e.z);
		}
		this.statusBadges.forEach((e, t) => {
			let n = this.getDeviceWorldPos(t);
			n && e.position.copy(n).add(new L.Vector3(0, 1.3, 0));
		});
	}
	getDeviceWorldPos(e) {
		let t = this.instanceIndex.get(e);
		if (!t) return null;
		let n = this.instancedMeshes.get(t.type);
		if (!n) return null;
		let r = new L.Matrix4();
		n.getMatrixAt(t.idx, r);
		let i = new L.Vector3();
		return i.setFromMatrixPosition(r), i;
	}
	dispose() {
		this.clearSearchLabels(), this.statusBadges.forEach((e) => {
			this.scene.remove(e), e.element.remove();
		}), this.statusBadges.clear(), this.ackedIds.clear(), this.selectionRing &&= (this.scene.remove(this.selectionRing), this.selectionRing.geometry.dispose(), this.selectionRing.material.dispose(), null), this.selectedDeviceId = null, this.instancedMeshes.forEach((e) => {
			e.material.dispose(), this.scene.remove(e);
		}), this.instancedMeshes.clear(), this.instanceIndex.clear(), _i.forEach((e) => e.dispose()), _i.clear(), gi();
	}
	clearSearchLabels() {
		this.searchLabels.forEach((e) => {
			this.scene.remove(e), e.element.remove();
		}), this.searchLabels.clear();
	}
}, bi = {
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
}, xi = class {
	scene;
	objects = /* @__PURE__ */ new Map();
	constructor(e) {
		this.scene = e;
	}
	loadSpaces(e) {
		e.filter((e) => !e.archived).forEach((e) => this.addSpace(e));
	}
	addSpace(e) {
		if (this.objects.has(e.id)) return;
		let t = bi[e.type] ?? bi.zone, n = new L.Group(), r = e.position ?? {
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
		a.className = "space-badge", a.style.cssText = "\n      background:rgba(9,13,24,.90);border:1px solid #2a4a8a;border-radius:5px;\n      padding:2px 7px;font-size:10px;font-family:monospace;color:#94a3b8;\n      white-space:nowrap;pointer-events:none;", a.textContent = e.name;
		let o = new vn(a);
		o.position.set(0, e.type === "rack" ? 1 : .8, 0), o.visible = this.shouldShowBadge(e.type, e.source), n.add(o);
		let s = e.type === "rack" ? .25 : .4, c = new L.BoxGeometry(i.width, s, i.depth);
		c.computeBoundsTree();
		let l = new L.Mesh(c, new L.MeshBasicMaterial({ visible: !1 }));
		l.position.y = s / 2, l.userData.spaceId = e.id, l.userData.spaceType = e.type, l.userData.spaceSource = e.source, n.add(l), this.scene.add(n), this.objects.set(e.id, {
			group: n,
			hitMesh: l,
			badgeEl: a,
			badge: o
		}), this.applyBadgeLod();
	}
	_buildRack(e, t, n, r) {
		let i = n.width, a = n.depth, o = new L.Mesh(new L.BoxGeometry(i, .15, a), new L.MeshStandardMaterial({
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
		let s = new L.EdgesGeometry(new L.BoxGeometry(i, .15, a)), c = new L.LineSegments(s, new L.LineBasicMaterial({
			color: r.edge,
			transparent: !0,
			opacity: .8
		}));
		c.position.y = .075, e.add(c);
	}
	_buildSite(e, t, n, r) {
		let i = new L.Mesh(new L.PlaneGeometry(n.width, n.depth), new L.MeshStandardMaterial({
			color: r.floor,
			transparent: !0,
			opacity: .18,
			roughness: 1,
			polygonOffset: !0,
			polygonOffsetFactor: -2,
			polygonOffsetUnits: -2
		}));
		i.rotation.x = -Math.PI / 2, i.position.y = .05, e.add(i);
		let a = new L.LineLoop(new L.BufferGeometry().setFromPoints([
			new L.Vector3(-n.width / 2, .01, -n.depth / 2),
			new L.Vector3(n.width / 2, .01, -n.depth / 2),
			new L.Vector3(n.width / 2, .01, n.depth / 2),
			new L.Vector3(-n.width / 2, .01, n.depth / 2)
		]), new L.LineBasicMaterial({
			color: r.edge,
			transparent: !0,
			opacity: .5
		}));
		e.add(a);
	}
	_buildZone(e, t, n, r) {
		let i = t.color ? parseInt(t.color.slice(1), 16) : r.floor, a = new L.Mesh(new L.PlaneGeometry(n.width, n.depth), new L.MeshStandardMaterial({
			color: i,
			transparent: !0,
			opacity: .28,
			roughness: 1,
			polygonOffset: !0,
			polygonOffsetFactor: -4,
			polygonOffsetUnits: -4
		}));
		a.rotation.x = -Math.PI / 2, a.position.y = .12, e.add(a);
		let o = new L.EdgesGeometry(new L.BoxGeometry(n.width, .02, n.depth)), s = new L.LineSegments(o, new L.LineBasicMaterial({
			color: r.edge,
			transparent: !0,
			opacity: .5
		}));
		s.position.y = .01, e.add(s);
	}
	setSelected(e, t) {
		let n = this.objects.get(e);
		if (!n) return;
		let r = n.group.children.find((e) => e instanceof L.Mesh && e !== n.hitMesh);
		if (r) {
			let e = r.material;
			e.emissive = t ? new L.Color(22015) : new L.Color(0), e.emissiveIntensity = t ? .3 : 0;
		}
		let i = n.hitMesh.userData.spaceType, a = n.hitMesh.userData.spaceSource;
		n.badge.visible = t || this.shouldShowBadge(i, a);
	}
	updateBadge(e, t) {
		let n = this.objects.get(e);
		n && (n.badgeEl.textContent = t);
	}
	applyBadgeLod(e = 0) {
		this.objects.forEach((t) => {
			let n = t.hitMesh.userData.spaceType, r = t.hitMesh.userData.spaceSource;
			t.badge.visible = this.shouldShowBadge(n, r, e);
		});
	}
	updateLod(e, t) {
		let n = e.position.distanceTo(t);
		this.applyBadgeLod(n);
	}
	setPosition(e, t) {
		let n = this.objects.get(e);
		n && n.group.position.set(t.x, t.y, t.z);
	}
	removeSpace(e) {
		let t = this.objects.get(e);
		t && (this.disposeSpaceObject(t), this.objects.delete(e), this.applyBadgeLod());
	}
	getHitMeshes() {
		return [...this.objects.values()].map((e) => e.hitMesh);
	}
	getSpaceWorldPos(e) {
		let t = this.objects.get(e);
		return t ? t.group.position.clone() : new L.Vector3();
	}
	shouldShowBadge(e, t, n = 0) {
		let r = this.objects.size;
		return e === "site" || e === "floor" || e === "building" ? !0 : e === "rack" && t === "import" || n > 120 ? !1 : n > 70 ? e !== "rack" : r > 120 ? !1 : r > 60 ? e !== "rack" : e === "rack" || e === "zone" || e === "cloud";
	}
	dispose() {
		this.objects.forEach((e) => this.disposeSpaceObject(e)), this.objects.clear();
	}
	disposeSpaceObject(e) {
		this.scene.remove(e.group), e.badge.element.remove(), e.group.traverse((e) => {
			if (e instanceof L.Mesh || e instanceof L.LineSegments || e instanceof L.LineLoop) {
				e.geometry?.disposeBoundsTree?.(), e.geometry?.dispose();
				let t = e.material;
				Array.isArray(t) ? t.forEach((e) => e.dispose()) : t?.dispose();
			}
		});
	}
}, Si = new V(), Ci = new W(), wi = class extends he {
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
		]), this.setAttribute("position", new ue([
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
		], 3)), this.setAttribute("uv", new ue([
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
		let n = new ge(t, 6, 1);
		return this.setAttribute("instanceStart", new ye(n, 3, 0)), this.setAttribute("instanceEnd", new ye(n, 3, 3)), this.instanceCount = this.attributes.instanceStart.count, this.computeBoundingBox(), this.computeBoundingSphere(), this;
	}
	setColors(e) {
		let t;
		e instanceof Float32Array ? t = e : Array.isArray(e) && (t = new Float32Array(e));
		let n = new ge(t, 6, 1);
		return this.setAttribute("instanceColorStart", new ye(n, 3, 0)), this.setAttribute("instanceColorEnd", new ye(n, 3, 3)), this;
	}
	fromWireframeGeometry(e) {
		return this.setPositions(e.attributes.position.array), this;
	}
	fromEdgesGeometry(e) {
		return this.setPositions(e.attributes.position.array), this;
	}
	fromMesh(e) {
		return this.fromWireframeGeometry(new Tt(e.geometry)), this;
	}
	fromLineSegments(e) {
		let t = e.geometry;
		return this.setPositions(t.attributes.position.array), this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new V());
		let e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
		e !== void 0 && t !== void 0 && (this.boundingBox.setFromBufferAttribute(e), Si.setFromBufferAttribute(t), this.boundingBox.union(Si));
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new dt()), this.boundingBox === null && this.computeBoundingBox();
		let e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
		if (e !== void 0 && t !== void 0) {
			let n = this.boundingSphere.center;
			this.boundingBox.getCenter(n);
			let r = 0;
			for (let i = 0, a = e.count; i < a; i++) Ci.fromBufferAttribute(e, i), r = Math.max(r, n.distanceToSquared(Ci)), Ci.fromBufferAttribute(t, i), r = Math.max(r, n.distanceToSquared(Ci));
			this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
		}
	}
	toJSON() {}
};
xt.line = {
	worldUnits: { value: 1 },
	linewidth: { value: 1 },
	resolution: { value: new U(1, 1) },
	dashOffset: { value: 0 },
	dashScale: { value: 1 },
	dashSize: { value: 1 },
	gapSize: { value: 1 }
}, st.line = {
	uniforms: St.merge([
		xt.common,
		xt.fog,
		xt.line
	]),
	vertexShader: "\n		#include <common>\n		#include <color_pars_vertex>\n		#include <fog_pars_vertex>\n		#include <logdepthbuf_pars_vertex>\n		#include <clipping_planes_pars_vertex>\n\n		uniform float linewidth;\n		uniform vec2 resolution;\n\n		attribute vec3 instanceStart;\n		attribute vec3 instanceEnd;\n\n		attribute vec3 instanceColorStart;\n		attribute vec3 instanceColorEnd;\n\n		#ifdef WORLD_UNITS\n\n			varying vec4 worldPos;\n			varying vec3 worldStart;\n			varying vec3 worldEnd;\n\n			#ifdef USE_DASH\n\n				varying vec2 vUv;\n\n			#endif\n\n		#else\n\n			varying vec2 vUv;\n\n		#endif\n\n		#ifdef USE_DASH\n\n			uniform float dashScale;\n			attribute float instanceDistanceStart;\n			attribute float instanceDistanceEnd;\n			varying float vLineDistance;\n\n		#endif\n\n		void trimSegment( const in vec4 start, inout vec4 end ) {\n\n			// trim end segment so it terminates between the camera plane and the near plane\n\n			// conservative estimate of the near plane\n			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column\n			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column\n			float nearEstimate = - 0.5 * b / a;\n\n			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );\n\n			end.xyz = mix( start.xyz, end.xyz, alpha );\n\n		}\n\n		void main() {\n\n			#ifdef USE_COLOR\n\n				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;\n\n			#endif\n\n			#ifdef USE_DASH\n\n				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;\n				vUv = uv;\n\n			#endif\n\n			float aspect = resolution.x / resolution.y;\n\n			// camera space\n			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );\n			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );\n\n			#ifdef WORLD_UNITS\n\n				worldStart = start.xyz;\n				worldEnd = end.xyz;\n\n			#else\n\n				vUv = uv;\n\n			#endif\n\n			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane\n			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space\n			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly\n			// perhaps there is a more elegant solution -- WestLangley\n\n			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column\n\n			if ( perspective ) {\n\n				if ( start.z < 0.0 && end.z >= 0.0 ) {\n\n					trimSegment( start, end );\n\n				} else if ( end.z < 0.0 && start.z >= 0.0 ) {\n\n					trimSegment( end, start );\n\n				}\n\n			}\n\n			// clip space\n			vec4 clipStart = projectionMatrix * start;\n			vec4 clipEnd = projectionMatrix * end;\n\n			// ndc space\n			vec3 ndcStart = clipStart.xyz / clipStart.w;\n			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;\n\n			// direction\n			vec2 dir = ndcEnd.xy - ndcStart.xy;\n\n			// account for clip-space aspect ratio\n			dir.x *= aspect;\n			dir = normalize( dir );\n\n			#ifdef WORLD_UNITS\n\n				vec3 worldDir = normalize( end.xyz - start.xyz );\n				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );\n				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );\n				vec3 worldFwd = cross( worldDir, worldUp );\n				worldPos = position.y < 0.5 ? start: end;\n\n				// height offset\n				float hw = linewidth * 0.5;\n				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;\n\n				// don't extend the line if we're rendering dashes because we\n				// won't be rendering the endcaps\n				#ifndef USE_DASH\n\n					// cap extension\n					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;\n\n					// add width to the box\n					worldPos.xyz += worldFwd * hw;\n\n					// endcaps\n					if ( position.y > 1.0 || position.y < 0.0 ) {\n\n						worldPos.xyz -= worldFwd * 2.0 * hw;\n\n					}\n\n				#endif\n\n				// project the worldpos\n				vec4 clip = projectionMatrix * worldPos;\n\n				// shift the depth of the projected points so the line\n				// segments overlap neatly\n				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;\n				clip.z = clipPose.z * clip.w;\n\n			#else\n\n				vec2 offset = vec2( dir.y, - dir.x );\n				// undo aspect ratio adjustment\n				dir.x /= aspect;\n				offset.x /= aspect;\n\n				// sign flip\n				if ( position.x < 0.0 ) offset *= - 1.0;\n\n				// endcaps\n				if ( position.y < 0.0 ) {\n\n					offset += - dir;\n\n				} else if ( position.y > 1.0 ) {\n\n					offset += dir;\n\n				}\n\n				// adjust for linewidth\n				offset *= linewidth;\n\n				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...\n				offset /= resolution.y;\n\n				// select end\n				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;\n\n				// back to clip space\n				offset *= clip.w;\n\n				clip.xy += offset;\n\n			#endif\n\n			gl_Position = clip;\n\n			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation\n\n			#include <logdepthbuf_vertex>\n			#include <clipping_planes_vertex>\n			#include <fog_vertex>\n\n		}\n		",
	fragmentShader: "\n		uniform vec3 diffuse;\n		uniform float opacity;\n		uniform float linewidth;\n\n		#ifdef USE_DASH\n\n			uniform float dashOffset;\n			uniform float dashSize;\n			uniform float gapSize;\n\n		#endif\n\n		varying float vLineDistance;\n\n		#ifdef WORLD_UNITS\n\n			varying vec4 worldPos;\n			varying vec3 worldStart;\n			varying vec3 worldEnd;\n\n			#ifdef USE_DASH\n\n				varying vec2 vUv;\n\n			#endif\n\n		#else\n\n			varying vec2 vUv;\n\n		#endif\n\n		#include <common>\n		#include <color_pars_fragment>\n		#include <fog_pars_fragment>\n		#include <logdepthbuf_pars_fragment>\n		#include <clipping_planes_pars_fragment>\n\n		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {\n\n			float mua;\n			float mub;\n\n			vec3 p13 = p1 - p3;\n			vec3 p43 = p4 - p3;\n\n			vec3 p21 = p2 - p1;\n\n			float d1343 = dot( p13, p43 );\n			float d4321 = dot( p43, p21 );\n			float d1321 = dot( p13, p21 );\n			float d4343 = dot( p43, p43 );\n			float d2121 = dot( p21, p21 );\n\n			float denom = d2121 * d4343 - d4321 * d4321;\n\n			float numer = d1343 * d4321 - d1321 * d4343;\n\n			mua = numer / denom;\n			mua = clamp( mua, 0.0, 1.0 );\n			mub = ( d1343 + d4321 * ( mua ) ) / d4343;\n			mub = clamp( mub, 0.0, 1.0 );\n\n			return vec2( mua, mub );\n\n		}\n\n		void main() {\n\n			float alpha = opacity;\n			vec4 diffuseColor = vec4( diffuse, alpha );\n\n			#include <clipping_planes_fragment>\n\n			#ifdef USE_DASH\n\n				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps\n\n				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX\n\n			#endif\n\n			#ifdef WORLD_UNITS\n\n				// Find the closest points on the view ray and the line segment\n				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;\n				vec3 lineDir = worldEnd - worldStart;\n				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );\n\n				vec3 p1 = worldStart + lineDir * params.x;\n				vec3 p2 = rayEnd * params.y;\n				vec3 delta = p1 - p2;\n				float len = length( delta );\n				float norm = len / linewidth;\n\n				#ifndef USE_DASH\n\n					#ifdef USE_ALPHA_TO_COVERAGE\n\n						float dnorm = fwidth( norm );\n						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );\n\n					#else\n\n						if ( norm > 0.5 ) {\n\n							discard;\n\n						}\n\n					#endif\n\n				#endif\n\n			#else\n\n				#ifdef USE_ALPHA_TO_COVERAGE\n\n					// artifacts appear on some hardware if a derivative is taken within a conditional\n					float a = vUv.x;\n					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n					float len2 = a * a + b * b;\n					float dlen = fwidth( len2 );\n\n					if ( abs( vUv.y ) > 1.0 ) {\n\n						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );\n\n					}\n\n				#else\n\n					if ( abs( vUv.y ) > 1.0 ) {\n\n						float a = vUv.x;\n						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n						float len2 = a * a + b * b;\n\n						if ( len2 > 1.0 ) discard;\n\n					}\n\n				#endif\n\n			#endif\n\n			#include <logdepthbuf_fragment>\n			#include <color_fragment>\n\n			gl_FragColor = vec4( diffuseColor.rgb, alpha );\n\n			#include <tonemapping_fragment>\n			#include <colorspace_fragment>\n			#include <fog_fragment>\n			#include <premultiplied_alpha_fragment>\n\n		}\n		"
};
var Ti = class extends ct {
	constructor(e) {
		super({
			type: "LineMaterial",
			uniforms: St.clone(st.line.uniforms),
			vertexShader: st.line.vertexShader,
			fragmentShader: st.line.fragmentShader,
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
}, Ei = new Ct(), Di = new W(), Oi = new W(), ki = new Ct(), Ai = new Ct(), ji = new Ct(), Mi = new W(), Ni = new Le(), Pi = new we(), Fi = new W(), Ii = new V(), Li = new dt(), Ri = new Ct(), zi, Bi;
function Vi(e, t, n) {
	return Ri.set(0, 0, -t, 1).applyMatrix4(e.projectionMatrix), Ri.multiplyScalar(1 / Ri.w), Ri.x = Bi / n.width, Ri.y = Bi / n.height, Ri.applyMatrix4(e.projectionMatrixInverse), Ri.multiplyScalar(1 / Ri.w), Math.abs(Math.max(Ri.x, Ri.y));
}
function Hi(e, t) {
	let n = e.matrixWorld, r = e.geometry, i = r.attributes.instanceStart, a = r.attributes.instanceEnd, o = Math.min(r.instanceCount, i.count);
	for (let r = 0, s = o; r < s; r++) {
		Pi.start.fromBufferAttribute(i, r), Pi.end.fromBufferAttribute(a, r), Pi.applyMatrix4(n);
		let o = new W(), s = new W();
		zi.distanceSqToSegment(Pi.start, Pi.end, s, o), s.distanceTo(o) < Bi * .5 && t.push({
			point: s,
			pointOnLine: o,
			distance: zi.origin.distanceTo(s),
			object: e,
			face: null,
			faceIndex: r,
			uv: null,
			uv1: null
		});
	}
}
function Ui(e, t, n) {
	let r = t.projectionMatrix, i = e.material.resolution, a = e.matrixWorld, o = e.geometry, s = o.attributes.instanceStart, c = o.attributes.instanceEnd, l = Math.min(o.instanceCount, s.count), u = -t.near;
	zi.at(1, ji), ji.w = 1, ji.applyMatrix4(t.matrixWorldInverse), ji.applyMatrix4(r), ji.multiplyScalar(1 / ji.w), ji.x *= i.x / 2, ji.y *= i.y / 2, ji.z = 0, Mi.copy(ji), Ni.multiplyMatrices(t.matrixWorldInverse, a);
	for (let t = 0, o = l; t < o; t++) {
		if (ki.fromBufferAttribute(s, t), Ai.fromBufferAttribute(c, t), ki.w = 1, Ai.w = 1, ki.applyMatrix4(Ni), Ai.applyMatrix4(Ni), ki.z > u && Ai.z > u) continue;
		if (ki.z > u) {
			let e = ki.z - Ai.z, t = (ki.z - u) / e;
			ki.lerp(Ai, t);
		} else if (Ai.z > u) {
			let e = Ai.z - ki.z, t = (Ai.z - u) / e;
			Ai.lerp(ki, t);
		}
		ki.applyMatrix4(r), Ai.applyMatrix4(r), ki.multiplyScalar(1 / ki.w), Ai.multiplyScalar(1 / Ai.w), ki.x *= i.x / 2, ki.y *= i.y / 2, Ai.x *= i.x / 2, Ai.y *= i.y / 2, Pi.start.copy(ki), Pi.start.z = 0, Pi.end.copy(Ai), Pi.end.z = 0;
		let o = Pi.closestPointToPointParameter(Mi, !0);
		Pi.at(o, Fi);
		let l = Ie.lerp(ki.z, Ai.z, o), d = l >= -1 && l <= 1, f = Mi.distanceTo(Fi) < Bi * .5;
		if (d && f) {
			Pi.start.fromBufferAttribute(s, t), Pi.end.fromBufferAttribute(c, t), Pi.start.applyMatrix4(a), Pi.end.applyMatrix4(a);
			let r = new W(), i = new W();
			zi.distanceSqToSegment(Pi.start, Pi.end, i, r), n.push({
				point: i,
				pointOnLine: r,
				distance: zi.origin.distanceTo(i),
				object: e,
				face: null,
				faceIndex: t,
				uv: null,
				uv1: null
			});
		}
	}
}
var Wi = class extends Re {
	constructor(e = new wi(), t = new Ti({ color: Math.random() * 16777215 })) {
		super(e, t), this.isLineSegments2 = !0, this.type = "LineSegments2";
	}
	computeLineDistances() {
		let e = this.geometry, t = e.attributes.instanceStart, n = e.attributes.instanceEnd, r = new Float32Array(2 * t.count);
		for (let e = 0, i = 0, a = t.count; e < a; e++, i += 2) Di.fromBufferAttribute(t, e), Oi.fromBufferAttribute(n, e), r[i] = i === 0 ? 0 : r[i - 1], r[i + 1] = r[i] + Di.distanceTo(Oi);
		let i = new ge(r, 2, 1);
		return e.setAttribute("instanceDistanceStart", new ye(i, 1, 0)), e.setAttribute("instanceDistanceEnd", new ye(i, 1, 1)), this;
	}
	raycast(e, t) {
		let n = this.material.worldUnits, r = e.camera;
		r === null && !n && console.error("LineSegments2: \"Raycaster.camera\" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.");
		let i = e.params.Line2 === void 0 ? 0 : e.params.Line2.threshold || 0;
		zi = e.ray;
		let a = this.matrixWorld, o = this.geometry, s = this.material;
		Bi = s.linewidth + i, o.boundingSphere === null && o.computeBoundingSphere(), Li.copy(o.boundingSphere).applyMatrix4(a);
		let c;
		if (c = n ? Bi * .5 : Vi(r, Math.max(r.near, Li.distanceToPoint(zi.origin)), s.resolution), Li.radius += c, zi.intersectsSphere(Li) === !1) return;
		o.boundingBox === null && o.computeBoundingBox(), Ii.copy(o.boundingBox).applyMatrix4(a);
		let l;
		l = n ? Bi * .5 : Vi(r, Math.max(r.near, Ii.distanceToPoint(zi.origin)), s.resolution), Ii.expandByScalar(l), zi.intersectsBox(Ii) !== !1 && (n ? Hi(this, t) : Ui(this, r, t));
	}
	onBeforeRender(e) {
		let t = this.material.uniforms;
		t && t.resolution && (e.getViewport(Ei), this.material.uniforms.resolution.value.set(Ei.z, Ei.w));
	}
}, Gi = class extends wi {
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
}, Ki = class extends Wi {
	constructor(e = new Gi(), t = new Ti({ color: Math.random() * 16777215 })) {
		super(e, t), this.isLine2 = !0, this.type = "Line2";
	}
}, qi = .45, Ji = .1, Yi = 1.4;
function Xi(e) {
	let t = [];
	return e.forEach((e) => t.push(e.x, e.y, e.z)), t;
}
var Zi = class {
	scene;
	objects = /* @__PURE__ */ new Map();
	previewLine = null;
	_elapsed = 0;
	_resolution = new L.Vector2(1, 1);
	constructor(e) {
		this.scene = e;
	}
	loadLinks(e, t) {
		e.forEach((e) => this.addLink(e, t));
	}
	buildPath(e, t, n, r) {
		let i = e.y + Ji, a = t.y + Ji, o = (i + a) / 2;
		return [
			new L.Vector3(e.x, i, e.z),
			new L.Vector3(e.x, o, r),
			new L.Vector3(n, o, r),
			new L.Vector3(n, o, t.z),
			new L.Vector3(t.x, a, t.z)
		];
	}
	midY(e, t) {
		return (e.y + t.y) / 2 + Ji;
	}
	setResolution(e, t) {
		this._resolution.set(e, t), this.objects.forEach((n) => n.line.material.resolution.set(e, t)), this.previewLine && this.previewLine.material.resolution.set(e, t);
	}
	addLink(e, t) {
		let n = t(e.sourceDeviceId), r = t(e.targetDeviceId);
		if (!n || !r) return;
		let i = Mn[e.type] ?? Mn.manual, a = e.status === "down" ? "#ef4444" : i.color, o = e.midX ?? (n.x + r.x) / 2, s = e.midZ ?? (n.z + r.z) / 2, c = this.buildPath(n, r, o, s), l = new Gi();
		l.setPositions(Xi(c));
		let u = new Ki(l, new Ti({
			color: new L.Color(a).getHex(),
			transparent: !0,
			opacity: i.opacity,
			linewidth: e.type === "physical" || e.type === "security_path" ? 2.5 : 2,
			dashed: i.dashed,
			dashSize: .35,
			gapSize: .22,
			dashScale: 1,
			resolution: this._resolution,
			alphaToCoverage: !0
		}));
		u.computeLineDistances(), u.userData.linkId = e.id;
		let d = new L.BoxGeometry(.55, .3, .55), f = new L.MeshBasicMaterial({
			color: 6333946,
			transparent: !0,
			opacity: .6,
			depthTest: !1
		}), p = new L.Mesh(d, f);
		p.position.set(o, this.midY(n, r), s), p.renderOrder = 800, p.userData.linkHandleId = e.id, p.userData.linkId = e.id, p.visible = !1;
		let m = new L.Group();
		m.add(u, p), this.scene.add(m), this.objects.set(e.id, {
			group: m,
			line: u,
			handle: p,
			link: e,
			path: c,
			endpoints: {
				a: n.clone(),
				b: r.clone()
			}
		});
	}
	removeLink(e) {
		let t = this.objects.get(e);
		t && (this.scene.remove(t.group), t.line.geometry.dispose(), t.handle.geometry.dispose(), t.line.material.dispose(), t.handle.material.dispose(), this.objects.delete(e));
	}
	updateMidpoint(e, t, n) {
		let r = this.objects.get(e);
		if (!r) return;
		r.link.midX = t, r.link.midZ = n;
		let i = this.buildPath(r.endpoints.a, r.endpoints.b, t, n);
		r.path = i, r.line.geometry.setPositions(Xi(i)), r.line.computeLineDistances(), r.handle.position.set(t, this.midY(r.endpoints.a, r.endpoints.b), n);
	}
	refreshPositions(e) {
		this.objects.forEach((t) => {
			let n = e(t.link.sourceDeviceId), r = e(t.link.targetDeviceId);
			if (!n || !r) return;
			t.endpoints.a = n.clone(), t.endpoints.b = r.clone();
			let i = t.link.midX ?? (n.x + r.x) / 2, a = t.link.midZ ?? (n.z + r.z) / 2, o = this.buildPath(n, r, i, a);
			t.path = o, t.line.geometry.setPositions(Xi(o)), t.line.computeLineDistances(), t.handle.position.set(i, this.midY(n, r), a);
		});
	}
	updateLinkStatus(e, t) {
		let n = this.objects.get(e);
		if (!n) return;
		let r = Mn[n.link.type] ?? Mn.manual, i = t === "down" ? "#ef4444" : r.color;
		n.line.material.color.set(i);
	}
	setHighlight(e, t) {
		if (t) {
			let e = this.objects.get(t);
			e && (e.line.material.opacity = Mn[e.link.type]?.opacity ?? .6);
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
			new L.Vector3(e.x, qi, e.z),
			new L.Vector3(e.x, qi, n),
			new L.Vector3(t.x, qi, n),
			new L.Vector3(t.x, qi, t.z)
		];
		if (this.previewLine) this.previewLine.geometry.setPositions(Xi(r)), this.previewLine.computeLineDistances();
		else {
			let e = new Gi();
			e.setPositions(Xi(r));
			let t = new Ti({
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
			this.previewLine = new Ki(e, t), this.scene.add(this.previewLine);
		}
		this.previewLine.visible = !0;
	}
	hidePreview() {
		this.previewLine && (this.previewLine.visible = !1);
	}
	update(e) {
		this._elapsed += e, this.objects.forEach(({ line: t, link: n }) => {
			let r = t.material;
			n.status === "down" ? r.opacity = .25 + .35 * Math.abs(Math.sin(this._elapsed * 2.5)) : r.dashed && (r.dashOffset -= Yi * e);
		}), this.previewLine && (this.previewLine.material.dashOffset -= Yi * e);
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
		}), this.objects.clear(), this.previewLine &&= (this.scene.remove(this.previewLine), this.previewLine.geometry.dispose(), this.previewLine.material.dispose(), null);
	}
}, Qi = 4e3, $i = 5, ea = 3.5;
function ta() {
	let e = document.createElement("canvas");
	e.width = e.height = 32;
	let t = e.getContext("2d"), n = t.createRadialGradient(32 / 2, 32 / 2, 0, 32 / 2, 32 / 2, 32 / 2);
	n.addColorStop(0, "rgba(255,255,255,1)"), n.addColorStop(.35, "rgba(255,255,255,0.85)"), n.addColorStop(1, "rgba(255,255,255,0)"), t.fillStyle = n, t.fillRect(0, 0, 32, 32);
	let r = new L.CanvasTexture(e);
	return r.needsUpdate = !0, r;
}
function na(e) {
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
function ra(e, t, n, r, i) {
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
var ia = class {
	scene;
	points;
	particles = [];
	posAttr;
	colAttr;
	constructor(e) {
		this.scene = e;
		let t = new L.BufferGeometry(), n = new Float32Array(Qi * 3), r = new Float32Array(Qi * 3);
		this.posAttr = new L.BufferAttribute(n, 3), this.colAttr = new L.BufferAttribute(r, 3), this.posAttr.setUsage(L.DynamicDrawUsage), t.setAttribute("position", this.posAttr), t.setAttribute("color", this.colAttr), t.setDrawRange(0, 0);
		let i = new L.PointsMaterial({
			size: .32,
			map: ta(),
			vertexColors: !0,
			transparent: !0,
			opacity: .95,
			depthWrite: !1,
			blending: L.AdditiveBlending,
			sizeAttenuation: !0
		});
		this.points = new L.Points(t, i), this.points.frustumCulled = !1, e.add(this.points);
	}
	syncLinks(e, t) {
		this.particles = [], e.forEach((e) => {
			if (e.status === "down") return;
			let n = t(e.id);
			if (!n || n.length < 2) return;
			let { lengths: r, total: i } = na(n);
			if (i === 0) return;
			let a = Mn[e.type] ?? Mn.manual, o = new L.Color(a.color), s = Math.min(Math.max(Math.round(i / ea), 2), 6);
			for (let t = 0; t < s; t++) this.particles.push({
				linkId: e.id,
				linkType: e.type,
				segments: n,
				segmentLengths: r,
				totalLength: i,
				t: t / s,
				speed: $i,
				color: o.clone()
			});
		});
	}
	update(e, t) {
		let n = 0, r = this.posAttr.array, i = this.colAttr.array, a = new L.Vector3();
		for (let o of this.particles) {
			if (n >= Qi) break;
			t.has(o.linkType) && (o.t += o.speed * e / Math.max(o.totalLength, 1), o.t > 1 && --o.t, ra(o.segments, o.segmentLengths, o.totalLength, o.t, a), r[n * 3] = a.x, r[n * 3 + 1] = a.y, r[n * 3 + 2] = a.z, i[n * 3] = o.color.r, i[n * 3 + 1] = o.color.g, i[n * 3 + 2] = o.color.b, n++);
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
}, aa = .03, oa = class {
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
			let i = n === 1 ? 16739072 : 16768256, a = n === 1 ? .8 : 1.3, o = new L.RingGeometry(a, a + .12, 32), s = new L.MeshBasicMaterial({
				color: i,
				transparent: !0,
				opacity: n === 1 ? .7 : .4,
				side: L.DoubleSide,
				depthWrite: !1,
				depthTest: !1,
				blending: L.AdditiveBlending
			}), c = new L.Mesh(o, s);
			c.rotation.x = -Math.PI / 2, c.position.set(r.x, aa, r.z), c.renderOrder = 999, this.scene.add(c), this.rings.push({
				mesh: c,
				hop: n,
				deviceId: e
			});
			let l = new L.RingGeometry(a + .15, a + .25, 32), u = new L.MeshBasicMaterial({
				color: i,
				transparent: !0,
				opacity: .2,
				side: L.DoubleSide,
				depthWrite: !1,
				depthTest: !1,
				blending: L.AdditiveBlending
			}), d = new L.Mesh(l, u);
			d.rotation.x = -Math.PI / 2, d.position.set(r.x, aa, r.z), d.renderOrder = 999, this.scene.add(d), this.rings.push({
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
}, sa = {
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
}, ca = {
	internet: "INET",
	cloud: "CLOUD",
	external: "EXT",
	custom: "NODE"
}, la = class {
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
		let t = sa[e.type] ?? sa.custom, n = new L.Group(), r = e.position ?? {
			x: 0,
			y: 0,
			z: 0
		};
		n.position.set(r.x, r.y, r.z), n.userData.virtualNodeId = e.id;
		let i = e.type === "cloud" ? new L.SphereGeometry(.85, 12, 10) : new L.IcosahedronGeometry(.7, 1), a = new L.MeshStandardMaterial({
			color: t.color,
			emissive: t.emissive,
			emissiveIntensity: .8,
			roughness: .3,
			metalness: .5,
			transparent: !0,
			opacity: .82,
			wireframe: e.type === "internet"
		}), o = new L.Mesh(i, a);
		o.position.y = 1.2, n.add(o);
		let s = new L.RingGeometry(.95, 1.1, 32), c = new L.MeshBasicMaterial({
			color: t.color,
			transparent: !0,
			opacity: .35,
			side: L.DoubleSide,
			depthWrite: !1,
			blending: L.AdditiveBlending
		}), l = new L.Mesh(s, c);
		l.rotation.x = -Math.PI / 2, l.position.y = .05, n.add(l);
		let u = document.createElement("div");
		u.style.cssText = "color:#cbd5e1;font-size:11px;font-family:monospace;\n      background:rgba(9,13,24,.85);border:1px solid #2a4a8a;border-radius:5px;\n      padding:2px 8px;pointer-events:none;white-space:nowrap;", u.textContent = `${ca[e.type] ?? "NODE"} · ${e.label}`;
		let d = new vn(u);
		d.position.set(0, 2.5, 0), n.add(d);
		let f = new L.Mesh(new L.SphereGeometry(1.2, 8, 8), new L.MeshBasicMaterial({ visible: !1 }));
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
			if (e instanceof L.Mesh) {
				e.geometry?.dispose();
				let t = e.material;
				Array.isArray(t) ? t.forEach((e) => e.dispose()) : t?.dispose();
			}
		});
	}
}, ua = {
	critical: 16724804,
	recover: 2284902,
	warning: 16755200
}, da = class {
	scene;
	flashes = [];
	constructor(e) {
		this.scene = e;
	}
	flash(e, t) {
		let n = ua[t], r = [];
		for (let t = 0; t < 2; t++) {
			let i = new L.RingGeometry(.3, .45, 32), a = new L.MeshBasicMaterial({
				color: n,
				transparent: !0,
				opacity: .9,
				side: L.DoubleSide,
				depthWrite: !1,
				blending: L.AdditiveBlending
			}), o = new L.Mesh(i, a);
			o.rotation.x = -Math.PI / 2, o.position.copy(e).setY(e.y + .3 + t * .05), o.userData.delay = t * .15, o.renderOrder = 500, this.scene.add(o), r.push(o);
		}
		let i = new L.CylinderGeometry(.06, .06, 4, 6), a = new L.MeshBasicMaterial({
			color: n,
			transparent: !0,
			opacity: .6,
			depthWrite: !1,
			blending: L.AdditiveBlending
		}), o = new L.Mesh(i, a);
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
}, fa = "topospace-backgrounds", pa = "assets", ma = 1;
function ha() {
	return new Promise((e, t) => {
		let n = indexedDB.open(fa, ma);
		n.onupgradeneeded = () => n.result.createObjectStore(pa), n.onsuccess = () => e(n.result), n.onerror = () => t(n.error);
	});
}
async function ga(e, t) {
	let n = await ha();
	return new Promise((r, i) => {
		let a = n.transaction(pa, "readwrite"), o = a.objectStore(pa).put(t, e);
		o.onsuccess = () => r(), o.onerror = () => i(o.error), a.oncomplete = () => n.close();
	});
}
async function _a(e) {
	let t = await ha();
	return new Promise((n, r) => {
		let i = t.transaction(pa, "readonly").objectStore(pa).get(e);
		i.onsuccess = () => {
			n(i.result ?? null), t.close();
		}, i.onerror = () => r(i.error);
	});
}
async function va(e) {
	let t = await ha();
	return new Promise((n, r) => {
		let i = t.transaction(pa, "readwrite"), a = i.objectStore(pa).delete(e);
		a.onsuccess = () => n(), a.onerror = () => r(a.error), i.oncomplete = () => t.close();
	});
}
//#endregion
//#region src/renderers/BackgroundRenderer.ts
var ya = .3, ba = .85, xa = class {
	scene;
	objects = /* @__PURE__ */ new Map();
	editMode = !1;
	constructor(e) {
		this.scene = e;
	}
	async loadObjects(e) {
		await Promise.all(e.map((e) => this.addObject(e)));
	}
	async addObject(e) {
		if (this.objects.has(e.id)) return;
		let t = await _a(e.assetId);
		if (!t) return;
		let n, r = [];
		if (e.kind === "image") {
			let i = URL.createObjectURL(new Blob([t])), a;
			try {
				a = await new L.TextureLoader().loadAsync(i);
			} finally {
				URL.revokeObjectURL(i);
			}
			let o = e.width ?? 10, s = e.depth ?? 10, c = new L.MeshBasicMaterial({
				map: a,
				transparent: !0,
				side: L.DoubleSide,
				depthWrite: !1
			}), l = new L.Mesh(new L.PlaneGeometry(o, s), c);
			l.rotation.x = -Math.PI / 2, r.push(c), n = l;
		} else {
			let i = await $r(t);
			if (!i) return;
			n = i, n.traverse((e) => {
				e instanceof L.Mesh && (Array.isArray(e.material) ? e.material : [e.material]).forEach((e) => {
					e.transparent = !0, r.push(e);
				});
			}), n.scale.setScalar(e.scale ?? 1);
		}
		n.position.set(e.position.x, e.position.y, e.position.z), n.rotation.y = L.MathUtils.degToRad(e.rotationY ?? 0), n.traverse((t) => {
			t.userData.backgroundId = e.id;
		});
		let i = this.editMode ? ba : e.opacity ?? ya;
		r.forEach((e) => {
			e.opacity = i;
		}), this.scene.add(n), this.objects.set(e.id, {
			root: n,
			materials: r,
			obj: e
		});
	}
	removeObject(e) {
		let t = this.objects.get(e);
		t && (this._dispose(t), this.objects.delete(e));
	}
	setEditMode(e) {
		this.editMode = e, this.objects.forEach(({ materials: t, obj: n }) => {
			let r = e ? ba : n.opacity ?? ya;
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
		this.objects.forEach((e) => this._dispose(e)), this.objects.clear();
	}
	_dispose(e) {
		this.scene.remove(e.root), e.root.traverse((e) => {
			e instanceof L.Mesh && e.geometry?.dispose();
		}), e.materials.forEach((e) => {
			e.map?.dispose(), e.dispose();
		});
	}
}, Sa = 1.25, Ca = 65535;
Ca << 16;
var wa = 2 ** -24, Ta = Symbol("SKIP_GENERATION"), Ea = {
	strategy: 0,
	maxDepth: 40,
	maxLeafSize: 10,
	useSharedArrayBuffer: !1,
	setBoundingBox: !0,
	onProgress: null,
	indirect: !1,
	verbose: !0,
	range: null,
	[Ta]: !1
};
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/ArrayBoxUtilities.js
function X(e, t, n) {
	return n.min.x = t[e], n.min.y = t[e + 1], n.min.z = t[e + 2], n.max.x = t[e + 3], n.max.y = t[e + 4], n.max.z = t[e + 5], n;
}
function Da(e) {
	let t = -1, n = -Infinity;
	for (let r = 0; r < 3; r++) {
		let i = e[r + 3] - e[r];
		i > n && (n = i, t = r);
	}
	return t;
}
function Oa(e, t) {
	t.set(e);
}
function ka(e, t, n) {
	let r, i;
	for (let a = 0; a < 3; a++) {
		let o = a + 3;
		r = e[a], i = t[a], n[a] = r < i ? r : i, r = e[o], i = t[o], n[o] = r > i ? r : i;
	}
}
function Aa(e, t, n) {
	for (let r = 0; r < 3; r++) {
		let i = t[e + 2 * r], a = t[e + 2 * r + 1], o = i - a, s = i + a;
		o < n[r] && (n[r] = o), s > n[r + 3] && (n[r + 3] = s);
	}
}
function ja(e) {
	let t = e[3] - e[0], n = e[4] - e[1], r = e[5] - e[2];
	return 2 * (t * n + n * r + r * t);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/nodeBufferUtils.js
function Ma(e, t) {
	return t[e + 15] === Ca;
}
function Na(e, t) {
	return t[e + 6];
}
function Pa(e, t) {
	return t[e + 14];
}
function Fa(e) {
	return e + 8;
}
function Ia(e, t) {
	return e + t[e + 6] * 8;
}
function La(e, t) {
	return t[e + 7];
}
function Z(e) {
	return e;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/computeBoundsUtils.js
function Ra(e, t, n, r, i) {
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
var za = 32, Ba = (e, t) => e.candidate - t.candidate, Va = /* @__PURE__ */ Array(za).fill().map(() => ({
	count: 0,
	bounds: new Float32Array(6),
	rightCacheBounds: new Float32Array(6),
	leftCacheBounds: new Float32Array(6),
	candidate: 0
})), Ha = /* @__PURE__ */ new Float32Array(6);
function Ua(e, t, n, r, i, a) {
	let o = -1, s = 0;
	if (a === 0) o = Da(t), o !== -1 && (s = (t[o] + t[o + 3]) / 2);
	else if (a === 1) o = Da(e), o !== -1 && (s = Wa(n, r, i, o));
	else if (a === 2) {
		let a = ja(e), c = Sa * i, l = n.offset || 0, u = (r - l) * 6, d = (r + i - l) * 6;
		for (let e = 0; e < 3; e++) {
			let r = t[e], l = (t[e + 3] - r) / za;
			if (i < za / 4) {
				let t = [...Va];
				t.length = i;
				let r = 0;
				for (let i = u; i < d; i += 6, r++) {
					let a = t[r];
					a.candidate = n[i + 2 * e], a.count = 0;
					let { bounds: o, leftCacheBounds: s, rightCacheBounds: c } = a;
					for (let e = 0; e < 3; e++) c[e] = Infinity, c[e + 3] = -Infinity, s[e] = Infinity, s[e + 3] = -Infinity, o[e] = Infinity, o[e + 3] = -Infinity;
					Aa(i, n, o);
				}
				t.sort(Ba);
				let l = i;
				for (let e = 0; e < l; e++) {
					let n = t[e];
					for (; e + 1 < l && t[e + 1].candidate === n.candidate;) t.splice(e + 1, 1), l--;
				}
				for (let r = u; r < d; r += 6) {
					let i = n[r + 2 * e];
					for (let e = 0; e < l; e++) {
						let a = t[e];
						i >= a.candidate ? Aa(r, n, a.rightCacheBounds) : (Aa(r, n, a.leftCacheBounds), a.count++);
					}
				}
				for (let n = 0; n < l; n++) {
					let r = t[n], l = r.count, u = i - r.count, d = r.leftCacheBounds, f = r.rightCacheBounds, p = 0;
					l !== 0 && (p = ja(d) / a);
					let m = 0;
					u !== 0 && (m = ja(f) / a);
					let h = 1 + Sa * (p * l + m * u);
					h < c && (o = e, c = h, s = r.candidate);
				}
			} else {
				for (let e = 0; e < za; e++) {
					let t = Va[e];
					t.count = 0, t.candidate = r + l + e * l;
					let n = t.bounds;
					for (let e = 0; e < 3; e++) n[e] = Infinity, n[e + 3] = -Infinity;
				}
				for (let t = u; t < d; t += 6) {
					let i = ~~((n[t + 2 * e] - r) / l);
					i >= za && (i = za - 1);
					let a = Va[i];
					a.count++, Aa(t, n, a.bounds);
				}
				let t = Va[za - 1];
				Oa(t.bounds, t.rightCacheBounds);
				for (let e = za - 2; e >= 0; e--) {
					let t = Va[e], n = Va[e + 1];
					ka(t.bounds, n.rightCacheBounds, t.rightCacheBounds);
				}
				let f = 0;
				for (let t = 0; t < za - 1; t++) {
					let n = Va[t], r = n.count, l = n.bounds, u = Va[t + 1].rightCacheBounds;
					r !== 0 && (f === 0 ? Oa(l, Ha) : ka(l, Ha, Ha)), f += r;
					let d = 0, p = 0;
					f !== 0 && (d = ja(Ha) / a);
					let m = i - f;
					m !== 0 && (p = ja(u) / a);
					let h = 1 + Sa * (d * f + p * m);
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
function Wa(e, t, n, r) {
	let i = 0, a = e.offset;
	for (let o = t, s = t + n; o < s; o++) i += e[(o - a) * 6 + r * 2];
	return i / n;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/BVHNode.js
var Ga = class {
	constructor() {
		this.boundingData = new Float32Array(6);
	}
};
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/sortUtils.js
function Ka(e, t, n, r, i, a) {
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
var qa, Ja, Ya, Xa, Za = 2 ** 32;
function Qa(e) {
	return "count" in e ? 1 : 1 + Qa(e.left) + Qa(e.right);
}
function $a(e, t, n) {
	return qa = new Float32Array(n), Ja = new Uint32Array(n), Ya = new Uint16Array(n), Xa = new Uint8Array(n), eo(e, t);
}
function eo(e, t) {
	let n = e / 4, r = e / 2, i = "count" in t, a = t.boundingData;
	for (let e = 0; e < 6; e++) qa[n + e] = a[e];
	if (i) return t.buffer ? (Xa.set(new Uint8Array(t.buffer), e), e + t.buffer.byteLength) : (Ja[n + 6] = t.offset, Ya[r + 14] = t.count, Ya[r + 15] = Ca, e + 32);
	{
		let { left: r, right: i, splitAxis: a } = t, o = eo(e + 32, r), s = e / 32, c = o / 32 - s;
		if (c > Za) throw Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");
		return Ja[n + 6] = c, Ja[n + 7] = a, eo(o, i);
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/buildTree.js
function to(e, t, n, r, i, a) {
	let { maxDepth: o, verbose: s, maxLeafSize: c, strategy: l, onProgress: u } = i, d = e.primitiveBuffer, f = e.primitiveBufferStride, p = new Float32Array(6), m = !1, h = new Ga();
	return Ra(t, n, r, h.boundingData, p), _(h, n, r, p), h;
	function g(e) {
		u && u((e - a.offset) / a.count);
	}
	function _(e, n, r, i = null, a = 0) {
		if (!m && a >= o && (m = !0, s && console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`)), r <= c || a >= o) return g(n + r), e.offset = n, e.count = r, e;
		let u = Ua(e.boundingData, i, t, n, r, l);
		if (u.axis === -1) return g(n + r), e.offset = n, e.count = r, e;
		let h = Ka(d, f, t, n, r, u);
		if (h === n || h === n + r) g(n + r), e.offset = n, e.count = r;
		else {
			e.splitAxis = u.axis;
			let i = new Ga(), o = n, s = h - n;
			e.left = i, Ra(t, o, s, i.boundingData, p), _(i, o, s, p, a + 1);
			let c = new Ga(), l = h, d = r - s;
			e.right = c, Ra(t, l, d, c.boundingData, p), _(c, l, d, p, a + 1);
		}
		return e;
	}
}
function no(e, t) {
	let n = t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer, r = e.getRootRanges(t.range), i = r[0], a = r[r.length - 1], o = {
		offset: i.offset,
		count: a.offset + a.count - i.offset
	}, s = new Float32Array(6 * o.count);
	s.offset = o.offset, e.computePrimitiveBounds(o.offset, o.count, s), e._roots = r.map((r) => {
		let i = to(e, s, r.offset, r.count, t, o), a = new n(32 * Qa(i));
		return $a(0, i, a), a;
	});
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/PrimitivePool.js
var ro = class {
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
}(), io, ao, oo = [], so = /* @__PURE__ */ new ro(() => new V());
function co(e, t, n, r, i, a) {
	io = so.getPrimitive(), ao = so.getPrimitive(), oo.push(io, ao), Q.setBuffer(e._roots[t]);
	let o = lo(0, e.geometry, n, r, i, a);
	Q.clearBuffer(), so.releasePrimitive(io), so.releasePrimitive(ao), oo.pop(), oo.pop();
	let s = oo.length;
	return s > 0 && (ao = oo[s - 1], io = oo[s - 2]), o;
}
function lo(e, t, n, r, i = null, a = 0, o = 0) {
	let { float32Array: s, uint16Array: c, uint32Array: l } = Q, u = e * 2;
	if (Ma(u, c)) {
		let t = Na(e, l), n = Pa(u, c);
		return X(Z(e), s, io), r(t, n, !1, o, a + e / 8, io);
	} else {
		let u = Fa(e), d = Ia(e, l), f = u, p = d, m, h, g, _;
		if (i && (g = io, _ = ao, X(Z(f), s, g), X(Z(p), s, _), m = i(g), h = i(_), h < m)) {
			f = d, p = u;
			let e = m;
			m = h, h = e, g = _;
		}
		g || (g = io, X(Z(f), s, g));
		let v = Ma(f * 2, c), y = n(g, v, m, o + 1, a + f / 8), b;
		if (y === 2) {
			let e = w(f);
			b = r(e, T(f) - e, !0, o + 1, a + f / 8, g);
		} else b = y && lo(f, t, n, r, i, a, o + 1);
		if (b) return !0;
		_ = ao, X(Z(p), s, _);
		let x = Ma(p * 2, c), S = n(_, x, h, o + 1, a + p / 8), C;
		if (S === 2) {
			let e = w(p);
			C = r(e, T(p) - e, !0, o + 1, a + p / 8, _);
		} else C = S && lo(p, t, n, r, i, a, o + 1);
		if (C) return !0;
		return !1;
		function w(e) {
			let { uint16Array: t, uint32Array: n } = Q, r = e * 2;
			for (; !Ma(r, t);) e = Fa(e), r = e * 2;
			return Na(e, n);
		}
		function T(e) {
			let { uint16Array: t, uint32Array: n } = Q, r = e * 2;
			for (; !Ma(r, t);) e = Ia(e, n), r = e * 2;
			return Na(e, n) + Pa(r, t);
		}
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/bvhcast.js
var uo = /* @__PURE__ */ new Q.constructor(), fo = /* @__PURE__ */ new Q.constructor(), po = /* @__PURE__ */ new ro(() => new V()), mo = /* @__PURE__ */ new V(), ho = /* @__PURE__ */ new V(), go = /* @__PURE__ */ new V(), _o = /* @__PURE__ */ new V(), vo = !1;
function yo(e, t, n, r) {
	if (vo) throw Error("MeshBVH: Recursive calls to bvhcast not supported.");
	vo = !0;
	let i = e._roots, a = t._roots, o, s = 0, c = 0, l = new Le().copy(n).invert();
	for (let e = 0, t = i.length; e < t; e++) {
		uo.setBuffer(i[e]), c = 0;
		let t = po.getPrimitive();
		X(Z(0), uo.float32Array, t), t.applyMatrix4(l);
		for (let e = 0, i = a.length; e < i && (fo.setBuffer(a[e]), o = bo(0, 0, n, l, r, s, c, 0, 0, t), fo.clearBuffer(), c += a[e].byteLength / 32, !o); e++);
		if (po.releasePrimitive(t), uo.clearBuffer(), s += i[e].byteLength / 32, o) break;
	}
	return vo = !1, o;
}
function bo(e, t, n, r, i, a = 0, o = 0, s = 0, c = 0, l = null, u = !1) {
	let d, f;
	u ? (d = fo, f = uo) : (d = uo, f = fo);
	let p = d.float32Array, m = d.uint32Array, h = d.uint16Array, g = f.float32Array, _ = f.uint32Array, v = f.uint16Array, y = e * 2, b = t * 2, x = Ma(y, h), S = Ma(b, v), C = !1;
	if (S && x) C = u ? i(Na(t, _), Pa(t * 2, v), Na(e, m), Pa(e * 2, h), c, o + t / 8, s, a + e / 8) : i(Na(e, m), Pa(e * 2, h), Na(t, _), Pa(t * 2, v), s, a + e / 8, c, o + t / 8);
	else if (S) {
		let l = po.getPrimitive();
		X(Z(t), g, l), l.applyMatrix4(n);
		let d = Fa(e), f = Ia(e, m);
		X(Z(d), p, mo), X(Z(f), p, ho);
		let h = l.intersectsBox(mo), _ = l.intersectsBox(ho);
		C = h && bo(t, d, r, n, i, o, a, c, s + 1, l, !u) || _ && bo(t, f, r, n, i, o, a, c, s + 1, l, !u), po.releasePrimitive(l);
	} else {
		let d = Fa(t), f = Ia(t, _);
		X(Z(d), g, go), X(Z(f), g, _o);
		let h = l.intersectsBox(go), v = l.intersectsBox(_o);
		if (h && v) C = bo(e, d, n, r, i, a, o, s, c + 1, l, u) || bo(e, f, n, r, i, a, o, s, c + 1, l, u);
		else if (h) if (x) C = bo(e, d, n, r, i, a, o, s, c + 1, l, u);
		else {
			let t = po.getPrimitive();
			t.copy(go).applyMatrix4(n);
			let l = Fa(e), f = Ia(e, m);
			X(Z(l), p, mo), X(Z(f), p, ho);
			let h = t.intersectsBox(mo), g = t.intersectsBox(ho);
			C = h && bo(d, l, r, n, i, o, a, c, s + 1, t, !u) || g && bo(d, f, r, n, i, o, a, c, s + 1, t, !u), po.releasePrimitive(t);
		}
		else if (v) if (x) C = bo(e, f, n, r, i, a, o, s, c + 1, l, u);
		else {
			let t = po.getPrimitive();
			t.copy(_o).applyMatrix4(n);
			let l = Fa(e), d = Ia(e, m);
			X(Z(l), p, mo), X(Z(d), p, ho);
			let h = t.intersectsBox(mo), g = t.intersectsBox(ho);
			C = h && bo(f, l, r, n, i, o, a, c, s + 1, t, !u) || g && bo(f, d, r, n, i, o, a, c, s + 1, t, !u), po.releasePrimitive(t);
		}
	}
	return C;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/BVH.js
var xo = /* @__PURE__ */ new V(), So = /* @__PURE__ */ new Float32Array(6), Co = class {
	constructor() {
		this._roots = null, this.primitiveBuffer = null, this.primitiveBufferStride = null;
	}
	init(e) {
		e = {
			...Ea,
			...e
		}, no(this, e);
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
			this.writePrimitiveBounds(n, So, 0);
			let [e, t, r, u, d, f] = So;
			e < i && (i = e), u > s && (s = u), t < a && (a = t), d > c && (c = d), r < o && (o = r), f > l && (l = f);
		}
		return n[r + 0] = i, n[r + 1] = a, n[r + 2] = o, n[r + 3] = s, n[r + 4] = c, n[r + 5] = l, n;
	}
	computePrimitiveBounds(e, t, n) {
		let r = n.offset || 0;
		for (let i = e, a = e + t; i < a; i++) {
			this.writePrimitiveBounds(i, So, 0);
			let [e, t, a, o, s, c] = So, l = (e + o) / 2, u = (t + s) / 2, d = (a + c) / 2, f = (o - e) / 2, p = (s - t) / 2, m = (c - a) / 2, h = (i - r) * 6;
			n[h + 0] = l, n[h + 1] = f + (Math.abs(l) + f) * wa, n[h + 2] = u, n[h + 3] = p + (Math.abs(u) + p) * wa, n[h + 4] = d, n[h + 5] = m + (Math.abs(d) + m) * wa;
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
					Ma(2 * n, a) && (i[n + 6] += e);
				}
			}
		}
	}
	traverse(e, t = 0) {
		let n = this._roots[t], r = new Uint32Array(n), i = new Uint16Array(n);
		a(0);
		function a(t, o = 0) {
			let s = t * 2, c = Ma(s, i);
			if (c) {
				let a = r[t + 6], l = i[s + 14];
				e(o, c, new Float32Array(n, t * 4, 6), a, l);
			} else {
				let i = Fa(t), s = Ia(t, r), l = La(t, r);
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
				if (Ma(n, i)) {
					let e = Na(t, r), o = Pa(n, i);
					this.writePrimitiveRangeBounds(e, o, So, 0), a.set(So, t);
				} else {
					let e = Fa(t), n = Ia(t, r);
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
			X(0, new Float32Array(t), xo), e.union(xo);
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
			if (s = co(this, e, n, r, t, c), s) break;
			c += i.byteLength / 32;
		}
		return s;
	}
	bvhcast(e, t, n) {
		let { intersectsRanges: r } = n;
		return yo(this, e, t, r);
	}
};
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/BufferUtils.js
function wo() {
	return typeof SharedArrayBuffer < "u";
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/geometryUtils.js
function To(e) {
	return e.index ? e.index.count : e.attributes.position.count;
}
function Eo(e) {
	return To(e) / 3;
}
function Do(e, t = ArrayBuffer) {
	return e > 65535 ? new Uint32Array(new t(4 * e)) : new Uint16Array(new t(2 * e));
}
function Oo(e, t) {
	if (!e.index) {
		let n = e.attributes.position.count, r = Do(n, t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer);
		e.setIndex(new ne(r, 1));
		for (let e = 0; e < n; e++) r[e] = e;
	}
}
function ko(e, t, n) {
	let r = To(e) / n, i = t || e.drawRange, a = i.start / n, o = (i.start + i.count) / n, s = Math.max(0, a), c = Math.min(r, o) - s;
	return {
		offset: Math.floor(s),
		count: Math.floor(c)
	};
}
function Ao(e, t) {
	return e.groups.map((e) => ({
		offset: e.start / t,
		count: e.count / t
	}));
}
function jo(e, t, n) {
	let r = ko(e, t, n), i = Ao(e, n);
	if (!i.length) return [r];
	let a = [], o = r.offset, s = r.offset + r.count, c = To(e) / n, l = [];
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
function Mo(e, t) {
	let n = e[e.length - 1], r = n.offset + n.count > 2 ** 16, i = e.reduce((e, t) => e + t.count, 0), a = r ? 4 : 2, o = t ? new SharedArrayBuffer(i * a) : new ArrayBuffer(i * a), s = r ? new Uint32Array(o) : new Uint16Array(o), c = 0;
	for (let t = 0; t < e.length; t++) {
		let { offset: n, count: r } = e[t];
		for (let e = 0; e < r; e++) s[c + e] = n + e;
		c += r;
	}
	return s;
}
var No = class extends Co {
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
		if (t.useSharedArrayBuffer && !wo()) throw Error("BVH: SharedArrayBuffer is not available.");
		super(), this.geometry = e, this.resolvePrimitiveIndex = t.indirect ? (e) => this._indirectBuffer[e] : (e) => e, this.primitiveBuffer = null, this.primitiveBufferStride = null, this._indirectBuffer = null, t = {
			...Ea,
			...t
		}, t[Ta] || this.init(t);
	}
	init(e) {
		let { geometry: t, primitiveStride: n } = this;
		if (e.indirect) {
			let r = Mo(jo(t, e.range, n), e.useSharedArrayBuffer);
			this._indirectBuffer = r;
		} else Oo(t, e);
		super.init(e), !t.boundingBox && e.setBoundingBox && (t.boundingBox = this.getBoundingBox(new V()));
	}
	getRootRanges(e) {
		return this.indirect ? [{
			offset: 0,
			count: this._indirectBuffer.length
		}] : jo(this.geometry, e, this.primitiveStride);
	}
	raycastObject3D() {
		throw Error("BVH: raycastObject3D() not implemented");
	}
}, Po = class {
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
Po.prototype.setFromBox = (function() {
	let e = /* @__PURE__ */ new W();
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
	let e = /* @__PURE__ */ new Po();
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
var Fo = (function() {
	let e = /* @__PURE__ */ new W(), t = /* @__PURE__ */ new W(), n = /* @__PURE__ */ new W();
	return function(r, i, a) {
		let o = r.start, s = e, c = i.start, l = t;
		n.subVectors(o, c), e.subVectors(r.end, r.start), t.subVectors(i.end, i.start);
		let u = n.dot(l), d = l.dot(s), f = l.dot(l), p = n.dot(s), m = s.dot(s) * f - d * d, h, g;
		h = m === 0 ? 0 : (u * d - p * f) / m, g = (u + h * d) / f, a.x = h, a.y = g;
	};
})(), Io = (function() {
	let e = /* @__PURE__ */ new U(), t = /* @__PURE__ */ new W(), n = /* @__PURE__ */ new W();
	return function(r, i, a, o) {
		Fo(r, i, e);
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
})(), Lo = (function() {
	let e = /* @__PURE__ */ new W(), t = /* @__PURE__ */ new W(), n = /* @__PURE__ */ new Xe(), r = /* @__PURE__ */ new we();
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
})(), Ro = [
	"x",
	"y",
	"z"
], zo = 1e-15, Bo = zo * zo;
function Vo(e) {
	return Math.abs(e) < zo;
}
var Ho = class extends _t {
	constructor(...e) {
		super(...e), this.isExtendedTriangle = !0, this.satAxes = [
			,
			,
			,
			,
		].fill().map(() => new W()), this.satBounds = [
			,
			,
			,
			,
		].fill().map(() => new Po()), this.points = [
			this.a,
			this.b,
			this.c
		], this.plane = new Xe(), this.isDegenerateIntoSegment = !1, this.isDegenerateIntoPoint = !1, this.degenerateSegment = new we(), this.needsUpdate = !0;
	}
	intersectsSphere(e) {
		return Lo(e, this);
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
		this.isDegenerateIntoPoint = !1, this.isDegenerateIntoSegment = !1, m < zo ? h < zo || g < zo ? this.isDegenerateIntoPoint = !0 : (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(e), this.degenerateSegment.end.copy(n)) : h < zo ? g < zo ? this.isDegenerateIntoPoint = !0 : (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(t), this.degenerateSegment.end.copy(e)) : g < zo && (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(n), this.degenerateSegment.end.copy(t)), this.plane.setFromNormalAndCoplanarPoint(o, e), this.needsUpdate = !1;
	}
};
Ho.prototype.closestPointToSegment = (function() {
	let e = /* @__PURE__ */ new W(), t = /* @__PURE__ */ new W(), n = /* @__PURE__ */ new we();
	return function(r, i = null, a = null) {
		let { start: o, end: s } = r, c = this.points, l, u = Infinity;
		for (let o = 0; o < 3; o++) {
			let s = (o + 1) % 3;
			n.start.copy(c[o]), n.end.copy(c[s]), Io(n, r, e, t), l = e.distanceToSquared(t), l < u && (u = l, i && i.copy(e), a && a.copy(t));
		}
		return this.closestPointToPoint(o, e), l = o.distanceToSquared(e), l < u && (u = l, i && i.copy(e), a && a.copy(o)), this.closestPointToPoint(s, e), l = s.distanceToSquared(e), l < u && (u = l, i && i.copy(e), a && a.copy(s)), Math.sqrt(u);
	};
})(), Ho.prototype.intersectsTriangle = (function() {
	let e = /* @__PURE__ */ new Ho(), t = /* @__PURE__ */ new Po(), n = /* @__PURE__ */ new Po(), r = /* @__PURE__ */ new W(), i = /* @__PURE__ */ new W(), a = /* @__PURE__ */ new W(), o = /* @__PURE__ */ new W(), s = /* @__PURE__ */ new we(), c = /* @__PURE__ */ new we(), l = /* @__PURE__ */ new W(), u = /* @__PURE__ */ new U(), d = /* @__PURE__ */ new U();
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
		return Vo(o) ? Vo(s) ? f(e, t, n, i) : (n && (n.start.copy(a.start), n.end.copy(a.start)), e.containsPoint(a.start)) : Vo(s) ? (n && (n.start.copy(a.end), n.end.copy(a.end)), e.containsPoint(a.end)) : e.plane.intersectLine(a, r) == null ? !1 : (n && (n.start.copy(r), n.end.copy(r)), e.containsPoint(r));
	}
	function g(e, t, n) {
		let r = t.a;
		return Vo(e.plane.distanceToPoint(r)) && e.containsPoint(r) ? (n && (n.start.copy(r), n.end.copy(r)), !0) : !1;
	}
	function _(e, t, n) {
		let i = e.degenerateSegment, a = t.a;
		return i.closestPointToPoint(a, !0, r), a.distanceToSquared(r) < Bo ? (n && (n.start.copy(a), n.end.copy(a)), !0) : !1;
	}
	function v(e, t, n, o) {
		if (e.isDegenerateIntoSegment) if (t.isDegenerateIntoSegment) {
			let o = e.degenerateSegment, s = t.degenerateSegment, c = i, l = a;
			o.delta(c), s.delta(l);
			let u = r.subVectors(s.start, o.start), d = c.x * l.y - c.y * l.x;
			if (Vo(d)) return !1;
			let f = (u.x * l.y - u.y * l.x) / d, p = -(c.x * u.y - c.y * u.x) / d;
			return f < 0 || f > 1 || p < 0 || p > 1 ? !1 : Vo(o.start.z + c.z * f - (s.start.z + l.z * p)) ? (n && (n.start.copy(o.start).addScaledVector(c, f), n.end.copy(o.start).addScaledVector(c, f)), !0) : !1;
		} else if (t.isDegenerateIntoPoint) return _(e, t, n);
		else return h(t, e, n, o);
		else if (e.isDegenerateIntoPoint) return t.isDegenerateIntoPoint ? t.a.distanceToSquared(e.a) < Bo ? (n && (n.start.copy(e.a), n.end.copy(e.a)), !0) : !1 : t.isDegenerateIntoSegment ? _(t, e, n) : g(t, e, n);
		else if (t.isDegenerateIntoPoint) return g(e, t, n);
		else if (t.isDegenerateIntoSegment) return h(e, t, n, o);
	}
	return function(t, n = null, r = !1) {
		this.needsUpdate && this.update(), t.isExtendedTriangle ? t.needsUpdate && t.update() : (e.copy(t), e.update(), t = e);
		let o = v(this, t, n, r);
		if (o !== void 0) return o;
		let p = this.plane, h = t.plane, g = h.distanceToPoint(this.a), _ = h.distanceToPoint(this.b), y = h.distanceToPoint(this.c);
		Vo(g) && (g = 0), Vo(_) && (_ = 0), Vo(y) && (y = 0);
		let b = g * _, x = g * y;
		if (b > 0 && x > 0) return !1;
		let S = p.distanceToPoint(t.a), C = p.distanceToPoint(t.b), w = p.distanceToPoint(t.c);
		Vo(S) && (S = 0), Vo(C) && (C = 0), Vo(w) && (w = 0);
		let T = S * C, E = S * w;
		if (T > 0 && E > 0) return !1;
		i.copy(p.normal), a.copy(h.normal);
		let D = i.cross(a), O = 0, k = Math.abs(D.x), A = Math.abs(D.y);
		A > k && (k = A, O = 1), Math.abs(D.z) > k && (O = 2);
		let j = Ro[O], M = this.a[j], N = this.b[j], P = this.c[j], F = t.a[j], ee = t.b[j], I = t.c[j];
		if (m(this, M, N, P, b, x, g, _, y, u, s) || m(t, F, ee, I, T, E, S, C, w, d, c)) return f(this, t, n, r);
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
})(), Ho.prototype.distanceToPoint = (function() {
	let e = /* @__PURE__ */ new W();
	return function(t) {
		return this.closestPointToPoint(t, e), t.distanceTo(e);
	};
})(), Ho.prototype.distanceToTriangle = (function() {
	let e = /* @__PURE__ */ new W(), t = /* @__PURE__ */ new W(), n = [
		"a",
		"b",
		"c"
	], r = /* @__PURE__ */ new we(), i = /* @__PURE__ */ new we();
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
				i.set(a[u], a[d]), Io(r, i, e, t);
				let f = e.distanceToSquared(t);
				f < l && (l = f, o && o.copy(e), s && s.copy(t));
			}
		}
		return Math.sqrt(l);
	};
})();
//#endregion
//#region node_modules/three-mesh-bvh/src/math/OrientedBox.js
var Uo = class {
	constructor(e, t, n) {
		this.isOrientedBox = !0, this.min = new W(), this.max = new W(), this.matrix = new Le(), this.invMatrix = new Le(), this.points = Array(8).fill().map(() => new W()), this.satAxes = [
			,
			,
			,
		].fill().map(() => new W()), this.satBounds = [
			,
			,
			,
		].fill().map(() => new Po()), this.alignedSatBounds = [
			,
			,
			,
		].fill().map(() => new Po()), this.needsUpdate = !1, e && this.min.copy(e), t && this.max.copy(t), n && this.matrix.copy(n);
	}
	set(e, t, n) {
		this.min.copy(e), this.max.copy(t), this.matrix.copy(n), this.needsUpdate = !0;
	}
	copy(e) {
		this.min.copy(e.min), this.max.copy(e.max), this.matrix.copy(e.matrix), this.needsUpdate = !0;
	}
};
Uo.prototype.update = (function() {
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
})(), Uo.prototype.intersectsBox = (function() {
	let e = /* @__PURE__ */ new Po();
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
})(), Uo.prototype.intersectsTriangle = (function() {
	let e = /* @__PURE__ */ new Ho(), t = [
		,
		,
		,
	], n = /* @__PURE__ */ new Po(), r = /* @__PURE__ */ new Po(), i = /* @__PURE__ */ new W();
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
})(), Uo.prototype.closestPointToPoint = (function() {
	return function(e, t) {
		return this.needsUpdate && this.update(), t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix), t;
	};
})(), Uo.prototype.distanceToPoint = (function() {
	let e = new W();
	return function(t) {
		return this.closestPointToPoint(t, e), t.distanceTo(e);
	};
})(), Uo.prototype.distanceToBox = (function() {
	let e = [
		"x",
		"y",
		"z"
	], t = /* @__PURE__ */ Array(12).fill().map(() => new we()), n = /* @__PURE__ */ Array(12).fill().map(() => new we()), r = /* @__PURE__ */ new W(), i = /* @__PURE__ */ new W();
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
				Io(a, t, r, i);
				let o = r.distanceToSquared(i);
				if (o < p && (p = o, s && s.copy(r), c && c.copy(i), o < l)) return Math.sqrt(o);
			}
		}
		return Math.sqrt(p);
	};
})();
var Wo = /* @__PURE__ */ new class extends ro {
	constructor() {
		super(() => new Ho());
	}
}(), Go = /* @__PURE__ */ new W(), Ko = /* @__PURE__ */ new W();
function qo(e, t, n = {}, r = 0, i = Infinity) {
	let a = r * r, o = i * i, s = Infinity, c = null;
	if (e.shapecast({
		boundsTraverseOrder: (e) => (Go.copy(t).clamp(e.min, e.max), Go.distanceToSquared(t)),
		intersectsBounds: (e, t, n) => n < s && n < o,
		intersectsTriangle: (e, n) => {
			e.closestPointToPoint(t, Go);
			let r = t.distanceToSquared(Go);
			return r < s && (Ko.copy(Go), s = r, c = n), r < a;
		}
	}), s === Infinity) return null;
	let l = Math.sqrt(s);
	return n.point ? n.point.copy(Ko) : n.point = Ko.clone(), n.distance = l, n.faceIndex = c, n;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/ThreeRayIntersectUtilities.js
var Jo = parseInt(rt) >= 169, Yo = parseInt(rt) <= 161, Xo = /* @__PURE__ */ new W(), Zo = /* @__PURE__ */ new W(), Qo = /* @__PURE__ */ new W(), $o = /* @__PURE__ */ new U(), es = /* @__PURE__ */ new U(), ts = /* @__PURE__ */ new U(), ns = /* @__PURE__ */ new W(), rs = /* @__PURE__ */ new W(), is = /* @__PURE__ */ new W(), as = /* @__PURE__ */ new W();
function os(e, t, n, r, i, a, o, s) {
	let c;
	if (c = a === z ? e.intersectTriangle(r, n, t, !0, i) : e.intersectTriangle(t, n, r, a !== ce, i), c === null) return null;
	let l = e.origin.distanceTo(i);
	return l < o || l > s ? null : {
		distance: l,
		point: i.clone()
	};
}
function ss(e, t, n, r, i, a, o, s, c, l, u) {
	Xo.fromBufferAttribute(t, a), Zo.fromBufferAttribute(t, o), Qo.fromBufferAttribute(t, s);
	let d = os(e, Xo, Zo, Qo, as, c, l, u);
	if (d) {
		if (r) {
			$o.fromBufferAttribute(r, a), es.fromBufferAttribute(r, o), ts.fromBufferAttribute(r, s), d.uv = new U();
			let e = _t.getInterpolation(as, Xo, Zo, Qo, $o, es, ts, d.uv);
			Jo || (d.uv = e);
		}
		if (i) {
			$o.fromBufferAttribute(i, a), es.fromBufferAttribute(i, o), ts.fromBufferAttribute(i, s), d.uv1 = new U();
			let e = _t.getInterpolation(as, Xo, Zo, Qo, $o, es, ts, d.uv1);
			Jo || (d.uv1 = e), Yo && (d.uv2 = d.uv1);
		}
		if (n) {
			ns.fromBufferAttribute(n, a), rs.fromBufferAttribute(n, o), is.fromBufferAttribute(n, s), d.normal = new W();
			let t = _t.getInterpolation(as, Xo, Zo, Qo, ns, rs, is, d.normal);
			d.normal.dot(e.direction) > 0 && d.normal.multiplyScalar(-1), Jo || (d.normal = t);
		}
		let t = {
			a,
			b: o,
			c: s,
			normal: new W(),
			materialIndex: 0
		};
		if (_t.getNormal(Xo, Zo, Qo, t.normal), d.face = t, d.faceIndex = a, Jo) {
			let e = new W();
			_t.getBarycoord(as, Xo, Zo, Qo, e), d.barycoord = e;
		}
	}
	return d;
}
function cs(e) {
	return e && e.isMaterial ? e.side : e;
}
function ls(e, t, n, r, i, a, o) {
	let s = r * 3, c = s + 0, l = s + 1, u = s + 2, { index: d, groups: f } = e;
	e.index && (c = d.getX(c), l = d.getX(l), u = d.getX(u));
	let { position: p, normal: m, uv: h, uv1: g } = e.attributes;
	if (Array.isArray(t)) {
		let e = r * 3;
		for (let s = 0, d = f.length; s < d; s++) {
			let { start: d, count: _, materialIndex: v } = f[s];
			if (e >= d && e < d + _) {
				let e = cs(t[v]), s = ss(n, p, m, h, g, c, l, u, e, a, o);
				if (s) if (s.faceIndex = r, s.face.materialIndex = v, i) i.push(s);
				else return s;
			}
		}
	} else {
		let e = cs(t), s = ss(n, p, m, h, g, c, l, u, e, a, o);
		if (s) if (s.faceIndex = r, s.face.materialIndex = 0, i) i.push(s);
		else return s;
	}
	return null;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/TriangleUtilities.js
function us(e, t, n, r) {
	let i = e.a, a = e.b, o = e.c, s = t, c = t + 1, l = t + 2;
	n && (s = n.getX(s), c = n.getX(c), l = n.getX(l)), i.x = r.getX(s), i.y = r.getY(s), i.z = r.getZ(s), a.x = r.getX(c), a.y = r.getY(c), a.z = r.getZ(c), o.x = r.getX(l), o.y = r.getY(l), o.z = r.getZ(l);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/iterationUtils.generated.js
function ds(e, t, n, r, i, a, o, s) {
	let { geometry: c, _indirectBuffer: l } = e;
	for (let e = r, l = r + i; e < l; e++) ls(c, t, n, e, a, o, s);
}
function fs(e, t, n, r, i, a, o) {
	let { geometry: s, _indirectBuffer: c } = e, l = Infinity, u = null;
	for (let e = r, c = r + i; e < c; e++) {
		let r;
		r = ls(s, t, n, e, null, a, o), r && r.distance < l && (u = r, l = r.distance);
	}
	return u;
}
function ps(e, t, n, r, i, a, o) {
	let { geometry: s } = n, { index: c } = s, l = s.attributes.position;
	for (let n = e, s = t + e; n < s; n++) {
		let e;
		if (e = n, us(o, e * 3, c, l), o.needsUpdate = !0, r(o, e, i, a)) return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/refit.generated.js
function ms(e, t = null) {
	t && Array.isArray(t) && (t = new Set(t));
	let n = e.geometry, r = n.index ? n.index.array : null, i = n.attributes.position, a, o, s, c, l = 0, u = e._roots;
	for (let e = 0, t = u.length; e < t; e++) a = u[e], o = new Uint32Array(a), s = new Uint16Array(a), c = new Float32Array(a), d(0, l), l += a.byteLength;
	function d(e, n, a = !1) {
		let l = e * 2;
		if (Ma(l, s)) {
			let t = Na(e, o), n = Pa(l, s), a = Infinity, u = Infinity, d = Infinity, f = -Infinity, p = -Infinity, m = -Infinity;
			for (let e = 3 * t, o = 3 * (t + n); e < o; e++) {
				let t = r[e], n = i.getX(t), o = i.getY(t), s = i.getZ(t);
				n < a && (a = n), n > f && (f = n), o < u && (u = o), o > p && (p = o), s < d && (d = s), s > m && (m = s);
			}
			return c[e + 0] !== a || c[e + 1] !== u || c[e + 2] !== d || c[e + 3] !== f || c[e + 4] !== p || c[e + 5] !== m ? (c[e + 0] = a, c[e + 1] = u, c[e + 2] = d, c[e + 3] = f, c[e + 4] = p, c[e + 5] = m, !0) : !1;
		} else {
			let r = Fa(e), i = Ia(e, o), s = a, l = !1, u = !1;
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
function hs(e, t, n, r, i) {
	let a, o, s, c, l, u, d = 1 / n.direction.x, f = 1 / n.direction.y, p = 1 / n.direction.z, m = n.origin.x, h = n.origin.y, g = n.origin.z, _ = t[e], v = t[e + 3], y = t[e + 1], b = t[e + 3 + 1], x = t[e + 2], S = t[e + 3 + 2];
	return d >= 0 ? (a = (_ - m) * d, o = (v - m) * d) : (a = (v - m) * d, o = (_ - m) * d), f >= 0 ? (s = (y - h) * f, c = (b - h) * f) : (s = (b - h) * f, c = (y - h) * f), a > c || s > o || ((s > a || isNaN(a)) && (a = s), (c < o || isNaN(o)) && (o = c), p >= 0 ? (l = (x - g) * p, u = (S - g) * p) : (l = (S - g) * p, u = (x - g) * p), a > u || l > o) ? !1 : ((l > a || a !== a) && (a = l), (u < o || o !== o) && (o = u), a <= i && o >= r);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/iterationUtils_indirect.generated.js
function gs(e, t, n, r, i, a, o, s) {
	let { geometry: c, _indirectBuffer: l } = e;
	for (let e = r, u = r + i; e < u; e++) ls(c, t, n, l ? l[e] : e, a, o, s);
}
function _s(e, t, n, r, i, a, o) {
	let { geometry: s, _indirectBuffer: c } = e, l = Infinity, u = null;
	for (let e = r, d = r + i; e < d; e++) {
		let r;
		r = ls(s, t, n, c ? c[e] : e, null, a, o), r && r.distance < l && (u = r, l = r.distance);
	}
	return u;
}
function vs(e, t, n, r, i, a, o) {
	let { geometry: s } = n, { index: c } = s, l = s.attributes.position;
	for (let s = e, u = t + e; s < u; s++) {
		let e;
		if (e = n.resolveTriangleIndex(s), us(o, e * 3, c, l), o.needsUpdate = !0, r(o, e, i, a)) return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycast.generated.js
function ys(e, t, n, r, i, a, o) {
	Q.setBuffer(e._roots[t]), bs(0, e, n, r, i, a, o), Q.clearBuffer();
}
function bs(e, t, n, r, i, a, o) {
	let { float32Array: s, uint16Array: c, uint32Array: l } = Q, u = e * 2;
	if (Ma(u, c)) ds(t, n, r, Na(e, l), Pa(u, c), i, a, o);
	else {
		let c = Fa(e);
		hs(c, s, r, a, o) && bs(c, t, n, r, i, a, o);
		let u = Ia(e, l);
		hs(u, s, r, a, o) && bs(u, t, n, r, i, a, o);
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycastFirst.generated.js
var xs = [
	"x",
	"y",
	"z"
];
function Ss(e, t, n, r, i, a) {
	Q.setBuffer(e._roots[t]);
	let o = Cs(0, e, n, r, i, a);
	return Q.clearBuffer(), o;
}
function Cs(e, t, n, r, i, a) {
	let { float32Array: o, uint16Array: s, uint32Array: c } = Q, l = e * 2;
	if (Ma(l, s)) return fs(t, n, r, Na(e, c), Pa(l, s), i, a);
	{
		let s = La(e, c), l = xs[s], u = r.direction[l] >= 0, d, f;
		u ? (d = Fa(e), f = Ia(e, c)) : (d = Ia(e, c), f = Fa(e));
		let p = hs(d, o, r, i, a) ? Cs(d, t, n, r, i, a) : null;
		if (p) {
			let e = p.point[l];
			if (u ? e <= o[f + s] : e >= o[f + s + 3]) return p;
		}
		let m = hs(f, o, r, i, a) ? Cs(f, t, n, r, i, a) : null;
		return p && m ? p.distance <= m.distance ? p : m : p || m || null;
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/intersectsGeometry.generated.js
var ws = /* @__PURE__ */ new V(), Ts = /* @__PURE__ */ new Ho(), Es = /* @__PURE__ */ new Ho(), Ds = /* @__PURE__ */ new Le(), Os = /* @__PURE__ */ new Uo(), ks = /* @__PURE__ */ new Uo();
function As(e, t, n, r) {
	Q.setBuffer(e._roots[t]);
	let i = js(0, e, n, r);
	return Q.clearBuffer(), i;
}
function js(e, t, n, r, i = null) {
	let { float32Array: a, uint16Array: o, uint32Array: s } = Q, c = e * 2;
	if (i === null && (n.boundingBox || n.computeBoundingBox(), Os.set(n.boundingBox.min, n.boundingBox.max, r), i = Os), Ma(c, o)) {
		let i = t.geometry, l = i.index, u = i.attributes.position, d = n.index, f = n.attributes.position, p = Na(e, s), m = Pa(c, o);
		if (Ds.copy(r).invert(), n.boundsTree) return X(Z(e), a, ks), ks.matrix.copy(Ds), ks.needsUpdate = !0, n.boundsTree.shapecast({
			intersectsBounds: (e) => ks.intersectsBox(e),
			intersectsTriangle: (e) => {
				e.a.applyMatrix4(r), e.b.applyMatrix4(r), e.c.applyMatrix4(r), e.needsUpdate = !0;
				for (let t = p * 3, n = (m + p) * 3; t < n; t += 3) if (us(Es, t, l, u), Es.needsUpdate = !0, e.intersectsTriangle(Es)) return !0;
				return !1;
			}
		});
		{
			let e = Eo(n);
			for (let t = p * 3, n = (m + p) * 3; t < n; t += 3) {
				us(Ts, t, l, u), Ts.a.applyMatrix4(Ds), Ts.b.applyMatrix4(Ds), Ts.c.applyMatrix4(Ds), Ts.needsUpdate = !0;
				for (let t = 0, n = e * 3; t < n; t += 3) if (us(Es, t, d, f), Es.needsUpdate = !0, Ts.intersectsTriangle(Es)) return !0;
			}
		}
	} else {
		let o = Fa(e), c = Ia(e, s);
		return X(Z(o), a, ws), !!(i.intersectsBox(ws) && js(o, t, n, r, i) || (X(Z(c), a, ws), i.intersectsBox(ws) && js(c, t, n, r, i)));
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/closestPointToGeometry.generated.js
var Ms = /* @__PURE__ */ new Le(), Ns = /* @__PURE__ */ new Uo(), Ps = /* @__PURE__ */ new Uo(), Fs = /* @__PURE__ */ new W(), Is = /* @__PURE__ */ new W(), Ls = /* @__PURE__ */ new W(), Rs = /* @__PURE__ */ new W();
function zs(e, t, n, r = {}, i = {}, a = 0, o = Infinity) {
	t.boundingBox || t.computeBoundingBox(), Ns.set(t.boundingBox.min, t.boundingBox.max, n), Ns.needsUpdate = !0;
	let s = e.geometry, c = s.attributes.position, l = s.index, u = t.attributes.position, d = t.index, f = Wo.getPrimitive(), p = Wo.getPrimitive(), m = Fs, h = Is, g = null, _ = null;
	i && (g = Ls, _ = Rs);
	let v = Infinity, y = null, b = null;
	return Ms.copy(n).invert(), Ps.matrix.copy(Ms), e.shapecast({
		boundsTraverseOrder: (e) => Ns.distanceToBox(e),
		intersectsBounds: (e, t, n) => n < v && n < o ? (t && (Ps.min.copy(e.min), Ps.max.copy(e.max), Ps.needsUpdate = !0), !0) : !1,
		intersectsRange: (e, r) => {
			if (t.boundsTree) return t.boundsTree.shapecast({
				boundsTraverseOrder: (e) => Ps.distanceToBox(e),
				intersectsBounds: (e, t, n) => n < v && n < o,
				intersectsRange: (t, i) => {
					for (let o = t, s = t + i; o < s; o++) {
						us(p, 3 * o, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
						for (let t = e, n = e + r; t < n; t++) {
							us(f, 3 * t, l, c), f.needsUpdate = !0;
							let e = f.distanceToTriangle(p, m, g);
							if (e < v && (h.copy(m), _ && _.copy(g), v = e, y = t, b = o), e < a) return !0;
						}
					}
				}
			});
			{
				let i = Eo(t);
				for (let t = 0, o = i; t < o; t++) {
					us(p, 3 * t, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
					for (let n = e, i = e + r; n < i; n++) {
						us(f, 3 * n, l, c), f.needsUpdate = !0;
						let e = f.distanceToTriangle(p, m, g);
						if (e < v && (h.copy(m), _ && _.copy(g), v = e, y = n, b = t), e < a) return !0;
					}
				}
			}
		}
	}), Wo.releasePrimitive(f), Wo.releasePrimitive(p), v === Infinity ? null : (r.point ? r.point.copy(h) : r.point = h.clone(), r.distance = v, r.faceIndex = y, i && (i.point ? i.point.copy(_) : i.point = _.clone(), i.point.applyMatrix4(Ms), h.applyMatrix4(Ms), i.distance = h.sub(i.point).length(), i.faceIndex = b), r);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/refit_indirect.generated.js
function Bs(e, t = null) {
	t && Array.isArray(t) && (t = new Set(t));
	let n = e.geometry, r = n.index ? n.index.array : null, i = n.attributes.position, a, o, s, c, l = 0, u = e._roots;
	for (let e = 0, t = u.length; e < t; e++) a = u[e], o = new Uint32Array(a), s = new Uint16Array(a), c = new Float32Array(a), d(0, l), l += a.byteLength;
	function d(n, a, l = !1) {
		let u = n * 2;
		if (Ma(u, s)) {
			let t = Na(n, o), a = Pa(u, s), l = Infinity, d = Infinity, f = Infinity, p = -Infinity, m = -Infinity, h = -Infinity;
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
			let e = Fa(n), r = Ia(n, o), i = l, s = !1, u = !1;
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
function Vs(e, t, n, r, i, a, o) {
	Q.setBuffer(e._roots[t]), Hs(0, e, n, r, i, a, o), Q.clearBuffer();
}
function Hs(e, t, n, r, i, a, o) {
	let { float32Array: s, uint16Array: c, uint32Array: l } = Q, u = e * 2;
	if (Ma(u, c)) gs(t, n, r, Na(e, l), Pa(u, c), i, a, o);
	else {
		let c = Fa(e);
		hs(c, s, r, a, o) && Hs(c, t, n, r, i, a, o);
		let u = Ia(e, l);
		hs(u, s, r, a, o) && Hs(u, t, n, r, i, a, o);
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycastFirst_indirect.generated.js
var Us = [
	"x",
	"y",
	"z"
];
function Ws(e, t, n, r, i, a) {
	Q.setBuffer(e._roots[t]);
	let o = Gs(0, e, n, r, i, a);
	return Q.clearBuffer(), o;
}
function Gs(e, t, n, r, i, a) {
	let { float32Array: o, uint16Array: s, uint32Array: c } = Q, l = e * 2;
	if (Ma(l, s)) return _s(t, n, r, Na(e, c), Pa(l, s), i, a);
	{
		let s = La(e, c), l = Us[s], u = r.direction[l] >= 0, d, f;
		u ? (d = Fa(e), f = Ia(e, c)) : (d = Ia(e, c), f = Fa(e));
		let p = hs(d, o, r, i, a) ? Gs(d, t, n, r, i, a) : null;
		if (p) {
			let e = p.point[l];
			if (u ? e <= o[f + s] : e >= o[f + s + 3]) return p;
		}
		let m = hs(f, o, r, i, a) ? Gs(f, t, n, r, i, a) : null;
		return p && m ? p.distance <= m.distance ? p : m : p || m || null;
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/intersectsGeometry_indirect.generated.js
var Ks = /* @__PURE__ */ new V(), qs = /* @__PURE__ */ new Ho(), Js = /* @__PURE__ */ new Ho(), Ys = /* @__PURE__ */ new Le(), Xs = /* @__PURE__ */ new Uo(), Zs = /* @__PURE__ */ new Uo();
function Qs(e, t, n, r) {
	Q.setBuffer(e._roots[t]);
	let i = $s(0, e, n, r);
	return Q.clearBuffer(), i;
}
function $s(e, t, n, r, i = null) {
	let { float32Array: a, uint16Array: o, uint32Array: s } = Q, c = e * 2;
	if (i === null && (n.boundingBox || n.computeBoundingBox(), Xs.set(n.boundingBox.min, n.boundingBox.max, r), i = Xs), Ma(c, o)) {
		let i = t.geometry, l = i.index, u = i.attributes.position, d = n.index, f = n.attributes.position, p = Na(e, s), m = Pa(c, o);
		if (Ys.copy(r).invert(), n.boundsTree) return X(Z(e), a, Zs), Zs.matrix.copy(Ys), Zs.needsUpdate = !0, n.boundsTree.shapecast({
			intersectsBounds: (e) => Zs.intersectsBox(e),
			intersectsTriangle: (e) => {
				e.a.applyMatrix4(r), e.b.applyMatrix4(r), e.c.applyMatrix4(r), e.needsUpdate = !0;
				for (let n = p, r = m + p; n < r; n++) if (us(Js, 3 * t.resolveTriangleIndex(n), l, u), Js.needsUpdate = !0, e.intersectsTriangle(Js)) return !0;
				return !1;
			}
		});
		{
			let e = Eo(n);
			for (let n = p, r = m + p; n < r; n++) {
				us(qs, 3 * t.resolveTriangleIndex(n), l, u), qs.a.applyMatrix4(Ys), qs.b.applyMatrix4(Ys), qs.c.applyMatrix4(Ys), qs.needsUpdate = !0;
				for (let t = 0, n = e * 3; t < n; t += 3) if (us(Js, t, d, f), Js.needsUpdate = !0, qs.intersectsTriangle(Js)) return !0;
			}
		}
	} else {
		let o = Fa(e), c = Ia(e, s);
		return X(Z(o), a, Ks), !!(i.intersectsBox(Ks) && $s(o, t, n, r, i) || (X(Z(c), a, Ks), i.intersectsBox(Ks) && $s(c, t, n, r, i)));
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/closestPointToGeometry_indirect.generated.js
var ec = /* @__PURE__ */ new Le(), tc = /* @__PURE__ */ new Uo(), nc = /* @__PURE__ */ new Uo(), rc = /* @__PURE__ */ new W(), ic = /* @__PURE__ */ new W(), ac = /* @__PURE__ */ new W(), oc = /* @__PURE__ */ new W();
function sc(e, t, n, r = {}, i = {}, a = 0, o = Infinity) {
	t.boundingBox || t.computeBoundingBox(), tc.set(t.boundingBox.min, t.boundingBox.max, n), tc.needsUpdate = !0;
	let s = e.geometry, c = s.attributes.position, l = s.index, u = t.attributes.position, d = t.index, f = Wo.getPrimitive(), p = Wo.getPrimitive(), m = rc, h = ic, g = null, _ = null;
	i && (g = ac, _ = oc);
	let v = Infinity, y = null, b = null;
	return ec.copy(n).invert(), nc.matrix.copy(ec), e.shapecast({
		boundsTraverseOrder: (e) => tc.distanceToBox(e),
		intersectsBounds: (e, t, n) => n < v && n < o ? (t && (nc.min.copy(e.min), nc.max.copy(e.max), nc.needsUpdate = !0), !0) : !1,
		intersectsRange: (r, i) => {
			if (t.boundsTree) {
				let s = t.boundsTree;
				return s.shapecast({
					boundsTraverseOrder: (e) => nc.distanceToBox(e),
					intersectsBounds: (e, t, n) => n < v && n < o,
					intersectsRange: (t, o) => {
						for (let x = t, S = t + o; x < S; x++) {
							us(p, 3 * s.resolveTriangleIndex(x), d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
							for (let t = r, n = r + i; t < n; t++) {
								us(f, 3 * e.resolveTriangleIndex(t), l, c), f.needsUpdate = !0;
								let n = f.distanceToTriangle(p, m, g);
								if (n < v && (h.copy(m), _ && _.copy(g), v = n, y = t, b = x), n < a) return !0;
							}
						}
					}
				});
			} else {
				let o = Eo(t);
				for (let t = 0, s = o; t < s; t++) {
					us(p, 3 * t, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
					for (let n = r, o = r + i; n < o; n++) {
						us(f, 3 * e.resolveTriangleIndex(n), l, c), f.needsUpdate = !0;
						let r = f.distanceToTriangle(p, m, g);
						if (r < v && (h.copy(m), _ && _.copy(g), v = r, y = n, b = t), r < a) return !0;
					}
				}
			}
		}
	}), Wo.releasePrimitive(f), Wo.releasePrimitive(p), v === Infinity ? null : (r.point ? r.point.copy(h) : r.point = h.clone(), r.distance = v, r.faceIndex = y, i && (i.point ? i.point.copy(_) : i.point = _.clone(), i.point.applyMatrix4(ec), h.applyMatrix4(ec), i.distance = h.sub(i.point).length(), i.faceIndex = b), r);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/GeometryRayIntersectUtilities.js
function cc(e, t, n) {
	return e === null ? null : (e.point.applyMatrix4(t.matrixWorld), e.distance = e.point.distanceTo(n.ray.origin), e.object = t, e);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/MeshBVH.js
var lc = /* @__PURE__ */ new Uo(), uc = /* @__PURE__ */ new it(), dc = /* @__PURE__ */ new W(), fc = /* @__PURE__ */ new Le(), pc = /* @__PURE__ */ new W(), mc = [
	"getX",
	"getY",
	"getZ"
], hc = class e extends No {
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
			[Ta]: !0
		});
		if (s._roots = a, s._indirectBuffer = o || null, r.setIndex) {
			let e = n.getIndex();
			if (e === null) {
				let e = new ne(t.index, 1, !1);
				n.setIndex(e);
			} else e.array !== i && (e.array.set(i), e.needsUpdate = !0);
		}
		return s;
		function c(e) {
			for (let t = 0; t < e.length; t++) {
				let n = e[t], r = new Uint32Array(n), i = new Uint16Array(n);
				for (let e = 0, t = n.byteLength / 32; e < t; e++) {
					let t = 8 * e;
					Ma(2 * t, i) || (r[t + 6] = r[t + 6] / 8 - e);
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
			let r = a[mc[e]](c), i = a[mc[e]](l), o = a[mc[e]](u), s = r;
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
				n[t + g + 0] = l + f, n[t + g + 1] = f + (Math.abs(l) + f) * wa;
			}
		}
		return n;
	}
	raycastObject3D(e, t, n = []) {
		let { material: r } = e;
		if (r === void 0) return;
		fc.copy(e.matrixWorld).invert(), uc.copy(t.ray).applyMatrix4(fc), pc.setFromMatrixScale(e.matrixWorld), dc.copy(uc.direction).multiply(pc);
		let i = dc.length(), a = t.near / i, o = t.far / i;
		if (t.firstHitOnly === !0) {
			let i = this.raycastFirst(uc, r, a, o);
			i = cc(i, e, t), i && n.push(i);
		} else {
			let i = this.raycast(uc, r, a, o);
			for (let r = 0, a = i.length; r < a; r++) {
				let a = cc(i[r], e, t);
				a && n.push(a);
			}
		}
		return n;
	}
	refit(e = null) {
		return (this.indirect ? Bs : ms)(this, e);
	}
	raycast(e, t = de, n = 0, r = Infinity) {
		let i = this._roots, a = [], o = this.indirect ? Vs : ys;
		for (let s = 0, c = i.length; s < c; s++) o(this, s, t, e, a, n, r);
		return a;
	}
	raycastFirst(e, t = de, n = 0, r = Infinity) {
		let i = this._roots, a = null, o = this.indirect ? Ws : Ss;
		for (let s = 0, c = i.length; s < c; s++) {
			let i = o(this, s, t, e, n, r);
			i != null && (a == null || i.distance < a.distance) && (a = i);
		}
		return a;
	}
	intersectsGeometry(e, t) {
		let n = !1, r = this._roots, i = this.indirect ? Qs : As;
		for (let a = 0, o = r.length; a < o && (n = i(this, a, e, t), !n); a++);
		return n;
	}
	shapecast(e) {
		let t = Wo.getPrimitive(), n = super.shapecast({
			...e,
			intersectsPrimitive: e.intersectsTriangle,
			scratchPrimitive: t,
			iterate: this.indirect ? vs : ps
		});
		return Wo.releasePrimitive(t), n;
	}
	bvhcast(t, n, r) {
		let { intersectsRanges: i, intersectsTriangles: a } = r, o = Wo.getPrimitive(), s = this.geometry.index, c = this.geometry.attributes.position, l = this.indirect ? (e) => {
			us(o, this.resolveTriangleIndex(e) * 3, s, c);
		} : (e) => {
			us(o, e * 3, s, c);
		}, u = Wo.getPrimitive(), d = t.geometry.index, f = t.geometry.attributes.position, p = t.indirect ? (e) => {
			us(u, t.resolveTriangleIndex(e) * 3, d, f);
		} : (e) => {
			us(u, e * 3, d, f);
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
		return lc.set(e.min, e.max, t), lc.needsUpdate = !0, this.shapecast({
			intersectsBounds: (e) => lc.intersectsBox(e),
			intersectsTriangle: (e) => lc.intersectsTriangle(e)
		});
	}
	intersectsSphere(e) {
		return this.shapecast({
			intersectsBounds: (t) => e.intersectsBox(t),
			intersectsTriangle: (t) => t.intersectsSphere(e)
		});
	}
	closestPointToGeometry(e, t, n = {}, r = {}, i = 0, a = Infinity) {
		return (this.indirect ? sc : zs)(this, e, t, n, r, i, a);
	}
	closestPointToPoint(e, t = {}, n = 0, r = Infinity) {
		return qo(this, e, t, n, r);
	}
}, gc = {
	Mesh: Re.prototype.raycast,
	Line: Ce.prototype.raycast,
	LineSegments: De.prototype.raycast,
	LineLoop: Ee.prototype.raycast,
	Points: Qe.prototype.raycast,
	BatchedMesh: B.prototype.raycast
}, _c = /* @__PURE__ */ new Re(), vc = [];
function yc(e, t) {
	if (this.isBatchedMesh) bc.call(this, e, t);
	else {
		let { geometry: n } = this;
		if (n.boundsTree) n.boundsTree.raycastObject3D(this, e, t);
		else {
			let n;
			if (this instanceof Re) n = gc.Mesh;
			else if (this instanceof De) n = gc.LineSegments;
			else if (this instanceof Ee) n = gc.LineLoop;
			else if (this instanceof Ce) n = gc.Line;
			else if (this instanceof Qe) n = gc.Points;
			else throw Error("BVH: Fallback raycast function not found.");
			n.call(this, e, t);
		}
	}
}
function bc(e, t) {
	if (this.boundsTrees) {
		let n = this.boundsTrees, r = this._drawInfo || this._instanceInfo, i = this._drawRanges || this._geometryInfo, a = this.matrixWorld;
		_c.material = this.material, _c.geometry = this.geometry;
		let o = _c.geometry.boundsTree, s = _c.geometry.drawRange;
		_c.geometry.boundingSphere === null && (_c.geometry.boundingSphere = new dt());
		for (let o = 0, s = r.length; o < s; o++) {
			if (!this.getVisibleAt(o)) continue;
			let s = r[o].geometryIndex;
			if (_c.geometry.boundsTree = n[s], this.getMatrixAt(o, _c.matrixWorld).premultiply(a), !_c.geometry.boundsTree) {
				this.getBoundingBoxAt(s, _c.geometry.boundingBox), this.getBoundingSphereAt(s, _c.geometry.boundingSphere);
				let e = i[s];
				_c.geometry.setDrawRange(e.start, e.count);
			}
			_c.raycast(e, vc);
			for (let e = 0, n = vc.length; e < n; e++) {
				let n = vc[e];
				n.object = this, n.batchId = o, t.push(n);
			}
			vc.length = 0;
		}
		_c.geometry.boundsTree = o, _c.geometry.drawRange = s, _c.material = null, _c.geometry = null;
	} else gc.BatchedMesh.call(this, e, t);
}
function xc(e = {}) {
	let { type: t = hc } = e;
	return this.boundsTree = new t(this, e), this.boundsTree;
}
function Sc() {
	this.boundsTree = null;
}
L.BufferGeometry.prototype.computeBoundsTree = xc, L.BufferGeometry.prototype.disposeBoundsTree = Sc, L.Mesh.prototype.raycast = yc;
var Cc = class {
	camera;
	deviceRenderer;
	spaceRenderer;
	linkRenderer;
	raycaster = new L.Raycaster();
	pointer = new L.Vector2(-9999, -9999);
	groundPlane = new L.Plane(new L.Vector3(0, 1, 0), 0);
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
	castHover(e = 30) {
		let t = performance.now();
		return t - this.lastTime < e ? {} : (this.lastTime = t, this._cast());
	}
	castClick(e = !1) {
		return this._cast(e);
	}
	getGroundPoint(e, t) {
		this.updatePointer(e, t), this.raycaster.setFromCamera(this.pointer, this.camera);
		let n = new L.Vector3();
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
}, wc = class {
	camera;
	linkRenderer;
	deviceRenderer;
	onCreate;
	state = "idle";
	sourceId = null;
	groundPlane = new L.Plane(new L.Vector3(0, 1, 0), 0);
	raycaster = new L.Raycaster();
	mouseWorld = new L.Vector3();
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
		let a = t.getBoundingClientRect(), o = new L.Vector2((e.clientX - a.left) / a.width * 2 - 1, -((e.clientY - a.top) / a.height) * 2 + 1);
		return this.raycaster.setFromCamera(o, this.camera), this.raycaster.ray.intersectPlane(this.groundPlane, this.mouseWorld), this.linkRenderer.showPreview(i, this.mouseWorld), !0;
	}
	onMouseUp(e, t) {
		return this.state === "dragging" ? this._hasMoved ? !e || !this.sourceId || e === this.sourceId ? (this.cancel(), "cancelled") : (this.onCreate(this.sourceId, e, t.clientX, t.clientY), this.cancel(), "created") : (this.cancel(), "click") : "cancelled";
	}
	cancel() {
		this.state = "idle", this.sourceId = null, this._hasMoved = !1, this.linkRenderer.hidePreview();
	}
}, Tc = class {
	state = "idle";
	targetId = null;
	targetType = null;
	startX = 0;
	startY = 0;
	groundPlane = new L.Plane(new L.Vector3(0, 1, 0), 0);
	raycaster = new L.Raycaster();
	worldPos = new L.Vector3();
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
		let a = t.getBoundingClientRect(), o = new L.Vector2((e.clientX - a.left) / a.width * 2 - 1, -((e.clientY - a.top) / a.height) * 2 + 1);
		return this.raycaster.setFromCamera(o, n), this.raycaster.ray.intersectPlane(this.groundPlane, this.worldPos) ? this.worldPos.clone() : null;
	}
	onMouseUp(e, t, n) {
		if (this.state !== "dragging") return this.cancel(), null;
		let r = t.getBoundingClientRect(), i = new L.Vector2((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
		this.raycaster.setFromCamera(i, n);
		let a = new L.Vector3();
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
function Ec(e) {
	return e < .5 ? 4 * e ** 3 : 1 - (-2 * e + 2) ** 3 / 2;
}
function Dc(e, t, n, r, i) {
	let a = performance.now(), o = e.position.clone(), s = t.target.clone();
	function c(l) {
		let u = Math.min((l - a) / i, 1), d = Ec(u);
		e.position.lerpVectors(o, n, d), t.target.lerpVectors(s, r, d), t.update(), u < 1 && requestAnimationFrame(c);
	}
	requestAnimationFrame(c);
}
var Oc = class {
	camera;
	controls;
	constructor(e, t) {
		this.camera = e, this.controls = t;
	}
	flyTo(e, t, n = 750) {
		let r = t ?? e.clone().setY(0), i = e.clone();
		Dc(this.camera, this.controls, i, r, n);
	}
	flyToDevice(e) {
		let t = e.clone().add(new L.Vector3(0, 10, 15)), n = e.clone().setY(1.5);
		Dc(this.camera, this.controls, t, n, 700);
	}
	flyToSpace(e, t) {
		let n = Math.max(t.width, t.depth) * .9, r = e.clone().add(new L.Vector3(0, n * .7, n * .8)), i = e.clone();
		Dc(this.camera, this.controls, r, i, 700);
	}
	flyToOverview() {
		Dc(this.camera, this.controls, new L.Vector3(0, 60, 80), new L.Vector3(0, 0, 0), 700);
	}
	panToXZ(e, t) {
		let n = new L.Vector3(e, this.controls.target.y, t), r = n.clone().sub(this.controls.target), i = this.camera.position.clone().add(r);
		Dc(this.camera, this.controls, i, n, 500);
	}
}, kc = class {
	group = new L.Group();
	scene;
	pickMeshes = [];
	target = null;
	ray = new L.Raycaster();
	constructor(e) {
		this.scene = e, this.group.visible = !1, this._build(), e.add(this.group);
	}
	_build() {
		let e = new L.Mesh(new L.BoxGeometry(.2, .2, .2), new L.MeshBasicMaterial({
			color: 16777062,
			depthTest: !1,
			transparent: !0,
			opacity: .9
		}));
		e.renderOrder = 1001, e.userData.axis = "xz", this.group.add(e), this.pickMeshes.push(e), this._buildAxis("x", 16724821, new L.Vector3(1, 0, 0)), this._buildAxis("y", 4513109, new L.Vector3(0, 1, 0)), this._buildAxis("z", 3381759, new L.Vector3(0, 0, 1));
		let t = new L.Mesh(new L.PlaneGeometry(.55, .55), new L.MeshBasicMaterial({
			color: 16777062,
			depthTest: !1,
			transparent: !0,
			opacity: .22,
			side: L.DoubleSide
		}));
		t.rotation.x = -Math.PI / 2, t.position.set(.5, 0, .5), t.renderOrder = 1e3, t.userData.axis = "xz", this.group.add(t), this.pickMeshes.push(t);
	}
	_buildAxis(e, t, n) {
		let r = new L.MeshBasicMaterial({
			color: t,
			depthTest: !1,
			transparent: !0
		}), i = 1.6, a = new L.Mesh(new L.CylinderGeometry(.04, .04, i, 8), r), o = new L.Mesh(new L.ConeGeometry(.13, .4, 12), r), s = new L.Quaternion().setFromUnitVectors(new L.Vector3(0, 1, 0), n);
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
			e instanceof L.Mesh && (e.geometry.dispose(), e.material.dispose());
		});
	}
}, Ac = class {
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
}, jc = "topospace.customTypes", Mc = I("deviceTypes", () => {
	let e = S(t());
	function t() {
		try {
			let e = localStorage.getItem(jc);
			return e ? new Map(JSON.parse(e).map((e) => [e.id, e])) : /* @__PURE__ */ new Map();
		} catch {
			return /* @__PURE__ */ new Map();
		}
	}
	function n() {
		localStorage.setItem(jc, JSON.stringify([...e.value.values()]));
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
}), Nc = [
	"pointerdown",
	"mousedown",
	"pointerup",
	"mouseup",
	"click"
], Pc = /* @__PURE__ */ new WeakMap();
function Fc(e, t, n) {
	Ic(e);
	let r = (r) => {
		let i = r.target;
		e.contains(i) && ((!n || n(i)) && (r.preventDefault(), r.stopPropagation(), r.stopImmediatePropagation()), r.type === "click" && t?.(r));
	};
	for (let e of Nc) document.addEventListener(e, r, !0);
	Pc.set(e, r);
}
function Ic(e) {
	let t = Pc.get(e);
	if (t) {
		for (let e of Nc) document.removeEventListener(e, t, !0);
		Pc.delete(e);
	}
}
function Lc(e, t) {
	let n = e.wrapper.getBoundingClientRect();
	return {
		width: n.width + t,
		height: n.height + t,
		realWidth: n.width,
		realHeight: n.height
	};
}
function Rc(e, t) {
	let { elementDimensions: n, popoverDimensions: r, popoverPadding: i, popoverArrowDimensions: a } = t;
	return e === "start" ? Math.max(Math.min(n.top - i, window.innerHeight - r.realHeight - a.width), a.width) : e === "end" ? Math.max(Math.min(n.top - r?.realHeight + n.height + i, window.innerHeight - r?.realHeight - a.width), a.width) : e === "center" ? Math.max(Math.min(n.top + n.height / 2 - r?.realHeight / 2, window.innerHeight - r?.realHeight - a.width), a.width) : 0;
}
function zc(e, t) {
	let { elementDimensions: n, popoverDimensions: r, popoverPadding: i, popoverArrowDimensions: a } = t;
	return e === "start" ? Math.max(Math.min(n.left - i, window.innerWidth - r.realWidth - a.width), a.width) : e === "end" ? Math.max(Math.min(n.left - r?.realWidth + n.width + i, window.innerWidth - r?.realWidth - a.width), a.width) : e === "center" ? Math.max(Math.min(n.left + n.width / 2 - r?.realWidth / 2, window.innerWidth - r?.realWidth - a.width), a.width) : 0;
}
function Bc(e, t, n) {
	let { align: r, side: i } = n, a = n.centered ? "over" : i, o = n.padding, s = Lc(e, n.offset), c = e.arrow.getBoundingClientRect(), l = t.getBoundingClientRect(), u = l.top - s.height, d = u >= 0, f = window.innerHeight - (l.bottom + s.height), p = f >= 0, m = l.left - s.width, h = m >= 0, g = window.innerWidth - (l.right + s.width), _ = g >= 0, v = !d && !p && !h && !_, y = a;
	if (a === "top" && d ? _ = h = p = !1 : a === "bottom" && p ? _ = h = d = !1 : a === "left" && h ? _ = d = p = !1 : a === "right" && _ && (h = d = p = !1), a === "over") {
		let t = window.innerWidth / 2 - s.realWidth / 2, n = window.innerHeight / 2 - s.realHeight / 2;
		e.wrapper.style.left = `${t}px`, e.wrapper.style.right = "auto", e.wrapper.style.top = `${n}px`, e.wrapper.style.bottom = "auto";
	} else if (v) {
		let t = window.innerWidth / 2 - s?.realWidth / 2;
		e.wrapper.style.left = `${t}px`, e.wrapper.style.right = "auto", e.wrapper.style.bottom = "10px", e.wrapper.style.top = "auto";
	} else if (h) {
		let t = Math.min(m, window.innerWidth - s?.realWidth - c.width), n = Rc(r, {
			elementDimensions: l,
			popoverDimensions: s,
			popoverPadding: o,
			popoverArrowDimensions: c
		});
		e.wrapper.style.left = `${t}px`, e.wrapper.style.top = `${n}px`, e.wrapper.style.bottom = "auto", e.wrapper.style.right = "auto", y = "left";
	} else if (_) {
		let t = Math.min(g, window.innerWidth - s?.realWidth - c.width), n = Rc(r, {
			elementDimensions: l,
			popoverDimensions: s,
			popoverPadding: o,
			popoverArrowDimensions: c
		});
		e.wrapper.style.right = `${t}px`, e.wrapper.style.top = `${n}px`, e.wrapper.style.bottom = "auto", e.wrapper.style.left = "auto", y = "right";
	} else if (d) {
		let t = Math.min(u, window.innerHeight - s.realHeight - c.width), n = zc(r, {
			elementDimensions: l,
			popoverDimensions: s,
			popoverPadding: o,
			popoverArrowDimensions: c
		});
		e.wrapper.style.top = `${t}px`, e.wrapper.style.left = `${n}px`, e.wrapper.style.bottom = "auto", e.wrapper.style.right = "auto", y = "top";
	} else if (p) {
		let t = Math.min(f, window.innerHeight - s?.realHeight - c.width), n = zc(r, {
			elementDimensions: l,
			popoverDimensions: s,
			popoverPadding: o,
			popoverArrowDimensions: c
		});
		e.wrapper.style.left = `${n}px`, e.wrapper.style.bottom = `${t}px`, e.wrapper.style.top = "auto", e.wrapper.style.right = "auto", y = "bottom";
	}
	Wc(e, v ? "over" : y, r, t), [...e.wrapper.classList].filter((e) => e.startsWith("driver-popover-side-") || e.startsWith("driver-popover-align-")).forEach((t) => e.wrapper.classList.remove(t)), e.wrapper.classList.add(`driver-popover-side-${y}`), e.wrapper.classList.add(`driver-popover-align-${r}`);
}
function Vc(e, t, n, r, i, a = 10) {
	let o = r - n;
	return e <= n && t >= r ? i === "start" ? 15 + a / 2 : i === "end" ? o - 15 - a / 2 : o / 2 : (Math.min(Math.max(e, n), r) + Math.min(Math.max(t, n), r)) / 2 - n;
}
function Hc(e, t, n = 10) {
	let r = t - 15 - n;
	if (r < 15) return Math.max(0, (t - n) / 2);
	let i = e - n / 2;
	return Math.min(Math.max(i, 15), r);
}
function Uc(e, t, n) {
	return e === "left" || e === "right" ? t.bottom > n.top && t.top < n.bottom ? e : t.bottom <= n.top ? "bottom" : "top" : t.right > n.left && t.left < n.right ? e : t.right <= n.left ? "right" : "left";
}
function Wc(e, t, n, r) {
	let i = e.arrow;
	if (i.className = "driver-popover-arrow", i.style.top = "", i.style.right = "", i.style.bottom = "", i.style.left = "", t === "over") {
		i.classList.add("driver-popover-arrow-none");
		return;
	}
	let a = r.getBoundingClientRect(), o = e.wrapper.getBoundingClientRect(), s = Uc(t, a, o);
	i.classList.add(`driver-popover-arrow-side-${s}`);
	let c = i.getBoundingClientRect().width || 10;
	if (s === "left" || s === "right") {
		let e = Vc(a.top, a.bottom, o.top, o.bottom, n, c);
		i.style.top = `${Hc(e, o.height, c)}px`;
	} else {
		let e = Vc(a.left, a.right, o.left, o.right, n, c);
		i.style.left = `${Hc(e, o.width, c)}px`;
	}
}
function Gc(e) {
	return typeof e == "function" ? e() : typeof e == "string" ? document.querySelector(e) : e;
}
function Kc(e) {
	let t = window.getComputedStyle(e);
	return [
		t.overflow,
		t.overflowX,
		t.overflowY
	].some((e) => e === "auto" || e === "scroll");
}
function qc(e, t, n, r) {
	return (e /= r / 2) < 1 ? n / 2 * e * e + t : -n / 2 * (--e * (e - 2) - 1) + t;
}
function Jc(e) {
	let t = "a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type=\"text\"]:not([disabled]), input[type=\"radio\"]:not([disabled]), input[type=\"checkbox\"]:not([disabled]), select:not([disabled])";
	return e.flatMap((e) => {
		let n = e.matches(t), r = Array.from(e.querySelectorAll(t));
		return [...n ? [e] : [], ...r];
	}).filter((e) => getComputedStyle(e).pointerEvents !== "none" && Qc(e));
}
function Yc(e, t) {
	if (!e || Zc(e)) return;
	let n = e.offsetHeight > window.innerHeight;
	e.scrollIntoView({
		behavior: !t || Xc(e) ? "auto" : "smooth",
		inline: "center",
		block: n ? "start" : "center"
	});
}
function Xc(e) {
	if (!e || !e.parentElement) return;
	let t = e.parentElement;
	return t.scrollHeight > t.clientHeight;
}
function Zc(e) {
	let t = e.getBoundingClientRect();
	return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function Qc(e) {
	return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
function $c(e) {
	e && (e.wrapper.style.display = "none");
}
function el(e, t) {
	let n = nl();
	document.body.appendChild(n.wrapper);
	let { title: r, description: i, showButtons: a, disableButtons: o, showProgress: s, nextBtnText: c, prevBtnText: l, progressText: u } = t;
	n.nextButton.innerHTML = c, n.previousButton.innerHTML = l, n.progress.innerHTML = u, t.doneButton && n.nextButton.classList.add("driver-popover-done-btn"), r ? (n.title.innerHTML = r, n.title.style.display = "block") : n.title.style.display = "none", i ? (n.description.innerHTML = i, n.description.style.display = "block") : n.description.style.display = "none";
	let d = a.includes("next") || a.includes("previous") || s;
	n.closeButton.style.display = a.includes("close") ? "block" : "none", d ? (n.footer.style.display = "flex", n.progress.style.display = s ? "block" : "none", n.nextButton.style.display = a.includes("next") ? "block" : "none", n.previousButton.style.display = a.includes("previous") ? "block" : "none") : n.footer.style.display = "none", o.includes("next") && (n.nextButton.disabled = !0, n.nextButton.classList.add("driver-popover-btn-disabled")), o.includes("previous") && (n.previousButton.disabled = !0, n.previousButton.classList.add("driver-popover-btn-disabled")), o.includes("close") && (n.closeButton.disabled = !0, n.closeButton.classList.add("driver-popover-btn-disabled"));
	let f = n.wrapper;
	f.style.display = "block", f.style.left = "", f.style.top = "", f.style.bottom = "", f.style.right = "", f.id = "driver-popover-content", f.setAttribute("role", "dialog"), f.setAttribute("aria-labelledby", "driver-popover-title"), f.setAttribute("aria-describedby", "driver-popover-description");
	let p = n.arrow;
	p.className = "driver-popover-arrow", f.className = `driver-popover ${t.popoverClass || ""}`.trim(), Fc(n.wrapper, (e) => {
		let n = e.target;
		if (n.closest(".driver-popover-next-btn")) return t.onNextClick?.();
		if (n.closest(".driver-popover-prev-btn")) return t.onPrevClick?.();
		if (n.closest(".driver-popover-close-btn")) return t.onCloseClick?.();
	}, (e) => n.description.contains(e) || n.title.contains(e) ? !1 : !!e.closest(".driver-popover-prev-btn, .driver-popover-next-btn, .driver-popover-close-btn")), t.onRender?.(n), Bc(n, e, t.position), tl(n, e, t.position), Yc(f, t.smoothScroll);
	let m = Jc([f, e]);
	return m.length > 0 && m[0].focus(), n;
}
function tl(e, t, n) {
	e.wrapper.querySelectorAll("img").forEach((r) => {
		if (r.complete) return;
		let i = () => Bc(e, t, n);
		r.addEventListener("load", i, { once: !0 }), r.addEventListener("error", i, { once: !0 });
	});
}
function nl() {
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
function rl(e) {
	e && (Ic(e.wrapper), e.wrapper.parentElement?.removeChild(e.wrapper));
}
function il(e, t) {
	let n = window.innerWidth, r = window.innerHeight, i = t.padding, a = t.radius, o = e.width + i * 2, s = e.height + i * 2, c = Math.min(a, o / 2, s / 2), l = Math.floor(Math.max(c, 0)), u = e.x - i + l, d = e.y - i, f = o - l * 2, p = s - l * 2;
	return `M${n},0L0,0L0,${r}L${n},${r}L${n},0Z
    M${u},${d} h${f} a${l},${l} 0 0 1 ${l},${l} v${p} a${l},${l} 0 0 1 -${l},${l} h-${f} a${l},${l} 0 0 1 -${l},-${l} v-${p} a${l},${l} 0 0 1 ${l},-${l} z`;
}
function al(e, t, n, r, i) {
	let a = e.getState("__activeStagePosition"), o = a || r.getBoundingClientRect(), s = i.getBoundingClientRect();
	a = {
		x: qc(t, o.x, s.x - o.x, n),
		y: qc(t, o.y, s.y - o.y, n),
		width: qc(t, o.width, s.width - o.width, n),
		height: qc(t, o.height, s.height - o.height, n)
	}, ll(e, a), e.setState("__activeStagePosition", a);
}
function ol(e, t) {
	if (!t) return;
	let n = t.getBoundingClientRect(), r = {
		x: n.x,
		y: n.y,
		width: n.width,
		height: n.height
	};
	e.setState("__activeStagePosition", r), ll(e, r);
}
function sl(e) {
	let t = e.getState("__activeStagePosition"), n = e.getState("__overlaySvg");
	if (!t) return;
	if (!n) {
		console.warn("No stage svg found.");
		return;
	}
	let r = window.innerWidth, i = window.innerHeight;
	n.setAttribute("viewBox", `0 0 ${r} ${i}`);
}
function cl(e, t) {
	let n = dl(e, t);
	document.body.appendChild(n), Fc(n, (t) => {
		t.target.tagName === "path" && e.emit("overlayClick");
	}), e.setState("__overlaySvg", n);
}
function ll(e, t) {
	let n = e.getState("__overlaySvg");
	if (!n) {
		cl(e, t);
		return;
	}
	let r = n.firstElementChild;
	if (r?.tagName !== "path") throw Error("no path element found in stage svg");
	r.setAttribute("d", il(t, ul(e)));
}
function ul(e) {
	return {
		padding: e.getConfig("stagePadding") || 0,
		radius: e.getConfig("stageRadius") || 0
	};
}
function dl(e, t) {
	let n = window.innerWidth, r = window.innerHeight, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	i.classList.add("driver-overlay", "driver-overlay-animated"), i.setAttribute("viewBox", `0 0 ${n} ${r}`), i.setAttribute("xmlSpace", "preserve"), i.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), i.setAttribute("version", "1.1"), i.setAttribute("preserveAspectRatio", "xMinYMin slice"), i.style.fillRule = "evenodd", i.style.clipRule = "evenodd", i.style.strokeLinejoin = "round", i.style.strokeMiterlimit = "2", i.style.zIndex = "10000", i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%";
	let a = document.createElementNS("http://www.w3.org/2000/svg", "path");
	return a.setAttribute("d", il(t, ul(e))), a.style.fill = e.getConfig("overlayColor") || "rgb(0,0,0)", a.style.opacity = `${e.getConfig("overlayOpacity")}`, a.style.pointerEvents = "auto", a.style.cursor = "auto", i.appendChild(a), i;
}
function fl(e) {
	let t = e.getState("__overlaySvg");
	t && (Ic(t), t.remove());
}
var pl = "{{current}} of {{total}}";
function ml(e, t) {
	return !(t.skipMissingElement ?? e.getConfig("skipMissingElement")) || !t.element ? !1 : !Gc(t.element);
}
function hl(e, t, n) {
	let r = e.getConfig("steps") || [];
	for (let i = t; i >= 0 && i < r.length; i += n) if (!ml(e, r[i])) return i;
}
function gl(e, t) {
	let n = e.getState("activeIndex"), r = n !== void 0 && hl(e, n + 1, 1) === void 0, i = t?.popover?.onDoneClick || e.getConfig("onDoneClick");
	return r && i ? i : t?.popover?.onNextClick || e.getConfig("onNextClick");
}
function _l(e, t) {
	return t?.popover?.onPrevClick || e.getConfig("onPrevClick");
}
function vl(e, t) {
	return t?.popover?.onCloseClick || e.getConfig("onCloseClick");
}
function yl(e, t, n) {
	let r = e.getConfig("steps") || [], i = r[t], a = i.popover || {}, o = hl(e, t + 1, 1) !== void 0, s = hl(e, t - 1, -1) !== void 0, c = a.doneBtnText || e.getConfig("doneBtnText") || "Done", l = e.getConfig("allowClose"), u = a.showProgress === void 0 ? e.getConfig("showProgress") : a.showProgress, d = (a.progressText || e.getConfig("progressText") || pl).replace("{{current}}", `${t + 1}`).replace("{{total}}", `${r.length}`), f = a.showButtons || e.getConfig("showButtons"), p = [
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
function bl(e, t, n) {
	let r = e.getConfig("stagePadding") || 0;
	return {
		side: n.popover?.side || "bottom",
		align: n.popover?.align || "start",
		offset: r + (e.getConfig("popoverOffset") || 0),
		padding: r,
		centered: t.id === "driver-dummy-element"
	};
}
function xl(e, t, n) {
	let r = n.popover || {}, i = e.getState("activeIndex"), a = i !== void 0 && hl(e, i + 1, 1) === void 0;
	return {
		title: r.title,
		description: r.description,
		showButtons: r.showButtons || e.getConfig("showButtons"),
		disableButtons: r.disableButtons || e.getConfig("disableButtons") || [],
		showProgress: r.showProgress || e.getConfig("showProgress") || !1,
		progressText: r.progressText ?? (e.getConfig("progressText") || pl),
		nextBtnText: r.nextBtnText ?? (e.getConfig("nextBtnText") || "Next"),
		prevBtnText: r.prevBtnText ?? (e.getConfig("prevBtnText") || "Previous"),
		doneButton: a,
		popoverClass: r.popoverClass || e.getConfig("popoverClass") || "",
		smoothScroll: e.getConfig("smoothScroll"),
		onNextClick: () => {
			let r = gl(e, n);
			return r ? r(t, n, e.getHookOpts()) : e.emit("nextClick");
		},
		onPrevClick: () => {
			let r = _l(e, n);
			return r ? r(t, n, e.getHookOpts()) : e.emit("prevClick");
		},
		onCloseClick: () => {
			let r = vl(e, n);
			return r ? r(t, n, e.getHookOpts()) : e.emit("closeClick");
		},
		onRender: (t) => {
			e.setState("popover", t), (r.onPopoverRender || e.getConfig("onPopoverRender"))?.(t, e.getHookOpts());
		},
		position: bl(e, t, n)
	};
}
function Sl(e, t, n) {
	rl(e.getState("popover")), el(t, xl(e, t, n));
}
function Cl(e, t, n) {
	let r = e.getState("popover");
	r && Bc(r, t, bl(e, t, n));
}
function wl() {
	let e = document.getElementById("driver-dummy-element");
	if (e) return e;
	let t = document.createElement("div");
	return t.id = "driver-dummy-element", t.style.width = "0", t.style.height = "0", t.style.pointerEvents = "none", t.style.opacity = "0", t.style.position = "fixed", t.style.top = "50%", t.style.left = "50%", document.body.appendChild(t), t;
}
function Tl(e, t) {
	let n = Gc(t.element);
	n ||= wl(), Dl(e, n, t);
}
function El(e) {
	let t = e.getState("__activeElement"), n = e.getState("__activeStep");
	t && (ol(e, t), sl(e), Cl(e, t, n));
}
function Dl(e, t, n) {
	let r = e.getConfig("duration") || 400, i = Date.now(), a = e.getState("__activeStep"), o = e.getState("__activeElement") || t, s = !o || o === t, c = t.id === "driver-dummy-element", l = o.id === "driver-dummy-element", u = e.getConfig("animate"), d = n.onHighlightStarted || e.getConfig("onHighlightStarted"), f = n?.onHighlighted || e.getConfig("onHighlighted"), p = a?.onDeselected || e.getConfig("onDeselected"), m = e.getHookOpts();
	!s && p && p(l ? void 0 : o, a, m), d && d(c ? void 0 : t, n, m);
	let h = !s && u, g = !1;
	$c(e.getState("popover")), e.setState("previousStep", a), e.setState("previousElement", o), e.setState("activeStep", n), e.setState("activeElement", t);
	let _ = () => {
		if (e.getState("__transitionCallback") !== _) return;
		let s = Date.now() - i, l = r - s <= r / 2;
		n.popover && l && !g && h && (Sl(e, t, n), g = !0), e.getConfig("animate") && s < r ? al(e, s, r, o, t) : (ol(e, t), f && f(c ? void 0 : t, n, e.getHookOpts()), e.setState("__transitionCallback", void 0), e.setState("__previousStep", a), e.setState("__previousElement", o), e.setState("__activeStep", n), e.setState("__activeElement", t)), window.requestAnimationFrame(_);
	};
	e.setState("__transitionCallback", _), window.requestAnimationFrame(_), Yc(t, e.getConfig("smoothScroll")), !h && n.popover && Sl(e, t, n), document.querySelectorAll(".driver-active-element-parent").forEach((e) => {
		e.classList.remove("driver-active-element-parent", "driver-active-element-parent-no-scroll");
	}), o.classList.remove("driver-active-element", "driver-no-interaction"), o.removeAttribute("aria-haspopup"), o.removeAttribute("aria-expanded"), o.removeAttribute("aria-controls"), (n.disableActiveInteraction ?? e.getConfig("disableActiveInteraction")) && t.classList.add("driver-no-interaction");
	let v = t.parentElement;
	v && v !== document.body && (v.classList.add("driver-active-element-parent"), Kc(v) && v.classList.add("driver-active-element-parent-no-scroll")), t.classList.add("driver-active-element"), t.setAttribute("aria-haspopup", "dialog"), t.setAttribute("aria-expanded", "true"), t.setAttribute("aria-controls", "driver-popover-content");
}
function Ol() {
	document.getElementById("driver-dummy-element")?.remove(), document.querySelectorAll(".driver-active-element").forEach((e) => {
		let t = e.parentElement;
		t && t !== document.body && t.classList.remove("driver-active-element-parent", "driver-active-element-parent-no-scroll"), e.classList.remove("driver-active-element", "driver-no-interaction"), e.removeAttribute("aria-haspopup"), e.removeAttribute("aria-expanded"), e.removeAttribute("aria-controls");
	});
}
function kl(e) {
	let t = e.getState("__resizeTimeout");
	t && window.cancelAnimationFrame(t), e.setState("__resizeTimeout", window.requestAnimationFrame(() => El(e)));
}
function Al(e, t) {
	if (!e.getState("isInitialized") || !(t.key === "Tab" || t.keyCode === 9)) return;
	let n = e.getState("__activeElement"), r = e.getState("popover")?.wrapper, i = Jc([...r ? [r] : [], ...n ? [n] : []]), a = i[0], o = i[i.length - 1];
	t.preventDefault(), t.shiftKey ? (i[i.indexOf(document.activeElement) - 1] || o)?.focus() : (i[i.indexOf(document.activeElement) + 1] || a)?.focus();
}
function jl(e, t) {
	(e.getConfig("allowKeyboardControl") ?? !0) && (t.key === "Escape" ? e.emit("escapePress") : t.key === "ArrowRight" ? e.emit("arrowRightPress") : t.key === "ArrowLeft" && e.emit("arrowLeftPress"));
}
function Ml(e, t) {
	let n = e.getState("__activeElement"), r = t.target;
	!n || !r || !n.contains(r) || e.emit("activeElementClick");
}
function Nl(e) {
	let t = (t) => jl(e, t), n = (t) => Al(e, t), r = () => kl(e), i = () => kl(e), a = (t) => Ml(e, t);
	e.setState("__events", {
		onKeyup: t,
		onKeydown: n,
		onResize: r,
		onScroll: i,
		onClick: a
	}), window.addEventListener("keyup", t, !1), window.addEventListener("keydown", n, !1), window.addEventListener("resize", r), window.addEventListener("scroll", i), document.addEventListener("click", a, !1);
}
function Pl(e) {
	let t = e.getState("__events");
	t && (window.removeEventListener("keyup", t.onKeyup), window.removeEventListener("keydown", t.onKeydown), window.removeEventListener("resize", t.onResize), window.removeEventListener("scroll", t.onScroll), document.removeEventListener("click", t.onClick, !1));
}
function Fl() {
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
function Il() {
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
function Ll() {
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
function Rl(e = {}) {
	let t = Fl();
	t.configure(e);
	let n = Il(), r = Ll(), i;
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
function zl(e = {}) {
	let t = Rl(e);
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
			let e = t.getState("activeStep"), n = t.getState("activeElement"), r = gl(t, e);
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
		let n = t.getState("__activeElement"), r = gl(t, e);
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
		let i = _l(t, n);
		if (i) return i(r, n, t.getHookOpts());
		a();
	}
	function l() {
		if (t.getState("__transitionCallback")) return;
		let e = t.getState("activeIndex"), n = t.getState("__activeStep"), r = t.getState("__activeElement");
		if (e === void 0 || n === void 0) return;
		let a = gl(t, n);
		if (a) return a(r, n, t.getHookOpts());
		i();
	}
	function u() {
		t.getState("isInitialized") || (t.setState("isInitialized", !0), document.body.classList.add("driver-active", t.getConfig("animate") ? "driver-fade" : "driver-simple"), t.getConfig("allowScroll") || document.body.classList.add("driver-no-scroll"), document.body.style.setProperty("--driver-animation-duration", `${t.getConfig("duration") || 400}ms`), Nl(t), t.listen("overlayClick", r), t.listen("activeElementClick", s), t.listen("escapePress", n), t.listen("closeClick", n), t.listen("arrowLeftPress", c), t.listen("arrowRightPress", l));
	}
	function d() {
		let e = t.getState("__pendingWaitCancel");
		e && (t.setState("__pendingWaitCancel", void 0), e());
	}
	function f(e, n, r) {
		let i = () => {
			a.disconnect(), window.clearTimeout(o), t.setState("__pendingWaitCancel", void 0), r();
		}, a = new MutationObserver(() => {
			Gc(e.element) && i();
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
		if (!n && a > 0 && i.element && !Gc(i.element)) {
			f(i, a, () => p(e, !0));
			return;
		}
		if (ml(t, i)) {
			let n = t.getState("activeIndex"), i = typeof n == "number" && e < n ? -1 : 1;
			r[e + i] ? p(e + i) : i === 1 && m();
			return;
		}
		t.setState("__activeOnDestroyed", document.activeElement), t.setState("activeIndex", e);
		let o = r[e + 1];
		Tl(t, yl(t, e, {
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
		document.body.classList.remove("driver-active", "driver-fade", "driver-simple", "driver-no-scroll"), document.body.style.removeProperty("--driver-animation-duration"), d(), Pl(t), rl(t.getState("popover")), Ol(), fl(t), t.resetEmitter();
		let c = t.getState();
		if (t.resetState(), n && r) {
			let e = n.id === "driver-dummy-element";
			o && o(e ? void 0 : n, r, t.getHookOpts(c)), s && s(e ? void 0 : n, r, t.getHookOpts(c));
		}
		i && i.focus();
	}
	let h = {
		isActive: () => t.getState("isInitialized") || !1,
		refresh: () => kl(t),
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
			return e !== void 0 && hl(t, e - 1, -1) === void 0;
		},
		isLastStep: () => {
			let e = t.getState("activeIndex");
			return e !== void 0 && hl(t, e + 1, 1) === void 0;
		},
		getActiveStep: () => t.getState("activeStep"),
		getActiveElement: () => t.getState("activeElement"),
		getPreviousElement: () => t.getState("previousElement"),
		getPreviousStep: () => t.getState("previousStep"),
		getNextStep: () => {
			let e = t.getConfig("steps") || [], n = t.getState("activeIndex");
			if (n === void 0) return;
			let r = hl(t, n + 1, 1);
			return r === void 0 ? void 0 : e[r];
		},
		moveNext: i,
		movePrevious: a,
		moveTo: o,
		hasNextStep: () => {
			let e = t.getState("activeIndex");
			return e !== void 0 && hl(t, e + 1, 1) !== void 0;
		},
		hasPreviousStep: () => {
			let e = t.getState("activeIndex");
			return e !== void 0 && hl(t, e - 1, -1) !== void 0;
		},
		highlight: (e) => {
			u(), Tl(t, {
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
var Bl = new Set([
	"building",
	"floor",
	"site"
]), Vl = {
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
function Hl() {
	return typeof navigator < "u" && navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
}
function Ul(e = Hl()) {
	let t = G(), n = Vl[e], r = t.rootSpaces.length > 1 || t.rootSpaces.some((e) => t.childSpaces(e.id).some((e) => Bl.has(e.type))), i = [{ popover: n.welcome }];
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
	}), zl({
		showProgress: !0,
		allowClose: !0,
		steps: i,
		onDestroyed: () => localStorage.setItem("topospace.tourSeen", "1")
	}).drive();
}
//#endregion
//#region src/composables/useNmsEditor.ts
var Wl = Symbol("topospace-editor-options"), Gl = /* @__PURE__ */ new WeakMap(), Kl = {};
function ql(e = {}) {
	Kl = e;
}
function Jl() {
	let e = G(), t = K(), n = m(Wl, Kl), r = Gl.get(e);
	return r ? r.configure(n) : (r = Yl(e, t, n), Gl.set(e, r)), r;
}
function Yl(e, t, n = {}) {
	let r = new Tn(), i = new Ac(), a = Mc(), o, s, c, l, u, d, f, p, m, g, _, v, y, b = null, x = !1, S = {
		x: 0,
		y: 0
	}, C = null, w = null, T = null, E = [], D = /* @__PURE__ */ new Map(), O = [], k = n, A = 0, M = 0, N = 0, P = !1, F = null, ee = 0, I = [], R = [];
	function z() {
		return {
			mappings: [...e.mappings.entries()].map(([e, t]) => [e, { ...t }]),
			links: [...e.links.entries()].map(([e, t]) => [e, { ...t }]),
			spaces: [...e.spaces.entries()].map(([e, t]) => [e, { ...t }]),
			unmappedIds: e.unmappedDevices.map((e) => e.id)
		};
	}
	function B() {
		I.push(z()), I.length > 30 && I.shift(), R.length = 0;
	}
	async function te(n) {
		e.mappings.clear(), n.mappings.forEach(([t, n]) => e.mappings.set(t, n)), e.links.clear(), n.links.forEach(([t, n]) => e.links.set(t, n)), e.spaces.clear(), n.spaces.forEach(([t, n]) => e.spaces.set(t, n));
		let r = new Set(n.unmappedIds), i = n.unmappedIds.map((t) => e.devices.get(t)).filter((e) => e != null);
		e.unmappedDevices.splice(0, e.unmappedDevices.length, ...i), e.devices.forEach((t) => {
			r.has(t.id) && !i.find((e) => e.id === t.id) && e.unmappedDevices.push(t);
		}), await Ue(), t.select(null);
	}
	function V(e = {}) {
		k = e;
	}
	function ne() {
		let { width: e, height: t } = r.getSize();
		c?.setResolution(e, t);
	}
	function re(n, i, a) {
		x || (b = n, x = !0, e.configureSecurity({
			mode: k.mode ?? t.mode,
			features: k.features,
			permissionResolver: k.permissionResolver,
			onPermissionDenied: (e) => {
				t.addToast("Permission denied", "warning"), k.onPermissionDenied?.(e);
			},
			onChange: k.onChange
		}), t.setMode(k.mode ?? t.mode), An(t.colorblindMode ? "colorblind" : "default"), r.init(n, i, a, { onError: (e, t) => k.onError?.(e, t) }), o = new yi(r.scene), s = new xi(r.scene), c = new Zi(r.scene), ne(), r.onResize(ne), l = new ia(r.scene), u = new oa(r.scene), d = new la(r.scene), f = new da(r.scene), p = new xa(r.scene), y = new Oc(r.camera, r.controls), _ = new Tc(), m = new Cc(r.camera, o, s, c), g = new wc(r.camera, c, o, (e, n, r, i) => t.showContextMenu(r, i, e, n)), v = new kc(r.scene), k.data ? e.replaceData(k.data) : k.mockData !== !1 && e.loadMockData(), ae(), h(() => {
			oe(), We(), ie();
		}), ce(n), le(), me(), k.onReady?.());
	}
	function ie() {
		k.features?.tour !== !1 && (localStorage.getItem("topospace.tourSeen") || Ul());
	}
	function ae() {
		let n = t.activeRootSpaceId;
		if (n) {
			let t = e.spaces.get(n);
			(!t || t.archived) && (n = null);
		}
		n ||= k.initialFloorId && e.spaces.has(k.initialFloorId) ? k.initialFloorId : e.rootSpaces[0]?.id ?? null;
		let r = n ? e.resolveLeafScope(n) : null;
		r !== t.activeRootSpaceId && (t.activeRootSpaceId = r);
	}
	let H = null;
	async function oe() {
		await hi(a.customTypes);
		let n = t.activeRootSpaceId;
		s.loadSpaces(e.scopedSpaces(n)), o.loadInstanced(e.scopedDevices(n), e.mappings, (t) => e.getMappingByDeviceId(t)), c.loadLinks(e.scopedLinks(n), (e) => o.getDeviceWorldPos(e)), se(), d.loadNodes([...e.virtualNodes.values()]), await p.loadObjects(e.scopedBackgroundObjects(n)), p.setEditMode(t.backgroundEditActive);
	}
	function se() {
		let n = e.scopedLinks(t.activeRootSpaceId).filter((t) => {
			let n = e.devices.get(t.sourceDeviceId), r = e.devices.get(t.targetDeviceId);
			return n?.status !== "offline" && r?.status !== "offline";
		});
		l.syncLinks(n, (e) => c.getLinkPath(e));
	}
	function ce(e) {
		e.addEventListener("pointerdown", be), e.addEventListener("pointermove", xe), e.addEventListener("pointerup", Se), e.addEventListener("contextmenu", qe), window.addEventListener("keydown", Ce);
	}
	function le() {
		O.push(j(() => t.fontScale, (e) => o.setLabelScale(e), { immediate: !0 })), e.devices.forEach((e) => D.set(e.id, e.status ?? "unknown")), O.push(j(() => {
			let t = "";
			return e.devices.forEach((e) => {
				t += `${e.id}:${e.status};`;
			}), t;
		}, () => {
			let t = !1;
			e.devices.forEach((e) => {
				let n = e.status ?? "unknown", r = D.get(e.id);
				if (o.updateStatus(e.id, n), r !== void 0 && r !== n) {
					let i = o.getDeviceWorldPos(e.id);
					i && (n === "critical" || n === "offline" ? f.flash(i, "critical") : n === "warning" ? f.flash(i, "warning") : n === "normal" && (r === "critical" || r === "warning" || r === "offline") && f.flash(i, "recover")), (n === "offline" || r === "offline") && (t = !0);
				}
				D.set(e.id, n);
			}), t && se();
		})), O.push(j(() => e.links.size, () => De())), O.push(j(() => t.activeRootSpaceId, async () => {
			if (t.select(null), await Ue(), H) {
				let { type: e, id: n } = H;
				H = null, t.select({
					type: e,
					id: n
				}), e === "device" ? Me(n) : ze(n);
			}
		})), O.push(j(() => [...t.visibleLinkTypes], (e) => {
			[
				"physical",
				"logical",
				"service_dependency",
				"traffic_flow",
				"security_path",
				"manual",
				"inferred"
			].forEach((t) => c.setVisible(t, e.includes(t)));
		})), O.push(j(() => t.hoveredId, (e, n) => {
			n && (o.setHighlight(n, !1), c.setHighlight(null, n)), e && (t.selection?.type === "link" ? c.setHighlight(e, null) : o.setHighlight(e, !0));
		})), O.push(j(() => t.selection, (n, r) => {
			if (r?.type === "space" && s.setSelected(r.id, !1), r?.type === "link" && c.setSelected(null), o.setSelectedDevice(n?.type === "device" ? n.id : null), t.mode === "edit" && n && (n.type === "device" || n.type === "space" || n.type === "background") ? fe(n) : v?.detach(), !n) {
				u.clear(), t.blastSourceId = null, t.showRackServerList = !1;
				return;
			}
			if (n.type === "device") {
				let r = e.devices.get(n.id);
				r && (r.status === "critical" || r.status === "warning") && t.showBlastRadius ? Ee(n.id) : u.clear();
				let i = e.getMappingByDeviceId(n.id);
				i?.primarySpaceId && (t.selectedRackForList = i.primarySpaceId, t.showRackServerList = !0);
			} else n.type === "space" ? (s.setSelected(n.id, !0), e.spaces.get(n.id)?.type === "rack" ? (t.selectedRackForList = n.id, t.showRackServerList = !0) : t.showRackServerList = !1) : n.type === "link" && c.setSelected(t.mode === "edit" ? n.id : null);
		})), O.push(j(() => t.mode, (n) => {
			e.setEditorMode(n), n === "view" ? (v?.detach(), c?.setSelected(null), g?.cancel(), _?.cancel(), C = null, w = null, T = null, E = []) : t.selection && (t.selection.type === "device" || t.selection.type === "space") && fe(t.selection);
		}, { immediate: !0 })), O.push(j(() => t.linkToolActive, (e) => {
			e || g.cancel(), b && (b.style.cursor = e ? "crosshair" : ""), e && t.addToast("Connect mode on — drag from one device to another", "info");
		})), O.push(j(() => t.backgroundEditActive, (e) => {
			p?.setEditMode(e), !e && t.selection?.type === "background" && t.select(null), e && t.addToast("Background edit on — click a background object to move it", "info");
		})), O.push(j(() => t.showParticles, (e) => l.setVisible(e))), O.push(j(() => t.showBlastRadius, (e) => {
			e || u.clear();
		})), O.push(j(() => e.virtualNodes.size, () => {
			d.dispose(), d = new la(r.scene), d.loadNodes([...e.virtualNodes.values()]);
		})), O.push(j(() => t.timelineFrameIdx, (t) => {
			if (t < 0) return;
			let n = i.getFrame(t);
			n && Object.entries(n.states).forEach(([t, n]) => e.updateDeviceStatus(t, n.status, n.metrics));
		})), O.push(j(() => e.spaces.size, () => e.spaces.forEach((e) => s.addSpace(e)))), O.push(j(() => `${t.filter.search}|${t.filter.status.join(",")}|${t.filter.type.join(",")}|${t.alertsOnly}`, () => pe())), O.push(j(() => e.mappings.size, () => pe())), O.push(j(() => a.customTypes.size, () => {
			Bn(a.customTypes), pi(a.customTypes);
		}, { immediate: !0 }));
	}
	function ue(e) {
		if (!b) return null;
		let t = b.getBoundingClientRect(), n = new L.Vector2((e.clientX - t.left) / t.width * 2 - 1, -((e.clientY - t.top) / t.height) * 2 + 1), i = new L.Raycaster();
		i.setFromCamera(n, r.camera);
		let a = i.intersectObjects(p.getPickMeshes(), !0);
		return a.length ? p.getBackgroundIdFromObject(a[0].object) : null;
	}
	function de(e, t) {
		if (!b) return null;
		let n = b.getBoundingClientRect(), i = new L.Vector2((e.clientX - n.left) / n.width * 2 - 1, -((e.clientY - n.top) / n.height) * 2 + 1), a = new L.Raycaster();
		a.setFromCamera(i, r.camera);
		let o = new L.Vector3();
		r.camera.getWorldDirection(o), o.y = 0, o.lengthSq() < 1e-6 && o.set(0, 0, 1), o.normalize();
		let s = new L.Plane().setFromNormalAndCoplanarPoint(o, t), c = new L.Vector3();
		return a.ray.intersectPlane(s, c) ? c : null;
	}
	function fe(n) {
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
				}, new L.Vector3(t.position.x, 0, t.position.z)) : v.detach();
			} else if (n.type === "background") {
				let e = p.getWorldPos(n.id);
				e ? v.attach({
					type: "background",
					id: n.id
				}, e) : v.detach();
			} else v.detach();
		}
	}
	function pe() {
		let n = t.filter, r = n.search.toLowerCase().trim();
		if (!(r || n.status.length > 0 || n.type.length > 0 || t.alertsOnly)) {
			o.applySearchFilter(/* @__PURE__ */ new Set(), !1);
			return;
		}
		let i = /* @__PURE__ */ new Set();
		e.devices.forEach((e) => {
			let a = !r || (e.hostname ?? "").toLowerCase().includes(r) || (e.ip ?? "").includes(r), o = !n.status.length || n.status.includes(e.status ?? "unknown"), s = e.normalizedType ?? "unknown", c = !n.type.length || n.type.includes(s), l = !t.alertsOnly || e.status !== "normal";
			a && o && c && l && i.add(e.id);
		}), o.applySearchFilter(i, !0), o.setSearchFocus(i, (t) => {
			let n = e.devices.get(t);
			return n?.hostname ?? n?.ip ?? t;
		});
	}
	function me() {
		r.startLoop((n, i) => {
			if (ye(n, i), c.update(n), u.update(n), d.update(i), f.update(n), v.update(r.camera), s.updateLod(r.camera, r.controls.target), o.tick(), t.showParticles && l.update(n, t.visibleLinkTypes), ve(i), he() || e.devices.forEach((e) => {
				e.status === "warning" && o.pulseStatus(e.id, "warning", .4 * Math.abs(Math.sin(i * 1.6))), e.status === "critical" && o.pulseStatus(e.id, "critical", .7 * Math.abs(Math.sin(i * 4)));
			}), !C && !g.isDrawing && !_.hasPending) {
				let e = m.castHover(32), n = e.deviceId ?? e.linkId ?? e.linkHandleId ?? null;
				n !== t.hoveredId && (t.hoveredId = n);
			}
		});
	}
	function he() {
		return !!t.filter.search.trim() || t.filter.status.length > 0 || t.filter.type.length > 0 || t.alertsOnly;
	}
	let ge = [];
	function _e() {
		let n = e.scopedDevices(t.activeRootSpaceId).filter((e) => e.status === "critical" || e.status === "warning").sort((e) => e.status === "critical" ? -1 : 1);
		if (!n.length) {
			ge = [];
			return;
		}
		F ??= new L.Raycaster();
		let i = r.camera, a = i.position, c = [...o.getInstancedMeshes(), ...s.getHitMeshes()], l = [];
		for (let e of n) {
			if (l.length >= 12) break;
			let t = o.getDeviceWorldPos(e.id);
			if (!t) continue;
			let n = t.clone().project(i), r = Math.abs(n.x) > 1 || Math.abs(n.y) > 1 || n.z > 1 || n.z < -1, s = !1;
			if (!r) {
				let e = t.distanceTo(a), n = t.clone().sub(a).normalize();
				F.set(a, n), F.far = Math.max(e - .15, 0), s = F.intersectObjects(c, !1).length > 0;
			}
			!r && !s || l.push({
				id: e.id,
				status: e.status
			});
		}
		ge = l;
	}
	function ve(e) {
		if (!b || !o) {
			t.offscreenAlerts.length && (t.offscreenAlerts = []);
			return;
		}
		if (e - ee >= .25 && (ee = e, _e()), !ge.length) {
			t.offscreenAlerts.length && (t.offscreenAlerts = []);
			return;
		}
		let n = r.camera, i = b.clientWidth || 1, a = b.clientHeight || 1, s = [];
		for (let e of ge) {
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
	function ye(n, r) {
		M += 1, A ||= r;
		let i = r - A;
		if (i < 5) return;
		let a = M / i, o = performance.now();
		a < 30 && o - N > 15e3 && (N = o, k.onPerformanceWarning?.({
			type: "low-fps",
			fps: Math.round(a * 10) / 10,
			frameMs: Math.round(n * 1e4) / 10,
			devices: e.devices.size,
			links: e.links.size
		}), t.showParticles && !P && (P = !0, t.showParticles = !1, t.addToast("Performance mode: link-traffic particles disabled (low frame rate detected)", "warning"))), A = r, M = 0;
	}
	function be(n) {
		if (!b) return;
		if (S = {
			x: n.clientX,
			y: n.clientY
		}, m.updatePointer(n, b), t.mode === "edit" && v.isVisible) {
			let t = v.pickAxis(m.currentPointer, r.camera);
			if (t) {
				C = t, T = v.position, w = t === "y" ? de(n, T) : m.getGroundPoint(n, b);
				let i = v.currentTarget;
				if (E = [], i?.type === "space") {
					let t = T.clone();
					(e.devicesBySpace.get(i.id) ?? []).forEach((e) => {
						let n = o.getDeviceWorldPos(e.id);
						n && E.push({
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
			let e = ue(n);
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
			let e = i.deviceId ?? we(n, b, 28);
			if (e) {
				g.onMouseDown(e, n), r.controls.enabled = !1;
				return;
			}
		}
		if (t.mode === "edit" && i.linkHandleId) {
			B(), _.onMouseDown(i.linkHandleId, "linkHandle", n), r.controls.enabled = !1;
			return;
		}
		r.controls.enabled = !0;
	}
	function xe(n) {
		if (!b) return;
		if (m.updatePointer(n, b), t.mode === "edit" && C && w && T) {
			let e = C === "y" ? de(n, T) : m.getGroundPoint(n, b);
			if (e) {
				let t = e.clone().sub(w), n = T.clone();
				(C === "x" || C === "xz") && (n.x += t.x), (C === "z" || C === "xz") && (n.z += t.z), C === "y" && (n.y = Math.max(0, T.y + t.y)), v.setPosition(n);
				let r = v.currentTarget;
				r?.type === "device" ? (o.setPosition(r.id, n), c.refreshPositions((e) => o.getDeviceWorldPos(e)), se()) : r?.type === "space" ? (s.setPosition(r.id, n), E.forEach((e) => o.setPosition(e.id, n.clone().add(e.offset))), c.refreshPositions((e) => o.getDeviceWorldPos(e)), se()) : r?.type === "background" && p.setPosition(r.id, n);
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
				t.type === "device" ? o.setPosition(t.id, e) : t.type === "space" ? s.setPosition(t.id, e) : t.type === "linkHandle" && (c.updateMidpoint(t.id, e.x, e.z), se());
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
	function Se(n) {
		if (!b) return;
		if (r.controls.enabled = !0, t.mode === "edit" && C) {
			let n = v.currentTarget, r = v.position;
			B(), n?.type === "device" ? (e.mapDevice(n.id, e.getMappingByDeviceId(n.id)?.primarySpaceId ?? "", 0, {
				x: r.x,
				y: r.y,
				z: r.z
			}), e.logChange("layout.update", `Device moved: ${n.id}`), t.addToast("Device moved", "success")) : n?.type === "space" ? (e.updateSpace(n.id, { position: {
				x: r.x,
				y: r.y,
				z: r.z
			} }), E.forEach((t) => {
				let i = r.clone().add(t.offset);
				e.mapDevice(t.id, e.getMappingByDeviceId(t.id)?.primarySpaceId ?? n.id, 0, {
					x: i.x,
					y: i.y,
					z: i.z
				});
			}), e.logChange("space.update", `Space moved: ${n.id} (+${E.length} devices)`), t.addToast("Space moved", "success")) : n?.type === "background" && (e.updateBackgroundObject(n.id, { position: {
				x: r.x,
				y: r.y,
				z: r.z
			} }), e.logChange("background.update", `Background moved: ${n.id}`), t.addToast("Background moved", "success")), c.refreshPositions((e) => o.getDeviceWorldPos(e)), se(), C = null, w = null, T = null, E = [];
			return;
		}
		if (t.mode === "edit" && t.backgroundEditActive && t.selection?.type === "background" && ue(n)) return;
		m.updatePointer(n, b);
		let i = m.castClick(t.linkToolActive);
		if (t.mode === "edit" && t.linkToolActive && g.isDrawing) {
			let e = i.deviceId ?? we(n, b, 28), r = g.isDragging;
			g.onMouseUp(e ?? null, n) === "cancelled" && r && t.addToast("Release on a device to create a link", "info");
			return;
		}
		if (t.mode === "edit" && _.hasPending) {
			let i = _.onMouseUp(n, b, r.camera);
			if (i) {
				let { targetId: n, targetType: r, newPos: a } = i;
				r !== "linkHandle" && B(), r === "device" ? (e.mapDevice(n, e.getMappingByDeviceId(n)?.primarySpaceId ?? "", 0, {
					x: a.x,
					y: 0,
					z: a.z
				}), e.logChange("layout.update", `Device moved: ${n}`), t.addToast("Device moved", "success"), De()) : r === "space" ? (e.updateSpace(n, { position: {
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
		let a = n.clientX - S.x, s = n.clientY - S.y;
		Math.sqrt(a * a + s * s) > 8 || (i.deviceId ? n.ctrlKey || n.metaKey ? (t.multiSelectedDeviceIds.has(i.deviceId) ? t.multiSelectedDeviceIds.delete(i.deviceId) : (t.multiSelectedDeviceIds.add(i.deviceId), t.multiSelectedDeviceIds.size === 1 && t.select({
			type: "device",
			id: i.deviceId
		})), o.setMultiHighlight([...t.multiSelectedDeviceIds])) : (t.multiSelectedDeviceIds.clear(), o.setMultiHighlight([]), t.select({
			type: "device",
			id: i.deviceId
		})) : i.spaceId ? (t.multiSelectedDeviceIds.clear(), o.setMultiHighlight([]), t.select({
			type: "space",
			id: i.spaceId
		})) : i.linkId ? (t.multiSelectedDeviceIds.clear(), o.setMultiHighlight([]), t.select({
			type: "link",
			id: i.linkId
		})) : i.linkHandleId || (t.multiSelectedDeviceIds.clear(), o.setMultiHighlight([]), t.select(null)));
	}
	function Ce(n) {
		if (n.key === "Escape") {
			t.select(null), t.hideContextMenu(), t.multiSelectedDeviceIds.clear(), o?.setMultiHighlight([]), g.cancel(), _.cancel(), r.controls.enabled = !0, u.clear(), t.blastSourceId = null;
			return;
		}
		if (n.key === "f" || n.key === "F") {
			y.flyToOverview();
			return;
		}
		if ((n.key === "l" || n.key === "L") && !Te()) {
			t.mode === "edit" && t.toggleLinkTool();
			return;
		}
		if ((n.key === "]" || n.key === "[") && !Te()) {
			Re(n.key === "]" ? 1 : -1);
			return;
		}
		if (t.mode === "edit" && (n.key === "Delete" || n.key === "Backspace") && !Te()) {
			if (n.preventDefault(), t.multiSelectedDeviceIds.size > 1) {
				B();
				let n = [...t.multiSelectedDeviceIds];
				n.forEach((t) => {
					e.unmapDevice(t);
				}), e.logChange("device.unmap", `${n.length} devices removed`), t.addToast(`${n.length} devices removed`, "info"), t.multiSelectedDeviceIds.clear(), o.setMultiHighlight([]), t.select(null);
				return;
			}
			let r = t.selection;
			if (!r) return;
			B(), r.type === "device" ? (e.unmapDevice(r.id), e.logChange("device.unmap", `Device removed: ${r.id}`), t.addToast("Device removed", "info"), t.select(null)) : r.type === "link" ? (e.removeLink(r.id), e.logChange("topology.link.delete", `Link deleted: ${r.id}`), t.addToast("Link deleted", "info"), t.select(null)) : r.type === "space" && (e.archiveSpace(r.id), Ge(r.id), e.logChange("space.archive", `Space archived: ${r.id}`), t.addToast("Space archived", "info"), t.select(null));
			return;
		}
		if (n.ctrlKey && n.key === "z" && !Te()) {
			n.preventDefault();
			let e = I.pop();
			e ? (R.push(z()), te(e), t.addToast("Undone", "info")) : t.addToast("Nothing to undo", "info");
			return;
		}
		if (n.ctrlKey && n.key === "y" && !Te()) {
			n.preventDefault();
			let e = R.pop();
			e ? (I.push(z()), te(e), t.addToast("Redone", "info")) : t.addToast("Nothing to redo", "info");
			return;
		}
	}
	function we(t, n, i) {
		let a = n.getBoundingClientRect(), o = t.clientX - a.left, s = t.clientY - a.top, c = null, l = i * i;
		return e.mappings.forEach((e) => {
			if (!e.position || e.mappingStatus === "unmapped") return;
			let t = new L.Vector3(e.position.x, e.position.y, e.position.z);
			t.project(r.camera);
			let n = (t.x * .5 + .5) * a.width, i = (-t.y * .5 + .5) * a.height, u = n - o, d = i - s, f = u * u + d * d;
			f < l && (l = f, c = e.rawDeviceId);
		}), c;
	}
	function Te() {
		let e = document.activeElement;
		return e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement;
	}
	function Ee(n) {
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
	function De() {
		c.dispose(), c = new Zi(r.scene), ne(), c.loadLinks([...e.links.values()], (e) => o.getDeviceWorldPos(e)), [
			"physical",
			"logical",
			"service_dependency",
			"traffic_flow",
			"security_path",
			"manual",
			"inferred"
		].forEach((e) => c.setVisible(e, t.visibleLinkTypes.has(e))), se(), m = new Cc(r.camera, o, s, c), g = new wc(r.camera, c, o, (e, t, n, r) => K().showContextMenu(n, r, e, t));
	}
	function Oe(n, i) {
		if (!b) return;
		if (t.mode !== "edit") {
			t.addToast("Switch to Edit mode to place devices", "warning");
			return;
		}
		let a = b.getBoundingClientRect(), s = new L.Vector2((i.clientX - a.left) / a.width * 2 - 1, -((i.clientY - a.top) / a.height) * 2 + 1), c = new L.Raycaster();
		c.setFromCamera(s, r.camera);
		let l = new L.Plane(new L.Vector3(0, 1, 0), 0), u = new L.Vector3(), d = r.controls.target, f = u;
		(!c.ray.intersectPlane(l, u) || u.distanceTo(d) > 60) && (f = d.clone().setY(0)), B(), e.mapDevice(n, "", 0, {
			x: f.x,
			y: .4,
			z: f.z
		}), e.logChange("device.map", `Device placed: ${n}`), t.addToast("Device placed", "success"), h(() => {
			let r = e.devices.get(n), i = e.getMappingByDeviceId(n);
			if (r && i?.position) {
				o.addDevice(r, i), t.select({
					type: "device",
					id: n
				}), pe();
				let e = o.getDeviceWorldPos(n);
				e && y.flyToDevice(e);
			} else t.addToast("Failed to place device — check Edit mode", "warning");
		});
	}
	function ke(n, r, i) {
		if (t.mode !== "edit") {
			t.addToast("Switch to Edit mode to create links", "warning"), K().hideContextMenu();
			return;
		}
		B();
		let a = `link-${Date.now()}`;
		e.addLink({
			id: a,
			sourceDeviceId: n,
			targetDeviceId: r,
			type: i,
			source: "manual",
			status: "up"
		}), e.logChange("topology.link.create", `Link created: ${i}`), t.addToast(`${i} link created`, "success"), K().hideContextMenu();
	}
	function Ae(n) {
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
			createdAt: (/* @__PURE__ */ new Date()).toLocaleString()
		};
		e.addSavedView(i), t.addToast(`View saved: ${n}`, "success");
	}
	function je(e) {
		y.flyTo(new L.Vector3(e.cameraPos.x, e.cameraPos.y, e.cameraPos.z), new L.Vector3(e.cameraTarget.x, e.cameraTarget.y, e.cameraTarget.z));
	}
	function Me(t) {
		let n = e.getMappingByDeviceId(t)?.primarySpaceId;
		if (n && Be(n, {
			type: "device",
			id: t
		})) return;
		let r = o.getDeviceWorldPos(t);
		r && y.flyToDevice(r);
	}
	function Ne() {
		y.flyToOverview();
	}
	function Pe(e, t) {
		y.panToXZ(e, t);
	}
	function Fe(e, t) {
		o.setAcknowledged(e, t);
	}
	function Ie() {
		t.setColorblindMode(!t.colorblindMode), An(t.colorblindMode ? "colorblind" : "default"), o.recolorAll();
	}
	function Le() {
		let n = {
			critical: 0,
			warning: 1
		};
		return e.scopedDevices(t.activeRootSpaceId).filter((e) => e.status === "critical" || e.status === "warning").sort((e, t) => (n[e.status ?? ""] ?? 9) - (n[t.status ?? ""] ?? 9));
	}
	function Re(e) {
		let n = Le();
		if (!n.length) return;
		let r = n.findIndex((e) => e.id === t.selectedDeviceId), i = n[r === -1 ? e === 1 ? 0 : n.length - 1 : (r + e + n.length) % n.length];
		t.select({
			type: "device",
			id: i.id
		}), Me(i.id);
	}
	function ze(t) {
		if (Be(t, {
			type: "space",
			id: t
		})) return;
		let n = e.spaces.get(t);
		if (!n?.position) return;
		let r = new L.Vector3(n.position.x, n.position.y, n.position.z), i = n.size ?? {
			width: 8,
			height: 4,
			depth: 8
		};
		y.flyToSpace(r, i);
	}
	function Be(n, r) {
		let i = e.resolveLeafScope(n);
		return !i || i === t.activeRootSpaceId ? !1 : (H = r, t.activeRootSpaceId = i, !0);
	}
	function Ve(e) {
		let t = d.getNodeWorldPos(e);
		t && y.flyToDevice(t);
	}
	function He(t) {
		if (t < 0) return;
		let n = i.getFrame(t);
		n && Object.entries(n.states).forEach(([t, n]) => e.updateDeviceStatus(t, n.status, n.metrics));
	}
	async function Ue() {
		ae();
		let n = t.activeRootSpaceId;
		s.dispose(), s = new xi(r.scene), s.loadSpaces(e.scopedSpaces(n)), o.dispose(), o = new yi(r.scene), await hi(a.customTypes), o.loadInstanced(e.scopedDevices(n), e.mappings, (t) => e.getMappingByDeviceId(t)), c.dispose(), c = new Zi(r.scene), ne(), c.loadLinks(e.scopedLinks(n), (e) => o.getDeviceWorldPos(e)), [
			"physical",
			"logical",
			"service_dependency",
			"traffic_flow",
			"security_path",
			"manual",
			"inferred"
		].forEach((e) => c.setVisible(e, t.visibleLinkTypes.has(e))), se(), p.dispose(), p = new xa(r.scene), await p.loadObjects(e.scopedBackgroundObjects(n)), p.setEditMode(t.backgroundEditActive), m = new Cc(r.camera, o, s, c), g = new wc(r.camera, c, o, (e, t, n, r) => K().showContextMenu(n, r, e, t)), We();
	}
	function We() {
		let n = e.scopedBounds(t.activeRootSpaceId);
		if (!n) {
			y.flyToOverview();
			return;
		}
		let r = new L.Vector3((n.minX + n.maxX) / 2, 0, (n.minZ + n.maxZ) / 2);
		y.flyToSpace(r, {
			width: n.maxX - n.minX,
			depth: n.maxZ - n.minZ
		});
	}
	function Ge(n) {
		let r = t.activeRootSpaceId;
		if (r && !e.descendantSpaceIds(r).has(n)) return;
		let i = e.spaces.get(n);
		s.removeSpace(n), i && !i.archived && (s.addSpace(i), t.selection?.type === "space" && t.selection.id === n && s.setSelected(n, !0));
	}
	function Ke() {
		x = !1, t.offscreenAlerts = [], O.splice(0).forEach((e) => e()), b?.removeEventListener("pointerdown", be), b?.removeEventListener("pointermove", xe), b?.removeEventListener("pointerup", Se), b?.removeEventListener("contextmenu", qe), window.removeEventListener("keydown", Ce), v?.dispose(), o?.dispose(), s?.dispose(), c?.dispose(), l?.dispose(), u?.dispose(), d?.dispose(), f?.dispose(), r.dispose(), b = null, D.clear();
	}
	function qe(e) {
		e.preventDefault();
	}
	return {
		configure: V,
		init: re,
		dispose: Ke,
		dropDeviceAt: Oe,
		confirmCreateLink: ke,
		saveCurrentView: Ae,
		loadSavedView: je,
		focusDevice: Me,
		focusSpace: ze,
		focusVirtualNode: Ve,
		resetCamera: Ne,
		flyToWorldPoint: Pe,
		setDeviceAcknowledged: Fe,
		toggleColorblindMode: Ie,
		cycleAlarms: Re,
		onTimelineScrub: He,
		refreshSpace: Ge,
		rebuildAll: Ue,
		timeline: i,
		getScene: () => r
	};
}
//#endregion
//#region src/components/layout/AppMenuBar.vue?vue&type=script&setup=true&lang.ts
var Xl = ["onMouseenter", "onClick"], Zl = { class: "menu-label" }, Ql = {
	key: 0,
	class: "menu-sep"
}, $l = {
	key: 1,
	class: "menu-header"
}, eu = ["disabled", "onClick"], tu = { class: "check-cell" }, nu = { class: "item-label" }, ru = { class: "shortcut" }, iu = {
	key: 0,
	class: "status-pill on"
}, au = {
	key: 1,
	class: "status-pill off"
}, ou = /* @__PURE__ */ p({
	__name: "AppMenuBar",
	setup(t) {
		let r = K(), a = G(), o = Jt(), u = Jl(), d = S(null), p = i(() => r.wsConnected), m = [
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
		], h = [
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
		function _(e) {
			r.toggleLinkType(e);
		}
		function x() {
			o.connected.value ? (o.disconnect(), r.wsConnected = !1) : (o.connect(), r.wsConnected = !0);
		}
		let w = null, E = S(!1);
		function D() {
			if (E.value) {
				w && clearInterval(w), w = null, E.value = !1;
				return;
			}
			E.value = !0;
			let e = [
				"normal",
				"normal",
				"normal",
				"warning",
				"critical",
				"offline",
				"maintenance"
			];
			w = setInterval(() => {
				let t = [...a.devices.keys()];
				for (let n = 0; n < 3; n++) {
					let n = t[Math.floor(Math.random() * t.length)];
					a.updateDeviceStatus(n, e[Math.floor(Math.random() * e.length)]);
				}
			}, 1400);
		}
		let O = i(() => [
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
						checked: () => r.wsConnected,
						action: x
					},
					...a.hasFeature("chaosSimulator") ? [{
						label: "Random simulator",
						checked: () => E.value,
						action: D
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
					...m.map((e) => ({
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
					...h.map((e) => ({
						label: e.label,
						checked: () => r.visibleLinkTypes.has(e.type),
						action: () => _(e.type)
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
					action: () => Ul()
				}]
			}
		]);
		function k(e) {
			d.value = d.value === e ? null : e;
		}
		function A(e) {
			d.value !== null && (d.value = e);
		}
		function j(e) {
			e.disabled?.() || (e.action?.(), N());
		}
		function N() {
			d.value = null;
		}
		function ee(e) {
			e.target.closest(".menu-root") || N();
		}
		return y(() => document.addEventListener("mousedown", ee)), v(() => document.removeEventListener("mousedown", ee)), (t, r) => (b(), c("div", {
			class: "menubar",
			onKeydown: P(N, ["escape"])
		}, [
			r[1] ||= l("span", { class: "brand" }, "Topospace", -1),
			(b(!0), c(e, null, C(O.value, (t) => (b(), c("div", {
				key: t.label,
				class: g(["menu-root", { open: d.value === t.label }]),
				onMouseenter: (e) => A(t.label),
				onClick: (e) => k(t.label)
			}, [l("span", Zl, T(t.label), 1), f(n, { name: "menu-fade" }, {
				default: M(() => [d.value === t.label ? (b(), c("div", {
					key: 0,
					class: "menu-dropdown",
					onClick: r[0] ||= F(() => {}, ["stop"])
				}, [(b(!0), c(e, null, C(t.items, (t, n) => (b(), c(e, { key: n }, [t.separator ? (b(), c("div", Ql)) : t.header ? (b(), c("div", $l, T(t.label), 1)) : (b(), c("button", {
					key: 2,
					class: g(["menu-item", {
						checked: t.checked?.(),
						disabled: t.disabled?.()
					}]),
					disabled: t.disabled?.(),
					onClick: F((e) => j(t), ["stop"])
				}, [
					l("span", tu, T(t.checked?.() ? "✓" : ""), 1),
					l("span", nu, T(t.label), 1),
					l("span", ru, T(t.shortcut ?? ""), 1)
				], 10, eu))], 64))), 128))])) : s("", !0)]),
				_: 2
			}, 1024)], 42, Xl))), 128)),
			r[2] ||= l("div", { class: "spacer" }, null, -1),
			p.value ? (b(), c("span", iu, "Live")) : (b(), c("span", au, "Offline"))
		], 32));
	}
}), $ = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, su = /* @__PURE__ */ $(ou, [["__scopeId", "data-v-44ad3ecb"]]), cu = { class: "toolbar" }, lu = { class: "search-wrap" }, uu = {
	key: 0,
	class: "type-dropdown"
}, du = ["checked", "onChange"], fu = {
	class: "alerts-only",
	title: "Show only devices that aren't normal — everything else dims"
}, pu = ["title"], mu = {
	key: 0,
	class: "chip-total"
}, hu = ["title"], gu = {
	key: 0,
	class: "chip-total"
}, _u = { class: "chip total" }, vu = { class: "mode-switch" }, yu = ["disabled"], bu = ["disabled"], xu = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "TopToolbar",
	setup(t) {
		let n = G(), r = K(), { resetCamera: a } = Jl(), o = i({
			get: () => r.filter.status[0] ?? "",
			set: (e) => r.setFilter({ status: e ? [e] : [] })
		}), f = Object.keys(Pn), p = S(!1), m = S(null);
		function h(e) {
			let t = r.filter.type.includes(e) ? r.filter.type.filter((t) => t !== e) : [...r.filter.type, e];
			r.setFilter({ type: t });
		}
		function _(e) {
			p.value && !m.value?.contains(e.target) && (p.value = !1);
		}
		y(() => document.addEventListener("mousedown", _)), v(() => document.removeEventListener("mousedown", _));
		let x = i(() => n.scopedCriticalCount(r.activeRootSpaceId)), w = i(() => n.scopedWarningCount(r.activeRootSpaceId)), O = i(() => r.activeRootSpaceId !== null && (x.value !== n.criticalCount || w.value !== n.warningCount)), j = i(() => r.activeRootSpaceId ? "Count for the current floor/site" : "Count across all devices");
		function M() {
			if (r.showBackgroundPanel) {
				r.showBackgroundPanel = !1;
				return;
			}
			r.closeLeftDock(), r.showBackgroundPanel = !0;
		}
		return (t, i) => (b(), c("header", cu, [
			l("div", lu, [N(l("input", {
				"onUpdate:modelValue": i[0] ||= (e) => E(r).filter.search = e,
				placeholder: "Search name / IP",
				class: "search",
				onKeydown: i[1] ||= P((e) => E(r).resetFilter(), ["escape"])
			}, null, 544), [[A, E(r).filter.search]]), E(r).filter.search ? (b(), c("span", {
				key: 0,
				class: "clr",
				onClick: i[2] ||= (e) => E(r).filter.search = ""
			}, "Clear")) : s("", !0)]),
			N(l("select", {
				"onUpdate:modelValue": i[3] ||= (e) => o.value = e,
				class: "sel"
			}, [...i[12] ||= [u("<option value=\"\" data-v-f40c872f>All status</option><option value=\"critical\" data-v-f40c872f>Critical</option><option value=\"warning\" data-v-f40c872f>Warning</option><option value=\"normal\" data-v-f40c872f>Normal</option><option value=\"offline\" data-v-f40c872f>Offline</option><option value=\"maintenance\" data-v-f40c872f>Maintenance</option>", 6)]], 512), [[k, o.value]]),
			l("div", {
				class: "type-filter",
				ref_key: "typeFilterEl",
				ref: m
			}, [l("button", {
				class: g(["btn", { "btn-on": E(r).filter.type.length > 0 }]),
				onClick: i[4] ||= (e) => p.value = !p.value
			}, " Type" + T(E(r).filter.type.length ? ` (${E(r).filter.type.length})` : ""), 3), p.value ? (b(), c("div", uu, [(b(!0), c(e, null, C(E(f), (e) => (b(), c("label", {
				key: e,
				class: "type-opt"
			}, [l("input", {
				type: "checkbox",
				checked: E(r).filter.type.includes(e),
				onChange: (t) => h(e)
			}, null, 40, du), d(" " + T(E(Pn)[e]), 1)]))), 128)), E(r).filter.type.length ? (b(), c("button", {
				key: 0,
				class: "type-clear",
				onClick: i[5] ||= (e) => E(r).setFilter({ type: [] })
			}, " Clear ")) : s("", !0)])) : s("", !0)], 512),
			l("label", fu, [N(l("input", {
				type: "checkbox",
				"onUpdate:modelValue": i[6] ||= (e) => E(r).alertsOnly = e
			}, null, 512), [[D, E(r).alertsOnly]]), i[13] ||= d(" 🔔 Alerts only ", -1)]),
			l("div", {
				class: "chip critical",
				title: j.value
			}, [
				i[14] ||= d(" Critical ", -1),
				l("b", null, T(x.value), 1),
				O.value ? (b(), c("span", mu, " (" + T(E(n).criticalCount) + " total)", 1)) : s("", !0)
			], 8, pu),
			l("div", {
				class: "chip warning",
				title: j.value
			}, [
				i[15] ||= d(" Warning ", -1),
				l("b", null, T(w.value), 1),
				O.value ? (b(), c("span", gu, " (" + T(E(n).warningCount) + " total)", 1)) : s("", !0)
			], 8, hu),
			l("div", _u, [i[16] ||= d(" Total ", -1), l("b", null, T(E(n).devices.size), 1)]),
			i[17] ||= l("div", { class: "spacer" }, null, -1),
			l("div", vu, [l("button", {
				class: g(["mode-btn", E(r).mode === "view" ? "active" : ""]),
				onClick: i[7] ||= (e) => E(r).setMode("view")
			}, " View ", 2), l("button", {
				class: g(["mode-btn", E(r).mode === "edit" ? "active" : ""]),
				onClick: i[8] ||= (e) => E(r).setMode("edit")
			}, " Edit ", 2)]),
			l("button", {
				class: g(["btn", E(r).linkToolActive ? "btn-accent-on" : "btn-accent"]),
				disabled: E(r).mode !== "edit",
				onClick: i[9] ||= (e) => E(r).toggleLinkTool(),
				title: "Connect devices (L)"
			}, " Connect ", 10, yu),
			l("button", {
				class: g(["btn", E(r).showBackgroundPanel ? "btn-on" : ""]),
				disabled: E(r).mode !== "edit",
				onClick: M,
				title: "Place a floor-plan image or building model"
			}, " Background ", 10, bu),
			l("button", {
				class: "btn",
				title: "Reset view (F)",
				onClick: i[10] ||= (...e) => E(a) && E(a)(...e)
			}, " ⌂ Home "),
			l("button", {
				class: g(["btn", E(r).showHelp ? "btn-on" : ""]),
				onClick: i[11] ||= (e) => E(r).showHelp = !E(r).showHelp
			}, " Help ", 2)
		]));
	}
}), [["__scopeId", "data-v-f40c872f"]]), Su = { class: "alert-panel" }, Cu = { class: "ap-head" }, wu = {
	key: 0,
	class: "ap-empty"
}, Tu = ["onClick"], Eu = { class: "ap-group-name" }, Du = { class: "ap-group-badges" }, Ou = {
	key: 0,
	class: "badge critical"
}, ku = {
	key: 1,
	class: "badge warning"
}, Au = {
	key: 2,
	class: "badge offline"
}, ju = { class: "ap-device-list" }, Mu = ["onClick"], Nu = { class: "ap-dev-name" }, Pu = ["title"], Fu = /* @__PURE__ */ $(/* @__PURE__ */ p({
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
		}, a = K(), o = G(), { focusDevice: u, focusSpace: d } = Jl(), f = i(() => {
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
		}), p = i(() => f.value.reduce((e, t) => e + t.devices.length, 0)), m = i(() => f.value.some((e) => e.criticalCount) ? "critical" : f.value.some((e) => e.warningCount) ? "warning" : f.value.some((e) => e.offlineCount) ? "offline" : "");
		function h(e) {
			return o.getMappingByDeviceId(e)?.operatorState?.assignedTo;
		}
		function _(e) {
			a.select({
				type: "device",
				id: e
			}), u(e);
		}
		function v(e) {
			e.spaceId !== "__ungrouped__" && (a.select({
				type: "space",
				id: e.spaceId
			}), d(e.spaceId));
		}
		return (t, n) => (b(), c("aside", Su, [
			l("div", Cu, [
				n[1] ||= l("span", { class: "ap-title" }, "Alerts", -1),
				l("span", { class: g(["ap-count", m.value]) }, T(p.value), 3),
				l("button", {
					class: "ap-close",
					onClick: n[0] ||= (e) => E(a).closeLeftDock(),
					title: "Close"
				}, " ✕ ")
			]),
			f.value.length ? s("", !0) : (b(), c("div", wu, "No active alerts")),
			(b(!0), c(e, null, C(f.value, (t) => (b(), c("div", {
				key: t.spaceId,
				class: "ap-group"
			}, [l("button", {
				class: "ap-group-header",
				onClick: (e) => v(t)
			}, [l("span", Eu, T(t.spaceName), 1), l("span", Du, [
				t.criticalCount ? (b(), c("span", Ou, T(t.criticalCount), 1)) : s("", !0),
				t.warningCount ? (b(), c("span", ku, T(t.warningCount), 1)) : s("", !0),
				t.offlineCount ? (b(), c("span", Au, T(t.offlineCount), 1)) : s("", !0)
			])], 8, Tu), l("div", ju, [(b(!0), c(e, null, C(t.devices, (e) => (b(), c("button", {
				key: e.id,
				class: g(["ap-device", { selected: E(a).selectedDeviceId === e.id }]),
				onClick: (t) => _(e.id)
			}, [
				l("span", { class: g(["ap-dot", e.status]) }, null, 2),
				l("span", Nu, T(e.hostname ?? e.ip ?? e.id), 1),
				h(e.id) ? (b(), c("span", {
					key: 0,
					class: "ap-assignee",
					title: `Assigned to ${h(e.id)}`
				}, "👤 " + T(h(e.id)), 9, Pu)) : s("", !0),
				l("span", { class: g(["ap-status-label", e.status]) }, T(E(Fn)[e.status ?? "unknown"]), 3)
			], 10, Mu))), 128))])]))), 128))
		]));
	}
}), [["__scopeId", "data-v-8e682618"]]), Iu = { class: "ct-panel" }, Lu = { class: "ct-head" }, Ru = {
	key: 0,
	class: "ct-mode-notice"
}, zu = { class: "ct-list" }, Bu = { class: "ct-name" }, Vu = {
	key: 0,
	class: "ct-override-tag"
}, Hu = ["onClick"], Uu = ["onClick"], Wu = { class: "ct-section-label ct-section-label--new" }, Gu = {
	key: 1,
	class: "ct-empty-sm"
}, Ku = { class: "ct-list" }, qu = { class: "ct-name" }, Ju = { class: "ct-shape-tag" }, Yu = ["onClick"], Xu = ["onClick"], Zu = {
	key: 0,
	class: "ct-form"
}, Qu = { class: "ct-form-title" }, $u = { class: "ct-label" }, ed = { class: "ct-label" }, td = { class: "ct-label" }, nd = { class: "ct-swatches" }, rd = ["onClick"], id = { class: "ct-label" }, ad = { class: "ct-radios" }, od = ["value"], sd = { class: "ct-label" }, cd = { class: "ct-val" }, ld = { class: "ct-label" }, ud = { class: "ct-val" }, dd = {
	key: 1,
	class: "ct-label"
}, fd = { class: "ct-val" }, pd = { class: "ct-label" }, md = { class: "ct-model-row" }, hd = {
	key: 0,
	class: "ct-model-name pending"
}, gd = {
	key: 1,
	class: "ct-model-name stored"
}, _d = {
	key: 2,
	class: "ct-model-hint"
}, vd = {
	key: 0,
	class: "ct-model-error"
}, yd = {
	key: 1,
	class: "ct-model-hint"
}, bd = { class: "ct-form-btns" }, xd = ["disabled"], Sd = ["disabled"], Cd = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "CustomTypePanel",
	emits: ["types-changed"],
	setup(t, { emit: r }) {
		let a = K(), o = Mc(), { rebuildAll: u } = Jl(), p = r, m = [
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
			return o.customTypes.get(e)?.color ?? jn[e] ?? "#6b7280";
		}
		function k(e) {
			return o.customTypes.get(e)?.abbr ?? Nn[e] ?? e.slice(0, 4).toUpperCase();
		}
		let j = S(!1), P = S(!0), F = S("custom"), ee = S(!1), I = S({
			id: "",
			label: "",
			abbr: "",
			color: m[0],
			shape: "box",
			w: .6,
			h: .1,
			d: .4
		}), L = S(null), R = S(null), z = S(""), B = S(""), te = S(!1);
		function V() {
			R.value = null, z.value = "", B.value = "", te.value = !1, L.value && (L.value.value = "");
		}
		function ne() {
			a.mode === "edit" && (F.value = "custom", P.value = !0, I.value = {
				id: `ct-${Date.now()}`,
				label: "",
				abbr: "",
				color: m[0],
				shape: "box",
				w: .6,
				h: .1,
				d: .4
			}, V(), j.value = !0);
		}
		function re(e) {
			a.mode === "edit" && (F.value = "custom", P.value = !1, I.value = { ...e }, V(), j.value = !0);
		}
		function ie(e) {
			if (a.mode !== "edit") return;
			F.value = "override", P.value = !1;
			let t = o.customTypes.get(e.id);
			I.value = t ? { ...t } : { ...e }, V(), j.value = !0;
		}
		function ae() {
			V(), j.value = !1;
		}
		function H() {
			P.value && (I.value.abbr = I.value.label.slice(0, 4).toUpperCase().replace(/\s+/g, ""));
		}
		function oe(e) {
			let t = e.target.files?.[0];
			if (!t) return;
			if (t.size > 10 * 1024 * 1024) {
				B.value = `File too large (${(t.size / 1024 / 1024).toFixed(1)} MB — max 10 MB)`;
				return;
			}
			B.value = "", te.value = !0;
			let n = new FileReader();
			n.onload = (e) => {
				R.value = e.target?.result, z.value = t.name, te.value = !1;
			}, n.onerror = () => {
				B.value = "Failed to read file", te.value = !1;
			}, n.readAsArrayBuffer(t);
		}
		function se() {
			I.value.hasModel = !1, V();
		}
		async function ce() {
			if (!(F.value === "custom" && (!I.value.label.trim() || !I.value.abbr.trim()))) {
				ee.value = !0;
				try {
					R.value ? (await Yn(I.value.id, R.value), I.value.hasModel = !0) : I.value.hasModel || await Zn(I.value.id).catch(() => {}), o.upsert({ ...I.value }), Bn(o.customTypes), pi(o.customTypes), I.value.hasModel && await hi(o.customTypes), j.value = !1, V(), await u(), p("types-changed");
				} finally {
					ee.value = !1;
				}
			}
		}
		async function le(e) {
			confirm("Remove this custom type?") && (o.remove(e), await Zn(e).catch(() => {}), Bn(o.customTypes), pi(o.customTypes), await u(), p("types-changed"));
		}
		async function ue(e) {
			confirm("Reset to default shape?") && (o.remove(e), await Zn(e).catch(() => {}), Bn(o.customTypes), pi(o.customTypes), await u(), p("types-changed"));
		}
		return (t, r) => (b(), c("aside", Iu, [
			l("div", Lu, [r[8] ||= l("span", { class: "ct-title" }, "Device Types", -1), l("button", {
				class: "ct-close",
				onClick: r[0] ||= (e) => E(a).closeLeftDock(),
				title: "Close"
			}, " ✕ ")]),
			E(a).mode === "edit" ? s("", !0) : (b(), c("div", Ru, " Switch to Edit mode to customize types. ")),
			r[18] ||= l("div", { class: "ct-section-label" }, "Built-in Types", -1),
			r[19] ||= l("div", { class: "ct-section-hint" }, " Override the shape or model for all devices of a type. ", -1),
			l("div", zu, [(b(), c(e, null, C(v, (t) => l("div", {
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
				l("span", Bu, T(t.label), 1),
				w(t.id) ? (b(), c("span", Vu, "custom")) : s("", !0),
				E(a).mode === "edit" ? (b(), c(e, { key: 1 }, [l("button", {
					class: "ct-btn",
					onClick: (e) => ie(t)
				}, T(w(t.id) ? "Edit" : "Override"), 9, Hu), w(t.id) ? (b(), c("button", {
					key: 0,
					class: "ct-btn del",
					onClick: (e) => ue(t.id)
				}, " Reset ", 8, Uu)) : s("", !0)], 64)) : s("", !0)
			])), 64))]),
			l("div", Wu, [r[9] ||= d(" New Types ", -1), E(a).mode === "edit" ? (b(), c("button", {
				key: 0,
				class: "ct-add-inline",
				onClick: ne
			}, " + Add ")) : s("", !0)]),
			r[20] ||= l("div", { class: "ct-section-hint" }, " New types appear in the device's \"Visual Shape\" selector. ", -1),
			x.value.length ? s("", !0) : (b(), c("div", Gu, "No custom types yet")),
			l("div", Ku, [(b(!0), c(e, null, C(x.value, (t) => (b(), c("div", {
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
				l("span", qu, T(t.label), 1),
				l("span", Ju, T(t.hasModel ? "3D" : t.shape), 1),
				E(a).mode === "edit" ? (b(), c(e, { key: 0 }, [l("button", {
					class: "ct-btn",
					onClick: (e) => re(t)
				}, "Edit", 8, Yu), l("button", {
					class: "ct-btn del",
					onClick: (e) => le(t.id)
				}, "Del", 8, Xu)], 64)) : s("", !0)
			]))), 128))]),
			f(n, { name: "ct-slide" }, {
				default: M(() => [j.value ? (b(), c("div", Zu, [
					l("div", Qu, T(F.value === "override" ? `Override: ${I.value.label}` : P.value ? "New Type" : "Edit Type"), 1),
					F.value === "override" ? s("", !0) : (b(), c(e, { key: 0 }, [l("label", $u, [r[10] ||= d("Name ", -1), N(l("input", {
						"onUpdate:modelValue": r[1] ||= (e) => I.value.label = e,
						class: "ct-input",
						onInput: H,
						placeholder: "Core Router"
					}, null, 544), [[A, I.value.label]])]), l("label", ed, [r[11] ||= d("Abbr (≤4) ", -1), N(l("input", {
						"onUpdate:modelValue": r[2] ||= (e) => I.value.abbr = e,
						class: "ct-input ct-input-sm",
						maxlength: "4",
						placeholder: "CR"
					}, null, 512), [[A, I.value.abbr]])])], 64)),
					l("div", td, [r[12] ||= d(" Color ", -1), l("div", nd, [(b(), c(e, null, C(m, (e) => l("button", {
						key: e,
						class: g(["ct-swatch", { active: I.value.color === e }]),
						style: _({ background: e }),
						onClick: (t) => I.value.color = e
					}, null, 14, rd)), 64))])]),
					l("div", id, [r[13] ||= d(" Shape ", -1), l("div", ad, [(b(), c(e, null, C(h, (e) => l("label", {
						key: e,
						class: "ct-radio"
					}, [N(l("input", {
						type: "radio",
						value: e,
						"onUpdate:modelValue": r[3] ||= (e) => I.value.shape = e
					}, null, 8, od), [[O, I.value.shape]]), d(" " + T(e), 1)])), 64))])]),
					l("label", sd, [
						r[14] ||= d("Width ", -1),
						l("span", cd, T(I.value.w.toFixed(1)), 1),
						N(l("input", {
							type: "range",
							min: "0.3",
							max: "2.0",
							step: "0.1",
							"onUpdate:modelValue": r[4] ||= (e) => I.value.w = e,
							class: "ct-slider"
						}, null, 512), [[
							A,
							I.value.w,
							void 0,
							{ number: !0 }
						]])
					]),
					l("label", ld, [
						r[15] ||= d("Height ", -1),
						l("span", ud, T(I.value.h.toFixed(2)), 1),
						N(l("input", {
							type: "range",
							min: "0.05",
							max: "2.0",
							step: "0.05",
							"onUpdate:modelValue": r[5] ||= (e) => I.value.h = e,
							class: "ct-slider"
						}, null, 512), [[
							A,
							I.value.h,
							void 0,
							{ number: !0 }
						]])
					]),
					I.value.shape === "box" ? (b(), c("label", dd, [
						r[16] ||= d("Depth ", -1),
						l("span", fd, T(I.value.d.toFixed(1)), 1),
						N(l("input", {
							type: "range",
							min: "0.3",
							max: "2.0",
							step: "0.1",
							"onUpdate:modelValue": r[6] ||= (e) => I.value.d = e,
							class: "ct-slider"
						}, null, 512), [[
							A,
							I.value.d,
							void 0,
							{ number: !0 }
						]])
					])) : s("", !0),
					l("div", pd, [
						r[17] ||= d(" 3D Model (.glb / .gltf) ", -1),
						l("div", md, [
							z.value ? (b(), c("span", hd, T(z.value), 1)) : I.value.hasModel ? (b(), c("span", gd, "Model stored")) : (b(), c("span", _d, "Using geometric shape above")),
							l("input", {
								ref_key: "fileInputEl",
								ref: L,
								type: "file",
								accept: ".glb,.gltf",
								style: { display: "none" },
								onChange: oe
							}, null, 544),
							l("button", {
								class: "ct-model-btn",
								onClick: r[7] ||= (e) => L.value?.click()
							}, T(I.value.hasModel || z.value ? "Replace" : "Import"), 1),
							I.value.hasModel || z.value ? (b(), c("button", {
								key: 3,
								class: "ct-model-btn ct-model-rm",
								onClick: se
							}, " Remove ")) : s("", !0)
						]),
						B.value ? (b(), c("div", vd, T(B.value), 1)) : s("", !0),
						te.value ? (b(), c("div", yd, "Loading model…")) : s("", !0)
					]),
					l("div", bd, [l("button", {
						class: "ct-save",
						disabled: ee.value,
						onClick: ce
					}, T(ee.value ? "Saving…" : "Save"), 9, xd), l("button", {
						class: "ct-cancel",
						disabled: ee.value,
						onClick: ae
					}, " Cancel ", 8, Sd)])
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-8f8e053e"]]), wd = { class: "bg-panel" }, Td = { class: "bg-head" }, Ed = {
	key: 0,
	class: "bg-mode-notice"
}, Dd = { class: "bg-toggle-row" }, Od = ["checked"], kd = { class: "bg-toggle-hint" }, Ad = {
	key: 0,
	class: "bg-empty-sm"
}, jd = { class: "bg-list" }, Md = { class: "bg-kind-tag" }, Nd = ["onClick"], Pd = ["onClick"], Fd = ["onClick"], Id = {
	key: 1,
	class: "bg-form"
}, Ld = { class: "bg-form-title" }, Rd = { class: "bg-grid3" }, zd = { class: "bg-label" }, Bd = { class: "bg-label" }, Vd = { class: "bg-label" }, Hd = { class: "bg-label" }, Ud = {
	key: 0,
	class: "bg-label"
}, Wd = {
	key: 1,
	class: "bg-grid2"
}, Gd = { class: "bg-label" }, Kd = { class: "bg-label" }, qd = { class: "bg-label" }, Jd = { class: "bg-val" }, Yd = {
	key: 0,
	class: "bg-form"
}, Xd = { class: "bg-label" }, Zd = { class: "bg-label" }, Qd = { class: "bg-file-row" }, $d = {
	key: 0,
	class: "bg-file-name"
}, ef = {
	key: 1,
	class: "bg-file-hint"
}, tf = {
	key: 0,
	class: "bg-file-error"
}, nf = { class: "bg-form-btns" }, rf = ["disabled"], af = ["disabled"], of = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "BackgroundPanel",
	setup(t) {
		let r = K(), a = G(), { rebuildAll: o } = Jl(), u = i(() => a.scopedBackgroundObjects(r.activeRootSpaceId)), p = S(!1), m = S(""), h = S(null), _ = S(null), v = S(""), y = S("image"), x = S(""), w = S(!1), D = i(() => m.value.trim() && _.value);
		function O() {
			p.value = !0, m.value = "", _.value = null, v.value = "", x.value = "", I.value = null;
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
					await ga(t, _.value);
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
		async function ee(e) {
			confirm("Remove this background object?") && (a.removeBackgroundObject(e), await va(e).catch(() => {}), I.value === e && (I.value = null), a.logChange("background.delete", `Background removed: ${e}`), await o());
		}
		let I = S(null), L = i(() => I.value ? a.backgroundObjects.get(I.value) ?? null : null), R = S(0), z = S(0), B = S(0), te = S(0), V = S(1), ne = S(10), re = S(10), ie = S(.3);
		j(L, (e) => {
			e && (R.value = e.position.x, z.value = e.position.y, B.value = e.position.z, te.value = e.rotationY ?? 0, V.value = e.scale ?? 1, ne.value = e.width ?? 10, re.value = e.depth ?? 10, ie.value = e.opacity ?? .3);
		}, { immediate: !0 });
		function ae(e) {
			I.value = I.value === e.id ? null : e.id, p.value = !1, I.value && r.backgroundEditActive && r.select({
				type: "background",
				id: e.id
			});
		}
		async function H(e, t) {
			I.value && (a.updateBackgroundObject(I.value, { [e]: t }), await o());
		}
		async function oe() {
			I.value && (a.updateBackgroundObject(I.value, { position: {
				x: R.value,
				y: z.value,
				z: B.value
			} }), await o());
		}
		return (t, i) => (b(), c("aside", wd, [l("div", Td, [i[17] ||= l("span", { class: "bg-title" }, "Background", -1), l("button", {
			class: "bg-close",
			onClick: i[0] ||= (e) => E(r).closeLeftDock(),
			title: "Close"
		}, " ✕ ")]), E(r).mode === "edit" ? (b(), c(e, { key: 1 }, [
			l("label", Dd, [
				l("input", {
					type: "checkbox",
					checked: E(r).backgroundEditActive,
					onChange: i[1] ||= (e) => E(r).toggleBackgroundEdit()
				}, null, 40, Od),
				i[18] ||= l("span", null, "Edit positions", -1),
				l("span", kd, T(E(r).backgroundEditActive ? "Click a background object in the scene to move it" : "Backgrounds are dimmed and click-through"), 1)
			]),
			l("div", { class: "bg-section-label" }, [i[19] ||= d(" This floor ", -1), l("button", {
				class: "bg-add-inline",
				onClick: O
			}, "+ Add")]),
			u.value.length ? s("", !0) : (b(), c("div", Ad, " No background objects yet ")),
			l("div", jd, [(b(!0), c(e, null, C(u.value, (e) => (b(), c("div", {
				key: e.id,
				class: g(["bg-row", { active: I.value === e.id }])
			}, [
				l("span", Md, T(e.kind === "image" ? "IMG" : "3D"), 1),
				l("span", {
					class: "bg-name",
					onClick: (t) => ae(e)
				}, T(e.name), 9, Nd),
				l("button", {
					class: "bg-btn",
					onClick: (t) => ae(e)
				}, T(I.value === e.id ? "Close" : "Edit"), 9, Pd),
				l("button", {
					class: "bg-btn del",
					onClick: (t) => ee(e.id)
				}, "Del", 8, Fd)
			], 2))), 128))]),
			L.value ? (b(), c("div", Id, [
				l("div", Ld, T(L.value.name), 1),
				l("div", Rd, [
					l("label", zd, [i[20] ||= d("X ", -1), N(l("input", {
						type: "number",
						step: "0.5",
						"onUpdate:modelValue": i[2] ||= (e) => R.value = e,
						class: "bg-input",
						onChange: oe
					}, null, 544), [[
						A,
						R.value,
						void 0,
						{ number: !0 }
					]])]),
					l("label", Bd, [i[21] ||= d("Y ", -1), N(l("input", {
						type: "number",
						step: "0.1",
						"onUpdate:modelValue": i[3] ||= (e) => z.value = e,
						class: "bg-input",
						onChange: oe
					}, null, 544), [[
						A,
						z.value,
						void 0,
						{ number: !0 }
					]])]),
					l("label", Vd, [i[22] ||= d("Z ", -1), N(l("input", {
						type: "number",
						step: "0.5",
						"onUpdate:modelValue": i[4] ||= (e) => B.value = e,
						class: "bg-input",
						onChange: oe
					}, null, 544), [[
						A,
						B.value,
						void 0,
						{ number: !0 }
					]])])
				]),
				l("label", Hd, [i[23] ||= d("Rotation Y (°) ", -1), N(l("input", {
					type: "number",
					step: "5",
					"onUpdate:modelValue": i[5] ||= (e) => te.value = e,
					class: "bg-input",
					onChange: i[6] ||= (e) => H("rotationY", te.value)
				}, null, 544), [[
					A,
					te.value,
					void 0,
					{ number: !0 }
				]])]),
				L.value.kind === "model" ? (b(), c("label", Ud, [i[24] ||= d("Scale ", -1), N(l("input", {
					type: "number",
					step: "0.1",
					min: "0.01",
					"onUpdate:modelValue": i[7] ||= (e) => V.value = e,
					class: "bg-input",
					onChange: i[8] ||= (e) => H("scale", V.value)
				}, null, 544), [[
					A,
					V.value,
					void 0,
					{ number: !0 }
				]])])) : (b(), c("div", Wd, [l("label", Gd, [i[25] ||= d("Width ", -1), N(l("input", {
					type: "number",
					step: "0.5",
					min: "0.1",
					"onUpdate:modelValue": i[9] ||= (e) => ne.value = e,
					class: "bg-input",
					onChange: i[10] ||= (e) => H("width", ne.value)
				}, null, 544), [[
					A,
					ne.value,
					void 0,
					{ number: !0 }
				]])]), l("label", Kd, [i[26] ||= d("Depth ", -1), N(l("input", {
					type: "number",
					step: "0.5",
					min: "0.1",
					"onUpdate:modelValue": i[11] ||= (e) => re.value = e,
					class: "bg-input",
					onChange: i[12] ||= (e) => H("depth", re.value)
				}, null, 544), [[
					A,
					re.value,
					void 0,
					{ number: !0 }
				]])])])),
				l("label", qd, [
					i[27] ||= d("Opacity (dashboard view) ", -1),
					l("span", Jd, T(ie.value.toFixed(2)), 1),
					N(l("input", {
						type: "range",
						min: "0.05",
						max: "0.9",
						step: "0.05",
						"onUpdate:modelValue": i[13] ||= (e) => ie.value = e,
						class: "bg-slider",
						onChange: i[14] ||= (e) => H("opacity", ie.value)
					}, null, 544), [[
						A,
						ie.value,
						void 0,
						{ number: !0 }
					]])
				])
			])) : s("", !0),
			f(n, { name: "bg-slide" }, {
				default: M(() => [p.value ? (b(), c("div", Yd, [
					i[30] ||= l("div", { class: "bg-form-title" }, "New Background", -1),
					l("label", Xd, [i[28] ||= d("Name ", -1), N(l("input", {
						"onUpdate:modelValue": i[15] ||= (e) => m.value = e,
						class: "bg-input",
						placeholder: "1F floor plan"
					}, null, 512), [[A, m.value]])]),
					l("label", Zd, [
						i[29] ||= d("File (image or .glb/.gltf) ", -1),
						l("input", {
							ref_key: "fileInputEl",
							ref: h,
							type: "file",
							accept: "image/*,.glb,.gltf",
							style: { display: "none" },
							onChange: P
						}, null, 544),
						l("div", Qd, [v.value ? (b(), c("span", $d, T(v.value), 1)) : (b(), c("span", ef, "No file chosen")), l("button", {
							class: "bg-model-btn",
							onClick: i[16] ||= (e) => h.value?.click()
						}, " Choose ")]),
						x.value ? (b(), c("div", tf, T(x.value), 1)) : s("", !0)
					]),
					l("div", nf, [l("button", {
						class: "bg-save",
						disabled: !D.value || w.value,
						onClick: F
					}, T(w.value ? "Adding…" : "Add"), 9, rf), l("button", {
						class: "bg-cancel",
						disabled: w.value,
						onClick: k
					}, " Cancel ", 8, af)])
				])) : s("", !0)]),
				_: 1
			})
		], 64)) : (b(), c("div", Ed, " Switch to Edit mode to manage backgrounds. "))]));
	}
}), [["__scopeId", "data-v-b1c621a3"]]);
//#endregion
//#region src/composables/useDeviceTypeHelpers.ts
function sf() {
	let e = Mc();
	function t(t) {
		let n = t ?? "unknown";
		return e.customTypes.get(n)?.color ?? jn[n] ?? "#6b7280";
	}
	function n(t) {
		let n = t ?? "unknown";
		return e.customTypes.get(n)?.abbr ?? Nn[n] ?? n.slice(0, 4).toUpperCase();
	}
	function r(t) {
		let n = t ?? "unknown";
		return e.customTypes.get(n)?.label ?? Pn[n] ?? n;
	}
	return {
		typeColor: t,
		typeAbbr: n,
		typeLabel: r,
		allTypes: i(() => {
			let t = Object.keys(Pn).map((e) => ({
				id: e,
				label: Pn[e],
				color: jn[e],
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
var cf = {
	key: 0,
	class: "panel"
}, lf = { class: "panel-head" }, uf = { class: "rack-name" }, df = { class: "summary" }, ff = { class: "chip c" }, pf = { class: "chip w" }, mf = { class: "chip n" }, hf = { class: "server-list" }, gf = ["onClick", "onMouseenter"], _f = { class: "srv-info" }, vf = { class: "srv-name" }, yf = { class: "srv-ip" }, bf = {
	key: 0,
	class: "srv-metrics"
}, xf = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "RackServerListPanel",
	setup(t) {
		let n = G(), r = K(), { typeColor: a, typeAbbr: o } = sf(), u = i(() => r.selectedRackForList ? n.spaces.get(r.selectedRackForList) ?? null : null), d = i(() => r.selectedRackForList ? n.devicesBySpace.get(r.selectedRackForList) ?? [] : []), f = i(() => [...d.value].sort((e, t) => {
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
		return (t, n) => u.value ? (b(), c("aside", cf, [
			l("div", lf, [
				l("span", uf, T(u.value.name), 1),
				l("div", df, [
					l("span", ff, "C " + T(p.value), 1),
					l("span", pf, "W " + T(m.value), 1),
					l("span", mf, "N " + T(h.value), 1)
				]),
				l("button", {
					class: "close-btn",
					onClick: y,
					title: "Close"
				}, "✕")
			]),
			n[1] ||= l("div", { class: "hint" }, " Click a device to open details · hover to highlight in 3D. ", -1),
			l("div", hf, [(b(!0), c(e, null, C(f.value, (e) => (b(), c("div", {
				key: e.id,
				class: g(["srv-row", [e.status, { active: E(r).selectedDeviceId === e.id }]]),
				onClick: (t) => v(e.id),
				onMouseenter: (t) => E(r).hoveredId = e.id,
				onMouseleave: n[0] ||= (e) => E(r).hoveredId = null
			}, [
				l("span", {
					class: "dot",
					style: _({ background: E(On)[e.status ?? "unknown"] })
				}, null, 4),
				l("span", {
					class: "type-tag",
					style: _({
						color: E(a)(e.normalizedType),
						borderColor: E(a)(e.normalizedType)
					})
				}, T(E(o)(e.normalizedType)), 5),
				l("div", _f, [l("div", vf, T(e.hostname ?? e.id), 1), l("div", yf, T(e.ip ?? "—"), 1)]),
				e.metrics ? (b(), c("div", bf, [l("span", { class: g({ hot: (e.metrics.cpu ?? 0) > 85 }) }, "C" + T((e.metrics.cpu ?? 0).toFixed(0)) + "%", 3), l("span", { class: g({ hot: (e.metrics.memory ?? 0) > 85 }) }, "M" + T((e.metrics.memory ?? 0).toFixed(0)) + "%", 3)])) : s("", !0)
			], 42, gf))), 128))])
		])) : s("", !0);
	}
}), [["__scopeId", "data-v-daf1a1f4"]]), Sf = {
	key: 1,
	class: "arrow-spacer"
}, Cf = { class: "kind-tag" }, wf = { class: "node-name" }, Tf = {
	key: 3,
	class: "dev-count"
}, Ef = /* @__PURE__ */ $(/* @__PURE__ */ p({
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
		let n = t, r = G(), a = K(), u = {
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
				}, T(p.value ? "▾" : "▸"), 1)) : (b(), c("span", Sf)),
				l("span", Cf, T(m.value), 1),
				l("span", wf, T(t.space.name), 1),
				t.depth === 0 ? (b(), c("span", {
					key: 2,
					class: g(["node-badge", x.value])
				}, T(S.value), 3)) : (b(), c("span", Tf, T(v.value), 1)),
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
}), [["__scopeId", "data-v-203c062c"]]), Df = { class: "panel" }, Of = { class: "panel-head" }, kf = { class: "head-actions" }, Af = { class: "tree-body" }, jf = {
	key: 0,
	class: "site-node"
}, Mf = ["onClick"], Nf = { class: "node-name" }, Pf = ["onClick"], Ff = {
	key: 0,
	class: "add-modal"
}, If = {
	key: 0,
	class: "add-modal"
}, Lf = { class: "add-btns" }, Rf = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "SpaceTreePanel",
	setup(t) {
		let r = G(), a = K(), { refreshSpace: u, focusSpace: d } = Jl(), p = S(/* @__PURE__ */ new Set()), m = S(!1), h = S(null), g = S("zone"), _ = S("site"), v = S(""), y = S(null), x = S(""), w = i(() => [...r.spaces.values()].filter((e) => [
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
		function ee() {
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
			}), r.logChange("space.create", `Space added: ${v.value} (${_.value})`), I();
		}
		function I() {
			m.value = !1, h.value = null, v.value = "";
		}
		function L(e) {
			a.mode === "edit" && (y.value = e, x.value = e.name);
		}
		function R() {
			if (a.mode !== "edit" || !y.value) return;
			let e = y.value.id;
			r.updateSpace(e, { name: x.value }), r.logChange("space.update", `Space renamed: ${x.value}`), u(e), y.value = null;
		}
		function z(e) {
			a.mode === "edit" && confirm("Archive this space?") && (r.archiveSpace(e), u(e), r.logChange("space.archive", `Space archived: ${e}`));
		}
		return (t, i) => (b(), c("aside", Df, [
			l("div", Of, [i[7] ||= l("span", null, "Spaces", -1), l("div", kf, [E(a).mode === "edit" ? (b(), c("button", {
				key: 0,
				class: "text-btn",
				title: "Add space",
				onClick: i[0] ||= (e) => m.value = !0
			}, " Add ")) : s("", !0), l("button", {
				class: "text-btn",
				onClick: i[1] ||= (e) => E(a).closeLeftDock(),
				title: "Close"
			}, " Close ")])]),
			l("div", Af, [
				(b(!0), c(e, null, C(E(r).rootSpaces, (e) => (b(), o(Ef, {
					key: e.id,
					space: e,
					depth: 0,
					"open-nodes": p.value,
					onToggle: D,
					onFocus: O,
					onEdit: L,
					onArchive: z,
					onAddChild: j
				}, null, 8, ["space", "open-nodes"]))), 128)),
				w.value.length ? (b(), c("div", jf, [i[10] ||= l("div", { class: "tree-row site" }, [l("span", { class: "kind-tag" }, "GRP"), l("span", {
					class: "node-name",
					style: { color: "#94a3b8" }
				}, "Logical Groups")], -1), (b(!0), c(e, null, C(w.value, (e) => (b(), c("div", {
					key: e.id,
					class: "tree-row zone",
					onClick: (t) => O(e)
				}, [
					i[8] ||= l("span", { class: "arrow-spacer" }, null, -1),
					i[9] ||= l("span", { class: "kind-tag" }, "GRP", -1),
					l("span", Nf, T(e.name), 1),
					E(a).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "row-btn del",
						onClick: F((t) => z(e.id), ["stop"])
					}, " Del ", 8, Pf)) : s("", !0)
				], 8, Mf))), 128))])) : s("", !0),
				E(a).mode === "edit" ? (b(), c("div", {
					key: 1,
					class: "add-child-btn root",
					onClick: i[2] ||= (e) => m.value = !0
				}, " + Add building / site / group ")) : s("", !0)
			]),
			f(n, { name: "fade" }, {
				default: M(() => [E(a).mode === "edit" && (m.value || h.value) ? (b(), c("div", Ff, [
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
						onKeydown: P(ee, ["enter"])
					}, null, 544), [[A, v.value]]),
					l("div", { class: "add-btns" }, [l("button", {
						class: "add-ok",
						onClick: ee
					}, "Add"), l("button", {
						class: "add-cancel",
						onClick: I
					}, "Cancel")])
				])) : s("", !0)]),
				_: 1
			}),
			f(n, { name: "fade" }, {
				default: M(() => [E(a).mode === "edit" && y.value ? (b(), c("div", If, [
					i[13] ||= l("div", { class: "add-title" }, "Rename", -1),
					N(l("input", {
						"onUpdate:modelValue": i[5] ||= (e) => x.value = e,
						class: "add-input",
						onKeydown: P(R, ["enter"])
					}, null, 544), [[A, x.value]]),
					l("div", Lf, [l("button", {
						class: "add-ok",
						onClick: R
					}, "Save"), l("button", {
						class: "add-cancel",
						onClick: i[6] ||= (e) => y.value = null
					}, " Cancel ")])
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-7a654c8c"]]), zf = { class: "panel" }, Bf = { class: "panel-head" }, Vf = {
	key: 0,
	class: "add-form"
}, Hf = { class: "add-row" }, Uf = { label: "Built-in" }, Wf = ["value"], Gf = {
	key: 0,
	label: "Custom"
}, Kf = ["value"], qf = {
	key: 0,
	class: "empty"
}, Jf = { class: "device-list" }, Yf = ["draggable", "onDragstart"], Xf = { class: "dev-info" }, Zf = { class: "dev-name" }, Qf = { class: "dev-ip" }, $f = { class: "dev-source" }, ep = ["onClick"], tp = { class: "panel-footer" }, np = { class: "hint" }, rp = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "UnmappedPanel",
	setup(t) {
		let r = G(), i = K(), { allTypes: a, typeColor: o, typeAbbr: u } = sf(), p = S(null), m = S(!1), h = x({
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
		return (t, x) => (b(), c("aside", zf, [
			l("div", Bf, [
				l("span", null, [x[6] ||= d("Unmapped Devices ", -1), l("b", null, T(E(r).unmappedDevices.length), 1)]),
				E(i).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "text-btn",
					onClick: x[0] ||= (e) => m.value = !m.value,
					title: "Add device manually"
				}, " Add ")) : s("", !0),
				l("button", {
					class: "close-btn",
					onClick: x[1] ||= (e) => E(i).closeLeftDock(),
					title: "Close"
				}, " ✕ ")
			]),
			f(n, { name: "fade" }, {
				default: M(() => [E(i).mode === "edit" && m.value ? (b(), c("div", Vf, [
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
					l("div", Hf, [N(l("select", {
						"onUpdate:modelValue": x[4] ||= (e) => h.type = e,
						class: "add-sel"
					}, [l("optgroup", Uf, [(b(!0), c(e, null, C(E(a).filter((e) => !e.custom), (e) => (b(), c("option", {
						key: e.id,
						value: e.id
					}, T(e.label), 9, Wf))), 128))]), E(a).some((e) => e.custom) ? (b(), c("optgroup", Gf, [(b(!0), c(e, null, C(E(a).filter((e) => e.custom), (e) => (b(), c("option", {
						key: e.id,
						value: e.id
					}, " ★ " + T(e.label), 9, Kf))), 128))])) : s("", !0)], 512), [[k, h.type]]), N(l("input", {
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
			E(r).unmappedDevices.length === 0 && !m.value ? (b(), c("div", qf, " All devices are placed. ")) : s("", !0),
			l("div", Jf, [(b(!0), c(e, null, C(E(r).unmappedDevices, (e) => (b(), c("div", {
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
				l("div", Xf, [l("div", Zf, T(e.hostname ?? e.id), 1), l("div", Qf, T(e.ip ?? "—"), 1)]),
				l("span", $f, T(e.source), 1),
				E(i).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "ignore-btn",
					onClick: F((t) => D(e.id), ["stop"]),
					title: "Ignore"
				}, " ✕ ", 8, ep)) : s("", !0)
			], 42, Yf))), 128))]),
			l("div", tp, [l("span", np, T(E(i).mode === "edit" ? "Drag a device onto the 3D scene to place it." : "Switch to Edit mode to place devices."), 1)])
		]));
	}
}), [["__scopeId", "data-v-7e740f0f"]]), ip = {
	key: 0,
	class: "panel"
}, ap = { class: "panel-head" }, op = { class: "dev-title" }, sp = { class: "dev-name" }, cp = { class: "dev-ip" }, lp = {
	key: 0,
	class: "ack-badge",
	title: "Acknowledged — original status is preserved above"
}, up = { class: "panel-body" }, dp = { class: "section" }, fp = { class: "info-grid" }, pp = { class: "info-v" }, mp = { class: "info-v" }, hp = { class: "info-v" }, gp = { class: "info-v" }, _p = { class: "info-v" }, vp = {
	key: 0,
	class: "section"
}, yp = { class: "m-label" }, bp = { class: "m-bar-wrap" }, xp = { class: "section" }, Sp = { class: "if-summary" }, Cp = { class: "if-up" }, wp = { class: "if-dn" }, Tp = { class: "chevron" }, Ep = {
	key: 0,
	class: "iface-list"
}, Dp = { class: "if-name" }, Op = { class: "if-alias" }, kp = { class: "if-ip" }, Ap = { class: "if-speed" }, jp = { class: "if-traffic" }, Mp = {
	key: 0,
	class: "if-err"
}, Np = {
	key: 1,
	class: "section"
}, Pp = { class: "vt-row" }, Fp = { value: "" }, Ip = { label: "Built-in" }, Lp = ["value"], Rp = {
	key: 0,
	label: "Custom"
}, zp = ["value"], Bp = {
	key: 2,
	class: "section"
}, Vp = { class: "anno-form" }, Hp = {
	key: 3,
	class: "section actions"
}, Up = { class: "action-btns" }, Wp = { class: "assign-row" }, Gp = {
	key: 0,
	class: "action-log"
}, Kp = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "DeviceDetailPanel",
	setup(t) {
		let n = G(), r = K(), { allTypes: a, typeColor: o, typeAbbr: u } = sf(), { rebuildAll: f, setDeviceAcknowledged: p } = Jl(), m = S(!1), h = S(""), v = S(""), y = S(""), x = S(""), w = S(""), D = S(""), O = i(() => r.selectedDeviceId ? n.devices.get(r.selectedDeviceId) ?? null : null), M = i(() => O.value ? n.getMappingByDeviceId(O.value.id) ?? null : null), P = i(() => O.value ? n.interfacesByDevice.get(O.value.id) ?? [] : []), F = i(() => P.value.filter((e) => e.status === "up").length), ee = i(() => P.value.filter((e) => e.status === "down").length);
		j(M, (e) => {
			v.value = e?.displayName ?? "", y.value = e?.memo ?? "", x.value = e?.tags?.join(", ") ?? "", w.value = e?.visualType ?? "", D.value = e?.operatorState?.assignedTo ?? "";
		}, { immediate: !0 });
		function I() {
			O.value && (n.setVisualType(O.value.id, w.value || void 0), f());
		}
		let L = i(() => {
			let e = O.value?.metrics;
			return e ? [
				{
					key: "cpu",
					label: "CPU",
					pct: e.cpu ?? 0,
					display: `${(e.cpu ?? 0).toFixed(1)}%`,
					color: R(e.cpu ?? 0)
				},
				{
					key: "mem",
					label: "Memory",
					pct: e.memory ?? 0,
					display: `${(e.memory ?? 0).toFixed(1)}%`,
					color: R(e.memory ?? 0)
				},
				{
					key: "disk",
					label: "Disk",
					pct: e.disk ?? 0,
					display: `${(e.disk ?? 0).toFixed(1)}%`,
					color: R(e.disk ?? 0)
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
					color: R(((e.temperature ?? 40) - 20) / 60 * 100)
				}
			] : [];
		});
		function R(e) {
			return e >= 90 ? "#ef4444" : e >= 70 ? "#eab308" : "#22c55e";
		}
		function z(e) {
			return e ? e >= 1e3 ? `${(e / 1e3).toFixed(1)}G` : `${e.toFixed(0)}M` : "0";
		}
		function B() {
			O.value && n.updateDeviceStatus(O.value.id, "offline"), h.value = `[${H()}] Isolated (simulated)`;
		}
		function te() {
			O.value && n.updateDeviceStatus(O.value.id, "normal"), h.value = `[${H()}] Recovered (simulated)`;
		}
		function V() {
			O.value && (n.acknowledgeDevice(O.value.id), p(O.value.id, !0), h.value = `[${H()}] Acknowledged (original status preserved)`);
		}
		function ne() {
			O.value && (n.unacknowledgeDevice(O.value.id), p(O.value.id, !1), h.value = `[${H()}] Acknowledgment cleared`);
		}
		function re() {
			O.value && (n.assignDevice(O.value.id, D.value.trim()), h.value = D.value.trim() ? `[${H()}] Assigned to ${D.value.trim()}` : `[${H()}] Unassigned`);
		}
		function ie() {
			O.value && (n.updateAnnotation(O.value.id, {
				displayName: v.value || void 0,
				memo: y.value || void 0,
				tags: x.value ? x.value.split(",").map((e) => e.trim()).filter(Boolean) : []
			}), h.value = `[${H()}] Annotation saved`);
		}
		function ae() {
			O.value && (n.unmapDevice(O.value.id), r.select(null));
		}
		function H() {
			return (/* @__PURE__ */ new Date()).toLocaleTimeString();
		}
		return (t, n) => O.value ? (b(), c("aside", ip, [l("div", ap, [l("div", op, [
			l("span", {
				class: "type-tag",
				style: _({
					color: E(o)(O.value.normalizedType),
					borderColor: E(o)(O.value.normalizedType)
				})
			}, T(E(u)(O.value.normalizedType)), 5),
			l("div", null, [l("div", sp, T(M.value?.displayName ?? O.value.hostname), 1), l("div", cp, T(O.value.ip), 1)]),
			l("span", { class: g(["status-badge", O.value.status]) }, T(E(Fn)[O.value.status ?? "unknown"]), 3),
			M.value?.operatorState?.acknowledged ? (b(), c("span", lp, "✓ Ack")) : s("", !0),
			l("button", {
				class: "close-btn",
				onClick: n[0] ||= (e) => E(r).select(null),
				title: "Close"
			}, "✕")
		])]), l("div", up, [
			l("section", dp, [n[18] ||= l("div", { class: "sec-title" }, "Info", -1), l("div", fp, [
				n[8] ||= l("span", { class: "info-k" }, "Vendor", -1),
				n[9] ||= d(),
				l("span", pp, T(O.value.vendor ?? "—"), 1),
				n[10] ||= l("span", { class: "info-k" }, "Model", -1),
				n[11] ||= d(),
				l("span", mp, T(O.value.model ?? "—"), 1),
				n[12] ||= l("span", { class: "info-k" }, "OS", -1),
				n[13] ||= d(),
				l("span", hp, T(O.value.os ?? "—"), 1),
				n[14] ||= l("span", { class: "info-k" }, "Source", -1),
				n[15] ||= d(),
				l("span", gp, T(O.value.source), 1),
				n[16] ||= l("span", { class: "info-k" }, "Sync", -1),
				n[17] ||= d(),
				l("span", _p, T(O.value.syncState), 1)
			])]),
			O.value.metrics ? (b(), c("section", vp, [n[19] ||= l("div", { class: "sec-title" }, "Metrics", -1), (b(!0), c(e, null, C(L.value, (e) => (b(), c("div", {
				key: e.key,
				class: "metric-row"
			}, [
				l("span", yp, T(e.label), 1),
				l("div", bp, [l("div", {
					class: "m-bar",
					style: _({
						width: e.pct + "%",
						background: e.color
					})
				}, null, 4)]),
				l("span", { class: g(["m-val", { hot: e.pct > 85 }]) }, T(e.display), 3)
			]))), 128))])) : s("", !0),
			l("section", xp, [l("div", {
				class: "sec-title clickable",
				onClick: n[1] ||= (e) => m.value = !m.value
			}, [
				l("span", null, "Interfaces (" + T(P.value.length) + ")", 1),
				l("span", Sp, [l("span", Cp, "Up " + T(F.value), 1), l("span", wp, "Down " + T(ee.value), 1)]),
				l("span", Tp, T(m.value ? "−" : "+"), 1)
			]), m.value ? (b(), c("div", Ep, [(b(!0), c(e, null, C(P.value, (e) => (b(), c("div", {
				key: e.id,
				class: g(["iface-row", e.status])
			}, [
				l("span", { class: g(["if-dot", e.status]) }, null, 2),
				l("span", Dp, T(e.name), 1),
				l("span", Op, T(e.alias ?? ""), 1),
				l("span", kp, T(e.ip ?? ""), 1),
				l("span", Ap, T(e.speed ? e.speed + "M" : ""), 1),
				l("div", jp, [l("span", null, "In " + T(z(e.trafficIn)), 1), l("span", null, "Out " + T(z(e.trafficOut)), 1)]),
				e.errors ? (b(), c("span", Mp, "err:" + T(e.errors), 1)) : s("", !0)
			], 2))), 128))])) : s("", !0)]),
			E(r).mode === "edit" ? (b(), c("section", Np, [n[20] ||= l("div", { class: "sec-title" }, "Visual Shape", -1), l("div", Pp, [N(l("select", {
				"onUpdate:modelValue": n[2] ||= (e) => w.value = e,
				class: "vt-sel"
			}, [
				l("option", Fp, "Default (" + T(O.value?.normalizedType ?? "unknown") + ")", 1),
				l("optgroup", Ip, [(b(!0), c(e, null, C(E(a).filter((e) => !e.custom), (e) => (b(), c("option", {
					key: e.id,
					value: e.id
				}, T(e.label), 9, Lp))), 128))]),
				E(a).some((e) => e.custom) ? (b(), c("optgroup", Rp, [(b(!0), c(e, null, C(E(a).filter((e) => e.custom), (e) => (b(), c("option", {
					key: e.id,
					value: e.id
				}, " ★ " + T(e.label), 9, zp))), 128))])) : s("", !0)
			], 512), [[k, w.value]]), l("button", {
				class: "vt-apply",
				onClick: I
			}, "Apply")])])) : s("", !0),
			E(r).mode === "edit" ? (b(), c("section", Bp, [n[24] ||= l("div", { class: "sec-title" }, "Annotation", -1), l("div", Vp, [
				l("label", null, [n[21] ||= d("Display name ", -1), N(l("input", {
					"onUpdate:modelValue": n[3] ||= (e) => v.value = e,
					class: "anno-input",
					placeholder: "Device alias"
				}, null, 512), [[A, v.value]])]),
				l("label", null, [n[22] ||= d("Memo ", -1), N(l("textarea", {
					"onUpdate:modelValue": n[4] ||= (e) => y.value = e,
					class: "anno-input anno-textarea",
					rows: "2"
				}, null, 512), [[A, y.value]])]),
				l("label", null, [n[23] ||= d("Tags (comma separated) ", -1), N(l("input", {
					"onUpdate:modelValue": n[5] ||= (e) => x.value = e,
					class: "anno-input",
					placeholder: "web, db, prod"
				}, null, 512), [[A, x.value]])]),
				l("button", {
					class: "save-btn",
					onClick: ie
				}, "Save")
			])])) : s("", !0),
			E(r).mode === "edit" ? (b(), c("section", Hp, [
				n[25] ||= l("div", { class: "sec-title" }, "Actions", -1),
				l("div", Up, [
					l("button", {
						class: "act-btn isolate",
						onClick: B,
						title: "Simulated — updates this visualization only, does not control the real device"
					}, "Isolate"),
					l("button", {
						class: "act-btn recover",
						onClick: te,
						title: "Simulated — updates this visualization only, does not control the real device"
					}, "Recover"),
					l("button", {
						class: "act-btn ack",
						onClick: n[6] ||= (e) => M.value?.operatorState?.acknowledged ? ne() : V()
					}, T(M.value?.operatorState?.acknowledged ? "Unacknowledge" : "Acknowledge"), 1),
					E(r).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "act-btn unmap",
						onClick: ae
					}, "Remove from map")) : s("", !0)
				]),
				l("div", Wp, [N(l("input", {
					"onUpdate:modelValue": n[7] ||= (e) => D.value = e,
					class: "anno-input",
					placeholder: "Assign to…"
				}, null, 512), [[A, D.value]]), l("button", {
					class: "save-btn",
					onClick: re
				}, "Save")]),
				h.value ? (b(), c("div", Gp, T(h.value), 1)) : s("", !0)
			])) : s("", !0)
		])])) : s("", !0);
	}
}), [["__scopeId", "data-v-c7373bb7"]]), qp = {
	key: 0,
	class: "panel"
}, Jp = { class: "panel-head" }, Yp = { class: "link-title" }, Xp = { class: "link-type" }, Zp = { class: "link-src" }, Qp = { class: "panel-body" }, $p = { class: "section" }, em = { class: "info-grid" }, tm = { class: "v" }, nm = { class: "v" }, rm = { class: "v" }, im = { class: "v" }, am = { class: "v" }, om = {
	key: 0,
	class: "section"
}, sm = { class: "edit-form" }, cm = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "LinkPropertyPanel",
	setup(e) {
		let t = G(), n = K(), r = {
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
		return (e, t) => a.value ? (b(), c("aside", qp, [l("div", Jp, [l("div", Yp, [
			l("span", {
				class: "link-icon",
				style: _({ color: E(Mn)[a.value.type]?.color })
			}, "╌", 4),
			l("div", null, [l("div", Xp, T(r[a.value.type]), 1), l("div", Zp, T(f.value) + " → " + T(p.value), 1)]),
			l("span", { class: g(["status-dot", a.value.status]) }, null, 2),
			l("button", {
				class: "close-btn",
				onClick: t[0] ||= (e) => E(n).select(null),
				title: "Close"
			}, "✕")
		])]), l("div", Qp, [l("section", $p, [t[15] ||= l("div", { class: "sec-title" }, "Link Info", -1), l("div", em, [
			t[3] ||= l("span", { class: "k" }, "Type", -1),
			t[4] ||= d(),
			l("span", tm, T(r[a.value.type]), 1),
			t[5] ||= l("span", { class: "k" }, "Status", -1),
			t[6] ||= d(),
			l("span", { class: g(["v", `s-${a.value.status}`]) }, T(a.value.status ?? "unknown"), 3),
			t[7] ||= l("span", { class: "k" }, "Source", -1),
			t[8] ||= d(),
			l("span", nm, T(a.value.source), 1),
			t[9] ||= l("span", { class: "k" }, "Confidence", -1),
			t[10] ||= d(),
			l("span", rm, T(a.value.confidence ?? "—"), 1),
			t[11] ||= l("span", { class: "k" }, "Bandwidth", -1),
			t[12] ||= d(),
			l("span", im, T(a.value.bandwidth ? a.value.bandwidth + " Mbps" : "—"), 1),
			t[13] ||= l("span", { class: "k" }, "Label", -1),
			t[14] ||= d(),
			l("span", am, T(a.value.label ?? "—"), 1)
		])]), E(n).mode === "edit" && a.value.source === "manual" ? (b(), c("section", om, [t[19] ||= l("div", { class: "sec-title" }, "Edit", -1), l("div", sm, [
			l("label", null, [t[17] ||= d("Status ", -1), N(l("select", {
				"onUpdate:modelValue": t[1] ||= (e) => m.value = e,
				class: "sel"
			}, [...t[16] ||= [
				l("option", { value: "up" }, "Up", -1),
				l("option", { value: "down" }, "Down", -1),
				l("option", { value: "unknown" }, "Unknown", -1)
			]], 512), [[k, m.value]])]),
			l("label", null, [t[18] ||= d("Label ", -1), N(l("input", {
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
}), [["__scopeId", "data-v-1f2f1ef4"]]), lm = {
	key: 0,
	class: "panel"
}, um = { class: "panel-head" }, dm = { class: "kind-tag" }, fm = { class: "sp-name" }, pm = { class: "panel-body" }, mm = {
	key: 0,
	class: "section"
}, hm = { class: "info-grid" }, gm = { class: "v" }, _m = { class: "v" }, vm = { class: "v" }, ym = { class: "section" }, bm = {
	key: 1,
	class: "section"
}, xm = { class: "slider-row" }, Sm = ["min", "max"], Cm = { class: "s-val" }, wm = { class: "slider-row" }, Tm = ["min", "max"], Em = { class: "s-val" }, Dm = {
	key: 2,
	class: "section actions"
}, Om = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "SpacePropertyPanel",
	setup(e) {
		let t = G(), n = K(), { refreshSpace: r } = Jl(), a = i(() => n.selectedSpaceId ? t.spaces.get(n.selectedSpaceId) ?? null : null), o = i(() => n.selectedSpaceId ? t.devicesBySpace.get(n.selectedSpaceId)?.length ?? 0 : 0), u = S(""), f = S(10), p = S(10), m = i(() => {
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
		return (e, t) => a.value ? (b(), c("aside", lm, [l("div", um, [
			l("span", dm, T(a.value.type.toUpperCase()), 1),
			l("span", fm, T(a.value.name), 1),
			l("button", {
				class: "close-btn",
				onClick: t[0] ||= (e) => E(n).select(null),
				title: "Close"
			}, "✕")
		]), l("div", pm, [
			E(n).mode === "edit" ? (b(), c("section", mm, [t[10] ||= l("div", { class: "sec-title" }, "Info", -1), l("div", hm, [
				t[4] ||= l("span", { class: "k" }, "Kind", -1),
				t[5] ||= d(),
				l("span", gm, T(a.value.kind), 1),
				t[6] ||= l("span", { class: "k" }, "Type", -1),
				t[7] ||= d(),
				l("span", _m, T(a.value.type), 1),
				t[8] ||= l("span", { class: "k" }, "Devices", -1),
				t[9] ||= d(),
				l("span", vm, T(o.value), 1)
			])])) : s("", !0),
			l("section", ym, [t[11] ||= l("div", { class: "sec-title" }, "Name", -1), N(l("input", {
				"onUpdate:modelValue": t[1] ||= (e) => u.value = e,
				class: "inp",
				onChange: h
			}, null, 544), [[A, u.value]])]),
			E(n).mode === "edit" && a.value.size ? (b(), c("section", bm, [
				t[14] ||= l("div", { class: "sec-title" }, "Size", -1),
				l("div", xm, [
					t[12] ||= l("span", { class: "s-label" }, "Width", -1),
					N(l("input", {
						type: "range",
						min: m.value.min,
						max: m.value.max,
						step: "0.5",
						"onUpdate:modelValue": t[2] ||= (e) => f.value = e,
						class: "slider",
						onInput: g
					}, null, 40, Sm), [[
						A,
						f.value,
						void 0,
						{ number: !0 }
					]]),
					l("span", Cm, T(f.value.toFixed(1)), 1)
				]),
				l("div", wm, [
					t[13] ||= l("span", { class: "s-label" }, "Depth", -1),
					N(l("input", {
						type: "range",
						min: m.value.min,
						max: m.value.max,
						step: "0.5",
						"onUpdate:modelValue": t[3] ||= (e) => p.value = e,
						class: "slider",
						onInput: g
					}, null, 40, Tm), [[
						A,
						p.value,
						void 0,
						{ number: !0 }
					]]),
					l("span", Em, T(p.value.toFixed(1)), 1)
				])
			])) : s("", !0),
			E(n).mode === "edit" ? (b(), c("section", Dm, [l("button", {
				class: "act-btn archive",
				onClick: _
			}, "Archive space")])) : s("", !0)
		])])) : s("", !0);
	}
}), [["__scopeId", "data-v-9d0ae939"]]), km = { class: "sv-panel" }, Am = { class: "sv-head" }, jm = {
	key: 0,
	class: "sv-empty"
}, Mm = { class: "sv-list" }, Nm = ["onClick"], Pm = { class: "sv-name" }, Fm = { class: "sv-time" }, Im = ["onClick"], Lm = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "SavedViewPanel",
	emits: ["load-view", "save-view"],
	setup(t, { emit: n }) {
		let r = G(), i = K(), a = n;
		function o() {
			let e = prompt("Enter a view name:", `View-${r.savedViews.length + 1}`) ?? "";
			e && a("save-view", e);
		}
		function u(e) {
			a("load-view", e);
		}
		return (t, n) => (b(), c("div", km, [
			l("div", Am, [
				n[1] ||= l("span", null, "Saved Views", -1),
				l("button", {
					class: "sv-save",
					onClick: o,
					title: "Save current view"
				}, "Save Current"),
				l("button", {
					class: "icon-btn",
					onClick: n[0] ||= (e) => E(i).showSavedViews = !1
				}, "Close")
			]),
			E(r).savedViews.length ? s("", !0) : (b(), c("div", jm, "No saved views")),
			l("div", Mm, [(b(!0), c(e, null, C(E(r).savedViews, (e) => (b(), c("div", {
				key: e.id,
				class: "sv-row"
			}, [l("div", {
				class: "sv-info",
				onClick: (t) => u(e)
			}, [l("div", Pm, T(e.name), 1), l("div", Fm, T(e.createdAt), 1)], 8, Nm), l("button", {
				class: "del-btn",
				onClick: (t) => E(r).removeSavedView(e.id)
			}, "✕", 8, Im)]))), 128))])
		]));
	}
}), [["__scopeId", "data-v-2125ec23"]]), Rm = { class: "cl-panel" }, zm = { class: "cl-head" }, Bm = {
	key: 0,
	class: "cl-empty"
}, Vm = { class: "cl-list" }, Hm = { class: "cl-msg" }, Um = { class: "cl-ts" }, Wm = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "ChangeLogPanel",
	setup(t) {
		let n = G(), r = K(), a = S("");
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
		return (t, i) => (b(), c("div", Rm, [
			l("div", zm, [
				i[4] ||= l("span", null, "Change Log", -1),
				N(l("select", {
					"onUpdate:modelValue": i[0] ||= (e) => a.value = e,
					class: "cl-filter"
				}, [...i[3] ||= [u("<option value=\"\" data-v-3087e6a1>All types</option><option value=\"device\" data-v-3087e6a1>Device</option><option value=\"space\" data-v-3087e6a1>Space</option><option value=\"link\" data-v-3087e6a1>Link</option><option value=\"other\" data-v-3087e6a1>Other</option>", 5)]], 512), [[k, a.value]]),
				l("button", {
					class: "cl-clear",
					onClick: f
				}, "Export"),
				l("button", {
					class: "cl-clear",
					onClick: i[1] ||= (e) => E(n).changeLog.splice(0)
				}, "Clear"),
				l("button", {
					class: "icon-btn",
					onClick: i[2] ||= (e) => E(r).showChangeLog = !1
				}, "Close")
			]),
			d.value.length ? s("", !0) : (b(), c("div", Bm, "No changes yet")),
			l("div", Vm, [(b(!0), c(e, null, C(d.value, (e) => (b(), c("div", {
				key: e.id,
				class: "cl-row"
			}, [
				l("span", { class: g(["cl-type", o(e.type)]) }, T(e.type), 3),
				l("span", Hm, T(e.msg), 1),
				l("span", Um, T(e.ts), 1)
			]))), 128))])
		]));
	}
}), [["__scopeId", "data-v-3087e6a1"]]), Gm = { class: "vn-panel" }, Km = { class: "vn-head" }, qm = { class: "vn-list" }, Jm = ["onClick"], Ym = { class: "vn-tag" }, Xm = { class: "vn-label" }, Zm = ["onClick"], Qm = {
	key: 0,
	class: "vn-empty"
}, $m = {
	key: 0,
	class: "add-form"
}, eh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "VirtualNodePanel",
	emits: ["select-node"],
	setup(t, { emit: r }) {
		let a = G(), o = K(), u = r, d = S(!1), p = S("internet"), m = S(""), h = i(() => [...a.virtualNodes.values()]);
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
		return (t, r) => (b(), c("div", Gm, [
			l("div", Km, [
				r[4] ||= l("span", null, "Virtual Nodes", -1),
				E(o).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "text-btn",
					onClick: r[0] ||= (e) => d.value = !d.value
				}, "Add")) : s("", !0),
				l("button", {
					class: "text-btn",
					onClick: r[1] ||= (e) => E(o).showVirtualNodes = !1
				}, "Close")
			]),
			l("div", qm, [(b(!0), c(e, null, C(h.value, (e) => (b(), c("div", {
				key: e.id,
				class: "vn-row",
				onClick: (t) => v(e.id)
			}, [
				l("span", Ym, T(e.type.slice(0, 3).toUpperCase()), 1),
				l("span", Xm, T(e.label), 1),
				E(o).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "del-btn",
					onClick: F((t) => _(e.id), ["stop"])
				}, "x", 8, Zm)) : s("", !0)
			], 8, Jm))), 128)), h.value.length ? s("", !0) : (b(), c("div", Qm, "No virtual nodes"))]),
			f(n, { name: "fade" }, {
				default: M(() => [E(o).mode === "edit" && d.value ? (b(), c("div", $m, [
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
}), [["__scopeId", "data-v-9b02530a"]]), th = {
	key: 0,
	class: "tl-panel"
}, nh = { class: "tl-head" }, rh = {
	key: 0,
	class: "tl-info"
}, ih = {
	key: 0,
	class: "tl-slider-wrap"
}, ah = ["max"], oh = { class: "tl-label" }, sh = {
	key: 1,
	class: "tl-replay-banner"
}, ch = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "TimelinePanel",
	props: { timeline: {} },
	emits: ["scrub", "live"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = K(), o = G(), u = S(null), f = S(!1), p = i(() => n.timeline.frameCount), m = i(() => a.timelineFrameIdx < 0 ? null : n.timeline.getFrame(a.timelineFrameIdx));
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
		return (e, t) => E(a).showTimeline ? (b(), c("div", th, [
			l("div", nh, [
				l("button", {
					class: g(["tl-btn", f.value ? "rec" : ""]),
					onClick: h
				}, T(f.value ? "Stop Recording" : "Record"), 3),
				p.value > 0 ? (b(), c("span", rh, T(p.value) + " frames", 1)) : s("", !0),
				t[3] ||= l("div", { class: "tl-spacer" }, null, -1),
				l("button", {
					class: "tl-btn",
					onClick: v,
					title: "Export timeline"
				}, "Export Timeline"),
				l("button", {
					class: "tl-btn",
					onClick: y,
					title: "Export layout"
				}, "Export Layout"),
				l("button", {
					class: "tl-btn",
					onClick: x,
					title: "Import layout"
				}, "Import Layout"),
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
			p.value > 0 ? (b(), c("div", ih, [
				t[4] ||= l("span", { class: "tl-label" }, "LIVE", -1),
				N(l("input", {
					type: "range",
					min: "-1",
					max: p.value - 1,
					step: "1",
					"onUpdate:modelValue": t[1] ||= (e) => E(a).timelineFrameIdx = e,
					class: "tl-slider",
					onInput: _
				}, null, 40, ah), [[
					A,
					E(a).timelineFrameIdx,
					void 0,
					{ number: !0 }
				]]),
				l("span", oh, T(m.value?.label ?? "LIVE"), 1)
			])) : s("", !0),
			E(a).timelineFrameIdx >= 0 ? (b(), c("div", sh, [t[5] ||= d(" Replay mode — real-time updates paused ", -1), l("button", {
				class: "tl-btn",
				onClick: t[2] ||= (e) => {
					E(a).timelineFrameIdx = -1, r("live");
				}
			}, "Back to LIVE")])) : s("", !0)
		])) : s("", !0);
	}
}), [["__scopeId", "data-v-b46656aa"]]), lh = class {
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
			let n = this.toMM(t.position.x, t.position.z), r = On[e.status ?? "unknown"];
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
}, uh = {
	key: 0,
	class: "mm-wrap"
}, dh = 180, fh = 130, ph = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "MinimapPanel",
	props: {
		camera: {},
		controls: {}
	},
	setup(e) {
		let t = e, n = S(null), r = G(), i = K(), { flyToWorldPoint: a } = Jl(), o = null, u = null;
		function d(e) {
			if (!o || !n.value) return;
			let t = n.value.getBoundingClientRect(), { x: r, z: i } = o.toWorld(e.clientX - t.left, e.clientY - t.top);
			a(r, i);
		}
		y(() => {
			n.value && (o = new lh(n.value), o.updateBounds(r.scopedSpaces(i.activeRootSpaceId)), f());
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
		}), (e, t) => E(i).showMinimap ? (b(), c("div", uh, [l("canvas", {
			ref_key: "canvas",
			ref: n,
			width: dh,
			height: fh,
			class: "mm-canvas",
			title: "Click to navigate",
			onClick: d
		}, null, 512), l("button", {
			class: "mm-close",
			onClick: t[0] ||= (e) => E(i).showMinimap = !1,
			title: "Close minimap"
		}, "✕")])) : s("", !0);
	}
}), [["__scopeId", "data-v-c605211a"]]), mh = { class: "tt-name" }, hh = { class: "tt-ip" }, gh = {
	key: 0,
	class: "tt-metrics"
}, _h = {
	key: 0,
	class: "hint edit-hint"
}, vh = {
	key: 1,
	class: "hint"
}, yh = {
	key: 2,
	class: "hint"
}, bh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "SceneCanvas",
	emits: ["scene-ready"],
	setup(e, { emit: t }) {
		let r = S(null), a = S(null), o = S(null), p = G(), m = K(), g = t, { init: x, dispose: C, dropDeviceAt: w } = Jl(), { typeColor: D, typeLabel: O } = sf(), k = i(() => m.tooltip), A = i(() => m.tooltip.deviceId ? p.devices.get(m.tooltip.deviceId) : null);
		function j(e) {
			let t = e.dataTransfer?.getData("deviceId");
			t && w(t, e);
		}
		return y(() => {
			x(a.value, o.value, r.value), h(() => g("scene-ready"));
		}), v(() => C()), (e, t) => (b(), c("div", {
			ref_key: "wrapper",
			ref: r,
			class: "scene-wrap",
			onDragover: t[0] ||= F(() => {}, ["prevent"]),
			onDrop: j
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
			f(n, { name: "fade" }, {
				default: M(() => [k.value.visible && A.value ? (b(), c("div", {
					key: 0,
					class: "tooltip",
					style: _({
						left: k.value.x + 14 + "px",
						top: k.value.y - 10 + "px"
					})
				}, [
					l("div", mh, T(A.value.hostname), 1),
					l("div", hh, T(A.value.ip), 1),
					l("div", {
						class: "tt-status",
						style: _({ color: E(On)[A.value.status ?? "unknown"] })
					}, T(E(Fn)[A.value.status ?? "unknown"]), 5),
					A.value.metrics ? (b(), c("div", gh, " C" + T((A.value.metrics.cpu ?? 0).toFixed(0)) + "% M" + T((A.value.metrics.memory ?? 0).toFixed(0)) + "% ", 1)) : s("", !0),
					l("div", {
						class: "tt-type",
						style: _({ color: E(D)(A.value.normalizedType) })
					}, T(E(O)(A.value.normalizedType)), 5)
				], 4)) : s("", !0)]),
				_: 1
			}),
			E(m).linkToolActive ? (b(), c("div", _h, [...t[1] ||= [
				d(" Connect mode — ", -1),
				l("b", null, "drag", -1),
				d(" from one device to another, then pick a link type · ", -1),
				l("kbd", null, "ESC", -1),
				d(" to cancel ", -1)
			]])) : E(m).mode === "edit" ? (b(), c("div", vh, [...t[2] ||= [u(" Click to select · <kbd data-v-3d5b0850>Ctrl</kbd>+Click multi-select · drag <span style=\"color:#ff6b7a;\" data-v-3d5b0850>X</span>/<span style=\"color:#5fd968;\" data-v-3d5b0850>Y</span>/<span style=\"color:#5fb0ff;\" data-v-3d5b0850>Z</span> arrows to move · <kbd data-v-3d5b0850>L</kbd> Connect · <kbd data-v-3d5b0850>Del</kbd> Delete · <kbd data-v-3d5b0850>Ctrl+Z</kbd> Undo · <kbd data-v-3d5b0850>F</kbd> Fit ", 17)]])) : (b(), c("div", yh, [...t[3] ||= [
				d(" View mode - click to inspect - ", -1),
				l("kbd", null, "F", -1),
				d(" Fit ", -1)
			]]))
		], 544));
	}
}), [["__scopeId", "data-v-3d5b0850"]]), xh = 220, Sh = 16, Ch = 22, wh = 56;
function Th(e, t) {
	return e > 0 ? On.critical : t > 0 ? On.warning : On.normal;
}
var Eh = class {
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
		let a = Math.max(1, Math.floor((r - Sh) / 236)), o = (r - a * xh - (a - 1) * Sh) / 2, s = o, c = 32, l = 0;
		e.forEach((e, t) => {
			t % a === 0 && t !== 0 ? (s = o, c += l + Sh, l = 0) : t !== 0 && (s += 236);
			let n = wh + (e.drillable ? e.children.length * 28 + 12 : 12);
			this._drawCard(e, s, c, xh, n), l = Math.max(l, n);
		});
	}
	_drawCard(e, t, n, r, i) {
		let a = this.ctx, o = Th(e.critical, e.warning);
		a.fillStyle = this.hoverId === e.id && !e.drillable ? "rgba(30,58,95,0.9)" : "rgba(9,13,24,0.92)", a.strokeStyle = o, a.lineWidth = e.critical > 0 || e.warning > 0 ? 1.5 : 1, this._roundRect(t, n, r, i, 8), a.fill(), a.stroke(), e.drillable || this.cardRects.push({
			x: t,
			y: n,
			w: r,
			h: i,
			id: e.id
		}), a.fillStyle = "#e2e8f0", a.font = "600 13px -apple-system, \"Segoe UI\", sans-serif", a.fillText(e.name, t + 12, n + 22), a.fillStyle = "#64748b", a.font = "10px monospace", a.fillText(e.type.toUpperCase(), t + 12, n + 38), a.textAlign = "right", a.fillStyle = o, a.font = "600 11px monospace";
		let s = e.critical > 0 ? `${e.critical} CRIT` : e.warning > 0 ? `${e.warning} WARN` : "OK";
		if (a.fillText(s, t + r - 12, n + 22), a.fillStyle = "#475569", a.font = "10px monospace", a.fillText(`${e.total} dev`, t + r - 12, n + 38), a.textAlign = "left", e.drillable) {
			let i = n + wh;
			e.children.forEach((e) => {
				let n = Th(e.critical, e.warning);
				a.fillStyle = this.hoverId === e.id ? "rgba(30,58,95,0.9)" : "rgba(255,255,255,0.04)", a.strokeStyle = n, a.lineWidth = 1, this._roundRect(t + 12, i, r - 24, Ch, 5), a.fill(), a.stroke(), a.fillStyle = "#cbd5e1", a.font = "11px -apple-system, \"Segoe UI\", sans-serif", a.fillText(e.name, t + 20, i + 15), a.beginPath(), a.arc(t + r - 22, i + Ch / 2, 3, 0, Math.PI * 2), a.fillStyle = n, a.fill(), this.pillRects.push({
					x: t + 12,
					y: i,
					w: r - 24,
					h: Ch,
					id: e.id
				}), i += 28;
			});
		}
	}
	_roundRect(e, t, n, r, i) {
		let a = this.ctx;
		a.beginPath(), a.moveTo(e + i, t), a.arcTo(e + n, t, e + n, t + r, i), a.arcTo(e + n, t + r, e, t + r, i), a.arcTo(e, t + r, e, t, i), a.arcTo(e, t, e + n, t, i), a.closePath();
	}
}, Dh = {
	key: 0,
	class: "ov-empty"
}, Oh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "OverviewCanvas",
	emits: ["enter-floor"],
	setup(e, { emit: t }) {
		let n = t, r = G(), a = S(null), o = S(null), u = null, d = null, f = new Set([
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
			o.value && (u = new Eh(o.value), d = new ResizeObserver(() => h()), a.value && d.observe(a.value), h());
		}), j(m, () => g(), { deep: !0 }), v(() => {
			d?.disconnect();
		}), (e, t) => (b(), c("div", {
			class: "ov-wrap",
			ref_key: "wrapper",
			ref: a
		}, [l("canvas", {
			ref_key: "canvas",
			ref: o,
			class: "ov-canvas",
			onClick: _,
			onMousemove: x,
			onMouseleave: C
		}, null, 544), m.value.length ? s("", !0) : (b(), c("div", Dh, "No spaces yet"))], 512));
	}
}), [["__scopeId", "data-v-38c44d86"]]), kh = { class: "offscreen-alerts" }, Ah = ["title", "onClick"], jh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "OffscreenAlertOverlay",
	setup(t) {
		let n = K(), r = G(), { focusDevice: i } = Jl();
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
		return (t, r) => (b(), c("div", kh, [(b(!0), c(e, null, C(E(n).offscreenAlerts, (e) => (b(), c("button", {
			key: e.id,
			class: g(["oa-arrow", e.status]),
			style: _({
				left: e.edgeX + "px",
				top: e.edgeY + "px",
				transform: `translate(-50%, -50%) rotate(${e.angle}deg)`
			}),
			title: a(e.id),
			onClick: (t) => o(e.id)
		}, "▲", 14, Ah))), 128))]));
	}
}), [["__scopeId", "data-v-eb1c6254"]]), Mh = ["onClick"], Nh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "ContextMenu",
	setup(r) {
		let i = K(), { confirmCreateLink: a } = Jl(), u = [
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
				}, null, 4), l("span", null, T(e.label), 1)], 12, Mh)), 64)),
				a[3] ||= l("div", { class: "ctx-sep" }, null, -1),
				l("button", {
					class: "ctx-item cancel",
					onClick: a[0] ||= (e) => E(i).hideContextMenu()
				}, "Cancel")
			], 4)) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-fcf03e39"]]), Ph = { class: "toast-stack" }, Fh = ["onClick"], Ih = { class: "msg" }, Lh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "ToastPanel",
	setup(n) {
		let i = K();
		return (n, a) => (b(), o(t, { to: "body" }, [l("div", Ph, [f(r, { name: "toast" }, {
			default: M(() => [(b(!0), c(e, null, C(E(i).toasts, (e) => (b(), c("div", {
				key: e.id,
				class: g(["toast", e.type]),
				onClick: (t) => E(i).removeToast(e.id)
			}, [l("span", Ih, T(e.message), 1), a[0] ||= l("span", { class: "close" }, "✕", -1)], 10, Fh))), 128))]),
			_: 1
		})])]));
	}
}), [["__scopeId", "data-v-0b13ee6c"]]), Rh = { class: "help-modal" }, zh = { class: "help-head" }, Bh = { class: "lang-switch" }, Vh = { class: "help-body" }, Hh = { class: "help-key" }, Uh = { class: "help-desc" }, Wh = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "HelpPanel",
	setup(r) {
		let i = K(), a = S("en"), u = {
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
			}, [l("div", Rh, [l("div", zh, [
				d[4] ||= l("span", { class: "help-title" }, "Topospace — Help", -1),
				l("div", Bh, [l("button", {
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
			]), l("div", Vh, [(b(!0), c(e, null, C(u[a.value], (t) => (b(), c("section", {
				key: t.title,
				class: "help-section"
			}, [l("h3", null, T(t.title), 1), (b(!0), c(e, null, C(t.rows, (t) => (b(), c("div", {
				key: t.k,
				class: "help-row"
			}, [l("span", Hh, [(b(!0), c(e, null, C(t.k.split("+"), (e) => (b(), c("kbd", { key: e }, T(e), 1))), 128))]), l("span", Uh, T(t.v), 1)]))), 128))]))), 128))])])])) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-6518091b"]]), Gh = {
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
}, Kh = {
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
}, qh = ["hostname", "type"];
function Jh(e) {
	return e.trim().toLowerCase().replace(/[\s_-]+/g, "");
}
var Yh = {
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
function Xh(e) {
	let t = [];
	return {
		mapped: e.map((e) => Yh[Jh(e)] || (t.push(e), null)),
		unknownCols: t
	};
}
function Zh(e, t) {
	let n = {};
	t.forEach((t, r) => {
		if (!t) return;
		let i = (e[r] ?? "").trim();
		i && (t === "type" ? n.type = Gh[i.toLowerCase()] ?? "unknown" : t === "status" ? n.status = Kh[i.toLowerCase()] ?? "unknown" : n[t] = i);
	});
	for (let e of qh) if (!n[e]) return { error: `missing required column: ${e}` };
	return { row: n };
}
function Qh(e) {
	let t = [], n = "", r = !1;
	for (let i = 0; i < e.length; i++) {
		let a = e[i];
		r ? a === "\"" && e[i + 1] === "\"" ? (n += "\"", i++) : a === "\"" ? r = !1 : n += a : a === "," ? (t.push(n), n = "") : a === "\"" ? r = !0 : n += a;
	}
	return t.push(n), t;
}
function $h(e) {
	let t = {
		rows: [],
		errors: [],
		warnings: []
	}, n = e.split(/\r?\n/).filter((e) => e.trim().length > 0);
	if (n.length < 2) return t.errors.push("CSV must contain a header row and at least one data row."), t;
	let { mapped: r, unknownCols: i } = Xh(Qh(n[0]));
	i.length && t.warnings.push(`Unknown columns ignored: ${i.join(", ")}`);
	for (let e = 1; e < n.length; e++) {
		let { row: i, error: a } = Zh(Qh(n[e]), r);
		if (a) {
			t.errors.push(`Row ${e + 1}: ${a}`);
			continue;
		}
		i && t.rows.push(i);
	}
	return t;
}
async function eg(e) {
	let t = {
		rows: [],
		errors: [],
		warnings: []
	}, n = new (await (import("./exceljs.min-DI2t47S_.js").then((e) => /* @__PURE__ */ Pt(e.default, 1)))).Workbook();
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
	let { mapped: s, unknownCols: c } = Xh(o);
	c.length && t.warnings.push(`Unknown columns ignored: ${c.join(", ")}`);
	for (let e = i + 1; e <= r.rowCount; e++) {
		let n = r.getRow(e);
		if (n.actualCellCount === 0) continue;
		let i = [];
		o.forEach((e, t) => {
			let r = n.getCell(t + 1).value;
			i[t] = r == null ? "" : typeof r == "object" && "text" in r ? String(r.text) : String(r);
		});
		let { row: a, error: c } = Zh(i, s);
		if (c) {
			t.errors.push(`Row ${e}: ${c}`);
			continue;
		}
		a && t.rows.push(a);
	}
	return t;
}
function tg() {
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
var ng = { class: "imp-modal" }, rg = { class: "imp-body" }, ig = { class: "imp-section" }, ag = {
	key: 0,
	class: "file-name"
}, og = {
	key: 0,
	class: "imp-section"
}, sg = {
	key: 0,
	class: "err-block"
}, cg = {
	key: 0,
	class: "err-more"
}, lg = {
	key: 1,
	class: "warn-block"
}, ug = {
	key: 2,
	class: "tbl-wrap"
}, dg = { class: "tbl" }, fg = {
	key: 0,
	class: "tbl-more"
}, pg = {
	key: 1,
	class: "imp-section"
}, mg = { class: "opt" }, hg = {
	key: 0,
	class: "mode-warning"
}, gg = ["disabled"], _g = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "ImportPanel",
	setup(n) {
		let r = K(), i = G(), { rebuildAll: a } = Jl(), u = S(null), f = S(""), p = S(!1), m = S(null), _ = S(!1), v = S(!1);
		function y() {
			r.showImport = !1;
		}
		async function x(e) {
			f.value = e.name;
			try {
				/\.xlsx$/i.test(e.name) ? m.value = await eg(await e.arrayBuffer()) : m.value = $h(await e.text());
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
			let e = new Blob([tg()], { type: "text/csv" }), t = document.createElement("a");
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
		}, [l("div", ng, [l("div", { class: "imp-head" }, [
			i[4] ||= l("span", { class: "imp-title" }, "Import Devices & Topology", -1),
			l("button", {
				class: "text-btn",
				onClick: k
			}, "Download CSV template"),
			l("button", {
				class: "text-btn",
				onClick: y
			}, "Close")
		]), l("div", rg, [
			l("section", ig, [
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
					}, "Choose CSV / XLSX"),
					i[5] ||= l("span", { class: "drop-hint" }, "or drop a file here", -1),
					f.value ? (b(), c("span", ag, T(f.value) + " · " + T(m.value?.rows.length ?? 0) + " rows", 1)) : s("", !0)
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
			m.value ? (b(), c("section", og, [
				i[9] ||= l("div", { class: "step-title" }, "2. Preview", -1),
				m.value.errors.length ? (b(), c("div", sg, [(b(!0), c(e, null, C(m.value.errors.slice(0, 5), (e, t) => (b(), c("div", {
					key: t,
					class: "err-line"
				}, T(e), 1))), 128)), m.value.errors.length > 5 ? (b(), c("div", cg, "… and " + T(m.value.errors.length - 5) + " more", 1)) : s("", !0)])) : s("", !0),
				m.value.warnings.length ? (b(), c("div", lg, [(b(!0), c(e, null, C(m.value.warnings, (e, t) => (b(), c("div", {
					key: t,
					class: "warn-line"
				}, T(e), 1))), 128))])) : s("", !0),
				m.value.rows.length ? (b(), c("div", ug, [l("table", dg, [i[8] ||= l("thead", null, [l("tr", null, [
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
				]))), 128))])]), m.value.rows.length > 12 ? (b(), c("div", fg, " … " + T(m.value.rows.length - 12) + " more rows ", 1)) : s("", !0)])) : s("", !0)
			])) : s("", !0),
			m.value && m.value.rows.length ? (b(), c("section", pg, [
				i[11] ||= l("div", { class: "step-title" }, "3. Import options", -1),
				l("label", mg, [N(l("input", {
					type: "checkbox",
					"onUpdate:modelValue": i[3] ||= (e) => _.value = e
				}, null, 512), [[D, _.value]]), i[10] ||= l("span", null, "Replace current scene (clear existing devices, spaces, links)", -1)]),
				E(r).mode === "edit" ? s("", !0) : (b(), c("div", hg, " Switch to Edit mode before importing topology data. ")),
				l("button", {
					class: "run-btn",
					disabled: E(r).mode !== "edit" || v.value,
					onClick: A
				}, " Import " + T(m.value.rows.length) + " devices ", 9, gg)
			])) : s("", !0)
		])])])) : s("", !0)]));
	}
}), [["__scopeId", "data-v-12a6c42e"]]), vg = {
	key: 0,
	class: "vs-wrap"
}, yg = { class: "vs-crumb" }, bg = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "ViewSwitcher",
	setup(e) {
		let t = K(), n = G(), r = new Set([
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
		return (e, n) => o.value ? (b(), c("div", vg, [l("span", yg, T(u.value), 1), l("button", {
			class: "vs-btn",
			onClick: n[0] ||= (e) => E(t).showOverview(),
			title: "Back to campus overview"
		}, " 🗺 Campus ")])) : s("", !0);
	}
}), [["__scopeId", "data-v-22d629ce"]]), xg = { class: "app" }, Sg = { class: "workspace" }, Cg = {
	key: 0,
	class: "left-dock"
}, wg = {
	class: "canvas-wrap",
	ref: "canvasWrap"
}, Tg = {
	key: 1,
	class: "right-dock"
}, Eg = {
	key: 0,
	class: "blast-banner"
}, Dg = { class: "blast-id" }, Og = /* @__PURE__ */ $(/* @__PURE__ */ p({
	__name: "App",
	setup(e) {
		let t = K(), r = G(), { saveCurrentView: a, loadSavedView: u, focusVirtualNode: p, onTimelineScrub: m, getScene: h, timeline: g } = Jl(), _ = S(null), v = S(!1), y = S(null), x = S(null);
		function C() {
			let e = h();
			y.value = e.camera, x.value = e.controls, v.value = !0;
		}
		function w(e) {
			t.enterScope(e);
		}
		function D(e) {
			a(e);
		}
		function O(e) {
			u(e);
		}
		function k(e) {
			p(e);
		}
		let A = i(() => r.devices.get(t.blastSourceId ?? "")?.hostname ?? t.blastSourceId), N = i(() => t.showAlertPanel || t.showCustomTypes || t.showBackgroundPanel || t.showRackServerList || t.showSpaceTree || t.showUnmapped), P = i(() => !!t.selectedDeviceId || !!t.selectedLinkId || !!t.selectedSpaceId || t.showSavedViews || t.showChangeLog || t.showVirtualNodes);
		return j(() => t.fontScale, (e) => {
			document.documentElement.style.setProperty("--ui-fs", String(e));
		}, { immediate: !0 }), (e, r) => (b(), c("div", xg, [
			f(su),
			f(xu),
			l("div", Sg, [
				N.value ? (b(), c("aside", Cg, [E(t).showAlertPanel ? (b(), o(Fu, { key: 0 })) : E(t).showCustomTypes ? (b(), o(Cd, { key: 1 })) : E(t).showBackgroundPanel ? (b(), o(of, { key: 2 })) : E(t).showRackServerList ? (b(), o(xf, { key: 3 })) : E(t).showSpaceTree ? (b(), o(Rf, { key: 4 })) : E(t).showUnmapped ? (b(), o(rp, { key: 5 })) : s("", !0)])) : s("", !0),
				l("div", wg, [
					E(t).viewMode === "2d" ? (b(), o(Oh, {
						key: 0,
						onEnterFloor: w
					})) : (b(), o(bh, {
						key: 1,
						ref_key: "sceneRef",
						ref: _,
						onSceneReady: C
					}, null, 512)),
					E(t).viewMode === "3d" ? (b(), o(bg, { key: 2 })) : s("", !0),
					E(t).viewMode === "3d" && v.value && E(t).showMinimap ? (b(), o(ph, {
						key: 3,
						camera: y.value,
						controls: x.value
					}, null, 8, ["camera", "controls"])) : s("", !0),
					E(t).viewMode === "3d" && v.value ? (b(), o(jh, { key: 4 })) : s("", !0)
				], 512),
				P.value ? (b(), c("aside", Tg, [
					E(t).selectedDeviceId ? (b(), o(Kp, { key: 0 })) : E(t).selectedLinkId ? (b(), o(cm, { key: 1 })) : E(t).selectedSpaceId ? (b(), o(Om, { key: 2 })) : s("", !0),
					E(t).showSavedViews ? (b(), o(Lm, {
						key: 3,
						onSaveView: D,
						onLoadView: O
					})) : s("", !0),
					E(t).showChangeLog ? (b(), o(Wm, { key: 4 })) : s("", !0),
					E(t).showVirtualNodes ? (b(), o(eh, {
						key: 5,
						onSelectNode: k
					})) : s("", !0)
				])) : s("", !0)
			]),
			E(t).showTimeline ? (b(), o(ch, {
				key: 0,
				timeline: E(g),
				onScrub: E(m),
				onLive: r[0] ||= (e) => E(t).timelineFrameIdx = -1
			}, null, 8, ["timeline", "onScrub"])) : s("", !0),
			f(Nh),
			f(Lh),
			f(Wh),
			f(_g),
			f(n, { name: "fade" }, {
				default: M(() => [E(t).blastSourceId ? (b(), c("div", Eg, [
					r[2] ||= d(" Impact radius ", -1),
					l("span", Dg, T(A.value), 1),
					r[3] ||= l("span", { class: "blast-legend" }, [l("span", { class: "blast-legend-item" }, [l("span", { class: "blast-dot blast-dot--hop1" }), d("1 hop")]), l("span", { class: "blast-legend-item" }, [l("span", { class: "blast-dot blast-dot--hop2" }), d("2 hop")])], -1),
					l("button", {
						class: "blast-close",
						onClick: r[1] ||= (e) => {
							E(t).blastSourceId = null, E(t).select(null);
						}
					}, "Close")
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-709dfa63"]]);
//#endregion
//#region src/index.ts
function kg(e) {
	if (!e.container) throw Error("createNmsEditor requires a container HTMLElement.");
	let t = e.container;
	ql(e);
	let n = Ag(e), r = a(Og), i = ee();
	r.provide(Wl, e), r.use(i), r.config.errorHandler = (t) => {
		let n = t instanceof Error ? t : Error(String(t));
		e.onError?.(n, { phase: "vue" });
	}, r.mount(n);
	let o = G(i), s = K(i);
	return {
		destroy() {
			r.unmount(), e.shadowDom && t.shadowRoot?.replaceChildren(), ql({});
		},
		upsertDevices(e) {
			o.upsertDevices(e);
		},
		removeDevices(e) {
			e.forEach((e) => {
				o.devices.delete(e), o.unmappedDevices.splice(0, o.unmappedDevices.length, ...o.unmappedDevices.filter((t) => t.id !== e));
			});
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
		getDevice: o.getDevice
	};
}
function Ag(e) {
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
export { kg as createNmsEditor, Ft as n, Mt as t };
