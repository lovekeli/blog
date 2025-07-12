---
title: unity贴花
date: 2025-02-07 12:50:29
categories:
    - unity
tags:
    - unity
---
unity贴花
<!--more-->
```csharp
Shader "Decal"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _MixedColor("MixedColor",Color)=(1,1,1,1) //颜色混合
        _Alpha ("Alpha",Range(0,1.0)) = 1 //透明度
    }
    SubShader
    {
        Tags {
            "RenderType"="Opaque"
            "Queue" = "Geometry+1"
        }
        LOD 100
         
        ZWrite Off
        ZTest Off
        Cull Front        
         
        Blend SrcAlpha OneMinusSrcAlpha
         
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
 
            #include "UnityCG.cginc"
 
            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };
 
            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
                float4 screenPos : TEXCOORD1;
            };
 
            sampler2D _MainTex;
            float _Alpha;
            float4 _MainTex_ST;
            float4 _MixedColor;
            sampler2D _CameraDepthTexture;
 
            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                 
                o.screenPos = ComputeScreenPos(o.vertex);
                return o;
            }
 
            float3 DepthToWorldPosition(float4 screenPos)
            {
                float depth = Linear01Depth(UNITY_SAMPLE_DEPTH(tex2Dproj(_CameraDepthTexture,screenPos)));
                float4 ndcPos = (screenPos/screenPos.w) * 2 - 1;
                float3 clipPos = float3(ndcPos.x,ndcPos.y,1) * _ProjectionParams.z;
                float3 viewPos = mul(unity_CameraInvProjection,clipPos.xyzz).xyz * depth;
                float3 worldPos = mul(UNITY_MATRIX_I_V,float4(viewPos,1)).xyz;
                return worldPos;
            }
            //颜色混合
            float4 MixedColor(float4 a,float4 b)
            {
                return float4(a.r*b.r,a.g*b.g,a.b*b.b,a.a*b.a);
            }
            fixed4 frag (v2f i) : SV_Target
            {
                float3 worldPos = DepthToWorldPosition(i.screenPos);
                float4 localPos = mul(unity_WorldToObject,float4(worldPos,1.0));
                clip(float3(0.5,0.5,0.5) - abs(localPos.xyz));
                fixed2 decalUV = fixed2(localPos.x,localPos.z);
                decalUV = decalUV + 0.5;
                fixed4 color = tex2D(_MainTex,decalUV);
                fixed4 c=fixed4(color.r,color.g,color.b,color.a*_Alpha);
                return MixedColor(c,_MixedColor);
            }
            
            ENDCG
        }
    }
}
```
