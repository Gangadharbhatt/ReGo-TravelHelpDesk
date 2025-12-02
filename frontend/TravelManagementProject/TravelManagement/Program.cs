using DataTravelManagement.Context;
using DataTravelManagement.Data;
using Microsoft.EntityFrameworkCore;
using ServicesTravelManagement.Repository;
using ServicesTravelManagement.Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// ========== DATABASE ==========
builder.Services.AddDbContext<RollMasterContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDbContext<LoginMasterContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDbContext<EmployeeMasterContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDbContext<TravelMasterContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddScoped<RollMasterData>();
builder.Services.AddScoped<LoginMasterData>();
builder.Services.AddScoped<EmployeeMasterData>();
builder.Services.AddScoped<TravelMasterData>();

builder.Services.AddScoped<Service>();

// ========== CORS (IMPORTANT) ==========
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
              .SetIsOriginAllowed(origin => true); // Allow all localhost ports
    });
});

// ========== CONTROLLERS ==========
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ========== SWAGGER ==========
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ========== ENABLE CORS BEFORE AUTH ==========
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
