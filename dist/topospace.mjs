import { Fragment as e, Teleport as t, Transition as n, TransitionGroup as r, computed as i, createApp as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createStaticVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as m, nextTick as h, normalizeClass as g, normalizeStyle as _, onBeforeUnmount as v, onMounted as y, openBlock as b, reactive as x, ref as S, renderList as C, toDisplayString as w, unref as T, vModelCheckbox as E, vModelSelect as D, vModelText as O, watch as k, withCtx as A, withDirectives as j, withKeys as M, withModifiers as N } from "vue";
import { createPinia as ee, defineStore as te } from "pinia";
import * as P from "three";
import { BackSide as F, BatchedMesh as ne, Box3 as re, BufferAttribute as ie, Controls as ae, DoubleSide as oe, FrontSide as se, Line as ce, Line3 as le, LineLoop as ue, LineSegments as de, MOUSE as fe, MathUtils as pe, Matrix4 as me, Mesh as he, Object3D as ge, Plane as _e, Points as ve, Quaternion as ye, REVISION as be, Ray as xe, Sphere as Se, Spherical as Ce, TOUCH as we, Triangle as Te, Vector2 as I, Vector3 as L } from "three";
//#region \0rolldown/runtime.js
var Ee = Object.create, De = Object.defineProperty, Oe = Object.getOwnPropertyDescriptor, ke = Object.getOwnPropertyNames, Ae = Object.getPrototypeOf, je = Object.prototype.hasOwnProperty, Me = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), Ne = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = ke(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !je.call(e, s) && s !== n && De(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = Oe(t, s)) || r.enumerable
	});
	return e;
}, Pe = (e, t, n) => (n = e == null ? {} : Ee(Ae(e)), Ne(t || !e || !e.__esModule ? De(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), Fe = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), Ie = {
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
}, Le = {
	search: "",
	status: [],
	type: [],
	spaceId: null,
	tags: [],
	showUnmapped: !0
}, Re = class {
	features;
	resolver;
	mode = "view";
	constructor(e = {}, t) {
		this.features = {
			...Ie,
			...e
		}, this.resolver = t ?? (() => !0);
	}
	setMode(e) {
		this.mode = e;
	}
	setFeatures(e) {
		this.features = {
			...Ie,
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
function ze() {
	return Math.random().toString(36).slice(2, 10);
}
function Be(e, t) {
	return Math.random() * (t - e) + e;
}
function Ve(e, t) {
	return Math.floor(Be(e, t + 1));
}
function He(e) {
	return e[Math.floor(Math.random() * e.length)];
}
var Ue = [
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
], We = {
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
function Ge(e, t, n) {
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
		ip: n === 0 ? `10.${Ve(1, 254)}.${Ve(1, 254)}.${Ve(1, 254)}` : void 0,
		status: He([
			"up",
			"up",
			"up",
			"down",
			"unknown"
		]),
		speed: He([
			100,
			1e3,
			1e4,
			25e3
		]),
		trafficIn: Be(0, 900),
		trafficOut: Be(0, 500),
		errors: Math.random() > .85 ? Ve(1, 50) : 0,
		discards: Math.random() > .9 ? Ve(1, 20) : 0
	}));
}
function Ke(e, t, n, r) {
	let i = `dev-${ze()}`, a = He(We[e]), o = He(Ue);
	return {
		device: {
			id: i,
			source: He([
				"zabbix",
				"prtg",
				"manual",
				"openNMS"
			]),
			externalId: `ext-${ze()}`,
			hostname: `${e.slice(0, 3)}-${t.slice(-2)}-${String(r).padStart(2, "0")}`,
			ip: `10.${Ve(1, 4)}.${Ve(1, 254)}.${Ve(1, 254)}`,
			normalizedType: e,
			vendor: a,
			model: `${a}-Model-${Ve(100, 999)}`,
			status: o,
			metrics: {
				cpu: Be(5, 98),
				memory: Be(20, 95),
				disk: Be(10, 90),
				networkIn: Be(10, 950),
				networkOut: Be(5, 500),
				temperature: Be(35, 78)
			},
			siteId: n,
			firstSeenAt: (/* @__PURE__ */ new Date(Date.now() - Be(0, 365) * 864e5)).toISOString(),
			lastSeenAt: (/* @__PURE__ */ new Date()).toISOString(),
			syncState: "active"
		},
		interfaces: Ge(i, e, e === "switch" ? 8 : e === "router" ? 6 : e === "firewall" ? 4 : 2)
	};
}
function qe() {
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
					let { device: o, interfaces: s } = Ke(e, l, a.id, r);
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
						id: `link-${ze()}`,
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
				id: `link-${ze()}`,
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
		id: `link-${ze()}`,
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
		let { device: n } = Ke(e, "unmapped", "site-seoul", t);
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
var R = te("editor", () => {
	let e = new Re({
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
		let e = qe();
		r.value = new Map(e.devices.map((e) => [e.id, e])), a.value = new Map(e.spaces.map((e) => [e.id, e])), o.value = new Map(e.deviceMappings.map((e) => [e.id, e])), s.value = new Map(e.links.map((e) => [e.id, e])), c.value = new Map(e.interfaces.map((e) => [e.id, e])), l.value = e.unmappedDevices;
	}
	function O(e) {
		r.value = new Map((e.devices ?? []).map((e) => [e.id, e])), a.value = new Map((e.spaces ?? []).map((e) => [e.id, e])), o.value = new Map((e.deviceMappings ?? []).map((e) => [e.id, e])), s.value = new Map((e.links ?? []).map((e) => [e.id, e])), c.value = new Map((e.interfaces ?? []).map((e) => [e.id, e])), l.value = [...e.unmappedDevices ?? []], u.value = new Map((e.virtualNodes ?? []).map((e) => [e.id, e]));
	}
	function k(e, t, n) {
		let i = r.value.get(e);
		i && (i.status = t, n && Object.assign(i.metrics ??= {}, n));
	}
	function A(e) {
		e.forEach((e) => {
			r.value.has(e.id) || l.value.push(e), r.value.set(e.id, e);
		});
	}
	function j(e) {
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
		return r.value.set(t, n), l.value.push(n), fe("device.add", `Device added (manual): ${e.hostname}`), n;
	}
	function M(e) {
		_("space:create", {
			id: e.id,
			spaceId: e.id
		}) && (a.value.set(e.id, e), v("space:create", {
			id: e.id,
			type: "space"
		}));
	}
	function N(e, t) {
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
	function ee(e) {
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
	function te(e, t, n, r) {
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
	function P(e) {
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
	function F(e, t) {
		if (!_("annotation:update", { id: e })) return;
		let n = [...o.value.values()].find((t) => t.rawDeviceId === e);
		n && Object.assign(n, t), v("annotation:update", {
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
	function ie(e) {
		_("topology:deleteLink", { id: e }) && (s.value.delete(e), v("topology:deleteLink", {
			id: e,
			type: "link"
		}));
	}
	function ae(e) {
		return [...o.value.values()].find((t) => t.rawDeviceId === e);
	}
	function oe(e) {
		let t = r.value.get(e);
		return t ? be(t) : void 0;
	}
	function se(e) {
		_("virtualNode:create", { id: e.id }) && (u.value.set(e.id, e), v("virtualNode:create", {
			id: e.id,
			type: "virtualNode"
		}));
	}
	function ce(e) {
		_("virtualNode:delete", { id: e }) && (u.value.delete(e), v("virtualNode:delete", {
			id: e,
			type: "virtualNode"
		}));
	}
	function le(e, t) {
		if (!_("virtualNode:update", { id: e })) return;
		let n = u.value.get(e);
		n && Object.assign(n, t), v("virtualNode:update", {
			id: e,
			type: "virtualNode"
		});
	}
	function ue(e) {
		d.value.unshift(e), d.value.length > 20 && d.value.pop();
	}
	function de(e) {
		let t = d.value.findIndex((t) => t.id === e);
		t >= 0 && d.value.splice(t, 1);
	}
	function fe(e, t) {
		f.value.unshift({
			id: Math.random().toString(36).slice(2),
			type: e,
			msg: t,
			ts: (/* @__PURE__ */ new Date()).toLocaleTimeString()
		}), f.value.length > 100 && f.value.pop();
	}
	function pe(e) {
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
			let u = `site-${me(e)}-${s}`, p = [...t.entries()].map(([e, t]) => {
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
				let h = `${u}-zone-${me(t)}-${m}`, g = v + f / 2;
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
					color: he(m)
				};
				a.value.set(_.id, _), i.push(_);
				let y = g - f / 2 + 4 / 2;
				s.forEach(({ rackName: t, devs: s, w: u, d: f, rows: p }, m) => {
					let g = `${h}-rack-${me(t)}-${m}`, _ = y + u / 2;
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
		}), fe("import", `Imported ${c.length} devices, ${i.length} spaces, ${u.length} links`), {
			devices: c.length,
			spaces: i.length,
			links: u.length
		};
	}
	function me(e) {
		return e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "x";
	}
	function he(e) {
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
	function ge() {
		return {
			version: "2.0",
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			spaces: [...a.value.values()],
			deviceMappings: [...o.value.values()],
			manualLinks: [...s.value.values()].filter((e) => e.source === "manual")
		};
	}
	function _e(e) {
		if (!_("import")) return;
		let t = ve(e);
		t.spaces.forEach((e) => a.value.set(e.id, e)), t.deviceMappings.forEach((e) => o.value.set(e.id, e)), t.manualLinks.forEach((e) => s.value.set(e.id, e)), l.value = l.value.filter((e) => !t.deviceMappings.find((t) => t.rawDeviceId === e.id && t.mappingStatus === "mapped"));
	}
	function ve(e) {
		return ye(e);
	}
	function ye(e) {
		if (Array.isArray(e)) return e.map(ye);
		if (!e || typeof e != "object") return e;
		let t = {};
		return Object.entries(e).forEach(([e, n]) => {
			e === "__proto__" || e === "constructor" || e === "prototype" || (t[e] = ye(n));
		}), t;
	}
	function be(e) {
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
		upsertDevices: A,
		addManualDevice: j,
		importTopology: pe,
		addSpace: M,
		updateSpace: N,
		archiveSpace: ee,
		mapDevice: te,
		unmapDevice: P,
		updateAnnotation: F,
		addLink: ne,
		updateLink: re,
		removeLink: ie,
		getMappingByDeviceId: ae,
		getDevice: oe,
		virtualNodes: u,
		savedViews: d,
		changeLog: f,
		addVirtualNode: se,
		removeVirtualNode: ce,
		updateVirtualNode: le,
		addSavedView: ue,
		removeSavedView: de,
		logChange: fe,
		exportSnapshot: ge,
		importSnapshot: _e
	};
}), z = te("ui", () => {
	let e = S("view"), t = S(null), n = S(null), r = S(!1), a = S(null), o = S(new Set([
		"physical",
		"logical",
		"service_dependency",
		"traffic_flow",
		"security_path",
		"manual",
		"inferred"
	])), s = S({ ...Le }), c = S({
		visible: !1,
		x: 0,
		y: 0,
		sourceDeviceId: "",
		targetDeviceId: ""
	}), l = S(!0), u = S(!1), d = S(null), f = S(!1), p = S(!1), m = S(!1), h = S(!1), g = S(!1), _ = S(!0), v = S(!0), y = S(!0), b = S(!0), x = S(!1), C = S(!1), w = S(T());
	function T() {
		let e = parseFloat(localStorage.getItem("topospace.fontScale") ?? "");
		return Number.isFinite(e) && e >= .8 && e <= 1.6 ? e : 1.1;
	}
	function E(e) {
		w.value = Math.max(.8, Math.min(1.6, Math.round(e * 100) / 100)), localStorage.setItem("topospace.fontScale", String(w.value));
	}
	let D = S(-1), O = S(!1), k = S(!1), A = S(null), j = S([]);
	function M(e, t = "info") {
		let n = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
		j.value.push({
			id: n,
			message: e,
			type: t,
			timestamp: Date.now()
		}), j.value.length > 6 && j.value.shift(), setTimeout(() => N(n), 5e3);
	}
	function N(e) {
		let t = j.value.findIndex((t) => t.id === e);
		t >= 0 && j.value.splice(t, 1);
	}
	let ee = S({
		visible: !1,
		x: 0,
		y: 0,
		deviceId: ""
	}), te = i(() => t.value?.type === "device" ? t.value.id : null), P = i(() => t.value?.type === "space" ? t.value.id : null), F = i(() => t.value?.type === "link" ? t.value.id : null);
	function ne(t) {
		e.value = t, R().setEditorMode(t), t === "view" && (r.value = !1, a.value = null);
	}
	function re(e) {
		t.value = e, p.value = e?.type === "link";
	}
	function ie() {
		if (e.value !== "edit") {
			r.value = !1, a.value = null;
			return;
		}
		r.value = !r.value, r.value || (a.value = null);
	}
	function ae(e) {
		a.value = e;
	}
	function oe() {
		a.value = null;
	}
	function se(e, t, n, r) {
		c.value = {
			visible: !0,
			x: e,
			y: t,
			sourceDeviceId: n,
			targetDeviceId: r
		};
	}
	function ce() {
		c.value.visible = !1, a.value = null;
	}
	function le(e) {
		o.value.has(e) ? o.value.delete(e) : o.value.add(e);
	}
	function ue(e) {
		Object.assign(s.value, e);
	}
	function de() {
		s.value = { ...Le };
	}
	function fe(e, t, n) {
		ee.value = {
			visible: !0,
			x: e,
			y: t,
			deviceId: n
		};
	}
	function pe() {
		ee.value.visible = !1;
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
		fontScale: w,
		setFontScale: E,
		timelineFrameIdx: D,
		timelineRecording: O,
		wsConnected: k,
		blastSourceId: A,
		tooltip: ee,
		selectedDeviceId: te,
		selectedSpaceId: P,
		selectedLinkId: F,
		setMode: ne,
		select: re,
		toggleLinkTool: ie,
		startLinkFrom: ae,
		cancelLinkDraft: oe,
		showContextMenu: se,
		hideContextMenu: ce,
		toggleLinkType: le,
		setFilter: ue,
		resetFilter: de,
		showTooltipAt: fe,
		hideTooltip: pe,
		toasts: j,
		addToast: M,
		removeToast: N
	};
});
//#endregion
//#region src/composables/useWebSocketSim.ts
function Je() {
	let e = R(), t = z(), n = S(!1), r = S([]), i = [];
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
			o !== i.status && (e.updateLink(r, { status: o }), o === "down" ? (t.addToast(`Link DOWN (${i.type})`, "critical"), a(`Link DOWN: ${i.type}`)) : t.addToast(`Link UP (${i.type})`, "success"));
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
var Ye = ["onMouseenter", "onClick"], Xe = { class: "menu-label" }, Ze = {
	key: 0,
	class: "menu-sep"
}, Qe = {
	key: 1,
	class: "menu-header"
}, $e = ["disabled", "onClick"], et = { class: "check-cell" }, tt = { class: "item-label" }, nt = { class: "shortcut" }, rt = {
	key: 0,
	class: "status-pill on"
}, it = {
	key: 1,
	class: "status-pill off"
}, at = /* @__PURE__ */ p({
	__name: "AppMenuBar",
	setup(t) {
		let r = z(), a = R(), o = Je(), u = S(null), d = i(() => r.wsConnected), p = [
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
		function j(e) {
			e.disabled?.() || (e.action?.(), ee());
		}
		function ee() {
			u.value = null;
		}
		function te(e) {
			e.target.closest(".menu-root") || ee();
		}
		return y(() => document.addEventListener("mousedown", te)), v(() => document.removeEventListener("mousedown", te)), (t, r) => (b(), c("div", {
			class: "menubar",
			onKeydown: M(ee, ["escape"])
		}, [
			r[1] ||= l("span", { class: "brand" }, "Topospace", -1),
			(b(!0), c(e, null, C(D.value, (t) => (b(), c("div", {
				key: t.label,
				class: g(["menu-root", { open: u.value === t.label }]),
				onMouseenter: (e) => k(t.label),
				onClick: (e) => O(t.label)
			}, [l("span", Xe, w(t.label), 1), f(n, { name: "menu-fade" }, {
				default: A(() => [u.value === t.label ? (b(), c("div", {
					key: 0,
					class: "menu-dropdown",
					onClick: r[0] ||= N(() => {}, ["stop"])
				}, [(b(!0), c(e, null, C(t.items, (t, n) => (b(), c(e, { key: n }, [t.separator ? (b(), c("div", Ze)) : t.header ? (b(), c("div", Qe, w(t.label), 1)) : (b(), c("button", {
					key: 2,
					class: g(["menu-item", {
						checked: t.checked?.(),
						disabled: t.disabled?.()
					}]),
					disabled: t.disabled?.(),
					onClick: N((e) => j(t), ["stop"])
				}, [
					l("span", et, w(t.checked?.() ? "✓" : ""), 1),
					l("span", tt, w(t.label), 1),
					l("span", nt, w(t.shortcut ?? ""), 1)
				], 10, $e))], 64))), 128))])) : s("", !0)]),
				_: 2
			}, 1024)], 42, Ye))), 128)),
			r[2] ||= l("div", { class: "spacer" }, null, -1),
			d.value ? (b(), c("span", rt, "Live")) : (b(), c("span", it, "Offline"))
		], 32));
	}
}), B = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, ot = /* @__PURE__ */ B(at, [["__scopeId", "data-v-a2607cbd"]]), st = { class: "toolbar" }, ct = { class: "search-wrap" }, lt = { class: "chip critical" }, ut = { class: "chip warning" }, dt = { class: "chip total" }, ft = { class: "mode-switch" }, pt = ["disabled"], mt = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "TopToolbar",
	setup(e) {
		let t = R(), n = z(), r = i({
			get: () => n.filter.status[0] ?? "",
			set: (e) => n.setFilter({ status: e ? [e] : [] })
		});
		return (e, i) => (b(), c("header", st, [
			l("div", ct, [j(l("input", {
				"onUpdate:modelValue": i[0] ||= (e) => T(n).filter.search = e,
				placeholder: "Search name / IP",
				class: "search",
				onKeydown: i[1] ||= M((e) => T(n).resetFilter(), ["escape"])
			}, null, 544), [[O, T(n).filter.search]]), T(n).filter.search ? (b(), c("span", {
				key: 0,
				class: "clr",
				onClick: i[2] ||= (e) => T(n).filter.search = ""
			}, "Clear")) : s("", !0)]),
			j(l("select", {
				"onUpdate:modelValue": i[3] ||= (e) => r.value = e,
				class: "sel"
			}, [...i[8] ||= [u("<option value=\"\" data-v-b74254c0>All status</option><option value=\"critical\" data-v-b74254c0>Critical</option><option value=\"warning\" data-v-b74254c0>Warning</option><option value=\"normal\" data-v-b74254c0>Normal</option><option value=\"offline\" data-v-b74254c0>Offline</option><option value=\"maintenance\" data-v-b74254c0>Maintenance</option>", 6)]], 512), [[D, r.value]]),
			l("div", lt, [i[9] ||= d("Critical ", -1), l("b", null, w(T(t).criticalCount), 1)]),
			l("div", ut, [i[10] ||= d("Warning ", -1), l("b", null, w(T(t).warningCount), 1)]),
			l("div", dt, [i[11] ||= d("Total ", -1), l("b", null, w(T(t).devices.size), 1)]),
			i[12] ||= l("div", { class: "spacer" }, null, -1),
			l("div", ft, [l("button", {
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
			}, " Connect ", 10, pt),
			l("button", {
				class: g(["btn", T(n).showHelp ? "btn-on" : ""]),
				onClick: i[7] ||= (e) => T(n).showHelp = !T(n).showHelp
			}, "Help", 2)
		]));
	}
}), [["__scopeId", "data-v-b74254c0"]]), ht = {
	normal: "#22c55e",
	warning: "#eab308",
	critical: "#ef4444",
	offline: "#374151",
	unknown: "#6b7280",
	maintenance: "#3b82f6",
	acknowledged: "#f59e0b",
	stale: "#78716c"
}, gt = Object.fromEntries(Object.entries(ht).map(([e, t]) => [e, new P.Color(t)])), _t = {
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
}, vt = {
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
}, yt = {
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
}, bt = {
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
}, xt = {
	normal: "Normal",
	warning: "Warning",
	critical: "Critical",
	offline: "Offline",
	unknown: "Unknown",
	maintenance: "Maintenance",
	acknowledged: "Acknowledged",
	stale: "Stale"
}, St = {
	key: 0,
	class: "panel"
}, Ct = { class: "panel-head" }, wt = { class: "rack-name" }, Tt = { class: "summary" }, Et = { class: "chip c" }, Dt = { class: "chip w" }, Ot = { class: "chip n" }, kt = { class: "server-list" }, At = ["onClick", "onMouseenter"], jt = { class: "srv-info" }, Mt = { class: "srv-name" }, Nt = { class: "srv-ip" }, Pt = {
	key: 0,
	class: "srv-metrics"
}, Ft = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "RackServerListPanel",
	setup(t) {
		let n = R(), r = z(), a = i(() => r.selectedRackForList ? n.spaces.get(r.selectedRackForList) ?? null : null), o = i(() => r.selectedRackForList ? n.devicesBySpace.get(r.selectedRackForList) ?? [] : []), u = i(() => [...o.value].sort((e, t) => {
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
		return (t, n) => a.value ? (b(), c("aside", St, [
			l("div", Ct, [
				l("span", wt, w(a.value.name), 1),
				l("div", Tt, [
					l("span", Et, "C " + w(d.value), 1),
					l("span", Dt, "W " + w(f.value), 1),
					l("span", Ot, "N " + w(p.value), 1)
				]),
				l("button", {
					class: "close-btn",
					onClick: h,
					title: "Close"
				}, "✕")
			]),
			n[1] ||= l("div", { class: "hint" }, "Click a device to open details · hover to highlight in 3D.", -1),
			l("div", kt, [(b(!0), c(e, null, C(u.value, (e) => (b(), c("div", {
				key: e.id,
				class: g(["srv-row", [e.status, { active: T(r).selectedDeviceId === e.id }]]),
				onClick: (t) => m(e.id),
				onMouseenter: (t) => T(r).hoveredId = e.id,
				onMouseleave: n[0] ||= (e) => T(r).hoveredId = null
			}, [
				l("span", {
					class: "dot",
					style: _({ background: T(ht)[e.status ?? "unknown"] })
				}, null, 4),
				l("span", {
					class: "type-tag",
					style: _({
						color: T(_t)[e.normalizedType ?? "unknown"],
						borderColor: T(_t)[e.normalizedType ?? "unknown"]
					})
				}, w(T(yt)[e.normalizedType ?? "unknown"]), 5),
				l("div", jt, [l("div", Mt, w(e.hostname ?? e.id), 1), l("div", Nt, w(e.ip ?? "—"), 1)]),
				e.metrics ? (b(), c("div", Pt, [l("span", { class: g({ hot: (e.metrics.cpu ?? 0) > 85 }) }, "C" + w((e.metrics.cpu ?? 0).toFixed(0)) + "%", 3), l("span", { class: g({ hot: (e.metrics.memory ?? 0) > 85 }) }, "M" + w((e.metrics.memory ?? 0).toFixed(0)) + "%", 3)])) : s("", !0)
			], 42, At))), 128))])
		])) : s("", !0);
	}
}), [["__scopeId", "data-v-7a7802f4"]]), It = { class: "panel" }, Lt = { class: "panel-head" }, Rt = { class: "head-actions" }, zt = { class: "tree-body" }, Bt = ["onClick"], Vt = ["onClick"], Ht = { class: "node-name" }, Ut = ["onClick"], Wt = ["onClick"], Gt = ["onClick"], Kt = ["onClick"], qt = { class: "node-name" }, Jt = { class: "dev-count" }, Yt = ["onClick"], Xt = ["onClick"], Zt = ["onClick"], Qt = { class: "node-name" }, $t = { class: "dev-count" }, en = ["onClick"], tn = ["onClick"], nn = ["onClick"], rn = ["onClick"], an = {
	key: 0,
	class: "site-node"
}, on = ["onClick"], sn = { class: "node-name" }, cn = ["onClick"], ln = {
	key: 0,
	class: "add-modal"
}, un = {
	key: 0,
	class: "add-modal"
}, dn = { class: "add-btns" }, fn = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "SpaceTreePanel",
	setup(t) {
		let r = R(), a = z(), o = S(/* @__PURE__ */ new Set()), u = S(!1), d = S(null), p = S("zone"), m = S("site"), h = S(""), _ = S(null), v = S(""), y = i(() => [...r.spaces.values()].filter((e) => e.type === "site" && !e.archived)), x = i(() => [...r.spaces.values()].filter((e) => [
			"custom_group",
			"security_zone",
			"service",
			"external",
			"cloud"
		].includes(e.type) && !e.archived));
		function E(e, t) {
			return [...r.spaces.values()].filter((n) => n.parentId === e && n.type === t && !n.archived);
		}
		function k(e) {
			return r.devicesBySpace.get(e)?.length ?? 0;
		}
		function ee(e) {
			return (r.devicesBySpace.get(e) ?? []).some((e) => e.status === "critical" || e.status === "warning");
		}
		function te(e) {
			let t = E(e, "zone").flatMap((e) => E(e.id, "rack")).flatMap((e) => r.devicesBySpace.get(e.id) ?? []);
			return t.some((e) => e.status === "critical") ? "critical" : t.some((e) => e.status === "warning") ? "warning" : "normal";
		}
		function P(e) {
			let t = te(e);
			return t === "critical" ? "CRIT" : t === "warning" ? "WARN" : "OK";
		}
		function F(e) {
			o.value.has(e) ? o.value.delete(e) : o.value.add(e);
		}
		function ne(e) {
			a.select({
				type: "space",
				id: e.id
			});
		}
		function re(e, t) {
			a.mode === "edit" && (d.value = e, p.value = t, m.value = t, h.value = "", u.value = !0);
		}
		function ie() {
			if (a.mode !== "edit" || !h.value.trim()) return;
			let e = `space-${Date.now()}`, t = (d.value ? r.spaces.get(d.value) : null)?.position ?? {
				x: 0,
				y: 0,
				z: 0
			};
			r.addSpace({
				id: e,
				name: h.value.trim(),
				kind: [
					"site",
					"zone",
					"rack"
				].includes(m.value) ? "physical" : "logical",
				type: m.value,
				parentId: d.value ?? void 0,
				source: "manual",
				position: {
					x: t.x + Math.random() * 10 - 5,
					y: 0,
					z: t.z + Math.random() * 10 - 5
				},
				size: m.value === "rack" ? {
					width: 1,
					height: 3,
					depth: .6
				} : m.value === "zone" ? {
					width: 20,
					height: .1,
					depth: 18
				} : {
					width: 50,
					height: .1,
					depth: 40
				},
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}), r.logChange("space.create", `Space added: ${h.value} (${m.value})`), ae();
		}
		function ae() {
			u.value = !1, d.value = null, h.value = "";
		}
		function oe(e) {
			a.mode === "edit" && (_.value = e, v.value = e.name);
		}
		function se() {
			a.mode === "edit" && (_.value &&= (r.updateSpace(_.value.id, { name: v.value }), r.logChange("space.update", `Space renamed: ${v.value}`), null));
		}
		function ce(e) {
			a.mode === "edit" && confirm("Archive this space?") && (r.archiveSpace(e), r.logChange("space.archive", `Space archived: ${e}`));
		}
		return (t, r) => (b(), c("aside", It, [
			l("div", Lt, [r[7] ||= l("span", null, "Spaces", -1), l("div", Rt, [T(a).mode === "edit" ? (b(), c("button", {
				key: 0,
				class: "text-btn",
				title: "Add space",
				onClick: r[0] ||= (e) => u.value = !0
			}, " Add ")) : s("", !0), l("button", {
				class: "text-btn",
				onClick: r[1] ||= (e) => T(a).showSpaceTree = !1
			}, " Close ")])]),
			l("div", zt, [
				(b(!0), c(e, null, C(y.value, (t) => (b(), c("div", {
					key: t.id,
					class: "site-node"
				}, [l("div", {
					class: "tree-row site",
					onClick: (e) => ne(t)
				}, [
					l("span", {
						class: "arrow",
						onClick: N((e) => F(t.id), ["stop"])
					}, w(o.value.has(t.id) ? "▾" : "▸"), 9, Vt),
					r[8] ||= l("span", { class: "kind-tag" }, "SITE", -1),
					l("span", Ht, w(t.name), 1),
					l("span", { class: g(["node-badge", te(t.id)]) }, w(P(t.id)), 3),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "row-btn",
						onClick: N((e) => oe(t), ["stop"]),
						title: "Rename"
					}, " Edit ", 8, Ut)) : s("", !0),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 1,
						class: "row-btn del",
						onClick: N((e) => ce(t.id), ["stop"]),
						title: "Archive"
					}, " Del ", 8, Wt)) : s("", !0)
				], 8, Bt), o.value.has(t.id) ? (b(), c(e, { key: 0 }, [(b(!0), c(e, null, C(E(t.id, "zone"), (t) => (b(), c("div", {
					key: t.id,
					class: "zone-node"
				}, [l("div", {
					class: "tree-row zone",
					onClick: (e) => ne(t)
				}, [
					l("span", {
						class: "arrow",
						onClick: N((e) => F(t.id), ["stop"])
					}, w(o.value.has(t.id) ? "▾" : "▸"), 9, Kt),
					r[9] ||= l("span", { class: "kind-tag" }, "ZONE", -1),
					l("span", qt, w(t.name), 1),
					l("span", Jt, w(k(t.id)), 1),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "row-btn",
						onClick: N((e) => oe(t), ["stop"])
					}, " Edit ", 8, Yt)) : s("", !0),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 1,
						class: "row-btn del",
						onClick: N((e) => ce(t.id), ["stop"])
					}, " Del ", 8, Xt)) : s("", !0)
				], 8, Gt), o.value.has(t.id) ? (b(), c(e, { key: 0 }, [(b(!0), c(e, null, C(E(t.id, "rack"), (e) => (b(), c("div", { key: e.id }, [l("div", {
					class: g(["tree-row rack", { "has-issue": ee(e.id) }]),
					onClick: (t) => ne(e)
				}, [
					r[10] ||= l("span", { class: "arrow-spacer" }, null, -1),
					r[11] ||= l("span", { class: "kind-tag" }, "RACK", -1),
					l("span", Qt, w(e.name), 1),
					l("span", $t, w(k(e.id)), 1),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "row-btn",
						onClick: N((t) => oe(e), ["stop"])
					}, " Edit ", 8, en)) : s("", !0),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 1,
						class: "row-btn del",
						onClick: N((t) => ce(e.id), ["stop"])
					}, " Del ", 8, tn)) : s("", !0)
				], 10, Zt)]))), 128)), T(a).mode === "edit" ? (b(), c("div", {
					key: 0,
					class: "add-child-btn",
					onClick: (e) => re(t.id, "rack")
				}, " + Add rack ", 8, nn)) : s("", !0)], 64)) : s("", !0)]))), 128)), T(a).mode === "edit" ? (b(), c("div", {
					key: 0,
					class: "add-child-btn",
					onClick: (e) => re(t.id, "zone")
				}, " + Add zone ", 8, rn)) : s("", !0)], 64)) : s("", !0)]))), 128)),
				x.value.length ? (b(), c("div", an, [r[14] ||= l("div", { class: "tree-row site" }, [l("span", { class: "kind-tag" }, "GRP"), l("span", {
					class: "node-name",
					style: { color: "#94a3b8" }
				}, "Logical Groups")], -1), (b(!0), c(e, null, C(x.value, (e) => (b(), c("div", {
					key: e.id,
					class: "tree-row zone",
					onClick: (t) => ne(e)
				}, [
					r[12] ||= l("span", { class: "arrow-spacer" }, null, -1),
					r[13] ||= l("span", { class: "kind-tag" }, "GRP", -1),
					l("span", sn, w(e.name), 1),
					T(a).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "row-btn del",
						onClick: N((t) => ce(e.id), ["stop"])
					}, " Del ", 8, cn)) : s("", !0)
				], 8, on))), 128))])) : s("", !0),
				T(a).mode === "edit" ? (b(), c("div", {
					key: 1,
					class: "add-child-btn root",
					onClick: r[2] ||= (e) => u.value = !0
				}, " + Add site / group ")) : s("", !0)
			]),
			f(n, { name: "fade" }, {
				default: A(() => [T(a).mode === "edit" && (u.value || d.value) ? (b(), c("div", ln, [
					r[16] ||= l("div", { class: "add-title" }, "Add Space", -1),
					j(l("select", {
						"onUpdate:modelValue": r[3] ||= (e) => m.value = e,
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
					]], 512), [[D, m.value]]),
					j(l("input", {
						"onUpdate:modelValue": r[4] ||= (e) => h.value = e,
						class: "add-input",
						placeholder: "Name",
						onKeydown: M(ie, ["enter"])
					}, null, 544), [[O, h.value]]),
					l("div", { class: "add-btns" }, [l("button", {
						class: "add-ok",
						onClick: ie
					}, "Add"), l("button", {
						class: "add-cancel",
						onClick: ae
					}, "Cancel")])
				])) : s("", !0)]),
				_: 1
			}),
			f(n, { name: "fade" }, {
				default: A(() => [T(a).mode === "edit" && _.value ? (b(), c("div", un, [
					r[17] ||= l("div", { class: "add-title" }, "Rename", -1),
					j(l("input", {
						"onUpdate:modelValue": r[5] ||= (e) => v.value = e,
						class: "add-input",
						onKeydown: M(se, ["enter"])
					}, null, 544), [[O, v.value]]),
					l("div", dn, [l("button", {
						class: "add-ok",
						onClick: se
					}, "Save"), l("button", {
						class: "add-cancel",
						onClick: r[6] ||= (e) => _.value = null
					}, " Cancel ")])
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-5cf3a5fa"]]), pn = { class: "panel" }, mn = { class: "panel-head" }, hn = {
	key: 0,
	class: "add-form"
}, gn = { class: "add-row" }, _n = ["value"], vn = {
	key: 0,
	class: "empty"
}, yn = { class: "device-list" }, bn = ["draggable", "onDragstart"], xn = { class: "dev-info" }, Sn = { class: "dev-name" }, Cn = { class: "dev-ip" }, wn = { class: "dev-source" }, Tn = ["onClick"], En = { class: "panel-footer" }, Dn = { class: "hint" }, On = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "UnmappedPanel",
	setup(t) {
		let r = R(), i = z(), a = S(null), o = [
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
		return (t, x) => (b(), c("aside", pn, [
			l("div", mn, [
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
				default: A(() => [T(i).mode === "edit" && u.value ? (b(), c("div", hn, [
					j(l("input", {
						"onUpdate:modelValue": x[2] ||= (e) => p.hostname = e,
						class: "add-input",
						placeholder: "Hostname *",
						onKeydown: M(m, ["enter"])
					}, null, 544), [[O, p.hostname]]),
					j(l("input", {
						"onUpdate:modelValue": x[3] ||= (e) => p.ip = e,
						class: "add-input",
						placeholder: "IP address",
						onKeydown: M(m, ["enter"])
					}, null, 544), [[O, p.ip]]),
					l("div", gn, [j(l("select", {
						"onUpdate:modelValue": x[4] ||= (e) => p.type = e,
						class: "add-sel"
					}, [(b(), c(e, null, C(o, (e) => l("option", {
						key: e,
						value: e
					}, w(T(bt)[e]), 9, _n)), 64))], 512), [[D, p.type]]), j(l("input", {
						"onUpdate:modelValue": x[5] ||= (e) => p.vendor = e,
						class: "add-input",
						placeholder: "Vendor"
					}, null, 512), [[O, p.vendor]])]),
					l("button", {
						class: "add-ok",
						onClick: m
					}, "Add device")
				])) : s("", !0)]),
				_: 1
			}),
			T(r).unmappedDevices.length === 0 && !u.value ? (b(), c("div", vn, " All devices are placed. ")) : s("", !0),
			l("div", yn, [(b(!0), c(e, null, C(T(r).unmappedDevices, (e) => (b(), c("div", {
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
						color: T(_t)[e.normalizedType ?? "unknown"],
						borderColor: T(_t)[e.normalizedType ?? "unknown"]
					})
				}, w(T(yt)[e.normalizedType ?? "unknown"]), 5),
				l("div", xn, [l("div", Sn, w(e.hostname ?? e.id), 1), l("div", Cn, w(e.ip ?? "—"), 1)]),
				l("span", wn, w(e.source), 1),
				T(i).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "ignore-btn",
					onClick: N((t) => y(e.id), ["stop"]),
					title: "Ignore"
				}, "✕", 8, Tn)) : s("", !0)
			], 42, bn))), 128))]),
			l("div", En, [l("span", Dn, w(T(i).mode === "edit" ? "Drag a device onto the 3D scene to place it." : "Switch to Edit mode to place devices."), 1)])
		]));
	}
}), [["__scopeId", "data-v-d9e5c607"]]), kn = {
	key: 0,
	class: "panel"
}, An = { class: "panel-head" }, jn = { class: "dev-title" }, Mn = { class: "dev-name" }, Nn = { class: "dev-ip" }, Pn = { class: "panel-body" }, Fn = { class: "section" }, In = { class: "info-grid" }, Ln = { class: "info-v" }, Rn = { class: "info-v" }, zn = { class: "info-v" }, Bn = { class: "info-v" }, Vn = { class: "info-v" }, Hn = {
	key: 0,
	class: "section"
}, Un = { class: "m-label" }, Wn = { class: "m-bar-wrap" }, Gn = { class: "section" }, Kn = { class: "if-summary" }, qn = { class: "if-up" }, Jn = { class: "if-dn" }, Yn = { class: "chevron" }, Xn = {
	key: 0,
	class: "iface-list"
}, Zn = { class: "if-name" }, Qn = { class: "if-alias" }, $n = { class: "if-ip" }, er = { class: "if-speed" }, tr = { class: "if-traffic" }, nr = {
	key: 0,
	class: "if-err"
}, rr = {
	key: 1,
	class: "section"
}, ir = { class: "anno-form" }, ar = {
	key: 2,
	class: "section actions"
}, or = { class: "action-btns" }, sr = {
	key: 0,
	class: "action-log"
}, cr = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "DeviceDetailPanel",
	setup(t) {
		let n = R(), r = z(), a = S(!1), o = S(""), u = S(""), f = S(""), p = S(""), m = i(() => r.selectedDeviceId ? n.devices.get(r.selectedDeviceId) ?? null : null), h = i(() => m.value ? n.getMappingByDeviceId(m.value.id) ?? null : null), v = i(() => m.value ? n.interfacesByDevice.get(m.value.id) ?? [] : []), y = i(() => v.value.filter((e) => e.status === "up").length), x = i(() => v.value.filter((e) => e.status === "down").length);
		k(h, (e) => {
			u.value = e?.displayName ?? "", f.value = e?.memo ?? "", p.value = e?.tags?.join(", ") ?? "";
		}, { immediate: !0 });
		let E = i(() => {
			let e = m.value?.metrics;
			return e ? [
				{
					key: "cpu",
					label: "CPU",
					pct: e.cpu ?? 0,
					display: `${(e.cpu ?? 0).toFixed(1)}%`,
					color: D(e.cpu ?? 0)
				},
				{
					key: "mem",
					label: "Memory",
					pct: e.memory ?? 0,
					display: `${(e.memory ?? 0).toFixed(1)}%`,
					color: D(e.memory ?? 0)
				},
				{
					key: "disk",
					label: "Disk",
					pct: e.disk ?? 0,
					display: `${(e.disk ?? 0).toFixed(1)}%`,
					color: D(e.disk ?? 0)
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
					color: D(((e.temperature ?? 40) - 20) / 60 * 100)
				}
			] : [];
		});
		function D(e) {
			return e >= 90 ? "#ef4444" : e >= 70 ? "#eab308" : "#22c55e";
		}
		function A(e) {
			return e ? e >= 1e3 ? `${(e / 1e3).toFixed(1)}G` : `${e.toFixed(0)}M` : "0";
		}
		function M() {
			m.value && n.updateDeviceStatus(m.value.id, "offline"), o.value = `[${F()}] Isolated`;
		}
		function N() {
			m.value && n.updateDeviceStatus(m.value.id, "normal"), o.value = `[${F()}] Recovered`;
		}
		function ee() {
			m.value && n.updateDeviceStatus(m.value.id, "acknowledged"), o.value = `[${F()}] Acknowledged`;
		}
		function te() {
			m.value && (n.updateAnnotation(m.value.id, {
				displayName: u.value || void 0,
				memo: f.value || void 0,
				tags: p.value ? p.value.split(",").map((e) => e.trim()).filter(Boolean) : []
			}), o.value = `[${F()}] Annotation saved`);
		}
		function P() {
			m.value && (n.unmapDevice(m.value.id), r.select(null));
		}
		function F() {
			return (/* @__PURE__ */ new Date()).toLocaleTimeString();
		}
		return (t, n) => m.value ? (b(), c("aside", kn, [l("div", An, [l("div", jn, [
			l("span", {
				class: "type-tag",
				style: _({
					color: T(_t)[m.value.normalizedType ?? "unknown"],
					borderColor: T(_t)[m.value.normalizedType ?? "unknown"]
				})
			}, w(T(yt)[m.value.normalizedType ?? "unknown"]), 5),
			l("div", null, [l("div", Mn, w(h.value?.displayName ?? m.value.hostname), 1), l("div", Nn, w(m.value.ip), 1)]),
			l("span", { class: g(["status-badge", m.value.status]) }, w(T(xt)[m.value.status ?? "unknown"]), 3),
			l("button", {
				class: "close-btn",
				onClick: n[0] ||= (e) => T(r).select(null),
				title: "Close"
			}, "✕")
		])]), l("div", Pn, [
			l("section", Fn, [n[15] ||= l("div", { class: "sec-title" }, "Info", -1), l("div", In, [
				n[5] ||= l("span", { class: "info-k" }, "Vendor", -1),
				n[6] ||= d(),
				l("span", Ln, w(m.value.vendor ?? "—"), 1),
				n[7] ||= l("span", { class: "info-k" }, "Model", -1),
				n[8] ||= d(),
				l("span", Rn, w(m.value.model ?? "—"), 1),
				n[9] ||= l("span", { class: "info-k" }, "OS", -1),
				n[10] ||= d(),
				l("span", zn, w(m.value.os ?? "—"), 1),
				n[11] ||= l("span", { class: "info-k" }, "Source", -1),
				n[12] ||= d(),
				l("span", Bn, w(m.value.source), 1),
				n[13] ||= l("span", { class: "info-k" }, "Sync", -1),
				n[14] ||= d(),
				l("span", Vn, w(m.value.syncState), 1)
			])]),
			m.value.metrics ? (b(), c("section", Hn, [n[16] ||= l("div", { class: "sec-title" }, "Metrics", -1), (b(!0), c(e, null, C(E.value, (e) => (b(), c("div", {
				key: e.key,
				class: "metric-row"
			}, [
				l("span", Un, w(e.label), 1),
				l("div", Wn, [l("div", {
					class: "m-bar",
					style: _({
						width: e.pct + "%",
						background: e.color
					})
				}, null, 4)]),
				l("span", { class: g(["m-val", { hot: e.pct > 85 }]) }, w(e.display), 3)
			]))), 128))])) : s("", !0),
			l("section", Gn, [l("div", {
				class: "sec-title clickable",
				onClick: n[1] ||= (e) => a.value = !a.value
			}, [
				l("span", null, "Interfaces (" + w(v.value.length) + ")", 1),
				l("span", Kn, [l("span", qn, "Up " + w(y.value), 1), l("span", Jn, "Down " + w(x.value), 1)]),
				l("span", Yn, w(a.value ? "−" : "+"), 1)
			]), a.value ? (b(), c("div", Xn, [(b(!0), c(e, null, C(v.value, (e) => (b(), c("div", {
				key: e.id,
				class: g(["iface-row", e.status])
			}, [
				l("span", { class: g(["if-dot", e.status]) }, null, 2),
				l("span", Zn, w(e.name), 1),
				l("span", Qn, w(e.alias ?? ""), 1),
				l("span", $n, w(e.ip ?? ""), 1),
				l("span", er, w(e.speed ? e.speed + "M" : ""), 1),
				l("div", tr, [l("span", null, "In " + w(A(e.trafficIn)), 1), l("span", null, "Out " + w(A(e.trafficOut)), 1)]),
				e.errors ? (b(), c("span", nr, "err:" + w(e.errors), 1)) : s("", !0)
			], 2))), 128))])) : s("", !0)]),
			T(r).mode === "edit" ? (b(), c("section", rr, [n[20] ||= l("div", { class: "sec-title" }, "Annotation", -1), l("div", ir, [
				l("label", null, [n[17] ||= d("Display name ", -1), j(l("input", {
					"onUpdate:modelValue": n[2] ||= (e) => u.value = e,
					class: "anno-input",
					placeholder: "Device alias"
				}, null, 512), [[O, u.value]])]),
				l("label", null, [n[18] ||= d("Memo ", -1), j(l("textarea", {
					"onUpdate:modelValue": n[3] ||= (e) => f.value = e,
					class: "anno-input anno-textarea",
					rows: "2"
				}, null, 512), [[O, f.value]])]),
				l("label", null, [n[19] ||= d("Tags (comma separated) ", -1), j(l("input", {
					"onUpdate:modelValue": n[4] ||= (e) => p.value = e,
					class: "anno-input",
					placeholder: "web, db, prod"
				}, null, 512), [[O, p.value]])]),
				l("button", {
					class: "save-btn",
					onClick: te
				}, "Save")
			])])) : s("", !0),
			T(r).mode === "edit" ? (b(), c("section", ar, [
				n[21] ||= l("div", { class: "sec-title" }, "Actions", -1),
				l("div", or, [
					l("button", {
						class: "act-btn isolate",
						onClick: M
					}, "Isolate"),
					l("button", {
						class: "act-btn recover",
						onClick: N
					}, "Recover"),
					l("button", {
						class: "act-btn ack",
						onClick: ee
					}, "Acknowledge"),
					T(r).mode === "edit" ? (b(), c("button", {
						key: 0,
						class: "act-btn unmap",
						onClick: P
					}, "Remove from map")) : s("", !0)
				]),
				o.value ? (b(), c("div", sr, w(o.value), 1)) : s("", !0)
			])) : s("", !0)
		])])) : s("", !0);
	}
}), [["__scopeId", "data-v-43d15fb8"]]), lr = {
	key: 0,
	class: "panel"
}, ur = { class: "panel-head" }, dr = { class: "link-title" }, fr = { class: "link-type" }, pr = { class: "link-src" }, mr = { class: "panel-body" }, hr = { class: "section" }, gr = { class: "info-grid" }, _r = { class: "v" }, vr = { class: "v" }, yr = { class: "v" }, br = { class: "v" }, xr = { class: "v" }, Sr = {
	key: 0,
	class: "section"
}, Cr = { class: "edit-form" }, wr = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "LinkPropertyPanel",
	setup(e) {
		let t = R(), n = z(), r = {
			physical: "Physical",
			logical: "Logical",
			service_dependency: "Service Dependency",
			traffic_flow: "Traffic Flow",
			security_path: "Security Path",
			manual: "Manual",
			inferred: "Inferred"
		}, a = i(() => n.selectedLinkId ? t.links.get(n.selectedLinkId) ?? null : null), o = i(() => a.value ? t.devices.get(a.value.sourceDeviceId) : null), u = i(() => a.value ? t.devices.get(a.value.targetDeviceId) : null), f = i(() => o.value?.hostname ?? "?"), p = i(() => u.value?.hostname ?? "?"), m = S("up"), h = S("");
		k(a, (e) => {
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
		return (e, t) => a.value ? (b(), c("aside", lr, [l("div", ur, [l("div", dr, [
			l("span", {
				class: "link-icon",
				style: _({ color: T(vt)[a.value.type]?.color })
			}, "╌", 4),
			l("div", null, [l("div", fr, w(r[a.value.type]), 1), l("div", pr, w(f.value) + " → " + w(p.value), 1)]),
			l("span", { class: g(["status-dot", a.value.status]) }, null, 2),
			l("button", {
				class: "close-btn",
				onClick: t[0] ||= (e) => T(n).select(null),
				title: "Close"
			}, "✕")
		])]), l("div", mr, [l("section", hr, [t[15] ||= l("div", { class: "sec-title" }, "Link Info", -1), l("div", gr, [
			t[3] ||= l("span", { class: "k" }, "Type", -1),
			t[4] ||= d(),
			l("span", _r, w(r[a.value.type]), 1),
			t[5] ||= l("span", { class: "k" }, "Status", -1),
			t[6] ||= d(),
			l("span", { class: g(["v", `s-${a.value.status}`]) }, w(a.value.status ?? "unknown"), 3),
			t[7] ||= l("span", { class: "k" }, "Source", -1),
			t[8] ||= d(),
			l("span", vr, w(a.value.source), 1),
			t[9] ||= l("span", { class: "k" }, "Confidence", -1),
			t[10] ||= d(),
			l("span", yr, w(a.value.confidence ?? "—"), 1),
			t[11] ||= l("span", { class: "k" }, "Bandwidth", -1),
			t[12] ||= d(),
			l("span", br, w(a.value.bandwidth ? a.value.bandwidth + " Mbps" : "—"), 1),
			t[13] ||= l("span", { class: "k" }, "Label", -1),
			t[14] ||= d(),
			l("span", xr, w(a.value.label ?? "—"), 1)
		])]), T(n).mode === "edit" && a.value.source === "manual" ? (b(), c("section", Sr, [t[19] ||= l("div", { class: "sec-title" }, "Edit", -1), l("div", Cr, [
			l("label", null, [t[17] ||= d("Status ", -1), j(l("select", {
				"onUpdate:modelValue": t[1] ||= (e) => m.value = e,
				class: "sel"
			}, [...t[16] ||= [
				l("option", { value: "up" }, "Up", -1),
				l("option", { value: "down" }, "Down", -1),
				l("option", { value: "unknown" }, "Unknown", -1)
			]], 512), [[D, m.value]])]),
			l("label", null, [t[18] ||= d("Label ", -1), j(l("input", {
				"onUpdate:modelValue": t[2] ||= (e) => h.value = e,
				class: "inp"
			}, null, 512), [[O, h.value]])]),
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
}), [["__scopeId", "data-v-1f2f1ef4"]]), Tr = { type: "change" }, Er = { type: "start" }, Dr = { type: "end" }, Or = new xe(), kr = new _e(), Ar = Math.cos(70 * pe.DEG2RAD), V = new L(), jr = 2 * Math.PI, H = {
	NONE: -1,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2,
	TOUCH_ROTATE: 3,
	TOUCH_PAN: 4,
	TOUCH_DOLLY_PAN: 5,
	TOUCH_DOLLY_ROTATE: 6
}, Mr = 1e-6, Nr = class extends ae {
	constructor(e, t = null) {
		super(e, t), this.state = H.NONE, this.target = new L(), this.cursor = new L(), this.minDistance = 0, this.maxDistance = Infinity, this.minZoom = 0, this.maxZoom = Infinity, this.minTargetRadius = 0, this.maxTargetRadius = Infinity, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -Infinity, this.maxAzimuthAngle = Infinity, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
			LEFT: "ArrowLeft",
			UP: "ArrowUp",
			RIGHT: "ArrowRight",
			BOTTOM: "ArrowDown"
		}, this.mouseButtons = {
			LEFT: fe.ROTATE,
			MIDDLE: fe.DOLLY,
			RIGHT: fe.PAN
		}, this.touches = {
			ONE: we.ROTATE,
			TWO: we.DOLLY_PAN
		}, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._cursorStyle = "auto", this._domElementKeyEvents = null, this._lastPosition = new L(), this._lastQuaternion = new ye(), this._lastTargetPosition = new L(), this._quat = new ye().setFromUnitVectors(e.up, new L(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Ce(), this._sphericalDelta = new Ce(), this._scale = 1, this._panOffset = new L(), this._rotateStart = new I(), this._rotateEnd = new I(), this._rotateDelta = new I(), this._panStart = new I(), this._panEnd = new I(), this._panDelta = new I(), this._dollyStart = new I(), this._dollyEnd = new I(), this._dollyDelta = new I(), this._dollyDirection = new L(), this._mouse = new I(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Fr.bind(this), this._onPointerDown = Pr.bind(this), this._onPointerUp = Ir.bind(this), this._onContextMenu = Ur.bind(this), this._onMouseWheel = zr.bind(this), this._onKeyDown = Br.bind(this), this._onTouchStart = Vr.bind(this), this._onTouchMove = Hr.bind(this), this._onMouseDown = Lr.bind(this), this._onMouseMove = Rr.bind(this), this._interceptControlDown = Wr.bind(this), this._interceptControlUp = Gr.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
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
		this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Tr), this.update(), this.state = H.NONE;
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
		V.copy(t).sub(this.target), V.applyQuaternion(this._quat), this._spherical.setFromVector3(V), this.autoRotate && this.state === H.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
		let n = this.minAzimuthAngle, r = this.maxAzimuthAngle;
		isFinite(n) && isFinite(r) && (n < -Math.PI ? n += jr : n > Math.PI && (n -= jr), r < -Math.PI ? r += jr : r > Math.PI && (r -= jr), n <= r ? this._spherical.theta = Math.max(n, Math.min(r, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + r) / 2 ? Math.max(n, this._spherical.theta) : Math.min(r, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
		let i = !1;
		if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
		else {
			let e = this._spherical.radius;
			this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), i = e != this._spherical.radius;
		}
		if (V.setFromSpherical(this._spherical), V.applyQuaternion(this._quatInverse), t.copy(this.target).add(V), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
			let e = null;
			if (this.object.isPerspectiveCamera) {
				let t = V.length();
				e = this._clampDistance(t * this._scale);
				let n = t - e;
				this.object.position.addScaledVector(this._dollyDirection, n), this.object.updateMatrixWorld(), i = !!n;
			} else if (this.object.isOrthographicCamera) {
				let t = new L(this._mouse.x, this._mouse.y, 0);
				t.unproject(this.object);
				let n = this.object.zoom;
				this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), i = n !== this.object.zoom;
				let r = new L(this._mouse.x, this._mouse.y, 0);
				r.unproject(this.object), this.object.position.sub(r).add(t), this.object.updateMatrixWorld(), e = V.length();
			} else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
			e !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position) : (Or.origin.copy(this.object.position), Or.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Or.direction)) < Ar ? this.object.lookAt(this.target) : (kr.setFromNormalAndCoplanarPoint(this.object.up, this.target), Or.intersectPlane(kr, this.target))));
		} else if (this.object.isOrthographicCamera) {
			let e = this.object.zoom;
			this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), e !== this.object.zoom && (this.object.updateProjectionMatrix(), i = !0);
		}
		return this._scale = 1, this._performCursorZoom = !1, i || this._lastPosition.distanceToSquared(this.object.position) > Mr || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Mr || this._lastTargetPosition.distanceToSquared(this.target) > Mr ? (this.dispatchEvent(Tr), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
	}
	_getAutoRotationAngle(e) {
		return e === null ? jr / 60 / 60 * this.autoRotateSpeed : jr / 60 * this.autoRotateSpeed * e;
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
		V.setFromMatrixColumn(t, 0), V.multiplyScalar(-e), this._panOffset.add(V);
	}
	_panUp(e, t) {
		this.screenSpacePanning === !0 ? V.setFromMatrixColumn(t, 1) : (V.setFromMatrixColumn(t, 0), V.crossVectors(this.object.up, V)), V.multiplyScalar(e), this._panOffset.add(V);
	}
	_pan(e, t) {
		let n = this.domElement;
		if (this.object.isPerspectiveCamera) {
			let r = this.object.position;
			V.copy(r).sub(this.target);
			let i = V.length();
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
		this._rotateLeft(jr * this._rotateDelta.x / t.clientHeight), this._rotateUp(jr * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(jr * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
				break;
			case this.keys.BOTTOM:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-jr * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
				break;
			case this.keys.LEFT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(jr * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
				break;
			case this.keys.RIGHT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-jr * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
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
		this._rotateLeft(jr * this._rotateDelta.x / t.clientHeight), this._rotateUp(jr * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
		t === void 0 && (t = new I(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function Pr(e) {
	this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e), this._cursorStyle === "grab" && (this.domElement.style.cursor = "grabbing")));
}
function Fr(e) {
	this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function Ir(e) {
	switch (this._removePointer(e), this._pointers.length) {
		case 0:
			this.domElement.releasePointerCapture(e.pointerId), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Dr), this.state = H.NONE, this._cursorStyle === "grab" && (this.domElement.style.cursor = "grab");
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
function Lr(e) {
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
		case fe.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseDownDolly(e), this.state = H.DOLLY;
			break;
		case fe.ROTATE:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = H.PAN;
			} else {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = H.ROTATE;
			}
			break;
		case fe.PAN:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = H.ROTATE;
			} else {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = H.PAN;
			}
			break;
		default: this.state = H.NONE;
	}
	this.state !== H.NONE && this.dispatchEvent(Er);
}
function Rr(e) {
	switch (this.state) {
		case H.ROTATE:
			if (this.enableRotate === !1) return;
			this._handleMouseMoveRotate(e);
			break;
		case H.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseMoveDolly(e);
			break;
		case H.PAN:
			if (this.enablePan === !1) return;
			this._handleMouseMovePan(e);
			break;
	}
}
function zr(e) {
	this.enabled === !1 || this.enableZoom === !1 || this.state !== H.NONE || (e.preventDefault(), this.dispatchEvent(Er), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(Dr));
}
function Br(e) {
	this.enabled !== !1 && this._handleKeyDown(e);
}
function Vr(e) {
	switch (this._trackPointer(e), this._pointers.length) {
		case 1:
			switch (this.touches.ONE) {
				case we.ROTATE:
					if (this.enableRotate === !1) return;
					this._handleTouchStartRotate(e), this.state = H.TOUCH_ROTATE;
					break;
				case we.PAN:
					if (this.enablePan === !1) return;
					this._handleTouchStartPan(e), this.state = H.TOUCH_PAN;
					break;
				default: this.state = H.NONE;
			}
			break;
		case 2:
			switch (this.touches.TWO) {
				case we.DOLLY_PAN:
					if (this.enableZoom === !1 && this.enablePan === !1) return;
					this._handleTouchStartDollyPan(e), this.state = H.TOUCH_DOLLY_PAN;
					break;
				case we.DOLLY_ROTATE:
					if (this.enableZoom === !1 && this.enableRotate === !1) return;
					this._handleTouchStartDollyRotate(e), this.state = H.TOUCH_DOLLY_ROTATE;
					break;
				default: this.state = H.NONE;
			}
			break;
		default: this.state = H.NONE;
	}
	this.state !== H.NONE && this.dispatchEvent(Er);
}
function Hr(e) {
	switch (this._trackPointer(e), this.state) {
		case H.TOUCH_ROTATE:
			if (this.enableRotate === !1) return;
			this._handleTouchMoveRotate(e), this.update();
			break;
		case H.TOUCH_PAN:
			if (this.enablePan === !1) return;
			this._handleTouchMovePan(e), this.update();
			break;
		case H.TOUCH_DOLLY_PAN:
			if (this.enableZoom === !1 && this.enablePan === !1) return;
			this._handleTouchMoveDollyPan(e), this.update();
			break;
		case H.TOUCH_DOLLY_ROTATE:
			if (this.enableZoom === !1 && this.enableRotate === !1) return;
			this._handleTouchMoveDollyRotate(e), this.update();
			break;
		default: this.state = H.NONE;
	}
}
function Ur(e) {
	this.enabled !== !1 && e.preventDefault();
}
function Wr(e) {
	e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
function Gr(e) {
	e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
//#endregion
//#region node_modules/three/examples/jsm/renderers/CSS2DRenderer.js
var Kr = class extends ge {
	constructor(e = document.createElement("div")) {
		super(), this.isCSS2DObject = !0, this.element = e, this.element.style.position = "absolute", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.center = new I(.5, .5), this.addEventListener("removed", function() {
			this.traverse(function(e) {
				e.element && e.element instanceof e.element.ownerDocument.defaultView.Element && e.element.parentNode !== null && e.element.remove();
			});
		});
	}
	copy(e, t) {
		return super.copy(e, t), this.element = e.element.cloneNode(!0), this.center = e.center, this;
	}
}, qr = new L(), Jr = new me(), Yr = new me(), Xr = new L(), Zr = new L(), Qr = class {
	constructor(e = {}) {
		let t = this, n, r, i, a, o = { objects: /* @__PURE__ */ new WeakMap() }, s = e.element === void 0 ? document.createElement("div") : e.element;
		s.style.overflow = "hidden", this.domElement = s, this.sortObjects = !0, this.getSize = function() {
			return {
				width: n,
				height: r
			};
		}, this.render = function(e, t) {
			e.matrixWorldAutoUpdate === !0 && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === !0 && t.updateMatrixWorld(), Jr.copy(t.matrixWorldInverse), Yr.multiplyMatrices(t.projectionMatrix, Jr), l(e, e, t), this.sortObjects && f(e);
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
				qr.setFromMatrixPosition(e.matrixWorld), qr.applyMatrix4(Yr);
				let c = qr.z >= -1 && qr.z <= 1 && e.layers.test(r.layers) === !0, l = e.element;
				l.style.display = c === !0 ? "" : "none", c === !0 && (e.onBeforeRender(t, n, r), l.style.transform = "translate(" + -100 * e.center.x + "%," + -100 * e.center.y + "%)translate(" + (qr.x * i + i) + "px," + (-qr.y * a + a) + "px)", l.parentNode !== s && s.appendChild(l), e.onAfterRender(t, n, r));
				let d = { distanceToCameraSquared: u(r, e) };
				o.objects.set(e, d);
			}
			for (let t = 0, i = e.children.length; t < i; t++) l(e.children[t], n, r);
		}
		function u(e, t) {
			return Xr.setFromMatrixPosition(e.matrixWorld), Zr.setFromMatrixPosition(t.matrixWorld), Xr.distanceToSquared(Zr);
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
}, $r = class {
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
		this._wrapper = n, this._canvas = e, this._overlayEl = t, this._onError = r.onError, this.renderer = new P.WebGLRenderer({
			canvas: e,
			antialias: !0,
			logarithmicDepthBuffer: !0
		}), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.shadowMap.enabled = !0, this.css2dRenderer = new Qr(), this.css2dRenderer.domElement.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;", t.appendChild(this.css2dRenderer.domElement), this.scene = new P.Scene(), this.scene.background = new P.Color(527384), this.scene.fog = new P.FogExp2(527384, .005), this.camera = new P.PerspectiveCamera(55, 1, .5, 1e3), this.camera.position.set(0, 60, 80), this.camera.lookAt(0, 0, 0), this.controls = new Nr(this.camera, e), this.controls.enableDamping = !0, this.controls.dampingFactor = .06, this.controls.maxPolarAngle = Math.PI / 2.05, this.controls.minDistance = 3, this.controls.maxDistance = 220, this._setupLights(), this._setupGrid(), this.resize(), window.addEventListener("resize", this.resize), this._resizeObserver = new ResizeObserver(() => this.resize()), this._resizeObserver.observe(n), e.addEventListener("webglcontextlost", this.onWebglContextLost), e.addEventListener("webglcontextrestored", this.onWebglContextRestored);
	}
	_setupLights() {
		this.scene.add(new P.AmbientLight(2767452, 3));
		let e = new P.DirectionalLight(16777215, 2);
		e.position.set(20, 60, 30), e.castShadow = !0, e.shadow.mapSize.set(2048, 2048), e.shadow.camera.left = -120, e.shadow.camera.right = 120, e.shadow.camera.top = 120, e.shadow.camera.bottom = -120, this.scene.add(e);
		let t = new P.DirectionalLight(4482730, .7);
		t.position.set(-20, 20, -30), this.scene.add(t);
	}
	_setupGrid() {
		let e = new P.Mesh(new P.PlaneGeometry(300, 300), new P.MeshStandardMaterial({
			color: 725024,
			roughness: 1
		}));
		e.rotation.x = -Math.PI / 2, e.position.y = -.5, e.receiveShadow = !0, this.scene.add(e);
		let t = new P.GridHelper(300, 60, 1714762, 1714762);
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
		let t = new P.Timer(), n = (r) => {
			this._animId = requestAnimationFrame(n), t.update(r);
			let i = t.getDelta(), a = t.getElapsed();
			this.controls.update(), e(i, a), this.renderer.render(this.scene, this.camera), this.css2dRenderer.render(this.scene, this.camera);
		};
		requestAnimationFrame(n);
	}
	dispose() {
		cancelAnimationFrame(this._animId), window.removeEventListener("resize", this.resize), this._resizeObserver?.disconnect(), this._resizeObserver = void 0, this._canvas?.removeEventListener("webglcontextlost", this.onWebglContextLost), this._canvas?.removeEventListener("webglcontextrestored", this.onWebglContextRestored), this.controls?.dispose(), this.renderer?.dispose(), this.css2dRenderer?.domElement.remove();
	}
}, ei = {
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
}, ti = /* @__PURE__ */ new Map();
function ni(e) {
	if (ti.has(e)) return ti.get(e);
	let t;
	switch (e) {
		case "router":
			t = new P.CylinderGeometry(.28, .28, .12, 10);
			break;
		case "database":
			t = new P.CylinderGeometry(.28, .28, .5, 10);
			break;
		case "load_balancer":
			t = new P.OctahedronGeometry(.24);
			break;
		case "access_point":
			t = new P.SphereGeometry(.2, 8, 6);
			break;
		case "cloud_service":
			t = new P.SphereGeometry(.3, 10, 8);
			break;
		default: {
			let [n, r, i] = ei[e];
			t = new P.BoxGeometry(n, r, i);
		}
	}
	return t.computeBoundsTree(), ti.set(e, t), t;
}
//#endregion
//#region src/renderers/DeviceRenderer.ts
var ri = /* @__PURE__ */ new Map();
function ii(e) {
	return ri.has(e) || ri.set(e, new P.MeshStandardMaterial({
		color: new P.Color(_t[e]),
		roughness: .35,
		metalness: .65,
		emissive: new P.Color(0),
		emissiveIntensity: 0
	})), ri.get(e);
}
var ai = class {
	scene;
	objects = /* @__PURE__ */ new Map();
	dummy = new P.Object3D();
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
			let i = e.normalizedType ?? "unknown";
			r.has(i) || r.set(i, []), r.get(i).push({
				device: e,
				mapping: t
			});
		}), r.forEach((e, t) => {
			let n = ni(t), r = ii(t).clone();
			r.vertexColors = !1;
			let i = new P.InstancedMesh(n, r, e.length + 50);
			i.instanceMatrix.setUsage(P.DynamicDrawUsage), i.count = e.length, i.userData.deviceType = t, e.forEach((e, n) => {
				let r = e.mapping.position;
				this.dummy.position.set(r.x, r.y, r.z), this.dummy.rotation.set(0, 0, 0), this.dummy.scale.setScalar(1), this.dummy.updateMatrix(), i.setMatrixAt(n, this.dummy.matrix);
				let a = e.device.status ?? "unknown", o = gt[a];
				i.setColorAt(n, o), this.instanceIndex.set(e.device.id, {
					type: t,
					idx: n
				}), this.instanceColors.set(e.device.id, o.clone()), this.statusMap.set(e.device.id, a), i.userData[`device_${n}`] = e.device.id;
			}), i.instanceMatrix.needsUpdate = !0, i.instanceColor && (i.instanceColor.needsUpdate = !0), this.instancedMeshes.set(t, i), this.scene.add(i);
		});
	}
	updateStatus(e, t) {
		let n = this.instanceIndex.get(e);
		if (!n) return;
		let r = this.instancedMeshes.get(n.type);
		if (!r) return;
		this.statusMap.set(e, t);
		let i = gt[t].clone();
		this.dimmedIds.size > 0 && !this.dimmedIds.has(e) ? i = i.clone().multiplyScalar(.18) : this.dimmedIds.size > 0 && this.dimmedIds.has(e) && (i = i.clone().multiplyScalar(2)), r.setColorAt(n.idx, i), r.instanceColor && (r.instanceColor.needsUpdate = !0), this.instanceColors.set(e, i);
	}
	pulseStatus(e, t, n) {
		let r = this.instanceIndex.get(e);
		if (!r) return;
		let i = this.instancedMeshes.get(r.type);
		if (!i) return;
		let a = gt[t].clone().clone().multiplyScalar(1 + n * 1.5);
		i.setColorAt(r.idx, a), i.instanceColor && (i.instanceColor.needsUpdate = !0);
	}
	setHighlight(e, t) {
		let n = this.instanceIndex.get(e);
		if (!n) return;
		let r = this.instancedMeshes.get(n.type);
		if (!r) return;
		let i = this.instanceColors.get(e) ?? new P.Color(16777215), a = t ? i.clone().multiplyScalar(2.4) : i.clone();
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
			let a = new Kr(i);
			a.position.copy(r).add(new P.Vector3(0, 1.7, 0)), this.scene.add(a), this.searchLabels.set(e, a), n += 1;
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
		let i = new P.Matrix4();
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
					let i = gt[r].clone();
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
				let o = gt[a].clone(), s = i ? new P.Color(16773494) : o.clone().multiplyScalar(.08);
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
		let r = new P.Matrix4();
		n.getMatrixAt(t.idx, r);
		let i = new P.Vector3();
		return i.setFromMatrixPosition(r), i;
	}
	dispose() {
		this.clearSearchLabels(), this.instancedMeshes.forEach((e) => {
			e.geometry.dispose(), e.material.dispose(), this.scene.remove(e);
		}), this.instancedMeshes.clear(), this.instanceIndex.clear(), ri.forEach((e) => e.dispose()), ri.clear();
	}
	clearSearchLabels() {
		this.searchLabels.forEach((e) => {
			this.scene.remove(e), e.element.remove();
		}), this.searchLabels.clear();
	}
}, oi = {
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
}, si = class {
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
		let t = oi[e.type] ?? oi.zone, n = new P.Group(), r = e.position ?? {
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
		let o = new Kr(a);
		o.position.set(0, e.type === "rack" ? 1 : .8, 0), o.visible = this.shouldShowBadge(e.type, e.source), n.add(o);
		let s = e.type === "rack" ? .25 : .4, c = new P.BoxGeometry(i.width, s, i.depth);
		c.computeBoundsTree();
		let l = new P.Mesh(c, new P.MeshBasicMaterial({ visible: !1 }));
		l.position.y = s / 2, l.userData.spaceId = e.id, l.userData.spaceType = e.type, l.userData.spaceSource = e.source, n.add(l), this.scene.add(n), this.objects.set(e.id, {
			group: n,
			hitMesh: l,
			badgeEl: a,
			badge: o
		}), this.applyBadgeLod();
	}
	_buildRack(e, t, n, r) {
		let i = n.width, a = n.depth, o = new P.Mesh(new P.BoxGeometry(i, .15, a), new P.MeshStandardMaterial({
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
		let s = new P.EdgesGeometry(new P.BoxGeometry(i, .15, a)), c = new P.LineSegments(s, new P.LineBasicMaterial({
			color: r.edge,
			transparent: !0,
			opacity: .8
		}));
		c.position.y = .075, e.add(c);
	}
	_buildSite(e, t, n, r) {
		let i = new P.Mesh(new P.PlaneGeometry(n.width, n.depth), new P.MeshStandardMaterial({
			color: r.floor,
			transparent: !0,
			opacity: .18,
			roughness: 1,
			polygonOffset: !0,
			polygonOffsetFactor: -2,
			polygonOffsetUnits: -2
		}));
		i.rotation.x = -Math.PI / 2, i.position.y = .05, e.add(i);
		let a = new P.LineLoop(new P.BufferGeometry().setFromPoints([
			new P.Vector3(-n.width / 2, .01, -n.depth / 2),
			new P.Vector3(n.width / 2, .01, -n.depth / 2),
			new P.Vector3(n.width / 2, .01, n.depth / 2),
			new P.Vector3(-n.width / 2, .01, n.depth / 2)
		]), new P.LineBasicMaterial({
			color: r.edge,
			transparent: !0,
			opacity: .5
		}));
		e.add(a);
	}
	_buildZone(e, t, n, r) {
		let i = t.color ? parseInt(t.color.slice(1), 16) : r.floor, a = new P.Mesh(new P.PlaneGeometry(n.width, n.depth), new P.MeshStandardMaterial({
			color: i,
			transparent: !0,
			opacity: .28,
			roughness: 1,
			polygonOffset: !0,
			polygonOffsetFactor: -4,
			polygonOffsetUnits: -4
		}));
		a.rotation.x = -Math.PI / 2, a.position.y = .12, e.add(a);
		let o = new P.EdgesGeometry(new P.BoxGeometry(n.width, .02, n.depth)), s = new P.LineSegments(o, new P.LineBasicMaterial({
			color: r.edge,
			transparent: !0,
			opacity: .5
		}));
		s.position.y = .01, e.add(s);
	}
	setSelected(e, t) {
		let n = this.objects.get(e);
		if (!n) return;
		let r = n.group.children.find((e) => e instanceof P.Mesh && e !== n.hitMesh);
		if (r) {
			let e = r.material;
			e.emissive = t ? new P.Color(22015) : new P.Color(0), e.emissiveIntensity = t ? .3 : 0;
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
		return t ? t.group.position.clone() : new P.Vector3();
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
			if (e instanceof P.Mesh || e instanceof P.LineSegments || e instanceof P.LineLoop) {
				e.geometry?.disposeBoundsTree?.(), e.geometry?.dispose();
				let t = e.material;
				Array.isArray(t) ? t.forEach((e) => e.dispose()) : t?.dispose();
			}
		});
	}
}, ci = .45, li = .1, ui = class {
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
		let i = e.y + li, a = t.y + li, o = (i + a) / 2;
		return [
			new P.Vector3(e.x, i, e.z),
			new P.Vector3(e.x, o, r),
			new P.Vector3(n, o, r),
			new P.Vector3(n, o, t.z),
			new P.Vector3(t.x, a, t.z)
		];
	}
	midY(e, t) {
		return (e.y + t.y) / 2 + li;
	}
	addLink(e, t) {
		let n = t(e.sourceDeviceId), r = t(e.targetDeviceId);
		if (!n || !r) return;
		let i = vt[e.type] ?? vt.manual, a = e.status === "down" ? "#ef4444" : i.color, o = e.midX ?? (n.x + r.x) / 2, s = e.midZ ?? (n.z + r.z) / 2, c = this.buildPath(n, r, o, s), l = new P.BufferGeometry().setFromPoints(c), u = new P.LineDashedMaterial({
			color: a,
			transparent: !0,
			opacity: i.opacity,
			dashSize: i.dashed ? .35 : 1e3,
			gapSize: i.dashed ? .15 : 0,
			linewidth: 2
		}), d = new P.Line(l, u);
		d.computeLineDistances(), d.userData.linkId = e.id;
		let f = new P.BoxGeometry(.55, .3, .55), p = new P.MeshBasicMaterial({
			color: 6333946,
			transparent: !0,
			opacity: .6,
			depthTest: !1
		}), m = new P.Mesh(f, p);
		m.position.set(o, this.midY(n, r), s), m.renderOrder = 800, m.userData.linkHandleId = e.id, m.userData.linkId = e.id, m.visible = !1;
		let h = new P.Group();
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
			t.line.geometry.setAttribute("position", new P.BufferAttribute(s, 3)), t.line.geometry.computeBoundingSphere(), t.line.computeLineDistances(), t.handle.position.set(i, this.midY(n, r), a);
		});
	}
	updateLinkStatus(e, t) {
		let n = this.objects.get(e);
		if (!n) return;
		let r = vt[n.link.type] ?? vt.manual, i = t === "down" ? "#ef4444" : r.color;
		n.line.material.color.set(i);
	}
	setHighlight(e, t) {
		if (t) {
			let e = this.objects.get(t);
			e && (e.line.material.opacity = vt[e.link.type]?.opacity ?? .6);
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
			new P.Vector3(e.x, ci, e.z),
			new P.Vector3(e.x, ci, n),
			new P.Vector3(t.x, ci, n),
			new P.Vector3(t.x, ci, t.z)
		];
		if (this.previewLine) this.previewLine.geometry.setFromPoints(r), this.previewLine.computeLineDistances();
		else {
			let e = new P.BufferGeometry().setFromPoints(r), t = new P.LineDashedMaterial({
				color: 6333946,
				dashSize: .3,
				gapSize: .15,
				transparent: !0,
				opacity: .9,
				linewidth: 2
			});
			this.previewLine = new P.Line(e, t), this.scene.add(this.previewLine);
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
}, di = 4e3;
function fi(e) {
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
function pi(e, t, n, r, i) {
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
var mi = class {
	scene;
	points;
	particles = [];
	posAttr;
	colAttr;
	constructor(e) {
		this.scene = e;
		let t = new P.BufferGeometry(), n = new Float32Array(di * 3), r = new Float32Array(di * 3);
		this.posAttr = new P.BufferAttribute(n, 3), this.colAttr = new P.BufferAttribute(r, 3), this.posAttr.setUsage(P.DynamicDrawUsage), t.setAttribute("position", this.posAttr), t.setAttribute("color", this.colAttr), t.setDrawRange(0, 0);
		let i = new P.PointsMaterial({
			size: .22,
			vertexColors: !0,
			transparent: !0,
			opacity: .95,
			depthWrite: !1,
			blending: P.AdditiveBlending,
			sizeAttenuation: !0
		});
		this.points = new P.Points(t, i), this.points.frustumCulled = !1, e.add(this.points);
	}
	syncLinks(e, t, n) {
		this.particles = [], e.forEach((e) => {
			if (e.status === "down") return;
			let r = t(e.id);
			if (!r || r.length < 2) return;
			let { lengths: i, total: a } = fi(r);
			if (a === 0) return;
			let o = vt[e.type] ?? vt.manual, s = new P.Color(o.color), c = n(e.sourceDeviceId), l = Math.min(Math.max(Math.floor(c / 150), 2), 6), u = 3.5 + Math.min(c / 1e3, 1) * 4.5;
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
		let n = 0, r = this.posAttr.array, i = this.colAttr.array, a = new P.Vector3();
		for (let o of this.particles) {
			if (n >= di) break;
			t.has(o.linkType) && (o.t += o.speed * e / Math.max(o.totalLength, 1), o.t > 1 && --o.t, pi(o.segments, o.segmentLengths, o.totalLength, o.t, a), r[n * 3] = a.x, r[n * 3 + 1] = a.y, r[n * 3 + 2] = a.z, i[n * 3] = o.color.r, i[n * 3 + 1] = o.color.g, i[n * 3 + 2] = o.color.b, n++);
		}
		this.points.geometry.setDrawRange(0, n), this.posAttr.needsUpdate = !0, this.colAttr.needsUpdate = !0;
	}
	setVisible(e) {
		this.points.visible = e, e || this.points.geometry.setDrawRange(0, 0);
	}
	dispose() {
		this.scene.remove(this.points), this.points.geometry.dispose(), this.points.material.dispose();
	}
}, hi = class {
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
			let i = n === 1 ? 16739072 : 16768256, a = n === 1 ? .8 : 1.3, o = new P.RingGeometry(a, a + .12, 32), s = new P.MeshBasicMaterial({
				color: i,
				transparent: !0,
				opacity: n === 1 ? .7 : .4,
				side: P.DoubleSide,
				depthWrite: !1,
				blending: P.AdditiveBlending
			}), c = new P.Mesh(o, s);
			c.rotation.x = -Math.PI / 2, c.position.set(r.x, r.y + .3, r.z), c.renderOrder = 1, this.scene.add(c), this.rings.push({
				mesh: c,
				hop: n,
				deviceId: e
			});
			let l = new P.RingGeometry(a + .15, a + .25, 32), u = new P.MeshBasicMaterial({
				color: i,
				transparent: !0,
				opacity: .2,
				side: P.DoubleSide,
				depthWrite: !1,
				blending: P.AdditiveBlending
			}), d = new P.Mesh(l, u);
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
}, gi = {
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
}, _i = {
	internet: "INET",
	cloud: "CLOUD",
	external: "EXT",
	custom: "NODE"
}, vi = class {
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
		let t = gi[e.type] ?? gi.custom, n = new P.Group(), r = e.position ?? {
			x: 0,
			y: 0,
			z: 0
		};
		n.position.set(r.x, r.y, r.z), n.userData.virtualNodeId = e.id;
		let i = e.type === "cloud" ? new P.SphereGeometry(.85, 12, 10) : new P.IcosahedronGeometry(.7, 1), a = new P.MeshStandardMaterial({
			color: t.color,
			emissive: t.emissive,
			emissiveIntensity: .8,
			roughness: .3,
			metalness: .5,
			transparent: !0,
			opacity: .82,
			wireframe: e.type === "internet"
		}), o = new P.Mesh(i, a);
		o.position.y = 1.2, n.add(o);
		let s = new P.RingGeometry(.95, 1.1, 32), c = new P.MeshBasicMaterial({
			color: t.color,
			transparent: !0,
			opacity: .35,
			side: P.DoubleSide,
			depthWrite: !1,
			blending: P.AdditiveBlending
		}), l = new P.Mesh(s, c);
		l.rotation.x = -Math.PI / 2, l.position.y = .05, n.add(l);
		let u = document.createElement("div");
		u.style.cssText = "color:#cbd5e1;font-size:11px;font-family:monospace;\n      background:rgba(9,13,24,.85);border:1px solid #2a4a8a;border-radius:5px;\n      padding:2px 8px;pointer-events:none;white-space:nowrap;", u.textContent = `${_i[e.type] ?? "NODE"} · ${e.label}`;
		let d = new Kr(u);
		d.position.set(0, 2.5, 0), n.add(d);
		let f = new P.Mesh(new P.SphereGeometry(1.2, 8, 8), new P.MeshBasicMaterial({ visible: !1 }));
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
			if (e instanceof P.Mesh) {
				e.geometry?.dispose();
				let t = e.material;
				Array.isArray(t) ? t.forEach((e) => e.dispose()) : t?.dispose();
			}
		});
	}
}, yi = {
	critical: 16724804,
	recover: 2284902,
	warning: 16755200
}, bi = class {
	scene;
	flashes = [];
	constructor(e) {
		this.scene = e;
	}
	flash(e, t) {
		let n = yi[t], r = [];
		for (let t = 0; t < 2; t++) {
			let i = new P.RingGeometry(.3, .45, 32), a = new P.MeshBasicMaterial({
				color: n,
				transparent: !0,
				opacity: .9,
				side: P.DoubleSide,
				depthWrite: !1,
				blending: P.AdditiveBlending
			}), o = new P.Mesh(i, a);
			o.rotation.x = -Math.PI / 2, o.position.copy(e).setY(e.y + .3 + t * .05), o.userData.delay = t * .15, o.renderOrder = 500, this.scene.add(o), r.push(o);
		}
		let i = new P.CylinderGeometry(.06, .06, 4, 6), a = new P.MeshBasicMaterial({
			color: n,
			transparent: !0,
			opacity: .6,
			depthWrite: !1,
			blending: P.AdditiveBlending
		}), o = new P.Mesh(i, a);
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
}, xi = 1.25, Si = 65535;
Si << 16;
var Ci = 2 ** -24, wi = Symbol("SKIP_GENERATION"), Ti = {
	strategy: 0,
	maxDepth: 40,
	maxLeafSize: 10,
	useSharedArrayBuffer: !1,
	setBoundingBox: !0,
	onProgress: null,
	indirect: !1,
	verbose: !0,
	range: null,
	[wi]: !1
};
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/ArrayBoxUtilities.js
function U(e, t, n) {
	return n.min.x = t[e], n.min.y = t[e + 1], n.min.z = t[e + 2], n.max.x = t[e + 3], n.max.y = t[e + 4], n.max.z = t[e + 5], n;
}
function Ei(e) {
	let t = -1, n = -Infinity;
	for (let r = 0; r < 3; r++) {
		let i = e[r + 3] - e[r];
		i > n && (n = i, t = r);
	}
	return t;
}
function Di(e, t) {
	t.set(e);
}
function Oi(e, t, n) {
	let r, i;
	for (let a = 0; a < 3; a++) {
		let o = a + 3;
		r = e[a], i = t[a], n[a] = r < i ? r : i, r = e[o], i = t[o], n[o] = r > i ? r : i;
	}
}
function ki(e, t, n) {
	for (let r = 0; r < 3; r++) {
		let i = t[e + 2 * r], a = t[e + 2 * r + 1], o = i - a, s = i + a;
		o < n[r] && (n[r] = o), s > n[r + 3] && (n[r + 3] = s);
	}
}
function Ai(e) {
	let t = e[3] - e[0], n = e[4] - e[1], r = e[5] - e[2];
	return 2 * (t * n + n * r + r * t);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/nodeBufferUtils.js
function W(e, t) {
	return t[e + 15] === Si;
}
function G(e, t) {
	return t[e + 6];
}
function K(e, t) {
	return t[e + 14];
}
function q(e) {
	return e + 8;
}
function J(e, t) {
	return e + t[e + 6] * 8;
}
function ji(e, t) {
	return t[e + 7];
}
function Y(e) {
	return e;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/computeBoundsUtils.js
function Mi(e, t, n, r, i) {
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
var Ni = 32, Pi = (e, t) => e.candidate - t.candidate, Fi = /* @__PURE__ */ Array(Ni).fill().map(() => ({
	count: 0,
	bounds: new Float32Array(6),
	rightCacheBounds: new Float32Array(6),
	leftCacheBounds: new Float32Array(6),
	candidate: 0
})), Ii = /* @__PURE__ */ new Float32Array(6);
function Li(e, t, n, r, i, a) {
	let o = -1, s = 0;
	if (a === 0) o = Ei(t), o !== -1 && (s = (t[o] + t[o + 3]) / 2);
	else if (a === 1) o = Ei(e), o !== -1 && (s = Ri(n, r, i, o));
	else if (a === 2) {
		let a = Ai(e), c = xi * i, l = n.offset || 0, u = (r - l) * 6, d = (r + i - l) * 6;
		for (let e = 0; e < 3; e++) {
			let r = t[e], l = (t[e + 3] - r) / Ni;
			if (i < Ni / 4) {
				let t = [...Fi];
				t.length = i;
				let r = 0;
				for (let i = u; i < d; i += 6, r++) {
					let a = t[r];
					a.candidate = n[i + 2 * e], a.count = 0;
					let { bounds: o, leftCacheBounds: s, rightCacheBounds: c } = a;
					for (let e = 0; e < 3; e++) c[e] = Infinity, c[e + 3] = -Infinity, s[e] = Infinity, s[e + 3] = -Infinity, o[e] = Infinity, o[e + 3] = -Infinity;
					ki(i, n, o);
				}
				t.sort(Pi);
				let l = i;
				for (let e = 0; e < l; e++) {
					let n = t[e];
					for (; e + 1 < l && t[e + 1].candidate === n.candidate;) t.splice(e + 1, 1), l--;
				}
				for (let r = u; r < d; r += 6) {
					let i = n[r + 2 * e];
					for (let e = 0; e < l; e++) {
						let a = t[e];
						i >= a.candidate ? ki(r, n, a.rightCacheBounds) : (ki(r, n, a.leftCacheBounds), a.count++);
					}
				}
				for (let n = 0; n < l; n++) {
					let r = t[n], l = r.count, u = i - r.count, d = r.leftCacheBounds, f = r.rightCacheBounds, p = 0;
					l !== 0 && (p = Ai(d) / a);
					let m = 0;
					u !== 0 && (m = Ai(f) / a);
					let h = 1 + xi * (p * l + m * u);
					h < c && (o = e, c = h, s = r.candidate);
				}
			} else {
				for (let e = 0; e < Ni; e++) {
					let t = Fi[e];
					t.count = 0, t.candidate = r + l + e * l;
					let n = t.bounds;
					for (let e = 0; e < 3; e++) n[e] = Infinity, n[e + 3] = -Infinity;
				}
				for (let t = u; t < d; t += 6) {
					let i = ~~((n[t + 2 * e] - r) / l);
					i >= Ni && (i = Ni - 1);
					let a = Fi[i];
					a.count++, ki(t, n, a.bounds);
				}
				let t = Fi[Ni - 1];
				Di(t.bounds, t.rightCacheBounds);
				for (let e = Ni - 2; e >= 0; e--) {
					let t = Fi[e], n = Fi[e + 1];
					Oi(t.bounds, n.rightCacheBounds, t.rightCacheBounds);
				}
				let f = 0;
				for (let t = 0; t < Ni - 1; t++) {
					let n = Fi[t], r = n.count, l = n.bounds, u = Fi[t + 1].rightCacheBounds;
					r !== 0 && (f === 0 ? Di(l, Ii) : Oi(l, Ii, Ii)), f += r;
					let d = 0, p = 0;
					f !== 0 && (d = Ai(Ii) / a);
					let m = i - f;
					m !== 0 && (p = Ai(u) / a);
					let h = 1 + xi * (d * f + p * m);
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
function Ri(e, t, n, r) {
	let i = 0, a = e.offset;
	for (let o = t, s = t + n; o < s; o++) i += e[(o - a) * 6 + r * 2];
	return i / n;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/BVHNode.js
var zi = class {
	constructor() {
		this.boundingData = new Float32Array(6);
	}
};
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/sortUtils.js
function Bi(e, t, n, r, i, a) {
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
var Vi, Hi, Ui, Wi, Gi = 2 ** 32;
function Ki(e) {
	return "count" in e ? 1 : 1 + Ki(e.left) + Ki(e.right);
}
function qi(e, t, n) {
	return Vi = new Float32Array(n), Hi = new Uint32Array(n), Ui = new Uint16Array(n), Wi = new Uint8Array(n), Ji(e, t);
}
function Ji(e, t) {
	let n = e / 4, r = e / 2, i = "count" in t, a = t.boundingData;
	for (let e = 0; e < 6; e++) Vi[n + e] = a[e];
	if (i) return t.buffer ? (Wi.set(new Uint8Array(t.buffer), e), e + t.buffer.byteLength) : (Hi[n + 6] = t.offset, Ui[r + 14] = t.count, Ui[r + 15] = Si, e + 32);
	{
		let { left: r, right: i, splitAxis: a } = t, o = Ji(e + 32, r), s = e / 32, c = o / 32 - s;
		if (c > Gi) throw Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");
		return Hi[n + 6] = c, Hi[n + 7] = a, Ji(o, i);
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/buildTree.js
function Yi(e, t, n, r, i, a) {
	let { maxDepth: o, verbose: s, maxLeafSize: c, strategy: l, onProgress: u } = i, d = e.primitiveBuffer, f = e.primitiveBufferStride, p = new Float32Array(6), m = !1, h = new zi();
	return Mi(t, n, r, h.boundingData, p), _(h, n, r, p), h;
	function g(e) {
		u && u((e - a.offset) / a.count);
	}
	function _(e, n, r, i = null, a = 0) {
		if (!m && a >= o && (m = !0, s && console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`)), r <= c || a >= o) return g(n + r), e.offset = n, e.count = r, e;
		let u = Li(e.boundingData, i, t, n, r, l);
		if (u.axis === -1) return g(n + r), e.offset = n, e.count = r, e;
		let h = Bi(d, f, t, n, r, u);
		if (h === n || h === n + r) g(n + r), e.offset = n, e.count = r;
		else {
			e.splitAxis = u.axis;
			let i = new zi(), o = n, s = h - n;
			e.left = i, Mi(t, o, s, i.boundingData, p), _(i, o, s, p, a + 1);
			let c = new zi(), l = h, d = r - s;
			e.right = c, Mi(t, l, d, c.boundingData, p), _(c, l, d, p, a + 1);
		}
		return e;
	}
}
function Xi(e, t) {
	let n = t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer, r = e.getRootRanges(t.range), i = r[0], a = r[r.length - 1], o = {
		offset: i.offset,
		count: a.offset + a.count - i.offset
	}, s = new Float32Array(6 * o.count);
	s.offset = o.offset, e.computePrimitiveBounds(o.offset, o.count, s), e._roots = r.map((r) => {
		let i = Yi(e, s, r.offset, r.count, t, o), a = new n(32 * Ki(i));
		return qi(0, i, a), a;
	});
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/PrimitivePool.js
var Zi = class {
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
}, X = /* @__PURE__ */ new class {
	constructor() {
		this.float32Array = null, this.uint16Array = null, this.uint32Array = null;
		let e = [], t = null;
		this.setBuffer = (n) => {
			t && e.push(t), t = n, this.float32Array = new Float32Array(n), this.uint16Array = new Uint16Array(n), this.uint32Array = new Uint32Array(n);
		}, this.clearBuffer = () => {
			t = null, this.float32Array = null, this.uint16Array = null, this.uint32Array = null, e.length !== 0 && this.setBuffer(e.pop());
		};
	}
}(), Qi, $i, ea = [], ta = /* @__PURE__ */ new Zi(() => new re());
function na(e, t, n, r, i, a) {
	Qi = ta.getPrimitive(), $i = ta.getPrimitive(), ea.push(Qi, $i), X.setBuffer(e._roots[t]);
	let o = ra(0, e.geometry, n, r, i, a);
	X.clearBuffer(), ta.releasePrimitive(Qi), ta.releasePrimitive($i), ea.pop(), ea.pop();
	let s = ea.length;
	return s > 0 && ($i = ea[s - 1], Qi = ea[s - 2]), o;
}
function ra(e, t, n, r, i = null, a = 0, o = 0) {
	let { float32Array: s, uint16Array: c, uint32Array: l } = X, u = e * 2;
	if (W(u, c)) {
		let t = G(e, l), n = K(u, c);
		return U(Y(e), s, Qi), r(t, n, !1, o, a + e / 8, Qi);
	} else {
		let u = q(e), d = J(e, l), f = u, p = d, m, h, g, _;
		if (i && (g = Qi, _ = $i, U(Y(f), s, g), U(Y(p), s, _), m = i(g), h = i(_), h < m)) {
			f = d, p = u;
			let e = m;
			m = h, h = e, g = _;
		}
		g || (g = Qi, U(Y(f), s, g));
		let v = W(f * 2, c), y = n(g, v, m, o + 1, a + f / 8), b;
		if (y === 2) {
			let e = w(f);
			b = r(e, T(f) - e, !0, o + 1, a + f / 8, g);
		} else b = y && ra(f, t, n, r, i, a, o + 1);
		if (b) return !0;
		_ = $i, U(Y(p), s, _);
		let x = W(p * 2, c), S = n(_, x, h, o + 1, a + p / 8), C;
		if (S === 2) {
			let e = w(p);
			C = r(e, T(p) - e, !0, o + 1, a + p / 8, _);
		} else C = S && ra(p, t, n, r, i, a, o + 1);
		if (C) return !0;
		return !1;
		function w(e) {
			let { uint16Array: t, uint32Array: n } = X, r = e * 2;
			for (; !W(r, t);) e = q(e), r = e * 2;
			return G(e, n);
		}
		function T(e) {
			let { uint16Array: t, uint32Array: n } = X, r = e * 2;
			for (; !W(r, t);) e = J(e, n), r = e * 2;
			return G(e, n) + K(r, t);
		}
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/bvhcast.js
var ia = /* @__PURE__ */ new X.constructor(), aa = /* @__PURE__ */ new X.constructor(), oa = /* @__PURE__ */ new Zi(() => new re()), sa = /* @__PURE__ */ new re(), ca = /* @__PURE__ */ new re(), la = /* @__PURE__ */ new re(), ua = /* @__PURE__ */ new re(), da = !1;
function fa(e, t, n, r) {
	if (da) throw Error("MeshBVH: Recursive calls to bvhcast not supported.");
	da = !0;
	let i = e._roots, a = t._roots, o, s = 0, c = 0, l = new me().copy(n).invert();
	for (let e = 0, t = i.length; e < t; e++) {
		ia.setBuffer(i[e]), c = 0;
		let t = oa.getPrimitive();
		U(Y(0), ia.float32Array, t), t.applyMatrix4(l);
		for (let e = 0, i = a.length; e < i && (aa.setBuffer(a[e]), o = pa(0, 0, n, l, r, s, c, 0, 0, t), aa.clearBuffer(), c += a[e].byteLength / 32, !o); e++);
		if (oa.releasePrimitive(t), ia.clearBuffer(), s += i[e].byteLength / 32, o) break;
	}
	return da = !1, o;
}
function pa(e, t, n, r, i, a = 0, o = 0, s = 0, c = 0, l = null, u = !1) {
	let d, f;
	u ? (d = aa, f = ia) : (d = ia, f = aa);
	let p = d.float32Array, m = d.uint32Array, h = d.uint16Array, g = f.float32Array, _ = f.uint32Array, v = f.uint16Array, y = e * 2, b = t * 2, x = W(y, h), S = W(b, v), C = !1;
	if (S && x) C = u ? i(G(t, _), K(t * 2, v), G(e, m), K(e * 2, h), c, o + t / 8, s, a + e / 8) : i(G(e, m), K(e * 2, h), G(t, _), K(t * 2, v), s, a + e / 8, c, o + t / 8);
	else if (S) {
		let l = oa.getPrimitive();
		U(Y(t), g, l), l.applyMatrix4(n);
		let d = q(e), f = J(e, m);
		U(Y(d), p, sa), U(Y(f), p, ca);
		let h = l.intersectsBox(sa), _ = l.intersectsBox(ca);
		C = h && pa(t, d, r, n, i, o, a, c, s + 1, l, !u) || _ && pa(t, f, r, n, i, o, a, c, s + 1, l, !u), oa.releasePrimitive(l);
	} else {
		let d = q(t), f = J(t, _);
		U(Y(d), g, la), U(Y(f), g, ua);
		let h = l.intersectsBox(la), v = l.intersectsBox(ua);
		if (h && v) C = pa(e, d, n, r, i, a, o, s, c + 1, l, u) || pa(e, f, n, r, i, a, o, s, c + 1, l, u);
		else if (h) if (x) C = pa(e, d, n, r, i, a, o, s, c + 1, l, u);
		else {
			let t = oa.getPrimitive();
			t.copy(la).applyMatrix4(n);
			let l = q(e), f = J(e, m);
			U(Y(l), p, sa), U(Y(f), p, ca);
			let h = t.intersectsBox(sa), g = t.intersectsBox(ca);
			C = h && pa(d, l, r, n, i, o, a, c, s + 1, t, !u) || g && pa(d, f, r, n, i, o, a, c, s + 1, t, !u), oa.releasePrimitive(t);
		}
		else if (v) if (x) C = pa(e, f, n, r, i, a, o, s, c + 1, l, u);
		else {
			let t = oa.getPrimitive();
			t.copy(ua).applyMatrix4(n);
			let l = q(e), d = J(e, m);
			U(Y(l), p, sa), U(Y(d), p, ca);
			let h = t.intersectsBox(sa), g = t.intersectsBox(ca);
			C = h && pa(f, l, r, n, i, o, a, c, s + 1, t, !u) || g && pa(f, d, r, n, i, o, a, c, s + 1, t, !u), oa.releasePrimitive(t);
		}
	}
	return C;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/BVH.js
var ma = /* @__PURE__ */ new re(), ha = /* @__PURE__ */ new Float32Array(6), ga = class {
	constructor() {
		this._roots = null, this.primitiveBuffer = null, this.primitiveBufferStride = null;
	}
	init(e) {
		e = {
			...Ti,
			...e
		}, Xi(this, e);
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
			this.writePrimitiveBounds(n, ha, 0);
			let [e, t, r, u, d, f] = ha;
			e < i && (i = e), u > s && (s = u), t < a && (a = t), d > c && (c = d), r < o && (o = r), f > l && (l = f);
		}
		return n[r + 0] = i, n[r + 1] = a, n[r + 2] = o, n[r + 3] = s, n[r + 4] = c, n[r + 5] = l, n;
	}
	computePrimitiveBounds(e, t, n) {
		let r = n.offset || 0;
		for (let i = e, a = e + t; i < a; i++) {
			this.writePrimitiveBounds(i, ha, 0);
			let [e, t, a, o, s, c] = ha, l = (e + o) / 2, u = (t + s) / 2, d = (a + c) / 2, f = (o - e) / 2, p = (s - t) / 2, m = (c - a) / 2, h = (i - r) * 6;
			n[h + 0] = l, n[h + 1] = f + (Math.abs(l) + f) * Ci, n[h + 2] = u, n[h + 3] = p + (Math.abs(u) + p) * Ci, n[h + 4] = d, n[h + 5] = m + (Math.abs(d) + m) * Ci;
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
					W(2 * n, a) && (i[n + 6] += e);
				}
			}
		}
	}
	traverse(e, t = 0) {
		let n = this._roots[t], r = new Uint32Array(n), i = new Uint16Array(n);
		a(0);
		function a(t, o = 0) {
			let s = t * 2, c = W(s, i);
			if (c) {
				let a = r[t + 6], l = i[s + 14];
				e(o, c, new Float32Array(n, t * 4, 6), a, l);
			} else {
				let i = q(t), s = J(t, r), l = ji(t, r);
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
				if (W(n, i)) {
					let e = G(t, r), o = K(n, i);
					this.writePrimitiveRangeBounds(e, o, ha, 0), a.set(ha, t);
				} else {
					let e = q(t), n = J(t, r);
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
			U(0, new Float32Array(t), ma), e.union(ma);
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
			if (s = na(this, e, n, r, t, c), s) break;
			c += i.byteLength / 32;
		}
		return s;
	}
	bvhcast(e, t, n) {
		let { intersectsRanges: r } = n;
		return fa(this, e, t, r);
	}
};
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/BufferUtils.js
function _a() {
	return typeof SharedArrayBuffer < "u";
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/build/geometryUtils.js
function va(e) {
	return e.index ? e.index.count : e.attributes.position.count;
}
function ya(e) {
	return va(e) / 3;
}
function ba(e, t = ArrayBuffer) {
	return e > 65535 ? new Uint32Array(new t(4 * e)) : new Uint16Array(new t(2 * e));
}
function xa(e, t) {
	if (!e.index) {
		let n = e.attributes.position.count, r = ba(n, t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer);
		e.setIndex(new ie(r, 1));
		for (let e = 0; e < n; e++) r[e] = e;
	}
}
function Sa(e, t, n) {
	let r = va(e) / n, i = t || e.drawRange, a = i.start / n, o = (i.start + i.count) / n, s = Math.max(0, a), c = Math.min(r, o) - s;
	return {
		offset: Math.floor(s),
		count: Math.floor(c)
	};
}
function Ca(e, t) {
	return e.groups.map((e) => ({
		offset: e.start / t,
		count: e.count / t
	}));
}
function wa(e, t, n) {
	let r = Sa(e, t, n), i = Ca(e, n);
	if (!i.length) return [r];
	let a = [], o = r.offset, s = r.offset + r.count, c = va(e) / n, l = [];
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
function Ta(e, t) {
	let n = e[e.length - 1], r = n.offset + n.count > 2 ** 16, i = e.reduce((e, t) => e + t.count, 0), a = r ? 4 : 2, o = t ? new SharedArrayBuffer(i * a) : new ArrayBuffer(i * a), s = r ? new Uint32Array(o) : new Uint16Array(o), c = 0;
	for (let t = 0; t < e.length; t++) {
		let { offset: n, count: r } = e[t];
		for (let e = 0; e < r; e++) s[c + e] = n + e;
		c += r;
	}
	return s;
}
var Ea = class extends ga {
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
		if (t.useSharedArrayBuffer && !_a()) throw Error("BVH: SharedArrayBuffer is not available.");
		super(), this.geometry = e, this.resolvePrimitiveIndex = t.indirect ? (e) => this._indirectBuffer[e] : (e) => e, this.primitiveBuffer = null, this.primitiveBufferStride = null, this._indirectBuffer = null, t = {
			...Ti,
			...t
		}, t[wi] || this.init(t);
	}
	init(e) {
		let { geometry: t, primitiveStride: n } = this;
		if (e.indirect) {
			let r = Ta(wa(t, e.range, n), e.useSharedArrayBuffer);
			this._indirectBuffer = r;
		} else xa(t, e);
		super.init(e), !t.boundingBox && e.setBoundingBox && (t.boundingBox = this.getBoundingBox(new re()));
	}
	getRootRanges(e) {
		return this.indirect ? [{
			offset: 0,
			count: this._indirectBuffer.length
		}] : wa(this.geometry, e, this.primitiveStride);
	}
	raycastObject3D() {
		throw Error("BVH: raycastObject3D() not implemented");
	}
}, Da = class {
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
Da.prototype.setFromBox = (function() {
	let e = /* @__PURE__ */ new L();
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
	let e = /* @__PURE__ */ new Da();
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
var Oa = (function() {
	let e = /* @__PURE__ */ new L(), t = /* @__PURE__ */ new L(), n = /* @__PURE__ */ new L();
	return function(r, i, a) {
		let o = r.start, s = e, c = i.start, l = t;
		n.subVectors(o, c), e.subVectors(r.end, r.start), t.subVectors(i.end, i.start);
		let u = n.dot(l), d = l.dot(s), f = l.dot(l), p = n.dot(s), m = s.dot(s) * f - d * d, h, g;
		h = m === 0 ? 0 : (u * d - p * f) / m, g = (u + h * d) / f, a.x = h, a.y = g;
	};
})(), ka = (function() {
	let e = /* @__PURE__ */ new I(), t = /* @__PURE__ */ new L(), n = /* @__PURE__ */ new L();
	return function(r, i, a, o) {
		Oa(r, i, e);
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
})(), Aa = (function() {
	let e = /* @__PURE__ */ new L(), t = /* @__PURE__ */ new L(), n = /* @__PURE__ */ new _e(), r = /* @__PURE__ */ new le();
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
})(), ja = [
	"x",
	"y",
	"z"
], Ma = 1e-15, Na = Ma * Ma;
function Pa(e) {
	return Math.abs(e) < Ma;
}
var Fa = class extends Te {
	constructor(...e) {
		super(...e), this.isExtendedTriangle = !0, this.satAxes = [
			,
			,
			,
			,
		].fill().map(() => new L()), this.satBounds = [
			,
			,
			,
			,
		].fill().map(() => new Da()), this.points = [
			this.a,
			this.b,
			this.c
		], this.plane = new _e(), this.isDegenerateIntoSegment = !1, this.isDegenerateIntoPoint = !1, this.degenerateSegment = new le(), this.needsUpdate = !0;
	}
	intersectsSphere(e) {
		return Aa(e, this);
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
		this.isDegenerateIntoPoint = !1, this.isDegenerateIntoSegment = !1, m < Ma ? h < Ma || g < Ma ? this.isDegenerateIntoPoint = !0 : (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(e), this.degenerateSegment.end.copy(n)) : h < Ma ? g < Ma ? this.isDegenerateIntoPoint = !0 : (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(t), this.degenerateSegment.end.copy(e)) : g < Ma && (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(n), this.degenerateSegment.end.copy(t)), this.plane.setFromNormalAndCoplanarPoint(o, e), this.needsUpdate = !1;
	}
};
Fa.prototype.closestPointToSegment = (function() {
	let e = /* @__PURE__ */ new L(), t = /* @__PURE__ */ new L(), n = /* @__PURE__ */ new le();
	return function(r, i = null, a = null) {
		let { start: o, end: s } = r, c = this.points, l, u = Infinity;
		for (let o = 0; o < 3; o++) {
			let s = (o + 1) % 3;
			n.start.copy(c[o]), n.end.copy(c[s]), ka(n, r, e, t), l = e.distanceToSquared(t), l < u && (u = l, i && i.copy(e), a && a.copy(t));
		}
		return this.closestPointToPoint(o, e), l = o.distanceToSquared(e), l < u && (u = l, i && i.copy(e), a && a.copy(o)), this.closestPointToPoint(s, e), l = s.distanceToSquared(e), l < u && (u = l, i && i.copy(e), a && a.copy(s)), Math.sqrt(u);
	};
})(), Fa.prototype.intersectsTriangle = (function() {
	let e = /* @__PURE__ */ new Fa(), t = /* @__PURE__ */ new Da(), n = /* @__PURE__ */ new Da(), r = /* @__PURE__ */ new L(), i = /* @__PURE__ */ new L(), a = /* @__PURE__ */ new L(), o = /* @__PURE__ */ new L(), s = /* @__PURE__ */ new le(), c = /* @__PURE__ */ new le(), l = /* @__PURE__ */ new L(), u = /* @__PURE__ */ new I(), d = /* @__PURE__ */ new I();
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
		return Pa(o) ? Pa(s) ? f(e, t, n, i) : (n && (n.start.copy(a.start), n.end.copy(a.start)), e.containsPoint(a.start)) : Pa(s) ? (n && (n.start.copy(a.end), n.end.copy(a.end)), e.containsPoint(a.end)) : e.plane.intersectLine(a, r) == null ? !1 : (n && (n.start.copy(r), n.end.copy(r)), e.containsPoint(r));
	}
	function g(e, t, n) {
		let r = t.a;
		return Pa(e.plane.distanceToPoint(r)) && e.containsPoint(r) ? (n && (n.start.copy(r), n.end.copy(r)), !0) : !1;
	}
	function _(e, t, n) {
		let i = e.degenerateSegment, a = t.a;
		return i.closestPointToPoint(a, !0, r), a.distanceToSquared(r) < Na ? (n && (n.start.copy(a), n.end.copy(a)), !0) : !1;
	}
	function v(e, t, n, o) {
		if (e.isDegenerateIntoSegment) if (t.isDegenerateIntoSegment) {
			let o = e.degenerateSegment, s = t.degenerateSegment, c = i, l = a;
			o.delta(c), s.delta(l);
			let u = r.subVectors(s.start, o.start), d = c.x * l.y - c.y * l.x;
			if (Pa(d)) return !1;
			let f = (u.x * l.y - u.y * l.x) / d, p = -(c.x * u.y - c.y * u.x) / d;
			return f < 0 || f > 1 || p < 0 || p > 1 ? !1 : Pa(o.start.z + c.z * f - (s.start.z + l.z * p)) ? (n && (n.start.copy(o.start).addScaledVector(c, f), n.end.copy(o.start).addScaledVector(c, f)), !0) : !1;
		} else if (t.isDegenerateIntoPoint) return _(e, t, n);
		else return h(t, e, n, o);
		else if (e.isDegenerateIntoPoint) return t.isDegenerateIntoPoint ? t.a.distanceToSquared(e.a) < Na ? (n && (n.start.copy(e.a), n.end.copy(e.a)), !0) : !1 : t.isDegenerateIntoSegment ? _(t, e, n) : g(t, e, n);
		else if (t.isDegenerateIntoPoint) return g(e, t, n);
		else if (t.isDegenerateIntoSegment) return h(e, t, n, o);
	}
	return function(t, n = null, r = !1) {
		this.needsUpdate && this.update(), t.isExtendedTriangle ? t.needsUpdate && t.update() : (e.copy(t), e.update(), t = e);
		let o = v(this, t, n, r);
		if (o !== void 0) return o;
		let p = this.plane, h = t.plane, g = h.distanceToPoint(this.a), _ = h.distanceToPoint(this.b), y = h.distanceToPoint(this.c);
		Pa(g) && (g = 0), Pa(_) && (_ = 0), Pa(y) && (y = 0);
		let b = g * _, x = g * y;
		if (b > 0 && x > 0) return !1;
		let S = p.distanceToPoint(t.a), C = p.distanceToPoint(t.b), w = p.distanceToPoint(t.c);
		Pa(S) && (S = 0), Pa(C) && (C = 0), Pa(w) && (w = 0);
		let T = S * C, E = S * w;
		if (T > 0 && E > 0) return !1;
		i.copy(p.normal), a.copy(h.normal);
		let D = i.cross(a), O = 0, k = Math.abs(D.x), A = Math.abs(D.y);
		A > k && (k = A, O = 1), Math.abs(D.z) > k && (O = 2);
		let j = ja[O], M = this.a[j], N = this.b[j], ee = this.c[j], te = t.a[j], P = t.b[j], F = t.c[j];
		if (m(this, M, N, ee, b, x, g, _, y, u, s) || m(t, te, P, F, T, E, S, C, w, d, c)) return f(this, t, n, r);
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
})(), Fa.prototype.distanceToPoint = (function() {
	let e = /* @__PURE__ */ new L();
	return function(t) {
		return this.closestPointToPoint(t, e), t.distanceTo(e);
	};
})(), Fa.prototype.distanceToTriangle = (function() {
	let e = /* @__PURE__ */ new L(), t = /* @__PURE__ */ new L(), n = [
		"a",
		"b",
		"c"
	], r = /* @__PURE__ */ new le(), i = /* @__PURE__ */ new le();
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
				i.set(a[u], a[d]), ka(r, i, e, t);
				let f = e.distanceToSquared(t);
				f < l && (l = f, o && o.copy(e), s && s.copy(t));
			}
		}
		return Math.sqrt(l);
	};
})();
//#endregion
//#region node_modules/three-mesh-bvh/src/math/OrientedBox.js
var Z = class {
	constructor(e, t, n) {
		this.isOrientedBox = !0, this.min = new L(), this.max = new L(), this.matrix = new me(), this.invMatrix = new me(), this.points = Array(8).fill().map(() => new L()), this.satAxes = [
			,
			,
			,
		].fill().map(() => new L()), this.satBounds = [
			,
			,
			,
		].fill().map(() => new Da()), this.alignedSatBounds = [
			,
			,
			,
		].fill().map(() => new Da()), this.needsUpdate = !1, e && this.min.copy(e), t && this.max.copy(t), n && this.matrix.copy(n);
	}
	set(e, t, n) {
		this.min.copy(e), this.max.copy(t), this.matrix.copy(n), this.needsUpdate = !0;
	}
	copy(e) {
		this.min.copy(e.min), this.max.copy(e.max), this.matrix.copy(e.matrix), this.needsUpdate = !0;
	}
};
Z.prototype.update = (function() {
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
})(), Z.prototype.intersectsBox = (function() {
	let e = /* @__PURE__ */ new Da();
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
})(), Z.prototype.intersectsTriangle = (function() {
	let e = /* @__PURE__ */ new Fa(), t = [
		,
		,
		,
	], n = /* @__PURE__ */ new Da(), r = /* @__PURE__ */ new Da(), i = /* @__PURE__ */ new L();
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
})(), Z.prototype.closestPointToPoint = (function() {
	return function(e, t) {
		return this.needsUpdate && this.update(), t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix), t;
	};
})(), Z.prototype.distanceToPoint = (function() {
	let e = new L();
	return function(t) {
		return this.closestPointToPoint(t, e), t.distanceTo(e);
	};
})(), Z.prototype.distanceToBox = (function() {
	let e = [
		"x",
		"y",
		"z"
	], t = /* @__PURE__ */ Array(12).fill().map(() => new le()), n = /* @__PURE__ */ Array(12).fill().map(() => new le()), r = /* @__PURE__ */ new L(), i = /* @__PURE__ */ new L();
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
				ka(a, t, r, i);
				let o = r.distanceToSquared(i);
				if (o < p && (p = o, s && s.copy(r), c && c.copy(i), o < l)) return Math.sqrt(o);
			}
		}
		return Math.sqrt(p);
	};
})();
var Ia = /* @__PURE__ */ new class extends Zi {
	constructor() {
		super(() => new Fa());
	}
}(), La = /* @__PURE__ */ new L(), Ra = /* @__PURE__ */ new L();
function za(e, t, n = {}, r = 0, i = Infinity) {
	let a = r * r, o = i * i, s = Infinity, c = null;
	if (e.shapecast({
		boundsTraverseOrder: (e) => (La.copy(t).clamp(e.min, e.max), La.distanceToSquared(t)),
		intersectsBounds: (e, t, n) => n < s && n < o,
		intersectsTriangle: (e, n) => {
			e.closestPointToPoint(t, La);
			let r = t.distanceToSquared(La);
			return r < s && (Ra.copy(La), s = r, c = n), r < a;
		}
	}), s === Infinity) return null;
	let l = Math.sqrt(s);
	return n.point ? n.point.copy(Ra) : n.point = Ra.clone(), n.distance = l, n.faceIndex = c, n;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/ThreeRayIntersectUtilities.js
var Ba = parseInt(be) >= 169, Va = parseInt(be) <= 161, Ha = /* @__PURE__ */ new L(), Ua = /* @__PURE__ */ new L(), Wa = /* @__PURE__ */ new L(), Ga = /* @__PURE__ */ new I(), Ka = /* @__PURE__ */ new I(), qa = /* @__PURE__ */ new I(), Ja = /* @__PURE__ */ new L(), Ya = /* @__PURE__ */ new L(), Xa = /* @__PURE__ */ new L(), Za = /* @__PURE__ */ new L();
function Qa(e, t, n, r, i, a, o, s) {
	let c;
	if (c = a === F ? e.intersectTriangle(r, n, t, !0, i) : e.intersectTriangle(t, n, r, a !== oe, i), c === null) return null;
	let l = e.origin.distanceTo(i);
	return l < o || l > s ? null : {
		distance: l,
		point: i.clone()
	};
}
function $a(e, t, n, r, i, a, o, s, c, l, u) {
	Ha.fromBufferAttribute(t, a), Ua.fromBufferAttribute(t, o), Wa.fromBufferAttribute(t, s);
	let d = Qa(e, Ha, Ua, Wa, Za, c, l, u);
	if (d) {
		if (r) {
			Ga.fromBufferAttribute(r, a), Ka.fromBufferAttribute(r, o), qa.fromBufferAttribute(r, s), d.uv = new I();
			let e = Te.getInterpolation(Za, Ha, Ua, Wa, Ga, Ka, qa, d.uv);
			Ba || (d.uv = e);
		}
		if (i) {
			Ga.fromBufferAttribute(i, a), Ka.fromBufferAttribute(i, o), qa.fromBufferAttribute(i, s), d.uv1 = new I();
			let e = Te.getInterpolation(Za, Ha, Ua, Wa, Ga, Ka, qa, d.uv1);
			Ba || (d.uv1 = e), Va && (d.uv2 = d.uv1);
		}
		if (n) {
			Ja.fromBufferAttribute(n, a), Ya.fromBufferAttribute(n, o), Xa.fromBufferAttribute(n, s), d.normal = new L();
			let t = Te.getInterpolation(Za, Ha, Ua, Wa, Ja, Ya, Xa, d.normal);
			d.normal.dot(e.direction) > 0 && d.normal.multiplyScalar(-1), Ba || (d.normal = t);
		}
		let t = {
			a,
			b: o,
			c: s,
			normal: new L(),
			materialIndex: 0
		};
		if (Te.getNormal(Ha, Ua, Wa, t.normal), d.face = t, d.faceIndex = a, Ba) {
			let e = new L();
			Te.getBarycoord(Za, Ha, Ua, Wa, e), d.barycoord = e;
		}
	}
	return d;
}
function eo(e) {
	return e && e.isMaterial ? e.side : e;
}
function to(e, t, n, r, i, a, o) {
	let s = r * 3, c = s + 0, l = s + 1, u = s + 2, { index: d, groups: f } = e;
	e.index && (c = d.getX(c), l = d.getX(l), u = d.getX(u));
	let { position: p, normal: m, uv: h, uv1: g } = e.attributes;
	if (Array.isArray(t)) {
		let e = r * 3;
		for (let s = 0, d = f.length; s < d; s++) {
			let { start: d, count: _, materialIndex: v } = f[s];
			if (e >= d && e < d + _) {
				let e = eo(t[v]), s = $a(n, p, m, h, g, c, l, u, e, a, o);
				if (s) if (s.faceIndex = r, s.face.materialIndex = v, i) i.push(s);
				else return s;
			}
		}
	} else {
		let e = eo(t), s = $a(n, p, m, h, g, c, l, u, e, a, o);
		if (s) if (s.faceIndex = r, s.face.materialIndex = 0, i) i.push(s);
		else return s;
	}
	return null;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/TriangleUtilities.js
function Q(e, t, n, r) {
	let i = e.a, a = e.b, o = e.c, s = t, c = t + 1, l = t + 2;
	n && (s = n.getX(s), c = n.getX(c), l = n.getX(l)), i.x = r.getX(s), i.y = r.getY(s), i.z = r.getZ(s), a.x = r.getX(c), a.y = r.getY(c), a.z = r.getZ(c), o.x = r.getX(l), o.y = r.getY(l), o.z = r.getZ(l);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/iterationUtils.generated.js
function no(e, t, n, r, i, a, o, s) {
	let { geometry: c, _indirectBuffer: l } = e;
	for (let e = r, l = r + i; e < l; e++) to(c, t, n, e, a, o, s);
}
function ro(e, t, n, r, i, a, o) {
	let { geometry: s, _indirectBuffer: c } = e, l = Infinity, u = null;
	for (let e = r, c = r + i; e < c; e++) {
		let r;
		r = to(s, t, n, e, null, a, o), r && r.distance < l && (u = r, l = r.distance);
	}
	return u;
}
function io(e, t, n, r, i, a, o) {
	let { geometry: s } = n, { index: c } = s, l = s.attributes.position;
	for (let n = e, s = t + e; n < s; n++) {
		let e;
		if (e = n, Q(o, e * 3, c, l), o.needsUpdate = !0, r(o, e, i, a)) return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/refit.generated.js
function ao(e, t = null) {
	t && Array.isArray(t) && (t = new Set(t));
	let n = e.geometry, r = n.index ? n.index.array : null, i = n.attributes.position, a, o, s, c, l = 0, u = e._roots;
	for (let e = 0, t = u.length; e < t; e++) a = u[e], o = new Uint32Array(a), s = new Uint16Array(a), c = new Float32Array(a), d(0, l), l += a.byteLength;
	function d(e, n, a = !1) {
		let l = e * 2;
		if (W(l, s)) {
			let t = G(e, o), n = K(l, s), a = Infinity, u = Infinity, d = Infinity, f = -Infinity, p = -Infinity, m = -Infinity;
			for (let e = 3 * t, o = 3 * (t + n); e < o; e++) {
				let t = r[e], n = i.getX(t), o = i.getY(t), s = i.getZ(t);
				n < a && (a = n), n > f && (f = n), o < u && (u = o), o > p && (p = o), s < d && (d = s), s > m && (m = s);
			}
			return c[e + 0] !== a || c[e + 1] !== u || c[e + 2] !== d || c[e + 3] !== f || c[e + 4] !== p || c[e + 5] !== m ? (c[e + 0] = a, c[e + 1] = u, c[e + 2] = d, c[e + 3] = f, c[e + 4] = p, c[e + 5] = m, !0) : !1;
		} else {
			let r = q(e), i = J(e, o), s = a, l = !1, u = !1;
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
function oo(e, t, n, r, i) {
	let a, o, s, c, l, u, d = 1 / n.direction.x, f = 1 / n.direction.y, p = 1 / n.direction.z, m = n.origin.x, h = n.origin.y, g = n.origin.z, _ = t[e], v = t[e + 3], y = t[e + 1], b = t[e + 3 + 1], x = t[e + 2], S = t[e + 3 + 2];
	return d >= 0 ? (a = (_ - m) * d, o = (v - m) * d) : (a = (v - m) * d, o = (_ - m) * d), f >= 0 ? (s = (y - h) * f, c = (b - h) * f) : (s = (b - h) * f, c = (y - h) * f), a > c || s > o || ((s > a || isNaN(a)) && (a = s), (c < o || isNaN(o)) && (o = c), p >= 0 ? (l = (x - g) * p, u = (S - g) * p) : (l = (S - g) * p, u = (x - g) * p), a > u || l > o) ? !1 : ((l > a || a !== a) && (a = l), (u < o || o !== o) && (o = u), a <= i && o >= r);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/utils/iterationUtils_indirect.generated.js
function so(e, t, n, r, i, a, o, s) {
	let { geometry: c, _indirectBuffer: l } = e;
	for (let e = r, u = r + i; e < u; e++) to(c, t, n, l ? l[e] : e, a, o, s);
}
function co(e, t, n, r, i, a, o) {
	let { geometry: s, _indirectBuffer: c } = e, l = Infinity, u = null;
	for (let e = r, d = r + i; e < d; e++) {
		let r;
		r = to(s, t, n, c ? c[e] : e, null, a, o), r && r.distance < l && (u = r, l = r.distance);
	}
	return u;
}
function lo(e, t, n, r, i, a, o) {
	let { geometry: s } = n, { index: c } = s, l = s.attributes.position;
	for (let s = e, u = t + e; s < u; s++) {
		let e;
		if (e = n.resolveTriangleIndex(s), Q(o, e * 3, c, l), o.needsUpdate = !0, r(o, e, i, a)) return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycast.generated.js
function uo(e, t, n, r, i, a, o) {
	X.setBuffer(e._roots[t]), fo(0, e, n, r, i, a, o), X.clearBuffer();
}
function fo(e, t, n, r, i, a, o) {
	let { float32Array: s, uint16Array: c, uint32Array: l } = X, u = e * 2;
	if (W(u, c)) no(t, n, r, G(e, l), K(u, c), i, a, o);
	else {
		let c = q(e);
		oo(c, s, r, a, o) && fo(c, t, n, r, i, a, o);
		let u = J(e, l);
		oo(u, s, r, a, o) && fo(u, t, n, r, i, a, o);
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycastFirst.generated.js
var po = [
	"x",
	"y",
	"z"
];
function mo(e, t, n, r, i, a) {
	X.setBuffer(e._roots[t]);
	let o = ho(0, e, n, r, i, a);
	return X.clearBuffer(), o;
}
function ho(e, t, n, r, i, a) {
	let { float32Array: o, uint16Array: s, uint32Array: c } = X, l = e * 2;
	if (W(l, s)) return ro(t, n, r, G(e, c), K(l, s), i, a);
	{
		let s = ji(e, c), l = po[s], u = r.direction[l] >= 0, d, f;
		u ? (d = q(e), f = J(e, c)) : (d = J(e, c), f = q(e));
		let p = oo(d, o, r, i, a) ? ho(d, t, n, r, i, a) : null;
		if (p) {
			let e = p.point[l];
			if (u ? e <= o[f + s] : e >= o[f + s + 3]) return p;
		}
		let m = oo(f, o, r, i, a) ? ho(f, t, n, r, i, a) : null;
		return p && m ? p.distance <= m.distance ? p : m : p || m || null;
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/intersectsGeometry.generated.js
var go = /* @__PURE__ */ new re(), _o = /* @__PURE__ */ new Fa(), vo = /* @__PURE__ */ new Fa(), yo = /* @__PURE__ */ new me(), bo = /* @__PURE__ */ new Z(), xo = /* @__PURE__ */ new Z();
function So(e, t, n, r) {
	X.setBuffer(e._roots[t]);
	let i = Co(0, e, n, r);
	return X.clearBuffer(), i;
}
function Co(e, t, n, r, i = null) {
	let { float32Array: a, uint16Array: o, uint32Array: s } = X, c = e * 2;
	if (i === null && (n.boundingBox || n.computeBoundingBox(), bo.set(n.boundingBox.min, n.boundingBox.max, r), i = bo), W(c, o)) {
		let i = t.geometry, l = i.index, u = i.attributes.position, d = n.index, f = n.attributes.position, p = G(e, s), m = K(c, o);
		if (yo.copy(r).invert(), n.boundsTree) return U(Y(e), a, xo), xo.matrix.copy(yo), xo.needsUpdate = !0, n.boundsTree.shapecast({
			intersectsBounds: (e) => xo.intersectsBox(e),
			intersectsTriangle: (e) => {
				e.a.applyMatrix4(r), e.b.applyMatrix4(r), e.c.applyMatrix4(r), e.needsUpdate = !0;
				for (let t = p * 3, n = (m + p) * 3; t < n; t += 3) if (Q(vo, t, l, u), vo.needsUpdate = !0, e.intersectsTriangle(vo)) return !0;
				return !1;
			}
		});
		{
			let e = ya(n);
			for (let t = p * 3, n = (m + p) * 3; t < n; t += 3) {
				Q(_o, t, l, u), _o.a.applyMatrix4(yo), _o.b.applyMatrix4(yo), _o.c.applyMatrix4(yo), _o.needsUpdate = !0;
				for (let t = 0, n = e * 3; t < n; t += 3) if (Q(vo, t, d, f), vo.needsUpdate = !0, _o.intersectsTriangle(vo)) return !0;
			}
		}
	} else {
		let o = q(e), c = J(e, s);
		return U(Y(o), a, go), !!(i.intersectsBox(go) && Co(o, t, n, r, i) || (U(Y(c), a, go), i.intersectsBox(go) && Co(c, t, n, r, i)));
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/closestPointToGeometry.generated.js
var wo = /* @__PURE__ */ new me(), To = /* @__PURE__ */ new Z(), Eo = /* @__PURE__ */ new Z(), Do = /* @__PURE__ */ new L(), Oo = /* @__PURE__ */ new L(), ko = /* @__PURE__ */ new L(), Ao = /* @__PURE__ */ new L();
function jo(e, t, n, r = {}, i = {}, a = 0, o = Infinity) {
	t.boundingBox || t.computeBoundingBox(), To.set(t.boundingBox.min, t.boundingBox.max, n), To.needsUpdate = !0;
	let s = e.geometry, c = s.attributes.position, l = s.index, u = t.attributes.position, d = t.index, f = Ia.getPrimitive(), p = Ia.getPrimitive(), m = Do, h = Oo, g = null, _ = null;
	i && (g = ko, _ = Ao);
	let v = Infinity, y = null, b = null;
	return wo.copy(n).invert(), Eo.matrix.copy(wo), e.shapecast({
		boundsTraverseOrder: (e) => To.distanceToBox(e),
		intersectsBounds: (e, t, n) => n < v && n < o ? (t && (Eo.min.copy(e.min), Eo.max.copy(e.max), Eo.needsUpdate = !0), !0) : !1,
		intersectsRange: (e, r) => {
			if (t.boundsTree) return t.boundsTree.shapecast({
				boundsTraverseOrder: (e) => Eo.distanceToBox(e),
				intersectsBounds: (e, t, n) => n < v && n < o,
				intersectsRange: (t, i) => {
					for (let o = t, s = t + i; o < s; o++) {
						Q(p, 3 * o, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
						for (let t = e, n = e + r; t < n; t++) {
							Q(f, 3 * t, l, c), f.needsUpdate = !0;
							let e = f.distanceToTriangle(p, m, g);
							if (e < v && (h.copy(m), _ && _.copy(g), v = e, y = t, b = o), e < a) return !0;
						}
					}
				}
			});
			{
				let i = ya(t);
				for (let t = 0, o = i; t < o; t++) {
					Q(p, 3 * t, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
					for (let n = e, i = e + r; n < i; n++) {
						Q(f, 3 * n, l, c), f.needsUpdate = !0;
						let e = f.distanceToTriangle(p, m, g);
						if (e < v && (h.copy(m), _ && _.copy(g), v = e, y = n, b = t), e < a) return !0;
					}
				}
			}
		}
	}), Ia.releasePrimitive(f), Ia.releasePrimitive(p), v === Infinity ? null : (r.point ? r.point.copy(h) : r.point = h.clone(), r.distance = v, r.faceIndex = y, i && (i.point ? i.point.copy(_) : i.point = _.clone(), i.point.applyMatrix4(wo), h.applyMatrix4(wo), i.distance = h.sub(i.point).length(), i.faceIndex = b), r);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/refit_indirect.generated.js
function Mo(e, t = null) {
	t && Array.isArray(t) && (t = new Set(t));
	let n = e.geometry, r = n.index ? n.index.array : null, i = n.attributes.position, a, o, s, c, l = 0, u = e._roots;
	for (let e = 0, t = u.length; e < t; e++) a = u[e], o = new Uint32Array(a), s = new Uint16Array(a), c = new Float32Array(a), d(0, l), l += a.byteLength;
	function d(n, a, l = !1) {
		let u = n * 2;
		if (W(u, s)) {
			let t = G(n, o), a = K(u, s), l = Infinity, d = Infinity, f = Infinity, p = -Infinity, m = -Infinity, h = -Infinity;
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
			let e = q(n), r = J(n, o), i = l, s = !1, u = !1;
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
function No(e, t, n, r, i, a, o) {
	X.setBuffer(e._roots[t]), Po(0, e, n, r, i, a, o), X.clearBuffer();
}
function Po(e, t, n, r, i, a, o) {
	let { float32Array: s, uint16Array: c, uint32Array: l } = X, u = e * 2;
	if (W(u, c)) so(t, n, r, G(e, l), K(u, c), i, a, o);
	else {
		let c = q(e);
		oo(c, s, r, a, o) && Po(c, t, n, r, i, a, o);
		let u = J(e, l);
		oo(u, s, r, a, o) && Po(u, t, n, r, i, a, o);
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/raycastFirst_indirect.generated.js
var Fo = [
	"x",
	"y",
	"z"
];
function Io(e, t, n, r, i, a) {
	X.setBuffer(e._roots[t]);
	let o = Lo(0, e, n, r, i, a);
	return X.clearBuffer(), o;
}
function Lo(e, t, n, r, i, a) {
	let { float32Array: o, uint16Array: s, uint32Array: c } = X, l = e * 2;
	if (W(l, s)) return co(t, n, r, G(e, c), K(l, s), i, a);
	{
		let s = ji(e, c), l = Fo[s], u = r.direction[l] >= 0, d, f;
		u ? (d = q(e), f = J(e, c)) : (d = J(e, c), f = q(e));
		let p = oo(d, o, r, i, a) ? Lo(d, t, n, r, i, a) : null;
		if (p) {
			let e = p.point[l];
			if (u ? e <= o[f + s] : e >= o[f + s + 3]) return p;
		}
		let m = oo(f, o, r, i, a) ? Lo(f, t, n, r, i, a) : null;
		return p && m ? p.distance <= m.distance ? p : m : p || m || null;
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/intersectsGeometry_indirect.generated.js
var Ro = /* @__PURE__ */ new re(), zo = /* @__PURE__ */ new Fa(), Bo = /* @__PURE__ */ new Fa(), Vo = /* @__PURE__ */ new me(), Ho = /* @__PURE__ */ new Z(), Uo = /* @__PURE__ */ new Z();
function Wo(e, t, n, r) {
	X.setBuffer(e._roots[t]);
	let i = Go(0, e, n, r);
	return X.clearBuffer(), i;
}
function Go(e, t, n, r, i = null) {
	let { float32Array: a, uint16Array: o, uint32Array: s } = X, c = e * 2;
	if (i === null && (n.boundingBox || n.computeBoundingBox(), Ho.set(n.boundingBox.min, n.boundingBox.max, r), i = Ho), W(c, o)) {
		let i = t.geometry, l = i.index, u = i.attributes.position, d = n.index, f = n.attributes.position, p = G(e, s), m = K(c, o);
		if (Vo.copy(r).invert(), n.boundsTree) return U(Y(e), a, Uo), Uo.matrix.copy(Vo), Uo.needsUpdate = !0, n.boundsTree.shapecast({
			intersectsBounds: (e) => Uo.intersectsBox(e),
			intersectsTriangle: (e) => {
				e.a.applyMatrix4(r), e.b.applyMatrix4(r), e.c.applyMatrix4(r), e.needsUpdate = !0;
				for (let n = p, r = m + p; n < r; n++) if (Q(Bo, 3 * t.resolveTriangleIndex(n), l, u), Bo.needsUpdate = !0, e.intersectsTriangle(Bo)) return !0;
				return !1;
			}
		});
		{
			let e = ya(n);
			for (let n = p, r = m + p; n < r; n++) {
				Q(zo, 3 * t.resolveTriangleIndex(n), l, u), zo.a.applyMatrix4(Vo), zo.b.applyMatrix4(Vo), zo.c.applyMatrix4(Vo), zo.needsUpdate = !0;
				for (let t = 0, n = e * 3; t < n; t += 3) if (Q(Bo, t, d, f), Bo.needsUpdate = !0, zo.intersectsTriangle(Bo)) return !0;
			}
		}
	} else {
		let o = q(e), c = J(e, s);
		return U(Y(o), a, Ro), !!(i.intersectsBox(Ro) && Go(o, t, n, r, i) || (U(Y(c), a, Ro), i.intersectsBox(Ro) && Go(c, t, n, r, i)));
	}
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/cast/closestPointToGeometry_indirect.generated.js
var Ko = /* @__PURE__ */ new me(), qo = /* @__PURE__ */ new Z(), Jo = /* @__PURE__ */ new Z(), Yo = /* @__PURE__ */ new L(), Xo = /* @__PURE__ */ new L(), Zo = /* @__PURE__ */ new L(), Qo = /* @__PURE__ */ new L();
function $o(e, t, n, r = {}, i = {}, a = 0, o = Infinity) {
	t.boundingBox || t.computeBoundingBox(), qo.set(t.boundingBox.min, t.boundingBox.max, n), qo.needsUpdate = !0;
	let s = e.geometry, c = s.attributes.position, l = s.index, u = t.attributes.position, d = t.index, f = Ia.getPrimitive(), p = Ia.getPrimitive(), m = Yo, h = Xo, g = null, _ = null;
	i && (g = Zo, _ = Qo);
	let v = Infinity, y = null, b = null;
	return Ko.copy(n).invert(), Jo.matrix.copy(Ko), e.shapecast({
		boundsTraverseOrder: (e) => qo.distanceToBox(e),
		intersectsBounds: (e, t, n) => n < v && n < o ? (t && (Jo.min.copy(e.min), Jo.max.copy(e.max), Jo.needsUpdate = !0), !0) : !1,
		intersectsRange: (r, i) => {
			if (t.boundsTree) {
				let s = t.boundsTree;
				return s.shapecast({
					boundsTraverseOrder: (e) => Jo.distanceToBox(e),
					intersectsBounds: (e, t, n) => n < v && n < o,
					intersectsRange: (t, o) => {
						for (let x = t, S = t + o; x < S; x++) {
							Q(p, 3 * s.resolveTriangleIndex(x), d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
							for (let t = r, n = r + i; t < n; t++) {
								Q(f, 3 * e.resolveTriangleIndex(t), l, c), f.needsUpdate = !0;
								let n = f.distanceToTriangle(p, m, g);
								if (n < v && (h.copy(m), _ && _.copy(g), v = n, y = t, b = x), n < a) return !0;
							}
						}
					}
				});
			} else {
				let o = ya(t);
				for (let t = 0, s = o; t < s; t++) {
					Q(p, 3 * t, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0;
					for (let n = r, o = r + i; n < o; n++) {
						Q(f, 3 * e.resolveTriangleIndex(n), l, c), f.needsUpdate = !0;
						let r = f.distanceToTriangle(p, m, g);
						if (r < v && (h.copy(m), _ && _.copy(g), v = r, y = n, b = t), r < a) return !0;
					}
				}
			}
		}
	}), Ia.releasePrimitive(f), Ia.releasePrimitive(p), v === Infinity ? null : (r.point ? r.point.copy(h) : r.point = h.clone(), r.distance = v, r.faceIndex = y, i && (i.point ? i.point.copy(_) : i.point = _.clone(), i.point.applyMatrix4(Ko), h.applyMatrix4(Ko), i.distance = h.sub(i.point).length(), i.faceIndex = b), r);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/utils/GeometryRayIntersectUtilities.js
function es(e, t, n) {
	return e === null ? null : (e.point.applyMatrix4(t.matrixWorld), e.distance = e.point.distanceTo(n.ray.origin), e.object = t, e);
}
//#endregion
//#region node_modules/three-mesh-bvh/src/core/MeshBVH.js
var ts = /* @__PURE__ */ new Z(), ns = /* @__PURE__ */ new xe(), rs = /* @__PURE__ */ new L(), is = /* @__PURE__ */ new me(), as = /* @__PURE__ */ new L(), os = [
	"getX",
	"getY",
	"getZ"
], ss = class e extends Ea {
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
			[wi]: !0
		});
		if (s._roots = a, s._indirectBuffer = o || null, r.setIndex) {
			let e = n.getIndex();
			if (e === null) {
				let e = new ie(t.index, 1, !1);
				n.setIndex(e);
			} else e.array !== i && (e.array.set(i), e.needsUpdate = !0);
		}
		return s;
		function c(e) {
			for (let t = 0; t < e.length; t++) {
				let n = e[t], r = new Uint32Array(n), i = new Uint16Array(n);
				for (let e = 0, t = n.byteLength / 32; e < t; e++) {
					let t = 8 * e;
					W(2 * t, i) || (r[t + 6] = r[t + 6] / 8 - e);
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
			let r = a[os[e]](c), i = a[os[e]](l), o = a[os[e]](u), s = r;
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
				n[t + g + 0] = l + f, n[t + g + 1] = f + (Math.abs(l) + f) * Ci;
			}
		}
		return n;
	}
	raycastObject3D(e, t, n = []) {
		let { material: r } = e;
		if (r === void 0) return;
		is.copy(e.matrixWorld).invert(), ns.copy(t.ray).applyMatrix4(is), as.setFromMatrixScale(e.matrixWorld), rs.copy(ns.direction).multiply(as);
		let i = rs.length(), a = t.near / i, o = t.far / i;
		if (t.firstHitOnly === !0) {
			let i = this.raycastFirst(ns, r, a, o);
			i = es(i, e, t), i && n.push(i);
		} else {
			let i = this.raycast(ns, r, a, o);
			for (let r = 0, a = i.length; r < a; r++) {
				let a = es(i[r], e, t);
				a && n.push(a);
			}
		}
		return n;
	}
	refit(e = null) {
		return (this.indirect ? Mo : ao)(this, e);
	}
	raycast(e, t = se, n = 0, r = Infinity) {
		let i = this._roots, a = [], o = this.indirect ? No : uo;
		for (let s = 0, c = i.length; s < c; s++) o(this, s, t, e, a, n, r);
		return a;
	}
	raycastFirst(e, t = se, n = 0, r = Infinity) {
		let i = this._roots, a = null, o = this.indirect ? Io : mo;
		for (let s = 0, c = i.length; s < c; s++) {
			let i = o(this, s, t, e, n, r);
			i != null && (a == null || i.distance < a.distance) && (a = i);
		}
		return a;
	}
	intersectsGeometry(e, t) {
		let n = !1, r = this._roots, i = this.indirect ? Wo : So;
		for (let a = 0, o = r.length; a < o && (n = i(this, a, e, t), !n); a++);
		return n;
	}
	shapecast(e) {
		let t = Ia.getPrimitive(), n = super.shapecast({
			...e,
			intersectsPrimitive: e.intersectsTriangle,
			scratchPrimitive: t,
			iterate: this.indirect ? lo : io
		});
		return Ia.releasePrimitive(t), n;
	}
	bvhcast(t, n, r) {
		let { intersectsRanges: i, intersectsTriangles: a } = r, o = Ia.getPrimitive(), s = this.geometry.index, c = this.geometry.attributes.position, l = this.indirect ? (e) => {
			Q(o, this.resolveTriangleIndex(e) * 3, s, c);
		} : (e) => {
			Q(o, e * 3, s, c);
		}, u = Ia.getPrimitive(), d = t.geometry.index, f = t.geometry.attributes.position, p = t.indirect ? (e) => {
			Q(u, t.resolveTriangleIndex(e) * 3, d, f);
		} : (e) => {
			Q(u, e * 3, d, f);
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
		return ts.set(e.min, e.max, t), ts.needsUpdate = !0, this.shapecast({
			intersectsBounds: (e) => ts.intersectsBox(e),
			intersectsTriangle: (e) => ts.intersectsTriangle(e)
		});
	}
	intersectsSphere(e) {
		return this.shapecast({
			intersectsBounds: (t) => e.intersectsBox(t),
			intersectsTriangle: (t) => t.intersectsSphere(e)
		});
	}
	closestPointToGeometry(e, t, n = {}, r = {}, i = 0, a = Infinity) {
		return (this.indirect ? $o : jo)(this, e, t, n, r, i, a);
	}
	closestPointToPoint(e, t = {}, n = 0, r = Infinity) {
		return za(this, e, t, n, r);
	}
}, cs = {
	Mesh: he.prototype.raycast,
	Line: ce.prototype.raycast,
	LineSegments: de.prototype.raycast,
	LineLoop: ue.prototype.raycast,
	Points: ve.prototype.raycast,
	BatchedMesh: ne.prototype.raycast
}, $ = /* @__PURE__ */ new he(), ls = [];
function us(e, t) {
	if (this.isBatchedMesh) ds.call(this, e, t);
	else {
		let { geometry: n } = this;
		if (n.boundsTree) n.boundsTree.raycastObject3D(this, e, t);
		else {
			let n;
			if (this instanceof he) n = cs.Mesh;
			else if (this instanceof de) n = cs.LineSegments;
			else if (this instanceof ue) n = cs.LineLoop;
			else if (this instanceof ce) n = cs.Line;
			else if (this instanceof ve) n = cs.Points;
			else throw Error("BVH: Fallback raycast function not found.");
			n.call(this, e, t);
		}
	}
}
function ds(e, t) {
	if (this.boundsTrees) {
		let n = this.boundsTrees, r = this._drawInfo || this._instanceInfo, i = this._drawRanges || this._geometryInfo, a = this.matrixWorld;
		$.material = this.material, $.geometry = this.geometry;
		let o = $.geometry.boundsTree, s = $.geometry.drawRange;
		$.geometry.boundingSphere === null && ($.geometry.boundingSphere = new Se());
		for (let o = 0, s = r.length; o < s; o++) {
			if (!this.getVisibleAt(o)) continue;
			let s = r[o].geometryIndex;
			if ($.geometry.boundsTree = n[s], this.getMatrixAt(o, $.matrixWorld).premultiply(a), !$.geometry.boundsTree) {
				this.getBoundingBoxAt(s, $.geometry.boundingBox), this.getBoundingSphereAt(s, $.geometry.boundingSphere);
				let e = i[s];
				$.geometry.setDrawRange(e.start, e.count);
			}
			$.raycast(e, ls);
			for (let e = 0, n = ls.length; e < n; e++) {
				let n = ls[e];
				n.object = this, n.batchId = o, t.push(n);
			}
			ls.length = 0;
		}
		$.geometry.boundsTree = o, $.geometry.drawRange = s, $.material = null, $.geometry = null;
	} else cs.BatchedMesh.call(this, e, t);
}
function fs(e = {}) {
	let { type: t = ss } = e;
	return this.boundsTree = new t(this, e), this.boundsTree;
}
function ps() {
	this.boundsTree = null;
}
P.BufferGeometry.prototype.computeBoundsTree = fs, P.BufferGeometry.prototype.disposeBoundsTree = ps, P.Mesh.prototype.raycast = us;
var ms = class {
	camera;
	deviceRenderer;
	spaceRenderer;
	linkRenderer;
	raycaster = new P.Raycaster();
	pointer = new P.Vector2(-9999, -9999);
	groundPlane = new P.Plane(new P.Vector3(0, 1, 0), 0);
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
		let n = new P.Vector3();
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
}, hs = class {
	camera;
	linkRenderer;
	deviceRenderer;
	onCreate;
	state = "idle";
	sourceId = null;
	groundPlane = new P.Plane(new P.Vector3(0, 1, 0), 0);
	raycaster = new P.Raycaster();
	mouseWorld = new P.Vector3();
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
		let a = t.getBoundingClientRect(), o = new P.Vector2((e.clientX - a.left) / a.width * 2 - 1, -((e.clientY - a.top) / a.height) * 2 + 1);
		return this.raycaster.setFromCamera(o, this.camera), this.raycaster.ray.intersectPlane(this.groundPlane, this.mouseWorld), this.linkRenderer.showPreview(i, this.mouseWorld), !0;
	}
	onMouseUp(e, t) {
		return this.state === "dragging" ? this._hasMoved ? !e || !this.sourceId || e === this.sourceId ? (this.cancel(), "cancelled") : (this.onCreate(this.sourceId, e, t.clientX, t.clientY), this.cancel(), "created") : (this.cancel(), "click") : "cancelled";
	}
	cancel() {
		this.state = "idle", this.sourceId = null, this._hasMoved = !1, this.linkRenderer.hidePreview();
	}
}, gs = class {
	state = "idle";
	targetId = null;
	targetType = null;
	startX = 0;
	startY = 0;
	groundPlane = new P.Plane(new P.Vector3(0, 1, 0), 0);
	raycaster = new P.Raycaster();
	worldPos = new P.Vector3();
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
		let a = t.getBoundingClientRect(), o = new P.Vector2((e.clientX - a.left) / a.width * 2 - 1, -((e.clientY - a.top) / a.height) * 2 + 1);
		return this.raycaster.setFromCamera(o, n), this.raycaster.ray.intersectPlane(this.groundPlane, this.worldPos) ? this.worldPos.clone() : null;
	}
	onMouseUp(e, t, n) {
		if (this.state !== "dragging") return this.cancel(), null;
		let r = t.getBoundingClientRect(), i = new P.Vector2((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
		this.raycaster.setFromCamera(i, n);
		let a = new P.Vector3();
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
function _s(e) {
	return e < .5 ? 4 * e ** 3 : 1 - (-2 * e + 2) ** 3 / 2;
}
function vs(e, t, n, r, i) {
	let a = performance.now(), o = e.position.clone(), s = t.target.clone();
	function c(l) {
		let u = Math.min((l - a) / i, 1), d = _s(u);
		e.position.lerpVectors(o, n, d), t.target.lerpVectors(s, r, d), t.update(), u < 1 && requestAnimationFrame(c);
	}
	requestAnimationFrame(c);
}
var ys = class {
	camera;
	controls;
	constructor(e, t) {
		this.camera = e, this.controls = t;
	}
	flyTo(e, t, n = 750) {
		let r = t ?? e.clone().setY(0), i = e.clone();
		vs(this.camera, this.controls, i, r, n);
	}
	flyToDevice(e) {
		let t = e.clone().add(new P.Vector3(0, 10, 15)), n = e.clone().setY(1.5);
		vs(this.camera, this.controls, t, n, 700);
	}
	flyToSpace(e, t) {
		let n = Math.max(t.width, t.depth) * .9, r = e.clone().add(new P.Vector3(0, n * .7, n * .8)), i = e.clone();
		vs(this.camera, this.controls, r, i, 700);
	}
	flyToOverview() {
		vs(this.camera, this.controls, new P.Vector3(0, 60, 80), new P.Vector3(0, 0, 0), 700);
	}
}, bs = class {
	group = new P.Group();
	scene;
	pickMeshes = [];
	target = null;
	ray = new P.Raycaster();
	constructor(e) {
		this.scene = e, this.group.visible = !1, this._build(), e.add(this.group);
	}
	_build() {
		let e = new P.Mesh(new P.BoxGeometry(.2, .2, .2), new P.MeshBasicMaterial({
			color: 16777062,
			depthTest: !1,
			transparent: !0,
			opacity: .9
		}));
		e.renderOrder = 1001, e.userData.axis = "xz", this.group.add(e), this.pickMeshes.push(e), this._buildAxis("x", 16724821, new P.Vector3(1, 0, 0)), this._buildAxis("y", 4513109, new P.Vector3(0, 1, 0)), this._buildAxis("z", 3381759, new P.Vector3(0, 0, 1));
		let t = new P.Mesh(new P.PlaneGeometry(.55, .55), new P.MeshBasicMaterial({
			color: 16777062,
			depthTest: !1,
			transparent: !0,
			opacity: .22,
			side: P.DoubleSide
		}));
		t.rotation.x = -Math.PI / 2, t.position.set(.5, 0, .5), t.renderOrder = 1e3, t.userData.axis = "xz", this.group.add(t), this.pickMeshes.push(t);
	}
	_buildAxis(e, t, n) {
		let r = new P.MeshBasicMaterial({
			color: t,
			depthTest: !1,
			transparent: !0
		}), i = 1.6, a = new P.Mesh(new P.CylinderGeometry(.04, .04, i, 8), r), o = new P.Mesh(new P.ConeGeometry(.13, .4, 12), r), s = new P.Quaternion().setFromUnitVectors(new P.Vector3(0, 1, 0), n);
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
		this.scene.remove(this.group);
	}
}, xs = class {
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
}, Ss = class {
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
}, Cs = Symbol("topospace-editor-options"), ws = /* @__PURE__ */ new WeakMap(), Ts = {};
function Es(e = {}) {
	Ts = e;
}
function Ds() {
	let e = R(), t = z(), n = m(Cs, Ts), r = ws.get(e);
	return r ? r.configure(n) : (r = Os(e, t, n), ws.set(e, r)), r;
}
function Os(e, t, n = {}) {
	let r = new $r(), i = new xs({}), a = new Ss(), o, s, c, l, u, d, f, p, m, g, _, v, y = null, b = !1, x = {
		x: 0,
		y: 0
	}, S = null, C = null, w = null, T = [], E = /* @__PURE__ */ new Map(), D = [], O = n, A = 0, j = 0, M = 0;
	function N(e = {}) {
		O = e;
	}
	function ee(n, i, a) {
		b || (y = n, b = !0, e.configureSecurity({
			mode: O.mode ?? t.mode,
			features: O.features,
			permissionResolver: O.permissionResolver,
			onPermissionDenied: (e) => {
				t.addToast("Permission denied", "warning"), O.onPermissionDenied?.(e);
			},
			onChange: O.onChange
		}), t.setMode(O.mode ?? t.mode), r.init(n, i, a, { onError: (e, t) => O.onError?.(e, t) }), o = new ai(r.scene), s = new si(r.scene), c = new ui(r.scene), l = new mi(r.scene), u = new hi(r.scene), d = new vi(r.scene), f = new bi(r.scene), v = new ys(r.camera, r.controls), g = new gs(), p = new ms(r.camera, o, s, c), m = new hs(r.camera, c, o, (e, n, r, i) => t.showContextMenu(r, i, e, n)), _ = new bs(r.scene), O.data ? e.replaceData(O.data) : O.mockData !== !1 && e.loadMockData(), h(() => te()), ne(n), re(), se(), O.onReady?.());
	}
	function te() {
		s.loadSpaces([...e.spaces.values()]), o.loadInstanced([...e.devices.values()], e.mappings, (t) => e.getMappingByDeviceId(t)), c.loadLinks([...e.links.values()], (e) => o.getDeviceWorldPos(e)), F(), d.loadNodes([...e.virtualNodes.values()]);
	}
	function F() {
		l.syncLinks([...e.links.values()], (e) => c.getLinkPath(e), (t) => e.devices.get(t)?.metrics?.networkOut ?? 100);
	}
	function ne(e) {
		e.addEventListener("pointerdown", ue), e.addEventListener("pointermove", de), e.addEventListener("pointerup", fe), e.addEventListener("contextmenu", I), window.addEventListener("keydown", pe);
	}
	function re() {
		e.devices.forEach((e) => E.set(e.id, e.status ?? "unknown")), D.push(k(() => {
			let t = "";
			return e.devices.forEach((e) => {
				t += `${e.id}:${e.status};`;
			}), t;
		}, () => {
			e.devices.forEach((e) => {
				let t = e.status ?? "unknown", n = E.get(e.id);
				if (o.updateStatus(e.id, t), n !== void 0 && n !== t) {
					let r = o.getDeviceWorldPos(e.id);
					r && (t === "critical" || t === "offline" ? f.flash(r, "critical") : t === "warning" ? f.flash(r, "warning") : t === "normal" && (n === "critical" || n === "warning" || n === "offline") && f.flash(r, "recover"));
				}
				E.set(e.id, t);
			});
		})), D.push(k(() => e.links.size, () => ge())), D.push(k(() => [...t.visibleLinkTypes], (e) => {
			[
				"physical",
				"logical",
				"service_dependency",
				"traffic_flow",
				"security_path",
				"manual",
				"inferred"
			].forEach((t) => c.setVisible(t, e.includes(t)));
		})), D.push(k(() => t.hoveredId, (e, n) => {
			n && (o.setHighlight(n, !1), c.setHighlight(null, n)), e && (t.selection?.type === "link" ? c.setHighlight(e, null) : o.setHighlight(e, !0));
		})), D.push(k(() => t.selection, (n, r) => {
			if (r?.type === "space" && s.setSelected(r.id, !1), r?.type === "link" && c.setSelected(null), t.mode === "edit" && n && (n.type === "device" || n.type === "space") ? ae(n) : _?.detach(), !n) {
				u.clear(), t.blastSourceId = null, t.showRackServerList = !1;
				return;
			}
			if (n.type === "device") {
				let r = e.devices.get(n.id);
				r && (r.status === "critical" || r.status === "warning") && t.showBlastRadius ? he(n.id) : u.clear();
				let i = e.getMappingByDeviceId(n.id);
				i?.primarySpaceId && (t.selectedRackForList = i.primarySpaceId, t.showRackServerList = !0);
			} else n.type === "space" ? (s.setSelected(n.id, !0), e.spaces.get(n.id)?.type === "rack" ? (t.selectedRackForList = n.id, t.showRackServerList = !0) : t.showRackServerList = !1) : n.type === "link" && c.setSelected(n.id);
		})), D.push(k(() => t.mode, (n) => {
			e.setEditorMode(n), n === "view" ? (_?.detach(), m?.cancel(), g?.cancel(), S = null, C = null, w = null, T = []) : t.selection && (t.selection.type === "device" || t.selection.type === "space") && ae(t.selection);
		}, { immediate: !0 })), D.push(k(() => t.linkToolActive, (e) => {
			e || m.cancel(), y && (y.style.cursor = e ? "crosshair" : ""), e && t.addToast("Connect mode on — drag from one device to another", "info");
		})), D.push(k(() => t.showParticles, (e) => l.setVisible(e))), D.push(k(() => t.showBlastRadius, (e) => {
			e || u.clear();
		})), D.push(k(() => e.virtualNodes.size, () => {
			d.dispose(), d = new vi(r.scene), d.loadNodes([...e.virtualNodes.values()]);
		})), D.push(k(() => t.timelineFrameIdx, (t) => {
			if (t < 0) return;
			let n = a.getFrame(t);
			n && Object.entries(n.states).forEach(([t, n]) => e.updateDeviceStatus(t, n.status, n.metrics));
		})), D.push(k(() => e.spaces.size, () => e.spaces.forEach((e) => s.addSpace(e)))), D.push(k(() => `${t.filter.search}|${t.filter.status.join(",")}|${t.filter.type.join(",")}`, () => oe()));
	}
	function ie(e, t) {
		if (!y) return null;
		let n = y.getBoundingClientRect(), i = new P.Vector2((e.clientX - n.left) / n.width * 2 - 1, -((e.clientY - n.top) / n.height) * 2 + 1), a = new P.Raycaster();
		a.setFromCamera(i, r.camera);
		let o = new P.Vector3();
		r.camera.getWorldDirection(o), o.y = 0, o.lengthSq() < 1e-6 && o.set(0, 0, 1), o.normalize();
		let s = new P.Plane().setFromNormalAndCoplanarPoint(o, t), c = new P.Vector3();
		return a.ray.intersectPlane(s, c) ? c : null;
	}
	function ae(n) {
		if (_) {
			if (t.mode !== "edit") {
				_.detach();
				return;
			}
			if (n.type === "device") {
				let e = o.getDeviceWorldPos(n.id);
				e && _.attach({
					type: "device",
					id: n.id
				}, e);
			} else if (n.type === "space") {
				let t = e.spaces.get(n.id);
				t?.position ? _.attach({
					type: "space",
					id: n.id
				}, new P.Vector3(t.position.x, 0, t.position.z)) : _.detach();
			} else _.detach();
		}
	}
	function oe() {
		let n = t.filter, r = n.search.toLowerCase().trim();
		if (!(r || n.status.length > 0 || n.type.length > 0)) {
			o.applySearchFilter(/* @__PURE__ */ new Set(), !1);
			return;
		}
		let i = /* @__PURE__ */ new Set();
		e.devices.forEach((e) => {
			let t = !r || (e.hostname ?? "").toLowerCase().includes(r) || (e.ip ?? "").includes(r), a = !n.status.length || n.status.includes(e.status ?? "unknown"), o = !n.type.length || n.type.includes(e.normalizedType ?? "unknown");
			t && a && o && i.add(e.id);
		}), o.applySearchFilter(i, !0), o.setSearchFocus(i, (t) => {
			let n = e.devices.get(t);
			return n?.hostname ?? n?.ip ?? t;
		});
	}
	function se() {
		r.startLoop((n, i) => {
			if (le(n, i), c.update(n), u.update(n), d.update(i), f.update(n), _.update(r.camera), t.showParticles && l.update(n, t.visibleLinkTypes), ce() || e.devices.forEach((e) => {
				e.status === "warning" && o.pulseStatus(e.id, "warning", .4 * Math.abs(Math.sin(i * 1.6))), e.status === "critical" && o.pulseStatus(e.id, "critical", .7 * Math.abs(Math.sin(i * 4)));
			}), !S && !m.isDrawing && !g.hasPending) {
				let e = p.castHover(32), n = e.deviceId ?? e.linkId ?? e.linkHandleId ?? null;
				n !== t.hoveredId && (t.hoveredId = n);
			}
		});
	}
	function ce() {
		return !!t.filter.search.trim() || t.filter.status.length > 0 || t.filter.type.length > 0;
	}
	function le(t, n) {
		j += 1, A ||= n;
		let r = n - A;
		if (r < 5) return;
		let i = j / r, a = performance.now();
		i < 30 && a - M > 15e3 && (M = a, O.onPerformanceWarning?.({
			type: "low-fps",
			fps: Math.round(i * 10) / 10,
			frameMs: Math.round(t * 1e4) / 10,
			devices: e.devices.size,
			links: e.links.size
		})), A = n, j = 0;
	}
	function ue(n) {
		if (!y) return;
		if (x = {
			x: n.clientX,
			y: n.clientY
		}, p.updatePointer(n, y), t.mode === "edit" && _.isVisible) {
			let t = _.pickAxis(p.currentPointer, r.camera);
			if (t) {
				S = t, w = _.position, C = t === "y" ? ie(n, w) : p.getGroundPoint(n, y);
				let i = _.currentTarget;
				if (T = [], i?.type === "space") {
					let t = w.clone();
					(e.devicesBySpace.get(i.id) ?? []).forEach((e) => {
						let n = o.getDeviceWorldPos(e.id);
						n && T.push({
							id: e.id,
							offset: n.clone().sub(t)
						});
					});
				}
				r.controls.enabled = !1;
				return;
			}
		}
		let i = p.castClick(t.linkToolActive);
		if (t.mode === "edit" && t.linkToolActive && i.deviceId) {
			m.onMouseDown(i.deviceId, n), r.controls.enabled = !1;
			return;
		}
		if (t.mode === "edit" && i.linkHandleId) {
			g.onMouseDown(i.linkHandleId, "linkHandle", n), r.controls.enabled = !1;
			return;
		}
		r.controls.enabled = !0;
	}
	function de(e) {
		if (!y) return;
		if (p.updatePointer(e, y), t.mode === "edit" && S && C && w) {
			let t = S === "y" ? ie(e, w) : p.getGroundPoint(e, y);
			if (t) {
				let e = t.clone().sub(C), n = w.clone();
				(S === "x" || S === "xz") && (n.x += e.x), (S === "z" || S === "xz") && (n.z += e.z), S === "y" && (n.y = Math.max(0, w.y + e.y)), _.setPosition(n);
				let r = _.currentTarget;
				r?.type === "device" ? (o.setPosition(r.id, n), c.refreshPositions((e) => o.getDeviceWorldPos(e)), F()) : r?.type === "space" && (s.setPosition(r.id, n), T.forEach((e) => o.setPosition(e.id, n.clone().add(e.offset))), c.refreshPositions((e) => o.getDeviceWorldPos(e)), F());
			}
			return;
		}
		if (t.mode === "edit" && t.linkToolActive && m.isDrawing) {
			m.onMouseMove(e, y);
			return;
		}
		if (t.mode === "edit" && g.hasPending) {
			let t = g.onMouseMove(e, y, r.camera);
			if (t && g.isDragging) {
				let e = g.currentTarget;
				e.type === "device" ? o.setPosition(e.id, t) : e.type === "space" ? s.setPosition(e.id, t) : e.type === "linkHandle" && (c.updateMidpoint(e.id, t.x, t.z), F());
				return;
			}
		}
		if (t.mode === "edit" && _.isVisible && _.isHovering(p.currentPointer, r.camera)) {
			t.hideTooltip(), y.style.cursor = "move";
			return;
		}
		let n = p.castHover(24);
		n.deviceId ? (t.showTooltipAt(e.clientX, e.clientY, n.deviceId), y.style.cursor = t.linkToolActive ? "crosshair" : "pointer") : n.linkHandleId || n.linkId ? (t.hideTooltip(), y.style.cursor = t.mode === "edit" ? "move" : "pointer") : (t.hideTooltip(), y.style.cursor = t.linkToolActive ? "crosshair" : "");
	}
	function fe(n) {
		if (!y) return;
		if (r.controls.enabled = !0, t.mode === "edit" && S) {
			let n = _.currentTarget, r = _.position;
			n?.type === "device" ? (e.mapDevice(n.id, e.getMappingByDeviceId(n.id)?.primarySpaceId ?? "", 0, {
				x: r.x,
				y: r.y,
				z: r.z
			}), e.logChange("layout.update", `Device moved: ${n.id}`), t.addToast("Device moved", "success")) : n?.type === "space" && (e.updateSpace(n.id, { position: {
				x: r.x,
				y: r.y,
				z: r.z
			} }), T.forEach((t) => {
				let i = r.clone().add(t.offset);
				e.mapDevice(t.id, e.getMappingByDeviceId(t.id)?.primarySpaceId ?? n.id, 0, {
					x: i.x,
					y: i.y,
					z: i.z
				});
			}), e.logChange("space.update", `Space moved: ${n.id} (+${T.length} devices)`), t.addToast("Space moved", "success")), c.refreshPositions((e) => o.getDeviceWorldPos(e)), F(), S = null, C = null, w = null, T = [];
			return;
		}
		p.updatePointer(n, y);
		let i = p.castClick(t.linkToolActive);
		if (t.mode === "edit" && t.linkToolActive && m.isDrawing) {
			m.onMouseUp(i.deviceId ?? null, n);
			return;
		}
		if (t.mode === "edit" && g.hasPending) {
			let i = g.onMouseUp(n, y, r.camera);
			if (i) {
				let { targetId: n, targetType: r, newPos: a } = i;
				r === "device" ? (e.mapDevice(n, e.getMappingByDeviceId(n)?.primarySpaceId ?? "", 0, {
					x: a.x,
					y: 0,
					z: a.z
				}), e.logChange("layout.update", `Device moved: ${n}`), t.addToast("Device moved", "success"), ge()) : r === "space" ? (e.updateSpace(n, { position: {
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
		let a = n.clientX - x.x, s = n.clientY - x.y;
		Math.sqrt(a * a + s * s) > 8 || (i.deviceId ? t.select({
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
	function pe(n) {
		if (n.key === "Escape") {
			t.select(null), t.hideContextMenu(), m.cancel(), g.cancel(), r.controls.enabled = !0, u.clear(), t.blastSourceId = null;
			return;
		}
		if (n.key === "f" || n.key === "F") {
			v.flyToOverview();
			return;
		}
		if ((n.key === "l" || n.key === "L") && !me()) {
			t.mode === "edit" && t.toggleLinkTool();
			return;
		}
		if (t.mode === "edit" && (n.key === "Delete" || n.key === "Backspace") && !me()) {
			n.preventDefault();
			let r = t.selection;
			if (!r) return;
			r.type === "device" ? (e.unmapDevice(r.id), e.logChange("device.unmap", `Device removed: ${r.id}`), t.addToast("Device removed", "info"), t.select(null)) : r.type === "link" ? (e.removeLink(r.id), e.logChange("topology.link.delete", `Link deleted: ${r.id}`), t.addToast("Link deleted", "info"), t.select(null)) : r.type === "space" && (e.archiveSpace(r.id), e.logChange("space.archive", `Space archived: ${r.id}`), t.addToast("Space archived", "info"), t.select(null));
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
	function me() {
		let e = document.activeElement;
		return e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement;
	}
	function he(n) {
		let r = [], i = [...e.links.values()];
		i.forEach((e) => {
			let t = e.sourceDeviceId === n, a = e.targetDeviceId === n;
			if (!t && !a) return;
			let o = t ? e.targetDeviceId : e.sourceDeviceId;
			r.find((e) => e.deviceId === o) || r.push({
				deviceId: o,
				hop: 1,
				linkedDeviceId: n
			}), i.forEach((e) => {
				let t = e.sourceDeviceId === o, i = e.targetDeviceId === o;
				if (!t && !i) return;
				let a = t ? e.targetDeviceId : e.sourceDeviceId;
				a !== n && !r.find((e) => e.deviceId === a) && r.push({
					deviceId: a,
					hop: 2,
					linkedDeviceId: o
				});
			});
		}), u.show(r, (e) => o.getDeviceWorldPos(e)), t.blastSourceId = n;
	}
	function ge() {
		c.dispose(), c = new ui(r.scene), c.loadLinks([...e.links.values()], (e) => o.getDeviceWorldPos(e)), [
			"physical",
			"logical",
			"service_dependency",
			"traffic_flow",
			"security_path",
			"manual",
			"inferred"
		].forEach((e) => c.setVisible(e, t.visibleLinkTypes.has(e))), F(), p = new ms(r.camera, o, s, c), m = new hs(r.camera, c, o, (e, t, n, r) => z().showContextMenu(n, r, e, t));
	}
	function _e(n, i) {
		if (!y) return;
		if (t.mode !== "edit") {
			t.addToast("Switch to Edit mode to place devices", "warning");
			return;
		}
		let a = y.getBoundingClientRect(), s = new P.Vector2((i.clientX - a.left) / a.width * 2 - 1, -((i.clientY - a.top) / a.height) * 2 + 1), c = new P.Raycaster();
		c.setFromCamera(s, r.camera);
		let l = new P.Plane(new P.Vector3(0, 1, 0), 0), u = new P.Vector3(), d = r.controls.target, f = u;
		(!c.ray.intersectPlane(l, u) || u.distanceTo(d) > 60) && (f = d.clone().setY(0)), e.mapDevice(n, "", 0, {
			x: f.x,
			y: .4,
			z: f.z
		}), e.logChange("device.map", `Device placed: ${n}`), t.addToast("Device placed", "success"), h(() => {
			let r = e.devices.get(n), i = e.getMappingByDeviceId(n);
			r && i?.position && (o.loadInstanced([r], e.mappings, (t) => e.getMappingByDeviceId(t)), t.select({
				type: "device",
				id: n
			}));
		});
	}
	function ve(n, r, i) {
		if (t.mode !== "edit") {
			t.addToast("Switch to Edit mode to create links", "warning"), z().hideContextMenu();
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
		}), e.logChange("topology.link.create", `Link created: ${i}`), t.addToast(`${i} link created`, "success"), z().hideContextMenu();
	}
	function ye(n) {
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
	function be(e) {
		v.flyTo(new P.Vector3(e.cameraPos.x, e.cameraPos.y, e.cameraPos.z), new P.Vector3(e.cameraTarget.x, e.cameraTarget.y, e.cameraTarget.z));
	}
	function xe(e) {
		let t = d.getNodeWorldPos(e);
		t && v.flyToDevice(t);
	}
	function Se(t) {
		if (t < 0) return;
		let n = a.getFrame(t);
		n && Object.entries(n.states).forEach(([t, n]) => e.updateDeviceStatus(t, n.status, n.metrics));
	}
	function Ce() {
		s.dispose(), s = new si(r.scene), s.loadSpaces([...e.spaces.values()]), o.dispose(), o = new ai(r.scene), o.loadInstanced([...e.devices.values()], e.mappings, (t) => e.getMappingByDeviceId(t)), c.dispose(), c = new ui(r.scene), c.loadLinks([...e.links.values()], (e) => o.getDeviceWorldPos(e)), [
			"physical",
			"logical",
			"service_dependency",
			"traffic_flow",
			"security_path",
			"manual",
			"inferred"
		].forEach((e) => c.setVisible(e, t.visibleLinkTypes.has(e))), F(), p = new ms(r.camera, o, s, c), m = new hs(r.camera, c, o, (e, t, n, r) => z().showContextMenu(n, r, e, t)), v.flyToOverview();
	}
	function we(n) {
		let r = e.spaces.get(n);
		s.removeSpace(n), r && !r.archived && (s.addSpace(r), t.selection?.type === "space" && t.selection.id === n && s.setSelected(n, !0));
	}
	function Te() {
		b = !1, D.splice(0).forEach((e) => e()), y?.removeEventListener("pointerdown", ue), y?.removeEventListener("pointermove", de), y?.removeEventListener("pointerup", fe), y?.removeEventListener("contextmenu", I), window.removeEventListener("keydown", pe), _?.dispose(), o?.dispose(), s?.dispose(), c?.dispose(), l?.dispose(), u?.dispose(), d?.dispose(), f?.dispose(), r.dispose(), y = null, E.clear();
	}
	function I(e) {
		e.preventDefault();
	}
	return {
		configure: N,
		init: ee,
		dispose: Te,
		dropDeviceAt: _e,
		confirmCreateLink: ve,
		saveCurrentView: ye,
		loadSavedView: be,
		focusVirtualNode: xe,
		onTimelineScrub: Se,
		refreshSpace: we,
		rebuildAll: Ce,
		timeline: a,
		getScene: () => r
	};
}
//#endregion
//#region src/components/layout/SpacePropertyPanel.vue?vue&type=script&setup=true&lang.ts
var ks = {
	key: 0,
	class: "panel"
}, As = { class: "panel-head" }, js = { class: "kind-tag" }, Ms = { class: "sp-name" }, Ns = { class: "panel-body" }, Ps = {
	key: 0,
	class: "section"
}, Fs = { class: "info-grid" }, Is = { class: "v" }, Ls = { class: "v" }, Rs = { class: "v" }, zs = { class: "section" }, Bs = {
	key: 1,
	class: "section"
}, Vs = { class: "slider-row" }, Hs = ["min", "max"], Us = { class: "s-val" }, Ws = { class: "slider-row" }, Gs = ["min", "max"], Ks = { class: "s-val" }, qs = {
	key: 2,
	class: "section actions"
}, Js = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "SpacePropertyPanel",
	setup(e) {
		let t = R(), n = z(), { refreshSpace: r } = Ds(), a = i(() => n.selectedSpaceId ? t.spaces.get(n.selectedSpaceId) ?? null : null), o = i(() => n.selectedSpaceId ? t.devicesBySpace.get(n.selectedSpaceId)?.length ?? 0 : 0), u = S(""), f = S(10), p = S(10), m = i(() => {
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
		k(a, (e) => {
			u.value = e?.name ?? "", f.value = e?.size?.width ?? 10, p.value = e?.size?.depth ?? 10;
		}, { immediate: !0 });
		function h() {
			n.mode === "edit" && a.value && t.updateSpace(a.value.id, { name: u.value });
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
		return (e, t) => a.value ? (b(), c("aside", ks, [l("div", As, [
			l("span", js, w(a.value.type.toUpperCase()), 1),
			l("span", Ms, w(a.value.name), 1),
			l("button", {
				class: "close-btn",
				onClick: t[0] ||= (e) => T(n).select(null),
				title: "Close"
			}, "✕")
		]), l("div", Ns, [
			T(n).mode === "edit" ? (b(), c("section", Ps, [t[10] ||= l("div", { class: "sec-title" }, "Info", -1), l("div", Fs, [
				t[4] ||= l("span", { class: "k" }, "Kind", -1),
				t[5] ||= d(),
				l("span", Is, w(a.value.kind), 1),
				t[6] ||= l("span", { class: "k" }, "Type", -1),
				t[7] ||= d(),
				l("span", Ls, w(a.value.type), 1),
				t[8] ||= l("span", { class: "k" }, "Devices", -1),
				t[9] ||= d(),
				l("span", Rs, w(o.value), 1)
			])])) : s("", !0),
			l("section", zs, [t[11] ||= l("div", { class: "sec-title" }, "Name", -1), j(l("input", {
				"onUpdate:modelValue": t[1] ||= (e) => u.value = e,
				class: "inp",
				onChange: h
			}, null, 544), [[O, u.value]])]),
			T(n).mode === "edit" && a.value.size ? (b(), c("section", Bs, [
				t[14] ||= l("div", { class: "sec-title" }, "Size", -1),
				l("div", Vs, [
					t[12] ||= l("span", { class: "s-label" }, "Width", -1),
					j(l("input", {
						type: "range",
						min: m.value.min,
						max: m.value.max,
						step: "0.5",
						"onUpdate:modelValue": t[2] ||= (e) => f.value = e,
						class: "slider",
						onInput: g
					}, null, 40, Hs), [[
						O,
						f.value,
						void 0,
						{ number: !0 }
					]]),
					l("span", Us, w(f.value.toFixed(1)), 1)
				]),
				l("div", Ws, [
					t[13] ||= l("span", { class: "s-label" }, "Depth", -1),
					j(l("input", {
						type: "range",
						min: m.value.min,
						max: m.value.max,
						step: "0.5",
						"onUpdate:modelValue": t[3] ||= (e) => p.value = e,
						class: "slider",
						onInput: g
					}, null, 40, Gs), [[
						O,
						p.value,
						void 0,
						{ number: !0 }
					]]),
					l("span", Ks, w(p.value.toFixed(1)), 1)
				])
			])) : s("", !0),
			T(n).mode === "edit" ? (b(), c("section", qs, [l("button", {
				class: "act-btn archive",
				onClick: _
			}, "Archive space")])) : s("", !0)
		])])) : s("", !0);
	}
}), [["__scopeId", "data-v-81aa61b6"]]), Ys = { class: "sv-panel" }, Xs = { class: "sv-head" }, Zs = {
	key: 0,
	class: "sv-empty"
}, Qs = { class: "sv-list" }, $s = ["onClick"], ec = { class: "sv-name" }, tc = { class: "sv-time" }, nc = ["onClick"], rc = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "SavedViewPanel",
	emits: ["load-view", "save-view"],
	setup(t, { emit: n }) {
		let r = R(), i = z(), a = n;
		function o() {
			let e = prompt("Enter a view name:", `View-${r.savedViews.length + 1}`) ?? "";
			e && a("save-view", e);
		}
		function u(e) {
			a("load-view", e);
		}
		return (t, n) => (b(), c("div", Ys, [
			l("div", Xs, [
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
			T(r).savedViews.length ? s("", !0) : (b(), c("div", Zs, "No saved views")),
			l("div", Qs, [(b(!0), c(e, null, C(T(r).savedViews, (e) => (b(), c("div", {
				key: e.id,
				class: "sv-row"
			}, [l("div", {
				class: "sv-info",
				onClick: (t) => u(e)
			}, [l("div", ec, w(e.name), 1), l("div", tc, w(e.createdAt), 1)], 8, $s), l("button", {
				class: "del-btn",
				onClick: (t) => T(r).removeSavedView(e.id)
			}, "✕", 8, nc)]))), 128))])
		]));
	}
}), [["__scopeId", "data-v-2125ec23"]]), ic = { class: "cl-panel" }, ac = { class: "cl-head" }, oc = {
	key: 0,
	class: "cl-empty"
}, sc = { class: "cl-list" }, cc = { class: "cl-msg" }, lc = { class: "cl-ts" }, uc = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "ChangeLogPanel",
	setup(t) {
		let n = R(), r = z();
		function i(e) {
			return e.includes("link") ? "link" : e.includes("space") ? "space" : e.includes("device") ? "device" : "other";
		}
		return (t, a) => (b(), c("div", ic, [
			l("div", ac, [
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
			T(n).changeLog.length ? s("", !0) : (b(), c("div", oc, "No changes yet")),
			l("div", sc, [(b(!0), c(e, null, C(T(n).changeLog, (e) => (b(), c("div", {
				key: e.id,
				class: "cl-row"
			}, [
				l("span", { class: g(["cl-type", i(e.type)]) }, w(e.type), 3),
				l("span", cc, w(e.msg), 1),
				l("span", lc, w(e.ts), 1)
			]))), 128))])
		]));
	}
}), [["__scopeId", "data-v-af7488dc"]]), dc = { class: "vn-panel" }, fc = { class: "vn-head" }, pc = { class: "vn-list" }, mc = ["onClick"], hc = { class: "vn-tag" }, gc = { class: "vn-label" }, _c = ["onClick"], vc = {
	key: 0,
	class: "vn-empty"
}, yc = {
	key: 0,
	class: "add-form"
}, bc = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "VirtualNodePanel",
	emits: ["select-node"],
	setup(t, { emit: r }) {
		let a = R(), o = z(), u = r, d = S(!1), p = S("internet"), m = S(""), h = i(() => [...a.virtualNodes.values()]);
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
		return (t, r) => (b(), c("div", dc, [
			l("div", fc, [
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
			l("div", pc, [(b(!0), c(e, null, C(h.value, (e) => (b(), c("div", {
				key: e.id,
				class: "vn-row",
				onClick: (t) => v(e.id)
			}, [
				l("span", hc, w(e.type.slice(0, 3).toUpperCase()), 1),
				l("span", gc, w(e.label), 1),
				T(o).mode === "edit" ? (b(), c("button", {
					key: 0,
					class: "del-btn",
					onClick: N((t) => _(e.id), ["stop"])
				}, "x", 8, _c)) : s("", !0)
			], 8, mc))), 128)), h.value.length ? s("", !0) : (b(), c("div", vc, "No virtual nodes"))]),
			f(n, { name: "fade" }, {
				default: A(() => [T(o).mode === "edit" && d.value ? (b(), c("div", yc, [
					j(l("select", {
						"onUpdate:modelValue": r[2] ||= (e) => p.value = e,
						class: "add-sel"
					}, [...r[5] ||= [
						l("option", { value: "internet" }, "Internet", -1),
						l("option", { value: "cloud" }, "Cloud", -1),
						l("option", { value: "external" }, "External", -1),
						l("option", { value: "custom" }, "Custom", -1)
					]], 512), [[D, p.value]]),
					j(l("input", {
						"onUpdate:modelValue": r[3] ||= (e) => m.value = e,
						class: "add-input",
						placeholder: "Name",
						onKeydown: M(g, ["enter"])
					}, null, 544), [[O, m.value]]),
					l("button", {
						class: "add-btn",
						onClick: g
					}, "Add")
				])) : s("", !0)]),
				_: 1
			})
		]));
	}
}), [["__scopeId", "data-v-9b02530a"]]), xc = {
	key: 0,
	class: "tl-panel"
}, Sc = { class: "tl-head" }, Cc = {
	key: 0,
	class: "tl-info"
}, wc = {
	key: 0,
	class: "tl-slider-wrap"
}, Tc = ["max"], Ec = { class: "tl-label" }, Dc = {
	key: 1,
	class: "tl-replay-banner"
}, Oc = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "TimelinePanel",
	props: { timeline: {} },
	emits: ["scrub", "live"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = z(), o = R(), u = S(null), f = i(() => n.timeline.isRecording), p = i(() => n.timeline.frameCount), m = i(() => a.timelineFrameIdx < 0 ? null : n.timeline.getFrame(a.timelineFrameIdx));
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
			let t = e.target.files?.[0];
			if (!t) return;
			let n = new FileReader();
			n.onload = (e) => {
				try {
					let n = JSON.parse(e.target?.result);
					o.importSnapshot(n), o.logChange("import", `Layout imported: ${t.name}`);
				} catch {
					alert("Invalid file format");
				}
			}, n.readAsText(t);
		}
		function E(e, t) {
			let n = document.createElement("a");
			n.href = URL.createObjectURL(new Blob([e], { type: "application/json" })), n.download = t, n.click(), URL.revokeObjectURL(n.href);
		}
		return (e, t) => T(a).showTimeline ? (b(), c("div", xc, [
			l("div", Sc, [
				l("button", {
					class: g(["tl-btn", f.value ? "rec" : ""]),
					onClick: h
				}, w(f.value ? "Stop Recording" : "Record"), 3),
				p.value > 0 ? (b(), c("span", Cc, w(p.value) + " frames", 1)) : s("", !0),
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
			p.value > 0 ? (b(), c("div", wc, [
				t[4] ||= l("span", { class: "tl-label" }, "LIVE", -1),
				j(l("input", {
					type: "range",
					min: "-1",
					max: p.value - 1,
					step: "1",
					"onUpdate:modelValue": t[1] ||= (e) => T(a).timelineFrameIdx = e,
					class: "tl-slider",
					onInput: _
				}, null, 40, Tc), [[
					O,
					T(a).timelineFrameIdx,
					void 0,
					{ number: !0 }
				]]),
				l("span", Ec, w(m.value?.label ?? "LIVE"), 1)
			])) : s("", !0),
			T(a).timelineFrameIdx >= 0 ? (b(), c("div", Dc, [t[5] ||= d(" Replay mode — real-time updates paused ", -1), l("button", {
				class: "tl-btn",
				onClick: t[2] ||= (e) => {
					T(a).timelineFrameIdx = -1, r("live");
				}
			}, "Back to LIVE")])) : s("", !0)
		])) : s("", !0);
	}
}), [["__scopeId", "data-v-e7595c81"]]), kc = class {
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
			let n = this.toMM(t.position.x, t.position.z), r = ht[e.status ?? "unknown"];
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
}, Ac = {
	key: 0,
	class: "mm-wrap"
}, jc = 180, Mc = 130, Nc = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "MinimapPanel",
	props: {
		camera: {},
		controls: {}
	},
	setup(e) {
		let t = e, n = S(null), r = R(), i = z(), a = null, o = null;
		y(() => {
			n.value && (a = new kc(n.value), a.updateBounds([...r.spaces.values()]), u());
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
		return k(() => r.spaces.size, () => {
			a?.updateBounds([...r.spaces.values()]);
		}), v(() => {
			o && cancelAnimationFrame(o);
		}), (e, t) => T(i).showMinimap ? (b(), c("div", Ac, [l("canvas", {
			ref_key: "canvas",
			ref: n,
			width: jc,
			height: Mc,
			class: "mm-canvas"
		}, null, 512), l("button", {
			class: "mm-close",
			onClick: t[0] ||= (e) => T(i).showMinimap = !1,
			title: "Close minimap"
		}, "✕")])) : s("", !0);
	}
}), [["__scopeId", "data-v-8f8db4dc"]]), Pc = { class: "tt-name" }, Fc = { class: "tt-ip" }, Ic = {
	key: 0,
	class: "tt-metrics"
}, Lc = {
	key: 0,
	class: "hint edit-hint"
}, Rc = {
	key: 1,
	class: "hint"
}, zc = {
	key: 2,
	class: "hint"
}, Bc = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "SceneCanvas",
	emits: ["scene-ready"],
	setup(e, { emit: t }) {
		let r = S(null), a = S(null), o = S(null), u = R(), p = z(), m = t, { init: g, dispose: x, dropDeviceAt: C } = Ds(), E = i(() => p.tooltip), D = i(() => p.tooltip.deviceId ? u.devices.get(p.tooltip.deviceId) : null);
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
			onDragover: t[0] ||= N(() => {}, ["prevent"]),
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
				default: A(() => [E.value.visible && D.value ? (b(), c("div", {
					key: 0,
					class: "tooltip",
					style: _({
						left: E.value.x + 14 + "px",
						top: E.value.y - 10 + "px"
					})
				}, [
					l("div", Pc, w(D.value.hostname), 1),
					l("div", Fc, w(D.value.ip), 1),
					l("div", {
						class: "tt-status",
						style: _({ color: T(ht)[D.value.status ?? "unknown"] })
					}, w(T(xt)[D.value.status ?? "unknown"]), 5),
					D.value.metrics ? (b(), c("div", Ic, " C" + w((D.value.metrics.cpu ?? 0).toFixed(0)) + "% M" + w((D.value.metrics.memory ?? 0).toFixed(0)) + "% ", 1)) : s("", !0),
					l("div", {
						class: "tt-type",
						style: _({ color: T(_t)[D.value.normalizedType ?? "unknown"] })
					}, w(T(bt)[D.value.normalizedType ?? "unknown"]), 5)
				], 4)) : s("", !0)]),
				_: 1
			}),
			T(p).linkToolActive ? (b(), c("div", Lc, [...t[1] ||= [
				d(" Connect mode — ", -1),
				l("b", null, "drag", -1),
				d(" from one device to another, then pick a link type · ", -1),
				l("kbd", null, "ESC", -1),
				d(" to cancel ", -1)
			]])) : T(p).mode === "edit" ? (b(), c("div", Rc, [...t[2] ||= [
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
			]])) : (b(), c("div", zc, [...t[3] ||= [
				d(" View mode - click to inspect - ", -1),
				l("kbd", null, "F", -1),
				d(" Fit ", -1)
			]]))
		], 544));
	}
}), [["__scopeId", "data-v-4fc19d52"]]), Vc = ["onClick"], Hc = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "ContextMenu",
	setup(r) {
		let i = z(), { confirmCreateLink: a } = Ds(), u = [
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
		return y(() => document.addEventListener("keydown", p)), v(() => document.removeEventListener("keydown", p)), (r, a) => (b(), o(t, { to: "body" }, [f(n, { name: "ctx-fade" }, {
			default: A(() => [T(i).contextMenu.visible ? (b(), c("div", {
				key: 0,
				class: "ctx-menu",
				style: _({
					left: T(i).contextMenu.x + "px",
					top: T(i).contextMenu.y + "px"
				}),
				onClick: a[1] ||= N(() => {}, ["stop"])
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
				}, null, 4), l("span", null, w(e.label), 1)], 12, Vc)), 64)),
				a[3] ||= l("div", { class: "ctx-sep" }, null, -1),
				l("button", {
					class: "ctx-item cancel",
					onClick: a[0] ||= (e) => T(i).hideContextMenu()
				}, "Cancel")
			], 4)) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-617078c4"]]), Uc = { class: "toast-stack" }, Wc = ["onClick"], Gc = { class: "msg" }, Kc = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "ToastPanel",
	setup(n) {
		let i = z();
		return (n, a) => (b(), o(t, { to: "body" }, [l("div", Uc, [f(r, { name: "toast" }, {
			default: A(() => [(b(!0), c(e, null, C(T(i).toasts, (e) => (b(), c("div", {
				key: e.id,
				class: g(["toast", e.type]),
				onClick: (t) => T(i).removeToast(e.id)
			}, [l("span", Gc, w(e.message), 1), a[0] ||= l("span", { class: "close" }, "✕", -1)], 10, Wc))), 128))]),
			_: 1
		})])]));
	}
}), [["__scopeId", "data-v-0b13ee6c"]]), qc = { class: "help-modal" }, Jc = { class: "help-head" }, Yc = { class: "lang-switch" }, Xc = { class: "help-body" }, Zc = { class: "help-key" }, Qc = { class: "help-desc" }, $c = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "HelpPanel",
	setup(r) {
		let i = z(), a = S("en"), u = {
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
			default: A(() => [T(i).showHelp ? (b(), c("div", {
				key: 0,
				class: "help-overlay",
				onClick: d[3] ||= N((e) => T(i).showHelp = !1, ["self"])
			}, [l("div", qc, [l("div", Jc, [
				d[4] ||= l("span", { class: "help-title" }, "Topospace — Help", -1),
				l("div", Yc, [l("button", {
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
			]), l("div", Xc, [(b(!0), c(e, null, C(u[a.value], (t) => (b(), c("section", {
				key: t.title,
				class: "help-section"
			}, [l("h3", null, w(t.title), 1), (b(!0), c(e, null, C(t.rows, (t) => (b(), c("div", {
				key: t.k,
				class: "help-row"
			}, [l("span", Zc, [(b(!0), c(e, null, C(t.k.split("+"), (e) => (b(), c("kbd", { key: e }, w(e), 1))), 128))]), l("span", Qc, w(t.v), 1)]))), 128))]))), 128))])])])) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-e905da80"]]), el = {
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
}, tl = {
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
}, nl = ["hostname", "type"];
function rl(e) {
	return e.trim().toLowerCase().replace(/[\s_-]+/g, "");
}
var il = {
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
function al(e) {
	let t = [];
	return {
		mapped: e.map((e) => il[rl(e)] || (t.push(e), null)),
		unknownCols: t
	};
}
function ol(e, t) {
	let n = {};
	t.forEach((t, r) => {
		if (!t) return;
		let i = (e[r] ?? "").trim();
		i && (t === "type" ? n.type = el[i.toLowerCase()] ?? "unknown" : t === "status" ? n.status = tl[i.toLowerCase()] ?? "unknown" : n[t] = i);
	});
	for (let e of nl) if (!n[e]) return { error: `missing required column: ${e}` };
	return { row: n };
}
function sl(e) {
	let t = [], n = "", r = !1;
	for (let i = 0; i < e.length; i++) {
		let a = e[i];
		r ? a === "\"" && e[i + 1] === "\"" ? (n += "\"", i++) : a === "\"" ? r = !1 : n += a : a === "," ? (t.push(n), n = "") : a === "\"" ? r = !0 : n += a;
	}
	return t.push(n), t;
}
function cl(e) {
	let t = {
		rows: [],
		errors: [],
		warnings: []
	}, n = e.split(/\r?\n/).filter((e) => e.trim().length > 0);
	if (n.length < 2) return t.errors.push("CSV must contain a header row and at least one data row."), t;
	let { mapped: r, unknownCols: i } = al(sl(n[0]));
	i.length && t.warnings.push(`Unknown columns ignored: ${i.join(", ")}`);
	for (let e = 1; e < n.length; e++) {
		let { row: i, error: a } = ol(sl(n[e]), r);
		if (a) {
			t.errors.push(`Row ${e + 1}: ${a}`);
			continue;
		}
		i && t.rows.push(i);
	}
	return t;
}
async function ll(e) {
	let t = {
		rows: [],
		errors: [],
		warnings: []
	}, n = new (await (import("./exceljs.min-DI2t47S_.js").then((e) => /* @__PURE__ */ Pe(e.default, 1)))).Workbook();
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
	let { mapped: s, unknownCols: c } = al(o);
	c.length && t.warnings.push(`Unknown columns ignored: ${c.join(", ")}`);
	for (let e = i + 1; e <= r.rowCount; e++) {
		let n = r.getRow(e);
		if (n.actualCellCount === 0) continue;
		let i = [];
		o.forEach((e, t) => {
			let r = n.getCell(t + 1).value;
			i[t] = r == null ? "" : typeof r == "object" && "text" in r ? String(r.text) : String(r);
		});
		let { row: a, error: c } = ol(i, s);
		if (c) {
			t.errors.push(`Row ${e}: ${c}`);
			continue;
		}
		a && t.rows.push(a);
	}
	return t;
}
function ul() {
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
var dl = { class: "imp-modal" }, fl = { class: "imp-body" }, pl = { class: "imp-section" }, ml = {
	key: 0,
	class: "file-name"
}, hl = {
	key: 0,
	class: "imp-section"
}, gl = {
	key: 0,
	class: "err-block"
}, _l = {
	key: 0,
	class: "err-more"
}, vl = {
	key: 1,
	class: "warn-block"
}, yl = {
	key: 2,
	class: "tbl-wrap"
}, bl = { class: "tbl" }, xl = {
	key: 0,
	class: "tbl-more"
}, Sl = {
	key: 1,
	class: "imp-section"
}, Cl = { class: "opt" }, wl = {
	key: 0,
	class: "mode-warning"
}, Tl = ["disabled"], El = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "ImportPanel",
	setup(n) {
		let r = z(), i = R(), { rebuildAll: a } = Ds(), u = S(null), f = S(""), p = S(!1), m = S(null), _ = S(!1), v = S(!1);
		function y() {
			r.showImport = !1;
		}
		async function x(e) {
			f.value = e.name;
			try {
				/\.xlsx$/i.test(e.name) ? m.value = await ll(await e.arrayBuffer()) : m.value = cl(await e.text());
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
			let e = new Blob([ul()], { type: "text/csv" }), t = document.createElement("a");
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
					M();
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
		function M() {
			i.replaceData({});
		}
		return (n, i) => (b(), o(t, { to: "body" }, [T(r).showImport ? (b(), c("div", {
			key: 0,
			class: "imp-overlay",
			onClick: N(y, ["self"])
		}, [l("div", dl, [l("div", { class: "imp-head" }, [
			i[4] ||= l("span", { class: "imp-title" }, "Import Devices & Topology", -1),
			l("button", {
				class: "text-btn",
				onClick: k
			}, "Download CSV template"),
			l("button", {
				class: "text-btn",
				onClick: y
			}, "Close")
		]), l("div", fl, [
			l("section", pl, [
				i[6] ||= l("div", { class: "step-title" }, "1. Select file", -1),
				l("div", {
					class: g(["drop-zone", { hover: p.value }]),
					onDragover: i[1] ||= N((e) => p.value = !0, ["prevent"]),
					onDragleave: i[2] ||= (e) => p.value = !1,
					onDrop: N(O, ["prevent"])
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
					f.value ? (b(), c("span", ml, w(f.value) + " · " + w(m.value?.rows.length ?? 0) + " rows", 1)) : s("", !0)
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
			m.value ? (b(), c("section", hl, [
				i[9] ||= l("div", { class: "step-title" }, "2. Preview", -1),
				m.value.errors.length ? (b(), c("div", gl, [(b(!0), c(e, null, C(m.value.errors.slice(0, 5), (e, t) => (b(), c("div", {
					key: t,
					class: "err-line"
				}, w(e), 1))), 128)), m.value.errors.length > 5 ? (b(), c("div", _l, "… and " + w(m.value.errors.length - 5) + " more", 1)) : s("", !0)])) : s("", !0),
				m.value.warnings.length ? (b(), c("div", vl, [(b(!0), c(e, null, C(m.value.warnings, (e, t) => (b(), c("div", {
					key: t,
					class: "warn-line"
				}, w(e), 1))), 128))])) : s("", !0),
				m.value.rows.length ? (b(), c("div", yl, [l("table", bl, [i[8] ||= l("thead", null, [l("tr", null, [
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
				]))), 128))])]), m.value.rows.length > 12 ? (b(), c("div", xl, " … " + w(m.value.rows.length - 12) + " more rows ", 1)) : s("", !0)])) : s("", !0)
			])) : s("", !0),
			m.value && m.value.rows.length ? (b(), c("section", Sl, [
				i[11] ||= l("div", { class: "step-title" }, "3. Import options", -1),
				l("label", Cl, [j(l("input", {
					type: "checkbox",
					"onUpdate:modelValue": i[3] ||= (e) => _.value = e
				}, null, 512), [[E, _.value]]), i[10] ||= l("span", null, "Replace current scene (clear existing devices, spaces, links)", -1)]),
				T(r).mode === "edit" ? s("", !0) : (b(), c("div", wl, " Switch to Edit mode before importing topology data. ")),
				l("button", {
					class: "run-btn",
					disabled: T(r).mode !== "edit" || v.value,
					onClick: A
				}, " Import " + w(m.value.rows.length) + " devices ", 9, Tl)
			])) : s("", !0)
		])])])) : s("", !0)]));
	}
}), [["__scopeId", "data-v-a8623394"]]), Dl = { class: "app" }, Ol = { class: "workspace" }, kl = {
	key: 0,
	class: "left-dock"
}, Al = {
	class: "canvas-wrap",
	ref: "canvasWrap"
}, jl = {
	key: 1,
	class: "right-dock"
}, Ml = {
	key: 0,
	class: "blast-banner"
}, Nl = { class: "blast-id" }, Pl = /* @__PURE__ */ B(/* @__PURE__ */ p({
	__name: "App",
	setup(e) {
		let t = z(), r = R(), { saveCurrentView: a, loadSavedView: u, focusVirtualNode: p, onTimelineScrub: m, getScene: h, timeline: g } = Ds(), _ = S(null), v = S(!1), y = S(null), x = S(null);
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
		let j = i(() => r.devices.get(t.blastSourceId ?? "")?.hostname ?? t.blastSourceId), M = i(() => t.showRackServerList || t.showSpaceTree || t.showUnmapped), N = i(() => !!t.selectedDeviceId || !!t.selectedLinkId || !!t.selectedSpaceId || t.showSavedViews || t.showChangeLog || t.showVirtualNodes);
		return k(() => t.fontScale, (e) => {
			document.documentElement.style.setProperty("--ui-fs", String(e));
		}, { immediate: !0 }), (e, r) => (b(), c("div", Dl, [
			f(ot),
			f(mt),
			l("div", Ol, [
				M.value ? (b(), c("aside", kl, [T(t).showRackServerList ? (b(), o(Ft, { key: 0 })) : T(t).showSpaceTree ? (b(), o(fn, { key: 1 })) : T(t).showUnmapped ? (b(), o(On, { key: 2 })) : s("", !0)])) : s("", !0),
				l("div", Al, [f(Bc, {
					ref_key: "sceneRef",
					ref: _,
					onSceneReady: C
				}, null, 512), v.value && T(t).showMinimap ? (b(), o(Nc, {
					key: 0,
					camera: y.value,
					controls: x.value
				}, null, 8, ["camera", "controls"])) : s("", !0)], 512),
				N.value ? (b(), c("aside", jl, [
					T(t).selectedDeviceId ? (b(), o(cr, { key: 0 })) : T(t).selectedLinkId ? (b(), o(wr, { key: 1 })) : T(t).selectedSpaceId ? (b(), o(Js, { key: 2 })) : s("", !0),
					T(t).showSavedViews ? (b(), o(rc, {
						key: 3,
						onSaveView: E,
						onLoadView: D
					})) : s("", !0),
					T(t).showChangeLog ? (b(), o(uc, { key: 4 })) : s("", !0),
					T(t).showVirtualNodes ? (b(), o(bc, {
						key: 5,
						onSelectNode: O
					})) : s("", !0)
				])) : s("", !0)
			]),
			T(t).showTimeline ? (b(), o(Oc, {
				key: 0,
				timeline: T(g),
				onScrub: T(m),
				onLive: r[0] ||= (e) => T(t).timelineFrameIdx = -1
			}, null, 8, ["timeline", "onScrub"])) : s("", !0),
			f(Hc),
			f(Kc),
			f($c),
			f(El),
			f(n, { name: "fade" }, {
				default: A(() => [T(t).blastSourceId ? (b(), c("div", Ml, [
					r[2] ||= d(" Impact radius ", -1),
					l("span", Nl, w(j.value), 1),
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
}), [["__scopeId", "data-v-995bf754"]]);
//#endregion
//#region src/index.ts
function Fl(e) {
	if (!e.container) throw Error("createNmsEditor requires a container HTMLElement.");
	let t = e.container;
	Es(e);
	let n = Il(e), r = a(Pl), i = ee();
	r.provide(Cs, e), r.use(i), r.config.errorHandler = (t) => {
		let n = t instanceof Error ? t : Error(String(t));
		e.onError?.(n, { phase: "vue" });
	}, r.mount(n);
	let o = R(i), s = z(i);
	return {
		destroy() {
			r.unmount(), e.shadowDom && t.shadowRoot?.replaceChildren(), Es({});
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
function Il(e) {
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
export { Fl as createNmsEditor, Fe as n, Me as t };
