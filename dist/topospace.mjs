import { Fragment as e, Teleport as t, Transition as n, TransitionGroup as r, computed as i, createApp as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createStaticVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as m, nextTick as h, normalizeClass as g, normalizeStyle as _, onBeforeUnmount as v, onMounted as y, openBlock as b, reactive as x, ref as S, renderList as C, toDisplayString as w, unref as T, vModelCheckbox as E, vModelRadio as D, vModelSelect as O, vModelText as k, watch as A, withCtx as j, withDirectives as M, withKeys as N, withModifiers as P } from "vue";
import { createPinia as F, defineStore as I } from "pinia";
import * as L from "three";
import { AnimationClip as ee, BackSide as te, BatchedMesh as ne, Bone as re, Box3 as R, BufferAttribute as z, BufferGeometry as ie, ClampToEdgeWrapping as ae, Color as oe, ColorManagement as se, Controls as ce, DirectionalLight as le, DoubleSide as ue, FileLoader as de, FrontSide as fe, Group as pe, ImageBitmapLoader as me, InstancedBufferAttribute as he, InstancedMesh as ge, InterleavedBuffer as _e, InterleavedBufferAttribute as ve, Interpolant as ye, InterpolateDiscrete as be, InterpolateLinear as xe, Line as Se, Line3 as Ce, LineBasicMaterial as we, LineLoop as Te, LineSegments as Ee, LinearFilter as De, LinearMipmapLinearFilter as Oe, LinearMipmapNearestFilter as ke, LinearSRGBColorSpace as Ae, Loader as je, LoaderUtils as Me, MOUSE as Ne, Material as Pe, MathUtils as Fe, Matrix4 as Ie, Mesh as Le, MeshBasicMaterial as Re, MeshPhysicalMaterial as ze, MeshStandardMaterial as Be, MirroredRepeatWrapping as Ve, NearestFilter as He, NearestMipmapLinearFilter as Ue, NearestMipmapNearestFilter as We, NumberKeyframeTrack as Ge, Object3D as Ke, OrthographicCamera as qe, PerspectiveCamera as Je, Plane as Ye, PointLight as Xe, Points as Ze, PointsMaterial as Qe, PropertyBinding as $e, Quaternion as et, QuaternionKeyframeTrack as tt, REVISION as nt, Ray as rt, RepeatWrapping as it, SRGBColorSpace as at, Skeleton as ot, SkinnedMesh as st, Sphere as ct, Spherical as lt, SpotLight as ut, TOUCH as dt, Texture as ft, TextureLoader as pt, Triangle as mt, TriangleFanDrawMode as ht, TriangleStripDrawMode as gt, TrianglesDrawMode as _t, Vector2 as B, Vector3 as V, VectorKeyframeTrack as vt } from "three";
//#region \0rolldown/runtime.js
var yt = Object.create, bt = Object.defineProperty, xt = Object.getOwnPropertyDescriptor, St = Object.getOwnPropertyNames, Ct = Object.getPrototypeOf, wt = Object.prototype.hasOwnProperty, Tt = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), Et = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = St(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !wt.call(e, s) && s !== n && bt(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = xt(t, s)) || r.enumerable
	});
	return e;
}, Dt = (e, t, n) => (n = e == null ? {} : yt(Ct(e)), Et(t || !e || !e.__esModule ? bt(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), Ot = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), kt = {
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
	import: !1
}, At = {
	search: "",
	status: [],
	type: [],
	spaceId: null,
	tags: [],
	showUnmapped: !0
}, jt = class {
	features;
	resolver;
	mode = "view";
	constructor(e = {}, t) {
		this.features = {
			...kt,
			...e
		}, this.resolver = t ?? (() => !0);
	}
	setMode(e) {
		this.mode = e;
	}
	setFeatures(e) {
		this.features = {
			...kt,
			...e
		};
	}
	setResolver(e) {
		this.resolver = e;
	}
	can(e, t) {
		return e === "rawDevice:update" || e === "layout:update" && !this.features.layoutEdit || e.startsWith("space:") && !this.features.spaceEdit || e.startsWith("annotation:") && !this.features.annotationEdit || e.startsWith("topology:") && !this.features.topologyEdit || e === "device:map" && !this.features.layoutEdit || this.mode === "view" && [
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
function Mt() {
	return Math.random().toString(36).slice(2, 10);
}
function Nt(e, t) {
	return Math.random() * (t - e) + e;
}
function Pt(e, t) {
	return Math.floor(Nt(e, t + 1));
}
function Ft(e) {
	return e[Math.floor(Math.random() * e.length)];
}
var It = [
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
], Lt = {
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
function Rt(e, t, n) {
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
		ip: n === 0 ? `10.${Pt(1, 254)}.${Pt(1, 254)}.${Pt(1, 254)}` : void 0,
		status: Ft([
			"up",
			"up",
			"up",
			"down",
			"unknown"
		]),
		speed: Ft([
			100,
			1e3,
			1e4,
			25e3
		]),
		trafficIn: Nt(0, 900),
		trafficOut: Nt(0, 500),
		errors: Math.random() > .85 ? Pt(1, 50) : 0,
		discards: Math.random() > .9 ? Pt(1, 20) : 0
	}));
}
function zt(e, t, n, r) {
	let i = `dev-${Mt()}`, a = Ft(Lt[e]), o = Ft(It);
	return {
		device: {
			id: i,
			source: Ft([
				"zabbix",
				"prtg",
				"manual",
				"openNMS"
			]),
			externalId: `ext-${Mt()}`,
			hostname: `${e.slice(0, 3)}-${t.slice(-2)}-${String(r).padStart(2, "0")}`,
			ip: `10.${Pt(1, 4)}.${Pt(1, 254)}.${Pt(1, 254)}`,
			normalizedType: e,
			vendor: a,
			model: `${a}-Model-${Pt(100, 999)}`,
			status: o,
			metrics: {
				cpu: Nt(5, 98),
				memory: Nt(20, 95),
				disk: Nt(10, 90),
				networkIn: Nt(10, 950),
				networkOut: Nt(5, 500),
				temperature: Nt(35, 78)
			},
			siteId: n,
			firstSeenAt: (/* @__PURE__ */ new Date(Date.now() - Nt(0, 365) * 864e5)).toISOString(),
			lastSeenAt: (/* @__PURE__ */ new Date()).toISOString(),
			syncState: "active"
		},
		interfaces: Rt(i, e, e === "switch" ? 8 : e === "router" ? 6 : e === "firewall" ? 4 : 2)
	};
}
function Bt() {
	let e = [], t = [], n = [], r = [], i = [];
	[
		{
			id: "site-seoul",
			name: "Seoul DC",
			x: -60,
			z: 0
		},
		{
			id: "site-busan",
			name: "Busan DR",
			x: 0,
			z: 0
		},
		{
			id: "site-cloud",
			name: "Cloud (Tokyo)",
			x: 60,
			z: 0
		}
	].forEach((a, o) => {
		e.push({
			id: a.id,
			name: a.name,
			kind: o < 2 ? "physical" : "virtual",
			type: "site",
			source: "manual",
			position: {
				x: a.x,
				y: 0,
				z: a.z
			},
			size: {
				width: 50,
				height: .1,
				depth: 40
			}
		}), [{
			suffix: "-zone-net",
			name: "Network Zone",
			dx: -12,
			purpose: "network"
		}, {
			suffix: "-zone-srv",
			name: "Server Zone",
			dx: 12,
			purpose: "compute"
		}].forEach((s, c) => {
			let l = a.id + s.suffix;
			e.push({
				id: l,
				name: s.name,
				kind: "physical",
				type: "zone",
				parentId: a.id,
				source: "manual",
				position: {
					x: a.x + s.dx,
					y: 0,
					z: a.z
				},
				size: {
					width: 22,
					height: .1,
					depth: 38
				},
				color: c === 0 ? "#1e3a5f" : "#1a3a2a"
			});
			let u = 2.2;
			for (let d = 0; d < 3; d++) {
				let f = `${l}-rack-${d}`, p = a.x + s.dx + (d - 1) * 8, m = a.z, h = c === 0 ? [
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
					id: f,
					name: `Rack-${o + 1}${c + 1}${d + 1}`,
					kind: "physical",
					type: "rack",
					parentId: l,
					source: "manual",
					position: {
						x: p,
						y: 0,
						z: m
					},
					size: {
						width: 5.2,
						height: .3,
						depth: _ * u + .8
					}
				}), h.forEach((e, r) => {
					let { device: o, interfaces: s } = zt(e, l, a.id, r);
					t.push(o), i.push(...s);
					let c = r % 2, d = Math.floor(r / 2), h = (c - .5) * 2, v = (d - (_ - 1) / 2) * u, y = p + h, b = m + v;
					g.push({
						device: o,
						pos: {
							x: y,
							z: b
						}
					}), n.push({
						id: `map-${o.id}`,
						rawDeviceId: o.id,
						primarySpaceId: f,
						slotIndex: r,
						mappingStatus: "mapped",
						position: {
							x: y,
							y: .4,
							z: b
						},
						tags: [e, a.id],
						importance: o.status === "critical" ? "critical" : "normal",
						updatedAt: (/* @__PURE__ */ new Date()).toISOString()
					});
				});
				let v = g.find((e) => e.device.normalizedType === "switch");
				v && g.forEach((e) => {
					e.device.id !== v.device.id && r.push({
						id: `link-${Mt()}`,
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
		});
		let s = e.filter((e) => e.type === "rack" && e.parentId?.includes("zone-net") && e.parentId.startsWith(a.id)), c = e.filter((e) => e.type === "rack" && e.parentId?.includes("zone-srv") && e.parentId.startsWith(a.id));
		if (s[0] && c[0]) {
			let e = t.find((e) => e.normalizedType === "switch" && n.find((t) => t.rawDeviceId === e.id && t.primarySpaceId === s[0].id)), i = t.find((e) => e.normalizedType === "switch" && n.find((t) => t.rawDeviceId === e.id && t.primarySpaceId === c[0].id));
			e && i && r.push({
				id: `link-${Mt()}`,
				sourceDeviceId: e.id,
				targetDeviceId: i.id,
				type: "logical",
				status: "up",
				source: "discovered",
				confidence: "medium",
				label: "Core Link"
			});
		}
	});
	let a = t.find((e) => e.normalizedType === "router" && e.siteId === "site-seoul"), o = t.find((e) => e.normalizedType === "router" && e.siteId === "site-cloud");
	a && o && r.push({
		id: `link-${Mt()}`,
		sourceDeviceId: a.id,
		targetDeviceId: o.id,
		type: "service_dependency",
		status: "up",
		source: "manual",
		label: "WAN Link"
	});
	let s = [];
	return [
		"server",
		"switch",
		"firewall",
		"server",
		"database"
	].forEach((e, t) => {
		let { device: n } = zt(e, "unmapped", "site-seoul", t);
		n.syncState = "active", s.push(n);
	}), {
		spaces: e,
		devices: t,
		deviceMappings: n,
		links: r,
		interfaces: i,
		unmappedDevices: s
	};
}
//#endregion
//#region src/stores/editor.ts
var H = I("editor", () => {
	let e = new jt({
		topologyEdit: !0,
		layoutEdit: !0,
		spaceEdit: !0,
		annotationEdit: !0,
		import: !0
	}), t, n, r = S(/* @__PURE__ */ new Map()), a = S(/* @__PURE__ */ new Map()), o = S(/* @__PURE__ */ new Map()), s = S(/* @__PURE__ */ new Map()), c = S(/* @__PURE__ */ new Map()), l = S([]), u = S(/* @__PURE__ */ new Map()), d = S([]), f = S([]);
	function p(r) {
		r.mode && e.setMode(r.mode), r.features && e.setFeatures(r.features), r.permissionResolver && e.setResolver(r.permissionResolver), t = r.onPermissionDenied, n = r.onChange;
	}
	function m(t) {
		e.setMode(t);
	}
	function h(t, n) {
		return e.can(t, n);
	}
	function g(e, n) {
		t?.({
			action: e,
			target: n
		});
	}
	function _(e, t) {
		let n = h(e, t);
		return n || g(e, t), n;
	}
	function v(e, t) {
		n?.({
			type: e,
			target: t,
			source: "user",
			timestamp: Date.now()
		});
	}
	let y = i(() => {
		let e = /* @__PURE__ */ new Set();
		return o.value.forEach((t) => {
			(t.mappingStatus === "mapped" || t.mappingStatus === "auto_mapped") && e.add(t.rawDeviceId);
		}), e;
	}), b = i(() => [...r.value.values()].filter((e) => e.status === "critical").length), x = i(() => [...r.value.values()].filter((e) => e.status === "warning").length), C = i(() => {
		let e = /* @__PURE__ */ new Map();
		return o.value.forEach((t) => {
			if (!t.primarySpaceId) return;
			let n = r.value.get(t.rawDeviceId);
			n && (e.has(t.primarySpaceId) || e.set(t.primarySpaceId, []), e.get(t.primarySpaceId).push(n));
		}), e;
	}), w = i(() => {
		let e = /* @__PURE__ */ new Map();
		return c.value.forEach((t) => {
			e.has(t.rawDeviceId) || e.set(t.rawDeviceId, []), e.get(t.rawDeviceId).push(t);
		}), e;
	}), T = i(() => [...a.value.values()].filter((e) => e.type === "rack")), E = i(() => [...a.value.values()]);
	function D() {
		let e = Bt();
		r.value = new Map(e.devices.map((e) => [e.id, e])), a.value = new Map(e.spaces.map((e) => [e.id, e])), o.value = new Map(e.deviceMappings.map((e) => [e.id, e])), s.value = new Map(e.links.map((e) => [e.id, e])), c.value = new Map(e.interfaces.map((e) => [e.id, e])), l.value = e.unmappedDevices;
	}
	function O(e) {
		r.value = new Map((e.devices ?? []).map((e) => [e.id, e])), a.value = new Map((e.spaces ?? []).map((e) => [e.id, e])), o.value = new Map((e.deviceMappings ?? []).map((e) => [e.id, e])), s.value = new Map((e.links ?? []).map((e) => [e.id, e])), c.value = new Map((e.interfaces ?? []).map((e) => [e.id, e])), l.value = [...e.unmappedDevices ?? []], u.value = new Map((e.virtualNodes ?? []).map((e) => [e.id, e]));
	}
	function k(e, t, n) {
		let i = r.value.get(e);
		i && (i.status = t, n && Object.assign(i.metrics ??= {}, n));
	}
	function A(e, t) {
		let n = s.value.get(e);
		n && (n.status = t);
	}
	function j(e) {
		e.forEach((e) => {
			r.value.has(e.id) || l.value.push(e), r.value.set(e.id, e);
		});
	}
	function M(e) {
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
		return r.value.set(t, n), l.value.push(n), ue("device.add", `Device added (manual): ${e.hostname}`), n;
	}
	function N(e) {
		_("space:create", {
			id: e.id,
			spaceId: e.id
		}) && (a.value.set(e.id, e), v("space:create", {
			id: e.id,
			type: "space"
		}));
	}
	function P(e, t) {
		if (!_("space:update", {
			id: e,
			spaceId: e
		})) return;
		let n = a.value.get(e);
		n && Object.assign(n, t), v("space:update", {
			id: e,
			type: "space"
		});
	}
	function F(e) {
		if (!_("space:delete", {
			id: e,
			spaceId: e
		})) return;
		let t = a.value.get(e);
		t && (t.archived = !0), v("space:delete", {
			id: e,
			type: "space"
		});
	}
	function I(e, t, n, r) {
		if (!_("device:map", {
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
		o.value.set(i, a), l.value = l.value.filter((t) => t.id !== e), v("device:map", {
			id: e,
			type: "device"
		});
	}
	function L(e) {
		if (!_("device:unmap", { id: e })) return;
		let t = [...o.value.entries()].find(([, t]) => t.rawDeviceId === e);
		if (!t) return;
		let [n, i] = t;
		i.mappingStatus = "unmapped", i.primarySpaceId = void 0;
		let a = r.value.get(e);
		a && !l.value.find((t) => t.id === e) && l.value.push(a), o.value.delete(n), v("device:unmap", {
			id: e,
			type: "device"
		});
	}
	function ee(e, t) {
		if (!_("annotation:update", { id: e })) return;
		let n = [...o.value.values()].find((t) => t.rawDeviceId === e);
		n && Object.assign(n, t), v("annotation:update", {
			id: e,
			type: "device"
		});
	}
	function te(e, t) {
		if (!_("annotation:update", { id: e })) return;
		let n = z(e);
		n && (n.visualType = t), v("annotation:update", {
			id: e,
			type: "device"
		});
	}
	function ne(e) {
		_("topology:createLink", { id: e.id }) && (s.value.set(e.id, e), v("topology:createLink", {
			id: e.id,
			type: "link"
		}));
	}
	function re(e, t) {
		if (!_("topology:updateLink", { id: e })) return;
		let n = s.value.get(e);
		n && Object.assign(n, t), v("topology:updateLink", {
			id: e,
			type: "link"
		});
	}
	function R(e) {
		_("topology:deleteLink", { id: e }) && (s.value.delete(e), v("topology:deleteLink", {
			id: e,
			type: "link"
		}));
	}
	function z(e) {
		return [...o.value.values()].find((t) => t.rawDeviceId === e);
	}
	function ie(e) {
		let t = r.value.get(e);
		return t ? ve(t) : void 0;
	}
	function ae(e) {
		_("virtualNode:create", { id: e.id }) && (u.value.set(e.id, e), v("virtualNode:create", {
			id: e.id,
			type: "virtualNode"
		}));
	}
	function oe(e) {
		_("virtualNode:delete", { id: e }) && (u.value.delete(e), v("virtualNode:delete", {
			id: e,
			type: "virtualNode"
		}));
	}
	function se(e, t) {
		if (!_("virtualNode:update", { id: e })) return;
		let n = u.value.get(e);
		n && Object.assign(n, t), v("virtualNode:update", {
			id: e,
			type: "virtualNode"
		});
	}
	function ce(e) {
		d.value.unshift(e), d.value.length > 20 && d.value.pop();
	}
	function le(e) {
		let t = d.value.findIndex((t) => t.id === e);
		t >= 0 && d.value.splice(t, 1);
	}
	function ue(e, t) {
		f.value.unshift({
			id: Math.random().toString(36).slice(2),
			type: e,
			msg: t,
			ts: (/* @__PURE__ */ new Date()).toLocaleTimeString()
		}), f.value.length > 100 && f.value.pop();
	}
	function de(e) {
		if (!_("import")) return {
			devices: 0,
			spaces: 0,
			links: 0
		};
		let t = /* @__PURE__ */ new Map();
		e.forEach((e) => {
			let n = e.site || "Site", r = e.zone || "Default", i = e.rack || "Rack";
			t.has(n) || t.set(n, /* @__PURE__ */ new Map());
			let a = t.get(n);
			a.has(r) || a.set(r, /* @__PURE__ */ new Map());
			let o = a.get(r);
			o.has(i) || o.set(i, []), o.get(i).push(e);
		});
		let n = 2.2, i = [], c = [], l = [], u = [], d = /* @__PURE__ */ new Map(), f = 0;
		return [...t.entries()].forEach(([e, t], s) => {
			let u = `site-${fe(e)}-${s}`, p = [...t.entries()].map(([e, t]) => {
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
			}), m = p.reduce((e, t) => e + t.zoneW, 0) + Math.max(0, p.length - 1) * 6 + 8, h = Math.max(...p.map((e) => e.zoneD), 1) + 8, g = f + m / 2;
			f += m + 14;
			let _ = {
				id: u,
				name: e,
				kind: "physical",
				type: "site",
				source: "import",
				position: {
					x: g,
					y: 0,
					z: 0
				},
				size: {
					width: m,
					height: .1,
					depth: h
				}
			};
			a.value.set(_.id, _), i.push(_);
			let v = g - m / 2 + 8 / 2;
			p.forEach(({ zoneName: t, racks: s, zoneW: f, zoneD: p }, m) => {
				let h = `${u}-zone-${fe(t)}-${m}`, g = v + f / 2;
				v += f + 6;
				let _ = {
					id: h,
					name: t,
					kind: "physical",
					type: "zone",
					parentId: u,
					source: "import",
					position: {
						x: g,
						y: 0,
						z: 0
					},
					size: {
						width: f,
						height: .1,
						depth: p
					},
					color: pe(m)
				};
				a.value.set(_.id, _), i.push(_);
				let y = g - f / 2 + 4 / 2;
				s.forEach(({ rackName: t, devs: s, w: u, d: f, rows: p }, m) => {
					let g = `${h}-rack-${fe(t)}-${m}`, _ = y + u / 2;
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
		}), ue("import", `Imported ${c.length} devices, ${i.length} spaces, ${u.length} links`), {
			devices: c.length,
			spaces: i.length,
			links: u.length
		};
	}
	function fe(e) {
		return e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "x";
	}
	function pe(e) {
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
	function me() {
		return {
			version: "2.0",
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			spaces: [...a.value.values()],
			deviceMappings: [...o.value.values()],
			manualLinks: [...s.value.values()].filter((e) => e.source === "manual")
		};
	}
	function he(e) {
		if (!_("import")) return;
		let t = ge(e);
		t.spaces.forEach((e) => a.value.set(e.id, e)), t.deviceMappings.forEach((e) => o.value.set(e.id, e)), t.manualLinks.forEach((e) => s.value.set(e.id, e)), l.value = l.value.filter((e) => !t.deviceMappings.find((t) => t.rawDeviceId === e.id && t.mappingStatus === "mapped"));
	}
	function ge(e) {
		return _e(e);
	}
	function _e(e) {
		if (Array.isArray(e)) return e.map(_e);
		if (!e || typeof e != "object") return e;
		let t = {};
		return Object.entries(e).forEach(([e, n]) => {
			e === "__proto__" || e === "constructor" || e === "prototype" || (t[e] = _e(n));
		}), t;
	}
	function ve(e) {
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
		mappedDeviceIds: y,
		criticalCount: b,
		warningCount: x,
		devicesBySpace: C,
		interfacesByDevice: w,
		rackSpaces: T,
		allSpacesList: E,
		configureSecurity: p,
		setEditorMode: m,
		can: h,
		loadMockData: D,
		replaceData: O,
		updateDeviceStatus: k,
		updateLinkStatus: A,
		upsertDevices: j,
		addManualDevice: M,
		importTopology: de,
		addSpace: N,
		updateSpace: P,
		archiveSpace: F,
		mapDevice: I,
		unmapDevice: L,
		updateAnnotation: ee,
		setVisualType: te,
		addLink: ne,
		updateLink: re,
		removeLink: R,
		getMappingByDeviceId: z,
		getDevice: ie,
		virtualNodes: u,
		savedViews: d,
		changeLog: f,
		addVirtualNode: ae,
		removeVirtualNode: oe,
		updateVirtualNode: se,
		addSavedView: ce,
		removeSavedView: le,
		logChange: ue,
		exportSnapshot: me,
		importSnapshot: he
	};
}), U = I("ui", () => {
	let e = S("view"), t = S(null), n = S(null), r = S(!1), a = S(null), o = S(new Set([
		"physical",
		"logical",
		"service_dependency",
		"traffic_flow",
		"security_path",
		"manual",
		"inferred"
	])), s = S({ ...At }), c = S({
		visible: !1,
		x: 0,
		y: 0,
		sourceDeviceId: "",
		targetDeviceId: ""
	}), l = S(!0), u = S(!1), d = S(null), f = S(!1), p = S(!1), m = S(!1), h = S(!1), g = S(!1), _ = S(!0), v = S(!0), y = S(!0), b = S(!0), x = S(!1), C = S(!1), w = S(!1), T = S(!1), E = S(D());
	function D() {
		let e = parseFloat(localStorage.getItem("topospace.fontScale") ?? "");
		return Number.isFinite(e) && e >= .8 && e <= 1.6 ? e : 1.1;
	}
	function O(e) {
		E.value = Math.max(.8, Math.min(1.6, Math.round(e * 100) / 100)), localStorage.setItem("topospace.fontScale", String(E.value));
	}
	let k = S(-1), A = S(!1), j = S(!1), M = S(null), N = S([]);
	function P(e, t = "info") {
		let n = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
		N.value.push({
			id: n,
			message: e,
			type: t,
			timestamp: Date.now()
		}), N.value.length > 6 && N.value.shift(), setTimeout(() => F(n), 5e3);
	}
	function F(e) {
		let t = N.value.findIndex((t) => t.id === e);
		t >= 0 && N.value.splice(t, 1);
	}
	let I = S({
		visible: !1,
		x: 0,
		y: 0,
		deviceId: ""
	}), L = i(() => t.value?.type === "device" ? t.value.id : null), ee = i(() => t.value?.type === "space" ? t.value.id : null), te = i(() => t.value?.type === "link" ? t.value.id : null);
	function ne(t) {
		e.value = t, H().setEditorMode(t), t === "view" && (r.value = !1, a.value = null);
	}
	function re(e) {
		t.value = e, p.value = e?.type === "link";
	}
	function R() {
		if (e.value !== "edit") {
			r.value = !1, a.value = null;
			return;
		}
		r.value = !r.value, r.value || (a.value = null);
	}
	function z(e) {
		a.value = e;
	}
	function ie() {
		a.value = null;
	}
	function ae(e, t, n, r) {
		c.value = {
			visible: !0,
			x: e,
			y: t,
			sourceDeviceId: n,
			targetDeviceId: r
		};
	}
	function oe() {
		c.value.visible = !1, a.value = null;
	}
	function se(e) {
		o.value.has(e) ? o.value.delete(e) : o.value.add(e);
	}
	function ce(e) {
		Object.assign(s.value, e);
	}
	function le() {
		s.value = { ...At };
	}
	function ue(e, t, n) {
		I.value = {
			visible: !0,
			x: e,
			y: t,
			deviceId: n
		};
	}
	function de() {
		I.value.visible = !1;
	}
	return {
		mode: e,
		selection: t,
		hoveredId: n,
		linkToolActive: r,
		linkSourceDeviceId: a,
		visibleLinkTypes: o,
		filter: s,
		contextMenu: c,
		showUnmapped: l,
		showSpaceTree: f,
		showLinkProp: p,
		showRackServerList: u,
		selectedRackForList: d,
		showSavedViews: m,
		showChangeLog: h,
		showTimeline: g,
		showMinimap: _,
		showParticles: v,
		showBlastRadius: y,
		showVirtualNodes: b,
		showHelp: x,
		showImport: C,
		showAlertPanel: w,
		showCustomTypes: T,
		fontScale: E,
		setFontScale: O,
		timelineFrameIdx: k,
		timelineRecording: A,
		wsConnected: j,
		blastSourceId: M,
		tooltip: I,
		selectedDeviceId: L,
		selectedSpaceId: ee,
		selectedLinkId: te,
		setMode: ne,
		select: re,
		toggleLinkTool: R,
		startLinkFrom: z,
		cancelLinkDraft: ie,
		showContextMenu: ae,
		hideContextMenu: oe,
		toggleLinkType: se,
		setFilter: ce,
		resetFilter: le,
		showTooltipAt: ue,
		hideTooltip: de,
		toasts: N,
		addToast: P,
		removeToast: F
	};
});
//#endregion
//#region src/composables/useWebSocketSim.ts
function Vt() {
	let e = H(), t = U(), n = S(!1), r = S([]), i = [];
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
//#region src/components/layout/AppMenuBar.vue?vue&type=script&setup=true&lang.ts
var Ht = ["onMouseenter", "onClick"], Ut = { class: "menu-label" }, Wt = {
	key: 0,
	class: "menu-sep"
}, Gt = {
	key: 1,
	class: "menu-header"
}, Kt = ["disabled", "onClick"], qt = { class: "check-cell" }, Jt = { class: "item-label" }, Yt = { class: "shortcut" }, Xt = {
	key: 0,
	class: "status-pill on"
}, Zt = {
	key: 1,
	class: "status-pill off"
}, Qt = /* @__PURE__ */ p({
	__name: "AppMenuBar",
	setup(t) {
		let r = U(), a = H(), o = Vt(), u = S(null), d = i(() => r.wsConnected), p = [
			{
				label: "Alerts",
				key: "showAlertPanel"
			},
			{
				label: "Custom Types",
				key: "showCustomTypes"
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
		], m = [
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
		function h(e) {
			r.toggleLinkType(e);
		}
		function _() {
			o.connected.value ? (o.disconnect(), r.wsConnected = !1) : (o.connect(), r.wsConnected = !0);
		}
		let x = null, T = S(!1);
		function E() {
			if (T.value) {
				x && clearInterval(x), x = null, T.value = !1;
				return;
			}
			T.value = !0;
			let e = [
				"normal",
				"normal",
				"normal",
				"warning",
				"critical",
				"offline",
				"maintenance"
			];
			x = setInterval(() => {
				let t = [...a.devices.keys()];
				for (let n = 0; n < 3; n++) {
					let n = t[Math.floor(Math.random() * t.length)];
					a.updateDeviceStatus(n, e[Math.floor(Math.random() * e.length)]);
				}
			}, 1400);
		}
		let D = i(() => [
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
						action: _
					},
					{
						label: "Random simulator",
						checked: () => T.value,
						action: E
					}
				]
			},
			{
				label: "View",
				items: [
					{
						header: !0,
						label: "Panels"
					},
					...p.map((e) => ({
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
					...m.map((e) => ({
						label: e.label,
						checked: () => r.visibleLinkTypes.has(e.type),
						action: () => h(e.type)
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
				}]
			}
		]);
		function O(e) {
			u.value = u.value === e ? null : e;
		}
		function k(e) {
			u.value !== null && (u.value = e);
		}
		function A(e) {
			e.disabled?.() || (e.action?.(), M());
		}
		function M() {
			u.value = null;
		}
		function F(e) {
			e.target.closest(".menu-root") || M();
		}
		return y(() => document.addEventListener("mousedown", F)), v(() => document.removeEventListener("mousedown", F)), (t, r) => (b(), c("div", {
			class: "menubar",
			onKeydown: N(M, ["escape"])
		}, [
			r[1] ||= l("span", { class: "brand" }, "Topospace", -1),
			(b(!0), c(e, null, C(D.value, (t) => (b(), c("div", {
				key: t.label,
				class: g(["menu-root", { open: u.value === t.label }]),
				onMouseenter: (e) => k(t.label),
				onClick: (e) => O(t.label)
			}, [l("span", Ut, w(t.label), 1), f(n, { name: "menu-fade" }, {
				default: j(() => [u.value === t.label ? (b(), c("div", {
					key: 0,
					class: "menu-dropdown",
					onClick: r[0] ||= P(() => {}, ["stop"])
				}, [(b(!0), c(e, null, C(t.items, (t, n) => (b(), c(e, { key: n }, [t.separator ? (b(), c("div", Wt)) : t.header ? (b(), c("div", Gt, w(t.label), 1)) : (b(), c("button", {
					key: 2,
					class: g(["menu-item", {
						checked: t.checked?.(),
						disabled: t.disabled?.()
					}]),
					disabled: t.disabled?.(),
					onClick: P((e) => A(t), ["stop"])
				}, [
					l("span", qt, w(t.checked?.() ? "✓" : ""), 1),
					l("span", Jt, w(t.label), 1),
					l("span", Yt, w(t.shortcut ?? ""), 1)
				], 10, Kt))], 64))), 128))])) : s("", !0)]),
				_: 2
			}, 1024)], 42, Ht))), 128)),
			r[2] ||= l("div", { class: "spacer" }, null, -1),
			d.value ? (b(), c("span", Xt, "Live")) : (b(), c("span", Zt, "Offline"))
		], 32));
	}
}), W = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, $t = /* @__PURE__ */ W(Qt, [["__scopeId", "data-v-3cf5fdc5"]]), en = { class: "toolbar" }, tn = { class: "search-wrap" }, nn = { class: "chip critical" }, rn = { class: "chip warning" }, an = { class: "chip total" }, on = { class: "mode-switch" }, sn = ["disabled"], cn = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "TopToolbar",
	setup(e) {
		let t = H(), n = U(), r = i({
			get: () => n.filter.status[0] ?? "",
			set: (e) => n.setFilter({ status: e ? [e] : [] })
		});
		return (e, i) => (b(), c("header", en, [
			l("div", tn, [M(l("input", {
				"onUpdate:modelValue": i[0] ||= (e) => T(n).filter.search = e,
				placeholder: "Search name / IP",
				class: "search",
				onKeydown: i[1] ||= N((e) => T(n).resetFilter(), ["escape"])
			}, null, 544), [[k, T(n).filter.search]]), T(n).filter.search ? (b(), c("span", {
				key: 0,
				class: "clr",
				onClick: i[2] ||= (e) => T(n).filter.search = ""
			}, "Clear")) : s("", !0)]),
			M(l("select", {
				"onUpdate:modelValue": i[3] ||= (e) => r.value = e,
				class: "sel"
			}, [...i[8] ||= [u("<option value=\"\" data-v-b74254c0>All status</option><option value=\"critical\" data-v-b74254c0>Critical</option><option value=\"warning\" data-v-b74254c0>Warning</option><option value=\"normal\" data-v-b74254c0>Normal</option><option value=\"offline\" data-v-b74254c0>Offline</option><option value=\"maintenance\" data-v-b74254c0>Maintenance</option>", 6)]], 512), [[O, r.value]]),
			l("div", nn, [i[9] ||= d("Critical ", -1), l("b", null, w(T(t).criticalCount), 1)]),
			l("div", rn, [i[10] ||= d("Warning ", -1), l("b", null, w(T(t).warningCount), 1)]),
			l("div", an, [i[11] ||= d("Total ", -1), l("b", null, w(T(t).devices.size), 1)]),
			i[12] ||= l("div", { class: "spacer" }, null, -1),
			l("div", on, [l("button", {
				class: g(["mode-btn", T(n).mode === "view" ? "active" : ""]),
				onClick: i[4] ||= (e) => T(n).setMode("view")
			}, "View", 2), l("button", {
				class: g(["mode-btn", T(n).mode === "edit" ? "active" : ""]),
				onClick: i[5] ||= (e) => T(n).setMode("edit")
			}, "Edit", 2)]),
			l("button", {
				class: g(["btn", T(n).linkToolActive ? "btn-accent-on" : "btn-accent"]),
				disabled: T(n).mode !== "edit",
				onClick: i[6] ||= (e) => T(n).toggleLinkTool(),
				title: "Connect devices (L)"
			}, " Connect ", 10, sn),
			l("button", {
				class: g(["btn", T(n).showHelp ? "btn-on" : ""]),
				onClick: i[7] ||= (e) => T(n).showHelp = !T(n).showHelp
			}, "Help", 2)
		]));
	}
}), [["__scopeId", "data-v-b74254c0"]]), ln = { type: "change" }, un = { type: "start" }, dn = { type: "end" }, fn = new rt(), pn = new Ye(), mn = Math.cos(70 * Fe.DEG2RAD), G = new V(), hn = 2 * Math.PI, K = {
	NONE: -1,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2,
	TOUCH_ROTATE: 3,
	TOUCH_PAN: 4,
	TOUCH_DOLLY_PAN: 5,
	TOUCH_DOLLY_ROTATE: 6
}, gn = 1e-6, _n = class extends ce {
	constructor(e, t = null) {
		super(e, t), this.state = K.NONE, this.target = new V(), this.cursor = new V(), this.minDistance = 0, this.maxDistance = Infinity, this.minZoom = 0, this.maxZoom = Infinity, this.minTargetRadius = 0, this.maxTargetRadius = Infinity, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -Infinity, this.maxAzimuthAngle = Infinity, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
			LEFT: "ArrowLeft",
			UP: "ArrowUp",
			RIGHT: "ArrowRight",
			BOTTOM: "ArrowDown"
		}, this.mouseButtons = {
			LEFT: Ne.ROTATE,
			MIDDLE: Ne.DOLLY,
			RIGHT: Ne.PAN
		}, this.touches = {
			ONE: dt.ROTATE,
			TWO: dt.DOLLY_PAN
		}, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._cursorStyle = "auto", this._domElementKeyEvents = null, this._lastPosition = new V(), this._lastQuaternion = new et(), this._lastTargetPosition = new V(), this._quat = new et().setFromUnitVectors(e.up, new V(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new lt(), this._sphericalDelta = new lt(), this._scale = 1, this._panOffset = new V(), this._rotateStart = new B(), this._rotateEnd = new B(), this._rotateDelta = new B(), this._panStart = new B(), this._panEnd = new B(), this._panDelta = new B(), this._dollyStart = new B(), this._dollyEnd = new B(), this._dollyDelta = new B(), this._dollyDirection = new V(), this._mouse = new B(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = yn.bind(this), this._onPointerDown = vn.bind(this), this._onPointerUp = bn.bind(this), this._onContextMenu = Dn.bind(this), this._onMouseWheel = Cn.bind(this), this._onKeyDown = wn.bind(this), this._onTouchStart = Tn.bind(this), this._onTouchMove = En.bind(this), this._onMouseDown = xn.bind(this), this._onMouseMove = Sn.bind(this), this._interceptControlDown = On.bind(this), this._interceptControlUp = kn.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
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
		this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(ln), this.update(), this.state = K.NONE;
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
		G.copy(t).sub(this.target), G.applyQuaternion(this._quat), this._spherical.setFromVector3(G), this.autoRotate && this.state === K.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
		let n = this.minAzimuthAngle, r = this.maxAzimuthAngle;
		isFinite(n) && isFinite(r) && (n < -Math.PI ? n += hn : n > Math.PI && (n -= hn), r < -Math.PI ? r += hn : r > Math.PI && (r -= hn), n <= r ? this._spherical.theta = Math.max(n, Math.min(r, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + r) / 2 ? Math.max(n, this._spherical.theta) : Math.min(r, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
		let i = !1;
		if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
		else {
			let e = this._spherical.radius;
			this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), i = e != this._spherical.radius;
		}
		if (G.setFromSpherical(this._spherical), G.applyQuaternion(this._quatInverse), t.copy(this.target).add(G), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
			let e = null;
			if (this.object.isPerspectiveCamera) {
				let t = G.length();
				e = this._clampDistance(t * this._scale);
				let n = t - e;
				this.object.position.addScaledVector(this._dollyDirection, n), this.object.updateMatrixWorld(), i = !!n;
			} else if (this.object.isOrthographicCamera) {
				let t = new V(this._mouse.x, this._mouse.y, 0);
				t.unproject(this.object);
				let n = this.object.zoom;
				this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), i = n !== this.object.zoom;
				let r = new V(this._mouse.x, this._mouse.y, 0);
				r.unproject(this.object), this.object.position.sub(r).add(t), this.object.updateMatrixWorld(), e = G.length();
			} else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
			e !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position) : (fn.origin.copy(this.object.position), fn.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(fn.direction)) < mn ? this.object.lookAt(this.target) : (pn.setFromNormalAndCoplanarPoint(this.object.up, this.target), fn.intersectPlane(pn, this.target))));
		} else if (this.object.isOrthographicCamera) {
			let e = this.object.zoom;
			this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), e !== this.object.zoom && (this.object.updateProjectionMatrix(), i = !0);
		}
		return this._scale = 1, this._performCursorZoom = !1, i || this._lastPosition.distanceToSquared(this.object.position) > gn || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > gn || this._lastTargetPosition.distanceToSquared(this.target) > gn ? (this.dispatchEvent(ln), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
	}
	_getAutoRotationAngle(e) {
		return e === null ? hn / 60 / 60 * this.autoRotateSpeed : hn / 60 * this.autoRotateSpeed * e;
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
		G.setFromMatrixColumn(t, 0), G.multiplyScalar(-e), this._panOffset.add(G);
	}
	_panUp(e, t) {
		this.screenSpacePanning === !0 ? G.setFromMatrixColumn(t, 1) : (G.setFromMatrixColumn(t, 0), G.crossVectors(this.object.up, G)), G.multiplyScalar(e), this._panOffset.add(G);
	}
	_pan(e, t) {
		let n = this.domElement;
		if (this.object.isPerspectiveCamera) {
			let r = this.object.position;
			G.copy(r).sub(this.target);
			let i = G.length();
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
		this._rotateLeft(hn * this._rotateDelta.x / t.clientHeight), this._rotateUp(hn * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(hn * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
				break;
			case this.keys.BOTTOM:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-hn * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
				break;
			case this.keys.LEFT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(hn * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
				break;
			case this.keys.RIGHT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-hn * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
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
		this._rotateLeft(hn * this._rotateDelta.x / t.clientHeight), this._rotateUp(hn * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
		t === void 0 && (t = new B(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function vn(e) {
	this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e), this._cursorStyle === "grab" && (this.domElement.style.cursor = "grabbing")));
}
function yn(e) {
	this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function bn(e) {
	switch (this._removePointer(e), this._pointers.length) {
		case 0:
			this.domElement.releasePointerCapture(e.pointerId), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(dn), this.state = K.NONE, this._cursorStyle === "grab" && (this.domElement.style.cursor = "grab");
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
function xn(e) {
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
			this._handleMouseDownDolly(e), this.state = K.DOLLY;
			break;
		case Ne.ROTATE:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = K.PAN;
			} else {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = K.ROTATE;
			}
			break;
		case Ne.PAN:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = K.ROTATE;
			} else {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = K.PAN;
			}
			break;
		default: this.state = K.NONE;
	}
	this.state !== K.NONE && this.dispatchEvent(un);
}
function Sn(e) {
	switch (this.state) {
		case K.ROTATE:
			if (this.enableRotate === !1) return;
			this._handleMouseMoveRotate(e);
			break;
		case K.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseMoveDolly(e);
			break;
		case K.PAN:
			if (this.enablePan === !1) return;
			this._handleMouseMovePan(e);
			break;
	}
}
function Cn(e) {
	this.enabled === !1 || this.enableZoom === !1 || this.state !== K.NONE || (e.preventDefault(), this.dispatchEvent(un), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(dn));
}
function wn(e) {
	this.enabled !== !1 && this._handleKeyDown(e);
}
function Tn(e) {
	switch (this._trackPointer(e), this._pointers.length) {
		case 1:
			switch (this.touches.ONE) {
				case dt.ROTATE:
					if (this.enableRotate === !1) return;
					this._handleTouchStartRotate(e), this.state = K.TOUCH_ROTATE;
					break;
				case dt.PAN:
					if (this.enablePan === !1) return;
					this._handleTouchStartPan(e), this.state = K.TOUCH_PAN;
					break;
				default: this.state = K.NONE;
			}
			break;
		case 2:
			switch (this.touches.TWO) {
				case dt.DOLLY_PAN:
					if (this.enableZoom === !1 && this.enablePan === !1) return;
					this._handleTouchStartDollyPan(e), this.state = K.TOUCH_DOLLY_PAN;
					break;
				case dt.DOLLY_ROTATE:
					if (this.enableZoom === !1 && this.enableRotate === !1) return;
					this._handleTouchStartDollyRotate(e), this.state = K.TOUCH_DOLLY_ROTATE;
					break;
				default: this.state = K.NONE;
			}
			break;
		default: this.state = K.NONE;
	}
	this.state !== K.NONE && this.dispatchEvent(un);
}
function En(e) {
	switch (this._trackPointer(e), this.state) {
		case K.TOUCH_ROTATE:
			if (this.enableRotate === !1) return;
			this._handleTouchMoveRotate(e), this.update();
			break;
		case K.TOUCH_PAN:
			if (this.enablePan === !1) return;
			this._handleTouchMovePan(e), this.update();
			break;
		case K.TOUCH_DOLLY_PAN:
			if (this.enableZoom === !1 && this.enablePan === !1) return;
			this._handleTouchMoveDollyPan(e), this.update();
			break;
		case K.TOUCH_DOLLY_ROTATE:
			if (this.enableZoom === !1 && this.enableRotate === !1) return;
			this._handleTouchMoveDollyRotate(e), this.update();
			break;
		default: this.state = K.NONE;
	}
}
function Dn(e) {
	this.enabled !== !1 && e.preventDefault();
}
function On(e) {
	e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
function kn(e) {
	e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
//#endregion
//#region node_modules/three/examples/jsm/renderers/CSS2DRenderer.js
var An = class extends Ke {
	constructor(e = document.createElement("div")) {
		super(), this.isCSS2DObject = !0, this.element = e, this.element.style.position = "absolute", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.center = new B(.5, .5), this.addEventListener("removed", function() {
			this.traverse(function(e) {
				e.element && e.element instanceof e.element.ownerDocument.defaultView.Element && e.element.parentNode !== null && e.element.remove();
			});
		});
	}
	copy(e, t) {
		return super.copy(e, t), this.element = e.element.cloneNode(!0), this.center = e.center, this;
	}
}, jn = new V(), Mn = new Ie(), Nn = new Ie(), Pn = new V(), Fn = new V(), In = class {
	constructor(e = {}) {
		let t = this, n, r, i, a, o = { objects: /* @__PURE__ */ new WeakMap() }, s = e.element === void 0 ? document.createElement("div") : e.element;
		s.style.overflow = "hidden", this.domElement = s, this.sortObjects = !0, this.getSize = function() {
			return {
				width: n,
				height: r
			};
		}, this.render = function(e, t) {
			e.matrixWorldAutoUpdate === !0 && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === !0 && t.updateMatrixWorld(), Mn.copy(t.matrixWorldInverse), Nn.multiplyMatrices(t.projectionMatrix, Mn), l(e, e, t), this.sortObjects && f(e);
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
				jn.setFromMatrixPosition(e.matrixWorld), jn.applyMatrix4(Nn);
				let c = jn.z >= -1 && jn.z <= 1 && e.layers.test(r.layers) === !0, l = e.element;
				l.style.display = c === !0 ? "" : "none", c === !0 && (e.onBeforeRender(t, n, r), l.style.transform = "translate(" + -100 * e.center.x + "%," + -100 * e.center.y + "%)translate(" + (jn.x * i + i) + "px," + (-jn.y * a + a) + "px)", l.parentNode !== s && s.appendChild(l), e.onAfterRender(t, n, r));
				let d = { distanceToCameraSquared: u(r, e) };
				o.objects.set(e, d);
			}
			for (let t = 0, i = e.children.length; t < i; t++) l(e.children[t], n, r);
		}
		function u(e, t) {
			return Pn.setFromMatrixPosition(e.matrixWorld), Fn.setFromMatrixPosition(t.matrixWorld), Pn.distanceToSquared(Fn);
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
}, Ln = class {
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
	init(e, t, n, r = {}) {
		this._wrapper = n, this._canvas = e, this._overlayEl = t, this._onError = r.onError, this.renderer = new L.WebGLRenderer({
			canvas: e,
			antialias: !0,
			logarithmicDepthBuffer: !0
		}), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.shadowMap.enabled = !0, this.css2dRenderer = new In(), this.css2dRenderer.domElement.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;", t.appendChild(this.css2dRenderer.domElement), this.scene = new L.Scene(), this.scene.background = new L.Color(527384), this.scene.fog = new L.FogExp2(527384, .005), this.camera = new L.PerspectiveCamera(55, 1, .1, 1e3), this.camera.position.set(0, 60, 80), this.camera.lookAt(0, 0, 0), this.controls = new _n(this.camera, e), this.controls.enableDamping = !0, this.controls.dampingFactor = .06, this.controls.maxPolarAngle = Math.PI / 2.05, this.controls.minDistance = 3, this.controls.maxDistance = 220, this._setupLights(), this._setupGrid(), this.resize(), window.addEventListener("resize", this.resize), this._resizeObserver = new ResizeObserver(() => this.resize()), this._resizeObserver.observe(n), e.addEventListener("webglcontextlost", this.onWebglContextLost), e.addEventListener("webglcontextrestored", this.onWebglContextRestored);
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
		this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t), this.css2dRenderer.setSize(e, t);
	};
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
}, Rn = {
	normal: "#22c55e",
	warning: "#eab308",
	critical: "#ef4444",
	offline: "#374151",
	unknown: "#6b7280",
	maintenance: "#3b82f6",
	acknowledged: "#f59e0b",
	stale: "#78716c"
}, zn = Object.fromEntries(Object.entries(Rn).map(([e, t]) => [e, new L.Color(t)])), Bn = {
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
}, Vn = {
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
}, Hn = {
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
}, Un = {
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
}, Wn = {
	normal: "Normal",
	warning: "Warning",
	critical: "Critical",
	offline: "Offline",
	unknown: "Unknown",
	maintenance: "Maintenance",
	acknowledged: "Acknowledged",
	stale: "Stale"
}, Gn = /* @__PURE__ */ new Map(), Kn = /* @__PURE__ */ new Map(), qn = /* @__PURE__ */ new Map();
function Jn(e) {
	Gn.clear(), Kn.clear(), qn.clear(), e.forEach((e) => {
		Gn.set(e.id, e.color), Kn.set(e.id, e.abbr), qn.set(e.id, e.label);
	});
}
function Yn(e) {
	return Gn.get(e) ?? Bn[e] ?? "#6b7280";
}
//#endregion
//#region src/utils/modelStorage.ts
var Xn = "topospace-models", Zn = "models", Qn = 1;
function $n() {
	return new Promise((e, t) => {
		let n = indexedDB.open(Xn, Qn);
		n.onupgradeneeded = () => n.result.createObjectStore(Zn), n.onsuccess = () => e(n.result), n.onerror = () => t(n.error);
	});
}
async function er(e, t) {
	let n = await $n();
	return new Promise((r, i) => {
		let a = n.transaction(Zn, "readwrite"), o = a.objectStore(Zn).put(t, e);
		o.onsuccess = () => r(), o.onerror = () => i(o.error), a.oncomplete = () => n.close();
	});
}
async function tr(e) {
	let t = await $n();
	return new Promise((n, r) => {
		let i = t.transaction(Zn, "readonly").objectStore(Zn).get(e);
		i.onsuccess = () => {
			n(i.result ?? null), t.close();
		}, i.onerror = () => r(i.error);
	});
}
async function nr(e) {
	let t = await $n();
	return new Promise((n, r) => {
		let i = t.transaction(Zn, "readwrite"), a = i.objectStore(Zn).delete(e);
		a.onsuccess = () => n(), a.onerror = () => r(a.error), i.oncomplete = () => t.close();
	});
}
//#endregion
//#region node_modules/three/examples/jsm/utils/BufferGeometryUtils.js
function rr(e, t = !1) {
	let n = e[0].index !== null, r = new Set(Object.keys(e[0].attributes)), i = new Set(Object.keys(e[0].morphAttributes)), a = {}, o = {}, s = e[0].morphTargetsRelative, c = new ie(), l = 0;
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
		let t = ir(a[e]);
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
				let r = ir(t);
				if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
				c.morphAttributes[e].push(r);
			}
		}
	}
	return c;
}
function ir(e) {
	let t, n, r, i = -1, a = 0;
	for (let o = 0; o < e.length; ++o) {
		let s = e[o];
		if (t === void 0 && (t = s.array.constructor), t !== s.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
		if (n === void 0 && (n = s.itemSize), n !== s.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
		if (r === void 0 && (r = s.normalized), r !== s.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
		if (i === -1 && (i = s.gpuType), i !== s.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
		a += s.count * n;
	}
	let o = new t(a), s = new z(o, n, r), c = 0;
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
function ar(e, t) {
	if (t === _t) return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), e;
	if (t === ht || t === gt) {
		let n = e.getIndex();
		if (n === null) {
			let t = [], r = e.getAttribute("position");
			if (r !== void 0) {
				for (let e = 0; e < r.count; e++) t.push(e);
				e.setIndex(t), n = e.getIndex();
			} else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), e;
		}
		let r = n.count - 2, i = [];
		if (t === ht) for (let e = 1; e <= r; e++) i.push(n.getX(0)), i.push(n.getX(e)), i.push(n.getX(e + 1));
		else for (let e = 0; e < r; e++) e % 2 == 0 ? (i.push(n.getX(e)), i.push(n.getX(e + 1)), i.push(n.getX(e + 2))) : (i.push(n.getX(e + 2)), i.push(n.getX(e + 1)), i.push(n.getX(e)));
		i.length / 3 !== r && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
		let a = e.clone();
		return a.setIndex(i), a.clearGroups(), a;
	} else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", t), e;
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
			return new pr(e);
		}), this.register(function(e) {
			return new mr(e);
		}), this.register(function(e) {
			return new Cr(e);
		}), this.register(function(e) {
			return new wr(e);
		}), this.register(function(e) {
			return new Tr(e);
		}), this.register(function(e) {
			return new gr(e);
		}), this.register(function(e) {
			return new _r(e);
		}), this.register(function(e) {
			return new vr(e);
		}), this.register(function(e) {
			return new yr(e);
		}), this.register(function(e) {
			return new fr(e);
		}), this.register(function(e) {
			return new br(e);
		}), this.register(function(e) {
			return new hr(e);
		}), this.register(function(e) {
			return new Sr(e);
		}), this.register(function(e) {
			return new xr(e);
		}), this.register(function(e) {
			return new ur(e);
		}), this.register(function(e) {
			return new Er(e, J.EXT_MESHOPT_COMPRESSION);
		}), this.register(function(e) {
			return new Er(e, J.KHR_MESHOPT_COMPRESSION);
		}), this.register(function(e) {
			return new Dr(e);
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
		}, s = new de(this.manager);
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
		else if (e instanceof ArrayBuffer) if (s.decode(new Uint8Array(e, 0, 4)) === Or) {
			try {
				a[J.KHR_BINARY_GLTF] = new jr(e);
			} catch (e) {
				r && r(e);
				return;
			}
			i = JSON.parse(a[J.KHR_BINARY_GLTF].content);
		} else i = JSON.parse(s.decode(e));
		else i = e;
		if (i.asset === void 0 || i.asset.version[0] < 2) {
			r && r(/* @__PURE__ */ Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
			return;
		}
		let c = new ri(i, {
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
				case J.KHR_MATERIALS_UNLIT:
					a[t] = new dr();
					break;
				case J.KHR_DRACO_MESH_COMPRESSION:
					a[t] = new Mr(i, this.dracoLoader);
					break;
				case J.KHR_TEXTURE_TRANSFORM:
					a[t] = new Nr();
					break;
				case J.KHR_MESH_QUANTIZATION:
					a[t] = new Pr();
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
function q(e, t, n) {
	let r = e.json.materials[t];
	return r.extensions && r.extensions[n] ? r.extensions[n] : null;
}
var J = {
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
}, ur = class {
	constructor(e) {
		this.parser = e, this.name = J.KHR_LIGHTS_PUNCTUAL, this.cache = {
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
		let i = t.json, a = ((i.extensions && i.extensions[this.name] || {}).lights || [])[e], o, s = new oe(16777215);
		a.color !== void 0 && s.setRGB(a.color[0], a.color[1], a.color[2], Ae);
		let c = a.range === void 0 ? 0 : a.range;
		switch (a.type) {
			case "directional":
				o = new le(s), o.target.position.set(0, 0, -1), o.add(o.target);
				break;
			case "point":
				o = new Xe(s), o.distance = c;
				break;
			case "spot":
				o = new ut(s), o.distance = c, a.spot = a.spot || {}, a.spot.innerConeAngle = a.spot.innerConeAngle === void 0 ? 0 : a.spot.innerConeAngle, a.spot.outerConeAngle = a.spot.outerConeAngle === void 0 ? Math.PI / 4 : a.spot.outerConeAngle, o.angle = a.spot.outerConeAngle, o.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle, o.target.position.set(0, 0, -1), o.add(o.target);
				break;
			default: throw Error("THREE.GLTFLoader: Unexpected light type: " + a.type);
		}
		return o.position.set(0, 0, 0), Yr(o, a), a.intensity !== void 0 && (o.intensity = a.intensity), o.name = t.createUniqueName(a.name || "light_" + e), r = Promise.resolve(o), t.cache.add(n, r), r;
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
}, dr = class {
	constructor() {
		this.name = J.KHR_MATERIALS_UNLIT;
	}
	getMaterialType() {
		return Re;
	}
	extendParams(e, t, n) {
		let r = [];
		e.color = new oe(1, 1, 1), e.opacity = 1;
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
}, fr = class {
	constructor(e) {
		this.parser = e, this.name = J.KHR_MATERIALS_EMISSIVE_STRENGTH;
	}
	extendMaterialParams(e, t) {
		let n = q(this.parser, e, this.name);
		return n === null || n.emissiveStrength !== void 0 && (t.emissiveIntensity = n.emissiveStrength), Promise.resolve();
	}
}, pr = class {
	constructor(e) {
		this.parser = e, this.name = J.KHR_MATERIALS_CLEARCOAT;
	}
	getMaterialType(e) {
		return q(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = q(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		if (n.clearcoatFactor !== void 0 && (t.clearcoat = n.clearcoatFactor), n.clearcoatTexture !== void 0 && r.push(this.parser.assignTexture(t, "clearcoatMap", n.clearcoatTexture)), n.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = n.clearcoatRoughnessFactor), n.clearcoatRoughnessTexture !== void 0 && r.push(this.parser.assignTexture(t, "clearcoatRoughnessMap", n.clearcoatRoughnessTexture)), n.clearcoatNormalTexture !== void 0 && (r.push(this.parser.assignTexture(t, "clearcoatNormalMap", n.clearcoatNormalTexture)), n.clearcoatNormalTexture.scale !== void 0)) {
			let e = n.clearcoatNormalTexture.scale;
			t.clearcoatNormalScale = new B(e, e);
		}
		return Promise.all(r);
	}
}, mr = class {
	constructor(e) {
		this.parser = e, this.name = J.KHR_MATERIALS_DISPERSION;
	}
	getMaterialType(e) {
		return q(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = q(this.parser, e, this.name);
		return n === null || (t.dispersion = n.dispersion === void 0 ? 0 : n.dispersion), Promise.resolve();
	}
}, hr = class {
	constructor(e) {
		this.parser = e, this.name = J.KHR_MATERIALS_IRIDESCENCE;
	}
	getMaterialType(e) {
		return q(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = q(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		return n.iridescenceFactor !== void 0 && (t.iridescence = n.iridescenceFactor), n.iridescenceTexture !== void 0 && r.push(this.parser.assignTexture(t, "iridescenceMap", n.iridescenceTexture)), n.iridescenceIor !== void 0 && (t.iridescenceIOR = n.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), n.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum), n.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum), n.iridescenceThicknessTexture !== void 0 && r.push(this.parser.assignTexture(t, "iridescenceThicknessMap", n.iridescenceThicknessTexture)), Promise.all(r);
	}
}, gr = class {
	constructor(e) {
		this.parser = e, this.name = J.KHR_MATERIALS_SHEEN;
	}
	getMaterialType(e) {
		return q(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = q(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		if (t.sheenColor = new oe(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1, n.sheenColorFactor !== void 0) {
			let e = n.sheenColorFactor;
			t.sheenColor.setRGB(e[0], e[1], e[2], Ae);
		}
		return n.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = n.sheenRoughnessFactor), n.sheenColorTexture !== void 0 && r.push(this.parser.assignTexture(t, "sheenColorMap", n.sheenColorTexture, at)), n.sheenRoughnessTexture !== void 0 && r.push(this.parser.assignTexture(t, "sheenRoughnessMap", n.sheenRoughnessTexture)), Promise.all(r);
	}
}, _r = class {
	constructor(e) {
		this.parser = e, this.name = J.KHR_MATERIALS_TRANSMISSION;
	}
	getMaterialType(e) {
		return q(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = q(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		return n.transmissionFactor !== void 0 && (t.transmission = n.transmissionFactor), n.transmissionTexture !== void 0 && r.push(this.parser.assignTexture(t, "transmissionMap", n.transmissionTexture)), Promise.all(r);
	}
}, vr = class {
	constructor(e) {
		this.parser = e, this.name = J.KHR_MATERIALS_VOLUME;
	}
	getMaterialType(e) {
		return q(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = q(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		t.thickness = n.thicknessFactor === void 0 ? 0 : n.thicknessFactor, n.thicknessTexture !== void 0 && r.push(this.parser.assignTexture(t, "thicknessMap", n.thicknessTexture)), t.attenuationDistance = n.attenuationDistance || Infinity;
		let i = n.attenuationColor || [
			1,
			1,
			1
		];
		return t.attenuationColor = new oe().setRGB(i[0], i[1], i[2], Ae), Promise.all(r);
	}
}, yr = class {
	constructor(e) {
		this.parser = e, this.name = J.KHR_MATERIALS_IOR;
	}
	getMaterialType(e) {
		return q(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = q(this.parser, e, this.name);
		return n === null ? Promise.resolve() : (t.ior = n.ior === void 0 ? 1.5 : n.ior, t.ior === 0 && (t.ior = 1e3), Promise.resolve());
	}
}, br = class {
	constructor(e) {
		this.parser = e, this.name = J.KHR_MATERIALS_SPECULAR;
	}
	getMaterialType(e) {
		return q(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = q(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		t.specularIntensity = n.specularFactor === void 0 ? 1 : n.specularFactor, n.specularTexture !== void 0 && r.push(this.parser.assignTexture(t, "specularIntensityMap", n.specularTexture));
		let i = n.specularColorFactor || [
			1,
			1,
			1
		];
		return t.specularColor = new oe().setRGB(i[0], i[1], i[2], Ae), n.specularColorTexture !== void 0 && r.push(this.parser.assignTexture(t, "specularColorMap", n.specularColorTexture, at)), Promise.all(r);
	}
}, xr = class {
	constructor(e) {
		this.parser = e, this.name = J.EXT_MATERIALS_BUMP;
	}
	getMaterialType(e) {
		return q(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = q(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		return t.bumpScale = n.bumpFactor === void 0 ? 1 : n.bumpFactor, n.bumpTexture !== void 0 && r.push(this.parser.assignTexture(t, "bumpMap", n.bumpTexture)), Promise.all(r);
	}
}, Sr = class {
	constructor(e) {
		this.parser = e, this.name = J.KHR_MATERIALS_ANISOTROPY;
	}
	getMaterialType(e) {
		return q(this.parser, e, this.name) === null ? null : ze;
	}
	extendMaterialParams(e, t) {
		let n = q(this.parser, e, this.name);
		if (n === null) return Promise.resolve();
		let r = [];
		return n.anisotropyStrength !== void 0 && (t.anisotropy = n.anisotropyStrength), n.anisotropyRotation !== void 0 && (t.anisotropyRotation = n.anisotropyRotation), n.anisotropyTexture !== void 0 && r.push(this.parser.assignTexture(t, "anisotropyMap", n.anisotropyTexture)), Promise.all(r);
	}
}, Cr = class {
	constructor(e) {
		this.parser = e, this.name = J.KHR_TEXTURE_BASISU;
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
}, wr = class {
	constructor(e) {
		this.parser = e, this.name = J.EXT_TEXTURE_WEBP;
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
}, Tr = class {
	constructor(e) {
		this.parser = e, this.name = J.EXT_TEXTURE_AVIF;
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
}, Dr = class {
	constructor(e) {
		this.name = J.EXT_MESH_GPU_INSTANCING, this.parser = e;
	}
	createNodeMesh(e) {
		let t = this.parser.json, n = t.nodes[e];
		if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0) return null;
		let r = t.meshes[n.mesh];
		for (let e of r.primitives) if (e.mode !== Rr.TRIANGLES && e.mode !== Rr.TRIANGLE_STRIP && e.mode !== Rr.TRIANGLE_FAN && e.mode !== void 0) return null;
		let i = n.extensions[this.name].attributes, a = [], o = {};
		for (let e in i) a.push(this.parser.getDependency("accessor", i[e]).then((t) => (o[e] = t, o[e])));
		return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((e) => {
			let t = e.pop(), n = t.isGroup ? t.children : [t], r = e[0].count, i = [];
			for (let e of n) {
				let t = new Ie(), n = new V(), a = new et(), s = new V(1, 1, 1), c = new ge(e.geometry, e.material, r);
				for (let e = 0; e < r; e++) o.TRANSLATION && n.fromBufferAttribute(o.TRANSLATION, e), o.ROTATION && a.fromBufferAttribute(o.ROTATION, e), o.SCALE && s.fromBufferAttribute(o.SCALE, e), c.setMatrixAt(e, t.compose(n, a, s));
				for (let t in o) if (t === "_COLOR_0") {
					let e = o[t];
					c.instanceColor = new he(e.array, e.itemSize, e.normalized);
				} else t !== "TRANSLATION" && t !== "ROTATION" && t !== "SCALE" && e.geometry.setAttribute(t, o[t]);
				Ke.prototype.copy.call(c, e), this.parser.assignFinalMaterial(c), i.push(c);
			}
			return t.isGroup ? (t.clear(), t.add(...i), t) : i[0];
		}));
	}
}, Or = "glTF", kr = 12, Ar = {
	JSON: 1313821514,
	BIN: 5130562
}, jr = class {
	constructor(e) {
		this.name = J.KHR_BINARY_GLTF, this.content = null, this.body = null;
		let t = new DataView(e, 0, kr), n = new TextDecoder();
		if (this.header = {
			magic: n.decode(new Uint8Array(e.slice(0, 4))),
			version: t.getUint32(4, !0),
			length: t.getUint32(8, !0)
		}, this.header.magic !== Or) throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
		if (this.header.version < 2) throw Error("THREE.GLTFLoader: Legacy binary file detected.");
		let r = this.header.length - kr, i = new DataView(e, kr), a = 0;
		for (; a < r;) {
			let t = i.getUint32(a, !0);
			a += 4;
			let r = i.getUint32(a, !0);
			if (a += 4, r === Ar.JSON) {
				let r = new Uint8Array(e, kr + a, t);
				this.content = n.decode(r);
			} else if (r === Ar.BIN) {
				let n = kr + a;
				this.body = e.slice(n, n + t);
			}
			a += t;
		}
		if (this.content === null) throw Error("THREE.GLTFLoader: JSON content not found.");
	}
}, Mr = class {
	constructor(e, t) {
		if (!t) throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
		this.name = J.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
	}
	decodePrimitive(e, t) {
		let n = this.json, r = this.dracoLoader, i = e.extensions[this.name].bufferView, a = e.extensions[this.name].attributes, o = {}, s = {}, c = {};
		for (let e in a) {
			let t = Ur[e] || e.toLowerCase();
			o[t] = a[e];
		}
		for (let t in e.attributes) {
			let r = Ur[t] || t.toLowerCase();
			if (a[t] !== void 0) {
				let i = n.accessors[e.attributes[t]];
				c[r] = zr[i.componentType].name, s[r] = i.normalized === !0;
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
}, Nr = class {
	constructor() {
		this.name = J.KHR_TEXTURE_TRANSFORM;
	}
	extendTexture(e, t) {
		return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 ? e : (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0, e);
	}
}, Pr = class {
	constructor() {
		this.name = J.KHR_MESH_QUANTIZATION;
	}
}, Fr = class extends ye {
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
}, Ir = new et(), Lr = class extends Fr {
	interpolate_(e, t, n, r) {
		let i = super.interpolate_(e, t, n, r);
		return Ir.fromArray(i).normalize().toArray(i), i;
	}
}, Rr = {
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
}, zr = {
	5120: Int8Array,
	5121: Uint8Array,
	5122: Int16Array,
	5123: Uint16Array,
	5125: Uint32Array,
	5126: Float32Array
}, Br = {
	9728: He,
	9729: De,
	9984: We,
	9985: ke,
	9986: Ue,
	9987: Oe
}, Vr = {
	33071: ae,
	33648: Ve,
	10497: it
}, Hr = {
	SCALAR: 1,
	VEC2: 2,
	VEC3: 3,
	VEC4: 4,
	MAT2: 4,
	MAT3: 9,
	MAT4: 16
}, Ur = {
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
}, Wr = {
	scale: "scale",
	translation: "position",
	rotation: "quaternion",
	weights: "morphTargetInfluences"
}, Gr = {
	CUBICSPLINE: void 0,
	LINEAR: xe,
	STEP: be
}, Kr = {
	OPAQUE: "OPAQUE",
	MASK: "MASK",
	BLEND: "BLEND"
};
function qr(e) {
	return e.DefaultMaterial === void 0 && (e.DefaultMaterial = new Be({
		color: 16777215,
		emissive: 0,
		metalness: 1,
		roughness: 1,
		transparent: !1,
		depthTest: !0,
		side: fe
	})), e.DefaultMaterial;
}
function Jr(e, t, n) {
	for (let r in n.extensions) e[r] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[r] = n.extensions[r]);
}
function Yr(e, t) {
	t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function Xr(e, t, n) {
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
function Zr(e, t) {
	if (e.updateMorphTargets(), t.weights !== void 0) for (let n = 0, r = t.weights.length; n < r; n++) e.morphTargetInfluences[n] = t.weights[n];
	if (t.extras && Array.isArray(t.extras.targetNames)) {
		let n = t.extras.targetNames;
		if (e.morphTargetInfluences.length === n.length) {
			e.morphTargetDictionary = {};
			for (let t = 0, r = n.length; t < r; t++) e.morphTargetDictionary[n[t]] = t;
		} else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
	}
}
function Qr(e) {
	let t, n = e.extensions && e.extensions[J.KHR_DRACO_MESH_COMPRESSION];
	if (t = n ? "draco:" + n.bufferView + ":" + n.indices + ":" + $r(n.attributes) : e.indices + ":" + $r(e.attributes) + ":" + e.mode, e.targets !== void 0) for (let n = 0, r = e.targets.length; n < r; n++) t += ":" + $r(e.targets[n]);
	return t;
}
function $r(e) {
	let t = "", n = Object.keys(e).sort();
	for (let r = 0, i = n.length; r < i; r++) t += n[r] + ":" + e[n[r]] + ";";
	return t;
}
function ei(e) {
	switch (e) {
		case Int8Array: return 1 / 127;
		case Uint8Array: return 1 / 255;
		case Int16Array: return 1 / 32767;
		case Uint16Array: return 1 / 65535;
		default: throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
	}
}
function ti(e) {
	return e.search(/\.jpe?g($|\?)/i) > 0 || e.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : e.search(/\.webp($|\?)/i) > 0 || e.search(/^data\:image\/webp/) === 0 ? "image/webp" : e.search(/\.ktx2($|\?)/i) > 0 || e.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
var ni = new Ie(), ri = class {
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
		typeof createImageBitmap > "u" || n && r < 17 || i && a < 98 ? this.textureLoader = new pt(this.options.manager) : this.textureLoader = new me(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new de(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
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
			return Jr(i, a, r), Yr(a, r), Promise.all(n._invokeAll(function(e) {
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
		if (t.uri === void 0 && e === 0) return Promise.resolve(this.extensions[J.KHR_BINARY_GLTF].body);
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
			let e = Hr[r.type], t = zr[r.componentType], n = r.normalized === !0, i = new t(r.count * e);
			return Promise.resolve(new z(i, e, n));
		}
		let i = [];
		return r.bufferView === void 0 ? i.push(null) : i.push(this.getDependency("bufferView", r.bufferView)), r.sparse !== void 0 && (i.push(this.getDependency("bufferView", r.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", r.sparse.values.bufferView))), Promise.all(i).then(function(e) {
			let i = e[0], a = Hr[r.type], o = zr[r.componentType], s = o.BYTES_PER_ELEMENT, c = s * a, l = r.byteOffset || 0, u = r.bufferView === void 0 ? void 0 : n.bufferViews[r.bufferView].byteStride, d = r.normalized === !0, f, p;
			if (u && u !== c) {
				let e = Math.floor(l / u), n = "InterleavedBuffer:" + r.bufferView + ":" + r.componentType + ":" + e + ":" + r.count, c = t.cache.get(n);
				c || (f = new o(i, e * u, r.count * u / s), c = new _e(f, u / s), t.cache.add(n, c)), p = new ve(c, a, l % u / s, d);
			} else f = i === null ? new o(r.count * a) : new o(i, l, r.count * a), p = new z(f, a, d);
			if (r.sparse !== void 0) {
				let t = Hr.SCALAR, n = zr[r.sparse.indices.componentType], s = r.sparse.indices.byteOffset || 0, c = r.sparse.values.byteOffset || 0, l = new n(e[1], s, r.sparse.count * t), u = new o(e[2], c, r.sparse.count * a);
				i !== null && (p = new z(p.array.slice(), p.itemSize, p.normalized)), p.normalized = !1;
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
			return t.magFilter = Br[n.magFilter] || De, t.minFilter = Br[n.minFilter] || Oe, t.wrapS = Vr[n.wrapS] || it, t.wrapT = Vr[n.wrapT] || it, t.generateMipmaps = !t.isCompressedTexture && t.minFilter !== He && t.minFilter !== De, r.associations.set(t, { textures: e }), t;
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
					let t = new ft(e);
					t.needsUpdate = !0, n(t);
				}), t.load(Me.resolveURL(e, i.path), a, void 0, r);
			});
		}).then(function(e) {
			return c === !0 && o.revokeObjectURL(s), Yr(e, a), e.userData.mimeType = a.mimeType || ti(a.uri), e;
		}).catch(function(e) {
			throw console.error("THREE.GLTFLoader: Couldn't load texture", s), e;
		});
		return this.sourceCache[e] = l, l;
	}
	assignTexture(e, t, n, r) {
		let i = this;
		return this.getDependency("texture", n.index).then(function(a) {
			if (!a) return null;
			if (n.texCoord !== void 0 && n.texCoord > 0 && (a = a.clone(), a.channel = n.texCoord), i.extensions[J.KHR_TEXTURE_TRANSFORM]) {
				let e = n.extensions === void 0 ? void 0 : n.extensions[J.KHR_TEXTURE_TRANSFORM];
				if (e) {
					let t = i.associations.get(a);
					a = i.extensions[J.KHR_TEXTURE_TRANSFORM].extendTexture(a, e), i.associations.set(a, t);
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
		if (s[J.KHR_MATERIALS_UNLIT]) {
			let e = r[J.KHR_MATERIALS_UNLIT];
			a = e.getMaterialType(), c.push(e.extendParams(o, i, t));
		} else {
			let n = i.pbrMetallicRoughness || {};
			if (o.color = new oe(1, 1, 1), o.opacity = 1, Array.isArray(n.baseColorFactor)) {
				let e = n.baseColorFactor;
				o.color.setRGB(e[0], e[1], e[2], Ae), o.opacity = e[3];
			}
			n.baseColorTexture !== void 0 && c.push(t.assignTexture(o, "map", n.baseColorTexture, at)), o.metalness = n.metallicFactor === void 0 ? 1 : n.metallicFactor, o.roughness = n.roughnessFactor === void 0 ? 1 : n.roughnessFactor, n.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(o, "metalnessMap", n.metallicRoughnessTexture)), c.push(t.assignTexture(o, "roughnessMap", n.metallicRoughnessTexture))), a = this._invokeOne(function(t) {
				return t.getMaterialType && t.getMaterialType(e);
			}), c.push(Promise.all(this._invokeAll(function(t) {
				return t.extendMaterialParams && t.extendMaterialParams(e, o);
			})));
		}
		i.doubleSided === !0 && (o.side = ue);
		let l = i.alphaMode || Kr.OPAQUE;
		if (l === Kr.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, l === Kr.MASK && (o.alphaTest = i.alphaCutoff === void 0 ? .5 : i.alphaCutoff)), i.normalTexture !== void 0 && a !== Re && (c.push(t.assignTexture(o, "normalMap", i.normalTexture)), o.normalScale = new B(1, 1), i.normalTexture.scale !== void 0)) {
			let e = i.normalTexture.scale;
			o.normalScale.set(e, e);
		}
		if (i.occlusionTexture !== void 0 && a !== Re && (c.push(t.assignTexture(o, "aoMap", i.occlusionTexture)), i.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = i.occlusionTexture.strength)), i.emissiveFactor !== void 0 && a !== Re) {
			let e = i.emissiveFactor;
			o.emissive = new oe().setRGB(e[0], e[1], e[2], Ae);
		}
		return i.emissiveTexture !== void 0 && a !== Re && c.push(t.assignTexture(o, "emissiveMap", i.emissiveTexture, at)), Promise.all(c).then(function() {
			let n = new a(o);
			return i.name && (n.name = i.name), Yr(n, i), t.associations.set(n, { materials: e }), i.extensions && Jr(r, n, i), n;
		});
	}
	createUniqueName(e) {
		let t = $e.sanitizeNodeName(e || "");
		return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
	}
	loadGeometries(e) {
		let t = this, n = this.extensions, r = this.primitiveCache;
		function i(e) {
			return n[J.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then(function(n) {
				return ai(n, e, t);
			});
		}
		let a = [];
		for (let n = 0, o = e.length; n < o; n++) {
			let o = e[n], s = Qr(o), c = r[s];
			if (c) a.push(c.promise);
			else {
				let e;
				e = o.extensions && o.extensions[J.KHR_DRACO_MESH_COMPRESSION] ? i(o) : ai(new ie(), o, t), r[s] = {
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
			let t = a[e].material === void 0 ? qr(this.cache) : this.getDependency("material", a[e].material);
			o.push(t);
		}
		return o.push(t.loadGeometries(a)), Promise.all(o).then(function(n) {
			let o = n.slice(0, n.length - 1), s = n[n.length - 1], c = [];
			for (let n = 0, l = s.length; n < l; n++) {
				let l = s[n], u = a[n], d, f = o[n];
				if (u.mode === Rr.TRIANGLES || u.mode === Rr.TRIANGLE_STRIP || u.mode === Rr.TRIANGLE_FAN || u.mode === void 0) d = i.isSkinnedMesh === !0 ? new st(l, f) : new Le(l, f), d.isSkinnedMesh === !0 && d.normalizeSkinWeights(), u.mode === Rr.TRIANGLE_STRIP ? d.geometry = ar(d.geometry, gt) : u.mode === Rr.TRIANGLE_FAN && (d.geometry = ar(d.geometry, ht));
				else if (u.mode === Rr.LINES) d = new Ee(l, f);
				else if (u.mode === Rr.LINE_STRIP) d = new Se(l, f);
				else if (u.mode === Rr.LINE_LOOP) d = new Te(l, f);
				else if (u.mode === Rr.POINTS) d = new Ze(l, f);
				else throw Error("THREE.GLTFLoader: Primitive mode unsupported: " + u.mode);
				Object.keys(d.geometry.morphAttributes).length > 0 && Zr(d, i), d.name = t.createUniqueName(i.name || "mesh_" + e), Yr(d, i), u.extensions && Jr(r, d, u), t.assignFinalMaterial(d), c.push(d);
			}
			for (let n = 0, r = c.length; n < r; n++) t.associations.set(c[n], {
				meshes: e,
				primitives: n
			});
			if (c.length === 1) return i.extensions && Jr(r, c[0], i), c[0];
			let l = new pe();
			i.extensions && Jr(r, l, i), t.associations.set(l, { meshes: e });
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
		return n.type === "perspective" ? t = new Je(Fe.radToDeg(r.yfov), r.aspectRatio || 1, r.znear || 1, r.zfar || 2e6) : n.type === "orthographic" && (t = new qe(-r.xmag, r.xmag, r.ymag, -r.ymag, r.znear, r.zfar)), n.name && (t.name = this.createUniqueName(n.name)), Yr(t, n), Promise.resolve(t);
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
			return new ot(i, a);
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
			let u = new ee(i, void 0, l);
			return Yr(u, r), u;
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
				e.isSkinnedMesh && e.bind(r, ni);
			});
			for (let e = 0, r = n.length; e < r; e++) t.add(n[e]);
			if (t.userData.pivot !== void 0 && n.length > 0) {
				let e = t.userData.pivot, r = n[0];
				t.pivot = new V().fromArray(e), t.position.x -= e[0], t.position.y -= e[1], t.position.z -= e[2], r.position.set(0, 0, 0), delete t.userData.pivot;
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
			if (o = i.isBone === !0 ? new re() : t.length > 1 ? new pe() : t.length === 1 ? t[0] : new Ke(), o !== t[0]) for (let e = 0, n = t.length; e < n; e++) o.add(t[e]);
			if (i.name && (o.userData.name = i.name, o.name = a), Yr(o, i), i.extensions && Jr(n, o, i), i.matrix !== void 0) {
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
		let t = this.extensions, n = this.json.scenes[e], r = this, i = new pe();
		n.name && (i.name = r.createUniqueName(n.name)), Yr(i, n), n.extensions && Jr(t, i, n);
		let a = n.nodes || [], o = [];
		for (let e = 0, t = a.length; e < t; e++) o.push(r.getDependency("node", a[e]));
		return Promise.all(o).then(function(e) {
			for (let t = 0, n = e.length; t < n; t++) {
				let n = e[t];
				n.parent === null ? i.add(n) : i.add(or(n));
			}
			return r.associations = ((e) => {
				let t = /* @__PURE__ */ new Map();
				for (let [e, n] of r.associations) (e instanceof Pe || e instanceof ft) && t.set(e, n);
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
		Wr[i.path] === Wr.weights ? (c(e), e.isGroup && e.children.forEach(c)) : s.push(o);
		let l;
		switch (Wr[i.path]) {
			case Wr.weights:
				l = Ge;
				break;
			case Wr.rotation:
				l = tt;
				break;
			case Wr.translation:
			case Wr.scale:
				l = vt;
				break;
			default:
				switch (n.itemSize) {
					case 1:
						l = Ge;
						break;
					default:
						l = vt;
						break;
				}
				break;
		}
		let u = r.interpolation === void 0 ? xe : Gr[r.interpolation], d = this._getArrayFromAccessor(n);
		for (let e = 0, n = s.length; e < n; e++) {
			let n = new l(s[e] + "." + Wr[i.path], t.array, d, u);
			r.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(n), a.push(n);
		}
		return a;
	}
	_getArrayFromAccessor(e) {
		let t = e.array;
		if (e.normalized) {
			let e = ei(t.constructor), n = new Float32Array(t.length);
			for (let r = 0, i = t.length; r < i; r++) n[r] = t[r] * e;
			t = n;
		}
		return t;
	}
	_createCubicSplineTrackInterpolant(e) {
		e.createInterpolant = function(e) {
			return new (this instanceof tt ? Lr : Fr)(this.times, this.values, this.getValueSize() / 3, e);
		}, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
	}
};
function ii(e, t, n) {
	let r = t.attributes, i = new R();
	if (r.POSITION !== void 0) {
		let e = n.json.accessors[r.POSITION], t = e.min, a = e.max;
		if (t !== void 0 && a !== void 0) {
			if (i.set(new V(t[0], t[1], t[2]), new V(a[0], a[1], a[2])), e.normalized) {
				let t = ei(zr[e.componentType]);
				i.min.multiplyScalar(t), i.max.multiplyScalar(t);
			}
		} else {
			console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
			return;
		}
	} else return;
	let a = t.targets;
	if (a !== void 0) {
		let e = new V(), t = new V();
		for (let r = 0, i = a.length; r < i; r++) {
			let i = a[r];
			if (i.POSITION !== void 0) {
				let r = n.json.accessors[i.POSITION], a = r.min, o = r.max;
				if (a !== void 0 && o !== void 0) {
					if (t.setX(Math.max(Math.abs(a[0]), Math.abs(o[0]))), t.setY(Math.max(Math.abs(a[1]), Math.abs(o[1]))), t.setZ(Math.max(Math.abs(a[2]), Math.abs(o[2]))), r.normalized) {
						let e = ei(zr[r.componentType]);
						t.multiplyScalar(e);
					}
					e.max(t);
				} else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
			}
		}
		i.expandByVector(e);
	}
	e.boundingBox = i;
	let o = new ct();
	i.getCenter(o.center), o.radius = i.min.distanceTo(i.max) / 2, e.boundingSphere = o;
}
function ai(e, t, n) {
	let r = t.attributes, i = [];
	function a(t, r) {
		return n.getDependency("accessor", t).then(function(t) {
			e.setAttribute(r, t);
		});
	}
	for (let t in r) {
		let n = Ur[t] || t.toLowerCase();
		n in e.attributes || i.push(a(r[t], n));
	}
	if (t.indices !== void 0 && !e.index) {
		let r = n.getDependency("accessor", t.indices).then(function(t) {
			e.setIndex(t);
		});
		i.push(r);
	}
	return se.workingColorSpace !== Ae && "COLOR_0" in r && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${se.workingColorSpace}" not supported.`), Yr(e, t), ii(e, t, n), Promise.all(i).then(function() {
		return t.targets === void 0 ? e : Xr(e, t.targets, n);
	});
}
//#endregion
//#region src/utils/modelLoader.ts
async function oi(e) {
	let t = new cr();
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
			let r = t.length === 1 ? t[0] : rr(t, !1) ?? t[0];
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
//#endregion
//#region src/utils/geometryFactory.ts
var si = {
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
}, ci = /* @__PURE__ */ new Map(), li = /* @__PURE__ */ new Map();
function ui(e) {
	li.forEach((e, t) => {
		let n = ci.get(t);
		n && (n.disposeBoundsTree?.(), n.dispose(), ci.delete(t));
	}), li = new Map(e);
}
function di(e) {
	if (ci.has(e)) return ci.get(e);
	let t = li.get(e);
	if (t) {
		if (t.hasModel) {
			let n = new L.BoxGeometry(t.w, t.h, t.d);
			return n.computeBoundsTree(), ci.set(e, n), n;
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
		return n.computeBoundsTree(), ci.set(e, n), n;
	}
	let n;
	switch (e) {
		case "router":
			n = new L.CylinderGeometry(.28, .28, .12, 10);
			break;
		case "database":
			n = new L.CylinderGeometry(.28, .28, .5, 10);
			break;
		case "load_balancer":
			n = new L.OctahedronGeometry(.24);
			break;
		case "access_point":
			n = new L.SphereGeometry(.2, 8, 6);
			break;
		case "cloud_service":
			n = new L.SphereGeometry(.3, 10, 8);
			break;
		default: {
			let t = si[e] ?? [
				.6,
				.1,
				.4
			];
			n = new L.BoxGeometry(t[0], t[1], t[2]);
		}
	}
	return n.computeBoundsTree(), ci.set(e, n), n;
}
async function fi(e) {
	let t = [];
	e.forEach((e) => {
		e.hasModel && (ci.has(e.id) || t.push((async () => {
			try {
				let t = await tr(e.id);
				if (!t) return;
				let n = await oi(t);
				if (!n) return;
				n.computeBoundsTree(), ci.set(e.id, n);
			} catch (t) {
				console.warn(`[geometryFactory] Failed to preload model "${e.id}":`, t);
			}
		})()));
	}), t.length && await Promise.all(t);
}
function pi() {
	ci.forEach((e) => {
		e.disposeBoundsTree(), e.dispose();
	}), ci.clear();
}
//#endregion
//#region src/renderers/DeviceRenderer.ts
var mi = /* @__PURE__ */ new Map();
function hi(e) {
	return mi.has(e) || mi.set(e, new L.MeshStandardMaterial({
		color: new L.Color(Yn(e)),
		roughness: .35,
		metalness: .65,
		emissive: new L.Color(0),
		emissiveIntensity: 0
	})), mi.get(e);
}
var gi = class {
	scene;
	objects = /* @__PURE__ */ new Map();
	dummy = new L.Object3D();
	instancedMeshes = /* @__PURE__ */ new Map();
	instanceIndex = /* @__PURE__ */ new Map();
	instanceColors = /* @__PURE__ */ new Map();
	statusMap = /* @__PURE__ */ new Map();
	dimmedIds = /* @__PURE__ */ new Set();
	searchLabels = /* @__PURE__ */ new Map();
	constructor(e) {
		this.scene = e;
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
			let n = di(t), r = hi(t).clone();
			r.vertexColors = !1;
			let i = new L.InstancedMesh(n, r, e.length + 50);
			i.instanceMatrix.setUsage(L.DynamicDrawUsage), i.count = e.length, i.userData.deviceType = t, e.forEach((e, n) => {
				let r = e.mapping.position;
				this.dummy.position.set(r.x, r.y, r.z), this.dummy.rotation.set(0, 0, 0), this.dummy.scale.setScalar(1), this.dummy.updateMatrix(), i.setMatrixAt(n, this.dummy.matrix);
				let a = e.device.status ?? "unknown", o = zn[a];
				i.setColorAt(n, o), this.instanceIndex.set(e.device.id, {
					type: t,
					idx: n
				}), this.instanceColors.set(e.device.id, o.clone()), this.statusMap.set(e.device.id, a), i.userData[`device_${n}`] = e.device.id;
			}), i.instanceMatrix.needsUpdate = !0, i.instanceColor && (i.instanceColor.needsUpdate = !0), this.instancedMeshes.set(t, i), this.scene.add(i);
		});
	}
	addDevice(e, t) {
		if (!t.position || t.mappingStatus === "unmapped") return;
		let n = t.visualType ?? e.normalizedType ?? "unknown", r = e.status ?? "unknown", i = zn[r] ?? new L.Color(7041664), a = this.instancedMeshes.get(n);
		if (a && a.count < a.instanceMatrix.count) {
			let o = a.count;
			this.dummy.position.set(t.position.x, t.position.y, t.position.z), this.dummy.rotation.set(0, 0, 0), this.dummy.scale.setScalar(1), this.dummy.updateMatrix(), a.setMatrixAt(o, this.dummy.matrix), a.setColorAt(o, i), a.count = o + 1, a.instanceMatrix.needsUpdate = !0, a.instanceColor && (a.instanceColor.needsUpdate = !0), a.userData[`device_${o}`] = e.id, this.instanceIndex.set(e.id, {
				type: n,
				idx: o
			}), this.instanceColors.set(e.id, i.clone()), this.statusMap.set(e.id, r);
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
			let o = di(n), s = hi(n).clone();
			s.vertexColors = !1;
			let c = new L.InstancedMesh(o, s, i.length + 50);
			c.instanceMatrix.setUsage(L.DynamicDrawUsage), c.count = i.length, c.userData.deviceType = n, i.forEach(({ id: e, pos: t, status: r }, i) => {
				this.dummy.position.copy(t), this.dummy.rotation.set(0, 0, 0), this.dummy.scale.setScalar(1), this.dummy.updateMatrix(), c.setMatrixAt(i, this.dummy.matrix);
				let a = zn[r] ?? new L.Color(7041664);
				c.setColorAt(i, a), this.instanceIndex.set(e, {
					type: n,
					idx: i
				}), this.instanceColors.set(e, a.clone()), this.statusMap.set(e, r), c.userData[`device_${i}`] = e;
			}), c.instanceMatrix.needsUpdate = !0, c.instanceColor && (c.instanceColor.needsUpdate = !0), this.instancedMeshes.set(n, c), this.scene.add(c);
		}
	}
	updateStatus(e, t) {
		let n = this.instanceIndex.get(e);
		if (!n) return;
		let r = this.instancedMeshes.get(n.type);
		if (!r) return;
		this.statusMap.set(e, t);
		let i = zn[t].clone();
		this.dimmedIds.size > 0 && !this.dimmedIds.has(e) ? i = i.clone().multiplyScalar(.18) : this.dimmedIds.size > 0 && this.dimmedIds.has(e) && (i = i.clone().multiplyScalar(2)), r.setColorAt(n.idx, i), r.instanceColor && (r.instanceColor.needsUpdate = !0), this.instanceColors.set(e, i);
	}
	pulseStatus(e, t, n) {
		let r = this.instanceIndex.get(e);
		if (!r) return;
		let i = this.instancedMeshes.get(r.type);
		if (!i) return;
		let a = zn[t].clone().clone().multiplyScalar(1 + n * 1.5);
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
	setSearchFocus(e, t) {
		if (this.clearSearchLabels(), !e.size) return;
		let n = 0;
		e.forEach((e) => {
			if (n >= 80) return;
			let r = this.getDeviceWorldPos(e);
			if (!r) return;
			let i = document.createElement("div");
			i.className = "device-search-label", i.style.cssText = "\n        background:rgba(250,204,21,.96);border:1px solid #fef08a;border-radius:6px;\n        box-shadow:0 0 18px rgba(250,204,21,.8),0 0 2px #000;\n        color:#111827;font-size:11px;font-weight:700;font-family:monospace;\n        padding:3px 8px;white-space:nowrap;pointer-events:none;", i.textContent = t(e) ?? e;
			let a = new An(i);
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
					let i = zn[r].clone();
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
				let o = zn[a].clone(), s = i ? new L.Color(16773494) : o.clone().multiplyScalar(.08);
				t.setColorAt(n, s), this.instanceColors.set(r, s);
			}
			t.instanceColor && (t.instanceColor.needsUpdate = !0);
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
		this.clearSearchLabels(), this.instancedMeshes.forEach((e) => {
			e.material.dispose(), this.scene.remove(e);
		}), this.instancedMeshes.clear(), this.instanceIndex.clear(), mi.forEach((e) => e.dispose()), mi.clear(), pi();
	}
	clearSearchLabels() {
		this.searchLabels.forEach((e) => {
			this.scene.remove(e), e.element.remove();
		}), this.searchLabels.clear();
	}
}, _i = {
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
}, vi = class {
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
		let t = _i[e.type] ?? _i.zone, n = new L.Group(), r = e.position ?? {
			x: 0,
			y: 0,
			z: 0
		}, i = e.size ?? {
			width: 10,
			height: .1,
			depth: 10
		};
		n.position.set(r.x, r.y, r.z), n.userData.spaceId = e.id, e.type === "rack" ? this._buildRack(n, e, i, t) : e.type === "site" ? this._buildSite(n, e, i, t) : this._buildZone(n, e, i, t);
		let a = document.createElement("div");
		a.className = "space-badge", a.style.cssText = "\n      background:rgba(9,13,24,.90);border:1px solid #2a4a8a;border-radius:5px;\n      padding:2px 7px;font-size:10px;font-family:monospace;color:#94a3b8;\n      white-space:nowrap;pointer-events:none;", a.textContent = e.name;
		let o = new An(a);
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
	applyBadgeLod() {
		this.objects.forEach((e) => {
			let t = e.hitMesh.userData.spaceType, n = e.hitMesh.userData.spaceSource;
			e.badge.visible = this.shouldShowBadge(t, n);
		});
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
	shouldShowBadge(e, t) {
		let n = this.objects.size;
		return e === "site" ? !0 : e === "rack" && t === "import" || n > 120 ? !1 : n > 60 ? e !== "rack" : e === "rack" || e === "zone" || e === "cloud";
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
}, yi = .45, bi = .1, xi = class {
	scene;
	objects = /* @__PURE__ */ new Map();
	previewLine = null;
	_elapsed = 0;
	constructor(e) {
		this.scene = e;
	}
	loadLinks(e, t) {
		e.forEach((e) => this.addLink(e, t));
	}
	buildPath(e, t, n, r) {
		let i = e.y + bi, a = t.y + bi, o = (i + a) / 2;
		return [
			new L.Vector3(e.x, i, e.z),
			new L.Vector3(e.x, o, r),
			new L.Vector3(n, o, r),
			new L.Vector3(n, o, t.z),
			new L.Vector3(t.x, a, t.z)
		];
	}
	midY(e, t) {
		return (e.y + t.y) / 2 + bi;
	}
	addLink(e, t) {
		let n = t(e.sourceDeviceId), r = t(e.targetDeviceId);
		if (!n || !r) return;
		let i = Vn[e.type] ?? Vn.manual, a = e.status === "down" ? "#ef4444" : i.color, o = e.midX ?? (n.x + r.x) / 2, s = e.midZ ?? (n.z + r.z) / 2, c = this.buildPath(n, r, o, s), l = new L.BufferGeometry().setFromPoints(c), u = new L.LineDashedMaterial({
			color: a,
			transparent: !0,
			opacity: i.opacity,
			dashSize: i.dashed ? .35 : 1e3,
			gapSize: i.dashed ? .15 : 0,
			linewidth: 2
		}), d = new L.Line(l, u);
		d.computeLineDistances(), d.userData.linkId = e.id;
		let f = new L.BoxGeometry(.55, .3, .55), p = new L.MeshBasicMaterial({
			color: 6333946,
			transparent: !0,
			opacity: .6,
			depthTest: !1
		}), m = new L.Mesh(f, p);
		m.position.set(o, this.midY(n, r), s), m.renderOrder = 800, m.userData.linkHandleId = e.id, m.userData.linkId = e.id, m.visible = !1;
		let h = new L.Group();
		h.add(d, m), this.scene.add(h), this.objects.set(e.id, {
			group: h,
			line: d,
			handle: m,
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
		r.path = i, r.line.geometry.setFromPoints(i), r.line.computeLineDistances(), r.handle.position.set(t, this.midY(r.endpoints.a, r.endpoints.b), n);
	}
	refreshPositions(e) {
		this.objects.forEach((t) => {
			let n = e(t.link.sourceDeviceId), r = e(t.link.targetDeviceId);
			if (!n || !r) return;
			t.endpoints.a = n.clone(), t.endpoints.b = r.clone();
			let i = t.link.midX ?? (n.x + r.x) / 2, a = t.link.midZ ?? (n.z + r.z) / 2, o = this.buildPath(n, r, i, a);
			t.path = o;
			let s = new Float32Array(o.length * 3);
			for (let e = 0; e < o.length; e++) s[e * 3] = o[e].x, s[e * 3 + 1] = o[e].y, s[e * 3 + 2] = o[e].z;
			t.line.geometry.setAttribute("position", new L.BufferAttribute(s, 3)), t.line.geometry.computeBoundingSphere(), t.line.computeLineDistances(), t.handle.position.set(i, this.midY(n, r), a);
		});
	}
	updateLinkStatus(e, t) {
		let n = this.objects.get(e);
		if (!n) return;
		let r = Vn[n.link.type] ?? Vn.manual, i = t === "down" ? "#ef4444" : r.color;
		n.line.material.color.set(i);
	}
	setHighlight(e, t) {
		if (t) {
			let e = this.objects.get(t);
			e && (e.line.material.opacity = Vn[e.link.type]?.opacity ?? .6);
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
			new L.Vector3(e.x, yi, e.z),
			new L.Vector3(e.x, yi, n),
			new L.Vector3(t.x, yi, n),
			new L.Vector3(t.x, yi, t.z)
		];
		if (this.previewLine) this.previewLine.geometry.setFromPoints(r), this.previewLine.computeLineDistances();
		else {
			let e = new L.BufferGeometry().setFromPoints(r), t = new L.LineDashedMaterial({
				color: 6333946,
				dashSize: .3,
				gapSize: .15,
				transparent: !0,
				opacity: .9,
				linewidth: 2
			});
			this.previewLine = new L.Line(e, t), this.scene.add(this.previewLine);
		}
		this.previewLine.visible = !0;
	}
	hidePreview() {
		this.previewLine && (this.previewLine.visible = !1);
	}
	update(e) {
		this._elapsed += e, this.objects.forEach(({ line: e, link: t }) => {
			if (t.status === "down") {
				let t = e.material;
				t.opacity = .25 + .35 * Math.abs(Math.sin(this._elapsed * 2.5));
			}
		});
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
}, Si = 4e3;
function Ci(e) {
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
function wi(e, t, n, r, i) {
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
var Ti = class {
	scene;
	points;
	particles = [];
	posAttr;
	colAttr;
	constructor(e) {
		this.scene = e;
		let t = new L.BufferGeometry(), n = new Float32Array(Si * 3), r = new Float32Array(Si * 3);
		this.posAttr = new L.BufferAttribute(n, 3), this.colAttr = new L.BufferAttribute(r, 3), this.posAttr.setUsage(L.DynamicDrawUsage), t.setAttribute("position", this.posAttr), t.setAttribute("color", this.colAttr), t.setDrawRange(0, 0);
		let i = new L.PointsMaterial({
			size: .22,
			vertexColors: !0,
			transparent: !0,
			opacity: .95,
			depthWrite: !1,
			blending: L.AdditiveBlending,
			sizeAttenuation: !0
		});
		this.points = new L.Points(t, i), this.points.frustumCulled = !1, e.add(this.points);
	}
	syncLinks(e, t, n) {
		this.particles = [], e.forEach((e) => {
			if (e.status === "down") return;
			let r = t(e.id);
			if (!r || r.length < 2) return;
			let { lengths: i, total: a } = Ci(r);
			if (a === 0) return;
			let o = Vn[e.type] ?? Vn.manual, s = new L.Color(o.color), c = n(e.sourceDeviceId), l = Math.min(Math.max(Math.floor(c / 150), 2), 6), u = 3.5 + Math.min(c / 1e3, 1) * 4.5;
			for (let t = 0; t < l; t++) this.particles.push({
				linkId: e.id,
				linkType: e.type,
				segments: r,
				segmentLengths: i,
				totalLength: a,
				t: t / l,
				speed: u * (.85 + Math.random() * .3),
				color: s.clone()
			});
		});
	}
	update(e, t) {
		let n = 0, r = this.posAttr.array, i = this.colAttr.array, a = new L.Vector3();
		for (let o of this.particles) {
			if (n >= Si) break;
			t.has(o.linkType) && (o.t += o.speed * e / Math.max(o.totalLength, 1), o.t > 1 && --o.t, wi(o.segments, o.segmentLengths, o.totalLength, o.t, a), r[n * 3] = a.x, r[n * 3 + 1] = a.y, r[n * 3 + 2] = a.z, i[n * 3] = o.color.r, i[n * 3 + 1] = o.color.g, i[n * 3 + 2] = o.color.b, n++);
		}
		this.points.geometry.setDrawRange(0, n), this.posAttr.needsUpdate = !0, this.colAttr.needsUpdate = !0;
	}
	setVisible(e) {
		this.points.visible = e, e || this.points.geometry.setDrawRange(0, 0);
	}
	dispose() {
		this.scene.remove(this.points), this.points.geometry.dispose(), this.points.material.dispose();
	}
}, Ei = class {
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
				blending: L.AdditiveBlending
			}), c = new L.Mesh(o, s);
			c.rotation.x = -Math.PI / 2, c.position.set(r.x, r.y + .3, r.z), c.renderOrder = 1, this.scene.add(c), this.rings.push({
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
				blending: L.AdditiveBlending
			}), d = new L.Mesh(l, u);
			d.rotation.x = -Math.PI / 2, d.position.set(r.x, r.y + .3, r.z), d.renderOrder = 1, this.scene.add(d), this.rings.push({
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
}, Di = {
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
}, Oi = {
	internet: "INET",
	cloud: "CLOUD",
	external: "EXT",
	custom: "NODE"
}, ki = class {
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
		let t = Di[e.type] ?? Di.custom, n = new L.Group(), r = e.position ?? {
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
		u.style.cssText = "color:#cbd5e1;font-size:11px;font-family:monospace;\n      background:rgba(9,13,24,.85);border:1px solid #2a4a8a;border-radius:5px;\n      padding:2px 8px;pointer-events:none;white-space:nowrap;", u.textContent = `${Oi[e.type] ?? "NODE"} · ${e.label}`;
		let d = new An(u);
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
}, Ai = {
	critical: 16724804,
	recover: 2284902,
	warning: 16755200
}, ji = class {
	scene;
	flashes = [];
	constructor(e) {
		this.scene = e;
	}
	flash(e, t) {
		let n = Ai[t], r = [];
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
}, Mi = 1.25, Ni = 65535;
Ni << 16;
var Pi = 2 ** -24, Fi = Symbol("SKIP_GENERATION"), Ii = {
	strategy: 0,
	maxDepth: 40,
	maxLeafSize: 10,
	useSharedArrayBuffer: !1,
	setBoundingBox: !0,
	onProgress: null,
	indirect: !1,
	verbose: !0,
	range: null,
	[Fi]: !1
};
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/ArrayBoxUtilities.js
function Y(e, t, n) {
	return n.min.x = t[e], n.min.y = t[e + 1], n.min.z = t[e + 2], n.max.x = t[e + 3], n.max.y = t[e + 4], n.max.z = t[e + 5], n;
}
function Li(e) {
	let t = -1, n = -Infinity;
	for (let r = 0; r < 3; r++) {
		let i = e[r + 3] - e[r];
		i > n && (n = i, t = r);
	}
	return t;
}
function Ri(e, t) {
	t.set(e);
}
function zi(e, t, n) {
	let r, i;
	for (let a = 0; a < 3; a++) {
		let o = a + 3;
		r = e[a], i = t[a], n[a] = r < i ? r : i, r = e[o], i = t[o], n[o] = r > i ? r : i;
	}
}
function Bi(e, t, n) {
	for (let r = 0; r < 3; r++) {
		let i = t[e + 2 * r], a = t[e + 2 * r + 1], o = i - a, s = i + a;
		o < n[r] && (n[r] = o), s > n[r + 3] && (n[r + 3] = s);
	}
}
function Vi(e) {
	let t = e[3] - e[0], n = e[4] - e[1], r = e[5] - e[2];
	return 2 * (t * n + n * r + r * t);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/nodeBufferUtils.js
function X(e, t) {
	return t[e + 15] === Ni;
}
function Hi(e, t) {
	return t[e + 6];
}
function Ui(e, t) {
	return t[e + 14];
}
function Wi(e) {
	return e + 8;
}
function Gi(e, t) {
	return e + t[e + 6] * 8;
}
function Ki(e, t) {
	return t[e + 7];
}
function Z(e) {
	return e;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/computeBoundsUtils.js
function qi(e, t, n, r, i) {
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
var Ji = 32, Yi = (e, t) => e.candidate - t.candidate, Xi = /* @__PURE__ */ Array(Ji).fill().map(() => ({
	count: 0,
	bounds: new Float32Array(6),
	rightCacheBounds: new Float32Array(6),
	leftCacheBounds: new Float32Array(6),
	candidate: 0
})), Zi = /* @__PURE__ */ new Float32Array(6);
function Qi(e, t, n, r, i, a) {
	let o = -1, s = 0;
	if (a === 0) o = Li(t), o !== -1 && (s = (t[o] + t[o + 3]) / 2);
	else if (a === 1) o = Li(e), o !== -1 && (s = $i(n, r, i, o));
	else if (a === 2) {
		let a = Vi(e), c = Mi * i, l = n.offset || 0, u = (r - l) * 6, d = (r + i - l) * 6;
		for (let e = 0; e < 3; e++) {
			let r = t[e], l = (t[e + 3] - r) / Ji;
			if (i < Ji / 4) {
				let t = [...Xi];
				t.length = i;
				let r = 0;
				for (let i = u; i < d; i += 6, r++) {
					let a = t[r];
					a.candidate = n[i + 2 * e], a.count = 0;
					let { bounds: o, leftCacheBounds: s, rightCacheBounds: c } = a;
					for (let e = 0; e < 3; e++) c[e] = Infinity, c[e + 3] = -Infinity, s[e] = Infinity, s[e + 3] = -Infinity, o[e] = Infinity, o[e + 3] = -Infinity;
					Bi(i, n, o);
				}
				t.sort(Yi);
				let l = i;
				for (let e = 0; e < l; e++) {
					let n = t[e];
					for (; e + 1 < l && t[e + 1].candidate === n.candidate;) t.splice(e + 1, 1), l--;
				}
				for (let r = u; r < d; r += 6) {
					let i = n[r + 2 * e];
					for (let e = 0; e < l; e++) {
						let a = t[e];
						i >= a.candidate ? Bi(r, n, a.rightCacheBounds) : (Bi(r, n, a.leftCacheBounds), a.count++);
					}
				}
				for (let n = 0; n < l; n++) {
					let r = t[n], l = r.count, u = i - r.count, d = r.leftCacheBounds, f = r.rightCacheBounds, p = 0;
					l !== 0 && (p = Vi(d) / a);
					let m = 0;
					u !== 0 && (m = Vi(f) / a);
					let h = 1 + Mi * (p * l + m * u);
					h < c && (o = e, c = h, s = r.candidate);
				}
			} else {
				for (let e = 0; e < Ji; e++) {
					let t = Xi[e];
					t.count = 0, t.candidate = r + l + e * l;
					let n = t.bounds;
					for (let e = 0; e < 3; e++) n[e] = Infinity, n[e + 3] = -Infinity;
				}
				for (let t = u; t < d; t += 6) {
					let i = ~~((n[t + 2 * e] - r) / l);
					i >= Ji && (i = Ji - 1);
					let a = Xi[i];
					a.count++, Bi(t, n, a.bounds);
				}
				let t = Xi[Ji - 1];
				Ri(t.bounds, t.rightCacheBounds);
				for (let e = Ji - 2; e >= 0; e--) {
					let t = Xi[e], n = Xi[e + 1];
					zi(t.bounds, n.rightCacheBounds, t.rightCacheBounds);
				}
				let f = 0;
				for (let t = 0; t < Ji - 1; t++) {
					let n = Xi[t], r = n.count, l = n.bounds, u = Xi[t + 1].rightCacheBounds;
					r !== 0 && (f === 0 ? Ri(l, Zi) : zi(l, Zi, Zi)), f += r;
					let d = 0, p = 0;
					f !== 0 && (d = Vi(Zi) / a);
					let m = i - f;
					m !== 0 && (p = Vi(u) / a);
					let h = 1 + Mi * (d * f + p * m);
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
function $i(e, t, n, r) {
	let i = 0, a = e.offset;
	for (let o = t, s = t + n; o < s; o++) i += e[(o - a) * 6 + r * 2];
	return i / n;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/BVHNode.js
var ea = class {
	constructor() {
		this.boundingData = new Float32Array(6);
	}
};
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/sortUtils.js
function ta(e, t, n, r, i, a) {
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
var na, ra, ia, aa, oa = 2 ** 32;
function sa(e) {
	return "count" in e ? 1 : 1 + sa(e.left) + sa(e.right);
}
function ca(e, t, n) {
	return na = new Float32Array(n), ra = new Uint32Array(n), ia = new Uint16Array(n), aa = new Uint8Array(n), la(e, t);
}
function la(e, t) {
	let n = e / 4, r = e / 2, i = "count" in t, a = t.boundingData;
	for (let e = 0; e < 6; e++) na[n + e] = a[e];
	if (i) return t.buffer ? (aa.set(new Uint8Array(t.buffer), e), e + t.buffer.byteLength) : (ra[n + 6] = t.offset, ia[r + 14] = t.count, ia[r + 15] = Ni, e + 32);
	{
		let { left: r, right: i, splitAxis: a } = t, o = la(e + 32, r), s = e / 32, c = o / 32 - s;
		if (c > oa) throw Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");
		return ra[n + 6] = c, ra[n + 7] = a, la(o, i);
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/buildTree.js
function ua(e, t, n, r, i, a) {
	let { maxDepth: o, verbose: s, maxLeafSize: c, strategy: l, onProgress: u } = i, d = e.primitiveBuffer, f = e.primitiveBufferStride, p = new Float32Array(6), m = !1, h = new ea();
	return qi(t, n, r, h.boundingData, p), _(h, n, r, p), h;
	function g(e) {
		u && u((e - a.offset) / a.count);
	}
	function _(e, n, r, i = null, a = 0) {
		if (!m && a >= o && (m = !0, s && console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`)), r <= c || a >= o) return g(n + r), e.offset = n, e.count = r, e;
		let u = Qi(e.boundingData, i, t, n, r, l);
		if (u.axis === -1) return g(n + r), e.offset = n, e.count = r, e;
		let h = ta(d, f, t, n, r, u);
		if (h === n || h === n + r) g(n + r), e.offset = n, e.count = r;
		else {
			e.splitAxis = u.axis;
			let i = new ea(), o = n, s = h - n;
			e.left = i, qi(t, o, s, i.boundingData, p), _(i, o, s, p, a + 1);
			let c = new ea(), l = h, d = r - s;
			e.right = c, qi(t, l, d, c.boundingData, p), _(c, l, d, p, a + 1);
		}
		return e;
	}
}
function da(e, t) {
	let n = t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer, r = e.getRootRanges(t.range), i = r[0], a = r[r.length - 1], o = {
		offset: i.offset,
		count: a.offset + a.count - i.offset
	}, s = new Float32Array(6 * o.count);
	s.offset = o.offset, e.computePrimitiveBounds(o.offset, o.count, s), e._roots = r.map((r) => {
		let i = ua(e, s, r.offset, r.count, t, o), a = new n(32 * sa(i));
		return ca(0, i, a), a;
	});
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/PrimitivePool.js
var fa = class {
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
}(), pa, ma, ha = [], ga = /* @__PURE__ */ new fa(() => new R());
function _a(e, t, n, r, i, a) {
	pa = ga.getPrimitive(), ma = ga.getPrimitive(), ha.push(pa, ma), Q.setBuffer(e._roots[t]);
	let o = va(0, e.geometry, n, r, i, a);
	Q.clearBuffer(), ga.releasePrimitive(pa), ga.releasePrimitive(ma), ha.pop(), ha.pop();
	let s = ha.length;
	return s > 0 && (ma = ha[s - 1], pa = ha[s - 2]), o;
}
function va(e, t, n, r, i = null, a = 0, o = 0) {
	let { float32Array: s, uint16Array: c, uint32Array: l } = Q, u = e * 2;
	if (X(u, c)) {
		let t = Hi(e, l), n = Ui(u, c);
		return Y(Z(e), s, pa), r(t, n, !1, o, a + e / 8, pa);
	} else {
		let u = Wi(e), d = Gi(e, l), f = u, p = d, m, h, g, _;
		if (i && (g = pa, _ = ma, Y(Z(f), s, g), Y(Z(p), s, _), m = i(g), h = i(_), h < m)) {
			f = d, p = u;
			let e = m;
			m = h, h = e, g = _;
		}
		g || (g = pa, Y(Z(f), s, g));
		let v = X(f * 2, c), y = n(g, v, m, o + 1, a + f / 8), b;
		if (y === 2) {
			let e = w(f);
			b = r(e, T(f) - e, !0, o + 1, a + f / 8, g);
		} else b = y && va(f, t, n, r, i, a, o + 1);
		if (b) return !0;
		_ = ma, Y(Z(p), s, _);
		let x = X(p * 2, c), S = n(_, x, h, o + 1, a + p / 8), C;
		if (S === 2) {
			let e = w(p);
			C = r(e, T(p) - e, !0, o + 1, a + p / 8, _);
		} else C = S && va(p, t, n, r, i, a, o + 1);
		if (C) return !0;
		return !1;
		function w(e) {
			let { uint16Array: t, uint32Array: n } = Q, r = e * 2;
			for (; !X(r, t);) e = Wi(e), r = e * 2;
			return Hi(e, n);
		}
		function T(e) {
			let { uint16Array: t, uint32Array: n } = Q, r = e * 2;
			for (; !X(r, t);) e = Gi(e, n), r = e * 2;
			return Hi(e, n) + Ui(r, t);
		}
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/bvhcast.js
var ya = /* @__PURE__ */ new Q.constructor(), ba = /* @__PURE__ */ new Q.constructor(), xa = /* @__PURE__ */ new fa(() => new R()), Sa = /* @__PURE__ */ new R(), Ca = /* @__PURE__ */ new R(), wa = /* @__PURE__ */ new R(), Ta = /* @__PURE__ */ new R(), Ea = !1;
function Da(e, t, n, r) {
	if (Ea) throw Error("MeshBVH: Recursive calls to bvhcast not supported.");
	Ea = !0;
	let i = e._roots, a = t._roots, o, s = 0, c = 0, l = new Ie().copy(n).invert();
	for (let e = 0, t = i.length; e < t; e++) {
		ya.setBuffer(i[e]), c = 0;
		let t = xa.getPrimitive();
		Y(Z(0), ya.float32Array, t), t.applyMatrix4(l);
		for (let e = 0, i = a.length; e < i && (ba.setBuffer(a[e]), o = Oa(0, 0, n, l, r, s, c, 0, 0, t), ba.clearBuffer(), c += a[e].byteLength / 32, !o); e++);
		if (xa.releasePrimitive(t), ya.clearBuffer(), s += i[e].byteLength / 32, o) break;
	}
	return Ea = !1, o;
}
function Oa(e, t, n, r, i, a = 0, o = 0, s = 0, c = 0, l = null, u = !1) {
	let d, f;
	u ? (d = ba, f = ya) : (d = ya, f = ba);
	let p = d.float32Array, m = d.uint32Array, h = d.uint16Array, g = f.float32Array, _ = f.uint32Array, v = f.uint16Array, y = e * 2, b = t * 2, x = X(y, h), S = X(b, v), C = !1;
	if (S && x) C = u ? i(Hi(t, _), Ui(t * 2, v), Hi(e, m), Ui(e * 2, h), c, o + t / 8, s, a + e / 8) : i(Hi(e, m), Ui(e * 2, h), Hi(t, _), Ui(t * 2, v), s, a + e / 8, c, o + t / 8);
	else if (S) {
		let l = xa.getPrimitive();
		Y(Z(t), g, l), l.applyMatrix4(n);
		let d = Wi(e), f = Gi(e, m);
		Y(Z(d), p, Sa), Y(Z(f), p, Ca);
		let h = l.intersectsBox(Sa), _ = l.intersectsBox(Ca);
		C = h && Oa(t, d, r, n, i, o, a, c, s + 1, l, !u) || _ && Oa(t, f, r, n, i, o, a, c, s + 1, l, !u), xa.releasePrimitive(l);
	} else {
		let d = Wi(t), f = Gi(t, _);
		Y(Z(d), g, wa), Y(Z(f), g, Ta);
		let h = l.intersectsBox(wa), v = l.intersectsBox(Ta);
		if (h && v) C = Oa(e, d, n, r, i, a, o, s, c + 1, l, u) || Oa(e, f, n, r, i, a, o, s, c + 1, l, u);
		else if (h) if (x) C = Oa(e, d, n, r, i, a, o, s, c + 1, l, u);
		else {
			let t = xa.getPrimitive();
			t.copy(wa).applyMatrix4(n);
			let l = Wi(e), f = Gi(e, m);
			Y(Z(l), p, Sa), Y(Z(f), p, Ca);
			let h = t.intersectsBox(Sa), g = t.intersectsBox(Ca);
			C = h && Oa(d, l, r, n, i, o, a, c, s + 1, t, !u) || g && Oa(d, f, r, n, i, o, a, c, s + 1, t, !u), xa.releasePrimitive(t);
		}
		else if (v) if (x) C = Oa(e, f, n, r, i, a, o, s, c + 1, l, u);
		else {
			let t = xa.getPrimitive();
			t.copy(Ta).applyMatrix4(n);
			let l = Wi(e), d = Gi(e, m);
			Y(Z(l), p, Sa), Y(Z(d), p, Ca);
			let h = t.intersectsBox(Sa), g = t.intersectsBox(Ca);
			C = h && Oa(f, l, r, n, i, o, a, c, s + 1, t, !u) || g && Oa(f, d, r, n, i, o, a, c, s + 1, t, !u), xa.releasePrimitive(t);
		}
	}
	return C;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/BVH.js
var ka = /* @__PURE__ */ new R(), Aa = /* @__PURE__ */ new Float32Array(6), ja = class {
	constructor() {
		this._roots = null, this.primitiveBuffer = null, this.primitiveBufferStride = null;
	}
	init(e) {
		e = {
			...Ii,
			...e
		}, da(this, e);
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
			this.writePrimitiveBounds(n, Aa, 0);
			let [e, t, r, u, d, f] = Aa;
			e < i && (i = e), u > s && (s = u), t < a && (a = t), d > c && (c = d), r < o && (o = r), f > l && (l = f);
		}
		return n[r + 0] = i, n[r + 1] = a, n[r + 2] = o, n[r + 3] = s, n[r + 4] = c, n[r + 5] = l, n;
	}
	computePrimitiveBounds(e, t, n) {
		let r = n.offset || 0;
		for (let i = e, a = e + t; i < a; i++) {
			this.writePrimitiveBounds(i, Aa, 0);
			let [e, t, a, o, s, c] = Aa, l = (e + o) / 2, u = (t + s) / 2, d = (a + c) / 2, f = (o - e) / 2, p = (s - t) / 2, m = (c - a) / 2, h = (i - r) * 6;
			n[h + 0] = l, n[h + 1] = f + (Math.abs(l) + f) * Pi, n[h + 2] = u, n[h + 3] = p + (Math.abs(u) + p) * Pi, n[h + 4] = d, n[h + 5] = m + (Math.abs(d) + m) * Pi;
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
					X(2 * n, a) && (i[n + 6] += e);
				}
			}
		}
	}
	traverse(e, t = 0) {
		let n = this._roots[t], r = new Uint32Array(n), i = new Uint16Array(n);
		a(0);
		function a(t, o = 0) {
			let s = t * 2, c = X(s, i);
			if (c) {
				let a = r[t + 6], l = i[s + 14];
				e(o, c, new Float32Array(n, t * 4, 6), a, l);
			} else {
				let i = Wi(t), s = Gi(t, r), l = Ki(t, r);
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
				if (X(n, i)) {
					let e = Hi(t, r), o = Ui(n, i);
					this.writePrimitiveRangeBounds(e, o, Aa, 0), a.set(Aa, t);
				} else {
					let e = Wi(t), n = Gi(t, r);
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
			Y(0, new Float32Array(t), ka), e.union(ka);
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
			if (s = _a(this, e, n, r, t, c), s) break;
			c += i.byteLength / 32;
		}
		return s;
	}
	bvhcast(e, t, n) {
		let { intersectsRanges: r } = n;
		return Da(this, e, t, r);
	}
};
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/BufferUtils.js
function Ma() {
	return typeof SharedArrayBuffer < "u";
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/geometryUtils.js
function Na(e) {
	return e.index ? e.index.count : e.attributes.position.count;
}
function Pa(e) {
	return Na(e) / 3;
}
function Fa(e, t = ArrayBuffer) {
	return e > 65535 ? new Uint32Array(new t(4 * e)) : new Uint16Array(new t(2 * e));
}
function Ia(e, t) {
	if (!e.index) {
		let n = e.attributes.position.count, r = Fa(n, t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer);
		e.setIndex(new z(r, 1));
		for (let e = 0; e < n; e++) r[e] = e;
	}
}
function La(e, t, n) {
	let r = Na(e) / n, i = t || e.drawRange, a = i.start / n, o = (i.start + i.count) / n, s = Math.max(0, a), c = Math.min(r, o) - s;
	return {
		offset: Math.floor(s),
		count: Math.floor(c)
	};
}
function Ra(e, t) {
	return e.groups.map((e) => ({
		offset: e.start / t,
		count: e.count / t
	}));
}
function za(e, t, n) {
	let r = La(e, t, n), i = Ra(e, n);
	if (!i.length) return [r];
	let a = [], o = r.offset, s = r.offset + r.count, c = Na(e) / n, l = [];
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
function Ba(e, t) {
	let n = e[e.length - 1], r = n.offset + n.count > 2 ** 16, i = e.reduce((e, t) => e + t.count, 0), a = r ? 4 : 2, o = t ? new SharedArrayBuffer(i * a) : new ArrayBuffer(i * a), s = r ? new Uint32Array(o) : new Uint16Array(o), c = 0;
	for (let t = 0; t < e.length; t++) {
		let { offset: n, count: r } = e[t];
		for (let e = 0; e < r; e++) s[c + e] = n + e;
		c += r;
	}
	return s;
}
var Va = class extends ja {
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
		if (t.useSharedArrayBuffer && !Ma()) throw Error("BVH: SharedArrayBuffer is not available.");
		super(), this.geometry = e, this.resolvePrimitiveIndex = t.indirect ? (e) => this._indirectBuffer[e] : (e) => e, this.primitiveBuffer = null, this.primitiveBufferStride = null, this._indirectBuffer = null, t = {
			...Ii,
			...t
		}, t[Fi] || this.init(t);
	}
	init(e) {
		let { geometry: t, primitiveStride: n } = this;
		if (e.indirect) {
			let r = Ba(za(t, e.range, n), e.useSharedArrayBuffer);
			this._indirectBuffer = r;
		} else Ia(t, e);
		super.init(e), !t.boundingBox && e.setBoundingBox && (t.boundingBox = this.getBoundingBox(new R()));
	}
	getRootRanges(e) {
		return this.indirect ? [{
			offset: 0,
			count: this._indirectBuffer.length
		}] : za(this.geometry, e, this.primitiveStride);
	}
	raycastObject3D() {
		throw Error("BVH: raycastObject3D() not implemented");
	}
}, Ha = class {
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
Ha.prototype.setFromBox = (function() {
	let e = /* @__PURE__ */ new V();
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
	let e = /* @__PURE__ */ new Ha();
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
var Ua = (function() {
	let e = /* @__PURE__ */ new V(), t = /* @__PURE__ */ new V(), n = /* @__PURE__ */ new V();
	return function(r, i, a) {
		let o = r.start, s = e, c = i.start, l = t;
		n.subVectors(o, c), e.subVectors(r.end, r.start), t.subVectors(i.end, i.start);
		let u = n.dot(l), d = l.dot(s), f = l.dot(l), p = n.dot(s), m = s.dot(s) * f - d * d, h, g;
		h = m === 0 ? 0 : (u * d - p * f) / m, g = (u + h * d) / f, a.x = h, a.y = g;
	};
})(), Wa = (function() {
	let e = /* @__PURE__ */ new B(), t = /* @__PURE__ */ new V(), n = /* @__PURE__ */ new V();
	return function(r, i, a, o) {
		Ua(r, i, e);
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
})(), Ga = (function() {
	let e = /* @__PURE__ */ new V(), t = /* @__PURE__ */ new V(), n = /* @__PURE__ */ new Ye(), r = /* @__PURE__ */ new Ce();
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
})(), Ka = [
	"x",
	"y",
	"z"
], qa = 1e-15, Ja = qa * qa;
function Ya(e) {
	return Math.abs(e) < qa;
}
var Xa = class extends mt {
	constructor(...e) {
		super(...e), this.isExtendedTriangle = !0, this.satAxes = [
			,
			,
			,
			,
		].fill().map(() => new V()), this.satBounds = [
			,
			,
			,
			,
		].fill().map(() => new Ha()), this.points = [
			this.a,
			this.b,
			this.c
		], this.plane = new Ye(), this.isDegenerateIntoSegment = !1, this.isDegenerateIntoPoint = !1, this.degenerateSegment = new Ce(), this.needsUpdate = !0;
	}
	intersectsSphere(e) {
		return Ga(e, this);
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
		this.isDegenerateIntoPoint = !1, this.isDegenerateIntoSegment = !1, m < qa ? h < qa || g < qa ? this.isDegenerateIntoPoint = !0 : (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(e), this.degenerateSegment.end.copy(n)) : h < qa ? g < qa ? this.isDegenerateIntoPoint = !0 : (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(t), this.degenerateSegment.end.copy(e)) : g < qa && (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(n), this.degenerateSegment.end.copy(t)), this.plane.setFromNormalAndCoplanarPoint(o, e), this.needsUpdate = !1;
	}
};
Xa.prototype.closestPointToSegment = (function() {
	let e = /* @__PURE__ */ new V(), t = /* @__PURE__ */ new V(), n = /* @__PURE__ */ new Ce();
	return function(r, i = null, a = null) {
		let { start: o, end: s } = r, c = this.points, l, u = Infinity;
		for (let o = 0; o < 3; o++) {
			let s = (o + 1) % 3;
			n.start.copy(c[o]), n.end.copy(c[s]), Wa(n, r, e, t), l = e.distanceToSquared(t), l < u && (u = l, i && i.copy(e), a && a.copy(t));
		}
		return this.closestPointToPoint(o, e), l = o.distanceToSquared(e), l < u && (u = l, i && i.copy(e), a && a.copy(o)), this.closestPointToPoint(s, e), l = s.distanceToSquared(e), l < u && (u = l, i && i.copy(e), a && a.copy(s)), Math.sqrt(u);
	};
})(), Xa.prototype.intersectsTriangle = (function() {
	let e = /* @__PURE__ */ new Xa(), t = /* @__PURE__ */ new Ha(), n = /* @__PURE__ */ new Ha(), r = /* @__PURE__ */ new V(), i = /* @__PURE__ */ new V(), a = /* @__PURE__ */ new V(), o = /* @__PURE__ */ new V(), s = /* @__PURE__ */ new Ce(), c = /* @__PURE__ */ new Ce(), l = /* @__PURE__ */ new V(), u = /* @__PURE__ */ new B(), d = /* @__PURE__ */ new B();
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
		return Ya(o) ? Ya(s) ? f(e, t, n, i) : (n && (n.start.copy(a.start), n.end.copy(a.start)), e.containsPoint(a.start)) : Ya(s) ? (n && (n.start.copy(a.end), n.end.copy(a.end)), e.containsPoint(a.end)) : e.plane.intersectLine(a, r) == null ? !1 : (n && (n.start.copy(r), n.end.copy(r)), e.containsPoint(r));
	}
	function g(e, t, n) {
		let r = t.a;
		return Ya(e.plane.distanceToPoint(r)) && e.containsPoint(r) ? (n && (n.start.copy(r), n.end.copy(r)), !0) : !1;
	}
	function _(e, t, n) {
		let i = e.degenerateSegment, a = t.a;
		return i.closestPointToPoint(a, !0, r), a.distanceToSquared(r) < Ja ? (n && (n.start.copy(a), n.end.copy(a)), !0) : !1;
	}
	function v(e, t, n, o) {
		if (e.isDegenerateIntoSegment) if (t.isDegenerateIntoSegment) {
			let o = e.degenerateSegment, s = t.degenerateSegment, c = i, l = a;
			o.delta(c), s.delta(l);
			let u = r.subVectors(s.start, o.start), d = c.x * l.y - c.y * l.x;
			if (Ya(d)) return !1;
			let f = (u.x * l.y - u.y * l.x) / d, p = -(c.x * u.y - c.y * u.x) / d;
			return f < 0 || f > 1 || p < 0 || p > 1 ? !1 : Ya(o.start.z + c.z * f - (s.start.z + l.z * p)) ? (n && (n.start.copy(o.start).addScaledVector(c, f), n.end.copy(o.start).addScaledVector(c, f)), !0) : !1;
		} else if (t.isDegenerateIntoPoint) return _(e, t, n);
		else return h(t, e, n, o);
		else if (e.isDegenerateIntoPoint) return t.isDegenerateIntoPoint ? t.a.distanceToSquared(e.a) < Ja ? (n && (n.start.copy(e.a), n.end.copy(e.a)), !0) : !1 : t.isDegenerateIntoSegment ? _(t, e, n) : g(t, e, n);
		else if (t.isDegenerateIntoPoint) return g(e, t, n);
		else if (t.isDegenerateIntoSegment) return h(e, t, n, o);
	}
	return function(t, n = null, r = !1) {
		this.needsUpdate && this.update(), t.isExtendedTriangle ? t.needsUpdate && t.update() : (e.copy(t), e.update(), t = e);
		let o = v(this, t, n, r);
		if (o !== void 0) return o;
		let p = this.plane, h = t.plane, g = h.distanceToPoint(this.a), _ = h.distanceToPoint(this.b), y = h.distanceToPoint(this.c);
		Ya(g) && (g = 0), Ya(_) && (_ = 0), Ya(y) && (y = 0);
		let b = g * _, x = g * y;
		if (b > 0 && x > 0) return !1;
		let S = p.distanceToPoint(t.a), C = p.distanceToPoint(t.b), w = p.distanceToPoint(t.c);
		Ya(S) && (S = 0), Ya(C) && (C = 0), Ya(w) && (w = 0);
		let T = S * C, E = S * w;
		if (T > 0 && E > 0) return !1;
		i.copy(p.normal), a.copy(h.normal);
		let D = i.cross(a), O = 0, k = Math.abs(D.x), A = Math.abs(D.y);
		A > k && (k = A, O = 1), Math.abs(D.z) > k && (O = 2);
		let j = Ka[O], M = this.a[j], N = this.b[j], P = this.c[j], F = t.a[j], I = t.b[j], L = t.c[j];
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
})(), Xa.prototype.distanceToPoint = (function() {
	let e = /* @__PURE__ */ new V();
	return function(t) {
		return this.closestPointToPoint(t, e), t.distanceTo(e);
	};
})(), Xa.prototype.distanceToTriangle = (function() {
	let e = /* @__PURE__ */ new V(), t = /* @__PURE__ */ new V(), n = [
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
				i.set(a[u], a[d]), Wa(r, i, e, t);
				let f = e.distanceToSquared(t);
				f < l && (l = f, o && o.copy(e), s && s.copy(t));
			}
		}
		return Math.sqrt(l);
	};
})();
//#endregion
//#region node_modules/three-mesh-bvh/src/math/OrientedBox.js
var Za = class {
	constructor(e, t, n) {
		this.isOrientedBox = !0, this.min = new V(), this.max = new V(), this.matrix = new Ie(), this.invMatrix = new Ie(), this.points = Array(8).fill().map(() => new V()), this.satAxes = [
			,
			,
			,
		].fill().map(() => new V()), this.satBounds = [
			,
			,
			,
		].fill().map(() => new Ha()), this.alignedSatBounds = [
			,
			,
			,
		].fill().map(() => new Ha()), this.needsUpdate = !1, e && this.min.copy(e), t && this.max.copy(t), n && this.matrix.copy(n);
	}
	set(e, t, n) {
		this.min.copy(e), this.max.copy(t), this.matrix.copy(n), this.needsUpdate = !0;
	}
	copy(e) {
		this.min.copy(e.min), this.max.copy(e.max), this.matrix.copy(e.matrix), this.needsUpdate = !0;
	}
};
Za.prototype.update = (function() {
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
})(), Za.prototype.intersectsBox = (function() {
	let e = /* @__PURE__ */ new Ha();
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
})(), Za.prototype.intersectsTriangle = (function() {
	let e = /* @__PURE__ */ new Xa(), t = [
		,
		,
		,
	], n = /* @__PURE__ */ new Ha(), r = /* @__PURE__ */ new Ha(), i = /* @__PURE__ */ new V();
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
})(), Za.prototype.closestPointToPoint = (function() {
	return function(e, t) {
		return this.needsUpdate && this.update(), t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix), t;
	};
})(), Za.prototype.distanceToPoint = (function() {
	let e = new V();
	return function(t) {
		return this.closestPointToPoint(t, e), t.distanceTo(e);
	};
})(), Za.prototype.distanceToBox = (function() {
	let e = [
		"x",
		"y",
		"z"
	], t = /* @__PURE__ */ Array(12).fill().map(() => new Ce()), n = /* @__PURE__ */ Array(12).fill().map(() => new Ce()), r = /* @__PURE__ */ new V(), i = /* @__PURE__ */ new V();
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
				Wa(a, t, r, i);
				let o = r.distanceToSquared(i);
				if (o < p && (p = o, s && s.copy(r), c && c.copy(i), o < l)) return Math.sqrt(o);
			}
		}
		return Math.sqrt(p);
	};
})();
var Qa = /* @__PURE__ */ new class extends fa {
	constructor() {
		super(() => new Xa());
	}
}(), $a = /* @__PURE__ */ new V(), eo = /* @__PURE__ */ new V();
function to(e, t, n = {}, r = 0, i = Infinity) {
	let a = r * r, o = i * i, s = Infinity, c = null;
	if (e.shapecast({
		boundsTraverseOrder: (e) => ($a.copy(t).clamp(e.min, e.max), $a.distanceToSquared(t)),
		intersectsBounds: (e, t, n) => n < s && n < o,
		intersectsTriangle: (e, n) => {
			e.closestPointToPoint(t, $a);
			let r = t.distanceToSquared($a);
			return r < s && (eo.copy($a), s = r, c = n), r < a;
		}
	}), s === Infinity) return null;
	let l = Math.sqrt(s);
	return n.point ? n.point.copy(eo) : n.point = eo.clone(), n.distance = l, n.faceIndex = c, n;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/ThreeRayIntersectUtilities.js
var no = parseInt(nt) >= 169, ro = parseInt(nt) <= 161, io = /* @__PURE__ */ new V(), ao = /* @__PURE__ */ new V(), oo = /* @__PURE__ */ new V(), so = /* @__PURE__ */ new B(), co = /* @__PURE__ */ new B(), lo = /* @__PURE__ */ new B(), uo = /* @__PURE__ */ new V(), fo = /* @__PURE__ */ new V(), po = /* @__PURE__ */ new V(), mo = /* @__PURE__ */ new V();
function ho(e, t, n, r, i, a, o, s) {
	let c;
	if (c = a === te ? e.intersectTriangle(r, n, t, !0, i) : e.intersectTriangle(t, n, r, a !== ue, i), c === null) return null;
	let l = e.origin.distanceTo(i);
	return l < o || l > s ? null : {
		distance: l,
		point: i.clone()
	};
}
function go(e, t, n, r, i, a, o, s, c, l, u) {
	io.fromBufferAttribute(t, a), ao.fromBufferAttribute(t, o), oo.fromBufferAttribute(t, s);
	let d = ho(e, io, ao, oo, mo, c, l, u);
	if (d) {
		if (r) {
			so.fromBufferAttribute(r, a), co.fromBufferAttribute(r, o), lo.fromBufferAttribute(r, s), d.uv = new B();
			let e = mt.getInterpolation(mo, io, ao, oo, so, co, lo, d.uv);
			no || (d.uv = e);
		}
		if (i) {
			so.fromBufferAttribute(i, a), co.fromBufferAttribute(i, o), lo.fromBufferAttribute(i, s), d.uv1 = new B();
			let e = mt.getInterpolation(mo, io, ao, oo, so, co, lo, d.uv1);
			no || (d.uv1 = e), ro && (d.uv2 = d.uv1);
		}
		if (n) {
			uo.fromBufferAttribute(n, a), fo.fromBufferAttribute(n, o), po.fromBufferAttribute(n, s), d.normal = new V();
			let t = mt.getInterpolation(mo, io, ao, oo, uo, fo, po, d.normal);
			d.normal.dot(e.direction) > 0 && d.normal.multiplyScalar(-1), no || (d.normal = t);
		}
		let t = {
			a,
			b: o,
			c: s,
			normal: new V(),
			materialIndex: 0
		};
		if (mt.getNormal(io, ao, oo, t.normal), d.face = t, d.faceIndex = a, no) {
			let e = new V();
			mt.getBarycoord(mo, io, ao, oo, e), d.barycoord = e;
		}
	}
	return d;
}
function _o(e) {
	return e && e.isMaterial ? e.side : e;
}
function vo(e, t, n, r, i, a, o) {
	let s = r * 3, c = s + 0, l = s + 1, u = s + 2, { index: d, groups: f } = e;
	e.index && (c = d.getX(c), l = d.getX(l), u = d.getX(u));
	let { position: p, normal: m, uv: h, uv1: g } = e.attributes;
	if (Array.isArray(t)) {
		let e = r * 3;
		for (let s = 0, d = f.length; s < d; s++) {
			let { start: d, count: _, materialIndex: v } = f[s];
			if (e >= d && e < d + _) {
				let e = _o(t[v]), s = go(n, p, m, h, g, c, l, u, e, a, o);
				if (s) if (s.faceIndex = r, s.face.materialIndex = v, i) i.push(s);
				else return s;
			}
		}
	} else {
		let e = _o(t), s = go(n, p, m, h, g, c, l, u, e, a, o);
		if (s) if (s.faceIndex = r, s.face.materialIndex = 0, i) i.push(s);
		else return s;
	}
	return null;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/TriangleUtilities.js
function $(e, t, n, r) {
	let i = e.a, a = e.b, o = e.c, s = t, c = t + 1, l = t + 2;
	n && (s = n.getX(s), c = n.getX(c), l = n.getX(l)), i.x = r.getX(s), i.y = r.getY(s), i.z = r.getZ(s), a.x = r.getX(c), a.y = r.getY(c), a.z = r.getZ(c), o.x = r.getX(l), o.y = r.getY(l), o.z = r.getZ(l);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/iterationUtils.generated.js
function yo(e, t, n, r, i, a, o, s) {
	let { geometry: c, _indirectBuffer: l } = e;
	for (let e = r, l = r + i; e < l; e++) vo(c, t, n, e, a, o, s);
}
function bo(e, t, n, r, i, a, o) {
	let { geometry: s, _indirectBuffer: c } = e, l = Infinity, u = null;
	for (let e = r, c = r + i; e < c; e++) {
		let r;
		r = vo(s, t, n, e, null, a, o), r && r.distance < l && (u = r, l = r.distance);
	}
	return u;
}
function xo(e, t, n, r, i, a, o) {
	let { geometry: s } = n, { index: c } = s, l = s.attributes.position;
	for (let n = e, s = t + e; n < s; n++) {
		let e;
		if (e = n, $(o, e * 3, c, l), o.needsUpdate = !0, r(o, e, i, a)) return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/refit.generated.js
function So(e, t = null) {
	t && Array.isArray(t) && (t = new Set(t));
	let n = e.geometry, r = n.index ? n.index.array : null, i = n.attributes.position, a, o, s, c, l = 0, u = e._roots;
	for (let e = 0, t = u.length; e < t; e++) a = u[e], o = new Uint32Array(a), s = new Uint16Array(a), c = new Float32Array(a), d(0, l), l += a.byteLength;
	function d(e, n, a = !1) {
		let l = e * 2;
		if (X(l, s)) {
			let t = Hi(e, o), n = Ui(l, s), a = Infinity, u = Infinity, d = Infinity, f = -Infinity, p = -Infinity, m = -Infinity;
			for (let e = 3 * t, o = 3 * (t + n); e < o; e++) {
				let t = r[e], n = i.getX(t), o = i.getY(t), s = i.getZ(t);
				n < a && (a = n), n > f && (f = n), o < u && (u = o), o > p && (p = o), s < d && (d = s), s > m && (m = s);
			}
			return c[e + 0] !== a || c[e + 1] !== u || c[e + 2] !== d || c[e + 3] !== f || c[e + 4] !== p || c[e + 5] !== m ? (c[e + 0] = a, c[e + 1] = u, c[e + 2] = d, c[e + 3] = f, c[e + 4] = p, c[e + 5] = m, !0) : !1;
		} else {
			let r = Wi(e), i = Gi(e, o), s = a, l = !1, u = !1;
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
function Co(e, t, n, r, i) {
	let a, o, s, c, l, u, d = 1 / n.direction.x, f = 1 / n.direction.y, p = 1 / n.direction.z, m = n.origin.x, h = n.origin.y, g = n.origin.z, _ = t[e], v = t[e + 3], y = t[e + 1], b = t[e + 3 + 1], x = t[e + 2], S = t[e + 3 + 2];
	return d >= 0 ? (a = (_ - m) * d, o = (v - m) * d) : (a = (v - m) * d, o = (_ - m) * d), f >= 0 ? (s = (y - h) * f, c = (b - h) * f) : (s = (b - h) * f, c = (y - h) * f), a > c || s > o || ((s > a || isNaN(a)) && (a = s), (c < o || isNaN(o)) && (o = c), p >= 0 ? (l = (x - g) * p, u = (S - g) * p) : (l = (S - g) * p, u = (x - g) * p), a > u || l > o) ? !1 : ((l > a || a !== a) && (a = l), (u < o || o !== o) && (o = u), a <= i && o >= r);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/iterationUtils_indirect.generated.js
function wo(e, t, n, r, i, a, o, s) {
	let { geometry: c, _indirectBuffer: l } = e;
	for (let e = r, u = r + i; e < u; e++) vo(c, t, n, l ? l[e] : e, a, o, s);
}
function To(e, t, n, r, i, a, o) {
	let { geometry: s, _indirectBuffer: c } = e, l = Infinity, u = null;
	for (let e = r, d = r + i; e < d; e++) {
		let r;
		r = vo(s, t, n, c ? c[e] : e, null, a, o), r && r.distance < l && (u = r, l = r.distance);
	}
	return u;
}
function Eo(e, t, n, r, i, a, o) {
	let { geometry: s } = n, { index: c } = s, l = s.attributes.position;
	for (let s = e, u = t + e; s < u; s++) {
		let e;
		if (e = n.resolveTriangleIndex(s), $(o, e * 3, c, l), o.needsUpdate = !0, r(o, e, i, a)) return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycast.generated.js
function Do(e, t, n, r, i, a, o) {
	Q.setBuffer(e._roots[t]), Oo(0, e, n, r, i, a, o), Q.clearBuffer();
}
function Oo(e, t, n, r, i, a, o) {
	let { float32Array: s, uint16Array: c, uint32Array: l } = Q, u = e * 2;
	if (X(u, c)) yo(t, n, r, Hi(e, l), Ui(u, c), i, a, o);
	else {
		let c = Wi(e);
		Co(c, s, r, a, o) && Oo(c, t, n, r, i, a, o);
		let u = Gi(e, l);
		Co(u, s, r, a, o) && Oo(u, t, n, r, i, a, o);
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycastFirst.generated.js
var ko = [
	"x",
	"y",
	"z"
];
function Ao(e, t, n, r, i, a) {
	Q.setBuffer(e._roots[t]);
	let o = jo(0, e, n, r, i, a);
	return Q.clearBuffer(), o;
}
function jo(e, t, n, r, i, a) {
	let { float32Array: o, uint16Array: s, uint32Array: c } = Q, l = e * 2;
	if (X(l, s)) return bo(t, n, r, Hi(e, c), Ui(l, s), i, a);
	{
		let s = Ki(e, c), l = ko[s], u = r.direction[l] >= 0, d, f;
		u ? (d = Wi(e), f = Gi(e, c)) : (d = Gi(e, c), f = Wi(e));
		let p = Co(d, o, r, i, a) ? jo(d, t, n, r, i, a) : null;
		if (p) {
			let e = p.point[l];
			if (u ? e <= o[f + s] : e >= o[f + s + 3]) return p;
		}
		let m = Co(f, o, r, i, a) ? jo(f, t, n, r, i, a) : null;
		return p && m ? p.distance <= m.distance ? p : m : p || m || null;
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/intersectsGeometry.generated.js
var Mo = /* @__PURE__ */ new R(), No = /* @__PURE__ */ new Xa(), Po = /* @__PURE__ */ new Xa(), Fo = /* @__PURE__ */ new Ie(), Io = /* @__PURE__ */ new Za(), Lo = /* @__PURE__ */ new Za();
function Ro(e, t, n, r) {
	Q.setBuffer(e._roots[t]);
	let i = zo(0, e, n, r);
	return Q.clearBuffer(), i;
}
function zo(e, t, n, r, i = null) {
	let { float32Array: a, uint16Array: o, uint32Array: s } = Q, c = e * 2;
	if (i === null && (n.boundingBox || n.computeBoundingBox(), Io.set(n.boundingBox.min, n.boundingBox.max, r), i = Io), X(c, o)) {
		let i = t.geometry, l = i.index, u = i.attributes.position, d = n.index, f = n.attributes.position, p = Hi(e, s), m = Ui(c, o);
		if (Fo.copy(r).invert(), n.boundsTree) return Y(Z(e), a, Lo), Lo.matrix.copy(Fo), Lo.needsUpdate = !0, n.boundsTree.shapecast({
			intersectsBounds: (e) => Lo.intersectsBox(e),
			intersectsTriangle: (e) => {
				e.a.applyMatrix4(r), e.b.applyMatrix4(r), e.c.applyMatrix4(r), e.needsUpdate = !0;
				for (let t = p * 3, n = (m + p) * 3; t < n; t += 3) if ($(Po, t, l, u), Po.needsUpdate = !0, e.intersectsTriangle(Po)) return !0;
				return !1;
			}
		});
		{
			let e = Pa(n);
			for (let t = p * 3, n = (m + p) * 3; t < n; t += 3) {
				$(No, t, l, u), No.a.applyMatrix4(Fo), No.b.applyMatrix4(Fo), No.c.applyMatrix4(Fo), No.needsUpdate = !0;
				for (let t = 0, n = e * 3; t < n; t += 3) if ($(Po, t, d, f), Po.needsUpdate = !0, No.intersectsTriangle(Po)) return !0;
			}
		}
	} else {
		let o = Wi(e), c = Gi(e, s);
		return Y(Z(o), a, Mo), !!(i.intersectsBox(Mo) && zo(o, t, n, r, i) || (Y(Z(c), a, Mo), i.intersectsBox(Mo) && zo(c, t, n, r, i)));
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/closestPointToGeometry.generated.js
var Bo = /* @__PURE__ */ new Ie(), Vo = /* @__PURE__ */ new Za(), Ho = /* @__PURE__ */ new Za(), Uo = /* @__PURE__ */ new V(), Wo = /* @__PURE__ */ new V(), Go = /* @__PURE__ */ new V(), Ko = /* @__PURE__ */ new V();
function qo(e, t, n, r = {}, i = {}, a = 0, o = Infinity) {
	t.boundingBox || t.computeBoundingBox(), Vo.set(t.boundingBox.min, t.boundingBox.max, n), Vo.needsUpdate = !0;
	let s = e.geometry, c = s.attributes.position, l = s.index, u = t.attributes.position, d = t.index, f = Qa.getPrimitive(), p = Qa.getPrimitive(), m = Uo, h = Wo, g = null, _ = null;
	i && (g = Go, _ = Ko);
	let v = Infinity, y = null, b = null;
	return Bo.copy(n).invert(), Ho.matrix.copy(Bo), e.shapecast({
		boundsTraverseOrder: (e) => Vo.distanceToBox(e),
		intersectsBounds: (e, t, n) => n < v && n < o ? (t && (Ho.min.copy(e.min), Ho.max.copy(e.max), Ho.needsUpdate = !0), !0) : !1,
		intersectsRange: (e, r) => {
			if (t.boundsTree) return t.boundsTree.shapecast({
				boundsTraverseOrder: (e) => Ho.distanceToBox(e),
				intersectsBounds: (e, t, n) => n < v && n < o,
				intersectsRange: (t, i) => {
					for (let o = t, s = t + i; o < s; o++) {
						$(p, 3 * o, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
						for (let t = e, n = e + r; t < n; t++) {
							$(f, 3 * t, l, c), f.needsUpdate = !0;
							let e = f.distanceToTriangle(p, m, g);
							if (e < v && (h.copy(m), _ && _.copy(g), v = e, y = t, b = o), e < a) return !0;
						}
					}
				}
			});
			{
				let i = Pa(t);
				for (let t = 0, o = i; t < o; t++) {
					$(p, 3 * t, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
					for (let n = e, i = e + r; n < i; n++) {
						$(f, 3 * n, l, c), f.needsUpdate = !0;
						let e = f.distanceToTriangle(p, m, g);
						if (e < v && (h.copy(m), _ && _.copy(g), v = e, y = n, b = t), e < a) return !0;
					}
				}
			}
		}
	}), Qa.releasePrimitive(f), Qa.releasePrimitive(p), v === Infinity ? null : (r.point ? r.point.copy(h) : r.point = h.clone(), r.distance = v, r.faceIndex = y, i && (i.point ? i.point.copy(_) : i.point = _.clone(), i.point.applyMatrix4(Bo), h.applyMatrix4(Bo), i.distance = h.sub(i.point).length(), i.faceIndex = b), r);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/refit_indirect.generated.js
function Jo(e, t = null) {
	t && Array.isArray(t) && (t = new Set(t));
	let n = e.geometry, r = n.index ? n.index.array : null, i = n.attributes.position, a, o, s, c, l = 0, u = e._roots;
	for (let e = 0, t = u.length; e < t; e++) a = u[e], o = new Uint32Array(a), s = new Uint16Array(a), c = new Float32Array(a), d(0, l), l += a.byteLength;
	function d(n, a, l = !1) {
		let u = n * 2;
		if (X(u, s)) {
			let t = Hi(n, o), a = Ui(u, s), l = Infinity, d = Infinity, f = Infinity, p = -Infinity, m = -Infinity, h = -Infinity;
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
			let e = Wi(n), r = Gi(n, o), i = l, s = !1, u = !1;
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
function Yo(e, t, n, r, i, a, o) {
	Q.setBuffer(e._roots[t]), Xo(0, e, n, r, i, a, o), Q.clearBuffer();
}
function Xo(e, t, n, r, i, a, o) {
	let { float32Array: s, uint16Array: c, uint32Array: l } = Q, u = e * 2;
	if (X(u, c)) wo(t, n, r, Hi(e, l), Ui(u, c), i, a, o);
	else {
		let c = Wi(e);
		Co(c, s, r, a, o) && Xo(c, t, n, r, i, a, o);
		let u = Gi(e, l);
		Co(u, s, r, a, o) && Xo(u, t, n, r, i, a, o);
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycastFirst_indirect.generated.js
var Zo = [
	"x",
	"y",
	"z"
];
function Qo(e, t, n, r, i, a) {
	Q.setBuffer(e._roots[t]);
	let o = $o(0, e, n, r, i, a);
	return Q.clearBuffer(), o;
}
function $o(e, t, n, r, i, a) {
	let { float32Array: o, uint16Array: s, uint32Array: c } = Q, l = e * 2;
	if (X(l, s)) return To(t, n, r, Hi(e, c), Ui(l, s), i, a);
	{
		let s = Ki(e, c), l = Zo[s], u = r.direction[l] >= 0, d, f;
		u ? (d = Wi(e), f = Gi(e, c)) : (d = Gi(e, c), f = Wi(e));
		let p = Co(d, o, r, i, a) ? $o(d, t, n, r, i, a) : null;
		if (p) {
			let e = p.point[l];
			if (u ? e <= o[f + s] : e >= o[f + s + 3]) return p;
		}
		let m = Co(f, o, r, i, a) ? $o(f, t, n, r, i, a) : null;
		return p && m ? p.distance <= m.distance ? p : m : p || m || null;
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/intersectsGeometry_indirect.generated.js
var es = /* @__PURE__ */ new R(), ts = /* @__PURE__ */ new Xa(), ns = /* @__PURE__ */ new Xa(), rs = /* @__PURE__ */ new Ie(), is = /* @__PURE__ */ new Za(), as = /* @__PURE__ */ new Za();
function os(e, t, n, r) {
	Q.setBuffer(e._roots[t]);
	let i = ss(0, e, n, r);
	return Q.clearBuffer(), i;
}
function ss(e, t, n, r, i = null) {
	let { float32Array: a, uint16Array: o, uint32Array: s } = Q, c = e * 2;
	if (i === null && (n.boundingBox || n.computeBoundingBox(), is.set(n.boundingBox.min, n.boundingBox.max, r), i = is), X(c, o)) {
		let i = t.geometry, l = i.index, u = i.attributes.position, d = n.index, f = n.attributes.position, p = Hi(e, s), m = Ui(c, o);
		if (rs.copy(r).invert(), n.boundsTree) return Y(Z(e), a, as), as.matrix.copy(rs), as.needsUpdate = !0, n.boundsTree.shapecast({
			intersectsBounds: (e) => as.intersectsBox(e),
			intersectsTriangle: (e) => {
				e.a.applyMatrix4(r), e.b.applyMatrix4(r), e.c.applyMatrix4(r), e.needsUpdate = !0;
				for (let n = p, r = m + p; n < r; n++) if ($(ns, 3 * t.resolveTriangleIndex(n), l, u), ns.needsUpdate = !0, e.intersectsTriangle(ns)) return !0;
				return !1;
			}
		});
		{
			let e = Pa(n);
			for (let n = p, r = m + p; n < r; n++) {
				$(ts, 3 * t.resolveTriangleIndex(n), l, u), ts.a.applyMatrix4(rs), ts.b.applyMatrix4(rs), ts.c.applyMatrix4(rs), ts.needsUpdate = !0;
				for (let t = 0, n = e * 3; t < n; t += 3) if ($(ns, t, d, f), ns.needsUpdate = !0, ts.intersectsTriangle(ns)) return !0;
			}
		}
	} else {
		let o = Wi(e), c = Gi(e, s);
		return Y(Z(o), a, es), !!(i.intersectsBox(es) && ss(o, t, n, r, i) || (Y(Z(c), a, es), i.intersectsBox(es) && ss(c, t, n, r, i)));
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/closestPointToGeometry_indirect.generated.js
var cs = /* @__PURE__ */ new Ie(), ls = /* @__PURE__ */ new Za(), us = /* @__PURE__ */ new Za(), ds = /* @__PURE__ */ new V(), fs = /* @__PURE__ */ new V(), ps = /* @__PURE__ */ new V(), ms = /* @__PURE__ */ new V();
function hs(e, t, n, r = {}, i = {}, a = 0, o = Infinity) {
	t.boundingBox || t.computeBoundingBox(), ls.set(t.boundingBox.min, t.boundingBox.max, n), ls.needsUpdate = !0;
	let s = e.geometry, c = s.attributes.position, l = s.index, u = t.attributes.position, d = t.index, f = Qa.getPrimitive(), p = Qa.getPrimitive(), m = ds, h = fs, g = null, _ = null;
	i && (g = ps, _ = ms);
	let v = Infinity, y = null, b = null;
	return cs.copy(n).invert(), us.matrix.copy(cs), e.shapecast({
		boundsTraverseOrder: (e) => ls.distanceToBox(e),
		intersectsBounds: (e, t, n) => n < v && n < o ? (t && (us.min.copy(e.min), us.max.copy(e.max), us.needsUpdate = !0), !0) : !1,
		intersectsRange: (r, i) => {
			if (t.boundsTree) {
				let s = t.boundsTree;
				return s.shapecast({
					boundsTraverseOrder: (e) => us.distanceToBox(e),
					intersectsBounds: (e, t, n) => n < v && n < o,
					intersectsRange: (t, o) => {
						for (let x = t, S = t + o; x < S; x++) {
							$(p, 3 * s.resolveTriangleIndex(x), d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
							for (let t = r, n = r + i; t < n; t++) {
								$(f, 3 * e.resolveTriangleIndex(t), l, c), f.needsUpdate = !0;
								let n = f.distanceToTriangle(p, m, g);
								if (n < v && (h.copy(m), _ && _.copy(g), v = n, y = t, b = x), n < a) return !0;
							}
						}
					}
				});
			} else {
				let o = Pa(t);
				for (let t = 0, s = o; t < s; t++) {
					$(p, 3 * t, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
					for (let n = r, o = r + i; n < o; n++) {
						$(f, 3 * e.resolveTriangleIndex(n), l, c), f.needsUpdate = !0;
						let r = f.distanceToTriangle(p, m, g);
						if (r < v && (h.copy(m), _ && _.copy(g), v = r, y = n, b = t), r < a) return !0;
					}
				}
			}
		}
	}), Qa.releasePrimitive(f), Qa.releasePrimitive(p), v === Infinity ? null : (r.point ? r.point.copy(h) : r.point = h.clone(), r.distance = v, r.faceIndex = y, i && (i.point ? i.point.copy(_) : i.point = _.clone(), i.point.applyMatrix4(cs), h.applyMatrix4(cs), i.distance = h.sub(i.point).length(), i.faceIndex = b), r);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/GeometryRayIntersectUtilities.js
function gs(e, t, n) {
	return e === null ? null : (e.point.applyMatrix4(t.matrixWorld), e.distance = e.point.distanceTo(n.ray.origin), e.object = t, e);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/MeshBVH.js
var _s = /* @__PURE__ */ new Za(), vs = /* @__PURE__ */ new rt(), ys = /* @__PURE__ */ new V(), bs = /* @__PURE__ */ new Ie(), xs = /* @__PURE__ */ new V(), Ss = [
	"getX",
	"getY",
	"getZ"
], Cs = class e extends Va {
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
			[Fi]: !0
		});
		if (s._roots = a, s._indirectBuffer = o || null, r.setIndex) {
			let e = n.getIndex();
			if (e === null) {
				let e = new z(t.index, 1, !1);
				n.setIndex(e);
			} else e.array !== i && (e.array.set(i), e.needsUpdate = !0);
		}
		return s;
		function c(e) {
			for (let t = 0; t < e.length; t++) {
				let n = e[t], r = new Uint32Array(n), i = new Uint16Array(n);
				for (let e = 0, t = n.byteLength / 32; e < t; e++) {
					let t = 8 * e;
					X(2 * t, i) || (r[t + 6] = r[t + 6] / 8 - e);
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
			let r = a[Ss[e]](c), i = a[Ss[e]](l), o = a[Ss[e]](u), s = r;
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
				n[t + g + 0] = l + f, n[t + g + 1] = f + (Math.abs(l) + f) * Pi;
			}
		}
		return n;
	}
	raycastObject3D(e, t, n = []) {
		let { material: r } = e;
		if (r === void 0) return;
		bs.copy(e.matrixWorld).invert(), vs.copy(t.ray).applyMatrix4(bs), xs.setFromMatrixScale(e.matrixWorld), ys.copy(vs.direction).multiply(xs);
		let i = ys.length(), a = t.near / i, o = t.far / i;
		if (t.firstHitOnly === !0) {
			let i = this.raycastFirst(vs, r, a, o);
			i = gs(i, e, t), i && n.push(i);
		} else {
			let i = this.raycast(vs, r, a, o);
			for (let r = 0, a = i.length; r < a; r++) {
				let a = gs(i[r], e, t);
				a && n.push(a);
			}
		}
		return n;
	}
	refit(e = null) {
		return (this.indirect ? Jo : So)(this, e);
	}
	raycast(e, t = fe, n = 0, r = Infinity) {
		let i = this._roots, a = [], o = this.indirect ? Yo : Do;
		for (let s = 0, c = i.length; s < c; s++) o(this, s, t, e, a, n, r);
		return a;
	}
	raycastFirst(e, t = fe, n = 0, r = Infinity) {
		let i = this._roots, a = null, o = this.indirect ? Qo : Ao;
		for (let s = 0, c = i.length; s < c; s++) {
			let i = o(this, s, t, e, n, r);
			i != null && (a == null || i.distance < a.distance) && (a = i);
		}
		return a;
	}
	intersectsGeometry(e, t) {
		let n = !1, r = this._roots, i = this.indirect ? os : Ro;
		for (let a = 0, o = r.length; a < o && (n = i(this, a, e, t), !n); a++);
		return n;
	}
	shapecast(e) {
		let t = Qa.getPrimitive(), n = super.shapecast({
			...e,
			intersectsPrimitive: e.intersectsTriangle,
			scratchPrimitive: t,
			iterate: this.indirect ? Eo : xo
		});
		return Qa.releasePrimitive(t), n;
	}
	bvhcast(t, n, r) {
		let { intersectsRanges: i, intersectsTriangles: a } = r, o = Qa.getPrimitive(), s = this.geometry.index, c = this.geometry.attributes.position, l = this.indirect ? (e) => {
			$(o, this.resolveTriangleIndex(e) * 3, s, c);
		} : (e) => {
			$(o, e * 3, s, c);
		}, u = Qa.getPrimitive(), d = t.geometry.index, f = t.geometry.attributes.position, p = t.indirect ? (e) => {
			$(u, t.resolveTriangleIndex(e) * 3, d, f);
		} : (e) => {
			$(u, e * 3, d, f);
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
		return _s.set(e.min, e.max, t), _s.needsUpdate = !0, this.shapecast({
			intersectsBounds: (e) => _s.intersectsBox(e),
			intersectsTriangle: (e) => _s.intersectsTriangle(e)
		});
	}
	intersectsSphere(e) {
		return this.shapecast({
			intersectsBounds: (t) => e.intersectsBox(t),
			intersectsTriangle: (t) => t.intersectsSphere(e)
		});
	}
	closestPointToGeometry(e, t, n = {}, r = {}, i = 0, a = Infinity) {
		return (this.indirect ? hs : qo)(this, e, t, n, r, i, a);
	}
	closestPointToPoint(e, t = {}, n = 0, r = Infinity) {
		return to(this, e, t, n, r);
	}
}, ws = {
	Mesh: Le.prototype.raycast,
	Line: Se.prototype.raycast,
	LineSegments: Ee.prototype.raycast,
	LineLoop: Te.prototype.raycast,
	Points: Ze.prototype.raycast,
	BatchedMesh: ne.prototype.raycast
}, Ts = /* @__PURE__ */ new Le(), Es = [];
function Ds(e, t) {
	if (this.isBatchedMesh) Os.call(this, e, t);
	else {
		let { geometry: n } = this;
		if (n.boundsTree) n.boundsTree.raycastObject3D(this, e, t);
		else {
			let n;
			if (this instanceof Le) n = ws.Mesh;
			else if (this instanceof Ee) n = ws.LineSegments;
			else if (this instanceof Te) n = ws.LineLoop;
			else if (this instanceof Se) n = ws.Line;
			else if (this instanceof Ze) n = ws.Points;
			else throw Error("BVH: Fallback raycast function not found.");
			n.call(this, e, t);
		}
	}
}
function Os(e, t) {
	if (this.boundsTrees) {
		let n = this.boundsTrees, r = this._drawInfo || this._instanceInfo, i = this._drawRanges || this._geometryInfo, a = this.matrixWorld;
		Ts.material = this.material, Ts.geometry = this.geometry;
		let o = Ts.geometry.boundsTree, s = Ts.geometry.drawRange;
		Ts.geometry.boundingSphere === null && (Ts.geometry.boundingSphere = new ct());
		for (let o = 0, s = r.length; o < s; o++) {
			if (!this.getVisibleAt(o)) continue;
			let s = r[o].geometryIndex;
			if (Ts.geometry.boundsTree = n[s], this.getMatrixAt(o, Ts.matrixWorld).premultiply(a), !Ts.geometry.boundsTree) {
				this.getBoundingBoxAt(s, Ts.geometry.boundingBox), this.getBoundingSphereAt(s, Ts.geometry.boundingSphere);
				let e = i[s];
				Ts.geometry.setDrawRange(e.start, e.count);
			}
			Ts.raycast(e, Es);
			for (let e = 0, n = Es.length; e < n; e++) {
				let n = Es[e];
				n.object = this, n.batchId = o, t.push(n);
			}
			Es.length = 0;
		}
		Ts.geometry.boundsTree = o, Ts.geometry.drawRange = s, Ts.material = null, Ts.geometry = null;
	} else ws.BatchedMesh.call(this, e, t);
}
function ks(e = {}) {
	let { type: t = Cs } = e;
	return this.boundsTree = new t(this, e), this.boundsTree;
}
function As() {
	this.boundsTree = null;
}
L.BufferGeometry.prototype.computeBoundsTree = ks, L.BufferGeometry.prototype.disposeBoundsTree = As, L.Mesh.prototype.raycast = Ds;
var js = class {
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
}, Ms = class {
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
}, Ns = class {
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
function Ps(e) {
	return e < .5 ? 4 * e ** 3 : 1 - (-2 * e + 2) ** 3 / 2;
}
function Fs(e, t, n, r, i) {
	let a = performance.now(), o = e.position.clone(), s = t.target.clone();
	function c(l) {
		let u = Math.min((l - a) / i, 1), d = Ps(u);
		e.position.lerpVectors(o, n, d), t.target.lerpVectors(s, r, d), t.update(), u < 1 && requestAnimationFrame(c);
	}
	requestAnimationFrame(c);
}
var Is = class {
	camera;
	controls;
	constructor(e, t) {
		this.camera = e, this.controls = t;
	}
	flyTo(e, t, n = 750) {
		let r = t ?? e.clone().setY(0), i = e.clone();
		Fs(this.camera, this.controls, i, r, n);
	}
	flyToDevice(e) {
		let t = e.clone().add(new L.Vector3(0, 10, 15)), n = e.clone().setY(1.5);
		Fs(this.camera, this.controls, t, n, 700);
	}
	flyToSpace(e, t) {
		let n = Math.max(t.width, t.depth) * .9, r = e.clone().add(new L.Vector3(0, n * .7, n * .8)), i = e.clone();
		Fs(this.camera, this.controls, r, i, 700);
	}
	flyToOverview() {
		Fs(this.camera, this.controls, new L.Vector3(0, 60, 80), new L.Vector3(0, 0, 0), 700);
	}
}, Ls = class {
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
}, Rs = class {
	changes = [];
	undoStack = [];
	redoStack = [];
	_dirty = !1;
	onChangeCb;
	onSaveCb;
	snapshotFn;
	constructor(e) {
		this.onChangeCb = e.onChange, this.onSaveCb = e.onSave;
	}
	setSnapshotFn(e) {
		this.snapshotFn = e;
	}
	record(e, t, n, r, i) {
		let a = {
			id: Math.random().toString(36).slice(2),
			type: e,
			targetType: t,
			targetId: n,
			before: r,
			after: i,
			source: "user",
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		};
		return this.changes.push(a), this.undoStack.push([a]), this.undoStack.length > 50 && this.undoStack.shift(), this.redoStack = [], this._dirty = !0, this.onChangeCb?.(a), a;
	}
	undo() {
		let e = this.undoStack.pop();
		return e ? (this.redoStack.push(e), e) : null;
	}
	redo() {
		let e = this.redoStack.pop();
		return e ? (this.undoStack.push(e), e) : null;
	}
	canUndo() {
		return this.undoStack.length > 0;
	}
	canRedo() {
		return this.redoStack.length > 0;
	}
	isDirty() {
		return this._dirty;
	}
	getChanges() {
		return [...this.changes];
	}
	async save() {
		!this.snapshotFn || !this.onSaveCb || (await this.onSaveCb(this.snapshotFn()), this._dirty = !1);
	}
	clearDirty() {
		this._dirty = !1;
	}
}, zs = class {
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
}, Bs = "topospace.customTypes", Vs = I("deviceTypes", () => {
	let e = S(t());
	function t() {
		try {
			let e = localStorage.getItem(Bs);
			return e ? new Map(JSON.parse(e).map((e) => [e.id, e])) : /* @__PURE__ */ new Map();
		} catch {
			return /* @__PURE__ */ new Map();
		}
	}
	function n() {
		localStorage.setItem(Bs, JSON.stringify([...e.value.values()]));
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
}), Hs = Symbol("topospace-editor-options"), Us = /* @__PURE__ */ new WeakMap(), Ws = {};
function Gs(e = {}) {
	Ws = e;
}
function Ks() {
	let e = H(), t = U(), n = m(Hs, Ws), r = Us.get(e);
	return r ? r.configure(n) : (r = qs(e, t, n), Us.set(e, r)), r;
}
function qs(e, t, n = {}) {
	let r = new Ln(), i = new Rs({}), a = new zs(), o = Vs(), s, c, l, u, d, f, p, m, g, _, v, y, b = null, x = !1, S = {
		x: 0,
		y: 0
	}, C = null, w = null, T = null, E = [], D = /* @__PURE__ */ new Map(), O = [], k = n, j = 0, M = 0, N = 0;
	function P(e = {}) {
		k = e;
	}
	function F(n, i, a) {
		x || (b = n, x = !0, e.configureSecurity({
			mode: k.mode ?? t.mode,
			features: k.features,
			permissionResolver: k.permissionResolver,
			onPermissionDenied: (e) => {
				t.addToast("Permission denied", "warning"), k.onPermissionDenied?.(e);
			},
			onChange: k.onChange
		}), t.setMode(k.mode ?? t.mode), r.init(n, i, a, { onError: (e, t) => k.onError?.(e, t) }), s = new gi(r.scene), c = new vi(r.scene), l = new xi(r.scene), u = new Ti(r.scene), d = new Ei(r.scene), f = new ki(r.scene), p = new ji(r.scene), y = new Is(r.camera, r.controls), _ = new Ns(), m = new js(r.camera, s, c, l), g = new Ms(r.camera, l, s, (e, n, r, i) => t.showContextMenu(r, i, e, n)), v = new Ls(r.scene), k.data ? e.replaceData(k.data) : k.mockData !== !1 && e.loadMockData(), h(() => I()), te(n), ne(), ie(), k.onReady?.());
	}
	async function I() {
		await fi(o.customTypes), c.loadSpaces([...e.spaces.values()]), s.loadInstanced([...e.devices.values()], e.mappings, (t) => e.getMappingByDeviceId(t)), l.loadLinks([...e.links.values()], (e) => s.getDeviceWorldPos(e)), ee(), f.loadNodes([...e.virtualNodes.values()]);
	}
	function ee() {
		u.syncLinks([...e.links.values()], (e) => l.getLinkPath(e), (t) => e.devices.get(t)?.metrics?.networkOut ?? 100);
	}
	function te(e) {
		e.addEventListener("pointerdown", se), e.addEventListener("pointermove", ce), e.addEventListener("pointerup", le), e.addEventListener("contextmenu", Te), window.addEventListener("keydown", ue);
	}
	function ne() {
		e.devices.forEach((e) => D.set(e.id, e.status ?? "unknown")), O.push(A(() => {
			let t = "";
			return e.devices.forEach((e) => {
				t += `${e.id}:${e.status};`;
			}), t;
		}, () => {
			e.devices.forEach((e) => {
				let t = e.status ?? "unknown", n = D.get(e.id);
				if (s.updateStatus(e.id, t), n !== void 0 && n !== t) {
					let r = s.getDeviceWorldPos(e.id);
					r && (t === "critical" || t === "offline" ? p.flash(r, "critical") : t === "warning" ? p.flash(r, "warning") : t === "normal" && (n === "critical" || n === "warning" || n === "offline") && p.flash(r, "recover"));
				}
				D.set(e.id, t);
			});
		})), O.push(A(() => e.links.size, () => pe())), O.push(A(() => [...t.visibleLinkTypes], (e) => {
			[
				"physical",
				"logical",
				"service_dependency",
				"traffic_flow",
				"security_path",
				"manual",
				"inferred"
			].forEach((t) => l.setVisible(t, e.includes(t)));
		})), O.push(A(() => t.hoveredId, (e, n) => {
			n && (s.setHighlight(n, !1), l.setHighlight(null, n)), e && (t.selection?.type === "link" ? l.setHighlight(e, null) : s.setHighlight(e, !0));
		})), O.push(A(() => t.selection, (n, r) => {
			if (r?.type === "space" && c.setSelected(r.id, !1), r?.type === "link" && l.setSelected(null), t.mode === "edit" && n && (n.type === "device" || n.type === "space") ? R(n) : v?.detach(), !n) {
				d.clear(), t.blastSourceId = null, t.showRackServerList = !1;
				return;
			}
			if (n.type === "device") {
				let r = e.devices.get(n.id);
				r && (r.status === "critical" || r.status === "warning") && t.showBlastRadius ? fe(n.id) : d.clear();
				let i = e.getMappingByDeviceId(n.id);
				i?.primarySpaceId && (t.selectedRackForList = i.primarySpaceId, t.showRackServerList = !0);
			} else n.type === "space" ? (c.setSelected(n.id, !0), e.spaces.get(n.id)?.type === "rack" ? (t.selectedRackForList = n.id, t.showRackServerList = !0) : t.showRackServerList = !1) : n.type === "link" && l.setSelected(t.mode === "edit" ? n.id : null);
		})), O.push(A(() => t.mode, (n) => {
			e.setEditorMode(n), n === "view" ? (v?.detach(), l?.setSelected(null), g?.cancel(), _?.cancel(), C = null, w = null, T = null, E = []) : t.selection && (t.selection.type === "device" || t.selection.type === "space") && R(t.selection);
		}, { immediate: !0 })), O.push(A(() => t.linkToolActive, (e) => {
			e || g.cancel(), b && (b.style.cursor = e ? "crosshair" : ""), e && t.addToast("Connect mode on — drag from one device to another", "info");
		})), O.push(A(() => t.showParticles, (e) => u.setVisible(e))), O.push(A(() => t.showBlastRadius, (e) => {
			e || d.clear();
		})), O.push(A(() => e.virtualNodes.size, () => {
			f.dispose(), f = new ki(r.scene), f.loadNodes([...e.virtualNodes.values()]);
		})), O.push(A(() => t.timelineFrameIdx, (t) => {
			if (t < 0) return;
			let n = a.getFrame(t);
			n && Object.entries(n.states).forEach(([t, n]) => e.updateDeviceStatus(t, n.status, n.metrics));
		})), O.push(A(() => e.spaces.size, () => e.spaces.forEach((e) => c.addSpace(e)))), O.push(A(() => `${t.filter.search}|${t.filter.status.join(",")}|${t.filter.type.join(",")}`, () => z())), O.push(A(() => o.customTypes.size, () => {
			Jn(o.customTypes), ui(o.customTypes);
		}, { immediate: !0 }));
	}
	function re(e, t) {
		if (!b) return null;
		let n = b.getBoundingClientRect(), i = new L.Vector2((e.clientX - n.left) / n.width * 2 - 1, -((e.clientY - n.top) / n.height) * 2 + 1), a = new L.Raycaster();
		a.setFromCamera(i, r.camera);
		let o = new L.Vector3();
		r.camera.getWorldDirection(o), o.y = 0, o.lengthSq() < 1e-6 && o.set(0, 0, 1), o.normalize();
		let s = new L.Plane().setFromNormalAndCoplanarPoint(o, t), c = new L.Vector3();
		return a.ray.intersectPlane(s, c) ? c : null;
	}
	function R(n) {
		if (v) {
			if (t.mode !== "edit") {
				v.detach();
				return;
			}
			if (n.type === "device") {
				let e = s.getDeviceWorldPos(n.id);
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
			} else v.detach();
		}
	}
	function z() {
		let n = t.filter, r = n.search.toLowerCase().trim();
		if (!(r || n.status.length > 0 || n.type.length > 0)) {
			s.applySearchFilter(/* @__PURE__ */ new Set(), !1);
			return;
		}
		let i = /* @__PURE__ */ new Set();
		e.devices.forEach((e) => {
			let t = !r || (e.hostname ?? "").toLowerCase().includes(r) || (e.ip ?? "").includes(r), a = !n.status.length || n.status.includes(e.status ?? "unknown"), o = !n.type.length || n.type.includes(e.normalizedType ?? "unknown");
			t && a && o && i.add(e.id);
		}), s.applySearchFilter(i, !0), s.setSearchFocus(i, (t) => {
			let n = e.devices.get(t);
			return n?.hostname ?? n?.ip ?? t;
		});
	}
	function ie() {
		r.startLoop((n, i) => {
			if (oe(n, i), l.update(n), d.update(n), f.update(i), p.update(n), v.update(r.camera), t.showParticles && u.update(n, t.visibleLinkTypes), ae() || e.devices.forEach((e) => {
				e.status === "warning" && s.pulseStatus(e.id, "warning", .4 * Math.abs(Math.sin(i * 1.6))), e.status === "critical" && s.pulseStatus(e.id, "critical", .7 * Math.abs(Math.sin(i * 4)));
			}), !C && !g.isDrawing && !_.hasPending) {
				let e = m.castHover(32), n = e.deviceId ?? e.linkId ?? e.linkHandleId ?? null;
				n !== t.hoveredId && (t.hoveredId = n);
			}
		});
	}
	function ae() {
		return !!t.filter.search.trim() || t.filter.status.length > 0 || t.filter.type.length > 0;
	}
	function oe(t, n) {
		M += 1, j ||= n;
		let r = n - j;
		if (r < 5) return;
		let i = M / r, a = performance.now();
		i < 30 && a - N > 15e3 && (N = a, k.onPerformanceWarning?.({
			type: "low-fps",
			fps: Math.round(i * 10) / 10,
			frameMs: Math.round(t * 1e4) / 10,
			devices: e.devices.size,
			links: e.links.size
		})), j = n, M = 0;
	}
	function se(n) {
		if (!b) return;
		if (S = {
			x: n.clientX,
			y: n.clientY
		}, m.updatePointer(n, b), t.mode === "edit" && v.isVisible) {
			let t = v.pickAxis(m.currentPointer, r.camera);
			if (t) {
				C = t, T = v.position, w = t === "y" ? re(n, T) : m.getGroundPoint(n, b);
				let i = v.currentTarget;
				if (E = [], i?.type === "space") {
					let t = T.clone();
					(e.devicesBySpace.get(i.id) ?? []).forEach((e) => {
						let n = s.getDeviceWorldPos(e.id);
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
		let i = m.castClick(t.linkToolActive);
		if (t.mode === "edit" && t.linkToolActive && i.deviceId) {
			g.onMouseDown(i.deviceId, n), r.controls.enabled = !1;
			return;
		}
		if (t.mode === "edit" && i.linkHandleId) {
			_.onMouseDown(i.linkHandleId, "linkHandle", n), r.controls.enabled = !1;
			return;
		}
		r.controls.enabled = !0;
	}
	function ce(n) {
		if (!b) return;
		if (m.updatePointer(n, b), t.mode === "edit" && C && w && T) {
			let e = C === "y" ? re(n, T) : m.getGroundPoint(n, b);
			if (e) {
				let t = e.clone().sub(w), n = T.clone();
				(C === "x" || C === "xz") && (n.x += t.x), (C === "z" || C === "xz") && (n.z += t.z), C === "y" && (n.y = Math.max(0, T.y + t.y)), v.setPosition(n);
				let r = v.currentTarget;
				r?.type === "device" ? (s.setPosition(r.id, n), l.refreshPositions((e) => s.getDeviceWorldPos(e)), ee()) : r?.type === "space" && (c.setPosition(r.id, n), E.forEach((e) => s.setPosition(e.id, n.clone().add(e.offset))), l.refreshPositions((e) => s.getDeviceWorldPos(e)), ee());
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
				t.type === "device" ? s.setPosition(t.id, e) : t.type === "space" ? c.setPosition(t.id, e) : t.type === "linkHandle" && (l.updateMidpoint(t.id, e.x, e.z), ee());
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
	function le(n) {
		if (!b) return;
		if (r.controls.enabled = !0, t.mode === "edit" && C) {
			let n = v.currentTarget, r = v.position;
			n?.type === "device" ? (e.mapDevice(n.id, e.getMappingByDeviceId(n.id)?.primarySpaceId ?? "", 0, {
				x: r.x,
				y: r.y,
				z: r.z
			}), e.logChange("layout.update", `Device moved: ${n.id}`), t.addToast("Device moved", "success")) : n?.type === "space" && (e.updateSpace(n.id, { position: {
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
			}), e.logChange("space.update", `Space moved: ${n.id} (+${E.length} devices)`), t.addToast("Space moved", "success")), l.refreshPositions((e) => s.getDeviceWorldPos(e)), ee(), C = null, w = null, T = null, E = [];
			return;
		}
		m.updatePointer(n, b);
		let i = m.castClick(t.linkToolActive);
		if (t.mode === "edit" && t.linkToolActive && g.isDrawing) {
			g.onMouseUp(i.deviceId ?? null, n);
			return;
		}
		if (t.mode === "edit" && _.hasPending) {
			let i = _.onMouseUp(n, b, r.camera);
			if (i) {
				let { targetId: n, targetType: r, newPos: a } = i;
				r === "device" ? (e.mapDevice(n, e.getMappingByDeviceId(n)?.primarySpaceId ?? "", 0, {
					x: a.x,
					y: 0,
					z: a.z
				}), e.logChange("layout.update", `Device moved: ${n}`), t.addToast("Device moved", "success"), pe()) : r === "space" ? (e.updateSpace(n, { position: {
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
		let a = n.clientX - S.x, o = n.clientY - S.y;
		Math.sqrt(a * a + o * o) > 8 || (i.deviceId ? t.select({
			type: "device",
			id: i.deviceId
		}) : i.spaceId ? t.select({
			type: "space",
			id: i.spaceId
		}) : i.linkId ? t.select({
			type: "link",
			id: i.linkId
		}) : i.linkHandleId || t.select(null));
	}
	function ue(n) {
		if (n.key === "Escape") {
			t.select(null), t.hideContextMenu(), g.cancel(), _.cancel(), r.controls.enabled = !0, d.clear(), t.blastSourceId = null;
			return;
		}
		if (n.key === "f" || n.key === "F") {
			y.flyToOverview();
			return;
		}
		if ((n.key === "l" || n.key === "L") && !de()) {
			t.mode === "edit" && t.toggleLinkTool();
			return;
		}
		if (t.mode === "edit" && (n.key === "Delete" || n.key === "Backspace") && !de()) {
			n.preventDefault();
			let r = t.selection;
			if (!r) return;
			r.type === "device" ? (e.unmapDevice(r.id), e.logChange("device.unmap", `Device removed: ${r.id}`), t.addToast("Device removed", "info"), t.select(null)) : r.type === "link" ? (e.removeLink(r.id), e.logChange("topology.link.delete", `Link deleted: ${r.id}`), t.addToast("Link deleted", "info"), t.select(null)) : r.type === "space" && (e.archiveSpace(r.id), Ce(r.id), e.logChange("space.archive", `Space archived: ${r.id}`), t.addToast("Space archived", "info"), t.select(null));
			return;
		}
		if (n.ctrlKey && n.key === "z") {
			i.undo();
			return;
		}
		if (n.ctrlKey && n.key === "y") {
			i.redo();
			return;
		}
	}
	function de() {
		let e = document.activeElement;
		return e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement;
	}
	function fe(n) {
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
		let o = [];
		i.forEach((e, t) => o.push({
			deviceId: t,
			hop: 1,
			linkedDeviceId: e
		})), a.forEach((e, t) => o.push({
			deviceId: t,
			hop: 2,
			linkedDeviceId: e
		})), d.show(o, (e) => s.getDeviceWorldPos(e)), t.blastSourceId = n;
	}
	function pe() {
		l.dispose(), l = new xi(r.scene), l.loadLinks([...e.links.values()], (e) => s.getDeviceWorldPos(e)), [
			"physical",
			"logical",
			"service_dependency",
			"traffic_flow",
			"security_path",
			"manual",
			"inferred"
		].forEach((e) => l.setVisible(e, t.visibleLinkTypes.has(e))), ee(), m = new js(r.camera, s, c, l), g = new Ms(r.camera, l, s, (e, t, n, r) => U().showContextMenu(n, r, e, t));
	}
	function me(n, i) {
		if (!b) return;
		if (t.mode !== "edit") {
			t.addToast("Switch to Edit mode to place devices", "warning");
			return;
		}
		let a = b.getBoundingClientRect(), o = new L.Vector2((i.clientX - a.left) / a.width * 2 - 1, -((i.clientY - a.top) / a.height) * 2 + 1), c = new L.Raycaster();
		c.setFromCamera(o, r.camera);
		let l = new L.Plane(new L.Vector3(0, 1, 0), 0), u = new L.Vector3(), d = r.controls.target, f = u;
		(!c.ray.intersectPlane(l, u) || u.distanceTo(d) > 60) && (f = d.clone().setY(0)), e.mapDevice(n, "", 0, {
			x: f.x,
			y: .4,
			z: f.z
		}), e.logChange("device.map", `Device placed: ${n}`), t.addToast("Device placed", "success"), h(() => {
			let r = e.devices.get(n), i = e.getMappingByDeviceId(n);
			r && i?.position && (s.addDevice(r, i), t.select({
				type: "device",
				id: n
			}));
		});
	}
	function he(n, r, i) {
		if (t.mode !== "edit") {
			t.addToast("Switch to Edit mode to create links", "warning"), U().hideContextMenu();
			return;
		}
		let a = `link-${Date.now()}`;
		e.addLink({
			id: a,
			sourceDeviceId: n,
			targetDeviceId: r,
			type: i,
			source: "manual",
			status: "up"
		}), e.logChange("topology.link.create", `Link created: ${i}`), t.addToast(`${i} link created`, "success"), U().hideContextMenu();
	}
	function ge(n) {
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
	function _e(e) {
		y.flyTo(new L.Vector3(e.cameraPos.x, e.cameraPos.y, e.cameraPos.z), new L.Vector3(e.cameraTarget.x, e.cameraTarget.y, e.cameraTarget.z));
	}
	function ve(e) {
		let t = s.getDeviceWorldPos(e);
		t && y.flyToDevice(t);
	}
	function ye(t) {
		let n = e.spaces.get(t);
		if (!n?.position) return;
		let r = new L.Vector3(n.position.x, n.position.y, n.position.z), i = n.size ?? {
			width: 8,
			height: 4,
			depth: 8
		};
		y.flyToSpace(r, i);
	}
	function be(e) {
		let t = f.getNodeWorldPos(e);
		t && y.flyToDevice(t);
	}
	function xe(t) {
		if (t < 0) return;
		let n = a.getFrame(t);
		n && Object.entries(n.states).forEach(([t, n]) => e.updateDeviceStatus(t, n.status, n.metrics));
	}
	async function Se() {
		c.dispose(), c = new vi(r.scene), c.loadSpaces([...e.spaces.values()]), s.dispose(), s = new gi(r.scene), await fi(o.customTypes), s.loadInstanced([...e.devices.values()], e.mappings, (t) => e.getMappingByDeviceId(t)), l.dispose(), l = new xi(r.scene), l.loadLinks([...e.links.values()], (e) => s.getDeviceWorldPos(e)), [
			"physical",
			"logical",
			"service_dependency",
			"traffic_flow",
			"security_path",
			"manual",
			"inferred"
		].forEach((e) => l.setVisible(e, t.visibleLinkTypes.has(e))), ee(), m = new js(r.camera, s, c, l), g = new Ms(r.camera, l, s, (e, t, n, r) => U().showContextMenu(n, r, e, t)), y.flyToOverview();
	}
	function Ce(n) {
		let r = e.spaces.get(n);
		c.removeSpace(n), r && !r.archived && (c.addSpace(r), t.selection?.type === "space" && t.selection.id === n && c.setSelected(n, !0));
	}
	function we() {
		x = !1, O.splice(0).forEach((e) => e()), b?.removeEventListener("pointerdown", se), b?.removeEventListener("pointermove", ce), b?.removeEventListener("pointerup", le), b?.removeEventListener("contextmenu", Te), window.removeEventListener("keydown", ue), v?.dispose(), s?.dispose(), c?.dispose(), l?.dispose(), u?.dispose(), d?.dispose(), f?.dispose(), p?.dispose(), r.dispose(), b = null, D.clear();
	}
	function Te(e) {
		e.preventDefault();
	}
	return {
		configure: P,
		init: F,
		dispose: we,
		dropDeviceAt: me,
		confirmCreateLink: he,
		saveCurrentView: ge,
		loadSavedView: _e,
		focusDevice: ve,
		focusSpace: ye,
		focusVirtualNode: be,
		onTimelineScrub: xe,
		refreshSpace: Ce,
		rebuildAll: Se,
		timeline: a,
		getScene: () => r
	};
}
//#endregion
//#region src/components/layout/AlertPanel.vue?vue&type=script&setup=true&lang.ts
var Js = { class: "alert-panel" }, Ys = { class: "ap-head" }, Xs = {
	key: 0,
	class: "ap-empty"
}, Zs = ["onClick"], Qs = { class: "ap-group-name" }, $s = { class: "ap-group-badges" }, ec = {
	key: 0,
	class: "badge critical"
}, tc = {
	key: 1,
	class: "badge warning"
}, nc = {
	key: 2,
	class: "badge offline"
}, rc = { class: "ap-device-list" }, ic = ["onClick"], ac = { class: "ap-dev-name" }, oc = /* @__PURE__ */ W(/* @__PURE__ */ p({
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
		}, a = U(), o = H(), { focusDevice: u, focusSpace: d } = Ks(), f = i(() => {
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
			a.select({
				type: "device",
				id: e
			}), u(e);
		}
		function _(e) {
			e.spaceId !== "__ungrouped__" && (a.select({
				type: "space",
				id: e.spaceId
			}), d(e.spaceId));
		}
		return (t, n) => (b(), c("aside", Js, [
			l("div", Ys, [
				n[1] ||= l("span", { class: "ap-title" }, "Alerts", -1),
				l("span", { class: g(["ap-count", m.value]) }, w(p.value), 3),
				l("button", {
					class: "ap-close",
					onClick: n[0] ||= (e) => T(a).showAlertPanel = !1
				}, "✕")
			]),
			f.value.length ? s("", !0) : (b(), c("div", Xs, "No active alerts")),
			(b(!0), c(e, null, C(f.value, (t) => (b(), c("div", {
				key: t.spaceId,
				class: "ap-group"
			}, [l("button", {
				class: "ap-group-header",
				onClick: (e) => _(t)
			}, [l("span", Qs, w(t.spaceName), 1), l("span", $s, [
				t.criticalCount ? (b(), c("span", ec, w(t.criticalCount), 1)) : s("", !0),
				t.warningCount ? (b(), c("span", tc, w(t.warningCount), 1)) : s("", !0),
				t.offlineCount ? (b(), c("span", nc, w(t.offlineCount), 1)) : s("", !0)
			])], 8, Zs), l("div", rc, [(b(!0), c(e, null, C(t.devices, (e) => (b(), c("button", {
				key: e.id,
				class: g(["ap-device", { selected: T(a).selectedDeviceId === e.id }]),
				onClick: (t) => h(e.id)
			}, [
				l("span", { class: g(["ap-dot", e.status]) }, null, 2),
				l("span", ac, w(e.hostname ?? e.ip ?? e.id), 1),
				l("span", { class: g(["ap-status-label", e.status]) }, w(T(Wn)[e.status ?? "unknown"]), 3)
			], 10, ic))), 128))])]))), 128))
		]));
	}
}), [["__scopeId", "data-v-500e3ed4"]]), sc = { class: "ct-panel" }, cc = { class: "ct-head" }, lc = {
	key: 0,
	class: "ct-mode-notice"
}, uc = { class: "ct-list" }, dc = { class: "ct-name" }, fc = {
	key: 0,
	class: "ct-override-tag"
}, pc = ["onClick"], mc = ["onClick"], hc = { class: "ct-section-label ct-section-label--new" }, gc = {
	key: 1,
	class: "ct-empty-sm"
}, _c = { class: "ct-list" }, vc = { class: "ct-name" }, yc = { class: "ct-shape-tag" }, bc = ["onClick"], xc = ["onClick"], Sc = {
	key: 0,
	class: "ct-form"
}, Cc = { class: "ct-form-title" }, wc = { class: "ct-label" }, Tc = { class: "ct-label" }, Ec = { class: "ct-label" }, Dc = { class: "ct-swatches" }, Oc = ["onClick"], kc = { class: "ct-label" }, Ac = { class: "ct-radios" }, jc = ["value"], Mc = { class: "ct-label" }, Nc = { class: "ct-val" }, Pc = { class: "ct-label" }, Fc = { class: "ct-val" }, Ic = {
	key: 1,
	class: "ct-label"
}, Lc = { class: "ct-val" }, Rc = { class: "ct-label" }, zc = { class: "ct-model-row" }, Bc = {
	key: 0,
	class: "ct-model-name pending"
}, Vc = {
	key: 1,
	class: "ct-model-name stored"
}, Hc = {
	key: 2,
	class: "ct-model-hint"
}, Uc = {
	key: 0,
	class: "ct-model-error"
}, Wc = {
	key: 1,
	class: "ct-model-hint"
}, Gc = { class: "ct-form-btns" }, Kc = ["disabled"], qc = ["disabled"], Jc = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "CustomTypePanel",
	emits: ["types-changed"],
	setup(t, { emit: r }) {
		let a = U(), o = Vs(), { rebuildAll: u } = Ks(), p = r, m = [
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
		function E(e) {
			return o.customTypes.has(e);
		}
		function O(e) {
			return o.customTypes.get(e)?.color ?? Bn[e] ?? "#6b7280";
		}
		function A(e) {
			return o.customTypes.get(e)?.abbr ?? Hn[e] ?? e.slice(0, 4).toUpperCase();
		}
		let N = S(!1), P = S(!0), F = S("custom"), I = S(!1), L = S({
			id: "",
			label: "",
			abbr: "",
			color: m[0],
			shape: "box",
			w: .6,
			h: .1,
			d: .4
		}), ee = S(null), te = S(null), ne = S(""), re = S(""), R = S(!1);
		function z() {
			te.value = null, ne.value = "", re.value = "", R.value = !1, ee.value && (ee.value.value = "");
		}
		function ie() {
			a.mode === "edit" && (F.value = "custom", P.value = !0, L.value = {
				id: `ct-${Date.now()}`,
				label: "",
				abbr: "",
				color: m[0],
				shape: "box",
				w: .6,
				h: .1,
				d: .4
			}, z(), N.value = !0);
		}
		function ae(e) {
			a.mode === "edit" && (F.value = "custom", P.value = !1, L.value = { ...e }, z(), N.value = !0);
		}
		function oe(e) {
			if (a.mode !== "edit") return;
			F.value = "override", P.value = !1;
			let t = o.customTypes.get(e.id);
			L.value = t ? { ...t } : { ...e }, z(), N.value = !0;
		}
		function se() {
			z(), N.value = !1;
		}
		function ce() {
			P.value && (L.value.abbr = L.value.label.slice(0, 4).toUpperCase().replace(/\s+/g, ""));
		}
		function le(e) {
			let t = e.target.files?.[0];
			if (!t) return;
			if (t.size > 10 * 1024 * 1024) {
				re.value = `File too large (${(t.size / 1024 / 1024).toFixed(1)} MB — max 10 MB)`;
				return;
			}
			re.value = "", R.value = !0;
			let n = new FileReader();
			n.onload = (e) => {
				te.value = e.target?.result, ne.value = t.name, R.value = !1;
			}, n.onerror = () => {
				re.value = "Failed to read file", R.value = !1;
			}, n.readAsArrayBuffer(t);
		}
		function ue() {
			L.value.hasModel = !1, z();
		}
		async function de() {
			if (!(F.value === "custom" && (!L.value.label.trim() || !L.value.abbr.trim()))) {
				I.value = !0;
				try {
					te.value ? (await er(L.value.id, te.value), L.value.hasModel = !0) : L.value.hasModel || await nr(L.value.id).catch(() => {}), o.upsert({ ...L.value }), Jn(o.customTypes), ui(o.customTypes), L.value.hasModel && await fi(o.customTypes), N.value = !1, z(), await u(), p("types-changed");
				} finally {
					I.value = !1;
				}
			}
		}
		async function fe(e) {
			confirm("Remove this custom type?") && (o.remove(e), await nr(e).catch(() => {}), Jn(o.customTypes), ui(o.customTypes), await u(), p("types-changed"));
		}
		async function pe(e) {
			confirm("Reset to default shape?") && (o.remove(e), await nr(e).catch(() => {}), Jn(o.customTypes), ui(o.customTypes), await u(), p("types-changed"));
		}
		return (t, r) => (b(), c("aside", sc, [
			l("div", cc, [r[8] ||= l("span", { class: "ct-title" }, "Device Types", -1), l("button", {
				class: "ct-close",
				onClick: r[0] ||= (e) => T(a).showCustomTypes = !1
			}, "✕")]),
			T(a).mode === "edit" ? s("", !0) : (b(), c("div", lc, " Switch to Edit mode to customize types. ")),
			r[18] ||= l("div", { class: "ct-section-label" }, "Built-in Types", -1),
			r[19] ||= l("div", { class: "ct-section-hint" }, "Override the shape or model for all devices of a type.", -1),
			l("div", uc, [(b(), c(e, null, C(v, (t) => l("div", {
				key: t.id,
				class: "ct-row"
			}, [
				l("span", {
					class: "ct-dot",
					style: _({ background: O(t.id) })
				}, null, 4),
				l("span", {
					class: "ct-abbr-badge",
					style: _({
						borderColor: O(t.id),
						color: O(t.id)
					})
				}, w(A(t.id)), 5),
				l("span", dc, w(t.label), 1),
				E(t.id) ? (b(), c("span", fc, "custom")) : s("", !0),
				T(a).mode === "edit" ? (b(), c(e, { key: 1 }, [l("button", {
					class: "ct-btn",
					onClick: (e) => oe(t)
				}, w(E(t.id) ? "Edit" : "Override"), 9, pc), E(t.id) ? (b(), c("button", {
					key: 0,
					class: "ct-btn del",
					onClick: (e) => pe(t.id)
				}, "Reset", 8, mc)) : s("", !0)], 64)) : s("", !0)
			])), 64))]),
			l("div", hc, [r[9] ||= d(" New Types ", -1), T(a).mode === "edit" ? (b(), c("button", {
				key: 0,
				class: "ct-add-inline",
				onClick: ie
			}, "+ Add")) : s("", !0)]),
			r[20] ||= l("div", { class: "ct-section-hint" }, " New types appear in the device's \"Visual Shape\" selector. ", -1),
			x.value.length ? s("", !0) : (b(), c("div", gc, "No custom types yet")),
			l("div", _c, [(b(!0), c(e, null, C(x.value, (t) => (b(), c("div", {
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
				}, w(t.abbr), 5),
				l("span", vc, w(t.label), 1),
				l("span", yc, w(t.hasModel ? "3D" : t.shape), 1),
				T(a).mode === "edit" ? (b(), c(e, { key: 0 }, [l("button", {
					class: "ct-btn",
					onClick: (e) => ae(t)
				}, "Edit", 8, bc), l("button", {
					class: "ct-btn del",
					onClick: (e) => fe(t.id)
				}, "Del", 8, xc)], 64)) : s("", !0)
			]))), 128))]),
			f(n, { name: "ct-slide" }, {
				default: j(() => [N.value ? (b(), c("div", Sc, [
					l("div", Cc, w(F.value === "override" ? `Override: ${L.value.label}` : P.value ? "New Type" : "Edit Type"), 1),
					F.value === "override" ? s("", !0) : (b(), c(e, { key: 0 }, [l("label", wc, [r[10] ||= d("Name ", -1), M(l("input", {
						"onUpdate:modelValue": r[1] ||= (e) => L.value.label = e,
						class: "ct-input",
						onInput: ce,
						placeholder: "Core Router"
					}, null, 544), [[k, L.value.label]])]), l("label", Tc, [r[11] ||= d("Abbr (≤4) ", -1), M(l("input", {
						"onUpdate:modelValue": r[2] ||= (e) => L.value.abbr = e,
						class: "ct-input ct-input-sm",
						maxlength: "4",
						placeholder: "CR"
					}, null, 512), [[k, L.value.abbr]])])], 64)),
					l("div", Ec, [r[12] ||= d("Color ", -1), l("div", Dc, [(b(), c(e, null, C(m, (e) => l("button", {
						key: e,
						class: g(["ct-swatch", { active: L.value.color === e }]),
						style: _({ background: e }),
						onClick: (t) => L.value.color = e
					}, null, 14, Oc)), 64))])]),
					l("div", kc, [r[13] ||= d("Shape ", -1), l("div", Ac, [(b(), c(e, null, C(h, (e) => l("label", {
						key: e,
						class: "ct-radio"
					}, [M(l("input", {
						type: "radio",
						value: e,
						"onUpdate:modelValue": r[3] ||= (e) => L.value.shape = e
					}, null, 8, jc), [[D, L.value.shape]]), d(" " + w(e), 1)])), 64))])]),
					l("label", Mc, [
						r[14] ||= d("Width ", -1),
						l("span", Nc, w(L.value.w.toFixed(1)), 1),
						M(l("input", {
							type: "range",
							min: "0.3",
							max: "2.0",
							step: "0.1",
							"onUpdate:modelValue": r[4] ||= (e) => L.value.w = e,
							class: "ct-slider"
						}, null, 512), [[
							k,
							L.value.w,
							void 0,
							{ number: !0 }
						]])
					]),
					l("label", Pc, [
						r[15] ||= d("Height ", -1),
						l("span", Fc, w(L.value.h.toFixed(2)), 1),
						M(l("input", {
							type: "range",
							min: "0.05",
							max: "2.0",
							step: "0.05",
							"onUpdate:modelValue": r[5] ||= (e) => L.value.h = e,
							class: "ct-slider"
						}, null, 512), [[
							k,
							L.value.h,
							void 0,
							{ number: !0 }
						]])
					]),
					L.value.shape === "box" ? (b(), c("label", Ic, [
						r[16] ||= d("Depth ", -1),
						l("span", Lc, w(L.value.d.toFixed(1)), 1),
						M(l("input", {
							type: "range",
							min: "0.3",
							max: "2.0",
							step: "0.1",
							"onUpdate:modelValue": r[6] ||= (e) => L.value.d = e,
							class: "ct-slider"
						}, null, 512), [[
							k,
							L.value.d,
							void 0,
							{ number: !0 }
						]])
					])) : s("", !0),
					l("div", Rc, [
						r[17] ||= d("3D Model (.glb / .gltf) ", -1),
						l("div", zc, [
							ne.value ? (b(), c("span", Bc, w(ne.value), 1)) : L.value.hasModel ? (b(), c("span", Vc, "Model stored")) : (b(), c("span", Hc, "Using geometric shape above")),
							l("input", {
								ref_key: "fileInputEl",
								ref: ee,
								type: "file",
								accept: ".glb,.gltf",
								style: { display: "none" },
								onChange: le
							}, null, 544),
							l("button", {
								class: "ct-model-btn",
								onClick: r[7] ||= (e) => ee.value?.click()
							}, w(L.value.hasModel || ne.value ? "Replace" : "Import"), 1),
							L.value.hasModel || ne.value ? (b(), c("button", {
								key: 3,
								class: "ct-model-btn ct-model-rm",
								onClick: ue
							}, " Remove ")) : s("", !0)
						]),
						re.value ? (b(), c("div", Uc, w(re.value), 1)) : s("", !0),
						R.value ? (b(), c("div", Wc, "Loading model…")) : s("", !0)
					]),
					l("div", Gc, [l("button", {
						class: "ct-save",
						disabled: I.value,
						onClick: de
					}, w(I.value ? "Saving…" : "Save"), 9, Kc), l("button", {
						class: "ct-cancel",
						disabled: I.value,
						onClick: se
					}, "Cancel", 8, qc)])
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-98ca0a07"]]), Yc = {
	key: 0,
	class: "panel"
}, Xc = { class: "panel-head" }, Zc = { class: "rack-name" }, Qc = { class: "summary" }, $c = { class: "chip c" }, el = { class: "chip w" }, tl = { class: "chip n" }, nl = { class: "server-list" }, rl = ["onClick", "onMouseenter"], il = { class: "srv-info" }, al = { class: "srv-name" }, ol = { class: "srv-ip" }, sl = {
	key: 0,
	class: "srv-metrics"
}, cl = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "RackServerListPanel",
	setup(t) {
		let n = H(), r = U(), a = i(() => r.selectedRackForList ? n.spaces.get(r.selectedRackForList) ?? null : null), o = i(() => r.selectedRackForList ? n.devicesBySpace.get(r.selectedRackForList) ?? [] : []), u = i(() => [...o.value].sort((e, t) => {
			let n = {
				critical: 0,
				warning: 1,
				offline: 2,
				normal: 3,
				unknown: 4,
				maintenance: 5
			};
			return (n[e.status ?? "unknown"] ?? 9) - (n[t.status ?? "unknown"] ?? 9);
		})), d = i(() => o.value.filter((e) => e.status === "critical").length), f = i(() => o.value.filter((e) => e.status === "warning").length), p = i(() => o.value.filter((e) => e.status === "normal").length);
		function m(e) {
			r.select({
				type: "device",
				id: e
			});
		}
		function h() {
			r.showRackServerList = !1, r.selectedRackForList = null, r.select(null);
		}
		return (t, n) => a.value ? (b(), c("aside", Yc, [
			l("div", Xc, [
				l("span", Zc, w(a.value.name), 1),
				l("div", Qc, [
					l("span", $c, "C " + w(d.value), 1),
					l("span", el, "W " + w(f.value), 1),
					l("span", tl, "N " + w(p.value), 1)
				]),
				l("button", {
					class: "close-btn",
					onClick: h,
					title: "Close"
				}, "✕")
			]),
			n[1] ||= l("div", { class: "hint" }, "Click a device to open details · hover to highlight in 3D.", -1),
			l("div", nl, [(b(!0), c(e, null, C(u.value, (e) => (b(), c("div", {
				key: e.id,
				class: g(["srv-row", [e.status, { active: T(r).selectedDeviceId === e.id }]]),
				onClick: (t) => m(e.id),
				onMouseenter: (t) => T(r).hoveredId = e.id,
				onMouseleave: n[0] ||= (e) => T(r).hoveredId = null
			}, [
				l("span", {
					class: "dot",
					style: _({ background: T(Rn)[e.status ?? "unknown"] })
				}, null, 4),
				l("span", {
					class: "type-tag",
					style: _({
						color: T(Bn)[e.normalizedType ?? "unknown"],
						borderColor: T(Bn)[e.normalizedType ?? "unknown"]
					})
				}, w(T(Hn)[e.normalizedType ?? "unknown"]), 5),
				l("div", il, [l("div", al, w(e.hostname ?? e.id), 1), l("div", ol, w(e.ip ?? "—"), 1)]),
				e.metrics ? (b(), c("div", sl, [l("span", { class: g({ hot: (e.metrics.cpu ?? 0) > 85 }) }, "C" + w((e.metrics.cpu ?? 0).toFixed(0)) + "%", 3), l("span", { class: g({ hot: (e.metrics.memory ?? 0) > 85 }) }, "M" + w((e.metrics.memory ?? 0).toFixed(0)) + "%", 3)])) : s("", !0)
			], 42, rl))), 128))])
		])) : s("", !0);
	}
}), [["__scopeId", "data-v-0a6154d3"]]), ll = { class: "panel" }, ul = { class: "panel-head" }, dl = { class: "head-actions" }, fl = { class: "tree-body" }, pl = ["onClick"], ml = ["onClick"], hl = { class: "node-name" }, gl = ["onClick"], _l = ["onClick"], vl = ["onClick"], yl = ["onClick"], bl = { class: "node-name" }, xl = { class: "dev-count" }, Sl = ["onClick"], Cl = ["onClick"], wl = ["onClick"], Tl = { class: "node-name" }, El = { class: "dev-count" }, Dl = ["onClick"], Ol = ["onClick"], kl = ["onClick"], Al = ["onClick"], jl = {
	key: 0,
	class: "site-node"
}, Ml = ["onClick"], Nl = { class: "node-name" }, Pl = ["onClick"], Fl = {
	key: 0,
	class: "add-modal"
}, Il = {
	key: 0,
	class: "add-modal"
}, Ll = { class: "add-btns" }, Rl = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "SpaceTreePanel",
	setup(t) {
		let r = H(), a = U(), { refreshSpace: o } = Ks(), u = S(/* @__PURE__ */ new Set()), d = S(!1), p = S(null), m = S("zone"), h = S("site"), _ = S(""), v = S(null), y = S(""), x = i(() => [...r.spaces.values()].filter((e) => e.type === "site" && !e.archived)), E = i(() => [...r.spaces.values()].filter((e) => [
			"custom_group",
			"security_zone",
			"service",
			"external",
			"cloud"
		].includes(e.type) && !e.archived));
		function D(e, t) {
			return [...r.spaces.values()].filter((n) => n.parentId === e && n.type === t && !n.archived);
		}
		function A(e) {
			return r.devicesBySpace.get(e)?.length ?? 0;
		}
		function F(e) {
			return (r.devicesBySpace.get(e) ?? []).some((e) => e.status === "critical" || e.status === "warning");
		}
		function I(e) {
			let t = D(e, "zone").flatMap((e) => D(e.id, "rack")).flatMap((e) => r.devicesBySpace.get(e.id) ?? []);
			return t.some((e) => e.status === "critical") ? "critical" : t.some((e) => e.status === "warning") ? "warning" : "normal";
		}
		function L(e) {
			let t = I(e);
			return t === "critical" ? "CRIT" : t === "warning" ? "WARN" : "OK";
		}
		function ee(e) {
			u.value.has(e) ? u.value.delete(e) : u.value.add(e);
		}
		function te(e) {
			a.select({
				type: "space",
				id: e.id
			});
		}
		function ne(e, t) {
			a.mode === "edit" && (p.value = e, m.value = t, h.value = t, _.value = "", d.value = !0);
		}
		function re() {
			if (a.mode !== "edit" || !_.value.trim()) return;
			let e = `space-${Date.now()}`, t = (p.value ? r.spaces.get(p.value) : null)?.position ?? {
				x: 0,
				y: 0,
				z: 0
			};
			r.addSpace({
				id: e,
				name: _.value.trim(),
				kind: [
					"site",
					"zone",
					"rack"
				].includes(h.value) ? "physical" : "logical",
				type: h.value,
				parentId: p.value ?? void 0,
				source: "manual",
				position: {
					x: t.x + Math.random() * 10 - 5,
					y: 0,
					z: t.z + Math.random() * 10 - 5
				},
				size: h.value === "rack" ? {
					width: 1,
					height: 3,
					depth: .6
				} : h.value === "zone" ? {
					width: 20,
					height: .1,
					depth: 18
				} : {
					width: 50,
					height: .1,
					depth: 40
				},
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}), r.logChange("space.create", `Space added: ${_.value} (${h.value})`), R();
		}
		function R() {
			d.value = !1, p.value = null, _.value = "";
		}
		function z(e) {
			a.mode === "edit" && (v.value = e, y.value = e.name);
		}
		function ie() {
			if (a.mode !== "edit" || !v.value) return;
			let e = v.value.id;
			r.updateSpace(e, { name: y.value }), r.logChange("space.update", `Space renamed: ${y.value}`), o(e), v.value = null;
		}
		function ae(e) {
			a.mode === "edit" && confirm("Archive this space?") && (r.archiveSpace(e), o(e), r.logChange("space.archive", `Space archived: ${e}`));
		}
		return (t, r) => (b(), c("aside", ll, [
			l("div", ul, [r[7] ||= l("span", null, "Spaces", -1), l("div", dl, [T(a).mode === "edit" ? (b(), c("button", {
				key: 0,
				class: "text-btn",
				title: "Add space",
				onClick: r[0] ||= (e) => d.value = !0
			}, " Add ")) : s("", !0), l("button", {
				class: "text-btn",
				onClick: r[1] ||= (e) => T(a).showSpaceTree = !1
			}, " Close ")])]),
			l("div", fl, [
				(b(!0), c(e, null, C(x.value, (t) => (b(), c("div", {
					key: t.id,
					class: "site-node"
				}, [l("div", {
					class: "tree-row site",
					onClick: (e) => te(t)
				}, [
					l("span", {
						class: "arrow",
						onClick: P((e) => ee(t.id), ["stop"])
					}, w(u.value.has(t.id) ? "▾" : "▸"), 9, ml),
					r[8] ||= l("span", { class: "kind-tag" }, "SITE", -1),
					l("span", hl, w(t.name), 1),
					l("span", { class: g(["node-badge", I(t.id)]) }, w(L(t.id)), 3),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "row-btn",
						onClick: P((e) => z(t), ["stop"]),
						title: "Rename"
					}, " Edit ", 8, gl)) : s("", !0),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 1,
						class: "row-btn del",
						onClick: P((e) => ae(t.id), ["stop"]),
						title: "Archive"
					}, " Del ", 8, _l)) : s("", !0)
				], 8, pl), u.value.has(t.id) ? (b(), c(e, { key: 0 }, [(b(!0), c(e, null, C(D(t.id, "zone"), (t) => (b(), c("div", {
					key: t.id,
					class: "zone-node"
				}, [l("div", {
					class: "tree-row zone",
					onClick: (e) => te(t)
				}, [
					l("span", {
						class: "arrow",
						onClick: P((e) => ee(t.id), ["stop"])
					}, w(u.value.has(t.id) ? "▾" : "▸"), 9, yl),
					r[9] ||= l("span", { class: "kind-tag" }, "ZONE", -1),
					l("span", bl, w(t.name), 1),
					l("span", xl, w(A(t.id)), 1),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "row-btn",
						onClick: P((e) => z(t), ["stop"])
					}, " Edit ", 8, Sl)) : s("", !0),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 1,
						class: "row-btn del",
						onClick: P((e) => ae(t.id), ["stop"])
					}, " Del ", 8, Cl)) : s("", !0)
				], 8, vl), u.value.has(t.id) ? (b(), c(e, { key: 0 }, [(b(!0), c(e, null, C(D(t.id, "rack"), (e) => (b(), c("div", { key: e.id }, [l("div", {
					class: g(["tree-row rack", { "has-issue": F(e.id) }]),
					onClick: (t) => te(e)
				}, [
					r[10] ||= l("span", { class: "arrow-spacer" }, null, -1),
					r[11] ||= l("span", { class: "kind-tag" }, "RACK", -1),
					l("span", Tl, w(e.name), 1),
					l("span", El, w(A(e.id)), 1),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "row-btn",
						onClick: P((t) => z(e), ["stop"])
					}, " Edit ", 8, Dl)) : s("", !0),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 1,
						class: "row-btn del",
						onClick: P((t) => ae(e.id), ["stop"])
					}, " Del ", 8, Ol)) : s("", !0)
				], 10, wl)]))), 128)), T(a).mode === "edit" ? (b(), c("div", {
					key: 0,
					class: "add-child-btn",
					onClick: (e) => ne(t.id, "rack")
				}, " + Add rack ", 8, kl)) : s("", !0)], 64)) : s("", !0)]))), 128)), T(a).mode === "edit" ? (b(), c("div", {
					key: 0,
					class: "add-child-btn",
					onClick: (e) => ne(t.id, "zone")
				}, " + Add zone ", 8, Al)) : s("", !0)], 64)) : s("", !0)]))), 128)),
				E.value.length ? (b(), c("div", jl, [r[14] ||= l("div", { class: "tree-row site" }, [l("span", { class: "kind-tag" }, "GRP"), l("span", {
					class: "node-name",
					style: { color: "#94a3b8" }
				}, "Logical Groups")], -1), (b(!0), c(e, null, C(E.value, (e) => (b(), c("div", {
					key: e.id,
					class: "tree-row zone",
					onClick: (t) => te(e)
				}, [
					r[12] ||= l("span", { class: "arrow-spacer" }, null, -1),
					r[13] ||= l("span", { class: "kind-tag" }, "GRP", -1),
					l("span", Nl, w(e.name), 1),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "row-btn del",
						onClick: P((t) => ae(e.id), ["stop"])
					}, " Del ", 8, Pl)) : s("", !0)
				], 8, Ml))), 128))])) : s("", !0),
				T(a).mode === "edit" ? (b(), c("div", {
					key: 1,
					class: "add-child-btn root",
					onClick: r[2] ||= (e) => d.value = !0
				}, " + Add site / group ")) : s("", !0)
			]),
			f(n, { name: "fade" }, {
				default: j(() => [T(a).mode === "edit" && (d.value || p.value) ? (b(), c("div", Fl, [
					r[16] ||= l("div", { class: "add-title" }, "Add Space", -1),
					M(l("select", {
						"onUpdate:modelValue": r[3] ||= (e) => h.value = e,
						class: "add-sel"
					}, [...r[15] ||= [
						l("option", { value: "site" }, "Site", -1),
						l("option", { value: "zone" }, "Zone", -1),
						l("option", { value: "rack" }, "Rack", -1),
						l("option", { value: "custom_group" }, "Custom Group", -1),
						l("option", { value: "security_zone" }, "Security Zone", -1),
						l("option", { value: "service" }, "Service Group", -1),
						l("option", { value: "external" }, "External", -1),
						l("option", { value: "cloud" }, "Cloud", -1)
					]], 512), [[O, h.value]]),
					M(l("input", {
						"onUpdate:modelValue": r[4] ||= (e) => _.value = e,
						class: "add-input",
						placeholder: "Name",
						onKeydown: N(re, ["enter"])
					}, null, 544), [[k, _.value]]),
					l("div", { class: "add-btns" }, [l("button", {
						class: "add-ok",
						onClick: re
					}, "Add"), l("button", {
						class: "add-cancel",
						onClick: R
					}, "Cancel")])
				])) : s("", !0)]),
				_: 1
			}),
			f(n, { name: "fade" }, {
				default: j(() => [T(a).mode === "edit" && v.value ? (b(), c("div", Il, [
					r[17] ||= l("div", { class: "add-title" }, "Rename", -1),
					M(l("input", {
						"onUpdate:modelValue": r[5] ||= (e) => y.value = e,
						class: "add-input",
						onKeydown: N(ie, ["enter"])
					}, null, 544), [[k, y.value]]),
					l("div", Ll, [l("button", {
						class: "add-ok",
						onClick: ie
					}, "Save"), l("button", {
						class: "add-cancel",
						onClick: r[6] ||= (e) => v.value = null
					}, " Cancel ")])
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-f1b02c41"]]), zl = { class: "panel" }, Bl = { class: "panel-head" }, Vl = {
	key: 0,
	class: "add-form"
}, Hl = { class: "add-row" }, Ul = ["value"], Wl = {
	key: 0,
	class: "empty"
}, Gl = { class: "device-list" }, Kl = ["draggable", "onDragstart"], ql = { class: "dev-info" }, Jl = { class: "dev-name" }, Yl = { class: "dev-ip" }, Xl = { class: "dev-source" }, Zl = ["onClick"], Ql = { class: "panel-footer" }, $l = { class: "hint" }, eu = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "UnmappedPanel",
	setup(t) {
		let r = H(), i = U(), a = S(null), o = [
			"server",
			"switch",
			"router",
			"firewall",
			"database",
			"storage",
			"vm",
			"container",
			"load_balancer",
			"access_point",
			"cloud_service",
			"unknown"
		], u = S(!1), p = x({
			hostname: "",
			ip: "",
			type: "server",
			vendor: ""
		});
		function m() {
			i.mode === "edit" && p.hostname.trim() && (r.addManualDevice({
				hostname: p.hostname.trim(),
				ip: p.ip.trim() || void 0,
				type: p.type,
				vendor: p.vendor.trim() || void 0
			}), i.addToast(`Device added: ${p.hostname.trim()}`, "success"), p.hostname = "", p.ip = "", p.vendor = "", u.value = !1);
		}
		function h(e, t) {
			if (i.mode !== "edit") {
				e.preventDefault();
				return;
			}
			a.value = t, e.dataTransfer?.setData("deviceId", t), e.dataTransfer.effectAllowed = "move";
		}
		function v() {
			a.value = null;
		}
		function y(e) {
			if (i.mode !== "edit") return;
			let t = r.unmappedDevices.findIndex((t) => t.id === e);
			t >= 0 && r.unmappedDevices.splice(t, 1);
		}
		return (t, x) => (b(), c("aside", zl, [
			l("div", Bl, [
				l("span", null, [x[6] ||= d("Unmapped Devices ", -1), l("b", null, w(T(r).unmappedDevices.length), 1)]),
				T(i).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "text-btn",
					onClick: x[0] ||= (e) => u.value = !u.value,
					title: "Add device manually"
				}, "Add")) : s("", !0),
				l("button", {
					class: "close-btn",
					onClick: x[1] ||= (e) => T(i).showUnmapped = !1,
					title: "Close"
				}, "✕")
			]),
			f(n, { name: "fade" }, {
				default: j(() => [T(i).mode === "edit" && u.value ? (b(), c("div", Vl, [
					M(l("input", {
						"onUpdate:modelValue": x[2] ||= (e) => p.hostname = e,
						class: "add-input",
						placeholder: "Hostname *",
						onKeydown: N(m, ["enter"])
					}, null, 544), [[k, p.hostname]]),
					M(l("input", {
						"onUpdate:modelValue": x[3] ||= (e) => p.ip = e,
						class: "add-input",
						placeholder: "IP address",
						onKeydown: N(m, ["enter"])
					}, null, 544), [[k, p.ip]]),
					l("div", Hl, [M(l("select", {
						"onUpdate:modelValue": x[4] ||= (e) => p.type = e,
						class: "add-sel"
					}, [(b(), c(e, null, C(o, (e) => l("option", {
						key: e,
						value: e
					}, w(T(Un)[e]), 9, Ul)), 64))], 512), [[O, p.type]]), M(l("input", {
						"onUpdate:modelValue": x[5] ||= (e) => p.vendor = e,
						class: "add-input",
						placeholder: "Vendor"
					}, null, 512), [[k, p.vendor]])]),
					l("button", {
						class: "add-ok",
						onClick: m
					}, "Add device")
				])) : s("", !0)]),
				_: 1
			}),
			T(r).unmappedDevices.length === 0 && !u.value ? (b(), c("div", Wl, " All devices are placed. ")) : s("", !0),
			l("div", Gl, [(b(!0), c(e, null, C(T(r).unmappedDevices, (e) => (b(), c("div", {
				key: e.id,
				class: g(["dev-row", {
					dragging: a.value === e.id,
					readonly: T(i).mode !== "edit"
				}]),
				draggable: T(i).mode === "edit",
				onDragstart: (t) => h(t, e.id),
				onDragend: v
			}, [
				l("span", {
					class: "type-tag",
					style: _({
						color: T(Bn)[e.normalizedType ?? "unknown"],
						borderColor: T(Bn)[e.normalizedType ?? "unknown"]
					})
				}, w(T(Hn)[e.normalizedType ?? "unknown"]), 5),
				l("div", ql, [l("div", Jl, w(e.hostname ?? e.id), 1), l("div", Yl, w(e.ip ?? "—"), 1)]),
				l("span", Xl, w(e.source), 1),
				T(i).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "ignore-btn",
					onClick: P((t) => y(e.id), ["stop"]),
					title: "Ignore"
				}, "✕", 8, Zl)) : s("", !0)
			], 42, Kl))), 128))]),
			l("div", Ql, [l("span", $l, w(T(i).mode === "edit" ? "Drag a device onto the 3D scene to place it." : "Switch to Edit mode to place devices."), 1)])
		]));
	}
}), [["__scopeId", "data-v-8bb07103"]]);
//#endregion
//#region src/composables/useDeviceTypeHelpers.ts
function tu() {
	let e = Vs();
	function t(t) {
		let n = t ?? "unknown";
		return e.customTypes.get(n)?.color ?? Bn[n] ?? "#6b7280";
	}
	function n(t) {
		let n = t ?? "unknown";
		return e.customTypes.get(n)?.abbr ?? Hn[n] ?? n.slice(0, 4).toUpperCase();
	}
	function r(t) {
		let n = t ?? "unknown";
		return e.customTypes.get(n)?.label ?? Un[n] ?? n;
	}
	return {
		typeColor: t,
		typeAbbr: n,
		typeLabel: r,
		allTypes: i(() => {
			let t = Object.keys(Un).map((e) => ({
				id: e,
				label: Un[e],
				color: Bn[e],
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
//#region src/components/layout/DeviceDetailPanel.vue?vue&type=script&setup=true&lang.ts
var nu = {
	key: 0,
	class: "panel"
}, ru = { class: "panel-head" }, iu = { class: "dev-title" }, au = { class: "dev-name" }, ou = { class: "dev-ip" }, su = { class: "panel-body" }, cu = { class: "section" }, lu = { class: "info-grid" }, uu = { class: "info-v" }, du = { class: "info-v" }, fu = { class: "info-v" }, pu = { class: "info-v" }, mu = { class: "info-v" }, hu = {
	key: 0,
	class: "section"
}, gu = { class: "m-label" }, _u = { class: "m-bar-wrap" }, vu = { class: "section" }, yu = { class: "if-summary" }, bu = { class: "if-up" }, xu = { class: "if-dn" }, Su = { class: "chevron" }, Cu = {
	key: 0,
	class: "iface-list"
}, wu = { class: "if-name" }, Tu = { class: "if-alias" }, Eu = { class: "if-ip" }, Du = { class: "if-speed" }, Ou = { class: "if-traffic" }, ku = {
	key: 0,
	class: "if-err"
}, Au = {
	key: 1,
	class: "section"
}, ju = { class: "vt-row" }, Mu = { value: "" }, Nu = { label: "Built-in" }, Pu = ["value"], Fu = {
	key: 0,
	label: "Custom"
}, Iu = ["value"], Lu = {
	key: 2,
	class: "section"
}, Ru = { class: "anno-form" }, zu = {
	key: 3,
	class: "section actions"
}, Bu = { class: "action-btns" }, Vu = {
	key: 0,
	class: "action-log"
}, Hu = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "DeviceDetailPanel",
	setup(t) {
		let n = H(), r = U(), { allTypes: a } = tu(), { rebuildAll: o } = Ks(), u = S(!1), f = S(""), p = S(""), m = S(""), h = S(""), v = S(""), y = i(() => r.selectedDeviceId ? n.devices.get(r.selectedDeviceId) ?? null : null), x = i(() => y.value ? n.getMappingByDeviceId(y.value.id) ?? null : null), E = i(() => y.value ? n.interfacesByDevice.get(y.value.id) ?? [] : []), D = i(() => E.value.filter((e) => e.status === "up").length), j = i(() => E.value.filter((e) => e.status === "down").length);
		A(x, (e) => {
			p.value = e?.displayName ?? "", m.value = e?.memo ?? "", h.value = e?.tags?.join(", ") ?? "", v.value = e?.visualType ?? "";
		}, { immediate: !0 });
		function N() {
			y.value && (n.setVisualType(y.value.id, v.value || void 0), o());
		}
		let P = i(() => {
			let e = y.value?.metrics;
			return e ? [
				{
					key: "cpu",
					label: "CPU",
					pct: e.cpu ?? 0,
					display: `${(e.cpu ?? 0).toFixed(1)}%`,
					color: F(e.cpu ?? 0)
				},
				{
					key: "mem",
					label: "Memory",
					pct: e.memory ?? 0,
					display: `${(e.memory ?? 0).toFixed(1)}%`,
					color: F(e.memory ?? 0)
				},
				{
					key: "disk",
					label: "Disk",
					pct: e.disk ?? 0,
					display: `${(e.disk ?? 0).toFixed(1)}%`,
					color: F(e.disk ?? 0)
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
					color: F(((e.temperature ?? 40) - 20) / 60 * 100)
				}
			] : [];
		});
		function F(e) {
			return e >= 90 ? "#ef4444" : e >= 70 ? "#eab308" : "#22c55e";
		}
		function I(e) {
			return e ? e >= 1e3 ? `${(e / 1e3).toFixed(1)}G` : `${e.toFixed(0)}M` : "0";
		}
		function L() {
			y.value && n.updateDeviceStatus(y.value.id, "offline"), f.value = `[${R()}] Isolated`;
		}
		function ee() {
			y.value && n.updateDeviceStatus(y.value.id, "normal"), f.value = `[${R()}] Recovered`;
		}
		function te() {
			y.value && n.updateDeviceStatus(y.value.id, "acknowledged"), f.value = `[${R()}] Acknowledged`;
		}
		function ne() {
			y.value && (n.updateAnnotation(y.value.id, {
				displayName: p.value || void 0,
				memo: m.value || void 0,
				tags: h.value ? h.value.split(",").map((e) => e.trim()).filter(Boolean) : []
			}), f.value = `[${R()}] Annotation saved`);
		}
		function re() {
			y.value && (n.unmapDevice(y.value.id), r.select(null));
		}
		function R() {
			return (/* @__PURE__ */ new Date()).toLocaleTimeString();
		}
		return (t, n) => y.value ? (b(), c("aside", nu, [l("div", ru, [l("div", iu, [
			l("span", {
				class: "type-tag",
				style: _({
					color: T(Bn)[y.value.normalizedType ?? "unknown"],
					borderColor: T(Bn)[y.value.normalizedType ?? "unknown"]
				})
			}, w(T(Hn)[y.value.normalizedType ?? "unknown"]), 5),
			l("div", null, [l("div", au, w(x.value?.displayName ?? y.value.hostname), 1), l("div", ou, w(y.value.ip), 1)]),
			l("span", { class: g(["status-badge", y.value.status]) }, w(T(Wn)[y.value.status ?? "unknown"]), 3),
			l("button", {
				class: "close-btn",
				onClick: n[0] ||= (e) => T(r).select(null),
				title: "Close"
			}, "✕")
		])]), l("div", su, [
			l("section", cu, [n[16] ||= l("div", { class: "sec-title" }, "Info", -1), l("div", lu, [
				n[6] ||= l("span", { class: "info-k" }, "Vendor", -1),
				n[7] ||= d(),
				l("span", uu, w(y.value.vendor ?? "—"), 1),
				n[8] ||= l("span", { class: "info-k" }, "Model", -1),
				n[9] ||= d(),
				l("span", du, w(y.value.model ?? "—"), 1),
				n[10] ||= l("span", { class: "info-k" }, "OS", -1),
				n[11] ||= d(),
				l("span", fu, w(y.value.os ?? "—"), 1),
				n[12] ||= l("span", { class: "info-k" }, "Source", -1),
				n[13] ||= d(),
				l("span", pu, w(y.value.source), 1),
				n[14] ||= l("span", { class: "info-k" }, "Sync", -1),
				n[15] ||= d(),
				l("span", mu, w(y.value.syncState), 1)
			])]),
			y.value.metrics ? (b(), c("section", hu, [n[17] ||= l("div", { class: "sec-title" }, "Metrics", -1), (b(!0), c(e, null, C(P.value, (e) => (b(), c("div", {
				key: e.key,
				class: "metric-row"
			}, [
				l("span", gu, w(e.label), 1),
				l("div", _u, [l("div", {
					class: "m-bar",
					style: _({
						width: e.pct + "%",
						background: e.color
					})
				}, null, 4)]),
				l("span", { class: g(["m-val", { hot: e.pct > 85 }]) }, w(e.display), 3)
			]))), 128))])) : s("", !0),
			l("section", vu, [l("div", {
				class: "sec-title clickable",
				onClick: n[1] ||= (e) => u.value = !u.value
			}, [
				l("span", null, "Interfaces (" + w(E.value.length) + ")", 1),
				l("span", yu, [l("span", bu, "Up " + w(D.value), 1), l("span", xu, "Down " + w(j.value), 1)]),
				l("span", Su, w(u.value ? "−" : "+"), 1)
			]), u.value ? (b(), c("div", Cu, [(b(!0), c(e, null, C(E.value, (e) => (b(), c("div", {
				key: e.id,
				class: g(["iface-row", e.status])
			}, [
				l("span", { class: g(["if-dot", e.status]) }, null, 2),
				l("span", wu, w(e.name), 1),
				l("span", Tu, w(e.alias ?? ""), 1),
				l("span", Eu, w(e.ip ?? ""), 1),
				l("span", Du, w(e.speed ? e.speed + "M" : ""), 1),
				l("div", Ou, [l("span", null, "In " + w(I(e.trafficIn)), 1), l("span", null, "Out " + w(I(e.trafficOut)), 1)]),
				e.errors ? (b(), c("span", ku, "err:" + w(e.errors), 1)) : s("", !0)
			], 2))), 128))])) : s("", !0)]),
			T(r).mode === "edit" ? (b(), c("section", Au, [n[18] ||= l("div", { class: "sec-title" }, "Visual Shape", -1), l("div", ju, [M(l("select", {
				"onUpdate:modelValue": n[2] ||= (e) => v.value = e,
				class: "vt-sel"
			}, [
				l("option", Mu, "Default (" + w(y.value?.normalizedType ?? "unknown") + ")", 1),
				l("optgroup", Nu, [(b(!0), c(e, null, C(T(a).filter((e) => !e.custom), (e) => (b(), c("option", {
					key: e.id,
					value: e.id
				}, w(e.label), 9, Pu))), 128))]),
				T(a).some((e) => e.custom) ? (b(), c("optgroup", Fu, [(b(!0), c(e, null, C(T(a).filter((e) => e.custom), (e) => (b(), c("option", {
					key: e.id,
					value: e.id
				}, " ★ " + w(e.label), 9, Iu))), 128))])) : s("", !0)
			], 512), [[O, v.value]]), l("button", {
				class: "vt-apply",
				onClick: N
			}, "Apply")])])) : s("", !0),
			T(r).mode === "edit" ? (b(), c("section", Lu, [n[22] ||= l("div", { class: "sec-title" }, "Annotation", -1), l("div", Ru, [
				l("label", null, [n[19] ||= d("Display name ", -1), M(l("input", {
					"onUpdate:modelValue": n[3] ||= (e) => p.value = e,
					class: "anno-input",
					placeholder: "Device alias"
				}, null, 512), [[k, p.value]])]),
				l("label", null, [n[20] ||= d("Memo ", -1), M(l("textarea", {
					"onUpdate:modelValue": n[4] ||= (e) => m.value = e,
					class: "anno-input anno-textarea",
					rows: "2"
				}, null, 512), [[k, m.value]])]),
				l("label", null, [n[21] ||= d("Tags (comma separated) ", -1), M(l("input", {
					"onUpdate:modelValue": n[5] ||= (e) => h.value = e,
					class: "anno-input",
					placeholder: "web, db, prod"
				}, null, 512), [[k, h.value]])]),
				l("button", {
					class: "save-btn",
					onClick: ne
				}, "Save")
			])])) : s("", !0),
			T(r).mode === "edit" ? (b(), c("section", zu, [
				n[23] ||= l("div", { class: "sec-title" }, "Actions", -1),
				l("div", Bu, [
					l("button", {
						class: "act-btn isolate",
						onClick: L
					}, "Isolate"),
					l("button", {
						class: "act-btn recover",
						onClick: ee
					}, "Recover"),
					l("button", {
						class: "act-btn ack",
						onClick: te
					}, "Acknowledge"),
					T(r).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "act-btn unmap",
						onClick: re
					}, "Remove from map")) : s("", !0)
				]),
				f.value ? (b(), c("div", Vu, w(f.value), 1)) : s("", !0)
			])) : s("", !0)
		])])) : s("", !0);
	}
}), [["__scopeId", "data-v-144fe0ff"]]), Uu = {
	key: 0,
	class: "panel"
}, Wu = { class: "panel-head" }, Gu = { class: "link-title" }, Ku = { class: "link-type" }, qu = { class: "link-src" }, Ju = { class: "panel-body" }, Yu = { class: "section" }, Xu = { class: "info-grid" }, Zu = { class: "v" }, Qu = { class: "v" }, $u = { class: "v" }, ed = { class: "v" }, td = { class: "v" }, nd = {
	key: 0,
	class: "section"
}, rd = { class: "edit-form" }, id = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "LinkPropertyPanel",
	setup(e) {
		let t = H(), n = U(), r = {
			physical: "Physical",
			logical: "Logical",
			service_dependency: "Service Dependency",
			traffic_flow: "Traffic Flow",
			security_path: "Security Path",
			manual: "Manual",
			inferred: "Inferred"
		}, a = i(() => n.selectedLinkId ? t.links.get(n.selectedLinkId) ?? null : null), o = i(() => a.value ? t.devices.get(a.value.sourceDeviceId) : null), u = i(() => a.value ? t.devices.get(a.value.targetDeviceId) : null), f = i(() => o.value?.hostname ?? "?"), p = i(() => u.value?.hostname ?? "?"), m = S("up"), h = S("");
		A(a, (e) => {
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
		return (e, t) => a.value ? (b(), c("aside", Uu, [l("div", Wu, [l("div", Gu, [
			l("span", {
				class: "link-icon",
				style: _({ color: T(Vn)[a.value.type]?.color })
			}, "╌", 4),
			l("div", null, [l("div", Ku, w(r[a.value.type]), 1), l("div", qu, w(f.value) + " → " + w(p.value), 1)]),
			l("span", { class: g(["status-dot", a.value.status]) }, null, 2),
			l("button", {
				class: "close-btn",
				onClick: t[0] ||= (e) => T(n).select(null),
				title: "Close"
			}, "✕")
		])]), l("div", Ju, [l("section", Yu, [t[15] ||= l("div", { class: "sec-title" }, "Link Info", -1), l("div", Xu, [
			t[3] ||= l("span", { class: "k" }, "Type", -1),
			t[4] ||= d(),
			l("span", Zu, w(r[a.value.type]), 1),
			t[5] ||= l("span", { class: "k" }, "Status", -1),
			t[6] ||= d(),
			l("span", { class: g(["v", `s-${a.value.status}`]) }, w(a.value.status ?? "unknown"), 3),
			t[7] ||= l("span", { class: "k" }, "Source", -1),
			t[8] ||= d(),
			l("span", Qu, w(a.value.source), 1),
			t[9] ||= l("span", { class: "k" }, "Confidence", -1),
			t[10] ||= d(),
			l("span", $u, w(a.value.confidence ?? "—"), 1),
			t[11] ||= l("span", { class: "k" }, "Bandwidth", -1),
			t[12] ||= d(),
			l("span", ed, w(a.value.bandwidth ? a.value.bandwidth + " Mbps" : "—"), 1),
			t[13] ||= l("span", { class: "k" }, "Label", -1),
			t[14] ||= d(),
			l("span", td, w(a.value.label ?? "—"), 1)
		])]), T(n).mode === "edit" && a.value.source === "manual" ? (b(), c("section", nd, [t[19] ||= l("div", { class: "sec-title" }, "Edit", -1), l("div", rd, [
			l("label", null, [t[17] ||= d("Status ", -1), M(l("select", {
				"onUpdate:modelValue": t[1] ||= (e) => m.value = e,
				class: "sel"
			}, [...t[16] ||= [
				l("option", { value: "up" }, "Up", -1),
				l("option", { value: "down" }, "Down", -1),
				l("option", { value: "unknown" }, "Unknown", -1)
			]], 512), [[O, m.value]])]),
			l("label", null, [t[18] ||= d("Label ", -1), M(l("input", {
				"onUpdate:modelValue": t[2] ||= (e) => h.value = e,
				class: "inp"
			}, null, 512), [[k, h.value]])]),
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
}), [["__scopeId", "data-v-1f2f1ef4"]]), ad = {
	key: 0,
	class: "panel"
}, od = { class: "panel-head" }, sd = { class: "kind-tag" }, cd = { class: "sp-name" }, ld = { class: "panel-body" }, ud = {
	key: 0,
	class: "section"
}, dd = { class: "info-grid" }, fd = { class: "v" }, pd = { class: "v" }, md = { class: "v" }, hd = { class: "section" }, gd = {
	key: 1,
	class: "section"
}, _d = { class: "slider-row" }, vd = ["min", "max"], yd = { class: "s-val" }, bd = { class: "slider-row" }, xd = ["min", "max"], Sd = { class: "s-val" }, Cd = {
	key: 2,
	class: "section actions"
}, wd = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "SpacePropertyPanel",
	setup(e) {
		let t = H(), n = U(), { refreshSpace: r } = Ks(), a = i(() => n.selectedSpaceId ? t.spaces.get(n.selectedSpaceId) ?? null : null), o = i(() => n.selectedSpaceId ? t.devicesBySpace.get(n.selectedSpaceId)?.length ?? 0 : 0), u = S(""), f = S(10), p = S(10), m = i(() => {
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
		A(a, (e) => {
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
		return (e, t) => a.value ? (b(), c("aside", ad, [l("div", od, [
			l("span", sd, w(a.value.type.toUpperCase()), 1),
			l("span", cd, w(a.value.name), 1),
			l("button", {
				class: "close-btn",
				onClick: t[0] ||= (e) => T(n).select(null),
				title: "Close"
			}, "✕")
		]), l("div", ld, [
			T(n).mode === "edit" ? (b(), c("section", ud, [t[10] ||= l("div", { class: "sec-title" }, "Info", -1), l("div", dd, [
				t[4] ||= l("span", { class: "k" }, "Kind", -1),
				t[5] ||= d(),
				l("span", fd, w(a.value.kind), 1),
				t[6] ||= l("span", { class: "k" }, "Type", -1),
				t[7] ||= d(),
				l("span", pd, w(a.value.type), 1),
				t[8] ||= l("span", { class: "k" }, "Devices", -1),
				t[9] ||= d(),
				l("span", md, w(o.value), 1)
			])])) : s("", !0),
			l("section", hd, [t[11] ||= l("div", { class: "sec-title" }, "Name", -1), M(l("input", {
				"onUpdate:modelValue": t[1] ||= (e) => u.value = e,
				class: "inp",
				onChange: h
			}, null, 544), [[k, u.value]])]),
			T(n).mode === "edit" && a.value.size ? (b(), c("section", gd, [
				t[14] ||= l("div", { class: "sec-title" }, "Size", -1),
				l("div", _d, [
					t[12] ||= l("span", { class: "s-label" }, "Width", -1),
					M(l("input", {
						type: "range",
						min: m.value.min,
						max: m.value.max,
						step: "0.5",
						"onUpdate:modelValue": t[2] ||= (e) => f.value = e,
						class: "slider",
						onInput: g
					}, null, 40, vd), [[
						k,
						f.value,
						void 0,
						{ number: !0 }
					]]),
					l("span", yd, w(f.value.toFixed(1)), 1)
				]),
				l("div", bd, [
					t[13] ||= l("span", { class: "s-label" }, "Depth", -1),
					M(l("input", {
						type: "range",
						min: m.value.min,
						max: m.value.max,
						step: "0.5",
						"onUpdate:modelValue": t[3] ||= (e) => p.value = e,
						class: "slider",
						onInput: g
					}, null, 40, xd), [[
						k,
						p.value,
						void 0,
						{ number: !0 }
					]]),
					l("span", Sd, w(p.value.toFixed(1)), 1)
				])
			])) : s("", !0),
			T(n).mode === "edit" ? (b(), c("section", Cd, [l("button", {
				class: "act-btn archive",
				onClick: _
			}, "Archive space")])) : s("", !0)
		])])) : s("", !0);
	}
}), [["__scopeId", "data-v-9d0ae939"]]), Td = { class: "sv-panel" }, Ed = { class: "sv-head" }, Dd = {
	key: 0,
	class: "sv-empty"
}, Od = { class: "sv-list" }, kd = ["onClick"], Ad = { class: "sv-name" }, jd = { class: "sv-time" }, Md = ["onClick"], Nd = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "SavedViewPanel",
	emits: ["load-view", "save-view"],
	setup(t, { emit: n }) {
		let r = H(), i = U(), a = n;
		function o() {
			let e = prompt("Enter a view name:", `View-${r.savedViews.length + 1}`) ?? "";
			e && a("save-view", e);
		}
		function u(e) {
			a("load-view", e);
		}
		return (t, n) => (b(), c("div", Td, [
			l("div", Ed, [
				n[1] ||= l("span", null, "Saved Views", -1),
				l("button", {
					class: "sv-save",
					onClick: o,
					title: "Save current view"
				}, "Save Current"),
				l("button", {
					class: "icon-btn",
					onClick: n[0] ||= (e) => T(i).showSavedViews = !1
				}, "Close")
			]),
			T(r).savedViews.length ? s("", !0) : (b(), c("div", Dd, "No saved views")),
			l("div", Od, [(b(!0), c(e, null, C(T(r).savedViews, (e) => (b(), c("div", {
				key: e.id,
				class: "sv-row"
			}, [l("div", {
				class: "sv-info",
				onClick: (t) => u(e)
			}, [l("div", Ad, w(e.name), 1), l("div", jd, w(e.createdAt), 1)], 8, kd), l("button", {
				class: "del-btn",
				onClick: (t) => T(r).removeSavedView(e.id)
			}, "✕", 8, Md)]))), 128))])
		]));
	}
}), [["__scopeId", "data-v-2125ec23"]]), Pd = { class: "cl-panel" }, Fd = { class: "cl-head" }, Id = {
	key: 0,
	class: "cl-empty"
}, Ld = { class: "cl-list" }, Rd = { class: "cl-msg" }, zd = { class: "cl-ts" }, Bd = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "ChangeLogPanel",
	setup(t) {
		let n = H(), r = U();
		function i(e) {
			return e.includes("link") ? "link" : e.includes("space") ? "space" : e.includes("device") ? "device" : "other";
		}
		return (t, a) => (b(), c("div", Pd, [
			l("div", Fd, [
				a[2] ||= l("span", null, "Change Log", -1),
				l("button", {
					class: "cl-clear",
					onClick: a[0] ||= (e) => T(n).changeLog.splice(0)
				}, "Clear"),
				l("button", {
					class: "icon-btn",
					onClick: a[1] ||= (e) => T(r).showChangeLog = !1
				}, "Close")
			]),
			T(n).changeLog.length ? s("", !0) : (b(), c("div", Id, "No changes yet")),
			l("div", Ld, [(b(!0), c(e, null, C(T(n).changeLog, (e) => (b(), c("div", {
				key: e.id,
				class: "cl-row"
			}, [
				l("span", { class: g(["cl-type", i(e.type)]) }, w(e.type), 3),
				l("span", Rd, w(e.msg), 1),
				l("span", zd, w(e.ts), 1)
			]))), 128))])
		]));
	}
}), [["__scopeId", "data-v-1ac57ed1"]]), Vd = { class: "vn-panel" }, Hd = { class: "vn-head" }, Ud = { class: "vn-list" }, Wd = ["onClick"], Gd = { class: "vn-tag" }, Kd = { class: "vn-label" }, qd = ["onClick"], Jd = {
	key: 0,
	class: "vn-empty"
}, Yd = {
	key: 0,
	class: "add-form"
}, Xd = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "VirtualNodePanel",
	emits: ["select-node"],
	setup(t, { emit: r }) {
		let a = H(), o = U(), u = r, d = S(!1), p = S("internet"), m = S(""), h = i(() => [...a.virtualNodes.values()]);
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
		return (t, r) => (b(), c("div", Vd, [
			l("div", Hd, [
				r[4] ||= l("span", null, "Virtual Nodes", -1),
				T(o).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "text-btn",
					onClick: r[0] ||= (e) => d.value = !d.value
				}, "Add")) : s("", !0),
				l("button", {
					class: "text-btn",
					onClick: r[1] ||= (e) => T(o).showVirtualNodes = !1
				}, "Close")
			]),
			l("div", Ud, [(b(!0), c(e, null, C(h.value, (e) => (b(), c("div", {
				key: e.id,
				class: "vn-row",
				onClick: (t) => v(e.id)
			}, [
				l("span", Gd, w(e.type.slice(0, 3).toUpperCase()), 1),
				l("span", Kd, w(e.label), 1),
				T(o).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "del-btn",
					onClick: P((t) => _(e.id), ["stop"])
				}, "x", 8, qd)) : s("", !0)
			], 8, Wd))), 128)), h.value.length ? s("", !0) : (b(), c("div", Jd, "No virtual nodes"))]),
			f(n, { name: "fade" }, {
				default: j(() => [T(o).mode === "edit" && d.value ? (b(), c("div", Yd, [
					M(l("select", {
						"onUpdate:modelValue": r[2] ||= (e) => p.value = e,
						class: "add-sel"
					}, [...r[5] ||= [
						l("option", { value: "internet" }, "Internet", -1),
						l("option", { value: "cloud" }, "Cloud", -1),
						l("option", { value: "external" }, "External", -1),
						l("option", { value: "custom" }, "Custom", -1)
					]], 512), [[O, p.value]]),
					M(l("input", {
						"onUpdate:modelValue": r[3] ||= (e) => m.value = e,
						class: "add-input",
						placeholder: "Name",
						onKeydown: N(g, ["enter"])
					}, null, 544), [[k, m.value]]),
					l("button", {
						class: "add-btn",
						onClick: g
					}, "Add")
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-9b02530a"]]), Zd = {
	key: 0,
	class: "tl-panel"
}, Qd = { class: "tl-head" }, $d = {
	key: 0,
	class: "tl-info"
}, ef = {
	key: 0,
	class: "tl-slider-wrap"
}, tf = ["max"], nf = { class: "tl-label" }, rf = {
	key: 1,
	class: "tl-replay-banner"
}, af = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "TimelinePanel",
	props: { timeline: {} },
	emits: ["scrub", "live"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = U(), o = H(), u = S(null), f = i(() => n.timeline.isRecording), p = i(() => n.timeline.frameCount), m = i(() => a.timelineFrameIdx < 0 ? null : n.timeline.getFrame(a.timelineFrameIdx));
		function h() {
			n.timeline.isRecording ? (n.timeline.stopRecording(), o.logChange("timeline", "Timeline recording stopped")) : (n.timeline.startRecording(() => {
				let e = {};
				return o.devices.forEach((t) => {
					e[t.id] = {
						status: t.status,
						metrics: { ...t.metrics }
					};
				}), e;
			}), o.logChange("timeline", "Timeline recording started"));
		}
		function _() {
			r("scrub", a.timelineFrameIdx);
		}
		function v() {
			E(n.timeline.export(), `timeline-${Date.now()}.json`);
		}
		function y() {
			let e = o.exportSnapshot();
			E(JSON.stringify(e, null, 2), `layout-${Date.now()}.json`), o.logChange("export", "Layout exported");
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
		function E(e, t) {
			let n = document.createElement("a");
			n.href = URL.createObjectURL(new Blob([e], { type: "application/json" })), n.download = t, n.click(), URL.revokeObjectURL(n.href);
		}
		return (e, t) => T(a).showTimeline ? (b(), c("div", Zd, [
			l("div", Qd, [
				l("button", {
					class: g(["tl-btn", f.value ? "rec" : ""]),
					onClick: h
				}, w(f.value ? "Stop Recording" : "Record"), 3),
				p.value > 0 ? (b(), c("span", $d, w(p.value) + " frames", 1)) : s("", !0),
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
					onClick: t[0] ||= (e) => T(a).showTimeline = !1
				}, "Close")
			]),
			p.value > 0 ? (b(), c("div", ef, [
				t[4] ||= l("span", { class: "tl-label" }, "LIVE", -1),
				M(l("input", {
					type: "range",
					min: "-1",
					max: p.value - 1,
					step: "1",
					"onUpdate:modelValue": t[1] ||= (e) => T(a).timelineFrameIdx = e,
					class: "tl-slider",
					onInput: _
				}, null, 40, tf), [[
					k,
					T(a).timelineFrameIdx,
					void 0,
					{ number: !0 }
				]]),
				l("span", nf, w(m.value?.label ?? "LIVE"), 1)
			])) : s("", !0),
			T(a).timelineFrameIdx >= 0 ? (b(), c("div", rf, [t[5] ||= d(" Replay mode — real-time updates paused ", -1), l("button", {
				class: "tl-btn",
				onClick: t[2] ||= (e) => {
					T(a).timelineFrameIdx = -1, r("live");
				}
			}, "Back to LIVE")])) : s("", !0)
		])) : s("", !0);
	}
}), [["__scopeId", "data-v-234c1e2f"]]), of = class {
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
	render(e, t, n, r, i, a) {
		let o = this.ctx, s = this.canvas.width, c = this.canvas.height;
		o.clearRect(0, 0, s, c), o.fillStyle = "rgba(8,12,24,0.92)", o.fillRect(0, 0, s, c), o.strokeStyle = "#1a2a4a", o.lineWidth = 1, o.strokeRect(.5, .5, s - 1, c - 1), e.filter((e) => e.position && !e.archived).forEach((e) => {
			let t = this.toMM(e.position.x, e.position.z);
			if (e.type === "rack") o.fillStyle = "#1e3a5f", o.fillRect(t.x - 3, t.y - 2, 6, 4);
			else if (e.type === "zone" || e.type === "site") {
				let n = e.size ?? {
					width: 20,
					depth: 20
				}, r = n.width / (this.bounds.maxX - this.bounds.minX) * (s - 16), i = n.depth / (this.bounds.maxZ - this.bounds.minZ) * (c - 16);
				o.strokeStyle = e.type === "site" ? "#2a4a8a" : "#1e3a5f", o.lineWidth = e.type === "site" ? 1.5 : 1, o.setLineDash(e.type === "zone" ? [2, 2] : []), o.strokeRect(t.x - r / 2, t.y - i / 2, r, i), o.setLineDash([]);
			}
		}), t.forEach((e) => {
			let t = a(e.id);
			if (!t?.position) return;
			let n = this.toMM(t.position.x, t.position.z), r = Rn[e.status ?? "unknown"];
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
}, sf = {
	key: 0,
	class: "mm-wrap"
}, cf = 180, lf = 130, uf = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "MinimapPanel",
	props: {
		camera: {},
		controls: {}
	},
	setup(e) {
		let t = e, n = S(null), r = H(), i = U(), a = null, o = null;
		y(() => {
			n.value && (a = new of(n.value), a.updateBounds([...r.spaces.values()]), u());
		});
		function u() {
			let e = () => {
				if (o = requestAnimationFrame(e), !a || !i.showMinimap) return;
				let n = t.camera.position, s = t.controls.target;
				a.render([...r.spaces.values()], [...r.devices.values()], r.mappings, {
					x: n.x,
					z: n.z
				}, {
					x: s.x,
					z: s.z
				}, (e) => r.getMappingByDeviceId(e));
			};
			e();
		}
		return A(() => r.spaces.size, () => {
			a?.updateBounds([...r.spaces.values()]);
		}), v(() => {
			o && cancelAnimationFrame(o);
		}), (e, t) => T(i).showMinimap ? (b(), c("div", sf, [l("canvas", {
			ref_key: "canvas",
			ref: n,
			width: cf,
			height: lf,
			class: "mm-canvas"
		}, null, 512), l("button", {
			class: "mm-close",
			onClick: t[0] ||= (e) => T(i).showMinimap = !1,
			title: "Close minimap"
		}, "✕")])) : s("", !0);
	}
}), [["__scopeId", "data-v-8f8db4dc"]]), df = { class: "tt-name" }, ff = { class: "tt-ip" }, pf = {
	key: 0,
	class: "tt-metrics"
}, mf = {
	key: 0,
	class: "hint edit-hint"
}, hf = {
	key: 1,
	class: "hint"
}, gf = {
	key: 2,
	class: "hint"
}, _f = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "SceneCanvas",
	emits: ["scene-ready"],
	setup(e, { emit: t }) {
		let r = S(null), a = S(null), o = S(null), u = H(), p = U(), m = t, { init: g, dispose: x, dropDeviceAt: C } = Ks(), E = i(() => p.tooltip), D = i(() => p.tooltip.deviceId ? u.devices.get(p.tooltip.deviceId) : null);
		function O(e) {
			let t = e.dataTransfer?.getData("deviceId");
			t && C(t, e);
		}
		return y(() => {
			g(a.value, o.value, r.value), h(() => m("scene-ready"));
		}), v(() => x()), (e, t) => (b(), c("div", {
			ref_key: "wrapper",
			ref: r,
			class: "scene-wrap",
			onDragover: t[0] ||= P(() => {}, ["prevent"]),
			onDrop: O
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
				default: j(() => [E.value.visible && D.value ? (b(), c("div", {
					key: 0,
					class: "tooltip",
					style: _({
						left: E.value.x + 14 + "px",
						top: E.value.y - 10 + "px"
					})
				}, [
					l("div", df, w(D.value.hostname), 1),
					l("div", ff, w(D.value.ip), 1),
					l("div", {
						class: "tt-status",
						style: _({ color: T(Rn)[D.value.status ?? "unknown"] })
					}, w(T(Wn)[D.value.status ?? "unknown"]), 5),
					D.value.metrics ? (b(), c("div", pf, " C" + w((D.value.metrics.cpu ?? 0).toFixed(0)) + "% M" + w((D.value.metrics.memory ?? 0).toFixed(0)) + "% ", 1)) : s("", !0),
					l("div", {
						class: "tt-type",
						style: _({ color: T(Bn)[D.value.normalizedType ?? "unknown"] })
					}, w(T(Un)[D.value.normalizedType ?? "unknown"]), 5)
				], 4)) : s("", !0)]),
				_: 1
			}),
			T(p).linkToolActive ? (b(), c("div", mf, [...t[1] ||= [
				d(" Connect mode — ", -1),
				l("b", null, "drag", -1),
				d(" from one device to another, then pick a link type · ", -1),
				l("kbd", null, "ESC", -1),
				d(" to cancel ", -1)
			]])) : T(p).mode === "edit" ? (b(), c("div", hf, [...t[2] ||= [
				d(" Click to select, then drag the ", -1),
				l("span", { style: { color: "#ff6b7a" } }, "X", -1),
				d("/", -1),
				l("span", { style: { color: "#5fd968" } }, "Y", -1),
				d("/", -1),
				l("span", { style: { color: "#5fb0ff" } }, "Z", -1),
				d(" arrows to move · select a link and drag its handle · ", -1),
				l("kbd", null, "L", -1),
				d(" Connect · ", -1),
				l("kbd", null, "Del", -1),
				d(" Delete · ", -1),
				l("kbd", null, "F", -1),
				d(" Fit ", -1)
			]])) : (b(), c("div", gf, [...t[3] ||= [
				d(" View mode - click to inspect - ", -1),
				l("kbd", null, "F", -1),
				d(" Fit ", -1)
			]]))
		], 544));
	}
}), [["__scopeId", "data-v-4fc19d52"]]), vf = ["onClick"], yf = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "ContextMenu",
	setup(r) {
		let i = U(), { confirmCreateLink: a } = Ks(), u = [
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
			default: j(() => [T(i).contextMenu.visible ? (b(), c("div", {
				key: 0,
				class: "ctx-menu",
				style: _({
					left: T(i).contextMenu.x + "px",
					top: T(i).contextMenu.y + "px"
				}),
				onClick: a[1] ||= P(() => {}, ["stop"])
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
				}, null, 4), l("span", null, w(e.label), 1)], 12, vf)), 64)),
				a[3] ||= l("div", { class: "ctx-sep" }, null, -1),
				l("button", {
					class: "ctx-item cancel",
					onClick: a[0] ||= (e) => T(i).hideContextMenu()
				}, "Cancel")
			], 4)) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-fcf03e39"]]), bf = { class: "toast-stack" }, xf = ["onClick"], Sf = { class: "msg" }, Cf = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "ToastPanel",
	setup(n) {
		let i = U();
		return (n, a) => (b(), o(t, { to: "body" }, [l("div", bf, [f(r, { name: "toast" }, {
			default: j(() => [(b(!0), c(e, null, C(T(i).toasts, (e) => (b(), c("div", {
				key: e.id,
				class: g(["toast", e.type]),
				onClick: (t) => T(i).removeToast(e.id)
			}, [l("span", Sf, w(e.message), 1), a[0] ||= l("span", { class: "close" }, "✕", -1)], 10, xf))), 128))]),
			_: 1
		})])]));
	}
}), [["__scopeId", "data-v-0b13ee6c"]]), wf = { class: "help-modal" }, Tf = { class: "help-head" }, Ef = { class: "lang-switch" }, Df = { class: "help-body" }, Of = { class: "help-key" }, kf = { class: "help-desc" }, Af = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "HelpPanel",
	setup(r) {
		let i = U(), a = S("en"), u = {
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
							k: "Del",
							v: "Delete selected device / link / space"
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
							k: "Del",
							v: "선택한 장비 / 링크 / 공간 삭제"
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
			default: j(() => [T(i).showHelp ? (b(), c("div", {
				key: 0,
				class: "help-overlay",
				onClick: d[3] ||= P((e) => T(i).showHelp = !1, ["self"])
			}, [l("div", wf, [l("div", Tf, [
				d[4] ||= l("span", { class: "help-title" }, "Topospace — Help", -1),
				l("div", Ef, [l("button", {
					class: g(["lang-btn", a.value === "en" ? "on" : ""]),
					onClick: d[0] ||= (e) => a.value = "en"
				}, " EN ", 2), l("button", {
					class: g(["lang-btn", a.value === "ko" ? "on" : ""]),
					onClick: d[1] ||= (e) => a.value = "ko"
				}, " KO ", 2)]),
				l("button", {
					class: "close-btn",
					onClick: d[2] ||= (e) => T(i).showHelp = !1
				}, " Close ")
			]), l("div", Df, [(b(!0), c(e, null, C(u[a.value], (t) => (b(), c("section", {
				key: t.title,
				class: "help-section"
			}, [l("h3", null, w(t.title), 1), (b(!0), c(e, null, C(t.rows, (t) => (b(), c("div", {
				key: t.k,
				class: "help-row"
			}, [l("span", Of, [(b(!0), c(e, null, C(t.k.split("+"), (e) => (b(), c("kbd", { key: e }, w(e), 1))), 128))]), l("span", kf, w(t.v), 1)]))), 128))]))), 128))])])])) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-2f27426c"]]), jf = {
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
}, Mf = {
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
}, Nf = ["hostname", "type"];
function Pf(e) {
	return e.trim().toLowerCase().replace(/[\s_-]+/g, "");
}
var Ff = {
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
function If(e) {
	let t = [];
	return {
		mapped: e.map((e) => Ff[Pf(e)] || (t.push(e), null)),
		unknownCols: t
	};
}
function Lf(e, t) {
	let n = {};
	t.forEach((t, r) => {
		if (!t) return;
		let i = (e[r] ?? "").trim();
		i && (t === "type" ? n.type = jf[i.toLowerCase()] ?? "unknown" : t === "status" ? n.status = Mf[i.toLowerCase()] ?? "unknown" : n[t] = i);
	});
	for (let e of Nf) if (!n[e]) return { error: `missing required column: ${e}` };
	return { row: n };
}
function Rf(e) {
	let t = [], n = "", r = !1;
	for (let i = 0; i < e.length; i++) {
		let a = e[i];
		r ? a === "\"" && e[i + 1] === "\"" ? (n += "\"", i++) : a === "\"" ? r = !1 : n += a : a === "," ? (t.push(n), n = "") : a === "\"" ? r = !0 : n += a;
	}
	return t.push(n), t;
}
function zf(e) {
	let t = {
		rows: [],
		errors: [],
		warnings: []
	}, n = e.split(/\r?\n/).filter((e) => e.trim().length > 0);
	if (n.length < 2) return t.errors.push("CSV must contain a header row and at least one data row."), t;
	let { mapped: r, unknownCols: i } = If(Rf(n[0]));
	i.length && t.warnings.push(`Unknown columns ignored: ${i.join(", ")}`);
	for (let e = 1; e < n.length; e++) {
		let { row: i, error: a } = Lf(Rf(n[e]), r);
		if (a) {
			t.errors.push(`Row ${e + 1}: ${a}`);
			continue;
		}
		i && t.rows.push(i);
	}
	return t;
}
async function Bf(e) {
	let t = {
		rows: [],
		errors: [],
		warnings: []
	}, n = new (await (import("./exceljs.min-DI2t47S_.js").then((e) => /* @__PURE__ */ Dt(e.default, 1)))).Workbook();
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
	let { mapped: s, unknownCols: c } = If(o);
	c.length && t.warnings.push(`Unknown columns ignored: ${c.join(", ")}`);
	for (let e = i + 1; e <= r.rowCount; e++) {
		let n = r.getRow(e);
		if (n.actualCellCount === 0) continue;
		let i = [];
		o.forEach((e, t) => {
			let r = n.getCell(t + 1).value;
			i[t] = r == null ? "" : typeof r == "object" && "text" in r ? String(r.text) : String(r);
		});
		let { row: a, error: c } = Lf(i, s);
		if (c) {
			t.errors.push(`Row ${e}: ${c}`);
			continue;
		}
		a && t.rows.push(a);
	}
	return t;
}
function Vf() {
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
var Hf = { class: "imp-modal" }, Uf = { class: "imp-body" }, Wf = { class: "imp-section" }, Gf = {
	key: 0,
	class: "file-name"
}, Kf = {
	key: 0,
	class: "imp-section"
}, qf = {
	key: 0,
	class: "err-block"
}, Jf = {
	key: 0,
	class: "err-more"
}, Yf = {
	key: 1,
	class: "warn-block"
}, Xf = {
	key: 2,
	class: "tbl-wrap"
}, Zf = { class: "tbl" }, Qf = {
	key: 0,
	class: "tbl-more"
}, $f = {
	key: 1,
	class: "imp-section"
}, ep = { class: "opt" }, tp = {
	key: 0,
	class: "mode-warning"
}, np = ["disabled"], rp = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "ImportPanel",
	setup(n) {
		let r = U(), i = H(), { rebuildAll: a } = Ks(), u = S(null), f = S(""), p = S(!1), m = S(null), _ = S(!1), v = S(!1);
		function y() {
			r.showImport = !1;
		}
		async function x(e) {
			f.value = e.name;
			try {
				/\.xlsx$/i.test(e.name) ? m.value = await Bf(await e.arrayBuffer()) : m.value = zf(await e.text());
			} catch (e) {
				m.value = {
					rows: [],
					errors: [`Failed to parse: ${e.message}`],
					warnings: []
				};
			}
		}
		function D(e) {
			let t = e.target.files?.[0];
			t && x(t);
		}
		function O(e) {
			p.value = !1;
			let t = e.dataTransfer?.files?.[0];
			t && x(t);
		}
		function k() {
			let e = new Blob([Vf()], { type: "text/csv" }), t = document.createElement("a");
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
		return (n, i) => (b(), o(t, { to: "body" }, [T(r).showImport ? (b(), c("div", {
			key: 0,
			class: "imp-overlay",
			onClick: P(y, ["self"])
		}, [l("div", Hf, [l("div", { class: "imp-head" }, [
			i[4] ||= l("span", { class: "imp-title" }, "Import Devices & Topology", -1),
			l("button", {
				class: "text-btn",
				onClick: k
			}, "Download CSV template"),
			l("button", {
				class: "text-btn",
				onClick: y
			}, "Close")
		]), l("div", Uf, [
			l("section", Wf, [
				i[6] ||= l("div", { class: "step-title" }, "1. Select file", -1),
				l("div", {
					class: g(["drop-zone", { hover: p.value }]),
					onDragover: i[1] ||= P((e) => p.value = !0, ["prevent"]),
					onDragleave: i[2] ||= (e) => p.value = !1,
					onDrop: P(O, ["prevent"])
				}, [
					l("input", {
						ref_key: "fileInput",
						ref: u,
						type: "file",
						accept: ".csv,.xlsx",
						hidden: "",
						onChange: D
					}, null, 544),
					l("button", {
						class: "pick-btn",
						onClick: i[0] ||= (e) => u.value?.click()
					}, "Choose CSV / XLSX"),
					i[5] ||= l("span", { class: "drop-hint" }, "or drop a file here", -1),
					f.value ? (b(), c("span", Gf, w(f.value) + " · " + w(m.value?.rows.length ?? 0) + " rows", 1)) : s("", !0)
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
					l("code", null, "site"),
					d(", "),
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
					d(" are required. ")
				], -1)
			]),
			m.value ? (b(), c("section", Kf, [
				i[9] ||= l("div", { class: "step-title" }, "2. Preview", -1),
				m.value.errors.length ? (b(), c("div", qf, [(b(!0), c(e, null, C(m.value.errors.slice(0, 5), (e, t) => (b(), c("div", {
					key: t,
					class: "err-line"
				}, w(e), 1))), 128)), m.value.errors.length > 5 ? (b(), c("div", Jf, "… and " + w(m.value.errors.length - 5) + " more", 1)) : s("", !0)])) : s("", !0),
				m.value.warnings.length ? (b(), c("div", Yf, [(b(!0), c(e, null, C(m.value.warnings, (e, t) => (b(), c("div", {
					key: t,
					class: "warn-line"
				}, w(e), 1))), 128))])) : s("", !0),
				m.value.rows.length ? (b(), c("div", Xf, [l("table", Zf, [i[8] ||= l("thead", null, [l("tr", null, [
					l("th", null, "hostname"),
					l("th", null, "type"),
					l("th", null, "ip"),
					l("th", null, "site"),
					l("th", null, "zone"),
					l("th", null, "rack"),
					l("th", null, "status"),
					l("th", null, "uplink")
				])], -1), l("tbody", null, [(b(!0), c(e, null, C(m.value.rows.slice(0, 12), (e, t) => (b(), c("tr", { key: t }, [
					l("td", null, w(e.hostname), 1),
					l("td", null, w(e.type), 1),
					l("td", null, w(e.ip ?? ""), 1),
					l("td", null, w(e.site ?? ""), 1),
					l("td", null, w(e.zone ?? ""), 1),
					l("td", null, w(e.rack ?? ""), 1),
					l("td", null, w(e.status ?? ""), 1),
					l("td", null, w(e.uplink ?? ""), 1)
				]))), 128))])]), m.value.rows.length > 12 ? (b(), c("div", Qf, " … " + w(m.value.rows.length - 12) + " more rows ", 1)) : s("", !0)])) : s("", !0)
			])) : s("", !0),
			m.value && m.value.rows.length ? (b(), c("section", $f, [
				i[11] ||= l("div", { class: "step-title" }, "3. Import options", -1),
				l("label", ep, [M(l("input", {
					type: "checkbox",
					"onUpdate:modelValue": i[3] ||= (e) => _.value = e
				}, null, 512), [[E, _.value]]), i[10] ||= l("span", null, "Replace current scene (clear existing devices, spaces, links)", -1)]),
				T(r).mode === "edit" ? s("", !0) : (b(), c("div", tp, " Switch to Edit mode before importing topology data. ")),
				l("button", {
					class: "run-btn",
					disabled: T(r).mode !== "edit" || v.value,
					onClick: A
				}, " Import " + w(m.value.rows.length) + " devices ", 9, np)
			])) : s("", !0)
		])])])) : s("", !0)]));
	}
}), [["__scopeId", "data-v-ec87014b"]]), ip = { class: "app" }, ap = { class: "workspace" }, op = {
	key: 0,
	class: "left-dock"
}, sp = {
	class: "canvas-wrap",
	ref: "canvasWrap"
}, cp = {
	key: 1,
	class: "right-dock"
}, lp = {
	key: 0,
	class: "blast-banner"
}, up = { class: "blast-id" }, dp = /* @__PURE__ */ W(/* @__PURE__ */ p({
	__name: "App",
	setup(e) {
		let t = U(), r = H(), { saveCurrentView: a, loadSavedView: u, focusVirtualNode: p, onTimelineScrub: m, getScene: h, timeline: g } = Ks(), _ = S(null), v = S(!1), y = S(null), x = S(null);
		function C() {
			let e = h();
			y.value = e.camera, x.value = e.controls, v.value = !0;
		}
		function E(e) {
			a(e);
		}
		function D(e) {
			u(e);
		}
		function O(e) {
			p(e);
		}
		let k = i(() => r.devices.get(t.blastSourceId ?? "")?.hostname ?? t.blastSourceId), M = i(() => t.showAlertPanel || t.showCustomTypes || t.showRackServerList || t.showSpaceTree || t.showUnmapped), N = i(() => !!t.selectedDeviceId || !!t.selectedLinkId || !!t.selectedSpaceId || t.showSavedViews || t.showChangeLog || t.showVirtualNodes);
		return A(() => t.fontScale, (e) => {
			document.documentElement.style.setProperty("--ui-fs", String(e));
		}, { immediate: !0 }), (e, r) => (b(), c("div", ip, [
			f($t),
			f(cn),
			l("div", ap, [
				M.value ? (b(), c("aside", op, [T(t).showAlertPanel ? (b(), o(oc, { key: 0 })) : T(t).showCustomTypes ? (b(), o(Jc, { key: 1 })) : T(t).showRackServerList ? (b(), o(cl, { key: 2 })) : T(t).showSpaceTree ? (b(), o(Rl, { key: 3 })) : T(t).showUnmapped ? (b(), o(eu, { key: 4 })) : s("", !0)])) : s("", !0),
				l("div", sp, [f(_f, {
					ref_key: "sceneRef",
					ref: _,
					onSceneReady: C
				}, null, 512), v.value && T(t).showMinimap ? (b(), o(uf, {
					key: 0,
					camera: y.value,
					controls: x.value
				}, null, 8, ["camera", "controls"])) : s("", !0)], 512),
				N.value ? (b(), c("aside", cp, [
					T(t).selectedDeviceId ? (b(), o(Hu, { key: 0 })) : T(t).selectedLinkId ? (b(), o(id, { key: 1 })) : T(t).selectedSpaceId ? (b(), o(wd, { key: 2 })) : s("", !0),
					T(t).showSavedViews ? (b(), o(Nd, {
						key: 3,
						onSaveView: E,
						onLoadView: D
					})) : s("", !0),
					T(t).showChangeLog ? (b(), o(Bd, { key: 4 })) : s("", !0),
					T(t).showVirtualNodes ? (b(), o(Xd, {
						key: 5,
						onSelectNode: O
					})) : s("", !0)
				])) : s("", !0)
			]),
			T(t).showTimeline ? (b(), o(af, {
				key: 0,
				timeline: T(g),
				onScrub: T(m),
				onLive: r[0] ||= (e) => T(t).timelineFrameIdx = -1
			}, null, 8, ["timeline", "onScrub"])) : s("", !0),
			f(yf),
			f(Cf),
			f(Af),
			f(rp),
			f(n, { name: "fade" }, {
				default: j(() => [T(t).blastSourceId ? (b(), c("div", lp, [
					r[2] ||= d(" Impact radius ", -1),
					l("span", up, w(k.value), 1),
					l("button", {
						class: "blast-close",
						onClick: r[1] ||= (e) => {
							T(t).blastSourceId = null, T(t).select(null);
						}
					}, "Close")
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-f96225a4"]]);
//#endregion
//#region src/index.ts
function fp(e) {
	if (!e.container) throw Error("createNmsEditor requires a container HTMLElement.");
	let t = e.container;
	Gs(e);
	let n = pp(e), r = a(dp), i = F();
	r.provide(Hs, e), r.use(i), r.config.errorHandler = (t) => {
		let n = t instanceof Error ? t : Error(String(t));
		e.onError?.(n, { phase: "vue" });
	}, r.mount(n);
	let o = H(i), s = U(i);
	return {
		destroy() {
			r.unmount(), e.shadowDom && t.shadowRoot?.replaceChildren(), Gs({});
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
function pp(e) {
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
export { fp as createNmsEditor, Ot as n, Tt as t };
